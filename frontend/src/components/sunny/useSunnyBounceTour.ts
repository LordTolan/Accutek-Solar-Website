"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DONE_TEXT,
  FALLBACK_TEXT,
  OFFER_TEXT,
  SKIP_TEXT,
  TOURS,
  type ArrowCue,
  type Box,
  type SunnySide,
  type TourId,
  arrowCue,
  assertTourCopy,
  chooseStepElements,
  clearVia,
  isTourId,
  bubbleForResolvedStep,
  placeSunny,
  type BubblePlacement,
  readTourSeen,
  stepAnnouncement,
  tourForceMode,
  unionRect,
  writeTourSeen,
} from "./sunnyTour";

interface UseSunnyBounceTourOptions {
  reducedMotion: boolean;
  /** Chat is open. Don't auto-offer over it. Replay still works. */
  suspended: boolean;
  homeRef: React.RefObject<HTMLElement | null>;
  bubbleRef: React.RefObject<HTMLElement | null>;
}

export type TourPhase = "idle" | "offer" | "step";

export interface TourCue {
  target: Box;
  radius: string;
  arrow: ArrowCue | null;
}

function isElementVisible(el: HTMLElement): boolean {
  const style = window.getComputedStyle(el);
  if (style.display === "none" || style.visibility === "hidden") return false;
  const rect = el.getBoundingClientRect();
  return rect.width >= 2 && rect.height >= 2;
}

function isFixedPosition(el: HTMLElement): boolean {
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    if (window.getComputedStyle(node).position === "fixed") return true;
    node = node.parentElement;
  }
  return false;
}

function clearBand(): { top: number; bottom: number } {
  const header = document.querySelector("header");
  const top = (header ? header.getBoundingClientRect().bottom : 0) + 8;
  let bottom = window.innerHeight - 8;
  const sticky = document.querySelector<HTMLElement>("[data-testid='sticky-mobile-cta']");
  if (sticky && isElementVisible(sticky)) bottom = Math.min(bottom, sticky.getBoundingClientRect().top - 12);
  const controls = document.querySelector<HTMLElement>("[data-testid='sunny-tour-controls']");
  if (controls && isElementVisible(controls)) bottom = Math.min(bottom, controls.getBoundingClientRect().top - 12);
  if (bottom < top + 48) bottom = top + 48;
  return { top, bottom };
}

/** Text inside a closed menu or other overflow clip still has a layout box. It is not on screen. */
function isClippedAway(el: Element, rect: DOMRect): boolean {
  let node = el.parentElement;
  while (node && node !== document.documentElement) {
    const style = window.getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") return true;
    const clip = node.getBoundingClientRect();
    if (style.overflowY !== "visible" && (rect.bottom <= clip.top + 0.5 || rect.top >= clip.bottom - 0.5)) return true;
    if (style.overflowX !== "visible" && (rect.right <= clip.left + 0.5 || rect.left >= clip.right - 0.5)) return true;
    node = node.parentElement;
  }
  return false;
}

function skipSunnyUi(el: Element | null): boolean {
  return !!el?.closest(
    "[data-testid='sunny-companion-container'], [data-testid='sunny-tour-controls'], #sunny-tour-status, [data-testid='sunny-tour-ring'], [data-testid='sunny-tour-arrow'], [data-testid='sunny-tour-bubble']"
  );
}

