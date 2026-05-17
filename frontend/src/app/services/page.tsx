import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sun, Building2, BatteryCharging, Wrench, Zap, LightbulbIcon } from "lucide-react";

export const metadata = { title: "Solar & Electrical Services" };

const SERVICES = [
  { icon: Sun, title: "Residential Solar PV", desc: "Grid-tied, hybrid and off-grid systems sized for your home's usage, roof and budget." },
  { icon: Building2, title: "Commercial & Ag Solar", desc: "Custom-built systems for businesses, farms and ag operations — REAP-grant eligible." },
  { icon: BatteryCharging, title: "Kohler Backup Generators", desc: "Authorized Kohler installer — automatic standby power that's ready 24/7." },
  { icon: Wrench, title: "Electrical Install & Repair", desc: "32 years of full-service electrical from a licensed, insured team." },
  { icon: Zap, title: "Solar Thermal", desc: "Sun-heated water systems that cut your hot water bill year-round." },
  { icon: LightbulbIcon, title: "LED & Energy Monitoring", desc: "Smart lighting and live energy monitoring to lower your usage." },
];

export default function ServicesPage() {
  return (
    <section className="py-16 md:py-24" data-testid="services-page">
      <div className="container mx-auto container-px max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">What we do</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">From a single panel to a fully off-grid farm.</h1>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="bg-card rounded-2xl p-7 border border-border/60 hover:border-primary/60 hover:shadow-ambient-lg transition" data-testid={`service-${i}`}>
              <div className="w-12 h-12 rounded-xl bg-primary/15 grid place-items-center mb-5"><s.icon className="w-6 h-6" /></div>
              <div className="font-heading text-xl font-bold">{s.title}</div>
              <p className="mt-2 text-foreground/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/quote" className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-4 font-bold focus-ring" data-testid="services-cta">
            Get my free estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
