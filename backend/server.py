from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import uuid
import secrets
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from typing import Optional, List, Literal

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, Query
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict


# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("accutek")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ACCESS_TTL_MIN = 15
REFRESH_TTL_DAYS = 7
LOCKOUT_THRESHOLD = 5
LOCKOUT_WINDOW_MIN = 15

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Accutek Solar API", version="1.0.0")
api = APIRouter(prefix="/api")

CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS or ["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Security helpers
# ---------------------------------------------------------------------------

def hash_password(pw: str) -> str:
    return bcrypt.hashpw(pw.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(pw: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(pw.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False


def create_token(sub: str, email: str, ttl: timedelta, ttype: str) -> str:
    payload = {
        "sub": sub,
        "email": email,
        "type": ttype,
        "exp": datetime.now(timezone.utc) + ttl,
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def set_auth_cookies(response: Response, access: str, refresh: str) -> None:
    response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none",
                        max_age=ACCESS_TTL_MIN * 60, path="/")
    response.set_cookie("refresh_token", refresh, httponly=True, secure=True, samesite="none",
                        max_age=REFRESH_TTL_DAYS * 86400, path="/")


def clear_auth_cookies(response: Response) -> None:
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")


async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth = request.headers.get("Authorization", "")
        if auth.startswith("Bearer "):
            token = auth[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class QualifyAnswers(BaseModel):
    """Lead qualification per Accutek Operations Manual (6 questions)."""
    # Q1
    interest_source: Literal[
        "bill_savings", "backup_power", "electrical_upgrade", "ev_charger", "other"
    ] = "bill_savings"
    # Q2
    monthly_bill: float = Field(ge=0, le=10000)
    # Q3
    homeowner_5_7y: bool = True  # Owns home & plans to stay 5-7 years
    # Q4 (multi-select)
    interest_areas: List[Literal["solar", "battery", "electrical", "combo"]] = Field(default_factory=list)
    # Q5 — expectation-setter (federal tax credit ended)
    aware_credit_ended: bool = False
    # Q6
    timeline: Literal["ready_1_3m", "exploring", "gathering_info"] = "exploring"
    # Optional residential/commercial split (still useful for routing)
    service_type: Literal["residential", "commercial"] = "residential"


class QualifyRequest(QualifyAnswers):
    pass


class LeadSubmit(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    zip_code: str = Field(min_length=4, max_length=10)
    county: Optional[str] = None
    state: Optional[Literal["IN", "IL"]] = None
    answers: QualifyAnswers
    notes: Optional[str] = Field(default=None, max_length=2000)
    tcpa_consent: bool


class LeadUpdate(BaseModel):
    status: Literal["new", "contacted", "qualified", "won", "lost", "nurture"]


# ---------------------------------------------------------------------------
# Lead scoring
# ---------------------------------------------------------------------------

def score_lead(a: QualifyAnswers) -> dict:
    score = 0
    # Q2 — Monthly bill (0-25)
    if a.monthly_bill >= 300: score += 25
    elif a.monthly_bill >= 200: score += 20
    elif a.monthly_bill >= 120: score += 14
    elif a.monthly_bill >= 60: score += 7

    # Q6 — Timeline (0-25)
    score += {"ready_1_3m": 25, "exploring": 12, "gathering_info": 5}[a.timeline]

    # Q3 — Homeowner staying 5-7y (0-20)
    if a.homeowner_5_7y: score += 20

    # Q1 — Interest reason (0-10)
    score += {"bill_savings": 10, "backup_power": 9, "ev_charger": 7, "electrical_upgrade": 6, "other": 4}[a.interest_source]

    # Q4 — Interest areas (0-12) — wider scope = higher value
    n_areas = len(a.interest_areas)
    if "combo" in a.interest_areas: score += 12
    elif n_areas >= 2: score += 10
    elif n_areas == 1: score += 7

    # Service type (0-5) — commercial slightly higher
    score += 5 if a.service_type == "commercial" else 3

    # Q5 — Already aware credit ended (+5 if yes, they're informed)
    if a.aware_credit_ended: score += 5

    score = max(0, min(score, 100))
    if score >= 75: tier = "hot"
    elif score >= 50: tier = "warm"
    else: tier = "nurture"

    # Estimate (no longer applies federal 30% credit — credit ended).
    # Annual = bill * 12 * offset; offset ~ 75% residential, 65% commercial in this region.
    offset = 0.75 if a.service_type == "residential" else 0.65
    annual_savings = round(a.monthly_bill * 12 * offset, 2)
    twenty_five_year = round(annual_savings * 25 * 1.03, 2)
    system_size_kw = round(max(2.0, a.monthly_bill / 25.0), 1)
    payback_years = round(max(6.0, (system_size_kw * 2800) / max(annual_savings, 1)), 1)

    return {
        "score": score,
        "tier": tier,
        "annual_savings": annual_savings,
        "twenty_five_year_savings": twenty_five_year,
        "system_size_kw": system_size_kw,
        "payback_years": payback_years,
    }


# ---------------------------------------------------------------------------
# HCP stub service
# ---------------------------------------------------------------------------

async def hcp_sync_lead(lead: dict) -> dict:
    """MOCKED Housecall Pro sync — logs the payload and returns a fake HCP id.
    When real credentials are provided, replace this body with an httpx POST to
    https://api.housecallpro.com/customers using the HCP_API_KEY bearer token.
    """
    api_key = os.environ.get("HCP_API_KEY", "")
    company_id = os.environ.get("HCP_COMPANY_ID", "")
    if not api_key:
        logger.info("[HCP MOCK] would sync lead %s (%s) — no HCP_API_KEY set", lead.get("id"), lead.get("email"))
        return {"synced": True, "mocked": True, "hcp_id": f"mock_{uuid.uuid4().hex[:8]}", "company_id": company_id or None}
    # real impl placeholder
    return {"synced": True, "mocked": False, "hcp_id": f"hcp_{uuid.uuid4().hex[:8]}"}


# ---------------------------------------------------------------------------
# Seed data
# ---------------------------------------------------------------------------

COUNTIES = [
    # Indiana
    {"slug": "vermillion-county-in", "name": "Vermillion County", "state": "IN", "seat": "Newport",
     "blurb": "Home turf for Accutek Solar since 1994 — Vermillion County homeowners save thousands with right-sized solar arrays.",
     "incentive": "Indiana net metering + state incentives (federal solar tax credit ended for new systems this year)."},
    {"slug": "parke-county-in", "name": "Parke County", "state": "IN", "seat": "Rockville",
     "blurb": "Rural Parke County properties benefit massively from off-grid and hybrid systems with Kohler backup.",
     "incentive": "Eligible for USDA REAP grants for ag and rural businesses."},
    {"slug": "fountain-county-in", "name": "Fountain County", "state": "IN", "seat": "Covington",
     "blurb": "Custom PV designs for Fountain County homes — financing options available.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "montgomery-county-in", "name": "Montgomery County", "state": "IN", "seat": "Crawfordsville",
     "blurb": "Crawfordsville and Montgomery County families trust Accutek for grid-tied solar and standby generators.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "putnam-county-in", "name": "Putnam County", "state": "IN", "seat": "Greencastle",
     "blurb": "Solar arrays sized for Putnam County's sun hours — typical payback in 6-9 years.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "clay-county-in", "name": "Clay County", "state": "IN", "seat": "Brazil",
     "blurb": "Brazil and surrounding Clay County homes — we install reliable, monitored PV systems.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "sullivan-county-in", "name": "Sullivan County", "state": "IN", "seat": "Sullivan",
     "blurb": "Sullivan County farms and homes — solar plus Kohler generators for true energy independence.",
     "incentive": "USDA REAP grants available for ag & rural businesses (federal solar credit ended for new systems)."},
    {"slug": "vigo-county-in", "name": "Vigo County", "state": "IN", "seat": "Terre Haute",
     "blurb": "Terre Haute homeowners — see our work at Ivy Tech and trust our 32-year track record.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "hendricks-county-in", "name": "Hendricks County", "state": "IN", "seat": "Danville",
     "blurb": "Hendricks County residents — premium installs with attention to detail.",
     "incentive": "Indiana net metering + locally-available rebates (federal solar credit ended this year)."},
    {"slug": "warren-county-in", "name": "Warren County", "state": "IN", "seat": "Williamsport",
     "blurb": "Warren County rural properties — off-grid and hybrid systems our specialty.",
     "incentive": "USDA REAP grants available for ag & rural businesses (federal solar credit ended for new systems)."},
    # Illinois
    {"slug": "edgar-county-il", "name": "Edgar County", "state": "IL", "seat": "Paris",
     "blurb": "Edgar County, IL — Illinois Shines program + federal tax credit make solar incredibly affordable.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "vermilion-county-il", "name": "Vermilion County", "state": "IL", "seat": "Danville",
     "blurb": "Danville and Vermilion County homes — Accutek serves Illinois with the same rigor as Indiana.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "clark-county-il", "name": "Clark County", "state": "IL", "seat": "Marshall",
     "blurb": "Clark County residents — full-service solar from design to monitoring.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "crawford-county-il", "name": "Crawford County", "state": "IL", "seat": "Robinson",
     "blurb": "Crawford County — we handle every detail of your solar install.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "coles-county-il", "name": "Coles County", "state": "IL", "seat": "Charleston",
     "blurb": "Charleston, Mattoon and Coles County families — start saving with solar.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "douglas-county-il", "name": "Douglas County", "state": "IL", "seat": "Tuscola",
     "blurb": "Douglas County homes and farms — solar PV and Kohler generators.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
    {"slug": "champaign-county-il", "name": "Champaign County", "state": "IL", "seat": "Urbana",
     "blurb": "Champaign-Urbana — premium residential and commercial solar with monitoring.",
     "incentive": "Illinois Shines SREC program available (federal solar credit ended for new systems this year)."},
]

TESTIMONIALS = [
    {"initials": "A.F.", "location": "Dana, IN",
     "quote": "Superior knowledge of his products along with great service and reliability!", "rating": 5},
    {"initials": "E.D.", "location": "Clinton, IN",
     "quote": "Accutek Solar designed a customized system for us based upon our location, lifestyle, and budget. We are extremely satisfied with our PV panels and solar thermal tubes. Clean solar energy has enabled us to lower our carbon footprint and eliminate our monthly electric bill.", "rating": 5},
    {"initials": "J.V.", "location": "Terre Haute, IN",
     "quote": "I am really glad I decided to buy a system from Accutek. There is no better feeling than seeing your electric meter spin backwards! System was installed in a timely manner with professionalism and has been working flawlessly since.", "rating": 5},
    {"initials": "J.R.", "location": "Ivy Tech, Lafayette, IN",
     "quote": "Accutek has been key in the design, integration, and custom installation of new and existing systems at the Craig Porter Energy Center. Their expertise and installation quality is one to admire.", "rating": 5},
]

FAQS = [
    {"q": "Do we have enough sun in our area for solar to make sense?",
     "a": "Yes — we have more solar energy available here than in Germany, and Germany produces more solar energy per capita than any other country."},
    {"q": "What is the difference between roof-mount and ground-mount solar?",
     "a": "Roof-mount arrays use your existing roof structure — fast install, no extra footprint. Ground-mount arrays sit in your yard or field on a steel rack — they let us pick the perfect tilt and orientation, avoid roof shading, and are easier to service. Roughly half of our installs are ground mounts. Pole mounts (with sun tracking) are a third option for premium output on rural lots."},
    {"q": "What are the different types of PV systems?",
     "a": "1) Grid-tied (no batteries, reduces or eliminates your electric bill). 2) Hybrid (grid-tied with batteries for outage backup). 3) Off-grid (fully independent with batteries and a backup generator)."},
    {"q": "What is net metering?",
     "a": "Net metering credits you for excess power you produce. In Indiana, the utility doesn't pay cash but credits your account — perfect for using summer overproduction to offset winter use."},
    {"q": "How long has Accutek Solar been in business?",
     "a": "Accutek Solar was founded in 1994 by Keith Davis. We are a family-owned company with over 32 years of electrical and solar installation experience."},
    {"q": "Is the federal solar tax credit still available?",
     "a": "The big federal solar tax credit for new systems ended this year. The good news: state-level programs (Indiana net metering, Illinois Shines SREC), USDA REAP grants for ag/rural businesses, and utility incentives are still in play — and equipment pricing has come down. Talk to us about today's real-world payback math."},
    {"q": "Do you install backup generators?",
     "a": "Yes — we are authorized Kohler generator installers. Kohler has a proven track record for emergency power that's ready when you need it."},
    {"q": "Do you offer free estimates?",
     "a": "Yes, every solar and generator quote is free. Use our online calculator for a fast estimate, then book a free site visit."},
]

COMPANY = {
    "name": "Accutek Solar",
    "tagline": "The future of energy",
    "founded": 1994,
    "years_in_business": datetime.now(timezone.utc).year - 1994,
    "founder": "Keith Davis",
    "phone": "(812) 878-7343",
    "phone_tel": "+18128787343",
    "email": "solarseth7@yahoo.com",
    "address": "9797 S Rangeline Rd., Clinton, IN 47842",
    "address_short": "Clinton, IN",
    "stats": {"homes_powered": 1247, "money_saved": 2400000, "satisfaction": 98, "years_experience": datetime.now(timezone.utc).year - 1994},
    "services": [
        {"slug": "residential-solar", "name": "Residential Solar PV", "desc": "Grid-tied, hybrid and off-grid systems — roof, ground or pole mount."},
        {"slug": "ground-mount", "name": "Ground-Mount Arrays", "desc": "Field, yard and ag-site arrays sized for higher output and easier service."},
        {"slug": "commercial-solar", "name": "Commercial & Ag Solar", "desc": "Custom designs for farms, businesses and ag operations — REAP-eligible."},
        {"slug": "backup-generators", "name": "Kohler Backup Generators", "desc": "Authorized Kohler installers for true energy resilience."},
        {"slug": "electrical", "name": "Electrical Install & Repair", "desc": "32 years of electrical service from a licensed team."},
        {"slug": "led-monitoring", "name": "LED & Energy Monitoring", "desc": "Lower your usage with smart lighting and live monitoring."},
    ],
    "trust_badges": ["NABCEP", "BBB A+", "Google 5-Star", "Indiana Solar Coalition", "Licensed & Insured", "32 Years"],
}


# ---------------------------------------------------------------------------
# Public endpoints
# ---------------------------------------------------------------------------

@api.get("/")
async def root():
    return {"service": "Accutek Solar API", "status": "ok"}


@api.get("/public/company-info")
async def get_company_info():
    return COMPANY


@api.get("/public/service-area")
async def get_service_area():
    return {"counties": COUNTIES}


@api.get("/public/service-area/{slug}")
async def get_county(slug: str):
    for c in COUNTIES:
        if c["slug"] == slug:
            return c
    raise HTTPException(status_code=404, detail="County not found")


@api.get("/public/testimonials")
async def get_testimonials():
    return {"testimonials": TESTIMONIALS}


@api.get("/public/faq")
async def get_faq():
    return {"faqs": FAQS}


# ---------------------------------------------------------------------------
# Lead endpoints
# ---------------------------------------------------------------------------

@api.post("/leads/qualify")
async def qualify(body: QualifyRequest):
    result = score_lead(body)
    return result


@api.post("/leads/submit")
async def submit_lead(body: LeadSubmit, request: Request):
    if not body.tcpa_consent:
        raise HTTPException(status_code=400, detail="TCPA consent is required")

    scored = score_lead(body.answers)
    lead_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    doc = {
        "id": lead_id,
        "name": body.name.strip(),
        "email": body.email.lower().strip(),
        "phone": body.phone.strip(),
        "zip_code": body.zip_code.strip(),
        "county": body.county,
        "state": body.state,
        "answers": body.answers.model_dump(),
        "notes": body.notes,
        "tcpa_consent": True,
        "ip": request.client.host if request.client else None,
        "user_agent": request.headers.get("user-agent"),
        "score": scored["score"],
        "tier": scored["tier"],
        "estimate": {
            "annual_savings": scored["annual_savings"],
            "twenty_five_year_savings": scored["twenty_five_year_savings"],
            "system_size_kw": scored["system_size_kw"],
            "payback_years": scored["payback_years"],
        },
        "status": "new",
        "hcp_sync": None,
        "created_at": now,
        "updated_at": now,
    }
    await db.leads.insert_one(doc)
    doc.pop("_id", None)

    # MOCKED notification: hot leads would email solarseth7@yahoo.com
    if scored["tier"] == "hot":
        logger.info("[NOTIFY MOCK] HOT LEAD %s — %s (%s) score=%s", lead_id, body.name, body.email, scored["score"])

    return {"lead_id": lead_id, **scored}


@api.get("/leads")
async def list_leads(
    user: dict = Depends(get_current_user),
    tier: Optional[Literal["hot", "warm", "nurture"]] = None,
    status: Optional[str] = None,
    service_type: Optional[Literal["residential", "commercial"]] = None,
    q: Optional[str] = None,
    limit: int = Query(default=100, le=500),
):
    query: dict = {}
    if tier:
        query["tier"] = tier
    if status:
        query["status"] = status
    if service_type:
        query["answers.service_type"] = service_type
    if q:
        query["$or"] = [
            {"name": {"$regex": q, "$options": "i"}},
            {"email": {"$regex": q, "$options": "i"}},
            {"phone": {"$regex": q, "$options": "i"}},
            {"zip_code": {"$regex": q, "$options": "i"}},
        ]
    cursor = db.leads.find(query, {"_id": 0}).sort("created_at", -1).limit(limit)
    leads = await cursor.to_list(length=limit)
    return {"leads": leads, "count": len(leads)}


@api.get("/leads/{lead_id}")
async def get_lead(lead_id: str, user: dict = Depends(get_current_user)):
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    return lead


@api.patch("/leads/{lead_id}")
async def update_lead(lead_id: str, body: LeadUpdate, user: dict = Depends(get_current_user)):
    now = datetime.now(timezone.utc).isoformat()
    result = await db.leads.update_one(
        {"id": lead_id},
        {"$set": {"status": body.status, "updated_at": now}},
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    return lead


@api.post("/leads/{lead_id}/sync-hcp")
async def sync_lead_to_hcp(lead_id: str, user: dict = Depends(get_current_user)):
    lead = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    result = await hcp_sync_lead(lead)
    now = datetime.now(timezone.utc).isoformat()
    await db.leads.update_one({"id": lead_id}, {"$set": {"hcp_sync": {**result, "synced_at": now}, "updated_at": now}})
    updated = await db.leads.find_one({"id": lead_id}, {"_id": 0})
    return updated


# ---------------------------------------------------------------------------
# Admin stats
# ---------------------------------------------------------------------------

@api.get("/admin/stats")
async def admin_stats(user: dict = Depends(get_current_user)):
    total = await db.leads.count_documents({})
    hot = await db.leads.count_documents({"tier": "hot"})
    warm = await db.leads.count_documents({"tier": "warm"})
    nurture = await db.leads.count_documents({"tier": "nurture"})
    won = await db.leads.count_documents({"status": "won"})
    today_start = datetime.now(timezone.utc).replace(hour=0, minute=0, second=0, microsecond=0).isoformat()
    today = await db.leads.count_documents({"created_at": {"$gte": today_start}})
    conv = round((won / total) * 100, 1) if total else 0.0
    return {
        "total": total, "hot": hot, "warm": warm, "nurture": nurture,
        "won": won, "today": today, "conversion_rate": conv,
    }


# ---------------------------------------------------------------------------
# Auth endpoints
# ---------------------------------------------------------------------------

async def _lockout_key(ip: str, email: str) -> str:
    return f"{ip or 'unknown'}:{email.lower()}"


async def _is_locked(identifier: str) -> bool:
    rec = await db.login_attempts.find_one({"identifier": identifier})
    if not rec:
        return False
    if rec.get("count", 0) >= LOCKOUT_THRESHOLD:
        last = rec.get("last_attempt")
        if isinstance(last, str):
            last_dt = datetime.fromisoformat(last)
        else:
            last_dt = last
        if last_dt and last_dt.tzinfo is None:
            last_dt = last_dt.replace(tzinfo=timezone.utc)
        if last_dt and datetime.now(timezone.utc) - last_dt < timedelta(minutes=LOCKOUT_WINDOW_MIN):
            return True
        await db.login_attempts.delete_one({"identifier": identifier})
    return False


async def _record_failure(identifier: str) -> None:
    now = datetime.now(timezone.utc).isoformat()
    await db.login_attempts.update_one(
        {"identifier": identifier},
        {"$inc": {"count": 1}, "$set": {"last_attempt": now}},
        upsert=True,
    )


async def _clear_failures(identifier: str) -> None:
    await db.login_attempts.delete_one({"identifier": identifier})


@api.post("/auth/login")
async def login(body: LoginRequest, request: Request, response: Response):
    ip = request.client.host if request.client else "unknown"
    identifier = await _lockout_key(ip, body.email)
    if await _is_locked(identifier):
        raise HTTPException(status_code=429, detail="Too many failed attempts. Try again in 15 minutes.")

    user = await db.users.find_one({"email": body.email.lower()})
    if not user or not verify_password(body.password, user["password_hash"]):
        await _record_failure(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await _clear_failures(identifier)
    access = create_token(user["id"], user["email"], timedelta(minutes=ACCESS_TTL_MIN), "access")
    refresh = create_token(user["id"], user["email"], timedelta(days=REFRESH_TTL_DAYS), "refresh")
    set_auth_cookies(response, access, refresh)
    return {"id": user["id"], "email": user["email"], "name": user.get("name"), "role": user.get("role"),
            "access_token": access}


@api.post("/auth/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Missing refresh token")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        access = create_token(user["id"], user["email"], timedelta(minutes=ACCESS_TTL_MIN), "access")
        response.set_cookie("access_token", access, httponly=True, secure=True, samesite="none",
                            max_age=ACCESS_TTL_MIN * 60, path="/")
        return {"access_token": access}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")


@api.post("/auth/logout")
async def logout(response: Response):
    clear_auth_cookies(response)
    return {"success": True}


@api.get("/auth/me")
async def me(user: dict = Depends(get_current_user)):
    return user


# ---------------------------------------------------------------------------
# Startup: indexes + admin seed
# ---------------------------------------------------------------------------

@app.on_event("startup")
async def startup():
    # indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.leads.create_index("id", unique=True)
    await db.leads.create_index([("score", -1), ("created_at", -1)])
    await db.leads.create_index("zip_code")
    await db.leads.create_index("tier")
    await db.leads.create_index("status")
    await db.login_attempts.create_index("identifier")

    # seed admin (idempotent)
    admin_email = os.environ["ADMIN_EMAIL"].lower()
    admin_password = os.environ["ADMIN_PASSWORD"]
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": admin_email,
            "password_hash": hash_password(admin_password),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user %s", admin_email)
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}},
        )
        logger.info("Updated admin password for %s", admin_email)


@app.on_event("shutdown")
async def shutdown():
    client.close()


app.include_router(api)

