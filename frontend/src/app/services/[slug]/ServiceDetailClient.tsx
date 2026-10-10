"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowLeft, 
  CalendarClock, 
  CheckCircle2, 
  Phone, 
  ShieldCheck, 
  Wrench, 
  Sun, 
  Mountain, 
  Building2, 
  BatteryCharging, 
  Lightbulb, 
  BatteryMedium, 
  Flame, 
  Zap, 
  Activity,
  Layers,
  Sparkles
} from "lucide-react";
import { ServiceItem } from "@/lib/services-data";
import { HCP_BOOK_URL } from "@/lib/utils";
import ManufacturersStrip from "@/components/ManufacturersStrip";

interface Props {
  service: ServiceItem;
  allServices: ServiceItem[];
}

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

export default function ServiceDetailClient({ service, allServices }: Props) {
  const IconComponent = ICON_MAP[service.iconName] || Zap;
  const otherServices = allServices.filter((s) => s.slug !== service.slug);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb / Top Bar */}
      <section className="border-b border-border bg-card/60">
        <div className="container mx-auto container-px py-4 max-w-6xl flex items-center justify-between text-xs font-mono">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition"
            data-testid="back-to-services"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all services
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
            <span>Accutek Solar</span>
            <span>/</span>
            <span className="text-primary font-bold">{service.title}</span>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-card/30" data-testid="service-hero">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40 pointer-events-none" />
        <div className="relative container mx-auto container-px py-16 md:py-24 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-mono border border-primary/40 bg-primary/10 text-primary mb-4">
                <IconComponent className="w-3.5 h-3.5" />
                <span>// {service.badge || "Accutek Service"}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-balance leading-[1.05]" data-testid="service-title">
                {service.title}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-foreground/80 leading-relaxed font-medium">
                {service.tagline}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-3.5 font-bold uppercase tracking-wider text-xs hover:shadow-green-glow transition focus-ring"
                  data-testid="service-cta-quote"
                >
                  Request a Free Estimate <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={HCP_BOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-3.5 font-bold uppercase tracking-wider text-xs hover:border-primary transition focus-ring"
                  data-testid="service-cta-book"
                >
                  <CalendarClock className="w-4 h-4" /> Book Online
                </a>
              </div>
            </div>

            {/* Featured Hero Photo */}
            <div className="lg:col-span-5">
              {service.photos.length > 0 && (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-ambient-lg group">
                  <Image
                    src={service.photos[0].src}
                    alt={service.photos[0].alt}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <div className="text-xs font-bold text-foreground">{service.photos[0].caption || service.photos[0].alt}</div>
                    {service.photos[0].location && (
                      <div className="text-[10px] uppercase tracking-wider font-mono text-primary mt-0.5">
                        {service.photos[0].location}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Service Rundown & Key Highlights */}
      <section className="py-16 md:py-24 border-b border-border" data-testid="service-rundown">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main Rundown Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-2">
                // SERVICE RUNDOWN
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-balance">
                Precision engineering, local craftsmanship.
              </h2>
              <div className="space-y-4 text-foreground/80 text-base md:text-lg leading-relaxed">
                {service.rundown.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Equipment Brands Mention */}
              {service.equipmentBrands && service.equipmentBrands.length > 0 && (
                <div className="mt-8 p-6 rounded-xl bg-card border border-border">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-primary" /> Supported Equipment &amp; Platforms
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.equipmentBrands.map((brand) => (
                      <span
                        key={brand}
                        className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs font-bold text-primary font-mono"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* What is Included / Key Highlights Card */}
            <div className="lg:col-span-5">
              <div className="bg-card rounded-2xl p-7 md:p-8 border border-border shadow-ambient sticky top-24">
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
                  // SCOPE &amp; SPECIFICATIONS
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-extrabold mb-6">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3.5">
                  {service.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                    <span>Backed by 32 years of electrical and solar experience.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Job Photos (Compliant with Terms §9) */}
      <section className="py-16 md:py-24 bg-card/40 border-b border-border" data-testid="service-photos">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-2">
                // FIELD DOCUMENTATION
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold">
                Real Equipment &amp; Field Installs
              </h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground md:text-right max-w-md">
              Equipment close-ups, balance of system (BOS) wiring, and hardware from Accutek job sites.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.photos.map((photo, i) => (
              <div
                key={i}
                className="group bg-card rounded-xl border border-border overflow-hidden shadow-ambient hover:border-primary transition"
                data-testid={`service-photo-${i}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-heading font-bold text-foreground">
                    {photo.caption || photo.alt}
                  </div>
                  {photo.location && (
                    <div className="text-[10px] uppercase tracking-wider font-mono text-primary mt-1">
                      {photo.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-background/60 border border-border flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-muted-foreground font-mono">
              Looking for more examples of our solar arrays, generators, and storage builds?
            </span>
            <Link
              href="/gallery"
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5 font-mono uppercase tracking-wider"
            >
              Browse Full Job Gallery <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Other Services Navigation Grid */}
      <section className="py-16 md:py-24 border-b border-border" data-testid="other-services">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-2">
                // EXPLORE MORE
              </div>
              <h2 className="text-3xl font-heading font-extrabold">Other Services We Offer</h2>
            </div>
            <Link
              href="/services"
              className="text-sm font-bold text-primary hover:underline inline-flex items-center gap-1.5"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherServices.slice(0, 3).map((item) => {
              const ItemIcon = ICON_MAP[item.iconName] || Wrench;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group block bg-card rounded-xl p-6 border border-border hover:border-primary hover:shadow-green-glow transition focus-ring"
                >
                  <div className="w-10 h-10 rounded-md bg-primary/10 text-primary grid place-items-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition">
                    <ItemIcon className="w-5 h-5" />
                  </div>
                  <div className="font-heading text-lg font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </div>
                  <p className="mt-2 text-foreground/65 text-xs leading-relaxed line-clamp-2">
                    {item.shortDesc}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary">
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ManufacturersStrip />

      {/* Final Action CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden" data-testid="service-final-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">
            // FREE SITE ASSESSMENT &amp; ESTIMATE
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-balance">
            Ready to get started with <span className="text-primary">{service.title}?</span>
          </h2>
          <p className="mt-4 text-foreground/70 text-lg">
            Tell us about your property and goals — we&apos;ll build a custom engineering estimate with no pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring"
              data-testid="service-final-cta-quote"
            >
              Get Free Estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={HCP_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring"
              data-testid="service-final-cta-book"
            >
              <CalendarClock className="w-4 h-4" /> Book Online
            </a>
            <a
              href="tel:+18128787343"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold focus-ring hover:border-primary transition"
              data-testid="service-final-cta-call"
            >
              <Phone className="w-4 h-4 text-primary" /> (812) 878-7343
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
