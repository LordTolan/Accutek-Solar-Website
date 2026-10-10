"use client"

import Link from "next/link"
import { useHolidayTheme } from "@/context/HolidayThemeProvider"

/**
 * Full-width announcement banner that only renders during
 * an active holiday theme window.
 */
export default function HolidayCTABanner() {
  const theme = useHolidayTheme()

  if (!theme) return null

  if (theme.name === "halloween") {
    return (
      <Link
        href="/#halloween-pumpkin-hunt"
        data-testid="holiday-cta-banner-halloween"
        className="
          block
          bg-[#ff7518]
          text-black
          hover:bg-[#ff8a3d]
          text-center
          py-2.5
          px-4
          font-bold
          text-xs
          sm:text-sm
          tracking-wide
          transition-colors
          shadow-md
          relative
          z-50
        "
      >
        🎃 <span className="font-extrabold uppercase tracking-wider">Halloween Solar Spooktacular</span> — Pumpkin hunt inside — plus a Starbucks drawing! ☕ <span className="underline ml-1">Find all 5 pumpkins &rarr;</span>
      </Link>
    )
  }

  return (
    <Link
      href="/quote"
      data-testid="holiday-cta-banner-default"
      className="
        block
        bg-red-600
        text-white
        text-center
        py-3
        font-semibold
        text-sm
        tracking-wide
        hover:bg-red-700
        transition
      "
    >
      🇺🇸 Independence Day Solar Savings Event — Get Your Free Estimate 🇺🇸
    </Link>
  )
}

