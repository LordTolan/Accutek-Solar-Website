import React from "react";
import PageHero from "@/components/site/PageHero";
import CommercialIntake from "@/components/site/CommercialIntake";
import CTASection from "@/components/site/CTASection";
import { COMPANY } from "@/lib/site-data";
import {
  Building2,
  FileCheck2,
  Clock,
  ShieldCheck,
  Zap,
  Wrench,
  Cpu,
  Activity,
} from "lucide-react";
import useSEO from "@/lib/use-seo";

const VALUE_PROPS = [
  {
    icon: FileCheck2,
    title: "Pre-qualified site visits",
    body: "We review your facility size, load profile, and existing equipment before we drive out. Your time isn't wasted on contractors who aren't a fit.",
  },
  {
    icon: Building2,
    title: "Commercial-scale capability",
    body: "Multi-hundred-kW PV, large standby generators, facility automation. We scale up — and we stay small enough to keep the same crew on your project start to finish.",
  },
  {
    icon: Clock,
    title: "1-business-day response",
    body: "Every commercial inquiry gets a response from an owner or senior tech within one business day. No regional rep networks, no call centers.",
  },
  {
    icon: ShieldCheck,
    title: "Documented work",
    body: "As-builts, panel schedules, labeled disconnects, photos. Everything we install is ready to be serviced by the next contractor — even if it's not us.",
  },
];

const DISCIPLINES = [
  {
    icon: Zap,
    title: "Commercial standby generators",
    body: "Whole-facility standby up to 150 kW+. ATS sized to critical loads, fuel-system design (NG / LP / diesel), annual load-bank testing.",
  },
  {
    icon: Wrench,
    title: "Solar & storage at scale",
    body: "Ground-mount and roof-mount PV for manufacturing, warehouses, agriculture, and municipal facilities. Hybrid storage for peak-shaving and backup.",
  },
  {
    icon: Cpu,
    title: "Facility automation & decommissioning",
    body: "Controlled decommissioning of legacy systems, technical restoration, and scheduled maintenance for facilities that need a reliable electrical partner.",
  },
  {
    icon: Activity,
    title: "Multi-brand diagnostics",
    body: "When another contractor walks away, we come in. Enphase, SolarEdge, SMA, Outback, Sol-Ark, Schneider, Generac, Kohler — we diagnose and document.",
  },
];

export default function CommercialPage() {
  useSEO({
    title: "Commercial & Industrial — Pre-Qualified Project Intake",
    description:
      "Commercial PV up to multi-hundred kW, standby generators, facility automation, and multi-brand diagnostics. Pre-qualified site visits — no wasted trips.",
    path: "/commercial",
  });
  return (
    <main data-testid="commercial-page" className="bg-bone">
      <PageHero
        eyebrow="— Commercial & industrial intake"
        title="Pre-qualified commercial projects. No site visit wasted."
        subtitle="Tell us about your facility, critical loads, and any existing equipment. Upload a one-line or site plan and we'll scope the work before we drive out."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Commercial" }]}
        testid="commercial-hero"
      />

      {/* Value props */}
      <section className="bg-bone py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {VALUE_PROPS.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  data-testid={`commercial-valueprop-${i}`}
                  className="col-span-12 sm:col-span-6 lg:col-span-3 bg-bone2 border border-line p-6 lg:p-7"
                >
                  <Icon className="h-6 w-6 text-forest mb-4" />
                  <h3 className="font-display text-lg font-bold text-ink tracking-tight mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-ink2 leading-relaxed">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-bone2 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="mb-8 lg:mb-10">
            <p className="label-tag text-amberDark mb-3">— Commercial intake</p>
            <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-ink tracking-tighter leading-[1.05]">
              Start a commercial request.
            </h2>
            <p className="mt-4 text-base lg:text-lg text-ink2 leading-relaxed max-w-2xl">
              Five minutes now saves both of us a day. Seth and Quill personally review every
              commercial intake — your project will not disappear into a general queue.
            </p>
          </div>
          <CommercialIntake />
        </div>
      </section>

      {/* Disciplines we handle */}
      <section className="bg-forest text-bone py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-7">
              <p className="label-tag text-amber mb-4">— What we handle</p>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter leading-[1.05]">
                Four disciplines, one accountable crew.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {DISCIPLINES.map((d, i) => {
              const Icon = d.icon;
              return (
                <div
                  key={i}
                  data-testid={`commercial-discipline-${i}`}
                  className="col-span-12 sm:col-span-6 lg:col-span-3 bg-pine/40 border border-bone/15 p-6 lg:p-7"
                >
                  <Icon className="h-6 w-6 text-amber mb-4" />
                  <h3 className="font-display text-lg font-bold text-bone tracking-tight mb-2">
                    {d.title}
                  </h3>
                  <p className="text-sm text-bone/70 leading-relaxed">{d.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        variant="bone"
        title="Prefer to talk first?"
        subtitle={`Call ${COMPANY.phone} and ask for Seth or Quill — or schedule a standard service call and we'll route it to the commercial side.`}
        primaryLabel="Schedule a call"
        primaryTo="/contact"
      />
    </main>
  );
}
