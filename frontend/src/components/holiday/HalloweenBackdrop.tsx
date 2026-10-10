"use client"

import { useEffect, useRef, useState } from "react"
import { useHolidayTheme } from "@/context/HolidayThemeProvider"

/**
 * HalloweenBackdrop - atmospheric, premium dusk layer for the Halloween theme.
 *
 * Layering: rendered as a `fixed inset-0 -z-10` layer. <body> is an isolated
 * stacking context (`isolate`), so this sits ABOVE the body background but
 * BEHIND all page content and BEHIND HalloweenSiteDecor / Critter Crossing (z-30).
 *
 * Scroll ambience: when a new <main> section scrolls into view the vignette
 * breathes once and a faint pair of jack-o'-lantern eyes blinks once at the
 * page edge. Fully disabled under prefers-reduced-motion.
 */
export default function HalloweenBackdrop() {
  const theme = useHolidayTheme()
  const isHalloween = theme?.name === "halloween"
  const [pulseKey, setPulseKey] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(true)
  const lastPulse = useRef(0)

  useEffect(() => {
    if (!isHalloween || typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener?.("change", update)
    return () => mq.removeEventListener?.("change", update)
  }, [isHalloween])

  useEffect(() => {
    if (!isHalloween || reducedMotion || typeof IntersectionObserver === "undefined") return
    const seen = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue
          seen.add(entry.target)
          const now = Date.now()
          // Sparse: at most one ambient moment every 6s.
          if (now - lastPulse.current < 6000) continue
          lastPulse.current = now
          setPulseKey((k) => k + 1)
        }
      },
      { threshold: 0.35 }
    )
    const sections = document.querySelectorAll("main section")
    // Skip the hero (first section) so the first moment happens on scroll.
    sections.forEach((s, i) => {
      if (i > 0) observer.observe(s)
    })
    return () => observer.disconnect()
  }, [isHalloween, reducedMotion])

  if (!isHalloween || !theme) return null

  const { heroBanner, overlay, backgroundPattern } = theme.assets

  return (
    <div
      aria-hidden="true"
      data-testid="halloween-backdrop"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Dusk sky / harvest moon, anchored to the top and fading into the page */}
      <div
        className="absolute inset-x-0 top-0 h-[85vh] bg-cover bg-top opacity-[0.22]"
        style={{
          backgroundImage: `url(${heroBanner})`,
          maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
        }}
      />

      {/* Faint tileable spider-web pattern */}
      {backgroundPattern && (
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{ backgroundImage: `url(${backgroundPattern})`, backgroundSize: "512px 512px", backgroundRepeat: "repeat" }}
        />
      )}

      {/* Soft vignette + low mist overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${overlay})` }}
        />
      )}

      {/* Scroll-triggered moments (motion-safe only) */}
      {!reducedMotion && pulseKey > 0 && (
        <div key={pulseKey}>
          <div className="hw-backdrop-vignette-pulse absolute inset-0" />
          <div className="hw-backdrop-eyes absolute bottom-[18%] right-[3%] flex gap-3">
            <span className="block h-2 w-3 rounded-full bg-[#ff7518] shadow-[0_0_12px_4px_rgba(255,117,24,0.55)]" />
            <span className="block h-2 w-3 rounded-full bg-[#ff7518] shadow-[0_0_12px_4px_rgba(255,117,24,0.55)]" />
          </div>
        </div>
      )}

      <style>{`
        .hw-backdrop-vignette-pulse {
          background: radial-gradient(ellipse at center, transparent 55%, rgba(26, 11, 46, 0.55) 100%);
          opacity: 0;
          animation: hwVignettePulse 2.8s ease-in-out 1 forwards;
        }
        @keyframes hwVignettePulse {
          0% { opacity: 0; }
          45% { opacity: 1; }
          100% { opacity: 0; }
        }
        .hw-backdrop-eyes {
          opacity: 0;
          animation: hwEyesBlink 2.6s ease-in-out 1 forwards;
        }
        @keyframes hwEyesBlink {
          0% { opacity: 0; transform: scaleY(1); }
          30% { opacity: 0.7; transform: scaleY(1); }
          45% { opacity: 0.7; transform: scaleY(0.1); }
          55% { opacity: 0.7; transform: scaleY(1); }
          80% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hw-backdrop-vignette-pulse, .hw-backdrop-eyes { display: none; }
        }
      `}</style>
    </div>
  )
}
