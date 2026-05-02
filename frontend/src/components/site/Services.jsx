import React from "react";
import { SERVICES, IMAGES } from "@/lib/site-data";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 lg:col-span-5">
            <p className="label-tag text-amberDark mb-4">— What we install</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter text-ink leading-[0.95]">
              The whole stack,
              <br />
              installed by the
              <br />
              <span className="italic font-semibold">same crew.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="text-lg text-ink2 leading-relaxed">
              Solar, batteries, generators and electrical aren't four separate
              vendors — they're one integrated system. We design and install
              every layer ourselves, then stand behind it for the long haul.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              data-testid={`service-card-${s.id}`}
              className={`relative col-span-12 md:col-span-6 lg:col-span-3 bg-bone2 border border-line p-8 hover:-translate-y-1 hover:border-amber transition-all duration-300 group`}
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-mono text-xs text-ink2/60">{s.code}</span>
                <span className="h-px w-12 bg-line group-hover:bg-amber transition-colors" />
              </div>
              <h3 className="font-display text-2xl font-bold text-ink mb-3 tracking-tight leading-tight">
                {s.title}
              </h3>
              <p className="text-sm text-ink2 leading-relaxed mb-6">
                {s.summary}
              </p>
              <ul className="space-y-2 border-t border-line pt-6">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-ink">
                    <Check className="h-3.5 w-3.5 mt-1 text-amberDark shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Visual strip */}
        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-7 relative aspect-[16/10] overflow-hidden border border-line">
            <img
              src={IMAGES.roofPanels}
              alt="Roof solar panel installation"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-5 relative aspect-[16/10] overflow-hidden border border-line bg-forest">
            <img
              src={IMAGES.battery}
              alt="Battery backup detail"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
