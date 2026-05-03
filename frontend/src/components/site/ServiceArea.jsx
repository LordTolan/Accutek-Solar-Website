import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "@/lib/site-data";
import ServiceAreaMap from "@/components/site/ServiceAreaMap";
import { ArrowRight } from "lucide-react";

/**
 * Used on Home as a compact preview of the full service area page.
 */
export default function ServiceArea() {
  return (
    <section
      id="service-area"
      data-testid="service-area-section"
      className="relative bg-bone2 py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <img src={IMAGES.energyMap} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-6">
            <p className="label-tag text-amberDark mb-4">— Where we work</p>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-ink leading-[0.95]">
              17 counties.
              <br />
              <span className="italic font-semibold">Two states.</span>
              <br />
              Four operational quadrants.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base text-ink2 leading-relaxed">
              Based in Clinton, IN. We organize our service territory into
              four quadrants — Central Indiana East &amp; West, Central
              Illinois East &amp; West — to keep response times fast and
              every install local.
            </p>
          </div>
        </div>

        <ServiceAreaMap />

        <div className="mt-10 flex justify-center">
          <Link
            to="/service-area"
            data-testid="service-area-view-all"
            className="group inline-flex items-center gap-2 border border-forest text-forest px-6 py-3 text-sm font-medium hover:bg-forest hover:text-bone transition-colors rounded-sm"
          >
            See full service area
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
