# Sunny zero-spend verification

Clint selected a **$0 monthly paid-AI limit** on 2026-10-19. Sunny now uses local FAQ/preset responses only. Provider implementations and the restart-resetting 500-attempt/day counter are removed. No key, model name, old daily limit, restart, or worker count grants spending permission. There is no model fallback chain to bill a second provider, and no accounting service whose failure could enable spending. This is a zero-call design, not an estimate of billed totals; historical provider invoices are outside its scope.

## Content and handoffs

Existing FAQ records remain the source for solar types, roof/ground mounts, Kohler installation, pricing handoff, company history and contact information. No territory or business commitment was added. Repository sources reviewed at base `2e90dacd98088729a2e6106b8273bed89fb542a3`:

- `backend/server.py` / `backend/sunny_chat.py`: existing FAQ and company data.
- `frontend/src/lib/site-data.js`: site FAQ says a wider HCP territory while backend county data/Sunny previously said 17 counties. Neither list is treated as proof of address coverage. Location questions request team confirmation; they do not promise service or reject a customer.
- `frontend/src/app/quote/page.tsx`: existing HCP lead-capture handoff.
- `frontend/src/app/book/page.tsx`: existing Housecall Pro booking handoff.

No lead submission or booking is performed by chat. Unknown questions acknowledge the missing verified answer and offer quote, HCP booking, and contact links. Matching ignores common filler words and requires whole keyword boundaries to reduce unrelated matches. It remains a finite FAQ matcher, not a general adviser; property engineering, exact availability, current utility tariffs, and personalized financial advice require the team.

## Test matrix

| Case | Local automated verification | Deployment follow-up |
| --- | --- | --- |
| Solar roof/ground mounts and system types | Existing presets return relevant facts and approved links | Try the same questions in the deployed panel |
| Generator installation | Kohler preset retained | Check displayed answer and services link |
| Price/quote | Free custom estimate; quote link; no invented dollar amount | Open quote page without submitting |
| Unknown/out-of-scope | Explicit unknown reply plus useful handoffs | Ask unrelated question |
| Territory mismatch | City/state destinations (including Will you install a Kohler generator in Ohio?), reversed word order, ZIP 90210 and county questions require team confirmation; generic product/setup questions retain product FAQs | Confirm territory with business separately; no new geography assumed |
| Contact / HCP | Verified existing phone and internal quote/book/contact links | Open contact and HCP booking page without submitting |
| Budget exhausted ($0 from first turn) | Dummy keys present, 160 concurrent/repeated requests, no network access allowed | Verify all deployed workers use new revision |
| Restarts/defaults/invalid legacy setting | Three module reloads; keys absent; invalid daily-limit setting ignored | Restart backend; repeat unknown question |
| Provider fallback/failure | Paid client functions removed; socket connections forbidden in focused tests | No live paid validation needed or authorized |
| Burst throttle | Helpful contact link remains at existing burst cutoff | No load test against production |

Run from repository root with backend dependencies installed:

```powershell
$env:PYTHONPATH='backend'
$env:MONGO_URL='mongodb://localhost:27017'
$env:DB_NAME='sunny_test'
python -m pytest backend/tests -q
```

Full backend suite: **39 passed** locally (two existing FastAPI `on_event` deprecation warnings). Windows TestClient required an unsandboxed run for its local event-loop socketpair. Focused tests: `python -m pytest backend/tests/test_sunny_zero_spend.py -q` (**26 passed** locally). Tests use dummy credentials and forbid sockets; the handler must complete without yielding to asynchronous I/O. Concurrent calls run in eight threads, with unique IPs so the local burst limiter does not hide unknown-message handling. Module reloads simulate process-state reset. No live provider calls, site requests, HCP submissions, or bookings were made.

## Release requirement

This draft does **not** change the deployed site. After approval/merge, rebuild and replace every backend worker with this revision; older workers retain their old paid paths. Deploy the frontend for the FAQ Helper label and removal of the stale 17-county badge. No new environment setting, credential, persistent ledger, migration, or paid service is required. Legacy provider keys and `SUNNY_*` model/limit settings are ignored by Sunny. Other workloads may still use shared keys. Paid functionality must not be reintroduced without a separately authorized budget and suitable persistent accounting.
