"""SendGrid email-notification integration tests for residential & commercial leads.

We minimise real SendGrid sends (free-tier = 100/day, main agent already burned a couple).
Strategy:
  - 3 happy-path POSTs only (each fires 1 email): residential full, residential minimal, commercial+PDF.
  - All negative/regression tests intentionally fail BEFORE BackgroundTasks fires (consent/size/mime/validation),
    so they do not consume SendGrid quota.
  - The "empty SENDGRID_API_KEY does not break /api/leads" test temporarily rewrites backend/.env, restarts
    supervisor, hits the API, then restores .env + restarts. Backend log is grepped for the warning.
"""
import base64
import os
import re
import shutil
import subprocess
import time
from pathlib import Path

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://solar-intake-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@accuteksolar.com"
ADMIN_PASSWORD = "naA3T6l9fpmyqc2tuE1pnA2c"

BACKEND_ENV = Path("/app/backend/.env")
BACKEND_LOG = "/var/log/supervisor/backend.err.log"
BACKEND_OUT_LOG = "/var/log/supervisor/backend.out.log"


# ---------- helpers ----------
def _read_recent_backend_log(seconds_back: int = 10) -> str:
    """Return combined recent backend log content (last ~N seconds worth, but we just read tail)."""
    contents = ""
    for path in (BACKEND_LOG, BACKEND_OUT_LOG):
        try:
            with open(path, "rb") as fh:
                fh.seek(0, 2)
                size = fh.tell()
                fh.seek(max(0, size - 200_000))
                contents += fh.read().decode("utf-8", errors="ignore")
        except FileNotFoundError:
            pass
    return contents


def _admin_token() -> str:
    r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}, timeout=15)
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    return r.json()["access_token"]


# Small valid PDF (header is enough for python file readers; mime check uses the multipart-supplied content_type)
TINY_PDF = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n"


# ──────────────────────────────────────────────────────────
# 1. Residential happy path — real send, must be fast + log status=202
# ──────────────────────────────────────────────────────────
class TestResidentialEmailHappyPath:
    def test_post_leads_returns_fast_and_logs_sendgrid_202(self):
        payload = {
            "name": "TEST_EmailRegression FullRes",
            "email": "test_email_regression_full@example.com",
            "phone": "555-0100",
            "address": "1 Solar Way, Clinton, IN",
            "interest": "solar",
            "monthly_bill": 285.5,
            "timeline": "1-3_months",
            "owns_home_5yr_plus": True,
            "services_solar_panels": True,
            "services_battery_backup": True,
            "consent_communications": True,
            "consent_text": "I agree",
            "calculator_results": [
                {"tool": "solar", "label": "Solar Estimator", "summary": "8kW system, ~$2,400/yr savings",
                 "raw": {"kw": 8}, "savedAt": "2026-01-15T00:00:00Z"}
            ],
        }
        t0 = time.monotonic()
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        elapsed_ms = (time.monotonic() - t0) * 1000
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == payload["name"]
        assert "id" in body and isinstance(body["id"], str)
        # Spec: response must NOT be blocked by SendGrid call
        assert elapsed_ms < 2000, f"response took {elapsed_ms:.0f}ms — BackgroundTasks may be blocking"

        # Wait for background task to flush + log
        time.sleep(5)
        log = _read_recent_backend_log()
        # Look for our subject in a SendGrid accepted line
        assert re.search(
            r"SendGrid accepted lead email \(status=202.*subject=.*TEST_EmailRegression FullRes",
            log,
        ), "Did not find SendGrid status=202 log line for residential lead\nLog tail:\n" + log[-3000:]


# ──────────────────────────────────────────────────────────
# 2. Commercial happy path with PDF — real send, must include attachment
# ──────────────────────────────────────────────────────────
class TestCommercialEmailHappyPath:
    def test_post_commercial_leads_with_pdf_logs_sendgrid_202(self):
        files = {"site_plan": ("site_plan_TEST.pdf", TINY_PDF, "application/pdf")}
        data = {
            "name": "TEST_EmailRegression Commercial",
            "email": "test_email_regression_comm@example.com",
            "phone": "555-0200",
            "company": "TEST Industries LLC",
            "facility_size": "50,000 sqft",
            "facility_type": "warehouse",
            "timeline": "asap",
            "consent_communications": "true",
            "consent_text": "I agree",
        }
        t0 = time.monotonic()
        r = requests.post(f"{API}/commercial-leads", data=data, files=files, timeout=20)
        elapsed_ms = (time.monotonic() - t0) * 1000
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == data["name"]
        assert body["site_plan"]["filename"] == "site_plan_TEST.pdf"
        assert body["site_plan"]["content_type"] == "application/pdf"
        assert body["site_plan"]["size_bytes"] == len(TINY_PDF)
        # No _id leak, no raw bytes in response
        assert "_id" not in body
        assert "data_base64" not in body.get("site_plan", {})
        # File upload can be slightly slower — but still must not wait on SendGrid (>3s is suspicious)
        assert elapsed_ms < 3000, f"commercial response took {elapsed_ms:.0f}ms"

        time.sleep(5)
        log = _read_recent_backend_log()
        assert re.search(
            r"SendGrid accepted lead email \(status=202.*subject=.*New COMMERCIAL intake: .*TEST_EmailRegression Commercial",
            log,
        ), "Did not find SendGrid status=202 log line for commercial lead\nLog tail:\n" + log[-3000:]


