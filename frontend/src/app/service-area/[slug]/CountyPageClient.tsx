"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { API } from "@/lib/utils";
import { ArrowRight, CheckCircle2, MapPin, Phone } from "lucide-react";

const COUNTY_IMG = "https://images.unsplash.com/photo-1621431735623-95fcba6b89ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

interface CountyData {
  name: string;
  state: string;
  blurb: string;
  incentive: string;
  slug: string;
}

export default function CountyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [county, setCounty] = useState<CountyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      try {
        const r = await fetch(`${API}/public/service-area/${slug}`);
        if (!r.ok) { setNotFound(true); return; }
        const data = await r.json();
        setCounty(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) return <div className="py-24 text-center text-muted-foreground">Loading...</div>;
  if (notFound || !county) return <div className="py-24 text-center"><h1 className="text-2xl font-bold">County not found</h1><Link href="/service-area" className="text-primary mt-4 inline-block">← Back to service areas</Link></div>;

  const c = county;

  return (
    <>
      <section className="relative overflow-hidden border-b border-border" data-testid="county-hero">
        <div className="absolute inset-0">
          <Image src={COUNTY_IMG} alt="Rural midwest landscape" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          <div className="absolute inset-0 mix-blend-overlay" style={{ background: "radial-gradient(60% 60% at 30% 50%, hsl(123 55% 24% / 0.5), transparent 70%)" }} />
        </div>
        <div className="relative container mx-auto container-px py-20 md:py-28 max-w-5xl">
          <Link href="/service-area" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-5 hover:text-foreground transition"><MapPin className="w-3.5 h-3.5" /> // SERVICE AREA</Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground text-balance">Solar in <span className="text-primary text-glow">{c.name}</span>, {c.state}</h1>
          <p className="mt-5 text-lg text-foreground/75 max-w-2xl">{c.blurb}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="county-cta-quote">Get my free estimate <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-6 py-3 font-bold focus-ring hover:border-primary transition"><Phone className="w-4 h-4" /> (812) 878-7343</a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" data-testid="county-content">
        <div className="container mx-auto container-px grid lg:grid-cols-12 gap-10 max-w-6xl">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold">Why {c.name} homeowners choose Accutek</h2>
            <ul className="space-y-4 text-foreground/80">
              {["Family-owned, locally operated since 1994", "Free no-pressure site assessments", "NABCEP-certified installations", `Local incentive: ${c.incentive}`, "Authorized Kohler generator installer", "Lifetime support on every system"].map((line, i) => (
                <li key={i} className="flex items-start gap-3" data-testid={`county-bullet-${i}`}>
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-card rounded-3xl p-7 border border-border/60 shadow-ambient">
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Get a {c.name} quote</div>
              <h3 className="font-heading text-2xl font-extrabold">Free, in 60 seconds.</h3>
              <p className="mt-2 text-foreground/70 text-sm">Three questions and a 25-year savings estimate.</p>
              <Link href="/quote" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold focus-ring" data-testid="county-form-cta">Start my estimate <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
