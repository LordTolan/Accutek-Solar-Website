"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TourPhase } from "./useSunnyBounceTour";
import { OFFER_ACCEPT, OFFER_LEAD, type OfferPlace } from "./sunnyTour";

interface SunnyTourControlsProps {
  phase: TourPhase;
  offerPlace: OfferPlace;
  offerText: string;
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
  offerPlace,
  offerText,
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

  const [dockLift, setDockLift] = useState(24);
  const docked = phase === "offer" && offerPlace === "dock";

  useEffect(() => {
    if (phase === "offer" && offerPlace === "center") acceptRef.current?.focus({ preventScroll: true });
  }, [phase, offerPlace]);

  useLayoutEffect(() => {
    if (!docked) return;
    const measure = () => {
      const sticky = document.querySelector<HTMLElement>("[data-testid='sticky-mobile-cta']");
      const box = sticky?.getBoundingClientRect();
      const shown = !!sticky && getComputedStyle(sticky).display !== "none" && !!box && box.height > 8;
      const next = shown && box ? Math.round(box.height + 8) : 24;
      setDockLift((prev) => (prev === next ? prev : next));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [docked]);

  useLayoutEffect(() => {
    if (!docked) return;
    const bar = document.querySelector<HTMLElement>("[data-testid='sunny-tour-controls']");
    const root = document.querySelector("[data-sunny-tour]");
    if (!bar || !root) return;
    const band = bar.getBoundingClientRect();
    const gap = 16;
    let overlap = 0;
    root.querySelectorAll<HTMLElement>("input, button, a, [data-sunny-step]").forEach((node) => {
      const style = getComputedStyle(node);
      if (style.display === "none" || style.visibility === "hidden") return;
      const rect = node.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      const hits =
        rect.left < band.right - 2 &&
        rect.right > band.left + 2 &&
        rect.top < band.bottom &&
        rect.bottom > band.top - gap;
      if (hits) overlap = Math.max(overlap, rect.bottom - (band.top - gap));
    });
    if (overlap >= 8) window.scrollBy({ top: overlap, behavior: "auto" });
  }, [docked, dockLift]);

  useEffect(() => {
    if (phase !== "step" || stepIndex !== 0) return;
    const active = document.activeElement;
    if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;
    nextRef.current?.focus({ preventScroll: true });
  }, [phase, stepIndex]);

  if (phase === "idle") return null;

  if (phase === "offer" && offerPlace === "dock") {
    return (
      <div
        role="group"
        aria-label="Calculator tour"
        data-testid="sunny-tour-controls"
        data-offer-place="dock"
        style={{ bottom: dockLift }}
        className="fixed z-[45] left-3 right-[6.5rem] md:left-6 md:right-auto md:max-w-xl pointer-events-auto rounded-lg border border-border bg-background/95 px-3 py-2 shadow-ambient"
      >
        <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-3">
          <div className="min-w-0">
            <p data-testid="sunny-tour-offer" className="text-xs font-medium leading-snug text-foreground">
              {OFFER_LEAD}
            </p>
            <p data-testid="sunny-tour-offer-value" className="text-xs leading-snug text-foreground/80">
              {offerText}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1.5">
            <button type="button" className={ghost} onClick={onSkip} data-testid="sunny-tour-skip">
              Skip
            </button>
            <button
              type="button"
              ref={acceptRef}
              className={`${primary} normal-case tracking-normal`}
              onClick={onAccept}
              aria-label={OFFER_ACCEPT}
              data-testid="sunny-tour-accept"
            >
              {OFFER_ACCEPT}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "offer") {
    return (
      <div className="fixed inset-0 z-[45] flex items-center justify-center p-4 pointer-events-none">
        <div
          role="group"
          aria-label="Calculator tour"
          data-testid="sunny-tour-controls"
          data-offer-place="center"
          className="pointer-events-auto w-full max-w-md rounded-xl border border-border bg-background/95 px-4 py-4 text-center shadow-ambient"
        >
          <p data-testid="sunny-tour-offer" className="text-sm font-medium leading-snug text-foreground">
            {OFFER_LEAD}
          </p>
          <p data-testid="sunny-tour-offer-value" className="mt-2 text-sm leading-snug text-foreground/80">
            {offerText}
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
            <button type="button" className={ghost} onClick={onSkip} data-testid="sunny-tour-skip">
              Skip
            </button>
            <button
              type="button"
              ref={acceptRef}
              className={`${primary} normal-case tracking-normal`}
              onClick={onAccept}
              aria-label={OFFER_ACCEPT}
              data-testid="sunny-tour-accept"
            >
              {OFFER_ACCEPT}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Calculator tour"
      data-testid="sunny-tour-controls"
      className="fixed z-[45] left-3 md:left-6 bottom-[4.75rem] md:bottom-6 flex max-w-[calc(100vw-6.5rem)] flex-wrap items-center justify-center gap-1.5 rounded-lg border border-border bg-background/95 px-2 py-1.5 shadow-ambient"
    >
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
    </div>
  );
}
