"""AccuTek Solar — admin auth + admin endpoints tests (Iteration 4)."""
import io
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://solar-calc-41.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@accuteksolar.com"
ADMIN_PASSWORD = "naA3T6l9fpmyqc2tuE1pnA2c"


def _login(email=ADMIN_EMAIL, password=ADMIN_PASSWORD):
    return requests.post(f"{API}/auth/login", json={"email": email, "password": password}, timeout=15)


@pytest.fixture(scope="module")
def admin_token():
    r = _login()
    if r.status_code == 429:
        pytest.skip("Locked out from prior runs; need DB cleanup")
    assert r.status_code == 200, r.text
    return r.json()["access_token"]


@pytest.fixture(scope="module")
def auth_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}"}


# ---------- /api/auth/login ----------
class TestAuthLogin:
    def test_valid_login_returns_token(self):
        r = _login()
        assert r.status_code == 200, r.text
        data = r.json()
        for k in ("access_token", "token_type", "expires_in", "user"):
            assert k in data
        assert data["token_type"] == "bearer"
        assert isinstance(data["expires_in"], int) and data["expires_in"] > 0
        u = data["user"]
        assert u["email"] == ADMIN_EMAIL
        assert u["role"] == "admin"
        assert "id" in u
        assert "password_hash" not in u

    def test_wrong_password_returns_401(self):
        r = requests.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-pw-xyz-1"}, timeout=15)
        # 401 on bad creds; 429 only if test was already run multiple times
        assert r.status_code in (401, 429), r.text

    def test_unknown_user_returns_401(self):
        r = requests.post(f"{API}/auth/login",
                          json={"email": "noone@example.com", "password": "whatever"}, timeout=15)
        assert r.status_code in (401, 429)


# ---------- /api/auth/me ----------
class TestAuthMe:
    def test_me_with_token(self, auth_headers):
        r = requests.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "password_hash" not in data
        assert "_id" not in data

    def test_me_without_token_401(self):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_me_with_garbage_token_401(self):
        r = requests.get(f"{API}/auth/me",
                         headers={"Authorization": "Bearer this.is.not.a.jwt"}, timeout=15)
        assert r.status_code == 401


