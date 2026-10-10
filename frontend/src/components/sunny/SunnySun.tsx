"use client";

import React from "react";
import { motion } from "framer-motion";

interface SunnySunProps {
  reducedMotion?: boolean;
  isHovered?: boolean;
  isOpen?: boolean;
  size?: number;
  className?: string;
  holidayHat?: React.ReactNode;
}

export default function SunnySun({
  reducedMotion = false,
  isHovered = false,
  isOpen = false,
  size = 56,
  className = "",
  holidayHat,
}: SunnySunProps) {
  // 12 rays evenly spaced around circle
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <div
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Optional Holiday Costume Hook */}
      {holidayHat && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          {holidayHat}
        </div>
      )}

      {/* Rotating Sun Rays */}
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        animate={
          reducedMotion
            ? {}
            : {
                rotate: isOpen ? [0, 360] : isHovered ? [0, 180] : [0, 360],
              }
        }
        transition={
          reducedMotion
            ? {}
            : {
                rotate: {
                  duration: isOpen ? 12 : isHovered ? 6 : 24,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
      >
        <defs>
          <linearGradient id="sunnyRayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
          <linearGradient id="sunnyBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="sunnyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 12 Sun Rays */}
        <g>
          {rays.map((deg, i) => (
            <motion.line
              key={i}
              x1="50"
              y1="12"
              x2="50"
              y2="2"
              stroke="url(#sunnyRayGradient)"
              strokeWidth="4.5"
              strokeLinecap="round"
              transform={`rotate(${deg} 50 50)`}
              animate={
                reducedMotion
                  ? {}
                  : {
                      strokeWidth: isHovered ? [4.5, 6, 4.5] : [4.5, 5, 4.5],
                    }
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Sun Body Core */}
        <circle
          cx="50"
          cy="50"
          r="30"
          fill="url(#sunnyBodyGradient)"
          stroke="#F59E0B"
          strokeWidth="1.5"
          filter="url(#sunnyGlow)"
        />

        {/* Sunglasses / Solar Shades (Accutek Tech vibe) */}
        <g id="sunglasses" className="transition-transform duration-300">
          {/* Left Lens */}
          <rect
            x="31"
            y="42"
            width="16"
            height="12"
            rx="3"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          {/* Right Lens */}
          <rect
            x="53"
            y="42"
            width="16"
            height="12"
            rx="3"
            fill="#1E293B"
            stroke="#0F172A"
            strokeWidth="1.5"
          />
          {/* Bridge */}
          <line
            x1="47"
            y1="46"
            x2="53"
            y2="46"
            stroke="#0F172A"
            strokeWidth="2"
          />
          {/* Glass Glare Highlights */}
          <line
            x1="33"
            y1="44"
            x2="37"
            y2="51"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <line
            x1="55"
            y1="44"
            x2="59"
            y2="51"
            stroke="#94A3B8"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>

        {/* Rosy Cheeks */}
        <circle cx="28" cy="58" r="3" fill="#EF4444" opacity="0.35" />
        <circle cx="72" cy="58" r="3" fill="#EF4444" opacity="0.35" />

        {/* Cheerful Smile */}
        <path
          d="M 40 60 Q 50 68 60 60"
          fill="none"
          stroke="#78350F"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
