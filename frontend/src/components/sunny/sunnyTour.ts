/**
 * Sunny calculator tours.
 * Sunny may only name each control and how to use it.
 * Copy must not include dollar amounts, Accutek pricing, system costs,
 * or savings promises. Cost questions stay with Free Quote and the team.
 */

export type TourId = "utility" | "savings";

export type SunnySide = "above" | "below" | "left" | "right";

export interface TourStep {
  key: string;
  /** Screen-reader instruction. Never a dollar amount. */
  label: string;
  /** Used when the resolved target is not the mobile Free Quote button. */
  alternateLabel?: string;
  /** Prefer a visible global fallback (the sticky Free Quote bar) before in-section targets. */
  preferFallback?: boolean;
  fallbacks?: string[];
  /** Soft preference. A clear spot on another side wins over a preference that would cover text. */
  side?: SunnySide;
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
        side: "below",
      },
      {
        key: "total",
        label: "This big number is what you would pay the utility over 30 years at that bill.",
        side: "right",
      },
      {
        key: "boxes",
        label: "These two boxes show what you pay per year now and an estimated monthly bill in year 30.",
        side: "above",
      },
      {
        key: "quote",
        label: "Tap Free Quote for your real numbers.",
        alternateLabel: "Tap the quote button for your real numbers.",
        preferFallback: true,
        fallbacks: ['[data-testid="sticky-quote"]'],
        side: "above",
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
        side: "below",
      },
      {
        key: "total",
        label: "This is the 25-year savings total for the bill you set.",
        side: "right",
      },
      {
        key: "boxes",
        label: "These boxes show the annual estimate, the system size, and the payback time.",
        side: "above",
      },
      {
        key: "quote",
        label: "Tap here to ask the Accutek Solar team for your real numbers.",
        side: "below",
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

export interface Placement {
  /** Translate from Sunny's parked corner to this spot. */
  x: number;
  y: number;
  box: Box;
  side: SunnySide;
}

export interface ArrowCue {
  /** Viewport center of a short arrow that sits in the gap, pointing at the target. */
  x: number;
  y: number;
  deg: number;
}

export function intersection(a: Box, b: Box): Box | null {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.left + a.width, b.left + b.width);
  const bottom = Math.min(a.top + a.height, b.top + b.height);
  if (right <= left || bottom <= top) return null;
  return { left, top, width: right - left, height: bottom - top };
}

export function overlapArea(a: Box, b: Box): number {
  const hit = intersection(a, b);
  return hit ? hit.width * hit.height : 0;
}

function inflate(box: Box, pad: number): Box {
  return {
    left: box.left - pad,
    top: box.top - pad,
    width: box.width + pad * 2,
    height: box.height + pad * 2,
  };
}

function gapDistance(a: Box, b: Box): number {
  const dx = Math.max(0, Math.max(a.left - (b.left + b.width), b.left - (a.left + a.width)));
  const dy = Math.max(0, Math.max(a.top - (b.top + b.height), b.top - (a.top + a.height)));
  return Math.hypot(dx, dy);
}

function sideOf(sunny: Box, target: Box): SunnySide {
  const overlapsX = sunny.left < target.left + target.width && sunny.left + sunny.width > target.left;
  const overlapsY = sunny.top < target.top + target.height && sunny.top + sunny.height > target.top;
  if (overlapsX && !overlapsY) return sunny.top + sunny.height <= target.top + 1 ? "above" : "below";
  if (overlapsY && !overlapsX) return sunny.left + sunny.width <= target.left + 1 ? "left" : "right";
  const dx = sunny.left + sunny.width / 2 - (target.left + target.width / 2);
  const dy = sunny.top + sunny.height / 2 - (target.top + target.height / 2);
  if (Math.abs(dx) > Math.abs(dy)) return dx < 0 ? "left" : "right";
  return dy < 0 ? "above" : "below";
}

function hits(box: Box, obstacles: Box[]): boolean {
  return obstacles.some((obstacle) => overlapArea(box, obstacle) > 0.5);
}

/**
 * Park Sunny beside a target, in a gap that does not cover text, numbers, or controls.
 * x/y are a translate from her parked corner. She stays fully on screen.
 */
