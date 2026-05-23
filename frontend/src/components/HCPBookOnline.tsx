"use client";

import { CalendarClock, Phone } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";

/**
 * Housecall Pro "Book Online" entry point.
 * Opens the HCP-hosted booking page in a new tab.
 */
export default function HCPBookOnline({ variant = "primary" }: { variant?: "primary" | "ghost" }) {
  return (
    <div className="flex flex-wrap gap-3" data-testid="hcp-book-online">
      <a
        href={HCP_BOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 rounded-md px-6 py-3 font-bold uppercase tracking-wider text-sm focus-ring transition ${
          variant === "primary"
            ? "bg-primary text-primary-foreground hover:shadow-green-glow"
            : "border border-border bg-card text-foreground hover:border-primary"
        }`}
        data-testid="hcp-book-cta"
      >
        <CalendarClock className="w-4 h-4" /> Book Online
      </a>
      <a
        href="tel:+18128787343"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-6 py-3 font-bold focus-ring hover:border-primary transition"
        data-testid="hcp-call-cta"
      >
        <Phone className="w-4 h-4" /> (812) 878-7343
      </a>
    </div>
  );
}
