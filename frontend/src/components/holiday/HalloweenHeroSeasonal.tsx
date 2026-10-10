"use client"

import Link from "next/link"
import { ArrowRight, BatteryCharging } from "lucide-react"
import { useHolidayTheme } from "@/context/HolidayThemeProvider"

/**
 * Seasonal Halloween card for the homepage hero. Uses the restored
 * /holidays/halloween/hero-banner.webp asset as a dusk backdrop with
 * backup-power copy. Renders nothing outside the Halloween theme, so
 * OriginalHomeHero is unchanged the rest of the year.
 */
export default function HalloweenHeroSeasonal() {
  const theme = useHolidayTheme()
  if (theme?.name !== "halloween") return null

  return (
    <div
      data-testid="halloween-hero-seasonal"
      className="relative mt-10 max-w-xl overflow-hidden rounded-xl border border-orange-500/25 shadow-[0_0_24px_rgba(255,117,24,0.12)]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${theme.assets.heroBanner})` }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#12081f]/95 via-[#12081f]/80 to-[#12081f]/30" />
      <div className="relative flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400">
            <BatteryCharging className="h-3.5 w-3.5" aria-hidden="true" /> Fall outage season
          </div>
          <div className="mt-1.5 font-heading text-lg font-extrabold text-white text-balance">
            Don&apos;t get left in the dark.
          </div>
          <p className="mt-1 text-xs leading-relaxed text-white/70">
            Solar + battery backup and Kohler standby generators keep the lights on when storms roll through.
          </p>
        </div>
        <Link
          href="/quote"
          data-testid="halloween-hero-seasonal-cta"
          className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-md bg-[#ff7518] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-[#ff8a3d] focus-ring sm:self-center"
        >
          Plan my backup <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
