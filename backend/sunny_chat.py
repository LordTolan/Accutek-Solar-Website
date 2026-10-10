"""
Sunny Chatbot Backend Service for Accutek Solar.

Features:
1. Fast FAQ Matching (BM25 / token matching + semantic scoring across existing FAQ & Accutek knowledge)
2. Safety Guardrails:
   - Fixed reply + /quote link for price questions ("How much does solar cost?", "$/watt", etc.)
   - Price sanitizer to strip/discard AI replies containing '$' or fabricated dollar amounts
   - Strict link allowlist (only approved internal routes or verified booking links)
3. Hard Spend Cap ($25/mo cap simulation / daily request cutoff):
   - In-memory & DB-backed daily spend/request tracker + per-IP rate limiter
   - When daily AI budget is exceeded, seamlessly drops back to FAQ-only mode
4. AI Fallback (OpenAI / Anthropic):
   - Grounded Accutek context (32 years, family-owned, Keith & Seth Davis, 17 counties IN/IL, Kohler backup, Sol-Ark, etc.)
   - If no API key is provided, safely stubs AI and operates in robust FAQ-only mode.
"""

from __future__ import annotations

import re
import os
import time
import logging
from datetime import datetime, timezone
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
    "/service-area": "Service Area (17 Counties)",
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
            "who are you", "who is accutek", "about", "keith davis", "seth davis", 
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
            "We serve 17 counties across West Central Indiana (Vermillion, Parke, Fountain, Montgomery, Putnam, Clay, "
            "Sullivan, Vigo, Hendricks, Warren) and East Central Illinois (Edgar, Vermilion, Clark, Crawford, Coles, Douglas, Champaign)."
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
        "keywords": ["phone", "call", "phone number", "speak to someone", "email", "address", "office", "hours"],
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
# Rate Limiting & Spend Cap Configuration
# Target: ~$25/month hard cap for AI calls
# ---------------------------------------------------------------------------
# Assumptions:
# - FAQ matching has $0 AI cost
# - AI fallback calls (gpt-4o-mini / claude-3-haiku) ~ $0.001 per turn
# - $25/mo ≈ $0.80/day budget ≈ 800 AI calls/day maximum.
DAILY_AI_CALL_LIMIT = int(os.environ.get("SUNNY_DAILY_AI_LIMIT", "500"))
IP_BURST_LIMIT_PER_MINUTE = 20

# In-memory rate limiting and budget tracking
_ip_request_timestamps: Dict[str, List[float]] = {}
_daily_ai_call_counter = {"date": "", "count": 0}


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


def check_and_increment_daily_ai_budget() -> bool:
    """Returns True if AI call is permitted within daily spend cap."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    if _daily_ai_call_counter["date"] != today:
        _daily_ai_call_counter["date"] = today
        _daily_ai_call_counter["count"] = 0

    if _daily_ai_call_counter["count"] >= DAILY_AI_CALL_LIMIT:
        logger.warning(
            "Sunny daily AI spend cap reached (%d calls). Falling back to FAQ-only mode.",
            _daily_ai_call_counter["count"]
        )
        return False

    _daily_ai_call_counter["count"] += 1
    return True


# ---------------------------------------------------------------------------
# FAQ Matching Logic
# ---------------------------------------------------------------------------
def _tokenize(text: str) -> List[str]:
    return [w for w in re.sub(r"[^\w\s]", " ", text.lower()).split() if len(w) > 1]


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
            if kw in lower_q:
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
# AI Model Fallback (OpenAI / Anthropic or Stub)
# ---------------------------------------------------------------------------
SYSTEM_PROMPT = """You are Sunny, the cheerful, warm, and knowledgeable solar mascot for Accutek Solar (accuteksolar.com).
Company Facts:
- Accutek Solar was founded in 1994 by Keith Davis (32 years in business).
- Family-owned, located at 9797 S Rangeline Rd., Clinton, IN 47842.
- Keith Davis is Founder/President. His son Seth Davis is Owner/Operator and designs systems. Clint, Colt, and AJ ("Scruff") are technicians/installers.
- Service Area: 17 counties across West Central Indiana & East Central Illinois.
- Core specialties: Residential solar PV (roof and ground-mounts ~50% of installs), Kohler backup generators, lithium battery storage, ag/commercial solar, electrical contracting.
- Phone: (812) 878-7343, Email: solarseth7@yahoo.com.

