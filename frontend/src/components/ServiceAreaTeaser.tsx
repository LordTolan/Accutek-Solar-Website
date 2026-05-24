"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

const COUNTIES = [
  { name: "Vermillion County", state: "IN" },
  { name: "Parke County", state: "IN" },
  { name: "Fountain County", state: "IN" },
  { name: "Montgomery County", state: "IN" },
  { name: "Putnam County", state: "IN" },
  { name: "Clay County", state: "IN" },
  { name: "Sullivan County", state: "IN" },
  { name: "Vigo County", state: "IN" },
  { name: "Hendricks County", state: "IN" },
  { name: "Warren County", state: "IN" },
  { name: "Edgar County", state: "IL" },
  { name: "Vermilion County", state: "IL" },
  { name: "Clark County", state: "IL" },
  { name: "Crawford County", state: "IL" },
  { name: "Coles County", state: "IL" },
  { name: "Douglas County", state: "IL" },
  { name: "Champaign County", state: "IL" },
];

export default function ServiceAreaTeaser() {
  const indiana = COUNTIES.filter((c) => c.state === "IN");
  const illinois = COUNTIES.filter((c) => c.state === "IL");

  return (
    <section className="py-20 md:py-28" data-testid="service-area-section">
      <div className="container mx-auto container-px">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Where we serve</div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">
              17 counties across <span className="text-primary">Indiana & Illinois.</span>
            </h2>
            <p className="mt-5 text-foreground/70 leading-relaxed text-lg">
              Headquartered in Clinton, Indiana, we install solar PV, Kohler generators and full electrical
              for homes, farms and businesses across Central Indiana and Western Illinois.
            </p>
            <Link href="/service-area" className="mt-8 inline-flex items-center rounded-full bg-secondary text-secondary-foreground px-6 py-3 font-bold text-sm hover:-translate-y-0.5 transition focus-ring" data-testid="view-all-counties">
              View All Counties \u2192
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 p-6 bg-card shadow-ambient" data-testid="counties-indiana">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading text-lg font-bold">Indiana</div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-mono">{indiana.length}</span>
              </div>
              <ul className="space-y-2">
                {indiana.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-foreground/70 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" /> {c.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 bg-card shadow-ambient" data-testid="counties-illinois">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading text-lg font-bold">Illinois</div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-mono">{illinois.length}</span>
              </div>
              <ul className="space-y-2">
                {illinois.map((c) => (
                  <li key={c.name} className="flex items-center gap-2 text-foreground/70 text-sm">
                    <MapPin className="w-3.5 h-3.5 text-primary/60 shrink-0" /> {c.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
