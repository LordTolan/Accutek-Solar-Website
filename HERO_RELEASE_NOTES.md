# Darkness-to-Light Homepage Hero — Release Notes

## Release scope

This change replaces the active Accutek Solar homepage hero with the approved **Darkness to Light** video experience. It adds responsive desktop and mobile video sources, a poster fallback, native support for reduced motion and slow network conditions, real conversion paths to `/quote` and the current online-booking destination, and a marquee of core service messages.

The former light technical hero is preserved in `frontend/src/components/OriginalHomeHero.tsx`. The homepage now selects one hero through `frontend/src/config/homeHero.ts`; the production value is currently `"darkness-to-light"`.

## Validation completed

| Check | Result |
|---|---|
| Next.js production compilation | Completed successfully with all static routes generated. |
| Desktop preview | New hero, headline, video treatment, and both CTAs rendered correctly. |
| Media integrity | Desktop and mobile MP4/WebM variants plus poster were validated before integration. |
| Hero fallback controls | Poster-only behavior applies for reduced-motion, data-saver, and slow-network cases. |
| TikTok companion ad | 15-second 1080×1920 H.264 MP4 rendered and validated separately. |

## Deployment sequence

After the release branch or patch is committed and pushed to the website repository, deploy from the Accutek VPS using the project’s existing workflow:

```bash
cd /docker/Accutek-Solar-Web
git pull origin main
docker compose -f docker-compose.website.yml up -d --build
docker ps --filter "name=accutek-web" --format "table {{.Names}}\t{{.Status}}"
curl -I http://localhost:3001
```

Then confirm that `https://new.accuteksolar.com` loads the new hero; the **Get a Backup Quote** link should open `/quote`, and **Book Online** should open the existing Housecall Pro booking page.

## Immediate rollback

To restore the previous hero, change only this line in `frontend/src/config/homeHero.ts`:

```ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "original";
```

Commit, push, and rerun the same VPS deployment sequence. Do not delete the new component or media assets; retaining both variants is what keeps rollback to a one-line change.

## Deployment note

This handoff has **not** been pushed to GitHub or deployed to the VPS. Publishing requires explicit release approval.
