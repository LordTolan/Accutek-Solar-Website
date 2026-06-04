# Accutek Solar Website — Developer Handoff (v3 · June 2026)

**Stack:** Next.js 15 (App Router, TypeScript) · FastAPI · MongoDB  
**Theme:** Dark / Industrial — Matte Black `#1A1A1A` + Forest Green `#1B5E20` + Electric Green `#00E676`  
**Domain:** www.AccutekSolar.com

---

## Current State (June 2026)

The site is fully functional. All major features are live:

- ✅ HCP-only lead form (QuoteWizard removed — PR #45)
- ✅ Manufacturers strip on home + services pages (9 brands — PR #47)
- ✅ Blog with rotating pen names + AI disclaimer (PR #49)
- ✅ Weekly blog cron (Viktor-automated)
- ✅ Tagline slider (23-tagline deck)
- ✅ Reviews embed (HCP)
- ✅ About page: full team with correct roles (Keith/Seth/Quill = owners, Clint = Installer)

---

## 🎬 1. Solar Wizard Hero Video — drop-in

**Target path:** `/frontend/public/media/hero.mp4`

```bash
# from your laptop:
scp ~/Downloads/grok_video_2026-05-16-16-41-32.mp4 \
    user@host:/app/frontend/public/media/hero.mp4
```

That's it — Next.js serves `/media/hero.mp4` automatically and the hero element
(`/frontend/src/components/HeroVideo.tsx`) hot-reloads.

Behaviour: `autoplay` · `muted` · `loop` · `playsinline` · poster fallback if the
browser blocks autoplay or the file is missing.

---

## 📅 2. Housecall Pro "Book Online" widget — drop-in

**HCP embed snippet location:** `/frontend/src/app/layout.tsx` (see the
`HOUSECALL PRO — Book Online widget script` comment block).

1. In HCP → **Settings → Online Booking → Embed code** copy the script tag.
2. Replace the commented `<Script ... />` block with the real snippet:
   ```tsx
   <Script
     id="hcp-book-online"
     src="https://book.housecallpro.com/book/Accutek-Solar/XXXXXXXX"
     strategy="afterInteractive"
   />
   ```
3. The widget auto-mounts into `<div id="hcp-book-widget">` on the `/book` page.

---

## 🔗 3. Housecall Pro Lead Sync (API) — drop-in

**Backend `.env`:**

```bash
HCP_API_KEY="hcp_live_xxx..."
HCP_COMPANY_ID="xxxxxxxx-xxxx-..."
```

Then in `/backend/server.py` find `hcp_sync_lead(...)` and replace the
mock body with the real `httpx.post(...)` call to HCP's Customers endpoint.
Currently returns `{ "mocked": true, "hcp_id": "mock_xxx" }` until the env var
is populated.

---

## 📧 4. Hot-lead email notification — drop-in

Add `SENDGRID_API_KEY` to `backend/.env`. The backend's `submit_lead` function
sends a hot-lead notification via SendGrid whenever lead score ≥ 70.

---

## 📝 5. Blog system

- Automated weekly via Viktor cron (`crons/blog/weekly-solar-content`)
- Pen names rotate through 20 names defined in `frontend/src/lib/blog-data.ts`
- AI disclaimer added to all posts automatically
- **Shelved content**: "Summer Solar Paradox" blog (heat concerns — Seth does not want heat messaging toward customers)
- To manually trigger: ping Viktor in #new-web-psge

---

## 🔐 Admin

- **URL:** `/admin/login`
- **Email:** `admin@accuteksolar.com`
- **Password:** set in `backend/.env` as `ADMIN_PASSWORD` (change from default)

---

## 🚀 Deployment

See `DEPLOYMENT.md` for full Render + MongoDB Atlas instructions.

**Auto-deploy:** Every push to `main` triggers Render rebuild of both services.

---

## Content Rules (per Seth & Clint)

| Rule | Detail |
|------|--------|
| **No heat warnings** | Panel temperature is an engineering concern, not customer messaging. Remove/avoid copy that sounds like a warning about heat. |
| **Ground mounts** | Actively promote — balance roof and field arrays in all copy. |
| **Lead form** | HCP only. One form → straight to Seth. No QuoteWizard. |
| **Team roles** | Seth Davis, Quill Davis, Keith Davis = Owners/Operators. Clint Lenover = Installer/Install Tech. Never list Clint as owner or manager. |

---

## Team

| Person        | Role               | Notes                                  |
| ------------- | ------------------ | -------------------------------------- |
| Keith Davis   | Founder            | Founded 1994 in Clinton, IN            |
| Seth Davis    | Owner / Operator   | System design, customer-facing         |
| Quill Davis   | Owner / Operator   | Field operations, logistics            |
| Clint Lenover | Install Tech       | In the field — roofs, racks, wire      |
| Colt          | Lead Installer     | Leads field crews                      |
| AJ ("Scruff") | Solar Technician   | Field tech                             |
