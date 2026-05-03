import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/lib/site-data";
import { ArrowRight, Phone, CalendarClock } from "lucide-react";

/**
 * Reusable conversion-focused CTA band.
 */
export default function CTASection({
  eyebrow = "— Ready when you are",
  title = "Schedule a service call.",
  subtitle = "Free residential estimates. Commercial site visits by appointment. We respond within one business day across Indiana and Illinois.",
  primaryLabel = "Schedule Service",
  primaryTo = "/contact",
  variant = "forest",
  testid = "cta-section",
}) {
  const isForest = variant === "forest";
  return (
    <section
      data-testid={testid}
      className={`relative py-20 lg:py-28 ${
        isForest ? "bg-forest text-bone" : "bg-bone2 text-ink"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p
              className={`label-tag mb-4 ${
                isForest ? "text-amber" : "text-amberDark"
              }`}
            >
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter leading-[1.05]">
              {title}
            </h2>
            <p
              className={`mt-4 max-w-2xl text-base lg:text-lg leading-relaxed ${
                isForest ? "text-bone/80" : "text-ink2"
              }`}
            >
              {subtitle}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-end">
            <Link
              to={primaryTo}
              data-testid={`${testid}-primary`}
              className={`group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm font-medium text-sm transition-colors ${
                isForest
                  ? "bg-amber text-ink hover:bg-bone"
                  : "bg-forest text-bone hover:bg-amber hover:text-ink"
              }`}
            >
              <CalendarClock className="h-4 w-4" />
              {primaryLabel}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              data-testid={`${testid}-phone`}
              className={`inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm font-mono text-sm transition-colors border ${
                isForest
                  ? "border-bone/30 text-bone hover:bg-bone hover:text-ink"
                  : "border-line text-ink hover:bg-ink hover:text-bone"
              }`}
            >
              <Phone className="h-4 w-4" />
              {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
