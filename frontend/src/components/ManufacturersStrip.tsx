import Link from "next/link";
import BrandCard, { type BrandCardData } from "@/components/BrandCard";

const INSTALL = "Install & service";

// Tesla: Accutek holds a tech ID. Do not invent that number, and do not print an unfinished note on the card.
const MANUFACTURERS: BrandCardData[] = [
  { slug: "sma", name: "SMA", category: "Solar Inverters", url: "https://www.sma-america.com", label: INSTALL },
  { slug: "schneider-electric", name: "Schneider Electric", category: "Energy Management", url: "https://www.se.com", label: INSTALL },
  { slug: "enphase", name: "Enphase", category: "Microinverters", url: "https://enphase.com", label: INSTALL },
  { slug: "solaredge", name: "SolarEdge", category: "Optimizers / Inverters", url: "https://www.solaredge.com", label: INSTALL },
  { slug: "boviet", name: "Boviet Solar", category: "Solar Panels", logo: "/manufacturers/boviet.png", url: "https://bovietsolar.com", label: INSTALL },
  { slug: "q-cells", name: "Q CELLS", category: "Solar Panels", url: "https://www.qcells.com", label: INSTALL },
  { slug: "sol-ark", name: "Sol-Ark", category: "Hybrid Inverters", logo: "/manufacturers/sol-ark.png", url: "https://www.sol-ark.com", label: INSTALL },
  { slug: "victron", name: "Victron Energy", category: "Energy Systems", logo: "/manufacturers/victron.svg", url: "https://www.victronenergy.com", label: INSTALL },
  { slug: "outback", name: "OutBack Power", category: "Off-Grid & Storage", logo: "/manufacturers/outback.png", url: "https://outbackpower.com", label: INSTALL },
  { slug: "solis", name: "Solis", category: "String Inverters", logo: "/manufacturers/solis.png", url: "https://www.solisinverters.com/us/", label: INSTALL },
  { slug: "fronius", name: "Fronius", category: "Grid-Tie Inverters", logo: "/manufacturers/fronius.webp", url: "https://www.fronius.com/en-us/usa/solar-energy", label: INSTALL },
  { slug: "fujitsu", name: "Fujitsu", category: "Mini-Split HVAC", url: "https://www.fujitsugeneral.com", label: INSTALL },
  { slug: "fortress-power", name: "Fortress Power", category: "Battery Storage", url: "https://www.fortresspower.com", label: INSTALL },
  { slug: "homegrid", name: "HomeGrid", category: "Battery Storage", url: "https://www.homegridenergy.com", label: INSTALL },
  { slug: "emporia", name: "Emporia Energy", category: "Energy Monitoring", url: "https://www.emporiaenergy.com", label: INSTALL },
  { slug: "eg4", name: "EG4", category: "Inverters / Storage", url: "https://eg4electronics.com", label: INSTALL },
  { slug: "midnite-solar", name: "MidNite Solar", category: "Charge Controllers", url: "https://www.midnitesolar.com", label: INSTALL },
  { slug: "tesla-powerwall", name: "Tesla Powerwall", category: "Battery Storage", url: "https://www.tesla.com/powerwall", label: INSTALL },
  { slug: "generac-pwrcell", name: "Generac PWRcell", category: "Battery Storage", url: "https://www.generac.com", label: INSTALL },
  { slug: "kohler", name: "Kohler", category: "Backup Generators", url: "https://www.kohlerpower.com", label: "Authorized installer" },
  { slug: "generac", name: "Generac", category: "Standby Generators", url: "https://www.generac.com/all-products/generators/home-backup-generators", label: "Service Only" },
  { slug: "cummins", name: "Cummins", category: "Standby Generators", url: "https://www.cummins.com/generators", label: "Service Only" },
];

export default function ManufacturersStrip() {
  return (
    <section
      className="py-20 md:py-28 border-y border-border bg-card/30"
      data-testid="manufacturers-section"
    >
      <div className="container mx-auto container-px max-w-7xl">
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
              site, load, and goals — not whatever&apos;s cheapest or easiest to
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {MANUFACTURERS.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} testId={`manufacturer-${brand.slug}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
