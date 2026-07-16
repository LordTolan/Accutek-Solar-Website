"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Sun, Building2, BatteryCharging, Wrench, LightbulbIcon, Zap } from "lucide-react";
import { CUSTOMER_PORTAL } from "@/lib/site-data";

interface County {
  slug: string;
  name: string;
  state: string;
  seat: string;
  blurb: string;
  incentive: string;
}

export default function CountyPageClient({ county }: { county: County }) {
  const SERVICES = [
    { icon: Sun, title: "Residential Solar", desc: "Grid-tied and hybrid systems optimized for your local roof or field." },
    { icon: Building2, title: "Commercial & Ag", desc: "Large-scale arrays for farms and businesses. REAP-grant eligible." },
    { icon: BatteryCharging, title: "Battery Storage", desc: "Whole-home backup using industrial-grade LiFePO4 batteries." },
  ];

  return (
    <>
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-[0.03]" />
        <div className="container mx-auto container-px max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded mb-6">
                <MapPin className="w-3 h-3" /> Local Installer | {county.name}
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
                Solar PV & Backup for <span className="text-primary">{county.name}, {county.state}.</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/70 leading-relaxed max-w-xl">
                {county.blurb}
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring">
                  Free {county.name} Estimate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card overflow-hidden aspect-video shadow-ambient-lg relative">
                <Image 
                   src="https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200" 
                   alt={`${county.name} solar installation`}
                   fill 
                   className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border bg-muted/5">
        <div className="container mx-auto container-px max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Local Incentives", body: county.incentive },
              { icon: ShieldCheck, title: "Certified Installer", body: "NABCEP certified and authorized Kohler installer for 32 years." },
              { icon: Sun, title: "Local, Family-Owned", body: "Serving West Central Indiana and East Central Illinois families since 1994. No 1-800 numbers." },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-xl border border-border bg-card">
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <div className="font-heading text-lg font-bold mb-2">{item.title}</div>
                <p className="text-sm text-foreground/65 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="container mx-auto container-px max-w-6xl">
          <h2 className="text-3xl font-heading font-bold mb-10">Services in {county.name}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-7 rounded-xl border border-border bg-card">
                <s.icon className="w-6 h-6 text-primary mb-4" />
                <div className="font-heading font-bold mb-2">{s.title}</div>
                <p className="text-sm text-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
