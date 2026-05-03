import React from "react";
import { Link } from "react-router-dom";
import { SERVICES, IMAGES } from "@/lib/site-data";
import { Check, ArrowRight } from "lucide-react";

/**
 * Compact services preview (used on Home).
 * Full breakdown lives on /services.
 */
export default function Services({ compact = false }) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="label-tag text-amberDark mb-4">— What we do</p>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-ink leading-[0.95]">
              Four disciplines.
              <br />
              <span className="italic font-semibold">One contractor.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-lg text-ink2 leading-relaxed">
              Solar &amp; storage, backup power, facility automation and
              advanced diagnostics — engineered, installed, and maintained by
              the same in-house crew. Every project, residential or commercial.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                to={`/services#${s.id}`}
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="relative col-span-12 md:col-span-6 lg:col-span-3 bg-bone2 border border-line p-8 hover:-translate-y-1 hover:border-amber transition-all duration-300 group"
              >
                <div className="flex items-baseline justify-between mb-6">
                  <span className="font-mono text-xs text-ink2/60">{s.code}</span>
                  <Icon className="h-5 w-5 text-amberDark group-hover:text-forest transition-colors" />
                </div>
                <h3 className="font-display text-xl lg:text-2xl font-extrabold text-ink mb-3 tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-ink2 leading-relaxed mb-6">
                  {s.summary}
                </p>
                {!compact && (
                  <ul className="space-y-2 border-t border-line pt-6">
                    {s.bullets.slice(0, 3).map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink">
                        <Check className="h-3.5 w-3.5 mt-1 text-amberDark shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-amberDark group-hover:text-forest transition-colors">
                  Learn more
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {!compact && (
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
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            data-testid="services-view-all"
            className="group inline-flex items-center gap-2 border border-forest text-forest px-6 py-3 text-sm font-medium hover:bg-forest hover:text-bone transition-colors rounded-sm"
          >
            View full services
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
