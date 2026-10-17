"""Local route contracts: never connect to a deployed service or use credentials."""
import asyncio
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

from fastapi.testclient import TestClient

from server import app, get_holiday_theme_public


def test_obsolete_routes_are_absent():
    paths = {route.path for route in app.routes}
    assert not any(
        path.startswith(("/api/auth", "/api/admin", "/api/leads"))
        for path in paths
    )
    client = TestClient(app)
    for method, path in (
        ("GET", "/api/admin/stats"),
        ("POST", "/api/auth/login"),
        ("POST", "/api/leads/submit"),
        ("POST", "/api/leads/example/sync-hcp"),
        ("PUT", "/api/admin/settings/holiday-theme"),
    ):
        assert client.request(method, path).status_code == 404


def test_public_content_and_chat_routes_remain():
    client = TestClient(app)
    for path in ("/api/", "/api/public/company-info", "/api/public/testimonials",
                 "/api/public/service-area", "/api/public/faq", "/api/chat/sunny/faqs"):
        assert client.get(path).status_code == 200
    paths = {route.path for route in app.routes}
    assert {"/api/chat", "/api/chat/sunny"} <= paths


def test_stored_holiday_override_remains_readable():
    lookup = AsyncMock(return_value={"force_active": True, "theme_name": "halloween"})
    with patch("server.db", SimpleNamespace(site_settings=SimpleNamespace(find_one=lookup))):
        result = asyncio.run(get_holiday_theme_public())
    assert result == {"active": True, "theme_name": "halloween", "reason": "admin_override"}
    lookup.assert_awaited_once_with({"key": "holiday_theme"}, {"_id": 0})


def test_no_override_preserves_frontend_date_fallback():
    for stored in (None, {"force_active": False, "theme_name": "halloween"}):
        lookup = AsyncMock(return_value=stored)
        with patch("server.db", SimpleNamespace(site_settings=SimpleNamespace(find_one=lookup))):
            result = asyncio.run(get_holiday_theme_public())
        assert result == {"active": False, "theme_name": None, "reason": "no_override"}
