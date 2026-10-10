"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Rotating hero headline.
 *
 * Layout contract (fixes headlines spilling over the hero subcopy / CTAs):
 * - Every headline is rendered invisibly in the SAME grid cell as the live one.
 *   The cell therefore always takes the height of the TALLEST headline at the
 *   current viewport width, in normal document flow - no fixed heights, no
 *   absolute positioning, nothing can paint over the paragraph below.
 * - Only one visible headline is mounted at a time (AnimatePresence "wait"),
 *   so outgoing and incoming lines never stack on top of each other.
 * - Keep strings roughly <= 75 characters so the reserved block stays compact.
 */
const HEADLINES = [
  "High-performance solar for the Midwest - roof, ground, or pole mount.",
  "Local solar experts in West Central Indiana & East Central Illinois.",
  "Authorized Kohler installers - lights on when the grid goes down.",
  "Ag solar specialists helping Indiana and Illinois farms harvest the sun.",
  "Accutek Solar: 32 years of electrical expertise for homes and businesses.",
  "Professional energy solutions for Indiana and Illinois homeowners.",
  "Your local choice for reliable solar and standby power installations.",
  "Real savings and backup power for Indiana and Illinois homes and farms.",
  "Engineered for performance. Built for the Midwest climate.",
  "Efficient solar for Indiana and Illinois properties since 1994.",
  "The future of energy is local. Family-owned and operated in Clinton, IN.",
  "Power your legacy with Accutek Solar across Indiana and Illinois.",
  "Your roof. Your field. Your power - across Indiana & Illinois.",
  "Reliable solar PV, battery storage, and Kohler generators.",
  "Family-owned solar that performs in Indiana and Illinois.",
  "Turn sunlight into savings across Indiana and Illinois.",
  "Dependable solar solutions for Indiana and Illinois property owners.",
];

const HEADLINE_CLASS =
  "col-start-1 row-start-1 text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black leading-[1.08] tracking-tight text-balance";

const HIGHLIGHT = new Set(["indiana", "illinois", "solar", "solar:"]);

function renderWords(text: string) {
  return text.split(" ").map((word, i) => (
    <span key={i} className="inline-block mr-[0.25em]">
      {HIGHLIGHT.has(word.toLowerCase()) ? <span className="text-primary italic">{word}</span> : word}
    </span>
  ));
}

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Randomize first headline on client mount
    setIndex(Math.floor(Math.random() * HEADLINES.length));

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 5500); // cycle every 5.5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative grid items-start" data-testid="hero-headline-wrap">
      {/* Invisible sizers: reserve the height of the tallest headline at every breakpoint. */}
      {HEADLINES.map((text, i) => (
        <div key={`sizer-${i}`} aria-hidden="true" className={`${HEADLINE_CLASS} invisible pointer-events-none select-none`}>
          {renderWords(text)}
        </div>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={HEADLINE_CLASS}
          aria-live="polite"
          data-testid="hero-headline"
        >
          {renderWords(HEADLINES[index])}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}