"""Preset-only Sunny. No model clients, credentials, paid calls, or budget allowance."""

from __future__ import annotations

import re
import time
import logging
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

logger = logging.getLogger("accutek.sunny")

# ---------------------------------------------------------------------------
# Allowlist of safe, approved link destinations for buttons/links
# ---------------------------------------------------------------------------
ALLOWED_LINKS = {
    "/quote": "Get a Free Quote",
    "/book": "Book Site Visit",
    "/services": "Our Services",
    "/tools/calculator": "Solar Savings Calculator",
    "/service-area": "Service Area",
    "/blog": "Solar Energy Blog",
    "/contact": "Contact Us",
    "/about": "About Accutek Team",
}

# ---------------------------------------------------------------------------
# Seed FAQ Data for Sunny
# Grounded in official site FAQ, company facts, services, and counties
# ---------------------------------------------------------------------------
SUNNY_FAQS = [
    {
        "id": "pricing_general",
        "keywords": [
            "cost", "price", "pricing", "how much", "expensive", "quote", "rate", 
            "estimate", "dollar", "payment", "financing", "per watt", "afford"
        ],
        "question": "How much does a solar or backup system cost?",
        "answer": (
            "Every property and energy goal is unique! Because system size, roof geometry, ground space, "
            "and electrical panel capacity vary, we provide completely free, custom estimates without any high-pressure sales."
        ),
        "suggested_links": [
            {"label": "Get a Free Estimate", "url": "/quote"},
            {"label": "Solar Savings Calculator", "url": "/tools/calculator"},
        ],
        "is_pricing": True,
    },
    {
        "id": "sun_adequacy",
        "keywords": ["enough sun", "cloudy", "winter", "germany", "midwest sun", "sunlight", "weather", "snow"],
        "question": "Do we have enough sun in Indiana / Illinois for solar to make sense?",
        "answer": (
            "Yes! Our region receives more solar energy than Germany, which produces more solar energy "
            "per capita than nearly any other country. Modern Tier-1 panels produce substantial energy year-round in the Midwest."
        ),
        "suggested_links": [
            {"label": "Solar Savings Calculator", "url": "/tools/calculator"},
            {"label": "Get a Free Quote", "url": "/quote"},
        ],
    },
    {
        "id": "roof_vs_ground",
        "keywords": ["roof", "ground", "ground-mount", "ground mount", "roof mount", "pole mount", "yard", "field"],
        "question": "What is the difference between roof-mount and ground-mount solar?",
        "answer": (
            "Roof-mount arrays use your existing roof structure for a fast install and zero extra yard footprint. "
            "Ground-mount arrays sit on heavy-duty steel racks in your yard or field — allowing optimal tilt, "
            "true-south orientation, zero roof penetrations, and easier maintenance. Roughly half of Accutek Solar installs are ground mounts!"
        ),
        "suggested_links": [
            {"label": "Explore Services", "url": "/services"},
            {"label": "Get a Free Quote", "url": "/quote"},
        ],
    },
    {
        "id": "pv_types",
        "keywords": ["types of systems", "grid-tied", "hybrid", "off-grid", "off grid", "grid tied", "battery backup"],
        "question": "What are the different types of solar PV systems?",
        "answer": (
            "We install three primary types: 1) Grid-tied (no batteries, eliminates or reduces your electric bill), "
            "2) Hybrid (grid-tied with lithium battery storage for outage protection), and 3) Off-grid (fully self-sufficient with batteries and a backup generator)."
        ),
        "suggested_links": [
            {"label": "Our Services", "url": "/services"},
            {"label": "Get a Free Quote", "url": "/quote"},
        ],
    },
    {
        "id": "net_metering",
        "keywords": ["net metering", "net billing", "excess power", "credit", "utility bill", "duke energy", "aes", "indiana net metering"],
        "question": "How does net metering or excess power work?",
        "answer": (
            "Net metering credits you on your electric bill for excess clean power your solar array sends to the grid. "
            "In Indiana and Illinois, you can bank credits during long, sunny summer days to offset higher heating and electricity bills in winter."
        ),
        "suggested_links": [
            {"label": "Solar Energy Blog", "url": "/blog"},
            {"label": "Check Local Incentives", "url": "/service-area"},
        ],
    },
    {
        "id": "company_history",
        "keywords": [
            "who are you", "who is accutek", "about accutek", "keith davis", "seth davis",
            "family owned", "experience", "how long", "clinton", "history"
        ],
        "question": "How long has Accutek Solar been in business?",
        "answer": (
            "Accutek Solar was founded in 1994 in Clinton, Indiana by Keith Davis. We are a family-owned contractor "
            "with over 32 years of electrical and solar experience. Keith still serves as President, and his son Seth Davis manages daily operations and custom system design."
        ),
        "suggested_links": [
            {"label": "About Our Team", "url": "/about"},
            {"label": "Contact Us", "url": "/contact"},
        ],
    },
    {
        "id": "generators",
        "keywords": ["generator", "backup generator", "kohler", "standby", "power outage", "storm", "blackout"],
        "question": "Do you install standby backup generators?",
        "answer": (
            "Yes! Accutek Solar is an authorized Kohler generator installer. Kohler whole-home and commercial standby generators "
            "integrate seamlessly with or without solar to provide immediate emergency power whenever the grid goes down."
        ),
        "suggested_links": [
            {"label": "View Services", "url": "/services"},
            {"label": "Book a Site Assessment", "url": "/book"},
        ],
    },
    {
        "id": "free_estimates",
        "keywords": ["free estimate", "free quote", "assessment", "site visit", "consultation", "consult"],
        "question": "Do you offer free estimates and site visits?",
        "answer": (
            "Yes! Every solar, battery, and generator quote is 100% free with zero obligation. "
            "You can try our quick online solar calculator or schedule a site visit with our team."
        ),
        "suggested_links": [
            {"label": "Get a Free Quote", "url": "/quote"},
            {"label": "Book Online", "url": "/book"},
            {"label": "Solar Calculator", "url": "/tools/calculator"},
        ],
    },
    {
        "id": "service_area",
        "keywords": [
            "service area", "location", "counties", "where do you work", "indiana", "illinois", 
            "terre haute", "vermillion", "vigo", "parke", "champaign", "danville", "paris"
        ],
        "question": "Where does Accutek Solar work?",
        "answer": (
            "Accutek Solar is based in Clinton, Indiana. Please share your ZIP code or property location with "
            "our team to confirm service availability. I cannot "
            "confirm coverage for a specific address in chat."
        ),
        "suggested_links": [
            {"label": "View Service Area Map", "url": "/service-area"},
            {"label": "Contact Shop", "url": "/contact"},
        ],
    },
    {
        "id": "brands_equipment",
        "keywords": ["brands", "equipment", "inverter", "sol-ark", "solark", "victron", "enphase", "solaredge", "sma", "fronius", "panels"],
        "question": "What equipment and inverter brands do you install and service?",
        "answer": (
            "We install and service Tier-1 hardware including Sol-Ark, Kohler, Victron Energy, Outback Power, Solis, Fronius, "
            "Enphase, SolarEdge, Schneider Electric, and Emporia. We also repair legacy systems installed by other contractors."
        ),
        "suggested_links": [
            {"label": "View Services", "url": "/services"},
            {"label": "Get a Free Quote", "url": "/quote"},
        ],
    },
    {
        "id": "contact_phone",
        "keywords": ["contact", "phone", "call", "phone number", "speak to someone", "email", "address", "office", "hours"],
        "question": "How can I contact Accutek Solar?",
        "answer": (
            "You can call or text Seth and the team directly at (812) 878-7343, email solarseth7@yahoo.com, "
            "or visit our shop at 9797 S Rangeline Rd., Clinton, IN 47842 (Mon-Fri 8:00 AM - 5:00 PM EST)."
        ),
        "suggested_links": [
            {"label": "Contact Page", "url": "/contact"},
            {"label": "Book Site Visit", "url": "/book"},
        ],
    },
]

