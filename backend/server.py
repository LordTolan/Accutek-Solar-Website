from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form, Depends, Request, BackgroundTasks
from fastapi.responses import Response
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
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
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta

from email_service import notify_new_residential_lead, notify_new_commercial_lead


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Accutek Solar API")
api_router = APIRouter(prefix="/api")

# ──────────────────────────────────────────────────────────
# Auth config
# ──────────────────────────────────────────────────────────
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_TTL_HOURS = 8
MAX_FAILED_ATTEMPTS = 5
LOCKOUT_MINUTES = 15
security_scheme = HTTPBearer(auto_error=False)


def get_jwt_secret() -> str:
    secret = os.environ.get("JWT_SECRET")
    if not secret:
        raise HTTPException(status_code=500, detail="JWT_SECRET not configured")
    return secret


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except (ValueError, TypeError):
        return False


def create_access_token(user_id: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": user_id,
        "email": email,
        "role": "admin",
        "type": "access",
        "iat": now,
        "exp": now + timedelta(hours=ACCESS_TOKEN_TTL_HOURS),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_scheme),
) -> Dict[str, Any]:
    if credentials is None or not credentials.credentials:
        raise HTTPException(status_code=401, detail="Not authenticated")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired — please log in again")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    if payload.get("type") != "access" or payload.get("role") != "admin":
        raise HTTPException(status_code=401, detail="Invalid token scope")
    user = await db.admin_users.find_one({"id": payload.get("sub")}, {"_id": 0, "password_hash": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Admin account not found")
    return user


# ──────────────────────────────────────────────────────────
# Models
# ──────────────────────────────────────────────────────────
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
    interest: str = "general"
    message: Optional[str] = None
    monthly_bill: Optional[float] = None
    calculator_results: Optional[Any] = None
    source: Optional[str] = "website"
    consent_communications: bool = False
    consent_text: Optional[str] = None
    # Lead qualification fields
    owns_home_5yr_plus: Optional[bool] = False
    services_solar_panels: Optional[bool] = False
    services_battery_backup: Optional[bool] = False
    services_electrical_panel: Optional[bool] = False
    timeline: Optional[str] = None


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
    calculator_results: Optional[Any] = None
    source: Optional[str] = "website"
    consent_communications: bool = False
    consent_text: Optional[str] = None
    consent_timestamp: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    # Lead qualification fields
    owns_home_5yr_plus: Optional[bool] = False
    services_solar_panels: Optional[bool] = False
    services_battery_backup: Optional[bool] = False
    services_electrical_panel: Optional[bool] = False
    timeline: Optional[str] = None


class LoginRequest(BaseModel):
    email: str
    password: str


# ──────────────────────────────────────────────────────────
# Public routes
# ──────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"message": "Accutek Solar API", "version": "1.1.0"}


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
async def create_lead(payload: LeadCreate, background_tasks: BackgroundTasks):
    if not payload.name.strip() or not payload.email.strip():
        raise HTTPException(status_code=400, detail="Name and email are required")
    if not payload.consent_communications:
        raise HTTPException(status_code=400, detail="Communication consent is required to submit a request")
    lead = Lead(**payload.model_dump())
    lead.consent_timestamp = datetime.now(timezone.utc)
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    if doc.get('consent_timestamp'):
        doc['consent_timestamp'] = doc['consent_timestamp'].isoformat()
    await db.leads.insert_one(doc)
    # Fire-and-forget notification — never blocks the response
    background_tasks.add_task(notify_new_residential_lead, lead.model_dump())
    return lead


@api_router.get("/company")
async def company_info():
    return {
        "name": "Accutek Solar",
        "founded": 1994,
        "founder": "Clint Lenover",
        "president": "Clint Lenover",
        "owners": ["Seth Lenover", "Colt Lenover", "Quill Lenover"],
        "ownership": "Founded by Clint Lenover in 1994 — still President today. His sons Seth, Colt, and Quill Lenover run day-to-day operations.",
        "phone": "(812) 878-7343",
        "phone_raw": "+18128787343",
        "email": "solarseth7@yahoo.com",
        "address": {"street": "9797 S Rangeline Rd.", "city": "Clinton", "state": "IN", "zip": "47842"},
        "service_areas": {
            "Indiana": ["Vermillion", "Parke", "Fountain", "Montgomery", "Putnam", "Clay", "Sullivan", "Vigo", "Hendricks", "Warren"],
            "Illinois": ["Edgar", "Vermilion", "Clark", "Crawford", "Coles", "Douglas", "Champaign"],
        },
    }


MAX_UPLOAD_BYTES = 10 * 1024 * 1024
ALLOWED_UPLOAD_TYPES = {
    "application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel", "image/tiff",
}


@api_router.post("/commercial-leads")
async def create_commercial_lead(
    background_tasks: BackgroundTasks,
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
        raise HTTPException(status_code=400, detail="Communication consent is required to submit a request")

    file_meta: Optional[Dict[str, Any]] = None
    if site_plan is not None and site_plan.filename:
        content = await site_plan.read()
        if len(content) > MAX_UPLOAD_BYTES:
            raise HTTPException(status_code=413, detail=f"File exceeds 10 MB limit (got {len(content) // 1024 // 1024} MB)")
        if site_plan.content_type and site_plan.content_type not in ALLOWED_UPLOAD_TYPES:
            raise HTTPException(status_code=415, detail=f"Unsupported file type: {site_plan.content_type}")
        file_meta = {
            "filename": site_plan.filename,
            "content_type": site_plan.content_type,
            "size_bytes": len(content),
            "data_base64": base64.b64encode(content).decode("ascii"),
        }

    now = datetime.now(timezone.utc)
    lead_id = str(uuid.uuid4())
    doc = {
        "id": lead_id, "name": name, "email": email, "phone": phone,
        "company": company, "title": title, "facility_size": facility_size,
        "facility_type": facility_type, "critical_loads": critical_loads,
        "existing_system_brand": existing_system_brand, "timeline": timeline,
        "address": address, "message": message,
        "consent_communications": consent_communications, "consent_text": consent_text,
        "consent_timestamp": now.isoformat(), "source": "website-commercial",
        "site_plan": file_meta, "created_at": now.isoformat(),
    }
    await db.commercial_leads.insert_one(doc)

    response = {k: v for k, v in doc.items() if k not in {"site_plan", "_id"}}
    if file_meta:
        response["site_plan"] = {
            "filename": file_meta["filename"],
            "content_type": file_meta["content_type"],
            "size_bytes": file_meta["size_bytes"],
        }

    # Fire-and-forget email notification (carries the site-plan attachment if any)
    email_attachment = None
    if file_meta:
        email_attachment = {
            "filename": file_meta["filename"],
            "content_type": file_meta.get("content_type") or "application/octet-stream",
            "content_b64": file_meta["data_base64"],
        }
    background_tasks.add_task(
        notify_new_commercial_lead,
        {k: v for k, v in doc.items() if k != "site_plan"},
        email_attachment,
    )
    return response


# ──────────────────────────────────────────────────────────
# Auth endpoints
# ──────────────────────────────────────────────────────────
@api_router.post("/auth/login")
async def auth_login(payload: LoginRequest, request: Request):
    email = payload.email.strip().lower()
    password = payload.password
    # Behind a reverse proxy (K8s ingress), request.client.host is the proxy pod IP.
    # Use X-Forwarded-For (leftmost public IP) or X-Real-IP when available.
    xff = request.headers.get("x-forwarded-for")
    if xff:
        ip = xff.split(",")[0].strip()
    else:
        ip = request.headers.get("x-real-ip") or (request.client.host if request.client else "unknown")
    identifier = f"{ip}:{email}"
    now = datetime.now(timezone.utc)

    # Lockout check
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("locked_until"):
        locked_until = datetime.fromisoformat(attempts["locked_until"])
        if locked_until > now:
            wait_min = int((locked_until - now).total_seconds() / 60) + 1
            raise HTTPException(
                status_code=429,
                detail=f"Too many failed attempts. Try again in {wait_min} minutes.",
            )

    user = await db.admin_users.find_one({"email": email})
    if not user or not verify_password(password, user.get("password_hash", "")):
        count = (attempts.get("count", 0) if attempts else 0) + 1
        update = {"identifier": identifier, "count": count, "last_attempt": now.isoformat()}
        if count >= MAX_FAILED_ATTEMPTS:
            update["locked_until"] = (now + timedelta(minutes=LOCKOUT_MINUTES)).isoformat()
        await db.login_attempts.update_one(
            {"identifier": identifier}, {"$set": update}, upsert=True
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Clear failed attempts
    await db.login_attempts.delete_one({"identifier": identifier})

    token = create_access_token(user["id"], user["email"])
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_TTL_HOURS * 3600,
        "user": {"id": user["id"], "email": user["email"], "name": user.get("name", "Admin"), "role": "admin"},
    }


@api_router.get("/auth/me")
async def auth_me(current=Depends(get_current_admin)):
    return current


@api_router.post("/auth/logout")
async def auth_logout(current=Depends(get_current_admin)):
    # Stateless JWT — client discards the token. Return 200 for a clean client flow.
    return {"message": "Logged out"}


# ──────────────────────────────────────────────────────────
# Admin endpoints (protected)
# ──────────────────────────────────────────────────────────
@api_router.get("/admin/leads")
async def admin_list_leads(limit: int = 200, _=Depends(get_current_admin)):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        for k in ("created_at", "consent_timestamp"):
            if isinstance(r.get(k), str):
                try:
                    r[k] = r[k]  # keep as ISO string for frontend
                except Exception:
                    pass
    return rows


@api_router.get("/admin/commercial-leads")
async def admin_list_commercial_leads(limit: int = 200, _=Depends(get_current_admin)):
    projection = {"_id": 0, "site_plan.data_base64": 0}
    rows = await db.commercial_leads.find({}, projection).sort("created_at", -1).to_list(limit)
    return rows


@api_router.get("/admin/commercial-leads/{lead_id}/site-plan")
async def admin_download_site_plan(lead_id: str, _=Depends(get_current_admin)):
    doc = await db.commercial_leads.find_one({"id": lead_id}, {"_id": 0})
    if not doc or not doc.get("site_plan"):
        raise HTTPException(status_code=404, detail="No site plan on file")
    sp = doc["site_plan"]
    data: bytes
    try:
        data = base64.b64decode(sp["data_base64"])
    except Exception as exc:
        raise HTTPException(status_code=500, detail="Unable to decode stored file") from exc
    return Response(
        content=data,
        media_type=sp.get("content_type") or "application/octet-stream",
        headers={
            "Content-Disposition": f'attachment; filename="{sp.get("filename", "site-plan")}"',
            "Content-Length": str(len(data)),
        },
    )


@api_router.get("/admin/stats")
async def admin_stats(_=Depends(get_current_admin)):
    leads_count = await db.leads.count_documents({})
    com_count = await db.commercial_leads.count_documents({})
    com_with_file = await db.commercial_leads.count_documents({"site_plan": {"$ne": None}})
    return {
        "residential_leads": leads_count,
        "commercial_leads": com_count,
        "commercial_with_attachment": com_with_file,
    }


# ──────────────────────────────────────────────────────────
# Legacy (now-deprecated) list endpoints — redirect admins to /admin/*
# Keep behaviour-compatible but require auth
# ──────────────────────────────────────────────────────────
@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100, _=Depends(get_current_admin)):
    rows = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            try:
                r['created_at'] = datetime.fromisoformat(r['created_at'])
            except Exception:
                pass
    return rows


@api_router.get("/commercial-leads")
async def list_commercial_leads(limit: int = 100, _=Depends(get_current_admin)):
    projection = {"_id": 0, "site_plan.data_base64": 0}
    rows = await db.commercial_leads.find({}, projection).sort("created_at", -1).to_list(limit)
    return rows


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
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    # Seed / refresh admin account from env
    admin_email = os.environ.get("ADMIN_EMAIL")
    admin_password = os.environ.get("ADMIN_PASSWORD")
    if admin_email and admin_password:
        admin_email = admin_email.strip().lower()
        existing = await db.admin_users.find_one({"email": admin_email})
        if existing is None:
            new_id = str(uuid.uuid4())
            await db.admin_users.insert_one({
                "id": new_id,
                "email": admin_email,
                "password_hash": hash_password(admin_password),
                "name": "Accutek Admin",
                "role": "admin",
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
            logger.info("Seeded admin user %s", admin_email)
        elif not verify_password(admin_password, existing.get("password_hash", "")):
            await db.admin_users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}},
            )
            logger.info("Refreshed admin password for %s", admin_email)
    # Indexes
    try:
        await db.admin_users.create_index("email", unique=True)
        await db.admin_users.create_index("id", unique=True)
        await db.login_attempts.create_index("identifier")
    except Exception as e:
        logger.warning("Index creation warning: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
