"""AccuTek Solar backend API tests."""
import os
import pytest
import requests
from datetime import datetime

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://solar-calc-41.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# ---------- Root ----------
class TestRoot:
    def test_root_ok(self):
        r = requests.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data or "name" in data
        # spec: returns name and version - message contains name, version present
        assert "version" in data
        assert data["version"]


# ---------- Company ----------
class TestCompany:
    def test_company_info(self):
        r = requests.get(f"{API}/company", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["name"] == "Accutek Solar"
        assert data["president"] == "Keith Davis"
        assert "Seth Davis" in data["owners"]
        assert "Quill Davis" in data["owners"]
        assert data["phone"] == "(812) 878-7343"
        assert data["founded"] == 1994
        assert "service_areas" in data
        indiana = data["service_areas"].get("Indiana", [])
        illinois = data["service_areas"].get("Illinois", [])
        assert len(indiana) == 10, f"Expected 10 IN counties, got {len(indiana)}"
        assert len(illinois) == 7, f"Expected 7 IL counties, got {len(illinois)}"
        assert len(indiana) + len(illinois) == 17


# ---------- Status (regression) ----------
class TestStatus:
    def test_create_and_get_status(self):
        payload = {"client_name": "TEST_regression_client"}
        r = requests.post(f"{API}/status", json=payload, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["client_name"] == "TEST_regression_client"
        assert "id" in data and data["id"]
        assert "timestamp" in data

        r2 = requests.get(f"{API}/status", timeout=15)
        assert r2.status_code == 200
        rows = r2.json()
        assert isinstance(rows, list)
        assert any(x.get("client_name") == "TEST_regression_client" for x in rows)
        # no _id leakage
        for x in rows:
            assert "_id" not in x


# ---------- Leads ----------
class TestLeads:
    def test_create_lead_valid(self):
        payload = {
            "name": "TEST_Jane Smith",
            "email": "test_jane@example.com",
            "phone": "(812) 555-0000",
            "address": "Vigo County, IN",
            "interest": "solar",
            "monthly_bill": 180.0,
            "message": "Interested in roof solar",
            "calculator_results": {"solar_kw": 8.2},
            "source": "website-contact",
            "consent_communications": True,
            "consent_text": "I agree to be contacted by Accutek Solar.",
        }
        r = requests.post(f"{API}/leads", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["id"]
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["interest"] == "solar"
        # ISO timestamp check
        assert "created_at" in data
        # pydantic serializes datetime - should be string-ish that parses
        ts = data["created_at"]
        if isinstance(ts, str):
            # remove Z if present
            datetime.fromisoformat(ts.replace("Z", "+00:00"))

    def test_create_lead_missing_name(self):
        r = requests.post(
            f"{API}/leads",
            json={"name": "", "email": "x@y.com", "consent_communications": True},
            timeout=15,
        )
        assert r.status_code == 400

    def test_create_lead_missing_email(self):
        r = requests.post(
            f"{API}/leads",
            json={"name": "TEST_nobody", "email": "", "consent_communications": True},
            timeout=15,
        )
        assert r.status_code == 400

    def test_create_lead_missing_consent(self):
        # TCPA: consent_communications not set -> 400
        r = requests.post(
            f"{API}/leads",
            json={
                "name": "TEST_no_consent",
                "email": "test_noconsent@example.com",
                "interest": "general",
            },
            timeout=15,
        )
        assert r.status_code == 400, r.text
        data = r.json()
        assert "consent" in (data.get("detail") or "").lower()

    def test_create_lead_consent_false(self):
        r = requests.post(
            f"{API}/leads",
            json={
                "name": "TEST_consent_false",
                "email": "test_consent_false@example.com",
                "consent_communications": False,
            },
            timeout=15,
        )
        assert r.status_code == 400

    def test_create_lead_missing_email_field(self):
        # Completely missing required field -> pydantic 422
        r = requests.post(
            f"{API}/leads",
            json={"name": "TEST_no_email"},
            timeout=15,
        )
        assert r.status_code in (400, 422)

    def test_list_leads_sorted_no_id_leak(self):
        # As of iteration 4, GET /api/leads requires admin Bearer.
        for i in range(2):
            requests.post(
                f"{API}/leads",
                json={
                    "name": f"TEST_order_{i}",
                    "email": f"test_order_{i}@example.com",
                    "interest": "general",
                    "consent_communications": True,
                },
                timeout=15,
            )
        # Unauth -> 401
        unauth = requests.get(f"{API}/leads", timeout=15)
        assert unauth.status_code == 401
        # Authed
        login = requests.post(
            f"{API}/auth/login",
            json={"email": "admin@accuteksolar.com",
                  "password": "naA3T6l9fpmyqc2tuE1pnA2c"},
            timeout=15,
        )
        if login.status_code == 429:
            pytest.skip("Admin locked out")
        assert login.status_code == 200
        token = login.json()["access_token"]
        r = requests.get(f"{API}/leads",
                         headers={"Authorization": f"Bearer {token}"}, timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 2
        # no _id leakage
        for row in rows:
            assert "_id" not in row
            assert "id" in row
        # sorted desc by created_at
        timestamps = []
        for row in rows:
            ts = row.get("created_at")
            if isinstance(ts, str):
                timestamps.append(datetime.fromisoformat(ts.replace("Z", "+00:00")))
        # check descending
        for a, b in zip(timestamps, timestamps[1:]):
            assert a >= b, "Leads not sorted descending by created_at"
