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
]
