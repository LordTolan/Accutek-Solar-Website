"use client";

import { useHolidayTheme } from "@/context/HolidayThemeProvider";
import { PumpkinCollectible } from "@/components/HalloweenPumpkinHunt";

export default function HalloweenSiteDecor() {
  const theme = useHolidayTheme();

  if (theme?.name !== "halloween") return null;

  return (
    <div
      data-testid="halloween-site-decor"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Spider webs in top corners and across screen edge */}
      <CornerSpiderWebs />

      {/* 2. Bats looping hero top */}
      <BatsSwarm />

      {/* 3. UFO abducting solar panel with green glowing beam */}
      <UfoAbduction />

      {/* 4. Zombies shuffling across bottom/hero */}
      <ShufflingZombies />

      {/* 5. Dancing zombie couple */}
      <DancingZombieCouple />

      {/* 6. Scuttling spider dropping down */}
      <ScuttlingSpider />

      {/* 7. Blinking jack-o'-lantern on side */}
      <BlinkingJackOLantern />

      {/* 8. Lantern ghoul standing by footer/bottom */}
      <LanternGhoul />
    </div>
  );
}

/* ---------------- 1. Spider Webs in corners & across ---------------- */
function CornerSpiderWebs() {
  return (
    <>
      {/* Top Left Web */}
      <div className="absolute top-0 left-0 w-36 h-36 sm:w-56 sm:h-56 opacity-60 text-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 0 L 100 0 M 0 0 L 85 35 M 0 0 L 65 65 M 0 0 L 35 85 M 0 0 L 0 100" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 25 0 Q 22 10 0 25" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 50 0 Q 42 22 0 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 75 0 Q 62 38 0 75" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 100 0 Q 82 52 0 100" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Top Right Web */}
      <div className="absolute top-0 right-0 w-36 h-36 sm:w-56 sm:h-56 opacity-60 text-white/40 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M 0 0 L 100 0 M 0 0 L 85 35 M 0 0 L 65 65 M 0 0 L 35 85 M 0 0 L 0 100" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 25 0 Q 22 10 0 25" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 50 0 Q 42 22 0 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 75 0 Q 62 38 0 75" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 100 0 Q 82 52 0 100" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Web strand across top border */}
      <div className="absolute top-0 left-1/4 right-1/4 h-12 opacity-35 text-white/30 hidden md:block">
        <svg viewBox="0 0 400 30" preserveAspectRatio="none" className="w-full h-full">
          <path d="M 0 0 Q 100 25 200 8 Q 300 25 400 0" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 50 0 Q 100 18 150 0" stroke="currentColor" strokeWidth="0.8" fill="none" />
          <path d="M 250 0 Q 300 18 350 0" stroke="currentColor" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
    </>
  );
}

/* ---------------- 2. Bats Looping Hero Top ---------------- */
function BatsSwarm() {
  return (
    <div className="absolute top-6 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      <div className="hw-bat-group hw-bat-1">
        <BatSvg className="w-8 h-8 text-neutral-800 drop-shadow-md" />
      </div>
      <div className="hw-bat-group hw-bat-2">
        <BatSvg className="w-6 h-6 text-neutral-900 drop-shadow-md" />
      </div>
      <div className="hw-bat-group hw-bat-3">
        <BatSvg className="w-10 h-10 text-neutral-800 drop-shadow-md" />
      </div>
    </div>
  );
}

function BatSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor">
      <path d="M32 28 C28 20 18 18 8 22 C4 24 2 28 4 32 C8 34 14 30 18 34 C12 38 10 44 14 48 C20 44 24 38 28 40 C30 42 34 42 36 40 C40 38 44 44 50 48 C54 44 52 38 46 34 C50 30 56 34 60 32 C62 28 60 24 56 22 C46 18 36 20 32 28 Z" />
      {/* Bat ears & eyes */}
      <circle cx="30" cy="26" r="1" fill="#ff7518" />
      <circle cx="34" cy="26" r="1" fill="#ff7518" />
    </svg>
  );
}

