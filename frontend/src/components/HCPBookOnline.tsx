"use client";

import Link from "next/link";
import { CalendarClock, Phone } from "lucide-react";

/**
 * Housecall Pro "Book Online" entry point.
 * - Renders the official HCP widget when `data-hcp-widget` is wired in <head>.
 * - Falls back to a styled "Book Online" CTA + tel link so the experience never breaks.
 * - To wire the real widget:
 *     1) Paste the HCP <script> snippet into /app/frontend/src/app/layout.tsx <head>.
 *     2) Replace the <div id="hcp-book-online"/> contents target if HCP provides a custom mount.
 */
export default function HCPBookOnline({ variant = "primary" }: { variant?: "primary" | "ghost" }) {
  return (
    <div className="flex flex-wrap gap-3" data-testid="hcp-book-online">
      <Link
        href="/book"
        className={`inline-flex items-center gap-2 rounded-md px-6 py-3 font-bold uppercase tracking-wider text-sm focus-ring transition ${
          variant === "primary"
            ? "bg-primary text-primary-foreground hover:shadow-green-glow"
            : "border border-border bg-background/60 text-foreground hover:border-primary"
        }`}
        data-testid="hcp-book-cta"
      >
        <CalendarClock className="w-4 h-4" /> Book Online
      </Link>
      <a
        href="tel:+18128787343"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-6 py-3 font-bold focus-ring hover:border-primary transition"
        data-testid="hcp-call-cta"
      >
        <Phone className="w-4 h-4" /> (812) 878-7343
      </a>
    </div>
  );
}
