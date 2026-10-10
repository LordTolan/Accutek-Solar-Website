"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import SunnySun from "./SunnySun";

// Lazy-load chat panel so initial bundle load remains featherlight
const SunnyChatPanel = dynamic(() => import("./SunnyChatPanel"), {
  ssr: false,
});

export default function SunnyCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [navHopKey, setNavHopKey] = useState(0);

  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion() ?? false;

  // Hop animation on navigation
  useEffect(() => {
    setNavHopKey((prev) => prev + 1);
  }, [pathname]);

  // Don't render on admin pages
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Parked Fixed Sun Mascot Container in Bottom Corner */}
      <div
        className={`
          fixed z-40 pointer-events-none
          /* Desktop: Parked bottom-right */
          bottom-4 right-4 md:bottom-6 md:right-6
          /* Mobile: Parked higher above StickyMobileCTA (which has h ~56px) */
          mb-[60px] md:mb-0
        `}
        data-testid="sunny-companion-container"
      >
        <motion.div
          key={navHopKey}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { y: 0, scale: 0.9 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : {
                  // Gentle float + Hop on navigation
                  y: [0, -14, 0, -6, 0],
                  scale: [0.95, 1.1, 0.98, 1.02, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0.1 }
              : {
                  duration: 0.85,
                  ease: [0.34, 1.56, 0.64, 1],
                }
          }
          className="pointer-events-auto"
        >
          {/* Subtle Continuous Float when idle and not reduced motion */}
          <motion.div
            animate={
              shouldReduceMotion || isOpen
                ? {}
                : {
                    y: [0, -5, 0],
                  }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <button
              onClick={() => {
                setIsOpen((prev) => !prev);
                setHasInteracted(true);
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              role="button"
              aria-label={isOpen ? "Close Sunny Chat" : "Chat with Sunny"}
              aria-expanded={isOpen}
              className={`
                group relative flex items-center justify-center rounded-full p-2
                bg-gradient-to-tr from-amber-500/20 via-primary/10 to-amber-300/30
                backdrop-blur-md border border-amber-400/40 shadow-lg hover:shadow-green-glow
                hover:border-primary transition-all duration-300 focus-ring cursor-pointer
              `}
              data-testid="sunny-mascot-button"
            >
              {/* Tooltip / Greeting bubble on first visit if not open */}
              {!hasInteracted && !isOpen && (
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:flex items-center gap-1.5 bg-card/95 backdrop-blur-md text-foreground text-xs font-bold py-1.5 px-3 rounded-full border border-amber-500/30 shadow-md animate-fade-in pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  <span>Hi! Need solar answers?</span>
                  <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-card" />
                </div>
              )}

              {/* Little Sun Graphic */}
              <SunnySun
                size={54}
                reducedMotion={shouldReduceMotion}
                isHovered={isHovered}
                isOpen={isOpen}
              />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Lazy-Loaded Chat Panel */}
      {isOpen && (
        <Suspense fallback={null}>
          <SunnyChatPanel
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            reducedMotion={shouldReduceMotion}
          />
        </Suspense>
      )}
    </>
  );
}
