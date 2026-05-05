import React from "react";
import { Link } from "react-router-dom";
import { COMPANY, IMAGES } from "@/lib/site-data";
import { ArrowRight, MapPin, Calendar, Wrench } from "lucide-react";
import BookOnlineButton from "@/components/site/BookOnlineButton";

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
        <div className="absolute inset-0 bg-forest/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-forest/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/90" />
      </div>

      {/* Top label bar */}
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-12 flex items-center justify-end gap-6">
          <span className="hidden sm:inline-flex label-tag text-bone/80 items-center gap-2 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
            <span className="h-1.5 w-1.5 bg-amber animate-sun-pulse rounded-full" />
            Family-Owned · Est. 1994
          </span>
          <span className="hidden md:inline-flex label-tag text-bone/80 items-center gap-1.5 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
            <MapPin className="h-3 w-3" /> Clinton, Indiana
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-12 pb-32 lg:pt-20 lg:pb-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10">
            <p data-testid="hero-eyebrow" className="label-tag text-amber mb-6 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
              Solar & Storage · Backup Power · Facility Automation · Diagnostics
            </p>
            <h1
              data-testid="hero-title"
              className="font-display text-[2.7rem] leading-[0.95] sm:text-6xl lg:text-8xl font-extrabold tracking-tighter [text-shadow:_0_2px_24px_rgba(0,0,0,0.35)]"
            >
              30 years of
              <br />
              <span className="italic font-semibold">electrical expertise.</span>
              <br />
              <span className="text-amber">Indiana &amp; Illinois.</span>
            </h1>
            <p
              data-testid="hero-subtitle"
              className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg lg:text-xl text-bone leading-relaxed [text-shadow:_0_1px_12px_rgba(0,0,0,0.4)]"
            >
              Custom solar PV and storage, authorized standby generator
              installation, commercial facility automation and advanced
              diagnostic services. Family-owned since 1994 — residential and
              commercial clients across the IN/IL corridor.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BookOnlineButton
                size="lg"
                variant="primary"
                testid="hero-cta-book"
                label="Book online"
              />
              <Link
                to="/contact"
                data-testid="hero-cta-quote"
                className="group inline-flex items-center gap-2 border border-bone/40 px-6 py-4 text-bone hover:bg-bone hover:text-ink rounded-sm transition-colors text-sm font-medium"
              >
                <Calendar className="h-4 w-4" />
                Schedule a service call
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                data-testid="hero-cta-services"
                className="inline-flex items-center gap-2 px-2 py-4 text-bone/80 hover:text-amber transition-colors text-sm"
              >
                <Wrench className="h-4 w-4" />
                Explore services
              </Link>
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
        <div className="mt-16 sm:mt-20 lg:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-px bg-bone/15 border border-bone/15">
          {[
            { k: "30", l: "Years in business" },
            { k: "17", l: "Counties served IN+IL" },
            { k: "Res.+Com.", l: "Residential & commercial" },
            { k: "100%", l: "In-house installs" },
          ].map((s, i) => (
            <div
              key={i}
              data-testid={`hero-stat-${i}`}
              className="bg-forest/95 px-4 sm:px-6 py-6 sm:py-8 backdrop-blur-sm"
            >
              <div className="font-mono text-xl sm:text-2xl lg:text-4xl font-bold text-amber tracking-tight break-words">
                {s.k}
              </div>
              <div className="mt-2 label-tag text-bone/60">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
