# Accutek Solar — Project README

Family-owned solar / backup power / facility automation contractor website + lead management system. Replaces the legacy `accuteksolar.com`.

## Stack

- **Frontend**: React 19 + React Router + Tailwind + shadcn/ui (Montserrat / JetBrains Mono)
- **Backend**: FastAPI (async) + Motor (async MongoDB driver)
- **Storage**: MongoDB
- **Auth**: bcrypt + PyJWT (HTTPBearer, 8-hour access token)
- **Integrations**: Housecall Pro (customer portal · reviews widget · chat bubble · online booking)

## Pages

| Route             | What                                                       |
| ----------------- | ---------------------------------------------------------- |
| `/`               | Marketing home (hero, services preview, reviews, CTA)      |
| `/services`       | Solar & Storage · Backup Power · Facility Automation · Diagnostics |
| `/commercial`     | Commercial intake form (file upload + TCPA consent)        |
| `/tools`          | 5 calculators (solar size, battery, mount, generator, ROI) |
| `/service-area`   | 4-quadrant IN/IL service map                               |
| `/reviews`        | Embedded Housecall Pro reviews widget                      |
| `/about`          | Family-owned story + team                                  |
| `/contact`        | Schedule a call / TCPA-compliant lead form                 |
| `/admin`          | Admin login                                                |
| `/admin/leads`    | Protected dashboard (residential + commercial leads)       |

## Setup

```bash
# Backend
cd backend
cp .env.example .env       # fill in MONGO_URL, JWT_SECRET, ADMIN_*
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend
cd frontend
cp .env.example .env       # set REACT_APP_BACKEND_URL
yarn install
yarn start
```

## Environment Variables

### Backend (`backend/.env`)
- `MONGO_URL` — MongoDB connection string
- `DB_NAME` — database name (e.g. `accutek_solar`)
- `CORS_ORIGINS` — comma-separated origins (`*` for dev)
- `JWT_SECRET` — random 64-char hex (`python -c "import secrets; print(secrets.token_hex(32))"`)
- `ADMIN_EMAIL` — admin account email (seeded on startup)
- `ADMIN_PASSWORD` — admin account password (re-hashed on startup if changed)

### Frontend (`frontend/.env`)
- `REACT_APP_BACKEND_URL` — backend public URL

## API endpoints

### Public
- `GET /api/` — health
- `GET /api/company` — company facts (founder, owners, service areas, contact)
- `POST /api/leads` — residential lead (TCPA consent required)
- `POST /api/commercial-leads` — commercial intake (multipart, optional file ≤ 10 MB)
- `GET /api/status` / `POST /api/status` — status checks

### Auth (public)
- `POST /api/auth/login` — `{email, password}` → `{access_token, user}`
- `GET /api/auth/me` — current admin (Bearer)
- `POST /api/auth/logout` — stateless logout

### Admin (Bearer required)
- `GET /api/admin/leads` — residential lead list
- `GET /api/admin/commercial-leads` — commercial list (file bytes excluded)
- `GET /api/admin/commercial-leads/{id}/site-plan` — download attachment
- `GET /api/admin/stats` — counts

## Housecall Pro

Three Housecall Pro widgets are embedded:

1. **Customer Portal** (button in nav + footer) — request-link token `d2cca52d5dc74361b2c484f1306b70df`
2. **Reviews widget** (on `/` and `/reviews`) — widget id `097cf23f-be1a-41ea-981b-8e6b9c7514eb`
3. **Online Booking** ("Book online" button on hero + footer) — token `a610e2efa0494a03ae59009369f2a058`
4. **Chat bubble** (site-wide, loaded in `index.html`) — organization id `097cf23f-be1a-41ea-981b-8e6b9c7514eb`

## Security checklist

- Admin endpoints protected with JWT Bearer auth
- 5-attempt rate limit per IP+email with 15-minute lockout (using `X-Forwarded-For` to get real client IP)
- Passwords hashed with bcrypt (cost 12)
- TCPA consent captured + timestamped on every lead submission
- File uploads capped at 10 MB and content-type whitelisted
- MongoDB `_id` excluded from all API responses
- Brand asset PNGs optimized (22 MB → 1.4 MB total)

## Test credentials (rotate after first deploy!)

Stored at `/app/memory/test_credentials.md` (also excluded from this backup).

## Known maintenance items

- Migrate `@app.on_event("startup"|"shutdown")` to FastAPI lifespan handlers
- Add Resend / SendGrid email forwarding for new leads
- Consider GridFS or S3 for commercial site-plan files if uploads regularly approach 10 MB
- Add a dedicated 404 page (currently falls back to home)
- Pre-fill calculator results into the contact form payload
