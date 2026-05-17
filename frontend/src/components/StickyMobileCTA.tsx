"use client";

import Link from "next/link";
import { Phone, CalendarClock } from "lucide-react";
import { usePathname } from "next/navigation";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl bg-background/95 border-t border-border p-3 grid grid-cols-2 gap-2 shadow-ambient-lg" data-testid="sticky-mobile-cta">
      <a href="tel:+18128787343" className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background text-foreground px-3 py-3 text-xs font-bold uppercase tracking-wider" data-testid="sticky-call">
        <Phone className="w-4 h-4" /> Call
      </a>
      <Link href="/quote" className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-3 py-3 text-xs font-bold uppercase tracking-wider" data-testid="sticky-quote">
        <CalendarClock className="w-4 h-4" /> Free Quote
      </Link>
    </div>
  );
}
