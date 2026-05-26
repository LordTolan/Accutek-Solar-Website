"use client";

import Script from "next/script";
import { CalendarClock, Cpu } from "lucide-react";

/**
 * Official Housecall Pro Lead Capture widget.
 * Snippet provided by Donna - pairs the loader script with the lead-form iframe.
 * The script hydrates / resizes the iframe by its id (#hcp-lead-iframe).
 */
const HCP_TOKEN = "00b573cbf4914e25b1cf35dd4028831f";
const HCP_ORG = "Accutek-Solar";
const HCP_SCRIPT = `https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG}`;
const HCP_LEAD_FORM = `https://book.housecallpro.com/lead-form/${HCP_ORG}/${HCP_TOKEN}`;

export default function HCPLeadCapture() {
  return (
    <section className="bg-card rounded-xl border border-border shadow-ambient overflow-hidden" data-testid="hcp-lead-capture">
      <header className="px-6 md:px-10 pt-7 pb-5 border-b border-border bg-muted/40">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary">
          <Cpu className="w-3 h-3" /> // OFFICIAL HOUSECALL PRO FORM
        </div>
        <h2 className="mt-2 font-heading text-2xl md:text-3xl font-extrabold">Prefer to fill in the form?</h2>
        <p className="mt-1.5 text-foreground/65 text-sm">
          Submit through our Housecall Pro lead form - routes straight to Seth and the Accutek team.
        </p>
      </header>

      <div className="relative">
        {/* Subtle loading shimmer behind the iframe */}
        <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs font-mono pointer-events-none" aria-hidden="true">
          <div className="flex items-center gap-2"><CalendarClock className="w-4 h-4" /> Loading Housecall Pro form...</div>
        </div>

        <iframe
          id="hcp-lead-iframe"
          src={HCP_LEAD_FORM}
          title="Accutek Solar - Lead Capture (Housecall Pro)"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="payment *; clipboard-write *"
          className="relative w-full block bg-card"
          style={{ border: "none", width: "100%", height: 800 }}
          data-testid="hcp-lead-iframe"
        />
      </div>

      <Script
        id="hcp-lead-capture-script"
        src={HCP_SCRIPT}
        strategy="afterInteractive"
        async
      />

      <footer className="px-6 md:px-10 py-4 border-t border-border bg-muted/30 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
        <span>// POWERED BY HOUSECALL PRO</span>
        <a href={HCP_LEAD_FORM} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" data-testid="hcp-lead-form-newtab">
          Open in a new tab ->
        </a>
      </footer>
    </section>
  );
}