/* ---------------- 3. UFO Abducting Solar Panel (with green glow beam) ---------------- */
function UfoAbduction() {
  return (
    <div className="absolute top-20 right-6 sm:right-16 z-20 hw-ufo-container hidden sm:block">
      {/* UFO Saucer */}
      <div className="relative w-28 h-12 hw-ufo-wobble">
        <svg viewBox="0 0 100 45" className="w-full h-full drop-shadow-[0_0_15px_rgba(118,255,3,0.8)]">
          {/* Glass dome */}
          <ellipse cx="50" cy="16" rx="20" ry="12" fill="#76ff03" opacity="0.8" />
          {/* Alien driver head */}
          <ellipse cx="50" cy="15" rx="5" ry="6" fill="#1b5e20" />
          <circle cx="48" cy="14" r="1.5" fill="#000000" />
          <circle cx="52" cy="14" r="1.5" fill="#000000" />
          {/* Metal saucer base */}
          <ellipse cx="50" cy="26" rx="46" ry="12" fill="#37474f" stroke="#78909c" strokeWidth="2" />
          <ellipse cx="50" cy="28" rx="34" ry="7" fill="#263238" />
          {/* Saucer blinker lights */}
          <circle cx="18" cy="28" r="2.5" fill="#ffeb3b" className="animate-ping" />
          <circle cx="34" cy="30" r="2.5" fill="#00e676" />
          <circle cx="50" cy="31" r="2.5" fill="#ff5722" className="animate-pulse" />
          <circle cx="66" cy="30" r="2.5" fill="#00e676" />
          <circle cx="82" cy="28" r="2.5" fill="#ffeb3b" className="animate-ping" />
        </svg>

        {/* Green Tractor Beam */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-28 h-44 overflow-visible hw-ufo-beam pointer-events-none">
          <svg viewBox="0 0 100 160" preserveAspectRatio="none" className="w-full h-full opacity-70">
            <defs>
              <linearGradient id="tractorGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#76ff03" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#00e676" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#00e676" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon points="40,0 60,0 95,160 5,160" fill="url(#tractorGlow)" />
          </svg>

          {/* Abducted Solar Panel floating upwards */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-9 hw-abducted-panel">
            <svg viewBox="0 0 50 36" className="w-full h-full drop-shadow-[0_0_10px_#76ff03]">
              <rect x="2" y="2" width="46" height="32" rx="2" fill="#0d47a1" stroke="#90caf9" strokeWidth="1.5" transform="rotate(-8 25 18)" />
              <line x1="17" y1="2" x2="17" y2="34" stroke="#e3f2fd" strokeWidth="1" transform="rotate(-8 25 18)" />
              <line x1="33" y1="2" x2="33" y2="34" stroke="#e3f2fd" strokeWidth="1" transform="rotate(-8 25 18)" />
              <line x1="2" y1="18" x2="48" y2="18" stroke="#e3f2fd" strokeWidth="1" transform="rotate(-8 25 18)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 4. Zombies Shuffling Across ---------------- */
function ShufflingZombies() {
  return (
    <div className="absolute bottom-4 left-0 right-0 h-24 overflow-hidden pointer-events-none z-20">
      <div className="hw-zombie-track hw-zombie-march">
        {/* Zombie 1 */}
        <div className="inline-block mx-4 hw-zombie-sway-1">
          <ZombieSvg hairColor="#2e7d32" shirtColor="#5d4037" skinColor="#66bb6a" />
        </div>
        {/* Zombie 2 */}
        <div className="inline-block mx-6 hw-zombie-sway-2">
          <ZombieSvg hairColor="#37474f" shirtColor="#455a64" skinColor="#81c784" armsUp />
        </div>
      </div>
    </div>
  );
}

function ZombieSvg({
  hairColor = "#33691e",
  shirtColor = "#4e342e",
  skinColor = "#66bb6a",
  armsUp = false,
}: {
  hairColor?: string;
  shirtColor?: string;
  skinColor?: string;
  armsUp?: boolean;
}) {
  return (
    <svg viewBox="0 0 60 90" className="w-12 h-18 drop-shadow-md">
      {/* Head */}
      <rect x="20" y="10" width="20" height="20" rx="3" fill={skinColor} />
      {/* Messy hair */}
      <path d="M 18 12 L 24 8 L 30 12 L 36 7 L 42 12 L 40 18 L 18 18 Z" fill={hairColor} />
      {/* Zombie Eyes */}
      <circle cx="26" cy="18" r="3" fill="#ffffff" />
      <circle cx="26" cy="18" r="1.5" fill="#b71c1c" />
      <circle cx="34" cy="19" r="2.5" fill="#fff59d" />
      <circle cx="34" cy="19" r="1" fill="#000000" />
      {/* Stitched Mouth */}
      <line x1="24" y1="26" x2="36" y2="25" stroke="#212121" strokeWidth="1.5" />
      <line x1="28" y1="23" x2="28" y2="28" stroke="#212121" strokeWidth="1" />
      <line x1="32" y1="23" x2="32" y2="28" stroke="#212121" strokeWidth="1" />
      {/* Tattered Shirt Body */}
      <polygon points="16,30 44,30 40,60 20,60" fill={shirtColor} />
      {/* Arms extended shuffle */}
      {armsUp ? (
        <>
          <line x1="18" y1="35" x2="4" y2="30" stroke={skinColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="35" x2="56" y2="30" stroke={skinColor} strokeWidth="5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="18" y1="35" x2="2" y2="42" stroke={skinColor} strokeWidth="5" strokeLinecap="round" />
          <line x1="42" y1="35" x2="58" y2="40" stroke={skinColor} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {/* Legs */}
      <line x1="24" y1="60" x2="22" y2="85" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
      <line x1="36" y1="60" x2="38" y2="85" stroke="#263238" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- 5. Dancing Zombie Couple ---------------- */
function DancingZombieCouple() {
  return (
    <div className="absolute bottom-16 right-4 sm:right-10 z-20 hw-dancing-couple hidden md:block">
      <div className="flex items-center gap-1 bg-black/40 p-2 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
        {/* Zombie Groom / Partner */}
        <div className="hw-dance-partner-a">
          <svg viewBox="0 0 50 80" className="w-10 h-16">
            <rect x="15" y="8" width="18" height="18" rx="3" fill="#81c784" />
            <polygon points="12,26 36,26 34,55 14,55" fill="#212121" />
            <polygon points="21,28 27,28 24,36" fill="#b71c1c" />
            <line x1="18" y1="55" x2="16" y2="76" stroke="#424242" strokeWidth="4" />
            <line x1="30" y1="55" x2="32" y2="76" stroke="#424242" strokeWidth="4" />
          </svg>
        </div>
        {/* Floating Musical / Spooky Notes */}
        <div className="text-purple-400 font-bold text-xs animate-bounce">
          ♫ 🎃 ♬
        </div>
        {/* Zombie Bride / Partner */}
        <div className="hw-dance-partner-b">
          <svg viewBox="0 0 50 80" className="w-10 h-16">
            {/* Veil */}
            <path d="M 12 10 Q 24 2 36 10 L 40 45 L 8 45 Z" fill="#ffffff" opacity="0.5" />
            <rect x="16" y="10" width="16" height="16" rx="3" fill="#a5d6a7" />
            {/* Tattered Wedding Dress */}
            <polygon points="16,26 32,26 40,65 8,65" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1" />
            <circle cx="21" cy="18" r="2" fill="#000000" />
            <circle cx="27" cy="18" r="2" fill="#000000" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 6. Scuttling Spider Dropping Down ---------------- */
function ScuttlingSpider() {
  return (
    <div className="absolute top-0 left-12 sm:left-32 z-20 hw-spider-descend">
      {/* Spider Thread line */}
      <div className="w-[1px] h-32 bg-white/40 mx-auto" />
      {/* Spider Body */}
      <div className="w-8 h-8 -mt-1 relative hw-spider-wiggle">
        <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md text-neutral-900">
          {/* 8 Legs */}
          <path d="M 22 28 Q 10 15 4 20" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 22 30 Q 8 28 2 34" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 22 32 Q 10 42 6 48" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 22 34 Q 14 52 10 58" stroke="#ff7518" strokeWidth="2.5" fill="none" />

          <path d="M 38 28 Q 50 15 56 20" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 38 30 Q 52 28 58 34" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 38 32 Q 50 42 54 48" stroke="#ff7518" strokeWidth="2.5" fill="none" />
          <path d="M 38 34 Q 46 52 50 58" stroke="#ff7518" strokeWidth="2.5" fill="none" />

          {/* Body and head */}
          <ellipse cx="30" cy="34" rx="10" ry="12" fill="#212121" />
          <circle cx="30" cy="22" r="7" fill="#1b1b1b" />
          {/* Red Glowing Spider Eyes */}
          <circle cx="27" cy="20" r="1.5" fill="#f44336" />
          <circle cx="33" cy="20" r="1.5" fill="#f44336" />
          <circle cx="29" cy="24" r="1" fill="#f44336" />
          <circle cx="31" cy="24" r="1" fill="#f44336" />
        </svg>
      </div>
    </div>
  );
}

/* ---------------- 7. Blinking Jack-o'-Lantern ---------------- */
function BlinkingJackOLantern() {
  return (
    <div className="absolute top-1/2 left-3 -translate-y-1/2 z-20 hw-blinking-jack hidden lg:block">
      <div className="w-14 h-14 relative drop-shadow-[0_0_15px_rgba(255,117,24,0.7)]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Pumpkin base */}
          <circle cx="50" cy="55" r="38" fill="#e65100" stroke="#bf360c" strokeWidth="3" />
          <ellipse cx="32" cy="55" rx="16" ry="36" fill="#f57c00" opacity="0.6" />
          <ellipse cx="68" cy="55" rx="16" ry="36" fill="#f57c00" opacity="0.6" />
          {/* Green stem */}
          <path d="M 46 20 Q 50 8 58 12 Q 52 20 48 24 Z" fill="#2e7d32" />
          {/* Blinking eyes & jagged teeth mouth */}
          <polygon points="32,45 42,45 37,36" fill="#ffe082" className="hw-jack-eye" />
          <polygon points="58,45 68,45 63,36" fill="#ffe082" className="hw-jack-eye" />
          <polygon points="50,48 46,55 54,55" fill="#ffe082" className="hw-jack-eye" />
          <path d="M 28 66 L 34 62 L 40 68 L 46 62 L 52 68 L 58 62 L 64 68 L 72 66 Q 50 84 28 66 Z" fill="#ffe082" className="hw-jack-mouth" />
        </svg>
      </div>
    </div>
  );
}

/* ---------------- 8. Lantern Ghoul Standing by Bottom / Footer ---------------- */
function LanternGhoul() {
  return (
    <div className="absolute bottom-6 left-6 z-20 hw-lantern-ghoul hidden sm:block">
      <div className="relative w-16 h-24">
        <svg viewBox="0 0 80 120" className="w-full h-full drop-shadow-[0_0_15px_rgba(147,51,234,0.6)]">
          {/* Ghostly flowing cloak */}
          <path d="M 35 25 Q 15 60 10 110 Q 30 100 45 112 Q 60 100 70 110 Q 60 55 45 25 Z" fill="#1f1435" stroke="#7e22ce" strokeWidth="2" opacity="0.9" />
          {/* Dark cowl face */}
          <circle cx="40" cy="30" r="14" fill="#0d0718" />
          {/* Eerie glowing purple/green eyes */}
          <circle cx="35" cy="28" r="2.5" fill="#76ff03" className="animate-ping" />
          <circle cx="45" cy="28" r="2.5" fill="#76ff03" className="animate-ping" />
          {/* Holding Lantern Staff */}
          <line x1="58" y1="35" x2="58" y2="105" stroke="#5d4037" strokeWidth="3" />
          {/* Lantern */}
          <rect x="52" y="48" width="12" height="18" rx="2" fill="#ffb300" stroke="#212121" strokeWidth="2" className="drop-shadow-[0_0_12px_#ffb300]" />
          <polygon points="50,48 66,48 58,40" fill="#424242" />
        </svg>
      </div>
    </div>
  );
}
