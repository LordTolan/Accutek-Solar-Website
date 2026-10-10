"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useHolidayTheme } from "@/context/HolidayThemeProvider";

export default function HalloweenHeroPromo() {
  const theme = useHolidayTheme();

  if (theme?.name !== "halloween") return null;

  return (
    <div
      data-testid="halloween-hero-promo"
      className="mb-6 inline-flex flex-wrap items-center gap-2.5 sm:gap-3 rounded-full border border-orange-500/40 bg-gradient-to-r from-orange-950/60 via-purple-950/50 to-orange-950/60 px-4 py-2 text-xs backdrop-blur-md shadow-[0_0_20px_rgba(255,117,24,0.25)] animate-pulse"
    >
      <span className="text-base" role="img" aria-label="jack-o-lantern">
        🎃
      </span>
      <span className="font-semibold text-orange-200">
        Pumpkin hunt inside — plus a Starbucks drawing
      </span>
      <Link
        href="#halloween-pumpkin-hunt"
        data-testid="hero-pumpkin-hunt-cta"
        className="inline-flex items-center gap-1 font-bold text-orange-400 hover:text-orange-300 uppercase tracking-wider text-[11px] underline underline-offset-4 decoration-orange-400/60"
      >
        Hunt Pumpkins <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
