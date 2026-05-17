import React from "react";
import PageHero from "@/components/site/PageHero";
import ServiceAreaMap from "@/components/site/ServiceAreaMap";
import CTASection from "@/components/site/CTASection";
import { SERVICE_QUADRANTS, COMPANY, IMAGES } from "@/lib/site-data";
import { MapPin, Clock, Truck } from "lucide-react";
import useSEO from "@/lib/use-seo";

export default function ServiceAreaPage() {
  useSEO({
    title: "Service Area — 17 Counties Across Indiana & Illinois",
    description:
      "10 Indiana + 7 Illinois counties served daily from our Clinton, IN home base. Vigo, Parke, Vermillion, Putnam, Champaign, Vermilion and more.",
    path: "/service-area",
  });
  return (
    <main data-testid="service-area-page" className="bg-bone">
      <PageHero
        eyebrow="— Where we work"
        title="17 counties. Two states. Four operational quadrants."
        subtitle="Central Indiana East & West, Central Illinois East & West. Organized for fast response times across the IN/IL corridor — based in Clinton, IN, dispatching daily."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Service Area" }]}
        testid="service-area-hero"
      />

      {/* Map */}
      <section className="relative bg-bone2 py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={IMAGES.energyMap} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ServiceAreaMap />
        </div>
      </section>

      {/* Quadrant detail */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-7">
              <p className="label-tag text-amberDark mb-4">— Coverage detail</p>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-[1.05]">
                Every county, mapped to a quadrant.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {SERVICE_QUADRANTS.map((q) => (
              <div
                key={q.id}
                data-testid={`quadrant-detail-${q.id}`}
                className="col-span-12 md:col-span-6 bg-bone2 border border-line p-6 lg:p-8"
              >
                <div className="flex items-baseline justify-between mb-4 border-b border-line pb-3">
                  <div>
                    <div className="label-tag text-amberDark">{q.state}</div>
                    <h3 className="font-display text-xl lg:text-2xl font-extrabold text-ink tracking-tight mt-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-forest" />
                      {q.label}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-ink2">
                    {q.counties.length} counties
                  </span>
                </div>
                <p className="text-sm text-ink2 leading-relaxed mb-4">
                  {q.description}
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {q.counties.map((c, i) => (
                    <li
                      key={c}
                      className="font-mono text-sm text-ink flex items-center gap-2 border-b border-line/60 py-1.5"
                    >
                      <span className="text-ink2 text-[10px]">
                        {String(i + 1).padStart(2, "0")}
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

      {/* Service standards */}
      <section className="bg-bone2 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="label-tag text-amberDark mb-4">— Operational promise</p>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-[1.05]">
                What "local service" actually means.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <Standard
              icon={Clock}
              k="One"
              l="Business day response"
              body="We answer every inquiry — phone, email, web form — within one business day. No exceptions, no offshore call center."
            />
            <Standard
              icon={Truck}
              k="In-state"
              l="Crews & dispatch"
              body="All trucks, technicians, and inventory dispatch from Clinton, IN. No regional sales reps handing you off to a partner network."
            />
            <Standard
              icon={MapPin}
              k="Outside the map?"
              l="Call us anyway"
              body="We periodically take on commercial work outside this quadrant. If you're nearby, ask — we'll tell you yes or no on the phone."
            />
          </div>
        </div>
      </section>

      <CTASection
        title="In our service area? Let's talk."
        subtitle={`Based in ${COMPANY.address.city}, ${COMPANY.address.state}. We respond to every inquiry within one business day.`}
      />
    </main>
  );
}

function Standard({ icon: Icon, k, l, body }) {
  return (
    <div className="col-span-12 md:col-span-4 bg-bone border border-line p-6 lg:p-7">
      <Icon className="h-6 w-6 text-forest mb-4" />
      <div className="font-mono text-2xl font-bold text-ink">{k}</div>
      <div className="label-tag text-ink2 mt-1 mb-4">{l}</div>
      <p className="text-sm text-ink2 leading-relaxed">{body}</p>
    </div>
  );
}
