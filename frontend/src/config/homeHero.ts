export const HOME_HERO_VARIANTS = ["darkness-to-light", "original"] as const;

export type HomeHeroVariant = (typeof HOME_HERO_VARIANTS)[number];

/**
 * Homepage hero release switch.
 *
 * Change this one value to "original" and redeploy to restore the prior hero.
 * Keep the media files and components in place so switching in either direction
 * remains a safe, one-line release change.
 */
export const ACTIVE_HOME_HERO: HomeHeroVariant = "darkness-to-light";
