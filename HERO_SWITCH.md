# Homepage Hero Switch

The active homepage hero is controlled by one constant:

```ts
// frontend/src/config/homeHero.ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "original";
```

## Active Hero

The homepage (`/`) currently renders the **original** light technical hero (`frontend/src/components/OriginalHomeHero.tsx`) with the rotating headline, capability cards, and standard estimate CTAs.

## Preview Route for Darkness-to-Light Campaign

The temporary "Darkness to Light" home-backup video hero (`frontend/src/components/DarknessToLightHero.tsx`) is available at an unlinked preview route:

- **Path:** `/backup-power` (URL: `https://new.accuteksolar.com/backup-power/`)
- **File:** `frontend/src/app/backup-power/page.tsx`
- **SEO & Navigation:** Marked with `robots: { index: false, follow: false }`, excluded from primary navigation, footer, and `sitemap.xml`.
- **Static Export:** Fully compatible with Next.js static export (`output: 'export'`).

## How to Switch Back to Darkness-to-Light on the Homepage

To reactivate the Darkness-to-Light hero as the primary homepage hero:

1. Update `frontend/src/config/homeHero.ts`:

```ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "darkness-to-light";
```

2. Deploy using the normal website release process:

```bash
cd /docker/Accutek-Solar-Web
git pull origin main
docker compose -f docker-compose.website.yml up -d --build
```

## How to Switch to Original Hero on the Homepage

To restore the original hero on the homepage:

1. Update `frontend/src/config/homeHero.ts`:

```ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "original";
```

2. Deploy using the normal website release process.

## Preserved Assets

The original hero code remains in `frontend/src/components/OriginalHomeHero.tsx`. The video hero remains in `frontend/src/components/DarknessToLightHero.tsx`, and its media remains in `frontend/public/media/darkness-to-light/`. Do not delete either component or its media assets; the configuration switch and preview route are designed to keep both variants fully reusable.
