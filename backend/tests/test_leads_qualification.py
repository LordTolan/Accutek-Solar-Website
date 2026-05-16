"""Tests for new lead qualification fields and emergent branding removal."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://solar-intake-hub.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@accuteksolar.com"
ADMIN_PASSWORD = "naA3T6l9fpmyqc2tuE1pnA2c"


@pytest.fixture(scope="module")
def admin_token():
    r = requests.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"Login failed: {r.status_code} {r.text}"
    return r.json()["access_token"]


# ── New qualification fields ─────────────────────────────────
class TestLeadQualification:
    def test_post_lead_with_new_fields_roundtrip(self, admin_token):
        payload = {
            "name": "TEST_QualUser",
            "email": "TEST_qual@example.com",
            "phone": "(812) 555-0001",
            "interest": "solar",
            "monthly_bill": 220,
            "timeline": "1-3_months",
            "owns_home_5yr_plus": True,
            "services_solar_panels": True,
            "services_battery_backup": True,
            "services_electrical_panel": False,
            "consent_communications": True,
            "consent_text": "test consent",
        }
        r = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        for k in ("owns_home_5yr_plus", "services_solar_panels", "services_battery_backup",
                  "services_electrical_panel", "timeline"):
            assert k in data, f"missing {k} in response"
        assert data["owns_home_5yr_plus"] is True
        assert data["services_solar_panels"] is True
        assert data["services_battery_backup"] is True
        assert data["services_electrical_panel"] is False
        assert data["timeline"] == "1-3_months"
        lead_id = data["id"]

        # Persistence check via admin endpoint
        admin_r = requests.get(
            f"{BASE_URL}/api/admin/leads",
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert admin_r.status_code == 200
        leads = admin_r.json()
        found = next((l for l in leads if l.get("id") == lead_id), None)
        assert found is not None, "Lead not persisted"
        assert found["owns_home_5yr_plus"] is True
        assert found["services_solar_panels"] is True
        assert found["services_battery_backup"] is True
        assert found["services_electrical_panel"] is False
        assert found["timeline"] == "1-3_months"

    def test_post_lead_defaults_when_new_fields_omitted(self):
        payload = {
            "name": "TEST_LegacyUser",
            "email": "TEST_legacy@example.com",
            "consent_communications": True,
        }
        r = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["owns_home_5yr_plus"] is False
        assert data["services_solar_panels"] is False
        assert data["services_battery_backup"] is False
        assert data["services_electrical_panel"] is False
        assert data["timeline"] is None


# ── Regression: validation ───────────────────────────────────
class TestLeadValidation:
    def test_post_lead_rejects_no_consent(self):
        r = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_NoConsent", "email": "TEST_nc@example.com",
            "consent_communications": False,
        })
        assert r.status_code == 400
        assert "consent" in r.json().get("detail", "").lower()

    def test_post_lead_rejects_missing_name(self):
        r = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "", "email": "TEST_x@example.com", "consent_communications": True,
        })
        assert r.status_code == 400

    def test_post_lead_rejects_missing_email(self):
        r = requests.post(f"{BASE_URL}/api/leads", json={
            "name": "TEST_NoEmail", "email": "", "consent_communications": True,
        })
        assert r.status_code == 400


# ── Emergent branding removed ─────────────────────────────────
class TestEmergentBrandingRemoved:
    def test_html_no_emergent_badge(self):
        r = requests.get(f"{BASE_URL}/")
        assert r.status_code == 200
        html = r.text
        assert "emergent-badge" not in html
        assert "Made with Emergent" not in html
        assert "assets.emergent.sh/scripts/emergent-main.js" not in html


# ── Smoke: commercial form still works ───────────────────────
class TestCommercialRegression:
    def test_commercial_post_multipart(self):
        r = requests.post(
            f"{BASE_URL}/api/commercial-leads",
            data={
                "name": "TEST_CommercialReg",
                "email": "TEST_comm@example.com",
                "phone": "555-0000",
                "consent_communications": "true",
            },
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == "TEST_comm@example.com"
        assert data["consent_communications"] is True

    def test_commercial_post_requires_consent(self):
        r = requests.post(
            f"{BASE_URL}/api/commercial-leads",
            data={"name": "TEST_NoConsent", "email": "TEST_nc2@example.com"},
        )
        assert r.status_code == 400


# ── Smoke: admin login ─────────────────────────────────
class TestAdminLogin:
    def test_admin_login_success(self, admin_token):
        r = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {admin_token}"},
        )
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL
