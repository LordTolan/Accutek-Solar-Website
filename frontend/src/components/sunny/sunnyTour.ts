/**
 * Sunny calculator tours.
 * Sunny may only name each control and how to use it.
 * Copy must not include dollar amounts, Accutek pricing, system costs,
 * or savings promises. Cost questions stay with Free Quote and the team.
 */

export type TourId = "utility" | "savings";

export interface TourStep {
  key: string;
  /** Screen-reader instruction. Never a dollar amount. */
  label: string;
  /** Used when the resolved target is not the mobile Free Quote button. */
  alternateLabel?: string;
  /** Prefer a visible global fallback (the sticky Free Quote bar) before in-section targets. */
  preferFallback?: boolean;
  fallbacks?: string[];
}

export interface TourDefinition {
  id: TourId;
  storageKey: string;
  root: string;
  steps: TourStep[];
}

export const OFFER_TEXT = "Want me to show you how this works?";
export const DONE_TEXT = "Tour finished. You can replay it from Sunny.";
export const SKIP_TEXT = "Tour closed. You can replay it from Sunny.";
export const FALLBACK_TEXT = "Here is the next part of the calculator.";

export const TOURS: Record<TourId, TourDefinition> = {
  utility: {
    id: "utility",
    storageKey: "accutek.sunnyTour.utility",
    root: '[data-sunny-tour="utility"]',
    steps: [
      {
        key: "slider",
        label: "Drag the slider to your usual monthly bill.",
      },
      {
        key: "total",
        label: "This big number is what you would pay the utility over 30 years at that bill.",
      },
      {
        key: "boxes",
        label: "These two boxes show what you pay per year now and an estimated monthly bill in year 30.",
      },
      {
        key: "quote",
        label: "Tap Free Quote for your real numbers.",
        alternateLabel: "Tap the quote button for your real numbers.",
        preferFallback: true,
        fallbacks: ['[data-testid="sticky-quote"]'],
      },
    ],
  },
  savings: {
    id: "savings",
    storageKey: "accutek.sunnyTour.savings",
    root: '[data-sunny-tour="savings"]',
    steps: [
      {
        key: "slider",
        label: "Drag the slider to your average monthly electric bill.",
      },
      {
        key: "total",
        label: "This is the 25-year savings total for the bill you set.",
      },
      {
        key: "boxes",
        label: "These boxes show the annual estimate, the system size, and the payback time.",
      },
      {
        key: "quote",
        label: "Tap here to ask the Accutek Solar team for your real numbers.",
      },
    ],
  },
};

const BANNED: RegExp[] = [
  /\$/,
  /\bpricing\b/i,
  /\bper watt\b/i,
  /\bhow much\b/i,
  /\bsystem costs?\b/i,
  /\bsolar costs?\b/i,
  /\byou(?:'ll| will) save\b/i,
  /\bsave you\b/i,
  /\bguarantee/i,
  /\b\d{1,3},\d{3}\b/,
];

export function assertTourCopy(text: string): void {
  for (const pattern of BANNED) {
    if (pattern.test(text)) {
      throw new Error(`Sunny tour copy is not allowed to discuss price or dollar amounts: ${text}`);
    }
  }
}

export function stepAnnouncement(index: number, count: number, label: string): string {
  return `Step ${index + 1} of ${count}. ${label}`;
}

export function labelForResolvedStep(step: TourStep, testId: string | null): string {
  if (step.alternateLabel && testId !== "sticky-quote") return step.alternateLabel;
  return step.label;
}

export function isTourId(value: string | null | undefined): value is TourId {
  return value === "utility" || value === "savings";
}

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function unionRect(rects: Box[]): Box {
  const left = Math.min(...rects.map((r) => r.left));
  const top = Math.min(...rects.map((r) => r.top));
  const right = Math.max(...rects.map((r) => r.left + r.width));
  const bottom = Math.max(...rects.map((r) => r.top + r.height));
  return { left, top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) };
}

