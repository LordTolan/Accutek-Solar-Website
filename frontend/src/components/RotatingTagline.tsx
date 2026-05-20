"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
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
];

const ROTATE_MS = 3000;

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
          15%  { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-110%); }
        }
        .rt-line {
          animation: rt-in ${ROTATE_MS}ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>

      <div
        className="flex items-center gap-3 mt-3 mb-5 w-full"
        aria-live="polite"
        data-testid="rotating-tagline"
      >
        {/* Pulse indicator */}
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
        </span>

        {/* Fixed-height slot to prevent layout shift */}
        <div className="relative flex-1 min-w-0 h-8 md:h-9 overflow-hidden">
          <span
            key={i}
            className="rt-line absolute inset-0 flex items-center font-heading text-lg md:text-xl font-extrabold tracking-tight whitespace-nowrap"
            data-testid={`rotating-tagline-line-${i}`}
          >
            <span className="text-primary mr-2 font-mono text-base md:text-lg">→</span>
            <span className="text-primary">{TAGLINES[i]}</span>
          </span>
        </div>
      </div>
    </>
  );
}
