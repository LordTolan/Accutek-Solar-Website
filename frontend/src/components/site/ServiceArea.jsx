import React from "react";
import { SERVICE_AREAS, IMAGES } from "@/lib/site-data";
import { MapPin } from "lucide-react";

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
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-6">
            <p className="label-tag text-amberDark mb-4">— Where we work</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter text-ink leading-[0.95]">
              17 counties.
              <br />
              <span className="italic font-light">Two states.</span>
              <br />
              One local crew.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-base text-ink2 leading-relaxed">
              Based in Clinton, IN — within a comfortable drive of every install
              site. If you're outside this footprint, give us a call anyway; we
              occasionally take on commercial work farther out.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {Object.entries(SERVICE_AREAS).map(([state, counties], idx) => (
            <div
              key={state}
              data-testid={`service-area-${state.toLowerCase()}`}
              className="col-span-12 md:col-span-6 bg-bone border border-line p-8"
            >
              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-ink tracking-tight flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-amberDark" />
                  {state}
                </h3>
                <span className="font-mono text-xs text-ink2">
                  {String(counties.length).padStart(2, "0")} counties
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {counties.map((c, i) => (
                  <li
                    key={c}
                    className="font-mono text-sm text-ink flex items-center gap-2 border-b border-line/60 py-2"
                  >
                    <span className="text-ink2 text-[10px]">
                      {String(idx === 0 ? i + 1 : 10 + i + 1).padStart(2, "0")}
                    </span>
                    {c} County
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
