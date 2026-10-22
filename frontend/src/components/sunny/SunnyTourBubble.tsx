"use client";

import type { RefObject } from "react";
import type { BubblePlacement, SunnySide } from "./sunnyTour";

interface SunnyTourBubbleProps {
  text: string;
  width: number;
  placement: BubblePlacement | null;
  measureRef: RefObject<HTMLDivElement | null>;
}

function Tail({ side, at }: { side: SunnySide; at: number }) {
  const common = { position: "absolute" as const, width: 0, height: 0 };
  if (side === "left") {
    return (
      <span
        aria-hidden="true"
        style={{
          ...common,
          left: -8,
          top: `${at * 100}%`,
          transform: "translateY(-50%)",
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          borderRight: "8px solid #fff",
        }}
      />
    );
  }
  if (side === "right") {
    return (
      <span
        aria-hidden="true"
        style={{
          ...common,
          right: -8,
          top: `${at * 100}%`,
          transform: "translateY(-50%)",
          borderTop: "7px solid transparent",
          borderBottom: "7px solid transparent",
          borderLeft: "8px solid #fff",
        }}
      />
    );
  }
  if (side === "above") {
    return (
      <span
        aria-hidden="true"
        style={{
          ...common,
          top: -8,
          left: `${at * 100}%`,
          transform: "translateX(-50%)",
          borderLeft: "7px solid transparent",
          borderRight: "7px solid transparent",
          borderBottom: "8px solid #fff",
        }}
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{
        ...common,
        bottom: -8,
        left: `${at * 100}%`,
        transform: "translateX(-50%)",
        borderLeft: "7px solid transparent",
        borderRight: "7px solid transparent",
        borderTop: "8px solid #fff",
      }}
    />
  );
}

/** Short note attached to Sunny. The tail points at her. Screen readers use the live region. */
export default function SunnyTourBubble({ text, width, placement, measureRef }: SunnyTourBubbleProps) {
  return (
    <div
      ref={measureRef}
      data-testid="sunny-tour-bubble"
      aria-hidden="true"
      className="pointer-events-none absolute z-10 max-w-[calc(100vw-1rem)] rounded-2xl border border-amber-300 bg-white px-3 py-2 text-[13px] font-medium leading-snug text-slate-900 shadow-lg"
      style={{
        width,
        left: placement?.relLeft ?? 0,
        top: placement?.relTop ?? 0,
        visibility: placement ? "visible" : "hidden",
      }}
    >
      {text}
      {placement ? <Tail side={placement.tail} at={placement.tailAt} /> : null}
    </div>
  );
}