# ---------------------------------------------------------------------------
# Local abuse throttling only; this is not a spending control.
# Paid AI is absent, so workers and restarts cannot reset a spend allowance.
# ---------------------------------------------------------------------------
IP_BURST_LIMIT_PER_MINUTE = 20
_ip_request_timestamps: Dict[str, List[float]] = {}


def check_rate_limit(ip: str) -> bool:
    """Returns True if within rate limit, False if rate limited."""
    now = time.time()
    timestamps = _ip_request_timestamps.get(ip, [])
    # Filter to last 60 seconds
    timestamps = [t for t in timestamps if now - t < 60]
    if len(timestamps) >= IP_BURST_LIMIT_PER_MINUTE:
        return False
    timestamps.append(now)
    _ip_request_timestamps[ip] = timestamps
    return True


# ---------------------------------------------------------------------------
# FAQ Matching Logic
# ---------------------------------------------------------------------------
def _tokenize(text: str) -> List[str]:
    return [w for w in re.sub(r"[^\w\s]", " ", text.lower()).split() if len(w) > 1 and w not in {"what", "is", "the", "do", "you", "can", "we", "our", "for", "in", "to", "a", "an", "of", "and", "are", "how", "does", "it", "my", "your", "with", "about"}]


def is_price_query(query: str) -> bool:
    """Detect if the user is asking about prices, costs, rates, dollar amounts."""
    lower = query.lower()
    price_patterns = [
        r"\bhow much\b",
        r"\bwhat does it cost\b",
        r"\bcost\b",
        r"\bprice\b",
        r"\bpricing\b",
        r"\bexpensive\b",
        r"\bper watt\b",
        r"\$\d+",
        r"\bquote\b",
        r"\bestimate\b",
        r"\bafford\b",
        r"\bfinancing\b",
    ]
    for pattern in price_patterns:
        if re.search(pattern, lower):
            return True
    return False


