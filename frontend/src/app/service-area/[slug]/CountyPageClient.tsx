"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { API, HCP_BOOK_URL } from "@/lib/utils";
import { ArrowRight, CheckCircle2, MapPin, Phone, ShieldCheck, Zap, LandPlot, User } from "lucide-react";

const COUNTY_IMG = "https://images.unsplash.com/photo-1621431735623-95fcba6b89ae?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

interface CountyData {
  name: string;
  state: string;
  blurb: string;
  incentive: string;
  slug: string;
  seat?: string;
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

  if (loading) return <div className="py-24 text-center text-muted-foreground font-mono uppercase tracking-widest text-[10px]">Loading Project Data...</div>;
  if (notFound || !county) return <div className="py-24 text-center"><h1 className="text-2xl font-black font-heading">County not found</h1><Link href="/service-area" className="text-primary mt-4 inline-block font-bold">← Back to service areas</Link></div>;

  const c = county;

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border" data-testid="county-hero">
        <div className="absolute inset-0">
          <Image src={COUNTY_IMG} alt={`${c.name} landscape`} fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/90 to-background" />
        </div>
        <div className="relative container mx-auto container-px py-24 md:py-32 max-w-5xl">
          <Link href="/service-area" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-6 hover:text-foreground transition">
            <MapPin className="w-3.5 h-3.5" /> // ACCUTEK SERVICE AREA
          </Link>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-foreground text-balance leading-[0.95]">
            Solar in <span className="text-primary text-glow">{c.name}</span>
          </h1>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono text-foreground/50">{c.state} | Local Expertise since 1994</span>
          </div>
          <p className="mt-8 text-xl text-foreground/80 max-w-2xl leading-relaxed font-medium">
            {c.blurb}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-wider text-xs hover:shadow-green-glow transition focus-ring" data-testid="county-cta-quote">
              Start Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-card/50 text-foreground px-8 py-4 font-bold text-xs uppercase tracking-wider focus-ring hover:border-primary transition">
              <Phone className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>

      {/* Local Insights Section (SolarSeth) */}
      <section className="py-20 bg-muted/20 border-b border-border" data-testid="county-insights">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-8 space-y-8">
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary">// LOCAL INSIGHTS BY SOLARSETH</div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-balance">The real cost of <span className="text-primary italic">waiting for solar.</span></h2>
              <div className="prose prose-invert max-w-none text-foreground/75 leading-relaxed space-y-6">
                <p>
                  Homeowners in {c.name} who install solar energy systems can enjoy immediate financial benefits, including greatly reduced electricity bills and increased property value. Solar panels are low-maintenance and provide energy independence, insulating you from fluctuating energy prices and outages.
                </p>
                <p>
                  Plus, the combination of electric vehicles (EVs) and solar offers a compelling solution to today&apos;s energy challenges. By generating solar power at home, you can charge your EV with homegrown energy, cutting out the need for gasoline and reducing reliance on the grid.
                </p>
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="p-6 bg-card border border-border rounded-2xl shadow-ambient">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary grid place-items-center"><User className="w-4 h-4" /></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">SolarSeth&apos;s Note</span>
                </div>
                <p className="text-sm text-foreground/70 italic leading-relaxed">
                  &ldquo;Powering your vehicle with homegrown energy isn&apos;t just a trend &mdash; it&apos;s an empowering step toward a self-sufficient future where renewable energy and transportation go hand in hand.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ground Mount vs Roof Section (Seth's Priority) */}
      <section className="py-20 border-b border-border" data-testid="county-install-types">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary">// INSTALLATION TYPES</div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-balance">Built for the <span className="italic text-primary">landscape</span>.</h2>
              <p className="text-foreground/75 leading-relaxed">
                Whether you have a tight residential roof in Newport or a multi-acre field in rural {c.name}, we engineer the rack to fit. Many of our local systems are ground mounts, designed for maximum harvest without touching your shingles.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-card border border-border rounded-xl">
                  <Zap className="w-6 h-6 text-primary mb-3" />
                  <div className="font-heading font-bold text-sm uppercase tracking-wide">Roof Mount</div>
                  <p className="mt-1 text-xs text-foreground/60">Fast, streamlined, zero extra footprint.</p>
                </div>
                <div className="p-5 bg-card border border-border rounded-xl">
                  <LandPlot className="w-6 h-6 text-primary mb-3" />
                  <div className="font-heading font-bold text-sm uppercase tracking-wide">Ground Mount</div>
                  <p className="mt-1 text-xs text-foreground/60">Perfect tilt, easy service, ag-grade racks.</p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-ambient-lg">
              <Image src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" alt="Solar array in field" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24" data-testid="county-why-accutek">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1 space-y-8">
              <h2 className="font-heading text-3xl md:text-4xl font-extrabold">Why {c.name} chooses Accutek</h2>
              <div className="grid gap-6">
                {[
                  { title: "Local, Family-Owned", body: "Serving Indiana and Illinois families since 1994. No 1-800 numbers." },
                  { title: "NABCEP Expertise", body: "Certified professionals handling every wire pull and panel tilt." },
                  { title: "Kohler Generators", body: "Authorized installers for whole-home backup power that works when solar doesn't." },
                  { title: "Sub-Zero Reliable", body: "We use battery and monitoring tech built for Midwest winters." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-heading font-bold uppercase tracking-wide text-sm">{item.title}</div>
                      <p className="mt-1 text-sm text-foreground/65">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-[380px] shrink-0">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-ambient sticky top-24">
                <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-2">// LOCAL INCENTIVE</div>
                <h3 className="font-heading text-xl font-extrabold">{c.incentive}</h3>
                <p className="mt-4 text-foreground/70 text-sm leading-relaxed">
                  We handle all the interconnection paperwork with your local utility to ensure you get full credit for the power you produce.
                </p>
                <div className="mt-8 pt-8 border-t border-border">
                  <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-4 font-bold uppercase tracking-wider text-xs hover:shadow-green-glow transition focus-ring">
                    Book Site Visit <CalendarClock className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Icons for the list
function CalendarClock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h5" />
      <path d="M17.5 17.5 16 16.25V14" />
      <circle cx="16" cy="16" r="6" />
    </svg>
  );
}
