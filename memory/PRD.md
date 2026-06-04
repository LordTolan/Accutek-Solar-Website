# Accutek Solar Website — PRD (Updated June 2026)

## Original Problem Statement
Build the Accutek Solar website as a Next.js 15 (App Router, TypeScript) + FastAPI + MongoDB application. Full marketing site + multi-step lead form with scoring + admin dashboard.

## Architecture
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + Embla Carousel
- **Backend:** FastAPI + Motor (async MongoDB) + bcrypt + PyJWT
- **DB:** MongoDB (single-instance, local dev; Atlas in production)
- **Auth:** JWT access + refresh tokens in httpOnly cookies + brute-force lockout
- **HCP:** Lead form live (HCP-only; QuoteWizard removed). Reviews widget + booking widget embedded. API sync stubbed (returns mocked hcp_id until HCP_API_KEY set in .env)
- **Email notifications:** SendGrid (configured via SENDGRID_API_KEY in .env)

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

---

## Implementation History

### Iteration 1 (May 2026)
- ✅ FastAPI modular backend with auth, leads, public, admin endpoints
- ✅ Lead scoring + 25-yr savings estimator
- ✅ Admin seeding + bcrypt + brute-force lockout
- ✅ MongoDB indexes
- ✅ 17 counties (10 IN + 7 IL) with dynamic SEO pages
- ✅ TCPA-compliant lead form

### Iteration 2 — Dark/Industrial Rebrand (May 2026)
- ✅ **Dark/Industrial palette**: Matte Black (#1A1A1A) + Forest Green (#1B5E20) + Electric Green (#00E676)
- ✅ **Cinematic hero**: `HeroVideo.tsx` autoplay/muted/loop/playsinline, ready for `/media/hero.mp4`
- ✅ **6-question Accutek Operations Manual qualifier**: interest source, monthly bill, homeowner 5-7y, interest areas (multi), aware credit ended, timeline
- ✅ Federal tax-credit notice strip + FAQ entry + updated county incentive copy (credit ended)
- ✅ **HCP Book Online**: `/book` page + `HCPBookOnline` component + header/footer/hero CTAs
- ✅ Industrial typography: Cabinet Grotesk + Satoshi + JetBrains Mono
- ✅ Electric green glow on primary CTAs, scanline + grain overlay on hero
- ✅ Correct capitalization: **Accutek Solar** everywhere

### Iteration 3 — Blog + Manufacturer Strip + Pen Names (May–June 2026)
- ✅ **Weekly blog system** (Viktor-automated cron): Next.js blog with MDX-style posts, categories, read-time
- ✅ **Rotating pen names** (20 names) — auto-rotates each week via `getPenName()` helper in `blog-data.ts`
- ✅ **AI disclaimer** on all blog posts
- ✅ **PDF archive** of all published blog posts
- ✅ **Manufacturers strip** on home + services pages: Sol-Ark, Victron, Outback, Solis, Fronius, Kohler, Generac PWRcell, Schneider Electric, Emporia Energy
- ✅ **QuoteWizard removed** — HCP-only lead form (PR #45)

### Iteration 4 — Open Items (June 2026)
- 🔧 **Tagline slider**: Currently cycling 10 of 23 taglines — fix to use full 23-tagline deck with randomization
- 🔧 **About page team roles**: Verified correct in code — Keith/Seth/Quill = Owners, Clint = Install Tech
- ⛔ **Shelved**: "Summer Solar Paradox" blog post (heat messaging — Seth's call; branch preserved)

---

## Content Strategy

### Tone
- Direct, practical, local — not corporate
- Family-owned pride without being cutesy
- Technical credibility without jargon overload

### Messaging Rules
| Rule | Reason |
|------|--------|
| No heat/temperature warnings in customer copy | Accutek manages thermal design; customers don't need to worry about it |
| Promote ground mounts actively | Balanced with roof-mount — significant part of business |
| Lead form = HCP only | Simpler funnel; direct to Seth |

### Blog
- Category mix: Solar 101, Incentives, Products, Local/Indiana-IL focus
- Avoid: technical heat warnings, anything that sounds like a disclaimer about solar performance
- Author: rotating pen names (defined in `blog-data.ts`)
- Disclaimer: AI-assisted, perform own due diligence

---

## Team Reference

| Name          | Role                 | On-site Handle  |
| ------------- | -------------------- | --------------- |
| Keith Davis   | Founder              | —               |
| Seth Davis    | Owner / Operator     | Seth            |
| Quill Davis   | Owner / Operator     | Quill           |
| Clint Lenover | Install Tech         | Clint           |
| Colt          | Lead Installer       | Colt            |
| AJ            | Solar Technician     | Scruff          |