def match_faq(query: str) -> Optional[Dict[str, Any]]:
    """
    Score FAQs against user query using token overlap, keyword matching, and question similarity.
    Returns best matching FAQ dict if confidence exceeds threshold, else None.
    """
    tokens = set(_tokenize(query))
    if not tokens:
        return None

    # Check price query special trigger
    if is_price_query(query):
        return SUNNY_FAQS[0]  # pricing_general

    best_faq = None
    best_score = 0.0

    for faq in SUNNY_FAQS:
        score = 0.0
        faq_tokens = set(_tokenize(faq["question"]))
        keyword_tokens = set()
        for kw in faq["keywords"]:
            keyword_tokens.update(_tokenize(kw))

        # Check full keyword phrase matches
        lower_q = query.lower()
        for kw in faq["keywords"]:
            if re.search(r"\b" + re.escape(kw) + r"\b", lower_q):
                score += 3.0

        # Keyword token overlap
        kw_overlap = tokens.intersection(keyword_tokens)
        score += len(kw_overlap) * 1.5

        # Question token overlap
        q_overlap = tokens.intersection(faq_tokens)
        score += len(q_overlap) * 1.0

        if score > best_score:
            best_score = score
            best_faq = faq

    # Score threshold for a positive FAQ match
    if best_faq and best_score >= 2.5:
        return best_faq

    return None


# ---------------------------------------------------------------------------
# Output Sanitization & Guardrails
# ---------------------------------------------------------------------------
PRICE_DISCLAIMER_REPLY = (
    "Solar and battery system pricing depends on your property layout, electrical service panel, "
    "and kilowatt-hour usage. At Accutek Solar, we never invent ballpark numbers — we provide "
    "completely free, customized estimates tailored to your real site."
)


def sanitize_ai_reply(text: str) -> Dict[str, Any]:
    """
    Check if AI generated prices or $ figures. If so, discard/replace with safe fixed reply.
    """
    # Detect dollar signs or explicit pricing assertions
    if re.search(r"\$\s*\d+|\b\d+\s*dollars\b|\b\d+\s*k\s*dollars\b", text, re.IGNORECASE):
        logger.info("Sunny AI output contained dollar amounts. Discarding and replacing with safe pricing reply.")
        return {
            "text": PRICE_DISCLAIMER_REPLY,
            "was_sanitized": True,
            "suggested_links": [
                {"label": "Get a Free Quote", "url": "/quote"},
                {"label": "Solar Savings Calculator", "url": "/tools/calculator"},
            ],
        }

    return {"text": text, "was_sanitized": False, "suggested_links": []}


