"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 backdrop-blur-xl bg-background/90 border-t border-border p-3 flex gap-3 shadow-ambient-lg" data-testid="sticky-mobile-cta">
      <a href="tel:+18128787343" className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-secondary/30 text-secondary px-4 py-3 text-sm font-bold" data-testid="sticky-call">
        <Phone className="w-4 h-4" /> Call Now
      </a>
      <Link href="/quote" className="flex-1 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-bold" data-testid="sticky-quote">
        Get Free Quote
      </Link>
    </div>
  );
}
