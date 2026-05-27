"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const DEFAULT_FAQS = [
  {
    q: "Do we have enough sun in our area for solar to make sense?",
    a: "Yes — we have more solar energy available here than in Germany, and Germany produces more solar energy per capita than any other country.",
  },
  {
    q: "What is the difference between roof-mount and ground-mount solar?",
    a: "Roof-mount arrays use your existing roof structure — fast install, no extra footprint. Ground-mount arrays sit in your yard or field on a steel rack — they let us pick the perfect tilt and orientation, avoid roof shading, and are easier to service. Roughly half of our installs are ground mounts. Pole mounts (with sun tracking) are a third option for premium output on rural lots.",
  },
  {
    q: "What are the different types of PV systems?",
    a: "1) Grid-tied (no batteries, reduces or eliminates your electric bill). 2) Hybrid (grid-tied with batteries for outage backup). 3) Off-grid (fully independent with batteries and a backup generator).",
  },
  {
    q: "What is net metering?",
    a: "Net metering credits you for excess power you produce. In Indiana, the utility doesn't pay cash but credits your account - perfect for using summer overproduction to offset winter use.",
  },
  {
    q: "How long has Accutek Solar been in business?",
    a: "Accutek Solar was founded in 1994 by Keith Davis. We are a family-owned company with over 32 years of electrical and solar installation experience.",
  },
  {
    q: "Is the federal solar tax credit still available?",
    a: "The big federal solar tax credit for new systems ended this year. The good news: state-level programs (Indiana net metering, Illinois Shines SREC), USDA REAP grants for ag/rural businesses, and utility incentives are still in play - and equipment pricing has come down. Talk to us about today's real-world payback math.",
  },
  {
    q: "Do you install backup generators?",
    a: "Yes - we are authorized Kohler generator installers. Kohler has a proven track record for emergency power that's ready when you need it.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes, every solar and generator quote is free. Use our online calculator for a fast estimate, then book a free site visit.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-muted/40" data-testid="faq-section">
      <div className="container mx-auto container-px max-w-4xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Common questions</div>
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">Everything you wanted to ask.</h2>

        <div className="mt-12 divide-y divide-border border-t border-b border-border">
          {DEFAULT_FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left py-6 group focus-ring" data-testid={`faq-item-${i}`}>
                <div className="flex items-start justify-between gap-6">
                  <div className="font-heading text-lg md:text-xl font-bold pr-4">{it.q}</div>
                  <ChevronDown className={`shrink-0 w-5 h-5 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-foreground/75 leading-relaxed text-base">{it.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
