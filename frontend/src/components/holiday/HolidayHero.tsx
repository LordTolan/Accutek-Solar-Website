"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import {
  useHolidayTheme,
} from "@/context/HolidayThemeProvider"

export default function HolidayHero() {
  const theme = useHolidayTheme()

  if (!theme) return null

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
      "
    >
      <Image
        src={theme.assets.heroBanner}
        alt="Holiday Banner"
        width={1920}
        height={800}
        className="w-full h-auto"
        priority
      />

      <motion.div
        animate={{
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="
          absolute
          inset-0
          bg-white/10
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/50
          to-transparent
        "
      />
    </section>
  )
}
