"""
Tests for new feature: POST /api/leads accepts calculator_results as a LIST
(previously typed Dict). Plus backwards-compat: null + missing field still OK.
And admin retrieval echoes the list back.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://solar-intake-hub.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@accuteksolar.com"
ADMIN_PASSWORD = "naA3T6l9fpmyqc2tuE1pnA2c"


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(
        f"{API}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
        timeout=15,
    )
    if r.status_code == 429:
        pytest.skip("Admin rate-limited")
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


# --- New: list-shaped calculator_results ---
class TestCalcResultsList:
    def test_accepts_list_payload(self):
        payload = {
            "name": "TEST_CalcList User",
            "email": "test_calc_list@example.com",
            "consent_communications": True,
            "consent_text": "I agree",
            "calculator_results": [
                {
                    "tool": "solar",
                    "label": "Solar Panel Sizing",
                    "summary": "~8.2 kW system, $24,600 est cost",
                    "raw": {"kw": 8.2, "monthly_bill": 220},
                    "savedAt": "2026-01-15T10:00:00.000Z",
                },
                {
                    "tool": "battery",
                    "label": "Battery Sizing",
                    "summary": "20 kWh recommended",
                    "raw": {"kwh": 20},
                    "savedAt": "2026-01-15T10:01:00.000Z",
                },
            ],
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["id"]
        cr = data.get("calculator_results")
        assert isinstance(cr, list), f"Expected list, got {type(cr).__name__}: {cr}"
        assert len(cr) == 2
        tools = {row["tool"] for row in cr}
        assert tools == {"solar", "battery"}

    def test_persisted_list_via_admin(self, admin_token):
        # Create a uniquely-marked lead, then look it up via admin list
        unique_email = "test_calc_list_persist@example.com"
        payload = {
            "name": "TEST_CalcPersist",
            "email": unique_email,
            "consent_communications": True,
            "consent_text": "I agree",
            "calculator_results": [
                {
                    "tool": "roi",
                    "label": "ROI Estimator",
                    "summary": "Payback ~7.2 yr",
                    "raw": {"payback_years": 7.2},
                    "savedAt": "2026-01-15T11:00:00.000Z",
                }
            ],
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text

        # Fetch via admin endpoint and verify persistence
        leads = requests.get(
            f"{API}/admin/leads",
            headers={"Authorization": f"Bearer {admin_token}"},
            timeout=15,
        )
        assert leads.status_code == 200
        rows = leads.json()
        matching = [x for x in rows if x.get("email") == unique_email]
        assert matching, "Inserted lead not found via admin list"
        lead = matching[0]
        cr = lead.get("calculator_results")
        assert isinstance(cr, list)
        assert len(cr) == 1
        row = cr[0]
        for k in ("tool", "label", "summary", "raw", "savedAt"):
            assert k in row, f"Missing key {k} in calculator_results row"
        assert row["tool"] == "roi"

    # --- Backwards compatibility ---
    def test_accepts_null(self):
        payload = {
            "name": "TEST_CalcNull",
            "email": "test_calc_null@example.com",
            "consent_communications": True,
            "consent_text": "ok",
            "calculator_results": None,
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        assert r.json().get("calculator_results") is None

    def test_accepts_missing_field(self):
        payload = {
            "name": "TEST_CalcMissing",
            "email": "test_calc_missing@example.com",
            "consent_communications": True,
            "consent_text": "ok",
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text

    def test_accepts_dict_legacy(self):
        # Old dict shape still accepted (Any allows both)
        payload = {
            "name": "TEST_CalcDictLegacy",
            "email": "test_calc_dict@example.com",
            "consent_communications": True,
            "consent_text": "ok",
            "calculator_results": {"solar_kw": 8.2},
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text


# --- Regression sanity ---
class TestRegression:
    def test_consent_required(self):
        r = requests.post(
            f"{API}/leads",
            json={"name": "TEST_NoConsent2",
                  "email": "test_noconsent2@example.com",
                  "consent_communications": False},
            timeout=15,
        )
        assert r.status_code == 400

    def test_admin_leads_requires_token(self):
        r = requests.get(f"{API}/admin/leads", timeout=15)
        assert r.status_code == 401

    def test_home_html_no_emergent_badge(self):
        # Frontend root - should not contain emergent badge script
        r = requests.get(BASE_URL + "/", timeout=20)
        assert r.status_code == 200
        body = r.text.lower()
        assert "emergent-badge" not in body
        assert "emergent-main.js" not in body