export type SunnyAnchor = "above" | "corner" | "start";

/**
 * Park Sunny on a target without covering its label or value.
 * "above" sits over the middle. "corner" kisses the top-right of a short number.
 * "start" sits on the left of a slider so the amount on the right stays visible.
 * Returned x/y are a translate from Sunny's home corner.
 */
export function sunnyOffset(
  home: Box,
  target: Box,
  viewport: { width: number; height: number },
  minTop = 0,
  anchor: SunnyAnchor = "above"
): { x: number; y: number } {
  const size = home.width > 0 ? home.width : 64;
  const pad = 8;
  let left: number;
  let top: number;
  if (anchor === "start") {
    left = target.left - size * 0.15;
    top = target.top + target.height / 2 - size / 2;
  } else if (anchor === "corner") {
    left = target.left + target.width - size * 0.45;
    top = target.top - size * 0.82;
  } else {
    left = target.left + (target.width - size) / 2;
    top = target.top - size * 0.72;
  }
  const maxLeft = Math.max(pad, viewport.width - size - pad);
  const maxTop = Math.max(minTop, viewport.height - size - pad);
  left = Math.min(Math.max(left, pad), maxLeft);
  top = Math.min(Math.max(top, minTop), maxTop);
  return { x: left - home.left, y: top - home.top };
}

export function chooseStepElements<T>(
  rootMatches: T[],
  fallbackMatches: T[],
  preferFallback: boolean,
  isVisible: (el: T) => boolean
): T[] {
  if (preferFallback) {
    const fallback = fallbackMatches.filter(isVisible);
    if (fallback.length) return [fallback[0]];
  }
  const inside = rootMatches.filter(isVisible);
  if (inside.length) return inside;
  const fallback = fallbackMatches.filter(isVisible);
  return fallback.length ? [fallback[0]] : [];
}

const memorySeen = new Set<string>();

export function readTourSeen(id: TourId, storage?: Pick<Storage, "getItem">): boolean {
  const key = TOURS[id].storageKey;
  if (storage) {
    try {
      return storage.getItem(key) === "1";
    } catch {
      return false;
    }
  }
  try {
    if (typeof localStorage !== "undefined") return localStorage.getItem(key) === "1";
  } catch {
    return memorySeen.has(key);
  }
  return memorySeen.has(key);
}

export function writeTourSeen(id: TourId, storage?: Pick<Storage, "setItem">): void {
  const key = TOURS[id].storageKey;
  if (storage) {
    try {
      storage.setItem(key, "1");
    } catch {
      /* ignore quota / private mode */
    }
    return;
  }
  try {
    if (typeof localStorage === "undefined") {
      memorySeen.add(key);
      return;
    }
    localStorage.setItem(key, "1");
  } catch {
    memorySeen.add(key);
  }
}

/** Test helper. Production tours use localStorage plus the in-memory set. */
export function clearTourMemory(): void {
  memorySeen.clear();
}

export type TourForceMode = "offer" | "replay";

export function tourForceMode(search = ""): TourForceMode | null {
  const value = new URLSearchParams(search).get("sunnyTour");
  if (value === "1" || value === "offer") return "offer";
  if (value === "replay") return "replay";
  return null;
}

export function assertAllTourCopy(): void {
  assertTourCopy(OFFER_TEXT);
  assertTourCopy(DONE_TEXT);
  assertTourCopy(SKIP_TEXT);
  assertTourCopy(FALLBACK_TEXT);
  for (const tour of Object.values(TOURS)) {
    tour.steps.forEach((step, index) => {
      assertTourCopy(step.label);
      assertTourCopy(stepAnnouncement(index, tour.steps.length, step.label));
      if (step.alternateLabel) {
        assertTourCopy(step.alternateLabel);
        assertTourCopy(stepAnnouncement(index, tour.steps.length, step.alternateLabel));
      }
    });
  }
}

assertAllTourCopy();
