"use client";

import Image from "next/image";
import Link from "next/link";

const MANUFACTURERS = [
  {
    slug: "sol-ark",
    name: "Sol-Ark",
    category: "Hybrid Inverters",
    logo: "/manufacturers/sol-ark.png",
    url: "https://www.sol-ark.com",
  },
  {
    slug: "victron",
    name: "Victron Energy",
    category: "Energy Systems",
    logo: "/manufacturers/victron.svg",
    url: "https://www.victronenergy.com",
  },
  {
    slug: "outback",
    name: "OutBack Power",
    category: "Off-Grid & Storage",
    logo: "/manufacturers/outback.png",
    url: "https://outbackpower.com",
  },
  {
    slug: "solis",
    name: "Solis",
    category: "String Inverters",
    logo: "/manufacturers/solis.png",
    url: "https://www.solisinverters.com/us/",
  },
  {
    slug: "fronius",
    name: "Fronius",
    category: "Grid-Tie Inverters",
    logo: "/manufacturers/fronius.webp",
    url: "https://www.fronius.com/en-us/usa/solar-energy",
  },
];

export default function ManufacturerLogos() {
  return (
    <section
      className="py-16 md:py-20 border-b border-border bg-card/40"
      data-testid="manufacturer-logos-section"
    >
      <div className="container mx-auto container-px max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">
            // EQUIPMENT WE INSTALL &amp; SERVICE
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-balance">
            Industry-leading brands. Expert installation.
          </h2>
          <p className="mt-3 text-foreground/65 text-base max-w-xl mx-auto leading-relaxed">
            We work with the manufacturers that field technicians trust — not whoever has the best dealer margin.
          </p>
        </div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {MANUFACTURERS.map((mfr) => (
            <a
              key={mfr.slug}
              href={mfr.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${mfr.name} — ${mfr.category}`}
              className="group flex flex-col items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 hover:border-primary hover:shadow-green-glow transition focus-ring"
              data-testid={`mfr-card-${mfr.slug}`}
            >
              {/* Logo */}
              <div className="relative w-full h-12 flex items-center justify-center">
                <Image
                  src={mfr.logo}
                  alt={`${mfr.name} logo`}
                  width={140}
                  height={48}
                  className="object-contain max-h-10 w-auto opacity-75 group-hover:opacity-100 transition"
                  unoptimized
                />
              </div>

              {/* Name + category */}
              <div className="text-center">
                <div className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition">
                  {mfr.name}
                </div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] font-mono text-muted-foreground">
                  {mfr.category}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-muted-foreground font-mono">
          We also service existing systems built on SMA, Schneider Electric, Enphase, SolarEdge and other brands.{" "}
          <Link href="/contact" className="text-primary hover:underline focus-ring">
            Ask about your system →
          </Link>
        </p>
      </div>
    </section>
  );
}
