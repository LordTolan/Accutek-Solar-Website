import React from "react";

/**
 * Accutek Solar — vectorized two-leaf bulb mark.
 * Pure SVG: pin-sharp at any size, transparent background.
 * Animates a gentle leaf sway + soft inner glow on hover and on first paint.
 *
 * Props:
 *   className   — sizing / layout classes (e.g. "h-10 w-10")
 *   variant     — "color" (default, green gradient) | "mono-light" (white on dark)
 *   animate     — boolean (default true)
 */
export default function BulbLogo({ className = "h-10 w-10", variant = "color", animate = true }) {
  const uid = React.useId().replace(/:/g, "");
  const gradId = `bulb-grad-${uid}`;
  const leafGradId = `leaf-grad-${uid}`;
  const glowId = `bulb-glow-${uid}`;

  const stroke = variant === "mono-light" ? "#FFFFFF" : `url(#${gradId})`;
  const leafFill = variant === "mono-light" ? "#FFFFFF" : `url(#${leafGradId})`;
  const innerGlow = variant === "mono-light" ? "rgba(255,255,255,0.18)" : "rgba(76,175,80,0.35)";

  return (
    <svg
      data-testid="bulb-logo"
      data-animate={animate ? "true" : "false"}
      className={`${className} ${animate ? "accutek-bulb-animate" : ""}`}
      viewBox="0 0 200 240"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      aria-label="Accutek Solar"
      role="img"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#8BC34A" />
          <stop offset="55%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
        <linearGradient id={leafGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#A5D6A7" />
          <stop offset="60%" stopColor="#66BB6A" />
          <stop offset="100%" stopColor="#388E3C" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="45%" r="55%">
          <stop offset="0%"  stopColor={innerGlow} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* Soft inner glow that pulses */}
      <circle
        className="bulb-glow"
        cx="100"
        cy="92"
        r="62"
        fill={`url(#${glowId})`}
      />

      {/* Bulb glass outline */}
      <path
        d="
          M100 14
          C 142 14, 168 46, 168 86
          C 168 112, 152 132, 138 150
          C 130 160, 128 168, 128 176
          L 72 176
          C 72 168, 70 160, 62 150
          C 48 132, 32 112, 32 86
          C 32 46, 58 14, 100 14 Z
        "
        stroke={stroke}
        strokeWidth="8"
        strokeLinejoin="round"
      />

      {/* Right leaf — larger, points up-right */}
      <path
        className="leaf leaf-right"
        d="
          M 100 158
          C 110 132, 124 110, 144 92
          C 138 116, 128 138, 116 154
          C 110 162, 104 164, 100 158 Z
        "
        fill={leafFill}
        style={{ transformOrigin: "100px 158px" }}
      />

      {/* Left leaf — smaller, points up-left */}
      <path
        className="leaf leaf-left"
        d="
          M 100 158
          C 92 138, 80 122, 64 110
          C 70 130, 80 148, 92 158
          C 96 162, 100 162, 100 158 Z
        "
        fill={leafFill}
        style={{ transformOrigin: "100px 158px" }}
      />

      {/* Stem — connects leaves to the base */}
      <path
        d="M100 158 L100 176"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Screw base — three horizontal bands */}
      <g stroke={stroke} strokeWidth="8" strokeLinecap="round">
        <line x1="74" y1="188" x2="126" y2="188" />
        <line x1="76" y1="202" x2="124" y2="202" />
        <line x1="80" y1="216" x2="120" y2="216" />
      </g>

      {/* Tip */}
      <path
        d="M 90 226 L 110 226 L 100 234 Z"
        fill={stroke === "#FFFFFF" ? "#FFFFFF" : `url(#${gradId})`}
      />
    </svg>
  );
}
