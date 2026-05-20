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

const ROTATE_MS = 3400; // a touch slower to give long lines time to read

export default function RotatingTagline() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % TAGLINES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes rt-in {
          0%   { opacity: 0; transform: translateY(110%); }
          14%  { opacity: 1; transform: translateY(0); }
          86%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-110%); }
        }
        .rt-line {
          animation: rt-in ${ROTATE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          .rt-line { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      <div
        className="flex items-start gap-3 mt-3 mb-5 w-full"
        aria-live="polite"
        data-testid="rotating-tagline"
      >
        {/* Pulse indicator */}
        <span className="relative flex h-2.5 w-2.5 mt-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>

        {/* Variable-height slot — fits 1-3 lines without layout shift */}
        <div className="relative flex-1 min-w-0 min-h-[4.5rem] md:min-h-[3.5rem] overflow-hidden">
          <span
            key={i}
            className="rt-line absolute top-0 left-0 right-0 font-heading text-base md:text-lg font-extrabold tracking-tight leading-snug text-balance"
            data-testid={`rotating-tagline-line-${i}`}
          >
            <span className="text-primary mr-2 font-mono text-base md:text-lg align-middle">→</span>
            <span className="text-primary">{TAGLINES[i]}</span>
          </span>
        </div>
      </div>
    </>
  );
}
