import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Wrench, BatteryCharging, LightbulbIcon, Building2, ShieldCheck, Sun, Cpu, AlertCircle } from "lucide-react";
import CountUp from "@/components/CountUp";
import HeroVideo from "@/components/HeroVideo";
import HCPBookOnline from "@/components/HCPBookOnline";
import ServiceAreaTeaser from "@/components/ServiceAreaTeaser";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

const TECH_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems sized for your home." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom-built systems for businesses, farms and ag operations." },
  { icon: BatteryCharging, title: "Kohler Generators", desc: "Authorized Kohler installer — 24/7 backup power." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "Licensed electricians with 32 years of service." },
  { icon: Zap, title: "Solar Thermal", desc: "Sun-heated water systems that cut your hot water bill." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting + live energy monitoring." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — Solar Wizard cinematic video bg */}
      <section className="relative overflow-hidden grain scanline min-h-[88vh] flex items-center" data-testid="hero-section">
        <HeroVideo />
        <div className="relative container mx-auto container-px py-24 md:py-32 max-w-5xl z-10">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-mono text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-md mb-7 animate-fade-up" data-testid="hero-eyebrow">
            <Cpu className="w-3 h-3" /> FAMILY-OWNED · SINCE 1994
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-black text-foreground leading-[1.02] text-balance animate-fade-up" data-testid="hero-title">
            The future of energy<br/>is <span className="text-primary text-glow">already on your roof.</span>
          </h1>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            32 years of solar PV, Kohler generator and electrical installations across Indiana and Illinois — engineered for your roof, your bill, your budget.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/quote" className="group inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring" data-testid="hero-cta-primary">
              Get my free estimate <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link href="/book" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/40 backdrop-blur text-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary transition focus-ring" data-testid="hero-cta-book">
              Book Online
            </Link>
            <Link href="/tools/calculator" className="inline-flex items-center gap-2 text-foreground/75 px-2 py-4 text-sm font-bold hover:text-primary transition focus-ring" data-testid="hero-cta-secondary">
              Try the savings calculator →
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.22em] font-mono text-foreground/55">
            {["NABCEP", "BBB A+", "Google 5★", "Indiana Solar Coalition", "Licensed & Insured"].map((b) => (
              <span key={b} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-primary" /> {b}</span>
            ))}
          </div>
        </div>

        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Counters */}
      <section className="py-16 md:py-24 border-b border-border" data-testid="counters-section">
        <div className="container mx-auto container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { label: "Homes powered", value: 1247, suffix: "+" },
              { label: "Customer savings", value: 24, prefix: "$", suffix: "M+" },
              { label: "Satisfaction", value: 98, suffix: "%" },
              { label: "Years experience", value: 32, suffix: "" },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left p-4 md:p-6 border-l-2 border-primary/40" data-testid={`counter-${i}`}>
                <div className="font-heading text-4xl md:text-6xl font-black text-primary leading-none text-glow">
                  <CountUp to={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                </div>
                <div className="mt-3 text-[10px] md:text-xs uppercase tracking-[0.22em] font-mono text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax-credit notice strip */}
      <section className="py-5 bg-secondary/30 border-b border-border" data-testid="credit-notice">
        <div className="container mx-auto container-px flex items-start md:items-center gap-3 text-sm">
          <AlertCircle className="w-4 h-4 text-primary mt-0.5 md:mt-0 shrink-0" />
          <span className="text-foreground/85">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mr-2">// HEADS UP</span>
            The 30% federal solar tax credit ended this year for new systems. Indiana net metering, Illinois Shines SREC, USDA REAP grants and utility rebates are still active — and equipment pricing is down. We'll walk you through today's real numbers.
          </span>
        </div>
      </section>

      {/* Services Bento */}
      <section className="py-20 md:py-28" data-testid="services-section">
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
              <div key={i} className="group bg-card rounded-md p-7 border border-border hover:border-primary hover:shadow-green-glow transition" data-testid={`service-card-${i}`}>
                <div className="w-12 h-12 rounded-md bg-primary/10 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <s.icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div className="font-heading text-xl font-bold">{s.title}</div>
                <p className="mt-2 text-foreground/65 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 relative rounded-lg overflow-hidden border border-border shadow-ambient-lg" data-testid="services-cta-banner">
            <Image src={TECH_IMG} alt="Accutek technician installing solar panels" width={1400} height={600} className="object-cover w-full h-[280px] md:h-[360px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
            <div className="absolute inset-0 grid md:grid-cols-2 items-center container-px">
              <div className="py-10">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// FREE · NO PRESSURE</div>
                <h3 className="font-heading text-3xl md:text-4xl font-extrabold text-balance">Tell us about your roof — we'll tell you what's possible.</h3>
                <p className="mt-3 text-foreground/75 max-w-md">Six quick questions, a real 25-year estimate, and a free site-visit booking.</p>
                <div className="mt-6"><HCPBookOnline variant="primary" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceAreaTeaser />
      <Testimonials />
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden" data-testid="final-cta-section">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 via-background to-background" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">// NO-PRESSURE CONSULTATION</div>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground text-balance">
            Ready to make your meter <span className="text-primary text-glow">spin backwards?</span>
          </h2>
          <p className="mt-5 text-foreground/70 text-lg">Free estimate, custom design, financing options.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="final-cta-quote">
              Get free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/book" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring" data-testid="final-cta-book">
              Book Online
            </Link>
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 text-foreground px-7 py-4 font-bold focus-ring hover:border-primary transition" data-testid="final-cta-call">
              <ShieldCheck className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
