"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  DONE_TEXT,
  FALLBACK_TEXT,
  OFFER_TEXT,
  SKIP_TEXT,
  TOURS,
  type Box,
  type SunnyAnchor,
  type TourId,
  assertTourCopy,
  chooseStepElements,
  isTourId,
  labelForResolvedStep,
  readTourSeen,
  stepAnnouncement,
  sunnyOffset,
  tourForceMode,
  unionRect,
  writeTourSeen,
} from "./sunnyTour";

interface UseSunnyBounceTourOptions {
  reducedMotion: boolean;
  /** Chat is open. Don't auto-offer over it. Replay still works. */
  suspended: boolean;
  homeRef: React.RefObject<HTMLElement | null>;
}

export type TourPhase = "idle" | "offer" | "step";

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

function anchorFor(el: HTMLElement): SunnyAnchor {
  const value = el.getAttribute("data-sunny-anchor");
  if (value === "corner" || value === "start" || value === "above") return value;
  return "above";
}

function toBox(rect: Pick<DOMRect, "left" | "top" | "width" | "height">): Box {
  return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
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

function scrollTargetIntoView(el: HTMLElement, reduced: boolean) {
  const rect = el.getBoundingClientRect();
  const sticky = document.querySelector<HTMLElement>("[data-testid='sticky-mobile-cta']");
  const stickyH = sticky && isElementVisible(sticky) ? sticky.getBoundingClientRect().height : 0;
  const header = document.querySelector("header");
  const topInset = (header ? header.getBoundingClientRect().bottom : 0) + 64;
  const bottomInset = stickyH + 20;
  const viewTop = topInset;
  const viewBottom = window.innerHeight - bottomInset;
  let delta = 0;
  if (rect.height > viewBottom - viewTop - 16) {
    delta = rect.top - viewTop;
  } else {
    const targetCenter = rect.top + rect.height / 2;
    const viewCenter = viewTop + (viewBottom - viewTop) / 2;
    delta = targetCenter - viewCenter;
  }
  if (Math.abs(delta) < 12) return;
  window.scrollBy({ top: delta, behavior: reduced ? "auto" : "smooth" });
}

function rootInReach(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const viewH = window.innerHeight;
  return rect.bottom > viewH * 0.12 && rect.top < viewH * 0.78 && rect.height > 0;
}

export function useSunnyBounceTour({ reducedMotion, suspended, homeRef }: UseSunnyBounceTourOptions) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<TourPhase>("idle");
  const [activeId, setActiveId] = useState<TourId | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [live, setLive] = useState("");
  const [replayAvailable, setReplayAvailable] = useState(false);

  const phaseRef = useRef<TourPhase>("idle");
  const activeIdRef = useRef<TourId | null>(null);
  const stepRef = useRef(0);
  const suspendedRef = useRef(suspended);
  const reducedRef = useRef(reducedMotion);
  const offerTimer = useRef<number | undefined>(undefined);
  const pendingOffer = useRef<TourId | null>(null);

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
      if (id) writeTourSeen(id);
      publish(message);
      setPhase("idle");
      setStepIndex(0);
      setOffset({ x: 0, y: 0 });
    },
    [publish]
  );

  const begin = useCallback(
    (id: TourId, mode: "offer" | "step") => {
      writeTourSeen(id);
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
    [publish]
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
      if (readTourSeen(id) && !forced) return;
      if (pendingOffer.current === id) return;
      pendingOffer.current = id;
      window.clearTimeout(offerTimer.current);
      offerTimer.current = window.setTimeout(() => {
        pendingOffer.current = null;
        if (phaseRef.current !== "idle" || suspendedRef.current) return;
        const mode = tourForceMode(window.location.search);
        if (readTourSeen(id) && !mode) return;
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

    const scrollTarget = elements.find((el) => !isFixedPosition(el));
    if (scrollTarget) scrollTargetIntoView(scrollTarget, reducedRef.current);

    let frame = 0;
    const measure = () => {
      const home = homeRef.current?.getBoundingClientRect();
      if (!home) return;
      const boxes = elements.map((el) => toBox(el.getBoundingClientRect())).filter((box) => box.width >= 2 && box.height >= 2);
      if (!boxes.length) return;
      const target = unionRect(boxes);
      const header = document.querySelector("header");
      const minTop = header ? header.getBoundingClientRect().bottom + 8 : 72;
      const nextOffset = sunnyOffset(
        toBox(home),
        target,
        { width: window.innerWidth, height: window.innerHeight },
        minTop,
        anchorFor(elements[0])
      );
      setOffset((prev) => {
        if (!Number.isFinite(nextOffset.x) || !Number.isFinite(nextOffset.y)) return prev;
        if (Math.abs(prev.x - nextOffset.x) < 0.5 && Math.abs(prev.y - nextOffset.y) < 0.5) return prev;
        return nextOffset;
      });
      publish(
        stepAnnouncement(
          stepIndex,
          tour.steps.length,
          labelForResolvedStep(step, elements[0].getAttribute("data-testid"))
        )
      );
    };

    const onMove = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    const settle = window.setTimeout(measure, reducedRef.current ? 40 : 700);
    const settleLate = window.setTimeout(measure, reducedRef.current ? 80 : 1300);
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.clearTimeout(settleLate);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [phase, stepIndex, activeId, finish, publish, homeRef]);

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

  return {
    phase,
    stepIndex,
    stepCount,
    stepKey,
    offset,
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
