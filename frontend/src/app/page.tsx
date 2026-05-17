import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sun, Zap, Wrench, BatteryCharging, LightbulbIcon, Building2, ShieldCheck, Star } from "lucide-react";
import CountUp from "@/components/CountUp";
import ServiceAreaTeaser from "@/components/ServiceAreaTeaser";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const HERO_IMG = "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const TECH_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems sized for your home." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom-built systems for businesses, farms and ag operations." },
  { icon: BatteryCharging, title: "Kohler Generators", desc: "Authorized Kohler installer — backup power that's ready 24/7." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "Licensed electricians with 32 years of service." },
  { icon: Zap, title: "Solar Thermal", desc: "Sun-heated water systems that cut your hot water bill." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting + live energy monitoring." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden grain" data-testid="hero-section">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="Solar panels at golden hour over a rural Indiana home" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/10" />
        </div>
        <div className="relative container mx-auto container-px py-24 md:py-36 lg:py-44 max-w-5xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-primary font-bold bg-primary/15 backdrop-blur px-4 py-2 rounded-full mb-6 animate-fade-up" data-testid="hero-eyebrow">
            <ShieldCheck className="w-3.5 h-3.5" /> Family-owned · Since 1994
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-secondary-foreground leading-[1.02] text-balance animate-fade-up" data-testid="hero-title">
            The future of energy<br/>is <span className="text-primary">already on your roof.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-secondary-foreground/85 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            32 years of solar PV, Kohler generator and electrical installations across Indiana and Illinois — designed for your roof, your bill, your budget.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/quote" className="group inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 text-base font-bold shadow-ambient-lg hover:-translate-y-0.5 transition focus-ring" data-testid="hero-cta-primary">
              Get my free estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link href="/tools/calculator" className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur text-secondary-foreground border border-white/20 px-7 py-4 text-base font-bold hover:bg-white/15 transition focus-ring" data-testid="hero-cta-secondary">
              Try the savings calculator
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-secondary-foreground/70">
            {["NABCEP", "BBB A+", "Google 5-star", "Indiana Solar Coalition", "Licensed & Insured"].map((b) => (
              <span key={b} className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-primary fill-primary" /> {b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Counters */}
      <section className="py-16 md:py-24 bg-background border-b border-border/60" data-testid="counters-section">
        <div className="container mx-auto container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { label: "Homes powered", value: 1247, suffix: "+" },
              { label: "Customer savings", value: 24, prefix: "$", suffix: "M+" },
              { label: "Satisfaction", value: 98, suffix: "%" },
              { label: "Years experience", value: 32, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left p-4 md:p-6" data-testid={`counter-${i}`}>
                <div className="font-heading text-4xl md:text-6xl font-black text-primary leading-none">
                  <CountUp to={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </div>
                <div className="mt-3 text-xs md:text-sm uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Bento */}
      <section className="py-20 md:py-28" data-testid="services-section">
        <div className="container mx-auto container-px">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end mb-12">
            <div className="md:col-span-7">
              <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">What we install</div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-balance">From a single panel to a fully off-grid farm.</h2>
            </div>
            <div className="md:col-span-5 md:text-right">
              <p className="text-foreground/70 text-lg leading-relaxed">Every install includes a free site assessment, custom design, and lifetime support from the team that built it.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="group bg-card rounded-2xl p-7 border border-border/60 hover:border-primary/60 hover:shadow-ambient-lg transition" data-testid={`service-card-${i}`}>
                <div className="w-12 h-12 rounded-xl bg-primary/15 text-foreground grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="font-heading text-xl font-bold">{s.title}</div>
                <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 relative rounded-3xl overflow-hidden shadow-ambient-lg" data-testid="services-cta-banner">
            <Image src={TECH_IMG} alt="Accutek technician installing solar panels" width={1400} height={600} className="object-cover w-full h-[280px] md:h-[360px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/30" />
            <div className="absolute inset-0 grid md:grid-cols-2 items-center container-px">
              <div className="text-secondary-foreground py-10">
                <div className="text-xs uppercase tracking-[0.2em] text-primary mb-3">Free, no pressure</div>
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-balance">Tell us about your roof — we'll tell you what's possible.</h3>
                <p className="mt-3 text-secondary-foreground/80 max-w-md">3 quick questions and a real estimate in under 60 seconds.</p>
                <Link href="/quote" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold focus-ring" data-testid="services-banner-cta">
                  Start my quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceAreaTeaser />
      <Testimonials />
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary" data-testid="final-cta-section">
        <div className="container mx-auto container-px text-center max-w-3xl">
          <div className="text-xs uppercase tracking-[0.25em] text-primary-foreground/80 mb-3">No-pressure consultation</div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-primary-foreground text-balance">
            Ready to make your meter spin backwards?
          </h2>
          <p className="mt-5 text-primary-foreground/80 text-lg">Free estimate, custom design, financing options. Call us or start online.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-secondary text-secondary-foreground px-7 py-4 font-bold focus-ring" data-testid="final-cta-quote">
              Get free estimate
            </Link>
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground px-7 py-4 font-bold focus-ring" data-testid="final-cta-call">
              Call (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
