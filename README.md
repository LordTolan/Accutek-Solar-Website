# Accutek Solar — Project README

Family-owned solar / backup power / facility automation contractor website with Housecall Pro intake. Replaces the legacy `accuteksolar.com`.

## Stack

- **Frontend**: Next.js 15 (App Router, TypeScript) + Tailwind + Framer Motion + Embla Carousel (Cabinet Grotesk / Satoshi / JetBrains Mono)
- **Backend**: FastAPI (async) + Motor (async MongoDB driver)
- **Storage**: MongoDB
- **Integrations**: Housecall Pro (lead form · reviews widget · chat bubble · online booking)
- **Blog**: Weekly automated blog with rotating pen names + AI-assist disclaimer

## Pages

| Route                        | What                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `/`                          | Marketing home (hero video, tagline slider, services preview, reviews, CTA) |
| `/services`                  | Solar & Storage · Backup Power · Facility Automation · Diagnostics   |
| `/tools`                     | 5 calculators (solar size, battery, mount, generator, ROI)           |
| `/service-area`              | 17-county IN/IL service map with individual county pages             |
| `/reviews`                   | Embedded Housecall Pro reviews widget                                |
| `/about`                     | Family-owned story + full team (owners, operators, technicians)      |
| `/blog`                      | Weekly blog posts — auto-generated, rotating pen names               |
| `/book`                      | HCP online booking widget                                            |
| `/quote`                     | HCP lead form (HCP-only, no QuoteWizard)                             |

## Team

| Name          | Role                         |
| ------------- | ---------------------------- |
| Keith Davis   | Founder                      |
| Seth Davis    | Owner / Operator             |
| Clint Lenover | Installer (Install Tech)     |
| Colt          | Lead Installer               |
| AJ ("Scruff") | Solar Technician             |

> Seth and Keith are the Owners/Operators. Clint, Colt, and AJ are Installers/Technicians.

## Setup

```bash
# Backend
cd backend
cp .env.example .env       # fill in MONGO_URL, DB_NAME, CORS_ORIGINS
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
- `OPENAI_API_KEY` — (Optional) OpenAI API key for Sunny AI chatbot fallback (e.g. `gpt-4o-mini`)
- `ANTHROPIC_API_KEY` — (Optional) Anthropic API key for Sunny AI chatbot fallback (e.g. `claude-3-haiku-20240307`)
- `SUNNY_DAILY_AI_LIMIT` — (Optional, default 500) Daily AI call cap for ~$25/mo spend ceiling

### Frontend (`frontend/.env`)
- `NEXT_PUBLIC_BACKEND_URL` — backend public URL

## API Endpoints

### Public
- `GET /api/` — health
- `GET /api/public/company-info` — company facts
- `GET /api/public/service-area` and `/{slug}` — counties
- `GET /api/public/testimonials` and `/api/public/faq` — public content
- `GET /api/public/holiday-theme` — read existing stored holiday override
- `POST /api/chat/sunny` (alias `/api/chat`) and `GET /api/chat/sunny/faqs` — Sunny

## Retired local admin and lead management

The local dashboard, login, lead intake/scoring/storage endpoints, mock HCP sync,
admin holiday setter, and user seeding have been removed. Quotes continue through
the external HCP form; the Header Login link still opens the HCP customer portal.
No stored leads, users, settings, or indexes are deleted or migrated. The checked-in
`.next` and `out` build artifacts are removed so stale admin pages and bundles
are not retained; deployments continue to generate a fresh static export.

Holiday assets and date-based display remain. Existing stored forced themes are
still read by the public endpoint, so retiring the dashboard does not silently
change the current theme. Future holiday edits are handled through code/assistant
changes in `frontend/src/config/holidayThemes.ts`; the dashboard toggle is gone.
An existing forced override continues to take precedence over the date config.

Removed legacy tests contained an exposed admin credential. Source removal does
not revoke it or remove Git history: the owner must rotate that credential and
any reused password separately. No credentials were exercised or rotated here.

### Local verification

From `backend`, use non-production settings and no external AI keys:
`MONGO_URL=mongodb://127.0.0.1:27017 DB_NAME=accutek_test python -m pytest tests/test_retired_admin.py tests/test_sunny_chat.py -q`.
The route/holiday tests mock database reads and never connect to production.
From `frontend`: `npm ci`, `npx tsc --noEmit`, and `npm run build`.
The Next config skips build-time type checking, so run TypeScript separately.

## Manufacturers Supported

Sol-Ark · Victron Energy · Outback Power · Solis · Fronius · Kohler · Generac PWRcell · Schneider Electric · Emporia Energy

Also install and service: Enphase · SolarEdge · SMA

## Blog

- Weekly automated blog posts via Viktor cron
- Rotating pen names: Ray Watts, Sol Brightman, Watt Kilowatt, Ray D. Ation, Sunny McVoltface, Phil O'Watt, Art Kilowatt, Al B. Sunny, Watt Burns, Sol R. Panel, Rick O'Shay Solar, Lumen Clearsky, Amp Voltsworth, Max Insolation, Barry Cade, Sunny Watt, Hugh Jouleson, Bill Kilowatt, Dirk Photon, Duke Electra
- AI disclaimer on all posts: _"This article has been editorially enhanced with AI assistance. Information is believed to be accurate but readers should perform their own due diligence before making any energy-related decisions."_
- Shelved: "Summer Solar Paradox" post (heat concerns — not customer-facing messaging per Seth)

## Content Guidelines

- **Heat / temperature**: Accutek manages thermal design internally. Do NOT surface panel heat as a customer concern in marketing copy or blog posts.
- **Ground mounts**: Actively promote alongside roof-mount installs — we do both.
- **Lead form**: HCP-only. No QuoteWizard. One form → straight to Seth.
- **Team hierarchy**: Seth, Keith = Owners/Operators. Clint = Installer, not management.