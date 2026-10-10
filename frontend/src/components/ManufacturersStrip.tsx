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
  url: string;
  logoSrc?: string;
};

const MANUFACTURERS: Manufacturer[] = [
  {
    name: "Sol-Ark",
    tagline: "Hybrid inverters & all-in-one energy systems",
    category: "Inverters / Storage",
    color: "#E85A1B",
    url: "https://www.sol-ark.com",
  },
  {
    name: "Victron Energy",
    tagline: "Off-grid & backup power electronics",
    category: "Inverters / Chargers",
    color: "#005B9A",
    url: "https://www.victronenergy.com",
  },
  {
    name: "OutBack Power",
    tagline: "Proven off-grid & battery-based inverters",
    category: "Inverters / Charge Controllers",
    color: "#F26522",
    url: "https://outbackpower.com",
  },
  {
    name: "Solis",
    tagline: "String & hybrid PV inverters",
    category: "Solar Inverters",
    color: "#1A6D37",
    url: "https://www.solisinverters.com/us/",
  },
  {
    name: "Fronius",
    tagline: "Premium grid-tie inverters & monitoring",
    category: "Solar Inverters",
    color: "#EB0000",
    url: "https://www.fronius.com/en-us/usa/solar-energy",
  },
  {
    name: "Kohler",
    tagline: "Automatic standby generators — authorized installer",
    category: "Backup Generators",
    color: "#005DAA",
    url: "https://www.kohlerpower.com",
  },
  {
    name: "Generac PWRcell",
    tagline: "Whole-home battery storage & backup systems",
    category: "Battery Storage",
    color: "#F7941D",
    url: "https://www.generac.com",
  },
  {
    name: "Schneider Electric",
    tagline: "Energy management, inverters & load centers",
    category: "Energy Management",
    color: "#3DCD58",
    url: "https://www.se.com",
  },
  {
    name: "Emporia Energy",
    tagline: "Real-time energy monitoring & smart EV charging",
    category: "Energy Monitoring",
    color: "#6C3FC5",
    url: "https://www.emporiaenergy.com",
  },
  {
    name: "EG4",
    tagline: "Hybrid inverters & rack batteries",
    category: "Inverters / Storage",
    color: "#E41E26",
    url: "https://eg4electronics.com",
  },
  {
    name: "Q CELLS",
    tagline: "Residential & commercial solar panels",
    category: "Solar Panels",
    color: "#009FE3",
    url: "https://www.qcells.com",
  },
  {
    name: "MidNite Solar",
    tagline: "Charge controllers & off-grid BOS",
    category: "Charge Controllers / BOS",
    color: "#B30000",
    url: "https://www.midnitesolar.com",
  },
  {
    name: "Enphase",
    tagline: "Microinverters, IQ Battery & monitoring",
    category: "Microinverters / Storage",
    color: "#FF5E00",
    url: "https://enphase.com",
  },
  {
    name: "SolarEdge",
    tagline: "Power optimizers, inverters & home backup",
    category: "Optimizers / Inverters",
    color: "#ED1C24",
    url: "https://www.solaredge.com",
  },
  {
    name: "SMA",
    tagline: "String inverters (Sunny Boy / Sunny Island)",
    category: "Solar Inverters",
    color: "#F9BA00",
    url: "https://www.sma-america.com",
  },
  {
    name: "Cummins",
    tagline: "Standby generators & backup power systems",
    category: "Backup Generators",
    color: "#D0021B",
    url: "https://www.cummins.com/generators",
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
            <a
              key={m.name}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.name} — ${m.category}`}
              className="group relative bg-card rounded-xl border border-border hover:border-primary hover:shadow-green-glow transition-all duration-200 overflow-hidden flex flex-col justify-between focus-ring"
              data-testid={`manufacturer-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div>
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
              </div>

              {/* Verified installer badge */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.18em] font-mono text-primary">
                  <ShieldCheck className="w-3 h-3" />
                  Installed &amp; Serviced
                </div>
              </div>
            </a>
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
