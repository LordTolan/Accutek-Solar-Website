"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { X, ArrowRight } from "lucide-react"
import { useHolidayTheme } from "@/context/HolidayThemeProvider"
import { HCP_BOOK_URL } from "@/lib/utils"

const SESSION_KEY = "accutek_halloween_exit_intent_shown"
const MIN_DWELL_MS = 8000

/**
 * One-time, tasteful exit-intent moment for the Halloween theme.
 * Desktop only (cursor leaves through the top of the window after a short
 * dwell). Shown at most once per browser session via sessionStorage.
 */
export default function HalloweenExitIntent() {
  const theme = useHolidayTheme()
  const isHalloween = theme?.name === "halloween"
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!isHalloween || typeof window === "undefined") return
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return
    } catch {
      return
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    const armedAt = Date.now()
    const onLeave = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return
      if (Date.now() - armedAt < MIN_DWELL_MS) return
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return
        sessionStorage.setItem(SESSION_KEY, "1")
      } catch {
        /* ignore */
      }
      setOpen(true)
      document.removeEventListener("mouseout", onLeave)
    }
    document.addEventListener("mouseout", onLeave)
    return () => document.removeEventListener("mouseout", onLeave)
  }, [isHalloween])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, close])

  if (!isHalloween || !open || !theme) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={close}
      data-testid="halloween-exit-intent"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="hw-exit-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-500/30 bg-[#12081f] text-foreground shadow-[0_0_40px_rgba(255,117,24,0.2)]"
      >
        <div
          className="h-28 bg-cover bg-center"
          style={{ backgroundImage: `url(${theme.assets.heroBanner})` }}
          aria-hidden="true"
        />
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-400">// Before you go</div>
          <h2 id="hw-exit-title" className="mt-2 font-heading text-2xl font-extrabold text-balance">
            Don&apos;t get left in the dark this season.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Fall storms and early nights are when outages hurt most. Ask us about solar + battery backup or a Kohler standby generator - free, no-pressure estimate.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/quote"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-md bg-[#ff7518] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-[#ff8a3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
              data-testid="halloween-exit-intent-quote"
            >
              Get my free estimate <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={HCP_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-md border border-orange-500/40 px-5 py-3 text-xs font-bold uppercase tracking-wider text-orange-200 transition hover:border-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300"
            >
              Book online
            </a>
          </div>
          <button
            type="button"
            onClick={close}
            className="mt-4 text-xs text-foreground/50 underline underline-offset-4 hover:text-foreground/80"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  )
}
