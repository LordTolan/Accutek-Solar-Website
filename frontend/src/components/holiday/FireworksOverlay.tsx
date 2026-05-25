"use client"

import { motion } from "framer-motion"

/**
 * Floating sparkle particles — layer this over any section
 * during an active holiday theme for a festive glow effect.
 */
export default function FireworksOverlay() {
  /* Fixed positions so SSR / hydration stays consistent */
  const positions = [
    { left: 8, top: 12 },
    { left: 22, top: 45 },
    { left: 37, top: 18 },
    { left: 50, top: 72 },
    { left: 63, top: 30 },
    { left: 78, top: 55 },
    { left: 91, top: 15 },
    { left: 15, top: 80 },
    { left: 42, top: 90 },
    { left: 68, top: 8 },
    { left: 85, top: 65 },
    { left: 55, top: 40 },
  ]

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
          }}
          className="
            absolute
            w-3
            h-3
            rounded-full
            bg-white
          "
          style={{
            left: `${pos.left}%`,
            top: `${pos.top}%`,
          }}
        />
      ))}
    </div>
  )
}
