import React from "react";
import PageHero from "@/components/site/PageHero";
import About from "@/components/site/About";
import Gallery from "@/components/site/Gallery";
import CTASection from "@/components/site/CTASection";
import { COMPANY } from "@/lib/site-data";
import { Wrench, Building2, Users, ShieldCheck } from "lucide-react";
import useSEO from "@/lib/use-seo";

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Technically precise",
    body: "We document every install, label every panel, and follow code with no shortcuts. If you ever sell the home or hand the facility to another contractor, the system tells its own story.",
  },
  {
    icon: Users,
    title: "Family-owned, in-house crew",
    body: "Every project is installed by Accutek employees — not subcontractors we've never met. The same people who quote the work do the work and stand behind it.",
  },
  {
    icon: Building2,
    title: "Residential & commercial",
    body: "Single-family rooftop arrays. Multi-hundred-kW commercial PV. Standby generators for facilities that can't afford downtime. We scale up, then scale back down.",
  },
  {
    icon: Wrench,
    title: "We service what we sell",
    body: "And we service what other people sold, too. Multi-brand inverter expertise means your system has somewhere to turn when the original installer can't help.",
  },
];

export default function AboutPage() {
  useSEO({
    title: "About — Family-Owned Since 1994 | Keith, Seth & Quill Davis",
    description:
      "Two generations of the Davis family. Founded by Keith Davis in 1994 and run today by Keith, Seth and Quill — with an in-house crew that installs and services every job.",
    path: "/about",
  });
  return (
    <main data-testid="about-page" className="bg-bone">
      <PageHero
        eyebrow={`— ${COMPANY.yearsInBusiness} years · Family-owned`}
        title="Family-owned, technically precise, and locally accountable since 1994."
        subtitle={COMPANY.aboutShort}
        breadcrumb={[{ label: "Home", to: "/" }, { label: "About" }]}
        testid="about-hero"
      />

      {/* Principles */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 mb-12">
            <div className="col-span-12 lg:col-span-7">
              <p className="label-tag text-amberDark mb-4">— How we work</p>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter text-ink leading-[1.05]">
                Four principles that shape every job we touch.
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  data-testid={`principle-${i}`}
                  className="col-span-12 md:col-span-6 lg:col-span-3 bg-bone2 border border-line p-6 lg:p-7"
                >
                  <Icon className="h-6 w-6 text-forest mb-4" />
                  <h3 className="font-display text-lg font-bold text-ink tracking-tight mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-ink2 leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Existing About component (timeline + stats) */}
      <About />

      {/* Leadership */}
      <section className="bg-forest text-bone py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 lg:col-span-5">
              <p className="label-tag text-amber mb-4">— Leadership</p>
              <h2 className="font-display text-3xl lg:text-5xl font-extrabold tracking-tighter leading-[1.05]">
                Two generations.
                <br />
                <span className="italic font-semibold">Same family.</span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 flex items-center">
              <Person name="Keith Davis" role="Founder & President" body="Founded Accutek in 1994. 30+ years of electrical and solar field experience." />
            </div>
          </div>

          {/* Field crew — the people who show up to your job site */}
          <div className="border-t border-bone/15 pt-10">
            <p className="label-tag text-amber mb-6">— Meet your crew</p>
            <p className="text-bone/70 text-sm mb-8 max-w-xl leading-relaxed">
              No subcontractors. No call centers. These are the Accutek team members who show up to your property, do the work, and stand behind it.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Person name="Seth Davis" role="Owner / Operator" body="Day-to-day operations, project management and field crews across Indiana and Illinois." />
              <Person name="Quill Davis" role="Owner / Operator" body="Day-to-day operations, technical lead on diagnostics and commercial automation work." />
              <Person name="Colt" role="Lead Solar Technician" body="Lead installer on residential and commercial solar PV, ground-mount and roof-mount systems." />
              <Person name="AJ" role="Solar Technician" body="Installation and service work across solar PV, battery storage and backup power systems." />
              <Person name="Clint" role="Solar Technician" body="Installation and service work across solar PV, battery storage and backup power systems." />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery />

      <CTASection
        variant="bone"
        title="Talk to the people who'll actually do the work."
        subtitle="No call centers, no national rep network. Reach out and you're talking to someone with a tool belt."
      />
    </main>
  );
}

function Person({ name, role, body, photo }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("");
  return (
    <div className="bg-pine/40 border border-bone/15 p-5">
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-amber/40"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-amber/20 flex items-center justify-center mb-3 border-2 border-amber/40">
          <span className="font-display text-lg font-bold text-amber">
            {initials}
          </span>
        </div>
      )}
      <div className="label-tag text-amber mb-1">{role}</div>
      <div className="font-display text-lg font-bold text-bone tracking-tight">
        {name}
      </div>
      <p className="mt-2 text-sm text-bone/70 leading-relaxed">{body}</p>
    </div>
  );
}
