from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import base64
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

app = FastAPI(title="Accutek Solar API")
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
    return {"message": "Accutek Solar API", "version": "1.0.0"}


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


MAX_UPLOAD_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_UPLOAD_TYPES = {
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "image/tiff",
}


@api_router.post("/commercial-leads")
async def create_commercial_lead(
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    company: Optional[str] = Form(None),
    title: Optional[str] = Form(None),
    facility_size: Optional[str] = Form(None),
    facility_type: Optional[str] = Form(None),
    critical_loads: Optional[str] = Form(None),
    existing_system_brand: Optional[str] = Form(None),
    timeline: Optional[str] = Form(None),
    address: Optional[str] = Form(None),
    message: Optional[str] = Form(None),
    consent_communications: bool = Form(False),
    consent_text: Optional[str] = Form(None),
    site_plan: Optional[UploadFile] = File(None),
):
    if not name.strip() or not email.strip():
        raise HTTPException(status_code=400, detail="Name and email are required")
    if not consent_communications:
        raise HTTPException(
            status_code=400,
            detail="Communication consent is required to submit a request",
        )

    file_meta: Optional[Dict[str, Any]] = None
    if site_plan is not None and site_plan.filename:
        content = await site_plan.read()
        if len(content) > MAX_UPLOAD_BYTES:
            raise HTTPException(
                status_code=413,
                detail=f"File exceeds 10 MB limit (got {len(content) // 1024 // 1024} MB)",
            )
        if site_plan.content_type and site_plan.content_type not in ALLOWED_UPLOAD_TYPES:
            raise HTTPException(
                status_code=415,
                detail=f"Unsupported file type: {site_plan.content_type}",
            )
        file_meta = {
            "filename": site_plan.filename,
            "content_type": site_plan.content_type,
            "size_bytes": len(content),
            "data_base64": base64.b64encode(content).decode("ascii"),
        }

    now = datetime.now(timezone.utc)
    lead_id = str(uuid.uuid4())
    doc = {
        "id": lead_id,
        "name": name,
        "email": email,
        "phone": phone,
        "company": company,
        "title": title,
        "facility_size": facility_size,
        "facility_type": facility_type,
        "critical_loads": critical_loads,
        "existing_system_brand": existing_system_brand,
        "timeline": timeline,
        "address": address,
        "message": message,
        "consent_communications": consent_communications,
        "consent_text": consent_text,
        "consent_timestamp": now.isoformat(),
        "source": "website-commercial",
        "site_plan": file_meta,
        "created_at": now.isoformat(),
    }
    await db.commercial_leads.insert_one(doc)

    response = {k: v for k, v in doc.items() if k not in {"site_plan", "_id"}}
    if file_meta:
        response["site_plan"] = {
            "filename": file_meta["filename"],
            "content_type": file_meta["content_type"],
            "size_bytes": file_meta["size_bytes"],
        }
    return response


@api_router.get("/commercial-leads")
async def list_commercial_leads(limit: int = 100):
    projection = {"_id": 0, "site_plan.data_base64": 0}
    rows = await db.commercial_leads.find({}, projection).sort("created_at", -1).to_list(limit)
    return rows


@api_router.get("/company")
async def company_info():
    """Static company info pulled from accuteksolar.com (cached on backend)."""
    return {
        "name": "Accutek Solar",
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
