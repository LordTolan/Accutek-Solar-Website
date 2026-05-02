import React from "react";
import { COMPANY } from "@/lib/site-data";

const milestones = [
  { y: "1994", t: "AccuTek founded by Keith Davis in Clinton, IN" },
  { y: "2000s", t: "Expanded into solar PV and Kohler standby generators" },
  { y: "2010s", t: "Hybrid battery systems, energy monitoring, custom backup" },
  { y: "Today", t: "31 years strong. Family-owned. Same crew on every install." },
];

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="label-tag text-amberDark mb-4">— Family-owned since 1994</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter text-ink leading-[0.95]">
              31 years.
              <br />
              <span className="italic font-light">One family.</span>
              <br />
              Zero shortcuts.
            </h2>
            <p className="mt-6 text-base text-ink2 leading-relaxed">
              AccuTek Solar is an environmentally-conscious, family-owned
              electrical and solar contractor founded by {COMPANY.founder} in {COMPANY.founded}.
              We've spent three decades doing what most installers won't:
              keeping every step of the work in-house.
            </p>
            <p className="mt-4 text-base text-ink2 leading-relaxed">
              We offer free estimates, install reliable solar electric and
              thermal systems at a cost-effective price, and pair them with
              energy-monitoring and LED lighting upgrades that lower your bill
              even further.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ol className="border-l border-line">
              {milestones.map((m, i) => (
                <li
                  key={i}
                  data-testid={`about-milestone-${i}`}
                  className="relative pl-8 pb-10 last:pb-0"
                >
                  <span className="absolute -left-[7px] top-1 h-3 w-3 bg-amber rounded-full ring-4 ring-bone" />
                  <div className="font-mono text-xs text-amberDark mb-2">{m.y}</div>
                  <p className="font-display text-xl text-ink leading-snug tracking-tight">
                    {m.t}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat k="FREE" l="Estimates, always" />
              <Stat k="100%" l="In-house installs" />
              <Stat k="LED" l="Lighting upgrades" />
              <Stat k="24/7" l="Monitoring options" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, l }) {
  return (
    <div className="bg-bone2 border border-line p-5">
      <div className="font-mono text-2xl font-bold text-ink">{k}</div>
      <div className="label-tag text-ink2 mt-1">{l}</div>
    </div>
  );
}
