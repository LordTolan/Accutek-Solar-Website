import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Wrench, BatteryCharging, LightbulbIcon, Building2, ShieldCheck, Sun, Mountain, Cpu, CheckCircle2 } from "lucide-react";
import HeroVideo from "@/components/HeroVideo";
import CountUp from "@/components/CountUp";
import HCPBookOnline from "@/components/HCPBookOnline";
import RotatingHeadline from "@/components/RotatingHeadline";
import ServiceAreaTeaser from "@/components/ServiceAreaTeaser";
import Testimonials from "@/components/Testimonials";
import HCPReviews from "@/components/HCPReviews";
import FAQ from "@/components/FAQ";
import ManufacturerLogos from "@/components/ManufacturerLogos";
import UtilityCostProjection from "@/components/UtilityCostProjection";
import ManufacturersStrip from "@/components/ManufacturersStrip";
import { HCP_BOOK_URL } from "@/lib/utils";

// Ground-mount solar array - primary hero imagery (Seth's note: balance roof + ground)
const HERO_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const ROOF_IMG = "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";
const TECH_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems - roof, ground mount, or pole mount." },
  { icon: Mountain, title: "Ground-Mount Arrays", desc: "Field & yard installs sized for higher-output sites - ideal for ag, rural and larger lots." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom systems for businesses, farms and ag operations - REAP-grant eligible." },
  { icon: BatteryCharging, title: "Kohler Generators", desc: "Authorized Kohler installer - 24/7 automatic backup power." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "Licensed electricians with 32 years of full-service experience." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting + live energy monitoring to drive your usage down." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero - clean light / technical, no video */}
        <HeroVideo />
      <section className="relative overflow-hidden border-b border-border" data-testid="hero-section">
        {/* Background grid + soft gradient */}

        <div className="relative container mx-auto container-px py-20 md:py-28 lg:py-32 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-mono text-primary bg-primary/8 border border-primary/30 px-3 py-1.5 rounded-md mb-7 animate-fade-up" data-testid="hero-eyebrow">
              <Cpu className="w-3 h-3" /> FAMILY-OWNED | SINCE 1994
            </div>
            <RotatingHeadline />
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-foreground/70 max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
              32 years of solar PV, ground-mount arrays, Kohler generators and electrical installations across Indiana and Illinois - engineered for your site, your bill, your budget.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/quote" className="group inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow hover:-translate-y-0.5 transition focus-ring" data-testid="hero-cta-primary">
                Get my free estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition focus-ring" data-testid="hero-cta-book">
                Book Online
              </a>
              <Link href="/tools/calculator" className="inline-flex items-center gap-2 text-foreground/70 px-2 py-4 text-sm font-bold hover:text-primary transition focus-ring" data-testid="hero-cta-secondary">
                Savings calculator ->
              </Link>
            </div>

            {/* Roof / Ground / Pole capability strip */}
            <div className="mt-10 grid grid-cols-3 gap-3 max-w-md animate-fade-up" style={{ animationDelay: "0.3s" }} data-testid="hero-capability">
              {[
                { l: "Roof Mount", s: "Asphalt | metal | tile" },
                { l: "Ground Mount", s: "Field | yard | ag" },
                { l: "Pole Mount", s: "Sun-tracking | remote" },
              ].map((c) => (
                <div key={c.l} className="rounded-md border border-border bg-card/60 backdrop-blur p-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-primary">{c.l}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.s}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
              {["NABCEP", "BBB A+", "Google 5*", "Indiana Solar Coalition", "Licensed & Insured"].map((b) => (
                <span key={b} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> {b}</span>
              ))}
            </div>
          </div>

          {/* Right: ground-mount imagery card */}
          <div className="lg:col-span-5 relative animate-fade-up" style={{ animationDelay: "0.2s" }} data-testid="hero-image-card">
            <div className="relative rounded-xl overflow-hidden border border-border shadow-ambient-lg aspect-[4/5] bg-card">
              <Image src={HERO_IMG} alt="Ground-mounted solar array in a rural Indiana field" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md bg-background/85 backdrop-blur border border-border px-4 py-3">
                <Mountain className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary">// GROUND MOUNT</div>
                  <div className="text-xs text-foreground/80 truncate">Rural Indiana ag site | 12.8 kW</div>
                </div>
              </div>
            </div>
            {/* Decorative second card behind */}
            <div className="hidden lg:block absolute -top-6 -right-6 w-32 h-40 rounded-xl overflow-hidden border border-border shadow-ambient -z-10 rotate-6">
              <Image src={ROOF_IMG} alt="Rooftop solar install" fill className="object-cover" sizes="128px" />
            </div>
          </div>
        </div>
      </section>

      {/* Utility Cost Escalation — dark "what doing nothing costs" module */}
      <UtilityCostProjection />

      {/* Counters */}
      <section className="py-16 md:py-24 border-b border-border bg-card/50" data-testid="counters-section">
        <div className="container mx-auto container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { label: "Homes & sites powered", value: 1247, suffix: "+" },
              { label: "Customer savings", value: 24, prefix: "$", suffix: "M+" },
              { label: "Satisfaction", value: 98, suffix: "%" },
              { label: "Years experience", value: 32, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left p-4 md:p-6 border-l-2 border-primary/50" data-testid={`counter-${i}`}>
                <div className="font-heading text-4xl md:text-6xl font-black text-primary leading-none">
                  <CountUp to={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </div>
                <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.22em] font-mono text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ManufacturerLogos />

      {/* Roof vs Ground feature strip */}
      <section className="py-20 md:py-28" data-testid="roof-ground-section">
        <div className="container mx-auto container-px">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// MOUNTING OPTIONS</div>
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">
                Wherever the sun lands, <span className="text-primary">we build there.</span>
              </h2>
              <p className="mt-5 text-foreground/70 text-lg leading-relaxed">
                Plenty of customers come to us thinking solar = roof only. The truth is roughly half of our installs are <strong>ground mounts</strong> - better orientation, easier maintenance, no roof penetrations, and often higher annual output.
              </p>
              <ul className="mt-6 space-y-3 text-foreground/80">
                {[
                  "Optimal tilt & azimuth - no compromise with your roof shape",
                  "Easier service access for cleaning and repairs",
                  "Great for rural lots, farms and homes with shaded roofs",
                  "Sun-tracking pole mounts for premium output where space allows",
                ].map((line, i) => (
                  <li key={i} className="flex items-start gap-3" data-testid={`gm-bullet-${i}`}>
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <Link href="/quote" className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring" data-testid="ground-cta">
                Tell us about your site <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4" data-testid="roof-ground-gallery">
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-ambient">
                <Image src={HERO_IMG} alt="Ground-mount solar array" fill className="object-cover" sizes="(max-width: 640px) 100vw, 35vw" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/90 border border-border text-[10px] uppercase tracking-[0.22em] font-mono text-primary">GROUND MOUNT</div>
              </div>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-border shadow-ambient sm:mt-12">
                <Image src={ROOF_IMG} alt="Rooftop solar install" fill className="object-cover" sizes="(max-width: 640px) 100vw, 35vw" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-background/90 border border-border text-[10px] uppercase tracking-[0.22em] font-mono text-primary">ROOF MOUNT</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="py-20 md:py-28 bg-card/40 border-y border-border" data-testid="services-section">
        <div className="container mx-auto container-px">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end mb-12">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// WHAT WE INSTALL</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-balance">From a single panel to a fully off-grid farm.</h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="text-foreground/70 text-lg leading-relaxed">Every install includes a free site assessment, custom design, and lifetime support from the team that built it.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="group bg-card rounded-lg p-7 border border-border hover:border-primary hover:shadow-green-glow transition" data-testid={`service-card-${i}`}>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="font-heading text-xl font-bold">{s.title}</div>
                <p className="mt-2 text-foreground/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 relative rounded-xl overflow-hidden border border-border shadow-ambient-lg" data-testid="services-cta-banner">
            <Image src={TECH_IMG} alt="Accutek technician installing solar panels" width={1400} height={600} className="object-cover w-full h-[280px] md:h-[360px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
            <div className="absolute inset-0 grid md:grid-cols-2 items-center container-px">
              <div className="py-10">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// FREE | NO PRESSURE</div>
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-balance">Tell us about your site - we'll tell you what's possible.</h3>
                <p className="mt-3 text-foreground/75 max-w-md">Six quick questions, a real 25-year estimate, and a free site visit on the calendar.</p>
                <div className="mt-6"><HCPBookOnline variant="primary" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ManufacturersStrip />
      <ServiceAreaTeaser />
      <Testimonials />
      <HCPReviews />
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden" data-testid="final-cta-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">// NO-PRESSURE CONSULTATION</div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-balance">
            Ready to make your meter <span className="text-primary">spin backwards?</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">Free estimate, custom design, roof or ground - your call.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="final-cta-quote">
              Get free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring" data-testid="final-cta-book">
              Book Online
            </a>
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold focus-ring hover:border-primary transition">
              <ShieldCheck className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
