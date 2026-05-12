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
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#0F1F12] text-[#F7F4F0]"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Solar home installation at golden hour - Accutek Solar"
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[#0F1F12]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1F12]/80 via-[#0F1F12]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0F1F12]/90" />
      </div>

      {/* Top label bar - Yellow Light inspired trust bar */}
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-12 flex items-center justify-between gap-6">
          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs tracking-[0.15em] text-[#F7F4F0]/90">
              <span className="h-1.5 w-1.5 bg-[#E19233] animate-sun-pulse rounded-full" />
              FAMILY-OWNED SINCE 1994
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-[#F7F4F0]/80">
            <MapPin className="h-3.5 w-3.5" /> Serving Indiana & Illinois
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-28 lg:pt-16 lg:pb-36">
        <div className="max-w-4xl">
          <p className="uppercase tracking-[0.2em] text-[#E19233] text-sm mb-4 font-medium">
            SOLAR • STORAGE • BACKUP POWER • AUTOMATION
          </p>

          <h1 className="font-display text-[2.85rem] leading-[0.92] sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-[-0.025em] mb-6">
            Reliable solar.<br />
            Real savings.<br />
            <span className="text-[#E19233]">Energy independence.</span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-[#F7F4F0]/90 leading-relaxed mb-8">
            Family-owned for over 30 years. Custom solar PV, battery storage, and standby generator systems for homes and businesses across Indiana and Illinois. Quality workmanship you can trust for decades.
          </p>

          {/* Yellow Light style guarantee line */}
          <div className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-white/10 text-sm text-[#F7F4F0]/90">
            <span className="font-medium text-[#E19233]">We stand behind our work.</span> 
            Quality installs • Long-term performance • Local support
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <BookOnlineButton
              size="lg"
              variant="primary"
              testid="hero-cta-book"
              label="Book a free consultation"
            />
            <Link
              to="/contact"
              data-testid="hero-cta-quote"
              className="group inline-flex items-center justify-center gap-2 border border-white/40 hover:bg-white hover:text-[#0F1F12] px-8 py-4 rounded-sm text-sm font-medium transition-all active:scale-[0.985]"
            >
              Get a custom quote
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-4 py-4 text-[#F7F4F0]/80 hover:text-[#E19233] text-sm font-medium transition-colors"
            >
              See our services
            </Link>
          </div>

          <div className="mt-4 text-xs text-[#F7F4F0]/70">
            or call <a href={`tel:${COMPANY.phoneRaw}`} className="font-mono hover:text-[#E19233] underline-offset-2 hover:underline">{COMPANY.phone}</a>
          </div>
        </div>
      </div>

      {/* Trust / Stats strip - YellowLite inspired */}
      <div className="relative z-10 border-t border-white/10 bg-[#0F1F12]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px divide-x divide-white/10">
            {[ 
              { number: "30+", label: "Years of expertise" },
              { number: "17", label: "Counties served" },
              { number: "100%", label: "In-house installs" },
              { number: "Family", label: "Owned & operated" },
            ].map((stat, index) => (
              <div key={index} className="py-6 sm:py-8 text-center">
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#E19233] tracking-tighter">
                  {stat.number}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-[#F7F4F0]/70">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
