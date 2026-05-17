"""Accutek Solar backend tests — public, leads, auth, admin."""
import os
import time
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    # fallback: read frontend .env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL"):
                BASE_URL = line.split("=", 1)[1].strip().strip('"').rstrip("/")

API = f"{BASE_URL}/api"
ADMIN_EMAIL = "admin@accuteksolar.com"
ADMIN_PASSWORD = "admin123"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    if r.status_code == 429:
        pytest.skip("Admin locked out from prior tests")
    assert r.status_code == 200, f"Admin login failed: {r.status_code} {r.text}"
    data = r.json()
    if data.get("access_token"):
        s.headers.update({"Authorization": f"Bearer {data['access_token']}"})
    return s


# ---------- Public endpoints ----------
class TestPublic:
    def test_company_info(self, session):
        r = session.get(f"{API}/public/company-info")
        assert r.status_code == 200
        d = r.json()
        assert d["name"] == "Accutek Solar"
        assert d["years_in_business"] == 32
        assert len(d["services"]) == 6
        assert isinstance(d["trust_badges"], list) and len(d["trust_badges"]) > 0

    def test_service_area_counties(self, session):
        r = session.get(f"{API}/public/service-area")
        assert r.status_code == 200
        counties = r.json()["counties"]
        assert len(counties) == 17
        assert sum(1 for c in counties if c["state"] == "IN") == 10
        assert sum(1 for c in counties if c["state"] == "IL") == 7

    def test_service_area_slug(self, session):
        r = session.get(f"{API}/public/service-area/vermillion-county-in")
        assert r.status_code == 200
        c = r.json()
        assert c["slug"] == "vermillion-county-in"
        assert c["state"] == "IN"
        assert c["name"] == "Vermillion County"

    def test_service_area_not_found(self, session):
        r = session.get(f"{API}/public/service-area/nonexistent")
        assert r.status_code == 404

    def test_testimonials(self, session):
        r = session.get(f"{API}/public/testimonials")
        assert r.status_code == 200
        assert len(r.json()["testimonials"]) == 4

    def test_faq(self, session):
        r = session.get(f"{API}/public/faq")
        assert r.status_code == 200
        assert len(r.json()["faqs"]) == 7


