"""Accutek Solar backend tests — public, leads (NEW 6-Q schema), auth, admin."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
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
        pytest.skip("Admin locked out")
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
        assert len(d["services"]) == 6

    def test_service_area_counties(self, session):
        r = session.get(f"{API}/public/service-area")
        assert r.status_code == 200
        counties = r.json()["counties"]
        assert len(counties) == 17

    def test_county_slug_credit_ended(self, session):
        # NEW: incentive copy should mention credit ended, not "30% federal tax credit available"
        r = session.get(f"{API}/public/service-area/vermillion-county-in")
        assert r.status_code == 200
        c = r.json()
        assert c["slug"] == "vermillion-county-in"
        incentive = c.get("incentive", "")
        assert "30%" not in incentive
        assert "ended" in incentive.lower()

    def test_service_area_not_found(self, session):
        r = session.get(f"{API}/public/service-area/nonexistent")
        assert r.status_code == 404

    def test_testimonials(self, session):
        r = session.get(f"{API}/public/testimonials")
        assert r.status_code == 200
        assert len(r.json()["testimonials"]) == 4

    def test_faq_includes_tax_credit_ended(self, session):
        # NEW: FAQ must contain a tax-credit FAQ mentioning the credit ended
        r = session.get(f"{API}/public/faq")
        assert r.status_code == 200
        faqs = r.json()["faqs"]
        assert len(faqs) >= 7
        joined = " ".join(f["q"] + " " + f["a"] for f in faqs).lower()
        assert "tax credit" in joined
        assert "ended" in joined


# ---------- Lead qualification (NEW 6-Q schema) ----------
class TestLeadQualify:
    def test_hot_lead_full_engagement(self, session):
        payload = {
            "interest_source": "bill_savings",
            "monthly_bill": 250,
            "homeowner_5_7y": True,
            "interest_areas": ["solar", "battery"],
            "aware_credit_ended": True,
            "timeline": "ready_1_3m",
            "service_type": "residential",
        }
        r = session.post(f"{API}/leads/qualify", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["score"] >= 75
        assert d["tier"] == "hot"
        for k in ["annual_savings", "twenty_five_year_savings", "system_size_kw", "payback_years"]:
            assert k in d
            assert isinstance(d[k], (int, float))

    def test_low_engagement_lead(self, session):
        payload = {
            "interest_source": "other",
            "monthly_bill": 50,
            "homeowner_5_7y": False,
            "interest_areas": [],
            "aware_credit_ended": False,
            "timeline": "gathering_info",
            "service_type": "residential",
        }
        r = session.post(f"{API}/leads/qualify", json=payload)
        # Accept either 4xx OR a low-score nurture response
        if r.status_code == 200:
            d = r.json()
            assert d["tier"] == "nurture"
            assert d["score"] < 50
        else:
            assert 400 <= r.status_code < 500

    def test_invalid_timeline_rejected(self, session):
        payload = {
            "interest_source": "bill_savings",
            "monthly_bill": 200,
            "homeowner_5_7y": True,
            "interest_areas": ["solar"],
            "aware_credit_ended": True,
            "timeline": "asap",  # old value, now invalid
            "service_type": "residential",
        }
        r = session.post(f"{API}/leads/qualify", json=payload)
        assert r.status_code == 422


# ---------- Lead submit ----------
class TestLeadSubmit:
    def _payload(self, tcpa=True, email=None):
        return {
            "name": "TEST Hot Lead",
            "email": email or f"TEST_hot_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "8125559999",
            "zip_code": "47842",
            "county": "Vermillion County",
            "state": "IN",
            "answers": {
                "interest_source": "bill_savings",
                "monthly_bill": 250,
                "homeowner_5_7y": True,
                "interest_areas": ["solar", "battery"],
                "aware_credit_ended": True,
                "timeline": "ready_1_3m",
                "service_type": "residential",
            },
            "tcpa_consent": tcpa,
        }

    def test_submit_without_tcpa(self, session):
        r = session.post(f"{API}/leads/submit", json=self._payload(tcpa=False))
        assert r.status_code == 400

    def test_submit_success(self, session):
        r = session.post(f"{API}/leads/submit", json=self._payload())
        assert r.status_code == 200, r.text
        d = r.json()
        assert "lead_id" in d
        assert d["tier"] == "hot"
        assert d["score"] >= 75


# ---------- Auth ----------
class TestAuth:
    def test_login_wrong_password(self, session):
        bad = f"badauth_{uuid.uuid4().hex[:6]}@example.com"
        r = session.post(f"{API}/auth/login", json={"email": bad, "password": "wrong"})
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
        headers = {"Authorization": f"Bearer {data['access_token']}"} if data.get("access_token") else {}
        r2 = s.get(f"{API}/auth/me", headers=headers)
        assert r2.status_code == 200
        assert r2.json()["email"] == ADMIN_EMAIL

    def test_me_without_auth(self):
        s = requests.Session()
        r = s.get(f"{API}/auth/me")
        assert r.status_code == 401

    def test_refresh(self):
        s = requests.Session()
        r = s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        if r.status_code == 429:
            pytest.skip("Locked out")
        r2 = s.post(f"{API}/auth/refresh")
        assert r2.status_code == 200
        assert "access_token" in r2.json()

    def test_logout(self):
        s = requests.Session()
        s.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        r = s.post(f"{API}/auth/logout")
        assert r.status_code == 200

    def test_brute_force_lockout(self):
        # NOTE: ingress load-balances across pods (alternating source IPs),
        # which means the per-(ip+email) lockout key may need >5 raw attempts
        # to accumulate 5 hits on a single IP. We send up to 15 attempts and
        # expect SOME 401s followed by at least one 429 within the burst.
        bad_email = f"locktest_{uuid.uuid4().hex[:6]}@example.com"
        s = requests.Session()
        statuses = []
        for _ in range(15):
            r = s.post(f"{API}/auth/login", json={"email": bad_email, "password": "wrong"})
            statuses.append(r.status_code)
            if r.status_code == 429:
                break
        assert 401 in statuses, f"Expected at least one 401, got {statuses}"
        assert 429 in statuses, f"Expected lockout (429) within burst, got {statuses}"


# ---------- Admin protected endpoints ----------
class TestAdminLeads:
    def _new_lead(self, session, email_prefix="TEST_admin"):
        payload = {
            "name": "TEST Admin",
            "email": f"{email_prefix}_{uuid.uuid4().hex[:6]}@example.com",
            "phone": "8125551111",
            "zip_code": "47842",
            "answers": {
                "interest_source": "bill_savings",
                "monthly_bill": 250,
                "homeowner_5_7y": True,
                "interest_areas": ["solar", "battery"],
                "aware_credit_ended": True,
                "timeline": "ready_1_3m",
                "service_type": "residential",
            },
            "tcpa_consent": True,
        }
        r = session.post(f"{API}/leads/submit", json=payload)
        assert r.status_code == 200, r.text
        return r.json()["lead_id"]

    def test_list_leads_unauthorized(self):
        s = requests.Session()
        r = s.get(f"{API}/leads")
        assert r.status_code == 401

    def test_list_leads_authorized(self, admin_session):
        r = admin_session.get(f"{API}/leads")
        assert r.status_code == 200
        d = r.json()
        assert isinstance(d["leads"], list)

    def test_filter_by_tier(self, admin_session):
        r = admin_session.get(f"{API}/leads?tier=hot")
        assert r.status_code == 200
        for lead in r.json()["leads"]:
            assert lead["tier"] == "hot"

    def test_patch_lead_status(self, admin_session, session):
        lead_id = self._new_lead(session, "TEST_patch")
        r2 = admin_session.patch(f"{API}/leads/{lead_id}", json={"status": "contacted"})
        assert r2.status_code == 200
        assert r2.json()["status"] == "contacted"
        r3 = admin_session.get(f"{API}/leads/{lead_id}")
        assert r3.json()["status"] == "contacted"
        # verify new answer schema persisted
        assert "interest_source" in r3.json()["answers"]
        assert "interest_areas" in r3.json()["answers"]

    def test_sync_hcp(self, admin_session, session):
        lead_id = self._new_lead(session, "TEST_hcp")
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