function collectScene(): { text: Box[]; blocked: Box[] } {
  const text: Box[] = [];
  const blocked: Box[] = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null = walker.nextNode();
  while (node) {
    const current = node;
    node = walker.nextNode();
    const value = current.textContent?.replace(/\s+/g, " ").trim();
    const parent = current.parentElement;
    if (!value || !parent || skipSunnyUi(parent)) continue;
    const tag = parent.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") continue;
    if (parent.closest(".sr-only")) continue;
    const range = document.createRange();
    range.selectNodeContents(current);
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width < 2 || rect.height < 2) continue;
      if (rect.bottom < -40 || rect.top > window.innerHeight + 40) continue;
      if (isClippedAway(parent, rect)) continue;
      text.push(toBox(rect));
    }
  }

  document.querySelectorAll<HTMLElement>("input, button, a, select, textarea").forEach((el) => {
    if (skipSunnyUi(el) || !isElementVisible(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.bottom < -20 || rect.top > window.innerHeight + 20) return;
    if (isClippedAway(el, rect)) return;
    // Range thumbs paint outside the input box. Keep Sunny and the arrow off the thumb.
    if (el.matches('input[type="range"]')) {
      blocked.push({ left: rect.left - 6, top: rect.top - 18, width: rect.width + 12, height: rect.height + 36 });
    } else {
      blocked.push(toBox(rect));
    }
  });

  document.querySelectorAll<HTMLElement>("[data-sunny-avoid]").forEach((el) => {
    if (!isElementVisible(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    if (rect.bottom < -40 || rect.top > window.innerHeight + 40) return;
    text.push(toBox(rect));
  });

  document.querySelectorAll<SVGTextElement>("svg text").forEach((el) => {
    if (!isElementVisible(el)) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    if (rect.bottom < -40 || rect.top > window.innerHeight + 40) return;
    text.push(toBox(rect));
  });

  const header = document.querySelector("header");
  if (header) blocked.push(toBox(header.getBoundingClientRect()));
  const controls = document.querySelector<HTMLElement>("[data-testid='sunny-tour-controls']");
  if (controls) blocked.push(toBox(controls.getBoundingClientRect()));
  return { text, blocked };
}

function toBox(rect: Pick<DOMRect, "left" | "top" | "width" | "height">): Box {
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
}

function inflateBox(box: Box, pad: number): Box {
  return { left: box.left - pad, top: box.top - pad, width: box.width + pad * 2, height: box.height + pad * 2 };
}

function collectStepElements(root: Element, stepKey: string, preferFallback: boolean, fallbacks: string[]): HTMLElement[] {
  const inside = Array.from(root.querySelectorAll<HTMLElement>(`[data-sunny-step="${stepKey}"]`));
  const outside = fallbacks.flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)));
  return chooseStepElements(inside, outside, preferFallback, isElementVisible);
}

function findTourRoot(id?: TourId | null): HTMLElement | null {
  if (id) return document.querySelector<HTMLElement>(TOURS[id].root);
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-sunny-tour]"));
  const viewH = window.innerHeight;
  const visible = nodes.find((node) => {
    const rect = node.getBoundingClientRect();
    return rect.bottom > viewH * 0.08 && rect.top < viewH * 0.92;
  });
  return visible ?? nodes[0] ?? null;
}

function scrollTargetIntoView(
  el: HTMLElement,
  reduced: boolean,
  side: SunnySide | undefined,
  root: Element,
  room = 96
) {
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
  const band = clearBand();
  if (isFixedPosition(el)) {
    const pocket = root.querySelector<HTMLElement>("[data-sunny-room='end']");
    const anchor = (pocket ?? root).getBoundingClientRect();
    // Sit the empty end pocket in the clear band so Sunny is not on the next section.
    const delta = (pocket ? anchor.top : anchor.bottom) - (band.bottom - 96);
    if (Math.abs(delta) > 12) window.scrollBy({ top: delta, behavior });
    return;
  }
  const rect = el.getBoundingClientRect();
  let { top, bottom } = band;
  if (side === "below" && bottom - top > rect.height + room + 24) bottom -= room;
  if (side === "above" && bottom - top > rect.height + room + 24) top += room;
  let delta = 0;
  if (rect.top < top) delta = rect.top - top;
  else if (rect.bottom > bottom) delta = rect.bottom - bottom;
  // Pull the section title back out from under the header when the target still fits.
  const rootTop = root.getBoundingClientRect().top + delta;
  if (rootTop < top) {
    const spare = bottom - (rect.bottom + delta) - 12;
    const need = top - rootTop;
    if (spare > 0) delta -= Math.min(need, spare);
  }
  if (Math.abs(delta) > 12) window.scrollBy({ top: delta, behavior });
}

function nudgeOffChrome(target: HTMLElement, reduced: boolean) {
  const controls = document.querySelector<HTMLElement>("[data-testid='sunny-tour-controls']");
  const sunny = document.querySelector<HTMLElement>("[data-testid='sunny-mascot-button']");
  if (!controls || !sunny || isFixedPosition(target)) return;
  const bar = controls.getBoundingClientRect();
  let overlap = 0;
  for (const el of [target, sunny]) {
    const rect = el.getBoundingClientRect();
    const hits =
      rect.left < bar.right - 2 && rect.right > bar.left + 2 && rect.top < bar.bottom - 2 && rect.bottom > bar.top + 4;
    if (hits) overlap = Math.max(overlap, rect.bottom - bar.top + 14);
  }
  if (overlap < 8) return;
  const band = clearBand();
  if (target.getBoundingClientRect().top - overlap < band.top) return;
  window.scrollBy({ top: overlap, behavior: reduced ? "auto" : "smooth" });
}

