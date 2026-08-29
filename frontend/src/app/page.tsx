import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap, Wrench, BatteryCharging, LightbulbIcon, Building2, ShieldCheck, Sun, Mountain, Cpu, CheckCircle2 } from "lucide-react";
import DarknessToLightHero from "@/components/DarknessToLightHero";
import OriginalHomeHero from "@/components/OriginalHomeHero";
import { ACTIVE_HOME_HERO } from "@/config/homeHero";
import CountUp from "@/components/CountUp";
import HCPBookOnline from "@/components/HCPBookOnline";
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
const ROOF_IMG = "https://hcp-priceboo-vdubc3b2.manus.space/manus-storage/accutek-residential-roof-mount_b9e23d11.jpg";
const TECH_IMG = "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400";

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems - roof, ground mount, or pole mount." },
  { icon: Mountain, title: "Ground-Mount Arrays", desc: "Field & yard installs sized for higher-output sites - ideal for ag, rural and larger lots." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom systems for businesses, farms and ag operations - REAP-grant eligible." },
  { icon: BatteryCharging, title: "Kohler Generators", desc: "Authorized Kohler installer - 24 / 7 automatic backup power." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "Licensed electricians with 32 years of full-service experience." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting + live energy monitoring to drive your usage down." },
];

export default function HomePage() {
  return (
    <>
      {ACTIVE_HOME_HERO === "darkness-to-light" ? <DarknessToLightHero /> : <OriginalHomeHero />}

      {/* Utility Cost Escalation — dark "what doing nothing costs" module */}
      <UtilityCostProjection />

      {/* Counters */}
      <section className="py-16 md:py-24 border-b border-border bg-card/50" data-testid="counters-section">
        <div className="container mx-auto container-px">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { label: "Homes & sites powered", value: 1400, suffix: "+" },
              { label: "Customer savings", value: 25, prefix: "$", suffix: "M+" },
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


      {/* Latest from the Blog */}
      <section className="py-20 md:py-28 bg-muted/10" data-testid="home-blog-section">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// LATEST INSIGHTS</div>
              <h2 className="text-3xl md:text-5xl font-extrabold">The <span className="text-primary">Solar Dispatch.</span></h2>
            </div>
            <Link href="/blog" className="text-sm font-bold text-primary hover:underline">
              View all articles ->
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/blog/the-rate-hike-nobody-voted-for-why-indiana-is-fighting-back-2026-07-13" className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
              <div className="relative aspect-video">
                <Image src="https://images.unsplash.com/photo-1509391366360-2e959784a276" alt="Solar array" fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-wider font-mono text-primary mb-2">Big Utility Wars | July 13, 2026</div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">The Rate Hike Nobody Voted For: Why Indiana is Fighting Back</h3>
                <p className="mt-2 text-sm text-foreground/70">Big Utility is winning because you’re letting them. Here is the Accutek plan to take your power back.</p>
              </div>
            </Link>
            <Link href="/blog/how-to-pay-off-your-solar-loan-in-under-10-years-2026-07-06" className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
              <div className="relative aspect-video">
                <Image src="https://images.unsplash.com/photo-1509391366360-2e959784a276" alt="Accutek site" fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-wider font-mono text-primary mb-2">Energy ROI | July 6, 2026</div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">How to Pay Off Your Solar Loan in Under 10 Years</h3>
                <p className="mt-2 text-sm text-foreground/70">Professional solar insights on maximizing your investment and reaching zero-bill status faster.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

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
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold focus-ring hover:border-primary transition" data-testid="final-cta-call">
              <ShieldCheck className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