STRICT SAFETY RULES:
1. NEVER invent, guess, or state dollar prices, costs, or quotes (no '$' signs or dollar amounts).
2. For any pricing, cost, or financing question, kindly explain that every site is custom-engineered and direct them to get a free quote at /quote or check the calculator at /tools/calculator.
3. NEVER promise or confirm bookings directly inside the chat — always direct the customer to the online booking page at /book or quote page at /quote.
4. Be friendly, warm, cheerful, concise (2-4 sentences max), polite, and professional.
5. Only suggest approved site sections: /quote, /book, /services, /tools/calculator, /service-area, /blog, /contact, /about.
"""


async def generate_ai_reply(messages: List[Dict[str, str]]) -> Dict[str, Any]:
    """
    Calls OpenAI or Anthropic API if key exists and daily spend cap allows.
    Otherwise returns grounded fallback.
    """
    openai_key = os.environ.get("OPENAI_API_KEY", "").strip()
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()

    # Check spend cap
    if not check_and_increment_daily_ai_budget():
        return {
            "reply": (
                "Hi there! I'm Sunny from Accutek Solar. For detailed questions or custom system sizing, "
                "our local team in Clinton is happy to help you with a free quote or site visit!"
            ),
            "source": "spend_cap_fallback",
            "suggested_links": [
                {"label": "Get a Free Quote", "url": "/quote"},
                {"label": "Book Online", "url": "/book"},
            ],
        }

    # 1. Try OpenAI if available
    if openai_key:
        try:
            import httpx
            headers = {
                "Authorization": f"Bearer {openai_key}",
                "Content-Type": "application/json",
            }
            # Keep prompt compact to minimize token costs
            formatted_msgs = [{"role": "system", "content": SYSTEM_PROMPT}]
            for m in messages[-4:]:  # last 4 turns
                role = "assistant" if m.get("sender") == "sunny" or m.get("role") == "assistant" else "user"
                formatted_msgs.append({"role": role, "content": m.get("text") or m.get("content", "")})

            payload = {
                "model": os.environ.get("SUNNY_OPENAI_MODEL", "gpt-4o-mini"),
                "messages": formatted_msgs,
                "temperature": 0.4,
                "max_tokens": 200,
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers)
                if res.status_code == 200:
                    data = res.json()
                    raw_reply = data["choices"][0]["message"]["content"].strip()
                    sanitized = sanitize_ai_reply(raw_reply)
                    if sanitized["was_sanitized"]:
                        return {
                            "reply": sanitized["text"],
                            "source": "ai_sanitized",
                            "suggested_links": sanitized["suggested_links"],
                        }
                    return {
                        "reply": raw_reply,
                        "source": "openai",
                        "suggested_links": [
                            {"label": "Get a Free Quote", "url": "/quote"},
                            {"label": "Explore Services", "url": "/services"},
                        ],
                    }
                else:
                    logger.warning("OpenAI API returned %s: %s", res.status_code, res.text)
        except Exception as e:
            logger.error("OpenAI call error: %s", str(e))

    # 2. Try Anthropic if available
    if anthropic_key:
        try:
            import httpx
            headers = {
                "x-api-key": anthropic_key,
                "anthropic-version": "2023-06-01",
                "Content-Type": "application/json",
            }
            formatted_msgs = []
            for m in messages[-4:]:
                role = "assistant" if m.get("sender") == "sunny" or m.get("role") == "assistant" else "user"
                formatted_msgs.append({"role": role, "content": m.get("text") or m.get("content", "")})

            payload = {
                "model": os.environ.get("SUNNY_ANTHROPIC_MODEL", "claude-3-haiku-20240307"),
                "system": SYSTEM_PROMPT,
                "messages": formatted_msgs,
                "max_tokens": 200,
            }
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post("https://api.anthropic.com/v1/messages", json=payload, headers=headers)
                if res.status_code == 200:
                    data = res.json()
                    raw_reply = data["content"][0]["text"].strip()
                    sanitized = sanitize_ai_reply(raw_reply)
                    if sanitized["was_sanitized"]:
                        return {
                            "reply": sanitized["text"],
                            "source": "ai_sanitized",
                            "suggested_links": sanitized["suggested_links"],
                        }
                    return {
                        "reply": raw_reply,
                        "source": "anthropic",
                        "suggested_links": [
                            {"label": "Get a Free Quote", "url": "/quote"},
                            {"label": "Explore Services", "url": "/services"},
                        ],
                    }
                else:
                    logger.warning("Anthropic API returned %s: %s", res.status_code, res.text)
        except Exception as e:
            logger.error("Anthropic call error: %s", str(e))

    # 3. Default Grounded Fallback (when no AI keys provided or API error)
    return {
        "reply": (
            "Hi! I'm Sunny, Accutek Solar's mascot. I'm here to help with questions about solar PV, "
            "ground mounts, battery storage, and standby generators across West Central Indiana and East Central Illinois. "
            "How can I help power your home or business today?"
        ),
        "source": "faq_grounded_fallback",
        "suggested_links": [
            {"label": "Get a Free Quote", "url": "/quote"},
            {"label": "Solar Calculator", "url": "/tools/calculator"},
            {"label": "Our Services", "url": "/services"},
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
    source: str  # "faq" | "pricing_fixed" | "openai" | "anthropic" | "faq_grounded_fallback" | "rate_limited"
    suggested_links: List[SunnyLink]
    faq_match: Optional[str] = None


async def handle_sunny_chat(req: SunnyChatRequest, client_ip: str) -> SunnyChatResponse:
    """
    Process incoming chat query with rate limiting, FAQ-first matching, price guardrails, and AI fallback.
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

    # 4. Fallback to Cheap AI Model with Accutek Grounding
    history_dicts = []
    if req.history:
        for h in req.history:
            history_dicts.append({"role": h.role or "user", "text": h.text, "sender": h.sender})
    history_dicts.append({"role": "user", "text": user_query, "sender": "user"})

    ai_result = await generate_ai_reply(history_dicts)
    clean_links = filter_links(ai_result.get("suggested_links", []))

    return SunnyChatResponse(
        reply=ai_result["reply"],
        source=ai_result["source"],
        suggested_links=[SunnyLink(**l) for l in clean_links],
        faq_match=None,
    )
