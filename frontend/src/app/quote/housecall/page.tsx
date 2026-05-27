"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { CalendarClock, Phone, ArrowLeft, CheckCircle2, Cpu } from "lucide-react";

const HCP_TOKEN = "00b573cbf4914e25b1cf35dd4028831f";
const HCP_ORG = "Accutek-Solar";
const HCP_LEAD_BASE = `https://book.housecallpro.com/lead-form/${HCP_ORG}/${HCP_TOKEN}`;
const HCP_SCRIPT = `https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG}`;

export default function HousecallPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const phone = searchParams.get("phone") || "";
  const zip = searchParams.get("zip") || "";

  const hasContact = !!(name || email || phone);

  const iframeSrc = useMemo(() => {
    const params = new URLSearchParams();
    if (name) {
      const parts = name.trim().split(/\s+/);
      params.set("first_name", parts[0] || "");
      if (parts.length > 1) params.set("last_name", parts.slice(1).join(" "));
    }
    if (email) params.set("email", email);
    if (phone) params.set("phone_number", phone);
    if (zip) params.set("zip_code", zip);
    const qs = params.toString();
    return qs ? `${HCP_LEAD_BASE}?${qs}` : HCP_LEAD_BASE;
  }, [name, email, phone, zip]);

  return (
    <section className="py-12 md:py-20" data-testid="housecall-page">
      <div className="container mx-auto container-px max-w-3xl">
        {/* Back link */}
        <Link href="/quote" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition mb-6" data-testid="back-to-estimate">
          <ArrowLeft className="w-4 h-4" /> Back to estimate
        </Link>

        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
          // ALMOST DONE | SCHEDULE YOUR VISIT
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-black text-balance">
          Schedule your free <span className="text-primary">house call.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          {hasContact
            ? "Your info is pre-filled below. Just confirm the details, pick a service, and submit."
            : "Fill in your details below and our team will be in touch within one business day."}
        </p>

        {hasContact && (
          <div className="mt-5 inline-flex items-center gap-2 text-xs text-primary bg-primary/10 border border-primary/20 rounded-md px-3 py-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Pre-filled from your estimate
          </div>
        )}

        {/* HCP Lead Form */}
        <div className="mt-8 bg-card rounded-xl border border-border shadow-ambient-lg overflow-hidden" data-testid="hcp-lead-section">
          <header className="px-6 md:px-10 pt-6 pb-4 border-b border-border bg-muted/40">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary">
              <Cpu className="w-3 h-3" /> // HOUSECALL PRO FORM
            </div>
            <p className="mt-1.5 text-foreground/65 text-sm">
              Routes straight to Seth and the Accutek team.
            </p>
          </header>

          <div className="relative">
            <div className="absolute inset-0 grid place-items-center text-muted-foreground text-xs font-mono pointer-events-none" aria-hidden="true">
              <div className="flex items-center gap-2"><CalendarClock className="w-4 h-4" /> Loading form...</div>
            </div>

            <iframe
              id="hcp-lead-iframe"
              src={iframeSrc}
              title="Accutek Solar - Schedule House Call (Housecall Pro)"
              loading="eager"
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
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 hover:text-primary transition">
              <Phone className="w-3 h-3" /> (812) 878-7343
            </a>
          </footer>
        </div>
      </div>
    </section>
  );
}
