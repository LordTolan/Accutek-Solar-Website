import React from "react";
import { Link } from "react-router-dom";
import { SERVICE_QUADRANTS } from "@/lib/site-data";
import { MapPin } from "lucide-react";

/**
 * Visual 2x2 quadrant map of the service territory.
 * Diagonal divider visually separates IN (right column) and IL (left column).
 */
export default function ServiceAreaMap({ compact = false }) {
  return (
    <div data-testid="service-area-map" className="relative">
      {/* State labels */}
      <div className="grid grid-cols-2 mb-3 gap-3">
        <div className="border-l-2 border-amber pl-3">
          <div className="label-tag text-amberDark">Illinois</div>
          <div className="font-display text-sm font-semibold text-ink mt-0.5">
            7 counties
          </div>
        </div>
        <div className="border-l-2 border-forest pl-3">
          <div className="label-tag text-forest">Indiana</div>
          <div className="font-display text-sm font-semibold text-ink mt-0.5">
            10 counties · home base
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
        {/* Order: IL West, IN East, IL East, IN West so geography reads roughly left-to-right */}
        <Quadrant q={getQuad("il-west")} accent="amber" position="tl" compact={compact} />
        <Quadrant q={getQuad("in-east")} accent="forest" position="tr" compact={compact} />
        <Quadrant q={getQuad("il-east")} accent="amber" position="bl" compact={compact} />
        <Quadrant q={getQuad("in-west")} accent="forest" position="br" compact={compact} primary />
      </div>

      {/* Footer: home base callout */}
      <div className="mt-4 flex items-center justify-between gap-3 px-4 py-3 border border-forest bg-forest text-bone">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-amber" />
          <span className="label-tag text-amber">Home base</span>
        </div>
        <span className="font-mono text-xs">
          Clinton, IN · Vermillion County
        </span>
      </div>
    </div>
  );
}

function getQuad(id) {
  return SERVICE_QUADRANTS.find((q) => q.id === id);
}

function Quadrant({ q, accent = "forest", position, primary, compact }) {
  if (!q) return null;
  const accentClass =
    accent === "amber" ? "border-amber/60 hover:border-amber" : "border-forest/40 hover:border-forest";
  const tagClass = accent === "amber" ? "text-amberDark" : "text-forest";
  const cornerHints = {
    tl: "↖",
    tr: "↗",
    bl: "↙",
    br: "↘",
  };
  return (
    <Link
      to="/service-area"
      data-testid={`quadrant-${q.id}`}
      className={`group relative block bg-bone border ${accentClass} ${
        primary ? "ring-1 ring-amber/40" : ""
      } p-5 lg:p-6 transition-colors`}
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className={`label-tag ${tagClass}`}>{q.state}</span>
        <span className="font-mono text-xs text-ink2/60">
          {cornerHints[position]} {q.counties.length}
        </span>
      </div>
      <h3 className="font-display text-sm lg:text-base font-bold text-ink leading-tight tracking-tight">
        {q.label}
      </h3>
      {!compact && (
        <p className="mt-1.5 text-xs text-ink2 leading-relaxed">
          {q.description}
        </p>
      )}
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {q.counties.map((c) => (
          <li
            key={c}
            className="font-mono text-[11px] px-2 py-0.5 bg-bone2 border border-line text-ink"
          >
            {c}
          </li>
        ))}
      </ul>
    </Link>
  );
}
