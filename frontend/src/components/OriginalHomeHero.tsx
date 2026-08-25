import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Cpu, Mountain } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";
import HeroVideo from "@/components/HeroVideo";
import RotatingHeadline from "@/components/RotatingHeadline";

const HERO_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";
const ROOF_IMG = "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200";

/** The original light technical homepage hero, retained for immediate rollback. */
export default function OriginalHomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border" data-testid="original-home-hero">
      <HeroVideo />
      <div className="relative container mx-auto grid items-center gap-10 py-20 container-px md:py-28 lg:grid-cols-12 lg:gap-14 lg:py-32">
        <div className="max-w-2xl lg:col-span-7">
          <div className="mb-7 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary animate-fade-up" data-testid="hero-eyebrow">
            <Cpu className="h-3 w-3" /> FAMILY-OWNED | SINCE 1994
          </div>
          <RotatingHeadline />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 animate-fade-up md:mt-8 md:text-xl" style={{ animationDelay: "0.1s" }}>
            32 years of solar PV, ground-mount arrays, Kohler generators and electrical installations across West Central Indiana and East Central Illinois — engineered for your site, your bill, your budget.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Link href="/quote" className="group inline-flex items-center gap-2 rounded-md bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:-translate-y-0.5 hover:shadow-green-glow focus-ring" data-testid="hero-cta-primary">
              Get my free estimate <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-7 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition hover:border-primary hover:text-primary focus-ring" data-testid="hero-cta-book">
              Book Online
            </a>
            <Link href="/tools/calculator" className="inline-flex items-center gap-2 px-2 py-4 text-sm font-bold text-foreground/70 transition hover:text-primary focus-ring" data-testid="hero-cta-secondary">
              Savings calculator →
            </Link>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }} data-testid="hero-capability">
            {[
              { label: "Roof Mount", detail: "Asphalt | metal | tile" },
              { label: "Ground Mount", detail: "Field | yard | ag" },
              { label: "Pole Mount", detail: "Sun-tracking | remote" },
            ].map((capability) => (
              <div key={capability.label} className="rounded-md border border-border bg-card/60 p-3 backdrop-blur">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{capability.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{capability.detail}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {["NABCEP", "BBB A+", "Google 5*", "Indiana Solar Coalition", "Licensed & Insured"].map((badge) => (
              <span key={badge} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-primary" /> {badge}</span>
            ))}
          </div>
        </div>
        <div className="relative animate-fade-up lg:col-span-5" style={{ animationDelay: "0.2s" }} data-testid="hero-image-card">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card shadow-ambient-lg">
            <Image src={HERO_IMG} alt="Ground-mounted solar array in a rural Indiana field" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-md border border-border bg-background/85 px-4 py-3 backdrop-blur">
              <Mountain className="h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">// GROUND MOUNT</div>
                <div className="truncate text-xs text-foreground/80">Rural Indiana ag site | 12.8 kW</div>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 -z-10 hidden h-40 w-32 rotate-6 overflow-hidden rounded-xl border border-border shadow-ambient lg:block">
            <Image src={ROOF_IMG} alt="Rooftop solar install" fill className="object-cover" sizes="128px" />
          </div>
        </div>
      </div>
    </section>
  );
}
