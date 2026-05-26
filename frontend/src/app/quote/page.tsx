"use client";

import { useState, useCallback } from "react";
import QuoteWizard from "@/components/QuoteWizard";
import HCPLeadCapture from "@/components/HCPLeadCapture";
import { Sparkles, FileText } from "lucide-react";

export default function QuotePage() {
  const [contact, setContact] = useState({ name: "", email: "", phone: "", zip: "" });

  const handleContactChange = useCallback((c: typeof contact) => {
    setContact(c);
  }, []);

  return (
    <section className="py-16 md:py-24" data-testid="quote-page">
      <div className="container mx-auto container-px max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// FREE · NO PRESSURE · ~60 SECONDS</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Let’s design a system that fits your site, <span className="text-primary">your bill, your budget.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Choose the path that suits you — instant 25-year savings estimate, or the official Accutek lead form. Both reach the same human at our shop.
        </p>

        {/* Path 1: Instant estimate wizard */}
        <div className="mt-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
            <Sparkles className="w-3 h-3" /> // OPTION A · INSTANT ESTIMATE
          </div>
          <QuoteWizard onContactChange={handleContactChange} />
        </div>

        {/* Path 2: Official HCP Lead Capture */}
        <div className="my-14 flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">// OR</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
            <FileText className="w-3 h-3" /> // OPTION B · OFFICIAL LEAD FORM
          </div>
          <HCPLeadCapture contact={contact} />
        </div>
      </div>
    </section>
  );
}
