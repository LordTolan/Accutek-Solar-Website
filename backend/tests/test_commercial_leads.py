"""Tests for /api/commercial-leads (file upload, TCPA consent, listing)."""
import io
import os
import re
import requests
from pathlib import Path

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "").rstrip("/")
if not BASE_URL:
    env_path = Path(__file__).resolve().parents[2] / "frontend" / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            m = re.match(r"\s*REACT_APP_BACKEND_URL\s*=\s*(.+)\s*$", line)
            if m:
                BASE_URL = m.group(1).strip().strip('"').rstrip("/")
                break
API = f"{BASE_URL}/api"

# Tiny valid PNG (1x1 transparent pixel)
TINY_PNG = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01"
    b"\x08\x06\x00\x00\x00\x1f\x15\xc4\x89\x00\x00\x00\rIDATx\x9cc\xf8"
    b"\x0f\x00\x01\x01\x01\x00\x1b\xb6\xee\x56\x00\x00\x00\x00IEND\xaeB`\x82"
)


# --- Validation: required fields ---
class TestCommercialValidation:
    def test_missing_name_returns_400(self):
        r = requests.post(
            f"{API}/commercial-leads",
            data={"name": "   ", "email": "x@y.com", "consent_communications": "true"},
            timeout=20,
        )
        assert r.status_code == 400, r.text

    def test_missing_email_returns_400(self):
        r = requests.post(
            f"{API}/commercial-leads",
            data={"name": "TEST_X", "email": "   ", "consent_communications": "true"},
            timeout=20,
        )
        assert r.status_code == 400, r.text

    def test_consent_false_returns_400(self):
        r = requests.post(
            f"{API}/commercial-leads",
            data={
                "name": "TEST_NoConsent",
                "email": "test_noconsent@example.com",
                "consent_communications": "false",
            },
            timeout=20,
        )
        assert r.status_code == 400
        assert "consent" in (r.json().get("detail") or "").lower()

    def test_consent_omitted_returns_400(self):
        r = requests.post(
            f"{API}/commercial-leads",
            data={"name": "TEST_X", "email": "x@y.com"},
            timeout=20,
        )
        assert r.status_code == 400


# --- File upload size & type validation ---
class TestCommercialFileGuards:
    def test_file_over_10mb_returns_413(self):
        big = b"\x00" * (10 * 1024 * 1024 + 100)
        files = {"site_plan": ("big.pdf", io.BytesIO(big), "application/pdf")}
        data = {
            "name": "TEST_BigFile",
            "email": "test_big@example.com",
            "consent_communications": "true",
        }
        r = requests.post(f"{API}/commercial-leads", data=data, files=files, timeout=60)
        assert r.status_code == 413, r.text

    def test_disallowed_content_type_returns_415(self):
        files = {"site_plan": ("evil.exe", io.BytesIO(b"MZ\x90\x00"), "application/x-msdownload")}
        data = {
            "name": "TEST_Exe",
            "email": "test_exe@example.com",
            "consent_communications": "true",
        }
        r = requests.post(f"{API}/commercial-leads", data=data, files=files, timeout=20)
        assert r.status_code == 415, r.text


# --- Happy path with valid PNG ---
class TestCommercialCreate:
    def test_valid_submission_with_png(self):
        files = {"site_plan": ("plan.png", io.BytesIO(TINY_PNG), "image/png")}
        data = {
            "name": "TEST_CommercialJane",
            "email": "test_commercial_jane@example.com",
            "phone": "(812) 555-1212",
            "company": "TEST_AcmeCo",
            "title": "Facility Manager",
            "facility_size": "45000",
            "facility_type": "manufacturing",
            "critical_loads": "200A refrigeration, server room",
            "existing_system_brand": "Generac 150kW",
            "timeline": "1-3mo",
            "address": "Vigo County, IN",
            "message": "Need backup + solar review",
            "consent_communications": "true",
            "consent_text": "I agree…",
        }
        r = requests.post(f"{API}/commercial-leads", data=data, files=files, timeout=30)
        assert r.status_code == 200, r.text
        body = r.json()
        assert body["name"] == "TEST_CommercialJane"
        assert body["email"] == "test_commercial_jane@example.com"
        assert body.get("id")
        assert body.get("source") == "website-commercial"
        # site_plan returned but base64 stripped
        assert "site_plan" in body
        assert body["site_plan"]["filename"] == "plan.png"
        assert body["site_plan"]["content_type"] == "image/png"
        assert "data_base64" not in body["site_plan"]

    def test_valid_submission_without_file(self):
        data = {
            "name": "TEST_NoFile",
            "email": "test_nofile@example.com",
            "consent_communications": "true",
        }
        r = requests.post(f"{API}/commercial-leads", data=data, timeout=20)
        assert r.status_code == 200, r.text
        assert r.json()["name"] == "TEST_NoFile"


# --- Listing: sort desc, no _id, no base64 ---
class TestCommercialList:
    def test_list_excludes_base64_and_id(self):
        # ensure at least one record exists
        files = {"site_plan": ("plan.png", io.BytesIO(TINY_PNG), "image/png")}
        data = {
            "name": "TEST_ListItem",
            "email": "test_listitem@example.com",
            "consent_communications": "true",
        }
        requests.post(f"{API}/commercial-leads", data=data, files=files, timeout=20)

        # As of iter 4, GET /api/commercial-leads requires admin Bearer.
        login = requests.post(
            f"{API}/auth/login",
            json={"email": "admin@accuteksolar.com",
                  "password": "naA3T6l9fpmyqc2tuE1pnA2c"},
            timeout=15,
        )
        if login.status_code == 429:
            import pytest as _pytest
            _pytest.skip("Admin locked out")
        assert login.status_code == 200
        token = login.json()["access_token"]
        r = requests.get(f"{API}/commercial-leads",
                         headers={"Authorization": f"Bearer {token}"}, timeout=20)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 1
        for row in rows:
            assert "_id" not in row
            sp = row.get("site_plan")
            if sp:
                assert "data_base64" not in sp, "base64 must not be in list response"
        # sort desc by created_at
        ts = [row["created_at"] for row in rows if row.get("created_at")]
        assert ts == sorted(ts, reverse=True)
