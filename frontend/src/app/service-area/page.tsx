"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface County {
  slug: string;
  name: string;
  state: string;
  seat: string;
  blurb: string;
}

export default function ServiceAreaPage() {
  const [counties, setCounties] = useState<County[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${API}/public/service-area`);
        if (r.ok) {
          const data = await r.json();
          setCounties(data.counties || []);
        }
      } catch (e) {
        console.error("Failed to load counties:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const grouped: Record<string, County[]> = { IN: [], IL: [] };
  for (const c of counties) grouped[c.state]?.push(c);

  return (
    <section className="py-16 md:py-24" data-testid="service-area-page">
      <div className="container mx-auto container-px max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Service area</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">17 counties. One trusted local installer.</h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">From our HQ in Clinton, Indiana we cover Central Indiana and Western Illinois. Find your county below for local incentives.</p>

        {loading ? (
          <div className="mt-14 text-center text-muted-foreground">Loading service areas...</div>
        ) : (
          (["IN", "IL"] as const).map((s) => (
            <div key={s} className="mt-14">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-heading text-3xl font-extrabold">{s === "IN" ? "Indiana" : "Illinois"}</h2>
                <span className="text-sm text-muted-foreground">{grouped[s].length} counties</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[s].map((c) => (
                  <Link key={c.slug} href={`/service-area/${c.slug}`} className="group rounded-2xl border border-border/60 p-6 bg-card hover:border-primary hover:shadow-ambient-lg transition" data-testid={`county-card-${c.slug}`}>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> {c.seat}, {c.state}
                    </div>
                    <div className="mt-2 font-heading text-xl font-bold group-hover:text-primary transition">{c.name}</div>
                    <p className="mt-2 text-sm text-foreground/65 line-clamp-2">{c.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
