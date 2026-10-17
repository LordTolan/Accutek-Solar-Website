from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
from datetime import datetime, timezone

from fastapi import FastAPI, APIRouter, HTTPException, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient


# ---------------------------------------------------------------------------
# Setup
# ---------------------------------------------------------------------------

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("accutek")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

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
# Seed data
# ---------------------------------------------------------------------------

COUNTIES = [
    # Indiana
    {"slug": "vermillion-county-in", "name": "Vermillion County", "state": "IN", "seat": "Newport",
     "blurb": "Home turf for Accutek Solar since 1994 — Vermillion County homeowners save thousands with right-sized solar arrays.",
     "incentive": "Indiana net metering + state and utility incentives available."},
    {"slug": "parke-county-in", "name": "Parke County", "state": "IN", "seat": "Rockville",
     "blurb": "Rural Parke County properties benefit massively from off-grid and hybrid systems with Kohler backup.",
     "incentive": "Eligible for USDA REAP grants for ag and rural businesses."},
    {"slug": "fountain-county-in", "name": "Fountain County", "state": "IN", "seat": "Covington",
     "blurb": "Custom PV designs for Fountain County homes — financing options available.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "montgomery-county-in", "name": "Montgomery County", "state": "IN", "seat": "Crawfordsville",
     "blurb": "Crawfordsville and Montgomery County families trust Accutek for grid-tied solar and standby generators.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "putnam-county-in", "name": "Putnam County", "state": "IN", "seat": "Greencastle",
     "blurb": "Solar arrays sized for Putnam County's sun hours — typical payback in 6-9 years.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "clay-county-in", "name": "Clay County", "state": "IN", "seat": "Brazil",
     "blurb": "Brazil and surrounding Clay County homes — we install reliable, monitored PV systems.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "sullivan-county-in", "name": "Sullivan County", "state": "IN", "seat": "Sullivan",
     "blurb": "Sullivan County farms and homes — solar plus Kohler generators for true energy independence.",
     "incentive": "USDA REAP grants available for ag & rural businesses."},
    {"slug": "vigo-county-in", "name": "Vigo County", "state": "IN", "seat": "Terre Haute",
     "blurb": "Terre Haute homeowners — see our work at Ivy Tech and trust our 32-year track record.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "hendricks-county-in", "name": "Hendricks County", "state": "IN", "seat": "Danville",
     "blurb": "Hendricks County residents — premium installs with attention to detail.",
     "incentive": "Indiana net metering + locally-available rebates available."},
    {"slug": "warren-county-in", "name": "Warren County", "state": "IN", "seat": "Williamsport",
     "blurb": "Warren County rural properties — off-grid and hybrid systems our specialty.",
     "incentive": "USDA REAP grants available for ag & rural businesses."},
    # Illinois
    {"slug": "edgar-county-il", "name": "Edgar County", "state": "IL", "seat": "Paris",
     "blurb": "Edgar County, IL — Illinois Shines SREC program makes solar a smart investment.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "vermilion-county-il", "name": "Vermilion County", "state": "IL", "seat": "Danville",
     "blurb": "Danville and Vermilion County homes — Accutek serves Illinois with the same rigor as Indiana.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "clark-county-il", "name": "Clark County", "state": "IL", "seat": "Marshall",
     "blurb": "Clark County residents — full-service solar from design to monitoring.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "crawford-county-il", "name": "Crawford County", "state": "IL", "seat": "Robinson",
     "blurb": "Crawford County — we handle every detail of your solar install.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "coles-county-il", "name": "Coles County", "state": "IL", "seat": "Charleston",
     "blurb": "Charleston, Mattoon and Coles County families — start saving with solar.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "douglas-county-il", "name": "Douglas County", "state": "IL", "seat": "Tuscola",
     "blurb": "Douglas County homes and farms — solar PV and Kohler generators.",
     "incentive": "Illinois Shines SREC program available."},
    {"slug": "champaign-county-il", "name": "Champaign County", "state": "IL", "seat": "Urbana",
     "blurb": "Champaign-Urbana — premium residential and commercial solar with monitoring.",
     "incentive": "Illinois Shines SREC program available."},
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
    "stats": {"homes_powered": 1400, "money_saved": 25000000, "satisfaction": 98, "years_experience": datetime.now(timezone.utc).year - 1994},
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
# Sunny Chatbot endpoints
# ---------------------------------------------------------------------------
from sunny_chat import (
    SunnyChatRequest,
    SunnyChatResponse,
    handle_sunny_chat,
    SUNNY_FAQS,
)


@api.post("/chat/sunny", response_model=SunnyChatResponse)
async def chat_with_sunny(req: SunnyChatRequest, request: Request):
    client_ip = request.client.host if request.client else "unknown"
    return await handle_sunny_chat(req, client_ip)


@api.post("/chat", response_model=SunnyChatResponse)
async def chat_generic(req: SunnyChatRequest, request: Request):
    """Alias for POST /api/chat as specified in research memo."""
    client_ip = request.client.host if request.client else "unknown"
    return await handle_sunny_chat(req, client_ip)


@api.get("/chat/sunny/faqs")
async def get_sunny_faqs():
    """Return list of quick-start FAQ suggestions for Sunny companion."""
    return {
        "faqs": [
            {"id": f["id"], "question": f["question"]}
            for f in SUNNY_FAQS
        ]
    }



# ---------------------------------------------------------------------------
# Public holiday display (existing stored override + frontend date fallback)
# ---------------------------------------------------------------------------

@api.get("/public/holiday-theme")
async def get_holiday_theme_public():
    doc = await db.site_settings.find_one({"key": "holiday_theme"}, {"_id": 0})
    if doc and doc.get("force_active"):
        return {"active": True, "theme_name": doc.get("theme_name", "halloween"), "reason": "admin_override"}
    return {"active": False, "theme_name": None, "reason": "no_override"}


@app.on_event("shutdown")
async def shutdown():
    client.close()


app.include_router(api)