function rootInReach(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const viewH = window.innerHeight;
  return rect.bottom > viewH * 0.12 && rect.top < viewH * 0.78 && rect.height > 0;
}

export function useSunnyBounceTour({ reducedMotion, suspended, homeRef, bubbleRef }: UseSunnyBounceTourOptions) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<TourPhase>("idle");
  const [activeId, setActiveId] = useState<TourId | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [live, setLive] = useState("");
  const [replayAvailable, setReplayAvailable] = useState(false);
  const [cue, setCue] = useState<TourCue | null>(null);
  const [bubbleWidth, setBubbleWidth] = useState(220);
  const [bubble, setBubble] = useState<BubblePlacement | null>(null);
  const [resolvedBubble, setResolvedBubble] = useState<string | null>(null);
  const bubbleStep = `${activeId ?? ""}:${stepIndex}`;
  const bubbleStepRef = useRef(bubbleStep);
  if (bubbleStepRef.current !== bubbleStep) {
    bubbleStepRef.current = bubbleStep;
    if (bubbleWidth !== 220) setBubbleWidth(220);
    if (resolvedBubble !== null) setResolvedBubble(null);
  }

  const phaseRef = useRef<TourPhase>("idle");
  const activeIdRef = useRef<TourId | null>(null);
  const stepRef = useRef(0);
  const suspendedRef = useRef(suspended);
  const reducedRef = useRef(reducedMotion);
  const offerTimer = useRef<number | undefined>(undefined);
  const pendingOffer = useRef<TourId | null>(null);
  const offsetRef = useRef(offset);
  const travelRef = useRef("");
  const hoppingRef = useRef(false);
  const hopTimer = useRef<number | undefined>(undefined);
  const destRef = useRef({ x: 0, y: 0 });
  offsetRef.current = offset;

  phaseRef.current = phase;
  activeIdRef.current = activeId;
  stepRef.current = stepIndex;
  suspendedRef.current = suspended;
  reducedRef.current = reducedMotion;

  const publish = useCallback((text: string) => {
    try {
      assertTourCopy(text);
      setLive(text);
    } catch {
      setLive(FALLBACK_TEXT);
    }
  }, []);

  const finish = useCallback(
    (message: string) => {
      const id = activeIdRef.current;
      if (id) writeTourSeen(id, undefined, pathname);
      publish(message);
      setPhase("idle");
      setStepIndex(0);
      setOffset({ x: 0, y: 0 });
      setCue(null);
    },
    [pathname, publish]
  );

  const begin = useCallback(
    (id: TourId, mode: "offer" | "step") => {
      writeTourSeen(id, undefined, pathname);
      setActiveId(id);
      setStepIndex(0);
      setOffset({ x: 0, y: 0 });
      if (mode === "offer") {
        setPhase("offer");
        publish(OFFER_TEXT);
      } else {
        setPhase("step");
      }
    },
    [pathname, publish]
  );

  const replay = useCallback(() => {
    const root = findTourRoot(activeIdRef.current);
    const idAttr = root?.getAttribute("data-sunny-tour");
    if (!isTourId(idAttr)) return;
    begin(idAttr, "step");
  }, [begin]);

  const accept = useCallback(() => {
    if (phaseRef.current !== "offer" || !activeIdRef.current) return;
    setStepIndex(0);
    setPhase("step");
  }, []);

  const next = useCallback(() => {
    const id = activeIdRef.current;
    if (!id || phaseRef.current !== "step") return;
    const count = TOURS[id].steps.length;
    if (stepRef.current >= count - 1) finish(DONE_TEXT);
    else setStepIndex(stepRef.current + 1);
  }, [finish]);

  const back = useCallback(() => {
    if (phaseRef.current !== "step") return;
    setStepIndex((index) => Math.max(0, index - 1));
  }, []);

  const skip = useCallback(() => {
    finish(SKIP_TEXT);
  }, [finish]);

  const onSunnyClick = useCallback(() => {
    if (phaseRef.current === "offer") {
      accept();
      return true;
    }
    if (phaseRef.current === "step") {
      next();
      return true;
    }
    return false;
  }, [accept, next]);

  useEffect(() => {
    const onReplay = () => replay();
    window.addEventListener("accutek:replay-sunny-tour", onReplay);
    return () => window.removeEventListener("accutek:replay-sunny-tour", onReplay);
  }, [replay]);

  useEffect(() => {
    setPhase("idle");
    setOffset({ x: 0, y: 0 });
    setStepIndex(0);
    setActiveId(null);
    phaseRef.current = "idle";
    pendingOffer.current = null;
    window.clearTimeout(offerTimer.current);
  }, [pathname]);

  useEffect(() => {
    const queueOffer = (id: TourId) => {
      if (phaseRef.current !== "idle" || suspendedRef.current) return;
      const forced = tourForceMode(window.location.search);
      if (readTourSeen(id, undefined, pathname) && !forced) return;
      if (pendingOffer.current === id) return;
      pendingOffer.current = id;
      window.clearTimeout(offerTimer.current);
      offerTimer.current = window.setTimeout(() => {
        pendingOffer.current = null;
        if (phaseRef.current !== "idle" || suspendedRef.current) return;
        const mode = tourForceMode(window.location.search);
        if (readTourSeen(id, undefined, pathname) && !mode) return;
        if (!document.querySelector(TOURS[id].root)) return;
        begin(id, mode === "replay" ? "step" : "offer");
      }, 600);
    };

    const scan = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-sunny-tour]"));
      setReplayAvailable(nodes.length > 0);
      for (const node of nodes) {
        const id = node.getAttribute("data-sunny-tour");
        if (!isTourId(id)) continue;
        if (rootInReach(node)) queueOffer(id);
      }
    };

    scan();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute("data-sunny-tour");
          if (!isTourId(id)) continue;
          if (entry.isIntersecting && rootInReach(entry.target as HTMLElement)) queueOffer(id);
          else if (!entry.isIntersecting && pendingOffer.current === id) {
            pendingOffer.current = null;
            window.clearTimeout(offerTimer.current);
          }
        }
      },
      { rootMargin: "-8% 0px -18% 0px", threshold: [0, 0.15, 0.4] }
    );
    document.querySelectorAll<HTMLElement>("[data-sunny-tour]").forEach((node) => observer.observe(node));
    const retry = window.setTimeout(scan, 400);

    return () => {
      observer.disconnect();
      window.clearTimeout(retry);
      window.clearTimeout(offerTimer.current);
      pendingOffer.current = null;
    };
  }, [pathname, suspended, begin]);

  useEffect(() => {
    if (phase !== "step" || !activeId) return;
    const tour = TOURS[activeId];
    const step = tour.steps[stepIndex];
    if (!step) return;
    const root = document.querySelector(tour.root);
    if (!root) {
      finish(DONE_TEXT);
      return;
    }
    const elements = collectStepElements(root, step.key, !!step.preferFallback, step.fallbacks ?? []);
    if (!elements.length) {
      if (stepIndex < tour.steps.length - 1) setStepIndex(stepIndex + 1);
      else finish(DONE_TEXT);
      return;
    }

    const scrollTarget = elements.find((el) => !isFixedPosition(el)) ?? elements[0];
    scrollTargetIntoView(scrollTarget, reducedRef.current, step.side, root, step.room ?? 96);

    let frame = 0;
    const applyOffset = (next: { x: number; y: number }) => {
      if (!Number.isFinite(next.x) || !Number.isFinite(next.y)) return;
      setOffset((prev) => {
        if (Math.abs(prev.x - next.x) < 0.5 && Math.abs(prev.y - next.y) < 0.5) return prev;
        return next;
      });
    };
    const measure = () => {
      const home = homeRef.current?.getBoundingClientRect();
      if (!home) return;
      const boxes = elements.map((el) => toBox(el.getBoundingClientRect())).filter((box) => box.width >= 2 && box.height >= 2);
      if (!boxes.length) return;
      const target = unionRect(boxes);
      const homeBox = toBox(home);
      const { text, blocked } = collectScene();
      const band = clearBand();
      const viewport = { width: window.innerWidth, height: window.innerHeight };
      const bubbleNode = bubbleRef.current;
      const bubbleSize =
        bubbleNode && bubbleNode.offsetWidth > 40 && bubbleNode.offsetHeight > 16
          ? { width: bubbleNode.offsetWidth, height: bubbleNode.offsetHeight }
          : undefined;
      const placed = placeSunny({
        home: homeBox,
        target,
        viewport,
        obstacles: text,
        blocked,
        minTop: band.top,
        maxBottom: band.bottom,
        prefer: step.side,
        bubbleSize,
      });
      if (!placed) return;
      setBubble(placed.bubble);
      if (!placed.bubble && bubbleSize && bubbleWidth > 190) setBubbleWidth(176);
      const final = { x: placed.x, y: placed.y };
      destRef.current = final;
      const token = `${activeId}:${stepIndex}`;
      const fromBox = {
        left: homeBox.left + offsetRef.current.x,
        top: homeBox.top + offsetRef.current.y,
        width: homeBox.width,
        height: homeBox.height,
      };
      const hop = (via: { x: number; y: number }) => {
        hoppingRef.current = true;
        applyOffset(via);
        window.clearTimeout(hopTimer.current);
        hopTimer.current = window.setTimeout(() => {
          hoppingRef.current = false;
          applyOffset(destRef.current);
        }, 380);
      };
      if (travelRef.current !== token) {
        travelRef.current = token;
        const via = reducedRef.current ? null : clearVia(fromBox, placed.box, homeBox, [...text, ...blocked], viewport, band.top, band.bottom);
        if (via) hop(via);
        else {
          hoppingRef.current = false;
          applyOffset(final);
        }
      } else if (!hoppingRef.current) {
        const delta = Math.hypot(final.x - offsetRef.current.x, final.y - offsetRef.current.y);
        const via =
          reducedRef.current || delta < 48
            ? null
            : clearVia(fromBox, placed.box, homeBox, [...text, ...blocked], viewport, band.top, band.bottom);
        if (via) hop(via);
        else applyOffset(final);
      }
      const radius = elements.length === 1 ? window.getComputedStyle(elements[0]).borderRadius || "16px" : "16px";
      const range = elements.find((el) => el.matches('input[type="range"]'));
      const arrowTarget = range
        ? inflateBox(toBox(range.getBoundingClientRect()), 16)
        : target;
      const arrowBlocked = placed.bubble ? [...text, ...blocked, placed.bubble.box] : [...text, ...blocked];
      const arrow = hoppingRef.current ? null : arrowCue(placed.box, arrowTarget, arrowBlocked);
      setCue((prev) => {
        if (
          prev &&
          Math.abs(prev.target.left - target.left) < 0.5 &&
          Math.abs(prev.target.top - target.top) < 0.5 &&
          Math.abs(prev.target.width - target.width) < 0.5 &&
          Math.abs(prev.target.height - target.height) < 0.5 &&
          prev.radius === radius &&
          (prev.arrow?.x ?? -1) === (arrow?.x ?? -1) &&
          (prev.arrow?.y ?? -1) === (arrow?.y ?? -1)
        ) {
          return prev;
        }
        return { target, radius, arrow };
      });
      const spoken = bubbleForResolvedStep(step, elements[0].getAttribute("data-testid"));
      setResolvedBubble((prev) => (prev === spoken ? prev : spoken));
      publish(stepAnnouncement(stepIndex, tour.steps.length, spoken));
    };

    const onMove = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const settle = window.setTimeout(measure, reducedRef.current ? 40 : 700);
    let afterLift = 0;
    const settleLate = window.setTimeout(() => {
      measure();
      nudgeOffChrome(scrollTarget, reducedRef.current);
      afterLift = window.setTimeout(measure, reducedRef.current ? 40 : 550);
    }, reducedRef.current ? 80 : 900);
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.clearTimeout(settleLate);
      window.clearTimeout(afterLift);
      window.clearTimeout(hopTimer.current);
      hoppingRef.current = false;
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [phase, stepIndex, activeId, finish, publish, homeRef, bubbleRef, bubbleWidth]);

  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      skip();
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [phase, skip]);

  const stepCount = activeId ? TOURS[activeId].steps.length : 0;
  const stepKey = phase === "step" && activeId ? TOURS[activeId].steps[stepIndex]?.key ?? "" : "";
  const stepDef = phase === "step" && activeId ? TOURS[activeId].steps[stepIndex] : undefined;
  const bubbleText = resolvedBubble ?? stepDef?.bubble ?? "";

  return {
    phase,
    stepIndex,
    stepCount,
    stepKey,
    offset,
    bubbleText,
    bubbleWidth,
    bubble: phase === "step" ? bubble : null,
    cue: phase === "step" ? cue : null,
    live,
    bouncing: !reducedMotion && phase !== "idle",
    replayAvailable,
    accept,
    next,
    back,
    skip,
    replay,
    onSunnyClick,
  };
}