def filter_links(links: List[Dict[str, str]]) -> List[Dict[str, str]]:
    """Ensure all links are strictly in the approved allowlist."""
    filtered = []
    seen = set()
    for link in links:
        url = link.get("url", "")
        if url in ALLOWED_LINKS and url not in seen:
            seen.add(url)
            filtered.append({
                "label": link.get("label") or ALLOWED_LINKS[url],
                "url": url,
            })
    return filtered


# ---------------------------------------------------------------------------
# Preset fallback: intentionally no provider implementation or environment switch.
# ---------------------------------------------------------------------------
def preset_fallback() -> Dict[str, Any]:
    return {
        "reply": (
            "I'm Sunny, Accutek Solar's FAQ helper. I can help with solar system types, "
            "roof and ground mounts, generators, free estimates, and contacting the team. "
            "I don't have a verified answer to that question. For property-specific advice, "
            "please contact Accutek or request a free quote. Booking is completed on our booking page, not in chat."
        ),
        "source": "faq_grounded_fallback",
        "suggested_links": [
            {"label": "Get a Free Quote", "url": "/quote"},
            {"label": "Book with Housecall Pro", "url": "/book"},
            {"label": "Contact Us", "url": "/contact"},
        ],
    }


# ---------------------------------------------------------------------------
# Main Chat Request Handler
# ---------------------------------------------------------------------------
class SunnyChatMessage(BaseModel):
    role: Optional[str] = "user"
    sender: Optional[str] = "user"
    text: str = Field(min_length=1, max_length=1000)


class SunnyChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)
    history: Optional[List[SunnyChatMessage]] = Field(default_factory=list)


class SunnyLink(BaseModel):
    label: str
    url: str


class SunnyChatResponse(BaseModel):
    reply: str
    source: str  # faq | pricing_fixed | faq_grounded_fallback | rate_limited
    suggested_links: List[SunnyLink]
    faq_match: Optional[str] = None


async def handle_sunny_chat(req: SunnyChatRequest, client_ip: str) -> SunnyChatResponse:
    """
    Process incoming chat query with rate limiting, FAQ matching, price guardrails, and local presets.
    """
    # 1. Rate Limiter
    if not check_rate_limit(client_ip):
        return SunnyChatResponse(
            reply="Hold on a second! I'm receiving messages a bit too quickly. Please wait a moment before sending another message.",
            source="rate_limited",
            suggested_links=[{"label": "Contact Us", "url": "/contact"}],
            faq_match=None,
        )

    user_query = req.message.strip()

    # Location intent wins over product matches; no inferred coverage or exclusion.
    if re.search(r"\b(serve|service area|coverage|zip|county|counties|located|location)\b|\b(do you|can you) (install|work|travel).*\b(in|at|near)\b", user_query, re.I):
        faq = next(f for f in SUNNY_FAQS if f["id"] == "service_area")
        return SunnyChatResponse(
            reply=faq["answer"], source="faq", faq_match=faq["id"],
            suggested_links=[SunnyLink(**l) for l in filter_links(faq["suggested_links"])],
        )

    # 2. Price Question Guardrail: Immediate safe response + Quote link
    if is_price_query(user_query):
        faq = SUNNY_FAQS[0]
        return SunnyChatResponse(
            reply=f"Hi there! {faq['answer']}",
            source="pricing_fixed",
            suggested_links=[SunnyLink(**link) for link in filter_links(faq["suggested_links"])],
            faq_match="pricing_general",
        )

    # 3. FAQ-First Matching
    matched = match_faq(user_query)
    if matched:
        links = filter_links(matched.get("suggested_links", []))
        return SunnyChatResponse(
            reply=f"Hi! {matched['answer']}",
            source="faq",
            suggested_links=[SunnyLink(**l) for l in links],
            faq_match=matched["id"],
        )

    # 4. Unknown questions always stay local, including with provider keys present.
    preset = preset_fallback()
    clean_links = filter_links(preset.get("suggested_links", []))

    return SunnyChatResponse(
        reply=preset["reply"],
        source=preset["source"],
        suggested_links=[SunnyLink(**l) for l in clean_links],
        faq_match=None,
    )
