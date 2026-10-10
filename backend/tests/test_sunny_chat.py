"""
Unit and integration tests for Sunny Chatbot endpoint (/api/chat/sunny).
"""
import pytest
from fastapi.testclient import TestClient
from server import app
from sunny_chat import (
    match_faq,
    is_price_query,
    sanitize_ai_reply,
    filter_links,
    ALLOWED_LINKS,
    PRICE_DISCLAIMER_REPLY,
)

client = TestClient(app)


class TestSunnyChatbotLogic:
    def test_price_detection(self):
        assert is_price_query("How much does solar cost?") is True
        assert is_price_query("What is your price per watt?") is True
        assert is_price_query("Is it expensive?") is True
        assert is_price_query("Can you give me an estimate?") is True
        assert is_price_query("Tell me about ground mounts") is False

    def test_faq_matching(self):
        # Ground mount match
        match = match_faq("What is the difference between roof and ground mount?")
        assert match is not None
        assert match["id"] == "roof_vs_ground"

        # Sun adequacy match
        match = match_faq("Is there enough sun in Indiana like Germany?")
        assert match is not None
        assert match["id"] == "sun_adequacy"

        # Generator match
        match = match_faq("Do you install Kohler backup generators?")
        assert match is not None
        assert match["id"] == "generators"

        # Service area match
        match = match_faq("Do you serve Vigo and Vermillion counties?")
        assert match is not None
        assert match["id"] == "service_area"

    def test_price_sanitizer(self):
        # AI output containing price should be replaced
        dirty_reply = "A typical 10kW system costs $25,000 before federal tax credits."
        clean = sanitize_ai_reply(dirty_reply)
        assert clean["was_sanitized"] is True
        assert clean["text"] == PRICE_DISCLAIMER_REPLY
        assert any(l["url"] == "/quote" for l in clean["suggested_links"])

        # Safe reply without prices should pass untouched
        safe_reply = "We install Tier-1 ground-mount arrays custom sized for your property."
        passed = sanitize_ai_reply(safe_reply)
        assert passed["was_sanitized"] is False
        assert passed["text"] == safe_reply

    def test_link_allowlist(self):
        links = [
            {"label": "Quote", "url": "/quote"},
            {"label": "Evil Site", "url": "https://phishing.com"},
            {"label": "Random", "url": "/not-allowed-route"},
            {"label": "Calculator", "url": "/tools/calculator"},
        ]
        filtered = filter_links(links)
        assert len(filtered) == 2
        urls = [l["url"] for l in filtered]
        assert "/quote" in urls
        assert "/tools/calculator" in urls
        assert "https://phishing.com" not in urls


class TestSunnyChatbotEndpoints:
    def test_chat_sunny_faq_match(self):
        res = client.post(
            "/api/chat/sunny",
            json={"message": "Do we have enough sun in our area for solar to work?"},
        )
        assert res.status_code == 200
        data = res.json()
        assert "reply" in data
        assert data["source"] in ("faq", "pricing_fixed")
        assert len(data["suggested_links"]) > 0
        for link in data["suggested_links"]:
            assert link["url"] in ALLOWED_LINKS

    def test_chat_sunny_price_guardrail(self):
        res = client.post(
            "/api/chat/sunny",
            json={"message": "How much does a 10 kW solar array cost in Indiana?"},
        )
        assert res.status_code == 200
        data = res.json()
        assert data["source"] == "pricing_fixed"
        assert "$" not in data["reply"]
        assert any(l["url"] == "/quote" for l in data["suggested_links"])

    def test_chat_sunny_ai_fallback_or_grounded(self):
        res = client.post(
            "/api/chat/sunny",
            json={"message": "Can solar help my barn roof withstand the Midwest winter?"},
        )
        assert res.status_code == 200
        data = res.json()
        assert "reply" in data
        assert "$" not in data["reply"]
        assert data["source"] in ("faq", "faq_grounded_fallback", "openai", "anthropic")

    def test_sunny_faqs_list(self):
        res = client.get("/api/chat/sunny/faqs")
        assert res.status_code == 200
        data = res.json()
        assert "faqs" in data
        assert len(data["faqs"]) >= 8
