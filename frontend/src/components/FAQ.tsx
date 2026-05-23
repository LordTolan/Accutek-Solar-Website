"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { api } from "@/lib/api";

export default function FAQ() {
  const [items, setItems] = useState<{ q: string; a: string }[]>([]);
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => { api.getFaq().then((d) => setItems(d.faqs)).catch(() => {}); }, []);

  return (
    <section className="py-20 md:py-28 bg-muted/40" data-testid="faq-section">
      <div className="container mx-auto container-px max-w-4xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Common questions</div>
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">Everything you wanted to ask.</h2>

        <div className="mt-12 divide-y divide-border border-t border-b border-border">
          {items.map((it, i) => {
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