# ---------- /api/admin/leads ----------
class TestAdminLeads:
    def test_requires_auth(self):
        r = requests.get(f"{API}/admin/leads", timeout=15)
        assert r.status_code == 401

    def test_returns_sorted_no_id(self, auth_headers):
        r = requests.get(f"{API}/admin/leads", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        for row in rows:
            assert "_id" not in row
        # sorted desc by created_at when present
        ts = [row.get("created_at") for row in rows if row.get("created_at")]
        for a, b in zip(ts, ts[1:]):
            assert a >= b, "admin/leads not sorted desc by created_at"


# ---------- /api/admin/commercial-leads ----------
class TestAdminCommercialLeads:
    def test_requires_auth(self):
        r = requests.get(f"{API}/admin/commercial-leads", timeout=15)
        assert r.status_code == 401

    def test_excludes_data_base64(self, auth_headers):
        # First create a commercial lead with a tiny PNG attached via public POST
        png = bytes.fromhex(
            "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4"
            "890000000A49444154789C6300010000000500010D0A2DB40000000049454E44AE426082"
        )
        files = {"site_plan": ("tiny.png", io.BytesIO(png), "image/png")}
        data = {
            "name": "TEST_admin_commercial",
            "email": "test_admin_commercial@example.com",
            "company": "TEST Co",
            "consent_communications": "true",
        }
        cr = requests.post(f"{API}/commercial-leads", files=files, data=data, timeout=20)
        assert cr.status_code == 200, cr.text
        created_id = cr.json()["id"]

        r = requests.get(f"{API}/admin/commercial-leads", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        match = next((x for x in rows if x.get("id") == created_id), None)
        assert match is not None, "Newly created commercial lead not visible in admin list"
        # site_plan present with metadata, no data_base64
        sp = match.get("site_plan")
        assert sp is not None
        assert "data_base64" not in sp
        for k in ("filename", "content_type", "size_bytes"):
            assert k in sp
        # global no _id leakage
        for row in rows:
            assert "_id" not in row

    def test_download_site_plan(self, auth_headers):
        # create one fresh
        png = bytes.fromhex(
            "89504E470D0A1A0A0000000D49484452000000010000000108060000001F15C4"
            "890000000A49444154789C6300010000000500010D0A2DB40000000049454E44AE426082"
        )
        files = {"site_plan": ("dl.png", io.BytesIO(png), "image/png")}
        data = {"name": "TEST_dl", "email": "test_dl@example.com", "consent_communications": "true"}
        cr = requests.post(f"{API}/commercial-leads", files=files, data=data, timeout=20)
        assert cr.status_code == 200
        lid = cr.json()["id"]

        r = requests.get(f"{API}/admin/commercial-leads/{lid}/site-plan",
                         headers=auth_headers, timeout=15)
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("image/png")
        cd = r.headers.get("content-disposition", "")
        assert "attachment" in cd.lower()
        assert "dl.png" in cd
        assert r.content == png

    def test_download_site_plan_no_attachment_404(self, auth_headers):
        # create commercial lead WITHOUT file
        data = {"name": "TEST_no_file", "email": "test_no_file@example.com", "consent_communications": "true"}
        cr = requests.post(f"{API}/commercial-leads", data=data, timeout=20)
        assert cr.status_code == 200
        lid = cr.json()["id"]
        r = requests.get(f"{API}/admin/commercial-leads/{lid}/site-plan",
                         headers=auth_headers, timeout=15)
        assert r.status_code == 404

    def test_download_requires_auth(self):
        r = requests.get(f"{API}/admin/commercial-leads/anything/site-plan", timeout=15)
        assert r.status_code == 401


# ---------- /api/admin/stats ----------
class TestAdminStats:
    def test_requires_auth(self):
        r = requests.get(f"{API}/admin/stats", timeout=15)
        assert r.status_code == 401

    def test_returns_counts(self, auth_headers):
        r = requests.get(f"{API}/admin/stats", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        data = r.json()
        for k in ("residential_leads", "commercial_leads", "commercial_with_attachment"):
            assert k in data
            assert isinstance(data[k], int)
            assert data[k] >= 0
        assert data["commercial_with_attachment"] <= data["commercial_leads"]


# ---------- /api/auth/logout ----------
class TestAuthLogout:
    def test_logout_with_token(self, auth_headers):
        r = requests.post(f"{API}/auth/logout", headers=auth_headers, timeout=15)
        assert r.status_code == 200

    def test_logout_without_token_401(self):
        r = requests.post(f"{API}/auth/logout", timeout=15)
        assert r.status_code == 401


# ---------- Legacy endpoints now require auth ----------
class TestLegacyAuth:
    def test_legacy_leads_requires_auth(self):
        r = requests.get(f"{API}/leads", timeout=15)
        assert r.status_code == 401

    def test_legacy_commercial_requires_auth(self):
        r = requests.get(f"{API}/commercial-leads", timeout=15)
        assert r.status_code == 401

    def test_legacy_leads_with_auth_works(self, auth_headers):
        r = requests.get(f"{API}/leads", headers=auth_headers, timeout=15)
        assert r.status_code == 200

    def test_legacy_commercial_with_auth_works(self, auth_headers):
        r = requests.get(f"{API}/commercial-leads", headers=auth_headers, timeout=15)
        assert r.status_code == 200


# ---------- Public endpoints still public ----------
class TestPublicStillWorks:
    def test_root_public(self):
        assert requests.get(f"{API}/", timeout=15).status_code == 200

    def test_company_public(self):
        assert requests.get(f"{API}/company", timeout=15).status_code == 200

    def test_status_post_public(self):
        r = requests.post(f"{API}/status", json={"client_name": "TEST_pub_status"}, timeout=15)
        assert r.status_code == 200

    def test_leads_post_public(self):
        r = requests.post(f"{API}/leads", json={
            "name": "TEST_pub_lead", "email": "test_pub_lead@example.com",
            "consent_communications": True,
        }, timeout=15)
        assert r.status_code == 200

    def test_commercial_post_public(self):
        r = requests.post(f"{API}/commercial-leads", data={
            "name": "TEST_pub_com", "email": "test_pub_com@example.com",
            "consent_communications": "true",
        }, timeout=15)
        assert r.status_code == 200
