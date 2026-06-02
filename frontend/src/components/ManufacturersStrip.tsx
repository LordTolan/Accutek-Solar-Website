/**
 * ManufacturersStrip — Brand-partner logos row
 * Displays the equipment manufacturers Accutek Solar installs and services.
 * Drop into any page with: <ManufacturersStrip />
 */

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

type Manufacturer = {
  name: string;
  tagline: string;
  category: string;
  /** brand hex for the colored accent bar */
  color: string;
  logoSrc?: string;
};

const MANUFACTURERS: Manufacturer[] = [
  {
    name: "Sol-Ark",
    tagline: "Hybrid inverters & all-in-one energy systems",
    category: "Inverters / Storage",
    color: "#E85A1B",
  },
  {
    name: "Victron Energy",
    tagline: "Off-grid & backup power electronics",
    category: "Inverters / Chargers",
    color: "#005B9A",
  },
  {
    name: "Outback Power",
    tagline: "Proven off-grid & battery-based inverters",
    category: "Inverters / Charge Controllers",
    color: "#F26522",
  },
  {
    name: "Solis",
    tagline: "String & hybrid PV inverters",
    category: "Solar Inverters",
    color: "#1A6D37",
  },
  {
    name: "Fronius",
    tagline: "Premium grid-tie inverters & monitoring",
    category: "Solar Inverters",
    color: "#EB0000",
  },
  {
    name: "Kohler",
    tagline: "Automatic standby generators — authorized installer",
    category: "Backup Generators",
    color: "#005DAA",
  },
  {
    name: "Generac PWRcell",
    tagline: "Whole-home battery storage & backup systems",
    category: "Battery Storage",
    color: "#F7941D",
  },
  {
    name: "Schneider Electric",
    tagline: "Energy management, inverters & load centers",
    category: "Energy Management",
    color: "#3DCD58",
  },
];

export default function ManufacturersStrip() {
  return (
    <section
      className="py-20 md:py-28 border-y border-border bg-card/30"
      data-testid="manufacturers-section"
    >
      <div className="container mx-auto container-px">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">
              // TRUSTED EQUIPMENT
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-balance">
              We install and service{" "}
              <span className="text-primary">industry-leading brands.</span>
            </h2>
            <p className="mt-4 text-foreground/65 text-base md:text-lg max-w-xl leading-relaxed">
              Every system we design is built around the right equipment for your
              site, load, and goals — not whatever's cheapest or easiest to
              source.
            </p>
          </div>
          <Link
            href="/quote"
            className="shrink-0 inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow hover:-translate-y-0.5 transition focus-ring"
          >
            Get a free estimate
          </Link>
        </div>

        {/* Manufacturer cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {MANUFACTURERS.map((m) => (
            <div
              key={m.name}
              className="group relative bg-card rounded-xl border border-border hover:border-primary hover:shadow-green-glow transition-all duration-200 overflow-hidden"
              data-testid={`manufacturer-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Brand color accent bar */}
              <div
                className="h-1 w-full"
                style={{ backgroundColor: m.color }}
              />

              <div className="p-6">
                {/* Category pill */}
                <div className="inline-flex items-center text-[9px] uppercase tracking-[0.22em] font-mono text-muted-foreground bg-muted/60 border border-border px-2 py-1 rounded mb-4">
                  {m.category}
                </div>

                {/* Manufacturer name — large logotype-style treatment */}
                <div
                  className="font-heading text-2xl font-black leading-none mb-3 group-hover:text-primary transition-colors"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {m.name}
                </div>

                <p className="text-xs text-foreground/60 leading-relaxed">
                  {m.tagline}
                </p>
              </div>

              {/* Verified installer badge */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] font-mono text-primary">
                  <ShieldCheck className="w-3 h-3" />
                  Installed &amp; Serviced
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting footnote */}
        <p className="mt-8 text-xs text-muted-foreground text-center">
          We also service and troubleshoot systems built on Enphase, SolarEdge,
          SMA, Schneider Electric, and other platforms.{" "}
          <Link
            href="/quote"
            className="text-primary underline underline-offset-4 hover:no-underline"
          >
            Ask us about your existing system.
          </Link>
        </p>
      </div>
    </section>
  );
}
