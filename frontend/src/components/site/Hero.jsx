import React from "react";
import { COMPANY, IMAGES } from "@/lib/site-data";
import { ArrowRight, MapPin, Sun } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[100svh] w-full overflow-hidden bg-forest text-bone"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Solar home installation at golden hour"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/80" />
      </div>

      {/* Top label bar */}
      <div className="relative z-10 border-b border-bone/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-end gap-6">
          <span className="hidden sm:inline-flex label-tag text-bone/70 items-center gap-2">
            <span className="h-1.5 w-1.5 bg-amber animate-sun-pulse rounded-full" />
            Family-Owned · Est. 1994
          </span>
          <span className="hidden md:inline-flex label-tag text-bone/70 items-center gap-1.5">
            <MapPin className="h-3 w-3" /> Clinton, Indiana
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-32 lg:pt-40 lg:pb-48">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9">
            <p data-testid="hero-eyebrow" className="label-tag text-amber mb-6">
              Solar · Battery Backup · Generators · Electrical
            </p>
            <h1
              data-testid="hero-title"
              className="font-display text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tighter"
            >
              Energy that
              <br />
              <span className="italic font-semibold">stays on.</span>
              <br />
              <span className="text-amber">Power that pays back.</span>
            </h1>
            <p
              data-testid="hero-subtitle"
              className="mt-8 max-w-2xl text-lg lg:text-xl text-bone/80 leading-relaxed"
            >
              31 years of clean, custom-engineered solar PV, custom battery
              banks and Kohler standby generators across Indiana & Illinois.
              Free estimates. Real installations. No outsourced crews.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#calculators"
                data-testid="hero-cta-calc"
                className="group inline-flex items-center gap-2 bg-amber px-6 py-4 text-ink font-medium rounded-sm hover:bg-bone hover:text-ink transition-colors"
              >
                Size your system
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                data-testid="hero-cta-quote"
                className="inline-flex items-center gap-2 border border-bone/40 px-6 py-4 text-bone hover:bg-bone hover:text-ink rounded-sm transition-colors"
              >
                Get a free quote
              </a>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                data-testid="hero-phone"
                className="inline-flex items-center gap-2 px-2 py-4 font-mono text-sm text-bone/80 hover:text-amber transition-colors"
              >
                or call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 lg:mt-32 grid grid-cols-2 lg:grid-cols-4 gap-px bg-bone/15 border border-bone/15">
          {[
            { k: "31", l: "Years in business" },
            { k: "17", l: "Counties served IN+IL" },
            { k: "$0", l: "Cost for an estimate" },
            { k: "100%", l: "In-house installs" },
          ].map((s, i) => (
            <div
              key={i}
              data-testid={`hero-stat-${i}`}
              className="bg-forest/95 px-6 py-8 backdrop-blur-sm"
            >
              <div className="font-mono text-3xl lg:text-5xl font-bold text-amber tracking-tight">
                {s.k}
              </div>
              <div className="mt-2 label-tag text-bone/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom corner mark */}
      <div className="absolute bottom-6 right-6 z-10 hidden lg:flex items-center gap-2 label-tag text-bone/40">
        <Sun className="h-3 w-3" /> 39.65°N · 87.40°W
      </div>
    </section>
  );
}
