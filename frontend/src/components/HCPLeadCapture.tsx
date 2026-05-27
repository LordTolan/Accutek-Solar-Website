"use client";

import { useMemo } from "react";
import Script from "next/script";
import { CalendarClock, Cpu, CheckCircle2, Copy } from "lucide-react";

const HCP_TOKEN = "00b573cbf4914e25b1cf35dd4028831f";
const HCP_ORG = "Accutek-Solar";
const HCP_SCRIPT = `https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG}`;
const HCP_LEAD_BASE = `https://book.housecallpro.com/lead-form/${HCP_ORG}/${HCP_TOKEN}`;

interface HCPLeadCaptureProps {
  contact?: { name: string; email: string; phone: string; zip: string };
}

export default function HCPLeadCapture({ contact }: HCPLeadCaptureProps) {
  const hasContact = contact && (contact.name || contact.email || contact.phone);

  // Build the iframe URL with pre-fill params when contact info is available
  const iframeSrc = useMemo(() => {
    if (!contact) return HCP_LEAD_BASE;
    const params = new URLSearchParams();
    if (contact.name) {
      const parts = contact.name.trim().split(/\s+/);
      params.set("first_name", parts[0] || "");
      if (parts.length > 1) params.set("last_name", parts.slice(1).join(" "));
    }
    if (contact.email) params.set("email", contact.email);
    if (contact.phone) params.set("phone_number", contact.phone);
    if (contact.zip) params.set("zip_code", contact.zip);
    const qs = params.toString();
    return qs ? `${HCP_LEAD_BASE}?${qs}` : HCP_LEAD_BASE;
  }, [contact]);

  // Key forces iframe remount when contact changes so new URL actually loads
  const iframeKey = useMemo(() => {
    if (!contact) return "hcp-default";
    return `hcp-${contact.name}-${contact.email}-${contact.phone}-${contact.zip}`;
  }, [contact]);

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
        {hasContact && (
          <div className="mt-3 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs text-primary bg-primary/10 border border-primary/20 rounded-md px-3 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Your info from the estimate above - copy into the form below
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-foreground/70">
              {contact?.name && <span className="bg-muted rounded px-2 py-1 font-mono">{contact.name}</span>}
              {contact?.email && <span className="bg-muted rounded px-2 py-1 font-mono">{contact.email}</span>}
              {contact?.phone && <span className="bg-muted rounded px-2 py-1 font-mono">{contact.phone}</span>}
              {contact?.zip && <span className="bg-muted rounded px-2 py-1 font-mono">{contact.zip}</span>}
            </div>
          </div>
        )}
      </header>

      <div className="relative">
        <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs font-mono pointer-events-none" aria-hidden="true">
          <div className="flex items-center gap-2"><CalendarClock className="w-4 h-4" /> Loading Housecall Pro form...</div>
        </div>

        <iframe
          key={iframeKey}
          id="hcp-lead-iframe"
          src={iframeSrc}
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
        <a href={HCP_LEAD_BASE} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition" data-testid="hcp-lead-form-newtab">
          Open in a new tab ->
        </a>
      </footer>
    </section>
  );
}
