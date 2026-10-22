"use client";

import type { ArrowCue, Box } from "./sunnyTour";

interface SunnyTourCueProps {
  target: Box;
  radius: string;
  arrow: ArrowCue | null;
}

/** Outline the target and, when the gap is clear, a short arrow from Sunny toward it. */
export default function SunnyTourCue({ target, radius, arrow }: SunnyTourCueProps) {
  return (
    <>
      <div
        data-testid="sunny-tour-ring"
        aria-hidden="true"
        className="pointer-events-none fixed z-[35]"
        style={{
          left: target.left,
          top: target.top,
          width: target.width,
          height: target.height,
          borderRadius: radius,
          boxShadow: "0 0 0 2px rgba(251, 191, 36, 0.95), 0 0 0 5px rgba(251, 191, 36, 0.22)",
        }}
      />
      {arrow ? (
        <div
          data-testid="sunny-tour-arrow"
          aria-hidden="true"
          className="pointer-events-none fixed z-[39]"
          style={{
            left: arrow.x,
            top: arrow.y,
            transform: `translate(-50%, -50%) rotate(${arrow.deg}deg)`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path
              d="M2 9h10M8 4l5 5-5 5"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ) : null}
    </>
  );
}
