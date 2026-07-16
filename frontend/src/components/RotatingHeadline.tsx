"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEADLINES = [
  "High-performance solar engineered for the Midwest - roof, ground, or pole mount.",
  "Local solar experts serving West Central Indiana and East Central Illinois - from rooftops to fields.",
  "Authorized Kohler generator installers - keeping your lights on when the grid gives up.",
  "Agricultural solar specialists - helping Indiana and Illinois farms harvest the sun.",
  "Accutek Solar: 32 years of electrical expertise for homes and businesses.",
  "Professional energy solutions for West Central Indiana and East Central Illinois homeowners.",
  "Your local choice for reliable solar and standby power installations.",
  "Real savings and backup power for homes and farms in West Central Indiana and East Central Illinois.",
  "Engineered for performance. Built for the Midwest climate.",
  "Transforming Indiana and Illinois properties with efficient solar energy since 1994.",
  "The future of energy is local. Family-owned and operated in Clinton, IN.",
  "Power your legacy with Accutek Solar - West Central Indiana and East Central Illinois.",
  "Your roof. Your field. Your power - West Central Indiana & East Central Illinois.",
  "Reliable solar PV, battery storage, and Kohler generators.",
  "Family-owned solar that performs in West Central Indiana and East Central Illinois.",
  "Turn sunlight into savings across West Central Indiana and East Central Illinois.",
  "Dependable solar solutions for West Central Indiana and East Central Illinois property owners.",
];

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
    <div className="h-[4.5rem] md:h-32 flex items-center">
      <AnimatePresence mode="wait">
        <motion.h2
          key={index}
          initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-7xl font-heading font-black leading-[1.05] tracking-tight text-balance"
          data-testid="hero-headline"
        >
          {HEADLINES[index].split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.25em]">
              {word.toLowerCase() === "indiana" || word.toLowerCase() === "illinois" || word.toLowerCase() === "solar" ? (
                <span className="text-primary italic">{word}</span>
              ) : (
                word
              )}
            </span>
          ))}
        </motion.h2>
      </AnimatePresence>
    </div>
  );
}
