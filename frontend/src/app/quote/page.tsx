"use client";

import HCPLeadCapture from "@/components/HCPLeadCapture";

export default function QuotePage() {
  return (
    <section className="py-16 md:py-24" data-testid="quote-page">
      <div className="container mx-auto container-px max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// FREE · NO PRESSURE · ~60 SECONDS</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Let&apos;s design a system that fits your site, <span className="text-primary">your bill, your budget.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Fill out the form below and your request goes straight to Seth and the Accutek team.
        </p>

        <div className="mt-12">
          <HCPLeadCapture />
        </div>
      </div>
    </section>
  );
}
