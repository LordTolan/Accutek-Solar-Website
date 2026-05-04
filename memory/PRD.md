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

## 2025-12-03 Update — Commercial intake + mobile optimization
- Added `/commercial` route with dedicated high-value intake form (CommercialIntake.jsx):
  - Facility size, facility type, critical loads, existing system brand, timeline, address, notes
  - File upload (single-line drawing / site plan) with 10 MB cap, allowed types: PDF/PNG/JPG/WEBP/TIFF/XLSX
  - TCPA consent block (required)
  - Submit disabled until consent ticked
- Backend: POST/GET `/api/commercial-leads` (multipart/form-data), base64-encoded file stored in MongoDB `commercial_leads` collection
- Fixed: MongoDB `_id` ObjectId leak in commercial-leads response (motor `insert_one` mutates input dict)
- Nav restructure: added "Commercial", removed "Home" (logo handles home); order: Services · Commercial · Tools · Service Area · Reviews · About · Contact
- Mobile optimization pass:
  - iOS zoom prevention (input font-size 16px on mobile only)
  - Global `overflow-x: hidden` on html/body
  - Min 44px touch target for buttons on phones
  - Hero headline sizes down to `text-[2.7rem]` on phones
  - Stats strip shrinks padding and font on phones
  - Housecall iframe uses adaptive heights (1400 mobile / 1100 sm / 1000 lg)
  - Service area quadrant map stacks single column on phones
  - Services jump-nav becomes horizontal scroll on phones (instead of wrapping)
- Tested: 19/19 backend tests, 100% frontend verified on desktop + mobile 390×844

## 2025-12-04 Update — Admin dashboard + Housecall customer portal + logo refinement
- New icon-only "Two-Leaf Lightbulb" logo (wordmark programmatically cropped from source, 256×256 primary at 40KB)
- Admin auth system (bcrypt + PyJWT, 8h Bearer token, bruteforce lockout with real-IP via X-Forwarded-For)
  - `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
  - Admin user seeded idempotently from ADMIN_EMAIL + ADMIN_PASSWORD env vars on startup
- Admin dashboard at `/admin` (login) + `/admin/leads` (protected):
  - 3 stat cards (residential / commercial / with-attachment)
  - Searchable tabbed table (Commercial / Residential)
  - Per-row site-plan download streamed from base64 store
  - Logout clears localStorage token
  - Protected routes redirect unauthenticated users to login with `?from=` for post-login return
- Housecall Pro Customer Portal button in:
  - Main nav (desktop + mobile), styled as amber/forest pill
  - Footer "Customer Tools" section (with Calculators + Schedule service)
- Legacy GET /api/leads and GET /api/commercial-leads now require Bearer auth (were previously public)
- Tested: 45/45 backend + 100% frontend pass
- Credentials in `/app/memory/test_credentials.md`
