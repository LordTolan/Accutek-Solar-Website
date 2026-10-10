export type HolidayTheme = {
  name: string
  start: string
  end: string
  enabled: boolean

  assets: {
    heroBanner: string
    overlay?: string
    backgroundPattern?: string
  }

  styles: {
    primary: string
    secondary: string
    accent: string
  }
}

/**
 * Holiday themes configuration.
 * Multi-holiday note: Future themes like Thanksgiving or Christmas can be added here.
 * Only one holiday theme is active at a time via getActiveHolidayTheme() based on date range and enabled flag.
 */
export const holidayThemes: HolidayTheme[] = [
  {
    name: "fourth-of-july",

    start: "2026-06-25",
    end: "2026-07-06",

    enabled: true,

    assets: {
      heroBanner: "/holidays/fourth-of-july/hero-banner.webp",
      overlay: "/holidays/fourth-of-july/fireworks-overlay.png",
      backgroundPattern:
        "/holidays/fourth-of-july/stars-pattern.png",
    },

    styles: {
      primary: "#0a3161",
      secondary: "#ffffff",
      accent: "#b31942",
    },
  },
  {
    name: "halloween",

    start: "2026-10-01",
    end: "2026-11-01",

    enabled: false,

    assets: {
      heroBanner: "/holidays/halloween/hero-banner.webp",
      overlay: "/holidays/halloween/spooky-overlay.png",
      backgroundPattern: "/holidays/halloween/spider-web-pattern.png",
    },

    styles: {
      primary: "#ff7518",
      secondary: "#1a0b2e",
      accent: "#76ff03",
    },
  },
]

