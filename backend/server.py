from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="AccuTek Solar API")
api_router = APIRouter(prefix="/api")


# ----- Models -----
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class LeadCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    interest: str = "general"  # solar, battery, generator, electrical, general
    message: Optional[str] = None
    monthly_bill: Optional[float] = None
    calculator_results: Optional[Dict[str, Any]] = None
    source: Optional[str] = "website"
    consent_communications: bool = False
    consent_text: Optional[str] = None


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    interest: str = "general"
    message: Optional[str] = None
    monthly_bill: Optional[float] = None
    calculator_results: Optional[Dict[str, Any]] = None
    source: Optional[str] = "website"
    consent_communications: bool = False
    consent_text: Optional[str] = None
    consent_timestamp: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "AccuTek Solar API", "version": "1.0.0"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    if not payload.name.strip() or not payload.email.strip():
        raise HTTPException(status_code=400, detail="Name and email are required")
    if not payload.consent_communications:
        raise HTTPException(
            status_code=400,
            detail="Communication consent is required to submit a request",
        )
    lead = Lead(**payload.model_dump())
    lead.consent_timestamp = datetime.now(timezone.utc)
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    if doc.get('consent_timestamp'):
        doc['consent_timestamp'] = doc['consent_timestamp'].isoformat()
    await db.leads.insert_one(doc)
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            try:
                r['created_at'] = datetime.fromisoformat(r['created_at'])
            except Exception:
                pass
    return rows


@api_router.get("/company")
async def company_info():
    """Static company info pulled from accuteksolar.com (cached on backend)."""
    return {
        "name": "AccuTek Solar",
        "founded": 1994,
        "founder": "Keith Davis",
        "president": "Keith Davis",
        "owners": ["Seth Davis", "Quill Davis"],
        "ownership": "Founded by Keith Davis in 1994 — still President today. His sons Seth Davis and Quill Davis run day-to-day operations.",
        "phone": "(812) 878-7343",
        "phone_raw": "+18128787343",
        "email": "solarseth7@yahoo.com",
        "address": {
            "street": "9797 S Rangeline Rd.",
            "city": "Clinton",
            "state": "IN",
            "zip": "47842"
        },
        "service_areas": {
            "Indiana": [
                "Vermillion", "Parke", "Fountain", "Montgomery",
                "Putnam", "Clay", "Sullivan", "Vigo", "Hendricks", "Warren"
            ],
            "Illinois": [
                "Edgar", "Vermilion", "Clark", "Crawford",
                "Coles", "Douglas", "Champaign"
            ]
        }
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
