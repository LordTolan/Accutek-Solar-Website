import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Sun, 
  Mountain, 
  Building2, 
  BatteryCharging, 
  Wrench, 
  Lightbulb, 
  BatteryMedium, 
  Flame, 
  Zap, 
  Activity,
  ShieldCheck,
  CalendarClock,
  Phone
} from "lucide-react";
import ManufacturersStrip from "@/components/ManufacturersStrip";
import { SERVICES_DATA } from "@/lib/services-data";
import { HCP_BOOK_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solar & Electrical Services | Accutek Solar",
  description:
    "Explore Accutek Solar's full range of services: Residential Solar PV, Ground-Mount Arrays, Commercial & Ag Solar, Battery Storage, Standby Generators, Mini-Split HVAC, EV Chargers, Solar Repair, and Master Electrical Contracting.",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Solar & Electrical Services | Accutek Solar",
    description:
      "Roof and ground mount solar, battery storage, Kohler standby generators, mini-splits, EV charging, and master electrical. Family-owned since 1994 across Indiana and Illinois.",
  },
};

const ICON_MAP = {
  Sun,
  Mountain,
  Building2,
  BatteryCharging,
  Wrench,
  Lightbulb,
  BatteryMedium,
  Flame,
  Zap,
  Activity,
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card/30" data-testid="services-page">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 pointer-events-none" />
        <div className="relative container mx-auto container-px py-16 md:py-24 max-w-6xl">
          <div className="max-w-3xl">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// WHAT WE INSTALL &amp; SERVICE</div>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-balance leading-[1.05]">
              From a single panel to a fully off-grid farm.
            </h1>
            <p className="mt-5 text-foreground/75 text-lg md:text-xl leading-relaxed font-medium">
              Rooftop solar, heavy-duty ground mounts, lithium battery storage, standby generators, mini-splits, and master-level electrical craftsmanship — custom designed and backed by 32 years of family-owned field experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-3.5 font-bold uppercase tracking-wider text-xs hover:shadow-green-glow transition focus-ring"
                data-testid="services-hero-cta"
              >
                Get Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={HCP_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-3.5 font-bold uppercase tracking-wider text-xs hover:border-primary transition focus-ring"
                data-testid="services-hero-book"
              >
                <CalendarClock className="w-4 h-4" /> Book Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24" data-testid="services-grid-section">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-2">
                // COMPREHENSIVE ENERGY SOLUTIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold">
                Select a service to view details &amp; field photos
              </h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground md:text-right">
              Click any service card for equipment specs, rundown, and photos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.map((s, i) => {
              const IconComp = ICON_MAP[s.iconName] || Zap;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-card rounded-xl p-7 border border-border hover:border-primary hover:shadow-green-glow transition focus-ring flex flex-col justify-between"
                  data-testid={`service-card-${i}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary grid place-items-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                        <IconComp className="w-6 h-6" strokeWidth={2} />
                      </div>
                      {s.badge && (
                        <span className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border group-hover:border-primary/40 group-hover:text-primary transition-colors">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <div className="font-heading text-xl font-bold group-hover:text-primary transition-colors">
                      {s.title}
                    </div>
                    <p className="mt-2.5 text-foreground/70 text-sm leading-relaxed">
                      {s.shortDesc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                    <span>View Service Rundown</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Value Props Strip */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 p-8 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-base">Master Electrician Owned</div>
                <p className="mt-1 text-xs text-foreground/65 leading-relaxed">32 years of electrical and solar contracting across 17 counties in IN &amp; IL.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-base">Roof &amp; Ground Mount Experts</div>
                <p className="mt-1 text-xs text-foreground/65 leading-relaxed">Roughly half our systems are ground mounts engineered for optimal Midwestern harvest.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="font-heading font-bold text-base">Multi-Brand Service &amp; Repair</div>
                <p className="mt-1 text-xs text-foreground/65 leading-relaxed">We service systems originally built by other contractors who are no longer around.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ManufacturersStrip />

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-border" data-testid="services-cta-section">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">
            // FREE | NO PRESSURE | LIFETIME SUPPORT
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-balance">
            Ready to design the right system for <span className="text-primary">your property?</span>
          </h2>
          <p className="mt-4 text-foreground/70 text-lg">
            Free site assessment, custom engineering, roof or ground mount — your choice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring"
              data-testid="services-cta"
            >
              Get Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={HCP_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring"
              data-testid="services-book"
            >
              <CalendarClock className="w-4 h-4" /> Book Online
            </a>
            <a
              href="tel:+18128787343"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold focus-ring hover:border-primary transition"
              data-testid="services-call"
            >
              <Phone className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
