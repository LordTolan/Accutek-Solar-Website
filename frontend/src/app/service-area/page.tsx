"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

interface County {
  slug: string;
  name: string;
  state: string;
  seat: string;
  blurb: string;
}

const COUNTIES: County[] = [
  { slug: "vermillion-county-in", name: "Vermillion County", state: "IN", seat: "Newport",
    blurb: "Home turf for Accutek Solar since 1994 - Vermillion County homeowners save thousands with right-sized solar arrays." },
  { slug: "parke-county-in", name: "Parke County", state: "IN", seat: "Rockville",
    blurb: "Rural Parke County properties benefit massively from off-grid and hybrid systems with Kohler backup." },
  { slug: "fountain-county-in", name: "Fountain County", state: "IN", seat: "Covington",
    blurb: "Custom PV designs for Fountain County homes - financing options available." },
  { slug: "montgomery-county-in", name: "Montgomery County", state: "IN", seat: "Crawfordsville",
    blurb: "Crawfordsville and Montgomery County families trust Accutek for grid-tied solar and standby generators." },
  { slug: "putnam-county-in", name: "Putnam County", state: "IN", seat: "Greencastle",
    blurb: "Solar arrays sized for Putnam County's sun hours - typical payback in 6-9 years." },
  { slug: "clay-county-in", name: "Clay County", state: "IN", seat: "Brazil",
    blurb: "Brazil and surrounding Clay County homes - we install reliable, monitored PV systems." },
  { slug: "sullivan-county-in", name: "Sullivan County", state: "IN", seat: "Sullivan",
    blurb: "Sullivan County farms and homes - solar plus Kohler generators for true energy independence." },
  { slug: "vigo-county-in", name: "Vigo County", state: "IN", seat: "Terre Haute",
    blurb: "Terre Haute homeowners - see our work at Ivy Tech and trust our 32-year track record." },
  { slug: "hendricks-county-in", name: "Hendricks County", state: "IN", seat: "Danville",
    blurb: "Hendricks County residents - premium installs with attention to detail." },
  { slug: "warren-county-in", name: "Warren County", state: "IN", seat: "Williamsport",
    blurb: "Warren County rural properties - off-grid and hybrid systems our specialty." },
  { slug: "edgar-county-il", name: "Edgar County", state: "IL", seat: "Paris",
    blurb: "Edgar County, IL - Illinois Shines program makes solar incredibly affordable." },
  { slug: "vermilion-county-il", name: "Vermilion County", state: "IL", seat: "Danville",
    blurb: "Danville and Vermilion County homes - Accutek serves Illinois with the same rigor as Indiana." },
  { slug: "clark-county-il", name: "Clark County", state: "IL", seat: "Marshall",
    blurb: "Clark County residents - full-service solar from design to monitoring." },
  { slug: "crawford-county-il", name: "Crawford County", state: "IL", seat: "Robinson",
    blurb: "Crawford County - we handle every detail of your solar install." },
  { slug: "coles-county-il", name: "Coles County", state: "IL", seat: "Charleston",
    blurb: "Charleston, Mattoon and Coles County families - start saving with solar." },
  { slug: "douglas-county-il", name: "Douglas County", state: "IL", seat: "Tuscola",
    blurb: "Douglas County homes and farms - solar PV and Kohler generators." },
  { slug: "champaign-county-il", name: "Champaign County", state: "IL", seat: "Urbana",
    blurb: "Champaign-Urbana - premium residential and commercial solar with monitoring." },
];

export default function ServiceAreaPage() {
  const grouped: Record<string, County[]> = { IN: [], IL: [] };
  for (const c of COUNTIES) grouped[c.state]?.push(c);

  return (
    <section className="py-16 md:py-24" data-testid="service-area-page">
      <div className="container mx-auto container-px max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Service area</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">17 counties. One trusted local installer.</h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">From our HQ in Clinton, Indiana we cover Central Indiana and Western Illinois. Find your county below for local incentives.</p>

        {(["IN", "IL"] as const).map((s) => (
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
        ))}
      </div>
    </section>
  );
}
