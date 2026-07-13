import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sun, Mountain, Building2, BatteryCharging, Wrench, LightbulbIcon } from "lucide-react";
import ManufacturersStrip from "@/components/ManufacturersStrip";

export const metadata: Metadata = {
  title: "Solar & Electrical Services",
  description:
    "Residential solar PV, ground-mount arrays, commercial & ag solar, Kohler generators, and full electrical from Accutek Solar. Free estimates for Indiana and Illinois.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Solar & Electrical Services | Accutek Solar",
    description:
      "Roof, ground, or pole mount solar plus generators and electrical. Custom systems for Indiana and Illinois homeowners since 1994.",
  },
};

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems sized for your home - roof, ground or pole mount." },
  { icon: Mountain, title: "Ground-Mount Arrays", desc: "Field, yard and ag-site installs. Better tilt, easier service, no roof penetrations." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom systems for businesses, farms and ag operations - USDA REAP-grant eligible." },
  { icon: BatteryCharging, title: "Kohler Backup Generators", desc: "Authorized Kohler installer - automatic standby power that's ready 24 / 7." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "32 years of full-service electrical from a licensed, insured team." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting and live energy monitoring to lower your usage." },
];

export default function ServicesPage() {
  return (
    <section className="py-16 md:py-24" data-testid="services-page">
      <div className="container mx-auto container-px max-w-6x">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// WHAT WE DO</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">From a single panel to a fully off-grid farm.</h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Roof, ground or pole mount. Solar PV, Kohler generators, and full electrical - engineered for your site.
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="bg-card rounded-lg p-7 border border-border hover:border-primary hover:shadow-green-glow transition" data-testid={`service-card-${i}`}>
              <div className="w-12 h-12 rounded-md bg-primary/10 text-primary grid place-items-center mb-5"><s.icon className="w-6 h-6" /></div>
              <div className="font-heading text-xl font-bold">{s.title}</div>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring" data-testid="services-cta">
            Get my free estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <ManufacturersStrip />
    </section>
  );
}
