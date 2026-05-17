# Accutek Solar Website — PRD

## Original Problem Statement
Build the Accutek Solar website as a Next.js 15 (App Router, TypeScript) + FastAPI + MongoDB application, implementing the Accutek_Solar_Technical_Design_Specification.md provided by the user. Full marketing site + multi-step lead form with scoring + admin dashboard.

## Architecture
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + Embla Carousel
- **Backend:** FastAPI + Motor (async MongoDB) + bcrypt + PyJWT
- **DB:** MongoDB (single-instance, local)
- **Auth:** JWT access (15m) + refresh (7d) in httpOnly cookies + brute-force lockout
- **HCP:** stubbed (returns mocked hcp_id until HCP_API_KEY set in .env)
- **Email notifications:** MOCKED (logged to backend stdout)

## User Personas
- **Homeowner / Farm owner** in Indiana / Western Illinois — wants a free estimate and to save on power bills.
- **Commercial / Ag buyer** — multi-kW systems, REAP grants.
- **Admin (Accutek staff)** — reviews lead pipeline, marks contacted, syncs to HCP.

## Core Requirements (Static)
- Lighthouse 90+ targets, mobile-first, WCAG 2.2 AA aspirations
- Local SEO for 17 IN+IL counties (dynamic /service-area/[slug] pages)
- Real-time lead scoring (0-100, hot/warm/nurture tiers)
- 25-year savings estimate before TCPA consent
- Admin dashboard with stats, filters, search, status updates, HCP sync

## What's Been Implemented (2026-05-17)
- ✅ FastAPI modular backend with auth, leads, public, admin endpoints
- ✅ Lead scoring algorithm + 25-yr savings estimator
- ✅ Admin seeding + bcrypt password hashing + brute-force lockout
- ✅ MongoDB indexes on users, leads, login_attempts
- ✅ Mocked Housecall Pro stub (ready for HCP_API_KEY)
- ✅ Seeded 17 counties (10 IN, 7 IL) + 4 testimonials + 7 FAQs
- ✅ Next.js 15 (App Router, TypeScript) frontend with earthy "Light Theme, Organic & Earthy" design system (Cabinet Grotesk + Satoshi)
- ✅ Home page: hero, animated counters, services bento, service-area teaser, testimonials carousel, FAQ, final CTA
- ✅ /quote — 3-step lead form with real-time scoring + 25-yr estimate + TCPA
- ✅ /tools/calculator — interactive sliders
- ✅ /service-area — county directory + /service-area/[slug] dynamic pages (SSG with revalidate)
- ✅ /services and /about pages
- ✅ /admin/login + /admin (leads table, filters, search, stats cards, drawer, HCP sync button, status updates)
- ✅ Sticky mobile CTA, header, footer
- ✅ data-testid coverage on all interactive elements

## Prioritized Backlog (P0 → P2)
- P1: Before/After project gallery page (/projects)
- P1: Resources / blog pages (/resources)
- P1: Real Housecall Pro API wiring once credentials are supplied
- P1: Email notification integration (SendGrid/Resend) for hot leads
- P2: Bilingual support (EN/ES)
- P2: Headless CMS for blog
- P2: WCAG audit pass + lighthouse-CI
- P2: Per-service detail pages (/services/residential, /services/commercial, etc.)

## Known Mocks / Stubs
- **Housecall Pro sync:** MOCKED — returns `mocked: true, hcp_id: mock_xxxx`. Replace `hcp_sync_lead()` body in server.py with real httpx call when API key is provided.
- **Hot-lead email notification:** MOCKED — logs to backend stdout. Plug in SendGrid/Resend when key available.

## Next Action Items
- Provide Housecall Pro API credentials to switch off mock
- Add SendGrid/Resend key for real email notifications
- Build /projects (before/after gallery) and /resources (blog)
