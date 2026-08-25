# Homepage Hero Switch

The active homepage hero is controlled by one constant:

```ts
// frontend/src/config/homeHero.ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "darkness-to-light";
```

To restore the original light technical hero, change only the value to:

```ts
export const ACTIVE_HOME_HERO: HomeHeroVariant = "original";
```

Then use the normal website release process:

```bash
cd /docker/Accutek-Solar-Web
git pull origin main
docker compose -f docker-compose.website.yml up -d --build
```

The original hero code remains in `frontend/src/components/OriginalHomeHero.tsx`. The new video hero remains in `frontend/src/components/DarknessToLightHero.tsx`, and its media remains in `frontend/public/media/darkness-to-light/`. Do not delete either component or its media assets; the configuration switch is designed to make either hero reversible with one source-line change and a standard rebuild.