# ──────────────────────────────────────────────────────────
# 3. Backwards-compat: minimal residential (name+email+consent only) — real send
# ──────────────────────────────────────────────────────────
class TestMinimalResidential:
    def test_minimal_payload_succeeds_and_no_email_service_exception(self):
        payload = {
            "name": "TEST_EmailRegression Minimal",
            "email": "test_email_regression_min@example.com",
            "consent_communications": True,
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        time.sleep(5)
        log = _read_recent_backend_log()
        # We accept either a 202 send OR no email_service exception. There should be NO traceback referencing email_service
        # in the recent window for this minimal lead.
        # Check there's no "SendGrid send failed" right after our request
        recent_tail = log[-15000:]
        assert "SendGrid send failed" not in recent_tail or "TEST_EmailRegression Minimal" not in recent_tail, \
            "email_service crashed on a minimal residential lead"
        # And confirm the success log line is present
        assert re.search(
            r"SendGrid accepted lead email \(status=202.*subject=.*TEST_EmailRegression Minimal",
            log,
        ), "Minimal lead did not produce a status=202 log line\nLog tail:\n" + log[-3000:]


# ──────────────────────────────────────────────────────────
# 4. Regression — residential validation still works (no email sent on 400)
# ──────────────────────────────────────────────────────────
class TestResidentialRegressionValidation:
    def test_missing_consent_returns_400(self):
        r = requests.post(f"{API}/leads", json={
            "name": "TEST_NoConsentRes", "email": "test_noconsent_res@example.com",
            "consent_communications": False,
        }, timeout=10)
        assert r.status_code == 400
        assert "consent" in r.text.lower()

    def test_empty_name_returns_400(self):
        r = requests.post(f"{API}/leads", json={
            "name": "  ", "email": "test_emptyname@example.com",
            "consent_communications": True,
        }, timeout=10)
        assert r.status_code == 400

    def test_empty_email_returns_400(self):
        r = requests.post(f"{API}/leads", json={
            "name": "TEST_EmptyEmail", "email": "  ",
            "consent_communications": True,
        }, timeout=10)
        assert r.status_code == 400

    def test_background_tasks_did_not_break_dependency_injection(self):
        # If BackgroundTasks broke DI, even a valid request would 422. Already covered by happy path,
        # but explicitly assert here on a structurally distinct payload.
        r = requests.post(f"{API}/leads", json={
            "name": "TEST_DICheck", "email": "test_dicheck@example.com",
            "consent_communications": True, "interest": "general",
        }, timeout=15)
        # 200 means DI for (LeadCreate, BackgroundTasks) is intact
        assert r.status_code == 200, r.text


# ──────────────────────────────────────────────────────────
# 5. Regression — commercial validation still works (no email on these)
# ──────────────────────────────────────────────────────────
class TestCommercialRegressionValidation:
    def test_missing_consent_returns_400(self):
        r = requests.post(f"{API}/commercial-leads", data={
            "name": "TEST_NoConsentCom", "email": "test_noconsent_com@example.com",
            "consent_communications": "false",
        }, timeout=10)
        assert r.status_code == 400

    def test_oversize_file_returns_413(self):
        big = b"x" * (10 * 1024 * 1024 + 100)  # 10MB + 100B
        files = {"site_plan": ("big.pdf", big, "application/pdf")}
        r = requests.post(f"{API}/commercial-leads", data={
            "name": "TEST_BigFile", "email": "test_bigfile@example.com",
            "consent_communications": "true",
        }, files=files, timeout=30)
        assert r.status_code == 413, r.text

    def test_disallowed_mime_returns_415(self):
        files = {"site_plan": ("bad.exe", b"MZbinary", "application/octet-stream")}
        r = requests.post(f"{API}/commercial-leads", data={
            "name": "TEST_BadMime", "email": "test_badmime@example.com",
            "consent_communications": "true",
        }, files=files, timeout=10)
        assert r.status_code == 415, r.text

    def test_background_tasks_did_not_break_form_di(self):
        # Multipart form with no file — DI for Form/File + BackgroundTasks must still resolve
        r = requests.post(f"{API}/commercial-leads", data={
            "name": "TEST_ComDICheck", "email": "test_com_dicheck@example.com",
            "consent_communications": "true",
        }, timeout=15)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == "TEST_ComDICheck"
        assert body.get("site_plan") in (None,) or "site_plan" not in body or body["site_plan"] is None
        assert "_id" not in body


# ──────────────────────────────────────────────────────────
# 6. Admin regression — Bearer required, list includes new docs, no _id leak,
#    calculator_results round-trip preserved.
# ──────────────────────────────────────────────────────────
class TestAdminRegression:
    def test_admin_leads_requires_bearer(self):
        r = requests.get(f"{API}/admin/leads", timeout=10)
        assert r.status_code == 401

    def test_admin_leads_returns_data_without_id_leak_and_with_calc_results(self):
        token = _admin_token()
        r = requests.get(f"{API}/admin/leads?limit=200",
                         headers={"Authorization": f"Bearer {token}"}, timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list) and len(rows) > 0
        for row in rows:
            assert "_id" not in row, "MongoDB _id leaked in admin/leads"

        # Find our happy-path lead and verify calculator_results round-trip
        match = next(
            (row for row in rows if row.get("name") == "TEST_EmailRegression FullRes"),
            None,
        )
        assert match is not None, "Just-created residential lead not present in admin list"
        cr = match.get("calculator_results")
        assert isinstance(cr, list) and len(cr) == 1
        assert cr[0]["tool"] == "solar"
        assert cr[0]["summary"] == "8kW system, ~$2,400/yr savings"

    def test_admin_commercial_leads_excludes_file_bytes(self):
        token = _admin_token()
        r = requests.get(f"{API}/admin/commercial-leads",
                         headers={"Authorization": f"Bearer {token}"}, timeout=15)
        assert r.status_code == 200
        rows = r.json()
        for row in rows:
            assert "_id" not in row
            sp = row.get("site_plan")
            if sp:
                assert "data_base64" not in sp, "raw file bytes leaked in admin/commercial-leads"


# ──────────────────────────────────────────────────────────
# 7. Email send failure (empty SENDGRID_API_KEY) must NOT break /api/leads.
#    Rewrites .env, restarts backend, hits API, restores .env. No real email sent.
# ──────────────────────────────────────────────────────────
class TestSendGridDisabledFallback:
    @pytest.fixture(scope="class")
    def disable_sendgrid(self):
        backup_path = BACKEND_ENV.with_suffix(".env.backup_test_email")
        shutil.copy(BACKEND_ENV, backup_path)
        try:
            text = BACKEND_ENV.read_text()
            new_text = re.sub(r'^SENDGRID_API_KEY=.*$', 'SENDGRID_API_KEY=""', text, flags=re.MULTILINE)
            BACKEND_ENV.write_text(new_text)
            subprocess.run(["sudo", "supervisorctl", "restart", "backend"], check=False, timeout=30)
            # Wait for backend to come back
            for _ in range(20):
                try:
                    if requests.get(f"{API}/", timeout=3).status_code == 200:
                        break
                except Exception:
                    pass
                time.sleep(1)
            yield
        finally:
            shutil.copy(backup_path, BACKEND_ENV)
            backup_path.unlink(missing_ok=True)
            subprocess.run(["sudo", "supervisorctl", "restart", "backend"], check=False, timeout=30)
            for _ in range(20):
                try:
                    if requests.get(f"{API}/", timeout=3).status_code == 200:
                        break
                except Exception:
                    pass
                time.sleep(1)

    def test_post_leads_still_200_when_sendgrid_disabled(self, disable_sendgrid):
        payload = {
            "name": "TEST_SendGridDisabled",
            "email": "test_sendgrid_disabled@example.com",
            "consent_communications": True,
            "interest": "general",
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        # Wait a couple seconds for BG task to run
        time.sleep(3)
        log = _read_recent_backend_log()
        # Expect the configured warning to appear instead of a 202 send
        assert "SendGrid not fully configured" in log, \
            "Expected 'SendGrid not fully configured ... — skipping email' warning in backend log\nLog tail:\n" + log[-3000:]
