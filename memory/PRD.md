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

### Iteration 2 (Donna brief — dark/industrial rebrand)
- ✅ **Dark/Industrial palette**: Matte Black (#1A1A1A) + Forest Green (#1B5E20) + Electric Green (#00E676) per master brief
- ✅ **Cinematic hero**: `HeroVideo.tsx` autoplay/muted/loop/playsinline, ready for `/media/hero.mp4`. Falls back to dark Unsplash poster if Solar Wizard mp4 isn't uploaded yet
- ✅ **6-question Accutek Operations Manual qualifier** (replaces old 4-q): interest source, monthly bill, homeowner 5-7y, interest areas (multi), aware credit ended (expectation-setter with educational tooltip), timeline
- ✅ Rescored lead scoring algorithm to weight the 6 new questions (0-100, hot/warm/nurture)
- ✅ Federal tax-credit notice strip + FAQ entry + updated county incentive copy (credit ended)
- ✅ **HCP Book Online**: `/book` page + `HCPBookOnline` component + header & footer + hero CTAs. Mount point `#hcp-book-widget` ready for the HCP `<script>` (paste into layout.tsx <head>)
- ✅ Industrial typography: Cabinet Grotesk + Satoshi + JetBrains Mono for accents (`// SECTION`, `STEP 1 / 3`, etc.)
- ✅ Electric green glow on primary CTAs, scanline + grain overlay on hero
- ✅ Capitalization: **Accutek Solar** (capital A, capital S, no 'c' before 'k') correct everywhere; URL **www.AccutekSolar.com** in metadataBase + footer
- ✅ Emergent branding scrubbed — no user-facing references

### Iteration 1
- FastAPI modular backend with auth, leads, public, admin endpoints
- Lead scoring + 25-yr savings estimator
- Admin seeding + bcrypt + brute-force lockout
- MongoDB indexes
- 17 counties (10 IN + 7 IL) + testimonials + FAQs
- Mocked Housecall Pro sync stub
- Next.js 15 (App Router, TypeScript) frontend
- Home / Quote / Calculator / Service-area / County / About / Services / Admin (login + dashboard) pages

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
