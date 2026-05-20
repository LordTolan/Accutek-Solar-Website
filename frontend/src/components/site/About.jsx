import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

const milestones = [
  { y: "1994", t: "Clint Lenover founds Accutek in Clinton, IN" },
  { y: "2000s", t: "Expansion into solar PV and Kohler standby generators" },
  { y: "2010s", t: "Hybrid storage, energy monitoring, custom backup" },
  { y: "2020s", t: "Commercial facility automation, multi-brand diagnostics, decommissioning" },
  { y: "Today", t: "Clint remains President. Sons Seth, Colt & Quill Lenover run day-to-day operations." },
];

export default function About({ compact = false }) {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-5">
            <p className="label-tag text-amberDark mb-4">— About Accutek Solar</p>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-ink leading-[0.95]">
              30 years.
              <br />
              <span className="italic font-semibold">Two generations.</span>
              <br />
              Zero shortcuts.
            </h2>
            <p className="mt-6 text-lg text-ink2 leading-relaxed">
              {COMPANY.aboutShort}
            </p>
            {!compact && (
              <p className="mt-4 text-base text-ink2 leading-relaxed">
                Founded by <strong className="text-ink">{COMPANY.founder}</strong> in {COMPANY.founded} —
                who remains <strong className="text-ink">President</strong> today. His sons{" "}
                <strong className="text-ink">Seth</strong>,{" "}
                <strong className="text-ink">Colt</strong> and{" "}
                <strong className="text-ink">Quill Lenover</strong> run day-to-day operations,
                serving residential and commercial clients with the same in-house crew that's
                done every install since the start.
              </p>
            )}
            {compact && (
              <Link
                to="/about"
                data-testid="about-view-all"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest hover:text-amberDark transition-colors group"
              >
                Read our story
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
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
                  <p className="font-display text-lg lg:text-xl font-semibold text-ink leading-snug tracking-tight">
                    {m.t}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat k="30" l="Years in business" />
              <Stat k="100%" l="In-house installs" />
              <Stat k="2nd" l="Generation owners" />
              <Stat k="Res+Com" l="Project mix" />
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
