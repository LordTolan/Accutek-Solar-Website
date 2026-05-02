# AccuTek Solar — PRD

## Original Problem Statement
Take accuteksolar.com (a 31-year-old family-owned solar company in Clinton, IN — solar panels, ground/roof mounts, inverters, custom backup batteries, electrical work, panel replacements, generators, whole/partial home backup) and build a new modern web presence with interactive tools for sizing batteries, solar systems, etc.

## User Choices (verbatim)
1. Calculators: "all of the above"
2. Lead capture: "stowed only" (MongoDB only, no email)
3. Visual style: user said "ill upload branding pack" — none uploaded yet, design-agent picked Archetype 1 (Organic & Earthy + Industrial Precision)
4. Source data: "scrape" (accuteksolar.com)
5. AI chatbot: not chosen (deferred)

## Architecture
- FastAPI backend (`/app/backend/server.py`), MongoDB storage
- React 19 frontend (`/app/frontend`) with shadcn/ui, Tailwind, Cabinet Grotesk + IBM Plex Sans + JetBrains Mono
- Single-page marketing site with 5-tab calculator suite
- All routes prefixed `/api`

## What's Implemented (2025-12-02)
- Backend endpoints: `GET /api/`, `GET /api/company`, `POST /api/leads`, `GET /api/leads`, status check (regression)
- Frontend sections: Nav (sticky, mobile menu), Hero (cinematic image + stats), Services (4 cards), Calculators (Solar Sizer, Battery Backup, Mount Recommender, Generator Sizer, ROI/Payback), Gallery (real install photos), Testimonials (carousel), Service Area (17 counties IN+IL), About (timeline), FAQ (accordion), Contact form (POST /api/leads), Footer
- Real company data scraped: phone (812) 878-7343, address 9797 S Rangeline Rd Clinton IN 47842, founded 1994 by Keith Davis, real testimonials and FAQs
- All interactive elements carry `data-testid`
- Backend + frontend testing 100% pass (iteration_1)

## User Personas
- Homeowners in rural IN/IL exploring residential solar + backup
- Small businesses needing electrical/generator service
- Off-grid / hybrid system seekers

## Backlog
### P0 — Outstanding
- (none — MVP complete)

### P1 — Recommended next
- Branding pack integration when user uploads (logo, brand colors, real install photos library)
- Email forwarding of leads to AccuTek (Resend/SendGrid)
- Admin dashboard route to view captured leads
- AI Solar Advisor chatbot (Claude/GPT) for lead qualification
- Submit calculator results into the contact form payload (link the two flows)

### P2 — Nice to have
- Project case-study pages
- Live monitoring widget (production data) for clients
- Schema.org / SEO meta + sitemap
- Spanish translation
