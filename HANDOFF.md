# Accutek Solar Website — Developer Handoff (v2)

**Stack:** Next.js 15 (App Router, TypeScript) · FastAPI · MongoDB
**Theme:** Dark / Industrial — Matte Black `#1A1A1A` + Forest Green `#1B5E20` + Electric Green `#00E676`
**Domain:** www.AccutekSolar.com

---

## 🎬 1. Solar Wizard Hero Video — drop-in

**Target path:** `/app/frontend/public/media/hero.mp4`

```
# from your laptop:
scp ~/Downloads/grok_video_2026-05-16-16-41-32.mp4 \
    user@host:/app/frontend/public/media/hero.mp4
```

That's it — Next.js serves `/media/hero.mp4` automatically and the hero element
(`/app/frontend/src/components/HeroVideo.tsx`) hot-reloads.

Behaviour: `autoplay` · `muted` · `loop` · `playsinline` · poster fallback if the
browser blocks autoplay or the file is missing.

---

## 📅 2. Housecall Pro "Book Online" widget — drop-in

**HCP embed snippet location:** `/app/frontend/src/app/layout.tsx` (see the
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
3. The widget auto-mounts into `<div id="hcp-book-widget">` on the `/book` page
   (which already has a polished placeholder + fallback CTAs).
4. Same pattern works for **Reviews** and **Chat bubble** — slots are reserved.

---

## 🔗 3. Housecall Pro Lead Sync (API) — drop-in

**Backend `.env`:** `/app/backend/.env`

```bash
HCP_API_KEY="hcp_live_xxx..."
HCP_COMPANY_ID="xxxxxxxx-xxxx-..."
```

Then in `/app/backend/server.py` find `hcp_sync_lead(...)` and replace the
mock body with the real `httpx.post(...)` call to HCP's Customers endpoint.
Currently returns `{ "mocked": true, "hcp_id": "mock_xxx" }` until the env var
is populated, so the admin "Sync to HCP" button continues to work end-to-end.

---

## 📧 4. Hot-lead email notification — drop-in

Currently logs hot leads to backend stdout:
```
[NOTIFY MOCK] HOT LEAD ... score=82
```
Plug in SendGrid or Resend in `server.py` `submit_lead` (search for `[NOTIFY MOCK]`)
and add the key to `/app/backend/.env`.

---

## 🔐 Admin

- **URL:** `/admin/login`
- **Email:** `admin@accuteksolar.com`
- **Password:** `admin123`  (change in `/app/backend/.env`, re-seeded on restart)

---

## 🚀 Saving to GitHub / Deploying

Saving to your own GitHub repo is one click — use the **"Save to GitHub"**
button in the Emergent chat input. The platform handles the commit + push
to your private repo for you.

For native Emergent deployment (default React + FastAPI + MongoDB stack):
- This project uses **Next.js**, which is **not supported by Emergent's native
  deployment** (50 credits/month plan).
- Recommended: deploy frontend to **Vercel** (zero-config for Next.js) and
  backend to **Railway / Fly.io / Render** with MongoDB Atlas. See
  `Accutek_Solar_Technical_Design_Specification.md` §8 for details.

---

## 🧪 Testing

Backend pytest:
```
pytest /app/backend/tests/backend_test.py -v
```
23/23 currently passing.

Frontend smoke test:
```
# from /app/frontend:
yarn build   # confirms a clean production build
```
