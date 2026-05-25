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

  return (
    <Link
      href="/quote"
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
