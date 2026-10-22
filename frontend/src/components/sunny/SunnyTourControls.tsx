"use client";

import { useEffect, useRef } from "react";
import type { TourPhase } from "./useSunnyBounceTour";

interface SunnyTourControlsProps {
  phase: TourPhase;
  stepIndex: number;
  stepCount: number;
  onAccept: () => void;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const ghost =
  "rounded-md border border-border bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 focus-ring disabled:opacity-40";
const primary =
  "rounded-md bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground focus-ring";

export default function SunnyTourControls({
  phase,
  stepIndex,
  stepCount,
  onAccept,
  onNext,
  onBack,
  onSkip,
}: SunnyTourControlsProps) {
  const acceptRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const last = stepCount > 0 && stepIndex >= stepCount - 1;

  useEffect(() => {
    if (phase === "offer") acceptRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (phase !== "step" || stepIndex !== 0) return;
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
    nextRef.current?.focus({ preventScroll: true });
  }, [phase, stepIndex]);

  if (phase === "idle") return null;

  return (
    <div
      role="group"
      aria-label="Calculator tour"
      data-testid="sunny-tour-controls"
      className="fixed z-[45] left-1/2 top-[4.5rem] md:top-24 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 rounded-lg border border-border bg-background/95 px-2 py-1.5 shadow-ambient"
    >
      {phase === "offer" ? (
        <>
          <button type="button" className={ghost} onClick={onSkip} data-testid="sunny-tour-skip">
            Skip
          </button>
          <button
            type="button"
            ref={acceptRef}
            className={`${primary} normal-case tracking-normal`}
            onClick={onAccept}
            data-testid="sunny-tour-accept"
          >
            Show me how this works
          </button>
        </>
      ) : (
        <>
          <span className="px-1 font-mono text-[10px] text-muted-foreground" aria-hidden="true">
            {stepIndex + 1}/{stepCount}
          </span>
          <button type="button" className={ghost} onClick={onSkip} data-testid="sunny-tour-skip">
            Skip
          </button>
          <button
            type="button"
            className={ghost}
            onClick={onBack}
            disabled={stepIndex === 0}
            data-testid="sunny-tour-back"
          >
            Back
          </button>
          <button type="button" ref={nextRef} className={primary} onClick={onNext} data-testid="sunny-tour-next">
            {last ? "Done" : "Next"}
          </button>
        </>
      )}
    </div>
  );
}