# ---------- Lead qualification ----------
class TestLeadQualify:
    def test_hot_lead(self, session):
        payload = {"monthly_bill": 250, "homeowner": True, "roof_age": "good",
                   "timeline": "asap", "service_type": "residential"}
        r = session.post(f"{API}/leads/qualify", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert 70 <= d["score"] <= 90
        assert d["tier"] == "hot"
        for k in ["annual_savings", "twenty_five_year_savings", "system_size_kw", "payback_years"]:
            assert k in d

    def test_nurture_lead(self, session):
        payload = {"monthly_bill": 50, "homeowner": False, "roof_age": "old",
                   "timeline": "browsing", "service_type": "residential"}
        r = session.post(f"{API}/leads/qualify", json=payload)
        assert r.status_code == 200
        d = r.json()
        assert d["tier"] == "nurture"
        assert d["score"] < 50


# ---------- Lead submit ----------
class TestLeadSubmit:
    def test_submit_without_tcpa(self, session):
        payload = {
            "name": "Test User", "email": "test_no_tcpa@example.com",
            "phone": "8125551234", "zip_code": "47842",
            "answers": {"monthly_bill": 200, "homeowner": True, "roof_age": "good",
                        "timeline": "asap", "service_type": "residential"},
            "tcpa_consent": False,
        }
        r = session.post(f"{API}/leads/submit", json=payload)
        assert r.status_code == 400

    def test_submit_success(self, session):
        payload = {
            "name": "TEST Hot Lead", "email": f"TEST_hot_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "8125559999", "zip_code": "47842",
            "county": "Vermillion County", "state": "IN",
            "answers": {"monthly_bill": 250, "homeowner": True, "roof_age": "good",
                        "timeline": "asap", "service_type": "residential"},
            "tcpa_consent": True,
        }
        r = session.post(f"{API}/leads/submit", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert "lead_id" in d
        assert d["tier"] == "hot"
        assert "score" in d
        pytest.shared_lead_id = d["lead_id"]


# ---------- Auth ----------
class TestAuth:
    def test_login_wrong_password(self, session):
        # Use a unique email per run so we don't trigger lockout against admin
        r = session.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong_xxx"})
        assert r.status_code in (401, 429)

    def test_login_success_and_me(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        if r.status_code == 429:
            pytest.skip("Locked out")
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        # cookies set
        assert "access_token" in s.cookies or data.get("access_token")
        # me works via header
        headers = {"Authorization": f"Bearer {data['access_token']}"} if data.get("access_token") else {}
        r2 = s.get(f"{API}/auth/me", headers=headers)
        assert r2.status_code == 200, r2.text
        assert r2.json()["email"] == ADMIN_EMAIL

    def test_me_without_auth(self, session):
        s = requests.Session()  # no cookies
        r = s.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_refresh(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        if r.status_code == 429:
            pytest.skip("Locked out")
        assert r.status_code == 200
        # cookie-based refresh
        r2 = s.post(f"{API}/auth/refresh")
        assert r2.status_code == 200
        assert "access_token" in r2.json()

    def test_logout(self):
        s = requests.Session()
        s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        r = s.post(f"{API}/auth/logout")
        assert r.status_code == 200

    def test_brute_force_lockout(self):
        # Use a unique non-admin email to avoid impacting admin
        bad_email = f"locktest_{uuid.uuid4().hex[:6]}@example.com"
        s = requests.Session()
        statuses = []
        for i in range(6):
            r = s.post(f"{API}/auth/login", json={"email": bad_email, "password": "wrong"})
            statuses.append(r.status_code)
        # First 5 should be 401, 6th should be 429
        assert statuses[:5] == [401] * 5, f"Got {statuses}"
        assert statuses[5] == 429, f"Got {statuses}"


# ---------- Admin protected endpoints ----------
class TestAdminLeads:
    def test_list_leads_unauthorized(self, session):
        s = requests.Session()
        r = s.get(f"{API}/leads")
        assert r.status_code == 401

    def test_list_leads_authorized(self, admin_session):
        r = admin_session.get(f"{API}/leads")
        assert r.status_code == 200
        d = r.json()
        assert "leads" in d and isinstance(d["leads"], list)
        assert "count" in d

    def test_filter_by_tier(self, admin_session):
        r = admin_session.get(f"{API}/leads?tier=hot")
        assert r.status_code == 200
        for lead in r.json()["leads"]:
            assert lead["tier"] == "hot"

    def test_search_filter(self, admin_session):
        r = admin_session.get(f"{API}/leads?q=TEST")
        assert r.status_code == 200

    def test_patch_lead_status(self, admin_session, session):
        # create a lead
        payload = {
            "name": "TEST Patch", "email": f"TEST_patch_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "8125551111", "zip_code": "47842",
            "answers": {"monthly_bill": 250, "homeowner": True, "roof_age": "good",
                        "timeline": "asap", "service_type": "residential"},
            "tcpa_consent": True,
        }
        r = session.post(f"{API}/leads/submit", json=payload)
        lead_id = r.json()["lead_id"]
        # patch
        r2 = admin_session.patch(f"{API}/leads/{lead_id}", json={"status": "contacted"})
        assert r2.status_code == 200
        assert r2.json()["status"] == "contacted"
        # verify
        r3 = admin_session.get(f"{API}/leads/{lead_id}")
        assert r3.json()["status"] == "contacted"

    def test_sync_hcp(self, admin_session, session):
        payload = {
            "name": "TEST HCP", "email": f"TEST_hcp_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "8125552222", "zip_code": "47842",
            "answers": {"monthly_bill": 250, "homeowner": True, "roof_age": "good",
                        "timeline": "asap", "service_type": "residential"},
            "tcpa_consent": True,
        }
        r = session.post(f"{API}/leads/submit", json=payload)
        lead_id = r.json()["lead_id"]
        r2 = admin_session.post(f"{API}/leads/{lead_id}/sync-hcp")
        assert r2.status_code == 200
        updated = r2.json()
        assert updated["hcp_sync"] is not None
        assert updated["hcp_sync"]["mocked"] is True
        assert "hcp_id" in updated["hcp_sync"]

    def test_admin_stats(self, admin_session):
        r = admin_session.get(f"{API}/admin/stats")
        assert r.status_code == 200
        d = r.json()
        for k in ["total", "hot", "warm", "nurture", "today", "conversion_rate"]:
            assert k in d