export function placeSunny(args: {
  home: Box;
  target: Box;
  viewport: { width: number; height: number };
  /** Glyphs and figures. Sunny may not intersect these. */
  obstacles: Box[];
  /** Header, tour controls, buttons, links, and inputs. */
  blocked: Box[];
  minTop?: number;
  maxBottom?: number;
  prefer?: SunnySide;
}): Placement | null {
  const { home, target, viewport, obstacles, blocked, prefer } = args;
  const minTop = args.minTop ?? 0;
  const maxBottom = args.maxBottom ?? viewport.height;
  const width = home.width > 0 ? home.width : 70;
  const height = home.height > 0 ? home.height : 70;
  const edge = 8;
  const maxLeft = viewport.width - width - edge;
  const maxTop = maxBottom - height;
  if (maxLeft < edge || maxTop < minTop) return null;

  const make = (left: number, top: number): Box => ({ left, top, width, height });
  const spots: Box[] = [];
  const alignmentsX = [target.left, target.left + (target.width - width) / 2, target.left + target.width - width];
  const alignmentsY = [target.top, target.top + (target.height - height) / 2, target.top + target.height - height];
  const gaps = [16, 24, 34, 46, 62, 82, 108];

  for (const gap of gaps) {
    for (const left of alignmentsX) {
      spots.push(make(left, target.top + target.height + gap));
      spots.push(make(left, target.top - height - gap));
    }
    for (const top of alignmentsY) {
      spots.push(make(target.left + target.width + gap, top));
      spots.push(make(target.left - width - gap, top));
    }
  }

  // A target that hangs below the clear band still gets a spot on the band edge, above the target.
  if (target.top > maxTop) {
    const top = Math.min(maxTop, target.top - height - 16);
    if (top >= minTop && top + height <= target.top + 1) {
      for (const left of alignmentsX) spots.push(make(left, top));
    }
  }

  const scored: { box: Box; score: number; clear: boolean; coversTarget: boolean }[] = [];
  for (const raw of spots) {
    const left = Math.min(Math.max(raw.left, edge), maxLeft);
    const top = Math.min(Math.max(raw.top, minTop), maxTop);
    // Sliding a long way pulls Sunny onto the target. Keep the spot she was given.
    if (Math.abs(left - raw.left) > 6 || Math.abs(top - raw.top) > 6) continue;
    const box = make(left, top);
    const textOverlap = obstacles.reduce((sum, obstacle) => sum + overlapArea(box, inflate(obstacle, 10)), 0);
    const blockOverlap = blocked.reduce((sum, obstacle) => sum + overlapArea(box, inflate(obstacle, 8)), 0);
    const dist = gapDistance(box, target);
    if (dist > 160) continue;
    let nearestText = 40;
    for (const obstacle of obstacles) nearestText = Math.min(nearestText, gapDistance(box, obstacle));
    const nearText = Math.max(0, 22 - nearestText) * 5;
    const preferPenalty = prefer && sideOf(box, target) !== prefer ? 36 : 0;
    const onTarget = overlapArea(box, inflate(target, 14));
    const coversTarget = overlapArea(box, target) > 1;
    scored.push({
      box,
      coversTarget,
      clear: textOverlap < 1 && blockOverlap < 1 && onTarget < 1,
      score: textOverlap * 80 + blockOverlap * 80 + onTarget * 4 + dist + preferPenalty + nearText,
    });
  }

  const offTarget = scored.filter((spot) => !spot.coversTarget);
  const clear = offTarget.filter((spot) => spot.clear);
  const pool = clear.length ? clear : offTarget;
  if (!pool.length) return null;
  pool.sort((a, b) => a.score - b.score);
  const box = pool[0].box;
  return { x: box.left - home.left, y: box.top - home.top, box, side: sideOf(box, target) };
}

/** Short arrow in the gap between Sunny and the target. Null when that gap is not clear. */
export function arrowCue(sunny: Box, target: Box, blocked: Box[]): ArrowCue | null {
  const scx = sunny.left + sunny.width / 2;
  const scy = sunny.top + sunny.height / 2;
  const tcx = target.left + target.width / 2;
  const tcy = target.top + target.height / 2;
  const angle = Math.atan2(tcy - scy, tcx - scx);
  const radius = Math.min(sunny.width, sunny.height) / 2;
  const distance = Math.hypot(tcx - scx, tcy - scy);
  const reach = Math.min(16, distance - radius - 8);
  if (reach < 8) return null;
  const cx = scx + Math.cos(angle) * (radius + reach / 2);
  const cy = scy + Math.sin(angle) * (radius + reach / 2);
  const glyph = { left: cx - 11, top: cy - 11, width: 22, height: 22 };
  if (hits(glyph, blocked) || overlapArea(glyph, inflate(target, 12)) > 0) return null;
  return { x: cx, y: cy, deg: (angle * 180) / Math.PI };
}

/**
 * A gutter hop when the straight slide from `from` to `to` would cross text.
 * Returned x/y are translates from `home`. Null when the direct path is clear
 * or no clear gutter exists.
 */
export function clearVia(
  from: Box,
  to: Box,
  home: Box,
  obstacles: Box[],
  viewport: { width: number; height: number },
  minTop: number,
  maxBottom: number
): { x: number; y: number } | null {
  if (!pathHits(from, to, obstacles)) return null;
  const gutters = [viewport.width - to.width - 8, 8];
  for (const left of gutters) {
    const top = Math.min(Math.max(from.top, minTop), maxBottom - to.height);
    const box = { left, top, width: to.width, height: to.height };
    if (top < minTop || left < 8) continue;
    if (hits(box, obstacles)) continue;
    if (pathHits(from, box, obstacles) || pathHits(box, to, obstacles)) continue;
    return { x: box.left - home.left, y: box.top - home.top };
  }
  return null;
}

function pathHits(a: Box, b: Box, obstacles: Box[]): boolean {
  for (let step = 1; step < 6; step++) {
    const t = step / 6;
    const box = {
      left: a.left + (b.left - a.left) * t,
      top: a.top + (b.top - a.top) * t,
      width: a.width,
      height: a.height,
    };
    if (hits(box, obstacles)) return true;
  }
  return false;
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
