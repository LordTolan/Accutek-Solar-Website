# Accutek Solar — Project README

Family-owned solar / backup power / facility automation contractor website + lead management system. Replaces the legacy `accuteksolar.com`.

## Stack

- **Frontend**: Next.js 15 (App Router, TypeScript) + Tailwind + Framer Motion + Embla Carousel (Cabinet Grotesk / Satoshi / JetBrains Mono)
- **Backend**: FastAPI (async) + Motor (async MongoDB driver)
- **Storage**: MongoDB
- **Auth**: bcrypt + PyJWT (HTTPBearer, access + refresh tokens, brute-force lockout)
- **Integrations**: Housecall Pro (lead form · reviews widget · chat bubble · online booking)
- **Blog**: Weekly automated blog with rotating pen names + AI-assist disclaimer
- **Email notifications**: SendGrid (configured via `.env`)

## Pages

| Route                        | What                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `/`                          | Marketing home (hero video, tagline slider, services preview, reviews, CTA) |
| `/services`                  | Solar & Storage · Backup Power · Facility Automation · Diagnostics   |
| `/commercial`                | Commercial intake form (file upload + TCPA consent)                  |
| `/tools`                     | 5 calculators (solar size, battery, mount, generator, ROI)           |
| `/service-area`              | 17-county IN/IL service map with individual county pages             |
| `/reviews`                   | Embedded Housecall Pro reviews widget                                |
| `/about`                     | Family-owned story + full team (owners, operators, technicians)      |
| `/blog`                      | Weekly blog posts — auto-generated, rotating pen names               |
| `/book`                      | HCP online booking widget                                            |
| `/quote`                     | HCP lead form (HCP-only, no QuoteWizard)                             |
| `/admin`                     | Admin login                                                          |
| `/admin/leads`               | Protected dashboard (residential + commercial leads)                 |

## Team

| Name          | Role                         |
| ------------- | ---------------------------- |
| Keith Davis   | Founder                      |
| Seth Davis    | Owner / Operator             |
| Quill Davis   | Owner / Operator             |
| Clint Lenover | Installer (Install Tech)     |
| Colt          | Lead Installer               |
| AJ ("Scruff") | Solar Technician             |

> Seth, Quill, and Keith are the Owners/Operators. Clint, Colt, and AJ are Installers/Technicians.

## Setup

```bash
# Backend
cd backend
cp .env.example .env       # fill in MONGO_URL, JWT_SECRET, ADMIN_*, SENDGRID_API_KEY, HCP_API_KEY
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001 --reload

# Frontend
cd frontend
cp .env.example .env       # set NEXT_PUBLIC_BACKEND_URL
yarn install
yarn dev
```

## Environment Variables

### Backend (`backend/.env`)
- `MONGO_URL` — MongoDB connection string
- `DB_NAME` — database name (e.g. `accutek_solar`)
- `CORS_ORIGINS` — comma-separated origins (`*` for dev)
- `JWT_SECRET` — random 64-char hex (`python -c "import secrets; print(secrets.token_hex(32))"`)
- `ADMIN_EMAIL` — admin account email (seeded on startup)
- `ADMIN_PASSWORD` — admin account password (re-hashed on startup if changed)
- `SENDGRID_API_KEY` — for hot-lead email notifications
- `HCP_API_KEY` — Housecall Pro API key (lead sync)
- `HCP_COMPANY_ID` — Housecall Pro company UUID

### Frontend (`frontend/.env`)
- `NEXT_PUBLIC_BACKEND_URL` — backend public URL

## API Endpoints

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
- `GET /api/admin/commercial-leads` — commercial lead list
- `PATCH /api/admin/leads/{id}` — update lead status / notes
- `POST /api/admin/leads/{id}/sync-hcp` — sync lead to Housecall Pro

## Manufacturers Supported

Sol-Ark · Victron Energy · Outback Power · Solis · Fronius · Kohler · Generac PWRcell · Schneider Electric · Emporia Energy

Also install and service: Enphase · SolarEdge · SMA

## Blog

- Weekly automated blog posts via Viktor cron
- Rotating pen names: Ray Watts, Sol Brightman, Watt Kilowatt, Ray D. Ation, Sunny McVoltface, Phil O'Watt, Art Kilowatt, Al B. Sunny, Watt Burns, Sol R. Panel, Rick O'Shay Solar, Lumen Clearsky, Amp Voltsworth, Max Insolation, Barry Cade, Sonny Watt, Hugh Jouleson, Bill Kilowatt, Dirk Photon, Duke Electra
- AI disclaimer on all posts: _"This article has been editorially enhanced with AI assistance. Information is believed to be accurate but readers should perform their own due diligence before making any energy-related decisions."_
- Shelved: "Summer Solar Paradox" post (heat concerns — not customer-facing messaging per Seth)

## Content Guidelines

- **Heat / temperature**: Accutek manages thermal design internally. Do NOT surface panel heat as a customer concern in marketing copy or blog posts.
- **Ground mounts**: Actively promote alongside roof-mount installs — we do both.
- **Lead form**: HCP-only. No QuoteWizard. One form → straight to Seth.
- **Team hierarchy**: Seth, Quill, Keith = Owners/Operators. Clint = Installer, not management.
