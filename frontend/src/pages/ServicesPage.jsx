import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/site/PageHero";
import CTASection from "@/components/site/CTASection";
import { SERVICES, IMAGES } from "@/lib/site-data";
import { Check, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <main data-testid="services-page" className="bg-bone">
      <PageHero
        eyebrow="— Capabilities"
        title="Four disciplines, one in-house crew."
        subtitle="Solar & storage, backup power, facility automation and advanced diagnostics — engineered, installed, and maintained by the same team that's been doing it since 1994."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Services" }]}
        testid="services-hero"
      />

      {/* Quick-jump nav */}
      <nav
        data-testid="services-jump-nav"
        className="sticky top-16 z-30 bg-bone/95 backdrop-blur-md border-b border-line"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex flex-wrap gap-2 justify-center sm:justify-start">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-testid={`services-jump-${s.id}`}
              className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider border border-line hover:border-forest hover:bg-forest hover:text-bone transition-colors"
            >
              {s.code} · {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Detailed sections */}
      {SERVICES.map((s, i) => {
        const Icon = s.icon;
        const flip = i % 2 === 1;
        const bg = i % 2 === 0 ? "bg-bone" : "bg-bone2";
        return (
          <section
            id={s.id}
            key={s.id}
            data-testid={`services-detail-${s.id}`}
            className={`${bg} py-20 lg:py-28 scroll-mt-24`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
              <div className="grid grid-cols-12 gap-6 lg:gap-12 items-start">
                <div className={`col-span-12 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-xs text-amberDark">{s.code}</span>
                    <span className="h-px w-12 bg-line" />
                    <Icon className="h-5 w-5 text-forest" />
                  </div>
                  <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-ink tracking-tighter leading-[1.05]">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg text-ink2 leading-relaxed max-w-2xl">
                    {s.summary}
                  </p>
                  <p className="mt-4 text-base text-ink2 leading-relaxed max-w-2xl">
                    {s.detail}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/contact"
                      data-testid={`services-cta-${s.id}`}
                      className="group inline-flex items-center gap-2 bg-forest text-bone px-5 py-3 text-sm font-medium hover:bg-amber hover:text-ink rounded-sm transition-colors"
                    >
                      Schedule consultation
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/tools"
                      className="inline-flex items-center gap-2 border border-line text-ink px-5 py-3 text-sm hover:bg-ink hover:text-bone hover:border-ink rounded-sm transition-colors"
                    >
                      Try our calculators
                    </Link>
                  </div>
                </div>
                <div className={`col-span-12 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <div className="bg-bone border border-line p-6 lg:p-8">
                    <div className="label-tag text-amberDark mb-4">Capabilities</div>
                    <ul className="space-y-3">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-ink">
                          <Check className="h-4 w-4 mt-0.5 text-forest shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Visual proof */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4">
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

      <CTASection
        title="Need a contractor who actually services what they install?"
        subtitle="Whether it's a new install, a maintenance contract, or a system another contractor walked away from — we'll show up, diagnose, and document the work."
      />
    </main>
  );
}
