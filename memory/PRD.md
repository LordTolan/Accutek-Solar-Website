# Accutek Solar — PRD

## Original Problem Statement
Take accuteksolar.com (a 30-year-old family-owned solar company in Clinton, IN — solar panels, ground/roof mounts, inverters, custom backup batteries, electrical work, panel replacements, generators, whole/partial home backup) and build a new modern web presence with interactive tools for sizing batteries, solar systems, etc. Expanded into a comprehensive multi-page business website.

## User Choices
1. Calculators: all (solar, battery, mount, generator, ROI)
2. Lead capture: MongoDB only
3. Branding: Two-Leaf Lightbulb logo (uploaded), brand colors forest #1B5E20 + amber #FFA500 + solar yellow #FFD700, Montserrat typography
4. Source data: scraped from accuteksolar.com
5. Communication consent: TCPA-style required checkbox
6. Multi-page expansion: Home, Services, About, Service Area, Reviews, Tools, Contact

## Architecture
- React Router (BrowserRouter, 7 routes)
- FastAPI backend, MongoDB storage
- Shared layout (Nav + Footer); ScrollToTop on route change
- Single-source-of-truth content in /app/frontend/src/lib/site-data.js

## Pages
- `/` Home — hero (30 years tagline), services preview, about preview, service-area map, testimonials, Housecall reviews widget, CTA
- `/services` — 4 detailed sections (Solar & Storage, Backup Power, Facility Automation, Diagnostics) with sticky jump nav
- `/about` — principles, timeline, leadership, gallery
- `/service-area` — 4-quadrant map (Central IN East/West, Central IL East/West) + per-quadrant detail + operational standards
- `/reviews` — Housecall Pro iframe + curated testimonials
- `/tools` — 5 calculators + FAQ accordion
- `/contact` — quick actions + office info bar + TCPA-compliant lead form

## Backend Endpoints
- GET /api/ — health
- GET /api/company — returns Accutek Solar, president Keith Davis, owners [Seth Davis, Quill Davis], 17 counties (10 IN + 7 IL)
- POST /api/leads — TCPA consent required (consent_communications=true, stores consent_text + consent_timestamp); 400 if missing
- GET /api/leads — list desc, no _id leakage
- GET/POST /api/status — status check (regression)

## What's Implemented
- 2025-12-02: MVP single-page (Hero, Services, 5 Calculators, Gallery, Testimonials, Service Area, About, FAQ, Contact, Footer); 100% test pass
- 2025-12-03: Brand pack integration (Two-Leaf Lightbulb logo, Montserrat, brand colors), name "Accutek Solar"
- 2025-12-03: Owner correction (Keith founded 1994, still President; Seth & Quill run operations)
- 2025-12-03: Hero readability fixes (overlay + nav contrast)
- 2025-12-03: TCPA communication consent on lead form (highlighted, required, stored with timestamp + full consent text)
- 2025-12-03: Logo PNG compression (22 MB → 1.4 MB)
- 2025-12-03: Multi-page expansion — 7 routes, react-router, new Services/About/ServiceArea/Reviews/Contact/Tools pages, 4-quadrant service area map; 100% test pass
- 2025-12-03: Housecall Pro Reviews Widget embedded on Home + dedicated /reviews page
- 2025-12-03: New service categories: Solar & Storage / Backup Power / Facility Automation / Diagnostics

## Backlog
### P1
- Email forwarding of leads to Accutek (Resend/SendGrid)
- Admin dashboard for stored leads + consent audit log export
- Calculator results auto-attached to contact form payload
- AI Solar Advisor chatbot for lead qualification
- Project case-study pages (commercial focus)
- Dedicated 404 page
- Pydantic EmailStr for stricter email validation

### P2
- SEO meta + sitemap + schema.org LocalBusiness
- Live monitoring widget for existing customers
- Spanish translation
- Analytics dashboard (PostHog already loaded)
- Rate-limit /api/leads
