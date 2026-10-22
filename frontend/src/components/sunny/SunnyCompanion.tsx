"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import SunnySun from "./SunnySun";
import SunnyTourControls from "./SunnyTourControls";
import SunnyTourBubble from "./SunnyTourBubble";
import SunnyTourCue from "./SunnyTourCue";
import { useSunnyBounceTour } from "./useSunnyBounceTour";

// Lazy-load chat panel so initial bundle load remains featherlight
const SunnyChatPanel = dynamic(() => import("./SunnyChatPanel"), {
  ssr: false,
});

export default function SunnyCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [navHopKey, setNavHopKey] = useState(0);
  const homeRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const wasTouring = useRef(false);

  const pathname = usePathname();
  const [prefersReduced, setPrefersReduced] = useState(false);
  const framerReduced = useReducedMotion() ?? false;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReduced(media.matches || framerReduced);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [framerReduced]);

  const shouldReduceMotion = prefersReduced;
  const tour = useSunnyBounceTour({
    reducedMotion: shouldReduceMotion,
    suspended: isOpen,
    homeRef,
    bubbleRef,
  });

  // Hop animation on navigation
  useEffect(() => {
    setNavHopKey((prev) => prev + 1);
  }, [pathname]);

  useEffect(() => {
    if (tour.phase !== "idle") setHasInteracted(true);
  }, [tour.phase]);

  useEffect(() => {
    const root = document.documentElement;
    if (tour.phase === "idle") delete root.dataset.sunnyTour;
    else root.dataset.sunnyTour = "open";
    return () => {
      delete root.dataset.sunnyTour;
    };
  }, [tour.phase]);

  useEffect(() => {
    const touring = tour.phase !== "idle";
    if (wasTouring.current && !touring) {
      buttonRef.current?.focus({ preventScroll: true });
    }
    wasTouring.current = touring;
  }, [tour.phase]);

  // Don't render on admin pages
  if (pathname?.startsWith("/admin")) return null;

  const sunnyLabel =
    tour.phase === "offer"
      ? "Show me how this calculator works"
      : tour.phase === "step"
        ? tour.stepIndex >= tour.stepCount - 1
          ? "Finish calculator tour"
          : "Next calculator tour step"
        : isOpen
          ? "Close Sunny Chat"
          : "Chat with Sunny";

  return (
    <>
      <div
        id="sunny-tour-status"
        data-testid="sunny-tour-status"
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {tour.live}
      </div>

      <SunnyTourControls
        phase={tour.phase}
        stepIndex={tour.stepIndex}
        stepCount={tour.stepCount}
        onAccept={tour.accept}
        onNext={tour.next}
        onBack={tour.back}
        onSkip={tour.skip}
      />

      {tour.cue ? <SunnyTourCue target={tour.cue.target} radius={tour.cue.radius} arrow={tour.cue.arrow} /> : null}

      {/* Parked sun. During a tour this translate moves Sunny onto each target. */}
      <div
        ref={homeRef}
        className={`
          fixed z-40 pointer-events-none
          /* Desktop: Parked bottom-right */
          bottom-4 right-4 md:bottom-6 md:right-6
          /* Mobile: Parked higher above StickyMobileCTA (which has h ~56px) */
          mb-[60px] md:mb-0
        `}
        data-testid="sunny-companion-container"
        data-tour-phase={tour.phase}
        data-tour-step={tour.stepKey}
        data-offset-x={Math.round(tour.offset.x)}
        data-offset-y={Math.round(tour.offset.y)}
        data-reduced-motion={shouldReduceMotion ? "true" : "false"}
      >
        <motion.div
          animate={{ x: tour.offset.x, y: tour.offset.y }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 320, damping: 28, mass: 0.8 }
          }
          className="pointer-events-auto relative"
        >
          {tour.phase === "step" && tour.bubbleText ? (
            <SunnyTourBubble
              text={tour.bubbleText}
              width={tour.bubbleWidth}
              placement={tour.bubble}
              measureRef={bubbleRef}
            />
          ) : null}
          <motion.div
            key={navHopKey}
            initial={false}
            animate={
              shouldReduceMotion || tour.phase !== "idle"
                ? { y: 0, scale: 1 }
                : { y: [0, -14, 0, -6, 0], scale: [0.95, 1.1, 0.98, 1.02, 1] }
            }
            transition={
              shouldReduceMotion || tour.phase !== "idle"
                ? { duration: 0.1 }
                : { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] }
            }
          >
            {/* Subtle continuous float when idle */}
            <motion.div
              animate={
                shouldReduceMotion || isOpen || tour.phase !== "idle"
                  ? { y: 0 }
                  : { y: [0, -5, 0] }
              }
              transition={
                tour.phase === "idle"
                  ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0 }
              }
            >
                <button
                  ref={buttonRef}
                  onClick={() => {
                    if (tour.onSunnyClick()) return;
                    setIsOpen((prev) => !prev);
                    setHasInteracted(true);
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  role="button"
                  aria-label={sunnyLabel}
                  aria-expanded={isOpen}
                  className={`
                    group relative flex items-center justify-center rounded-full p-2
                    bg-gradient-to-tr from-amber-500/20 via-primary/10 to-amber-300/30
                    backdrop-blur-md border border-amber-400/40 shadow-lg hover:shadow-green-glow
                    hover:border-primary transition-all duration-300 focus-ring cursor-pointer touch-manipulation
                    ${tour.phase !== "idle" ? "ring-2 ring-amber-300" : ""}
                  `}
                  data-testid="sunny-mascot-button"
                >
                  {/* Tooltip / Greeting bubble on first visit if not open */}
                  {tour.phase === "idle" && !hasInteracted && !isOpen && (
                    <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:flex items-center gap-1.5 bg-card/95 backdrop-blur-md text-foreground text-xs font-bold py-1.5 px-3 rounded-full border border-amber-500/30 shadow-md animate-fade-in pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span>Hi! Need solar answers?</span>
                      <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-card" />
                    </div>
                  )}

                  {/* Bob stays inside the button so the tap target does not move. */}
                  <motion.div
                    animate={tour.bouncing ? { y: [0, -7, 0] } : { y: 0 }}
                    transition={
                      tour.bouncing
                        ? { duration: 0.75, repeat: Infinity, ease: "easeInOut" }
                        : { duration: shouldReduceMotion ? 0 : 0.15 }
                    }
                  >
                    <SunnySun
                      size={54}
                      reducedMotion={shouldReduceMotion}
                      isHovered={isHovered}
                      isOpen={isOpen}
                    />
                  </motion.div>
                </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lazy-Loaded Chat Panel */}
      {isOpen && (
        <SunnyChatPanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          reducedMotion={shouldReduceMotion}
          onReplayTour={
            tour.replayAvailable
              ? () => {
                  setIsOpen(false);
                  tour.replay();
                }
              : undefined
          }
        />
      )}
    </>
  );
}
