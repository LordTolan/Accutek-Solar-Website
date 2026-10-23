"use client";

import Image from "next/image";

type Brand = {
  slug: string;
  name: string;
  category: string;
  url: string;
  /** Official wordmark only. Missing logos use the name as the mark. */
  logo?: string;
  /** Visitor-facing status. Generac and Cummins generators are service only. */
  label: "Install and service" | "Service Only";
  /** Kohler is an authorized installer and still installs and services. */
  note?: string;
};

// Tesla: Accutek holds a tech ID. Do not invent that number, and do not print an unfinished note on the card.
const MANUFACTURERS: Brand[] = [
  { slug: "sol-ark", name: "Sol-Ark", category: "Hybrid Inverters", logo: "/manufacturers/sol-ark.png", url: "https://www.sol-ark.com", label: "Install and service" },
  { slug: "victron", name: "Victron Energy", category: "Energy Systems", logo: "/manufacturers/victron.svg", url: "https://www.victronenergy.com", label: "Install and service" },
  { slug: "outback", name: "OutBack Power", category: "Off-Grid & Storage", logo: "/manufacturers/outback.png", url: "https://outbackpower.com", label: "Install and service" },
  { slug: "solis", name: "Solis", category: "String Inverters", logo: "/manufacturers/solis.png", url: "https://www.solisinverters.com/us/", label: "Install and service" },
  { slug: "fronius", name: "Fronius", category: "Grid-Tie Inverters", logo: "/manufacturers/fronius.webp", url: "https://www.fronius.com/en-us/usa/solar-energy", label: "Install and service" },
  { slug: "fujitsu", name: "Fujitsu", category: "Mini-Split HVAC", url: "https://www.fujitsugeneral.com", label: "Install and service" },
  { slug: "fortress-power", name: "Fortress Power", category: "Battery Storage", url: "https://www.fortresspower.com", label: "Install and service" },
  { slug: "homegrid", name: "HomeGrid", category: "Battery Storage", url: "https://www.homegridenergy.com", label: "Install and service" },
  { slug: "schneider-electric", name: "Schneider Electric", category: "Energy Management", url: "https://www.se.com", label: "Install and service" },
  { slug: "emporia", name: "Emporia Energy", category: "Energy Monitoring", url: "https://www.emporiaenergy.com", label: "Install and service" },
  { slug: "eg4", name: "EG4", category: "Inverters / Storage", url: "https://eg4electronics.com", label: "Install and service" },
  { slug: "q-cells", name: "Q CELLS", category: "Solar Panels", url: "https://www.qcells.com", label: "Install and service" },
  { slug: "boviet", name: "Boviet Solar", category: "Solar Panels", logo: "/manufacturers/boviet.png", url: "https://bovietsolar.com", label: "Install and service" },
  { slug: "midnite-solar", name: "MidNite Solar", category: "Charge Controllers", url: "https://www.midnitesolar.com", label: "Install and service" },
  { slug: "enphase", name: "Enphase", category: "Microinverters", url: "https://enphase.com", label: "Install and service" },
  { slug: "solaredge", name: "SolarEdge", category: "Optimizers / Inverters", url: "https://www.solaredge.com", label: "Install and service" },
  { slug: "sma", name: "SMA", category: "Solar Inverters", url: "https://www.sma-america.com", label: "Install and service" },
  { slug: "tesla-powerwall", name: "Tesla Powerwall", category: "Battery Storage", url: "https://www.tesla.com/powerwall", label: "Install and service" },
  { slug: "generac-pwrcell", name: "Generac PWRcell", category: "Battery Storage", url: "https://www.generac.com", label: "Install and service" },
  { slug: "kohler", name: "Kohler", category: "Backup Generators", url: "https://www.kohlerpower.com", label: "Install and service", note: "Authorized installer" },
  { slug: "generac", name: "Generac", category: "Standby Generators", url: "https://www.generac.com/all-products/generators/home-backup-generators", label: "Service Only" },
  { slug: "cummins", name: "Cummins", category: "Standby Generators", url: "https://www.cummins.com/generators", label: "Service Only" },
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
          {MANUFACTURERS.map((mfr) => (
            <a
              key={mfr.slug}
              href={mfr.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${mfr.name} — ${mfr.category}. ${mfr.label}${mfr.note ? `. ${mfr.note}` : ""}`}
              className="group flex min-h-[12rem] flex-col items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary hover:shadow-green-glow transition focus-ring md:min-h-[14rem] md:p-6"
              data-testid={`mfr-card-${mfr.slug}`}
            >
              <div className="relative flex h-16 w-full items-center justify-center md:h-20">
                {mfr.logo ? (
                  <Image
                    src={mfr.logo}
                    alt={`${mfr.name} logo`}
                    width={240}
                    height={96}
                    className="object-contain max-h-14 md:max-h-16 max-w-full w-auto opacity-90 group-hover:opacity-100 transition"
                    unoptimized
                  />
                ) : (
                  <div className="font-heading text-xl md:text-2xl font-black leading-none text-center text-foreground/90 group-hover:text-primary transition">
                    {mfr.name}
                  </div>
                )}
              </div>

              <div className="text-center">
                {mfr.logo ? (
                  <div className="font-heading text-base md:text-lg font-bold text-foreground group-hover:text-primary transition">
                    {mfr.name}
                  </div>
                ) : null}
                <div className={`text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-mono text-muted-foreground ${mfr.logo ? "mt-1" : ""}`}>
                  {mfr.category}
                </div>
                <div
                  className={`mt-2 text-[10px] uppercase tracking-[0.16em] font-mono ${
                    mfr.label === "Service Only" ? "text-amber-700" : "text-primary"
                  }`}
                >
                  {mfr.label}
                </div>
                {mfr.note ? (
                  <div className="mt-1 text-[10px] uppercase tracking-[0.16em] font-mono text-muted-foreground">
                    {mfr.note}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
