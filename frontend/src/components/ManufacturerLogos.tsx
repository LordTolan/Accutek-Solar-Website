"use client";

import BrandCard, { type BrandCardData } from "@/components/BrandCard";

const INSTALL = "Install & service";

const MANUFACTURERS: BrandCardData[] = [
  { slug: "sol-ark", name: "Sol-Ark", category: "Hybrid Inverters", logo: "/manufacturers/sol-ark.png", url: "https://www.sol-ark.com", label: INSTALL },
  { slug: "victron", name: "Victron Energy", category: "Energy Systems", logo: "/manufacturers/victron.svg", url: "https://www.victronenergy.com", label: INSTALL },
  { slug: "outback", name: "OutBack Power", category: "Off-Grid & Storage", logo: "/manufacturers/outback.png", url: "https://outbackpower.com", label: INSTALL },
  { slug: "solis", name: "Solis", category: "String Inverters", logo: "/manufacturers/solis.png", url: "https://www.solisinverters.com/us/", label: INSTALL },
  { slug: "fronius", name: "Fronius", category: "Grid-Tie Inverters", logo: "/manufacturers/fronius.webp", url: "https://www.fronius.com/en-us/usa/solar-energy", label: INSTALL },
  { slug: "sma", name: "SMA", category: "Solar Inverters", url: "https://www.sma-america.com", label: INSTALL },
  { slug: "schneider-electric", name: "Schneider Electric", category: "Energy Management", url: "https://www.se.com", label: INSTALL },
  { slug: "enphase", name: "Enphase", category: "Microinverters", url: "https://enphase.com", label: INSTALL },
  { slug: "solaredge", name: "SolarEdge", category: "Optimizers / Inverters", url: "https://www.solaredge.com", label: INSTALL },
  { slug: "boviet", name: "Boviet Solar", category: "Solar Panels", logo: "/manufacturers/boviet.png", url: "https://bovietsolar.com", label: INSTALL },
  { slug: "q-cells", name: "Q CELLS", category: "Solar Panels", url: "https://www.qcells.com", label: INSTALL },
];

export default function ManufacturerLogos() {
  return (
    <section
      className="py-16 md:py-20 border-b border-border bg-card/40"
      data-testid="manufacturer-logos-section"
    >
      <div className="container mx-auto container-px max-w-7xl">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MANUFACTURERS.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} testId={`mfr-card-${brand.slug}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
