"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { api } from "@/lib/api";

export default function ServiceAreaTeaser() {
  const [counties, setCounties] = useState<any[]>([]);
  useEffect(() => { api.getServiceArea().then((d) => setCounties(d.counties)).catch(() => {}); }, []);

  const indiana = counties.filter((c) => c.state === "IN");
  const illinois = counties.filter((c) => c.state === "IL");

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
              View All Counties →
            </Link>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/60 p-6 bg-card shadow-ambient" data-testid="counties-indiana">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading text-lg font-bold">Indiana</div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-foreground font-semibold">{indiana.length}</span>
              </div>
              <ul className="space-y-1.5">
                {indiana.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/service-area/${c.slug}`} className="flex items-center gap-2 text-sm py-1 hover:text-primary transition">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border/60 p-6 bg-card shadow-ambient" data-testid="counties-illinois">
              <div className="flex items-center justify-between mb-4">
                <div className="font-heading text-lg font-bold">Illinois</div>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/15 text-foreground font-semibold">{illinois.length}</span>
              </div>
              <ul className="space-y-1.5">
                {illinois.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/service-area/${c.slug}`} className="flex items-center gap-2 text-sm py-1 hover:text-primary transition">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" /> {c.name}
                    </Link>
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
