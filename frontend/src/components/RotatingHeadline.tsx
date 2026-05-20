"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
  // Short punchy lines
  "Local solar. Lower bills.",
  "Roofs to fields. Solar that delivers.",
  "Indiana sunshine. Your savings.",
  "Energy freedom starts here.",
  "Solar done right.",
  "Power your home. Own your energy.",
  "Reliable solar. Real Indiana.",
  "Turn sun into savings.",
  "No grid. No problem.",
  "Built local. Built better.",
  "Solar that works.",
  "Power on your terms.",
  "Indiana solar wins.",
  "Own your power.",
  "Sun-powered Indiana.",
  "Bills die here.",
  // Longer regional lines (Indiana + Illinois)
  "Local solar experts serving Indiana and Illinois — from rooftops to fields.",
  "Real savings and backup power for homes and farms in Indiana and Illinois.",
  "Solar done right for Indiana and Eastern Illinois.",
  "Your roof. Your field. Your power — Indiana & Illinois.",
  "Family-owned solar that performs in Indiana and Illinois.",
  "Turn sunlight into savings across Indiana and Illinois.",
  "Dependable solar solutions for Indiana and Illinois property owners.",
];

const ROTATE_MS = 4200; // matches .rh-line animation duration in globals.css

/**
 * Split each tagline into a "dark head + green tail" pair to match the
 * two-tone (foreground + primary) treatment of the original screenshot.
 * Falls back to all-primary when there's no natural split point.
 */
function splitHeadline(line: string): [string, string] {
  const dashIdx = line.indexOf(" — ");
  if (dashIdx > 0) return [line.slice(0, dashIdx), line.slice(dashIdx + 3)];
  const trimmedEnd = line.endsWith(".") ? line.slice(0, -1) : line;
  const lastDot = trimmedEnd.lastIndexOf(". ");
  if (lastDot > 0) return [line.slice(0, lastDot + 1), line.slice(lastDot + 2)];
  return ["", line];
}

function pickRandom(prev: number, len: number): number {
  if (len <= 1) return 0;
  let next = Math.floor(Math.random() * len);
  if (next === prev) next = (next + 1) % len; // avoid immediate repeat
  return next;
}

export default function RotatingHeadline() {
  // Deterministic SSR start (index 0) — avoids hydration mismatch.
  const [i, setI] = useState(0);
  // `cycle` always increments — guarantees React remounts the span and
  // re-triggers the CSS animation even if random picks the same index twice.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    // Kick off with a random first pick on the client side
    setI((prev) => pickRandom(prev, TAGLINES.length));
    setCycle((n) => n + 1);

    const t = setInterval(() => {
      setI((prev) => pickRandom(prev, TAGLINES.length));
      setCycle((n) => n + 1);
    }, ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const [head, tail] = splitHeadline(TAGLINES[i]);

  return (
    <h1 data-testid="hero-title" className="relative">
      {/* SEO + screen-reader stable headline */}
      <span className="sr-only">
        Accutek Solar — local solar, ground-mount and electrical contractor
        serving Indiana and Illinois since 1994.
      </span>

      {/* Visual rotating slot — fixed minimum height = no layout shift */}
      <span
        aria-hidden="true"
        className="relative block min-h-[16rem] sm:min-h-[15rem] md:min-h-[17rem] lg:min-h-[20rem] overflow-hidden"
      >
        <span
          key={cycle}
          className="rh-line absolute top-0 left-0 right-0 block font-heading font-black tracking-tight leading-[1.04] text-balance text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl"
          data-testid={`hero-title-line-${i}`}
        >
          {head && <span className="text-foreground">{head}</span>}
          {head && " "}
          <span className="text-primary">{tail}</span>
        </span>
      </span>
    </h1>
  );
}
