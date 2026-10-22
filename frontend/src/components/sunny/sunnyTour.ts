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
  /** Visible speech-bubble copy. Same words are announced. Never a dollar amount or a payback figure. */
  bubble: string;
  /** Bubble used when the resolved target is not the mobile Free Quote button. */
  alternateBubble?: string;
  /** Used when the resolved target is not the mobile Free Quote button. */
  alternateLabel?: string;
  /** Prefer a visible global fallback (the sticky Free Quote bar) before in-section targets. */
  preferFallback?: boolean;
  fallbacks?: string[];
  /** Soft preference. A clear spot on another side wins over a preference that would cover text. */
  side?: SunnySide;
  /** Extra clear space to keep on the preferred side, in pixels. */
  room?: number;
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
    // Prefix only. `/` and `/backup-power` each append their path so one visit cannot hide the other.
    storageKey: "accutek.sunnyTour.utility",
    root: '[data-sunny-tour="utility"]',
    steps: [
      {
        key: "slider",
        label: "Drag the slider to your usual monthly bill.",
        bubble: "Slide this to match your usual monthly electric bill.",
        side: "below",
      },
      {
        key: "total",
        label: "This big number is what you would pay the utility over 30 years at that bill.",
        bubble: "This is roughly what you'd pay your utility over 30 years if rates keep rising.",
        side: "right",
      },
      {
        key: "boxes",
        label: "These two boxes show what you pay per year now and an estimated monthly bill in year 30.",
        bubble: "One box is a year of bills at today's rate. The other is a monthly estimate for year 30.",
        side: "above",
      },
      {
        key: "calculator",
        label: "Want to see what solar could save you? Tap here to try our solar savings calculator.",
        bubble: "Want to see what solar could save you? Tap here to try our solar savings calculator.",
        side: "below",
        room: 270,
      },
      {
        key: "quote",
        label: "Want your real numbers? Tap here for a free quote and a site visit.",
        bubble: "Want your real numbers? Tap here for a free quote and a site visit.",
        side: "below",
        room: 180,
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
        bubble: "Slide this to match your average monthly electric bill.",
        side: "below",
      },
      {
        key: "total",
        label: "This is the 25-year savings total for the bill you set.",
        bubble: "This is a 25-year savings estimate for the bill you set.",
        side: "right",
      },
      {
        key: "boxes",
        label: "These boxes show the annual estimate, the system size, and the payback time.",
        bubble:
          "Annual is a yearly estimate. System size is how big the array looks. Payback is how long that estimate takes to earn its keep.",
        side: "above",
      },
      {
        key: "quote",
        label: "Tap here to ask the Accutek Solar team for your real numbers.",
        bubble: "Want your real numbers? Tap here for a free quote and a site visit.",
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
  // "could save you?" is the calculator invitation. A figure after it is still banned.
  /\bsave you\s+(?:\$|\d)/i,
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

export function bubbleForResolvedStep(step: TourStep, testId: string | null): string {
  if (step.alternateBubble && testId !== "sticky-quote") return step.alternateBubble;
  return step.bubble;
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
  /** Speech bubble beside Sunny. Null when no clear spot exists at this size. */
  bubble: BubblePlacement | null;
}

export interface BubblePlacement {
  box: Box;
  /** Edge of the bubble that faces Sunny. The tail sits on this edge. */
  tail: SunnySide;
  /** 0–1 along that edge, aimed at Sunny's center. */
  tailAt: number;
  /** Bubble origin minus Sunny's origin, so the bubble can ride her spring. */
  relLeft: number;
  relTop: number;
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
  /** When set, prefer a Sunny spot that also fits this bubble in clear space. */
  bubbleSize?: { width: number; height: number };
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

  if (args.bubbleSize && args.bubbleSize.width > 8 && args.bubbleSize.height > 8) {
    let winner: { box: Box; score: number; bubble: BubblePlacement } | null = null;
    for (const spot of clear) {
      const bubble = placeBubble({
        sunny: spot.box,
        target,
        size: args.bubbleSize,
        viewport,
        obstacles,
        blocked,
        minTop,
        maxBottom,
      });
      if (!bubble) continue;
      const score = spot.score + bubble.rank;
      if (!winner || score < winner.score) winner = { box: spot.box, score, bubble: bubble.placement };
    }
    if (winner) {
      const box = winner.box;
      return { x: box.left - home.left, y: box.top - home.top, box, side: sideOf(box, target), bubble: winner.bubble };
    }
  }

  const box = pool[0].box;
  return { x: box.left - home.left, y: box.top - home.top, box, side: sideOf(box, target), bubble: null };
}

function oppositeSide(side: SunnySide): SunnySide {
  if (side === "left") return "right";
  if (side === "right") return "left";
  if (side === "above") return "below";
  return "above";
}

function tailAt(box: Box, tail: SunnySide, sunny: Box): number {
  const along =
    tail === "left" || tail === "right"
      ? (sunny.top + sunny.height / 2 - box.top) / box.height
      : (sunny.left + sunny.width / 2 - box.left) / box.width;
  return Math.min(0.82, Math.max(0.18, along));
}

/**
 * Park the speech bubble against Sunny, tail toward her, off the target and off text.
 * `rank` is a tie-break used by placeSunny (lower is better).
 */
export function placeBubble(args: {
  sunny: Box;
  target: Box;
  size: { width: number; height: number };
  viewport: { width: number; height: number };
  obstacles: Box[];
  blocked: Box[];
  minTop?: number;
  maxBottom?: number;
}): { placement: BubblePlacement; rank: number } | null {
  const { sunny, target, size, viewport, obstacles, blocked } = args;
  const minTop = args.minTop ?? 0;
  const maxBottom = args.maxBottom ?? viewport.height;
  const width = size.width;
  const height = size.height;
  const edge = 8;
  const gap = 12;
  const maxLeft = viewport.width - width - edge;
  const maxTop = maxBottom - height;
  if (maxLeft < edge || maxTop < minTop) return null;

  const away = oppositeSide(sideOf(sunny, target));
  const alongY = [sunny.top, sunny.top + (sunny.height - height) / 2, sunny.top + sunny.height - height];
  const alongX = [sunny.left, sunny.left + (sunny.width - width) / 2, sunny.left + sunny.width - width];
  const spots: { box: Box; tail: SunnySide }[] = [];
  for (const top of alongY) {
    spots.push({ box: { left: sunny.left + sunny.width + gap, top, width, height }, tail: "left" });
    spots.push({ box: { left: sunny.left - width - gap, top, width, height }, tail: "right" });
  }
  for (const left of alongX) {
    spots.push({ box: { left, top: sunny.top + sunny.height + gap, width, height }, tail: "above" });
    spots.push({ box: { left, top: sunny.top - height - gap, width, height }, tail: "below" });
  }

  let winner: { placement: BubblePlacement; rank: number } | null = null;
  for (const spot of spots) {
    const left = Math.min(Math.max(spot.box.left, edge), maxLeft);
    const top = Math.min(Math.max(spot.box.top, minTop), maxTop);
    if (Math.abs(left - spot.box.left) > 36 || Math.abs(top - spot.box.top) > 36) continue;
    const box = { left, top, width, height };
    if (overlapArea(box, sunny) > 1) continue;
    if (gapDistance(box, sunny) > 40) continue;
    if (overlapArea(box, inflate(target, 8)) > 1) continue;
    const textOverlap = obstacles.reduce((sum, obstacle) => sum + overlapArea(box, inflate(obstacle, 6)), 0);
    const blockOverlap = blocked.reduce((sum, obstacle) => sum + overlapArea(box, inflate(obstacle, 6)), 0);
    if (textOverlap > 1 || blockOverlap > 1) continue;
    const rank = gapDistance(box, sunny) + (spot.tail === away ? 0 : 48);
    if (winner && rank >= winner.rank) continue;
    winner = {
      rank,
      placement: {
        box,
        tail: spot.tail,
        tailAt: tailAt(box, spot.tail, sunny),
        relLeft: box.left - sunny.left,
        relTop: box.top - sunny.top,
      },
    };
  }
  return winner;
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

/** Drop a trailing slash so `/backup-power` and `/backup-power/` share one flag. Root stays `/`. */
export function normalizeTourPath(pathname?: string | null): string {
  const raw = (pathname || "/").split("?")[0].split("#")[0] || "/";
  if (raw.length > 1 && raw.endsWith("/")) return raw.slice(0, -1);
  return raw || "/";
}

/**
 * Once-per-visitor key. The utility calculator is mounted on `/` and `/backup-power`,
 * so those routes must not share a flag or the second page never starts the tour.
 * The savings calculator lives on one route and keeps a single key.
 */
export function tourStorageKey(id: TourId, pathname?: string | null): string {
  const base = TOURS[id].storageKey;
  if (id !== "utility") return base;
  return `${base}:${normalizeTourPath(pathname)}`;
}

export function readTourSeen(
  id: TourId,
  storage?: Pick<Storage, "getItem">,
  pathname?: string | null
): boolean {
  const key = tourStorageKey(id, pathname);
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

export function writeTourSeen(
  id: TourId,
  storage?: Pick<Storage, "setItem">,
  pathname?: string | null
): void {
  const key = tourStorageKey(id, pathname);
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
      assertTourCopy(step.bubble);
      assertTourCopy(stepAnnouncement(index, tour.steps.length, step.bubble));
      if (step.alternateLabel) {
        assertTourCopy(step.alternateLabel);
        assertTourCopy(stepAnnouncement(index, tour.steps.length, step.alternateLabel));
      }
      if (step.alternateBubble) {
        assertTourCopy(step.alternateBubble);
        assertTourCopy(stepAnnouncement(index, tour.steps.length, step.alternateBubble));
      }
    });
  }
}

assertAllTourCopy();
