"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Gift, RefreshCw, Trophy, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { useHolidayTheme } from "@/context/HolidayThemeProvider";

export type CharacterPumpkin = {
  id: string;
  name: string;
  character: string;
  tagline: string;
  quote: string;
  badge: string;
  color: string;
  accentColor: string;
  defaultLocationHint: string;
};

export const CHARACTER_PUMPKINS: CharacterPumpkin[] = [
  {
    id: "mad-max",
    name: "Mad Max Pumpkin",
    character: "Mad Max: Fury Road",
    tagline: "Witness Me... Harvest Pure Solar Power!",
    quote: "Oh, what a lovely day to go off-grid and cut ties with the utility cartel!",
    badge: "Wasteland Warrior",
    color: "#ff5722",
    accentColor: "#d84315",
    defaultLocationHint: "Near the energy grid calculations & cost forecast",
  },
  {
    id: "dracula",
    name: "Count Dracula Pumpkin",
    character: "Dracula",
    tagline: "I Vant to Suck... Zero From the Power Grid!",
    quote: "The daylight gives YOU power, while I sleep peacefully with full battery reserves.",
    badge: "Lord of Darkness",
    color: "#9c27b0",
    accentColor: "#6a1b9a",
    defaultLocationHint: "Lurking around verified customer testimonials & reviews",
  },
  {
    id: "solar",
    name: "Solar Powered Pumpkin",
    character: "Accutek Solar Chief Tech",
    tagline: "High-Efficiency Monocrystalline Jack-o'-Lantern",
    quote: "32 years of Indiana sunshine converted into kilowatt hours with zero carbon emissions!",
    badge: "Clean Energy Hero",
    color: "#00E676",
    accentColor: "#00b0ff",
    defaultLocationHint: "Patrolling the mounting options & ground-mount arrays",
  },
  {
    id: "gandalf",
    name: "Gandalf the Green",
    character: "Gandalf",
    tagline: "You Shall Not Pass... High Utility Rates!",
    quote: "A solar system is never late, nor is it early. It generates precisely what you need.",
    badge: "Wizard of Watts",
    color: "#eab308",
    accentColor: "#ca8a04",
    defaultLocationHint: "Found wisdom in the FAQ & electrical questions",
  },
  {
    id: "frankenstein",
    name: "Frankenstein's Monster",
    character: "Frankenstein",
    tagline: "IT'S ALIVE! 100% Standby Power & Backup Generators",
    quote: "Lightning strike? Grid collapse? Master installed Kohler standby power and I am energized!",
    badge: "Bolted & Charged",
    color: "#10b981",
    accentColor: "#047857",
    defaultLocationHint: "Guarding our services bento & battery storage",
  },
];

const STORAGE_KEY = "accutek_halloween_hunt_found_v1";

export function usePumpkinHunt() {
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFoundIds(JSON.parse(stored));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const collectPumpkin = (id: string) => {
    setFoundIds((prev) => {
      if (prev.includes(id)) {
        toast.info("You've already found this pumpkin!");
        return prev;
      }
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      const item = CHARACTER_PUMPKINS.find((p) => p.id === id);
      toast.success(
        `🎃 Found: ${item?.name || "Halloween Pumpkin"}! (${next.length}/5)`,
        {
          description: next.length === 5 ? "🎉 You've collected all 5 pumpkins!" : "Keep exploring to find the rest!",
        }
      );
      return next;
    });
  };

  const resetHunt = () => {
    setFoundIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    toast.info("Pumpkin hunt progress reset! 🎃");
  };

  return {
    foundIds,
    isFound: (id: string) => foundIds.includes(id),
    collectPumpkin,
    resetHunt,
    count: foundIds.length,
    total: CHARACTER_PUMPKINS.length,
    isComplete: foundIds.length >= CHARACTER_PUMPKINS.length,
    isLoaded,
  };
}

export function PumpkinCollectible({
  pumpkinId,
  className = "",
  size = "md",
}: {
  pumpkinId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { isFound, collectPumpkin, isLoaded } = usePumpkinHunt();
  const theme = useHolidayTheme();

  if (theme?.name !== "halloween") return null;

  const pumpkin = CHARACTER_PUMPKINS.find((p) => p.id === pumpkinId);
  if (!pumpkin) return null;

  const found = isLoaded && isFound(pumpkinId);

  const sizeClasses = {
    sm: "w-10 h-10 text-xl",
    md: "w-14 h-14 text-3xl",
    lg: "w-18 h-18 text-4xl",
  }[size];

  return (
    <button
      type="button"
      onClick={() => collectPumpkin(pumpkinId)}
      data-testid={`pumpkin-collectible-${pumpkinId}`}
      className={`group relative pointer-events-auto inline-flex items-center justify-center rounded-2xl p-2 transition-all duration-300 hover:scale-110 active:scale-95 focus-ring ${className}`}
      title={found ? `${pumpkin.name} (Collected!)` : `Click to collect ${pumpkin.name}!`}
      aria-label={`Halloween Pumpkin Hunt: Collect ${pumpkin.name}`}
    >
      {/* Glow pulse */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          found
            ? "bg-emerald-500/20 border border-emerald-500/40"
            : "bg-orange-500/30 border-2 border-orange-400 animate-pulse shadow-[0_0_20px_rgba(255,117,24,0.6)]"
        }`}
      />

      {/* SVG Pumpkin with unmistakable character details */}
      <div className={`relative z-10 flex items-center justify-center ${sizeClasses}`}>
        {pumpkinId === "mad-max" && <MadMaxSvg found={found} />}
        {pumpkinId === "dracula" && <DraculaSvg found={found} />}
        {pumpkinId === "solar" && <SolarSvg found={found} />}
        {pumpkinId === "gandalf" && <GandalfSvg found={found} />}
        {pumpkinId === "frankenstein" && <FrankensteinSvg found={found} />}
      </div>

      {/* Status indicator */}
      <div className="absolute -top-1 -right-1 z-20">
        {found ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-black text-[10px] font-black shadow-md">
            ✓
          </span>
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-black text-[10px] font-black shadow-md animate-bounce">
            !
          </span>
        )}
      </div>
    </button>
  );
}

/* ---------------- Character SVGs ---------------- */

function MadMaxSvg({ found }: { found: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Pumpkin Body */}
      <circle cx="50" cy="55" r="38" fill="#e65100" stroke="#bf360c" strokeWidth="3" />
      <ellipse cx="32" cy="55" rx="16" ry="36" fill="#f57c00" opacity="0.6" />
      <ellipse cx="68" cy="55" rx="16" ry="36" fill="#f57c00" opacity="0.6" />
      {/* Metal Warboy/Immortan Jaw Mask */}
      <path d="M 22 55 Q 50 88 78 55 L 75 75 Q 50 92 25 75 Z" fill="#424242" stroke="#212121" strokeWidth="2" />
      <line x1="30" y1="62" x2="70" y2="62" stroke="#9e9e9e" strokeWidth="2" />
      <line x1="35" y1="70" x2="65" y2="70" stroke="#9e9e9e" strokeWidth="2" />
      {/* Metal respirator tubes */}
      <circle cx="34" cy="66" r="4" fill="#212121" stroke="#ff9800" strokeWidth="1" />
      <circle cx="66" cy="66" r="4" fill="#212121" stroke="#ff9800" strokeWidth="1" />
      {/* Chrome spiked goggles */}
      <circle cx="36" cy="42" r="11" fill="#212121" stroke="#9e9e9e" strokeWidth="3" />
      <circle cx="64" cy="42" r="11" fill="#212121" stroke="#9e9e9e" strokeWidth="3" />
      <circle cx="36" cy="42" r="5" fill="#ffb300" />
      <circle cx="64" cy="42" r="5" fill="#ffb300" />
      {/* Goggle strap */}
      <line x1="12" y1="42" x2="25" y2="42" stroke="#616161" strokeWidth="4" />
      <line x1="75" y1="42" x2="88" y2="42" stroke="#616161" strokeWidth="4" />
      {/* Stem */}
      <path d="M 46 20 Q 50 8 58 14 Q 52 22 48 24 Z" fill="#2e7d32" />
    </svg>
  );
}

function DraculaSvg({ found }: { found: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* High Dracula Cape Collar behind pumpkin */}
      <path d="M 10 70 L 20 20 L 40 40 L 60 40 L 80 20 L 90 70 Z" fill="#b71c1c" stroke="#4a148c" strokeWidth="3" />
      {/* Pumpkin Body */}
      <circle cx="50" cy="55" r="36" fill="#e65100" stroke="#311b92" strokeWidth="3" />
      {/* Widow's Peak Hair */}
      <path d="M 22 42 Q 35 25 50 38 Q 65 25 78 42 Q 50 18 22 42 Z" fill="#212121" />
      {/* Piercing Vampire Eyes */}
      <ellipse cx="36" cy="48" rx="6" ry="4" fill="#d50000" />
      <ellipse cx="64" cy="48" rx="6" ry="4" fill="#d50000" />
      <circle cx="36" cy="48" r="2" fill="#ffffff" />
      <circle cx="64" cy="48" r="2" fill="#ffffff" />
      {/* Mouth with White Fangs */}
      <path d="M 32 68 Q 50 78 68 68 Q 50 72 32 68 Z" fill="#212121" />
      <polygon points="40,68 44,68 42,75" fill="#ffffff" />
      <polygon points="56,68 60,68 58,75" fill="#ffffff" />
      {/* Red bat bowtie */}
      <polygon points="50,82 40,78 40,86" fill="#c62828" />
      <polygon points="50,82 60,78 60,86" fill="#c62828" />
      <circle cx="50" cy="82" r="3" fill="#ffebee" />
    </svg>
  );
}

function SolarSvg({ found }: { found: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Pumpkin Body */}
      <circle cx="50" cy="55" r="38" fill="#e65100" stroke="#00c853" strokeWidth="3" />
      {/* Solar Panel Monocrystalline Grid Glasses */}
      <rect x="22" y="36" width="24" height="18" rx="3" fill="#0d47a1" stroke="#00e676" strokeWidth="2" />
      <rect x="54" y="36" width="24" height="18" rx="3" fill="#0d47a1" stroke="#00e676" strokeWidth="2" />
      {/* Solar grid lines */}
      <line x1="34" y1="36" x2="34" y2="54" stroke="#64b5f6" strokeWidth="1" />
      <line x1="22" y1="45" x2="46" y2="45" stroke="#64b5f6" strokeWidth="1" />
      <line x1="66" y1="36" x2="66" y2="54" stroke="#64b5f6" strokeWidth="1" />
      <line x1="54" y1="45" x2="78" y2="45" stroke="#64b5f6" strokeWidth="1" />
      <line x1="46" y1="45" x2="54" y2="45" stroke="#00e676" strokeWidth="3" />
      {/* Smiling technical jack-o-lantern mouth */}
      <path d="M 32 68 Q 50 82 68 68 Q 50 74 32 68 Z" fill="#00e676" />
      {/* Mini rooftop solar panel on top / stem replaced by solar cells */}
      <polygon points="38,20 62,20 68,10 32,10" fill="#1565c0" stroke="#00e676" strokeWidth="1.5" />
      <line x1="50" y1="10" x2="50" y2="20" stroke="#90caf9" strokeWidth="1" />
    </svg>
  );
}

function GandalfSvg({ found }: { found: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Wizard Hat Base */}
      <ellipse cx="50" cy="38" rx="42" ry="8" fill="#424242" stroke="#212121" strokeWidth="2" />
      {/* Wizard Hat Cone */}
      <path d="M 22 38 Q 46 8 68 6 Q 52 24 78 38 Z" fill="#616161" stroke="#212121" strokeWidth="2" />
      <polygon points="46,30 54,30 50,22" fill="#ffd54f" />
      {/* Pumpkin Body */}
      <circle cx="50" cy="58" r="34" fill="#e65100" stroke="#bf360c" strokeWidth="3" />
      {/* Gandalf Long Wizard Beard */}
      <path d="M 25 58 Q 50 100 75 58 Q 65 72 50 78 Q 35 72 25 58 Z" fill="#eeeeee" stroke="#bdbdbd" strokeWidth="2" />
      <path d="M 38 60 Q 50 92 62 60" fill="none" stroke="#e0e0e0" strokeWidth="2" />
      {/* Bushy Eyebrows & Wise Eyes */}
      <path d="M 30 46 Q 38 42 44 48" stroke="#eeeeee" strokeWidth="3" fill="none" />
      <path d="M 56 48 Q 62 42 70 46" stroke="#eeeeee" strokeWidth="3" fill="none" />
      <circle cx="38" cy="51" r="3" fill="#ffb300" />
      <circle cx="62" cy="51" r="3" fill="#ffb300" />
    </svg>
  );
}

function FrankensteinSvg({ found }: { found: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
      {/* Neck / Side Electrical Electrodes / Bolts */}
      <rect x="8" y="52" width="10" height="8" rx="2" fill="#9e9e9e" stroke="#424242" strokeWidth="2" />
      <rect x="82" y="52" width="10" height="8" rx="2" fill="#9e9e9e" stroke="#424242" strokeWidth="2" />
      {/* Pumpkin Body - sickly green-orange */}
      <circle cx="50" cy="55" r="38" fill="#558b2f" stroke="#2e7d32" strokeWidth="3" />
      {/* Flat top dark hair with zig-zags */}
      <path d="M 18 42 L 24 50 L 32 40 L 40 50 L 50 38 L 60 50 L 68 40 L 76 50 L 82 42 Q 50 16 18 42 Z" fill="#212121" />
      {/* Forehead stitches */}
      <line x1="32" y1="46" x2="68" y2="46" stroke="#212121" strokeWidth="3" />
      <line x1="40" y1="42" x2="40" y2="50" stroke="#212121" strokeWidth="2" />
      <line x1="52" y1="42" x2="52" y2="50" stroke="#212121" strokeWidth="2" />
      <line x1="62" y1="42" x2="62" y2="50" stroke="#212121" strokeWidth="2" />
      {/* Heavy Droopy Eyes */}
      <rect x="30" y="54" width="12" height="6" rx="2" fill="#ffe082" stroke="#212121" strokeWidth="2" />
      <rect x="58" y="54" width="12" height="6" rx="2" fill="#ffe082" stroke="#212121" strokeWidth="2" />
      {/* Flat stitch mouth */}
      <line x1="36" y1="74" x2="64" y2="74" stroke="#212121" strokeWidth="4" />
      <line x1="42" y1="70" x2="42" y2="78" stroke="#212121" strokeWidth="2" />
      <line x1="50" y1="70" x2="50" y2="78" stroke="#212121" strokeWidth="2" />
      <line x1="58" y1="70" x2="58" y2="78" stroke="#212121" strokeWidth="2" />
    </svg>
  );
}

/* ---------------- Main Pumpkin Hunt Board Component ---------------- */

export default function HalloweenPumpkinHuntSection() {
  const theme = useHolidayTheme();
  const { foundIds, count, total, isComplete, resetHunt, isLoaded } = usePumpkinHunt();
  const [showModal, setShowModal] = useState(false);

  if (theme?.name !== "halloween") return null;

  return (
    <section
      id="halloween-pumpkin-hunt"
      data-testid="halloween-pumpkin-hunt-section"
      className="py-16 md:py-24 bg-gradient-to-b from-[#120a1f] via-[#1a0e2e] to-[#0c0517] text-white border-y border-orange-500/30 relative overflow-hidden"
    >
      {/* Background spooky glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto container-px relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-orange-400 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" /> HALLOWEEN COMMUNITY SPECIAL
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-white">
              The Great Accutek <span className="text-orange-500">Pumpkin Hunt</span>
            </h2>
            <p className="mt-3 text-white/70 max-w-2xl text-base sm:text-lg leading-relaxed">
              5 legendary character pumpkins have escaped across the Accutek Solar website! Click to collect each one as you explore our solar services, customer reviews, mounting options, and cost calculators.
            </p>
          </div>

          <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-5 shadow-ambient flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-left">
              <div className="text-[10px] uppercase tracking-widest font-mono text-orange-400">Hunt Status</div>
              <div className="font-heading text-3xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
                <span>{count} / {total}</span>
                <span className="text-xs font-mono font-normal text-white/60">Pumpkins Found</span>
              </div>
            </div>

            <div className="flex gap-2">
              {isComplete ? (
                <button
                  onClick={() => setShowModal(true)}
                  data-testid="claim-starbucks-button"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-black shadow-lg hover:shadow-emerald-500/50 transition focus-ring"
                >
                  <Trophy className="w-4 h-4" /> Claim Entry
                </button>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-xl bg-orange-500/20 border border-orange-500/40 px-4 py-2.5 text-xs font-mono text-orange-300">
                  🎃 Find all 5 to enter drawing
                </span>
              )}

              {count > 0 && (
                <button
                  onClick={resetHunt}
                  title="Reset hunt progress"
                  className="p-2.5 rounded-xl border border-white/20 text-white/60 hover:text-white hover:bg-white/10 transition focus-ring"
                  aria-label="Reset pumpkin hunt"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 5 Character Pumpkin Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {CHARACTER_PUMPKINS.map((pumpkin) => {
            const found = isLoaded && foundIds.includes(pumpkin.id);
            return (
              <div
                key={pumpkin.id}
                data-testid={`pumpkin-card-${pumpkin.id}`}
                className={`relative rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                  found
                    ? "bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-black/40 border-orange-500/20 hover:border-orange-500/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor: found ? "#10b981" : pumpkin.color,
                        color: found ? "#10b981" : pumpkin.color,
                      }}
                    >
                      {pumpkin.badge}
                    </span>
                    <span className="text-xs font-mono">
                      {found ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> FOUND
                        </span>
                      ) : (
                        <span className="text-white/40">HIDDEN</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-center my-3">
                    <PumpkinCollectible pumpkinId={pumpkin.id} size="lg" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white text-center mt-2">
                    {pumpkin.name}
                  </h3>
                  <div className="text-[11px] font-mono text-orange-400/90 text-center mt-0.5">
                    "{pumpkin.tagline}"
                  </div>

                  <p className="mt-3 text-xs text-white/70 italic text-center leading-relaxed">
                    "{pumpkin.quote}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-[10px] font-mono text-white/50 text-center">
                  {found ? (
                    <span className="text-emerald-400">✓ Added to your collection</span>
                  ) : (
                    <span>📍 Hint: {pumpkin.defaultLocationHint}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Starbucks Drawing Placeholder Disclaimer Box */}
        <div className="mt-12 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-950/40 via-purple-950/30 to-orange-950/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 grid place-items-center shrink-0 text-2xl">
              ☕
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-orange-400">Seasonal Giveaway Preview</div>
              <h4 className="font-heading text-xl font-bold text-white mt-0.5">
                Starbucks Gift Card Random Drawing
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
                Complete the hunt to unlock entry into our seasonal coffee drawing (5 gift cards total awarded at end of campaign). 
                <span className="block mt-1 text-white/50 text-[11px]">
                  * Contest not live — demonstration placeholder for the Accutek Solar seasonal promotion. No purchase necessary. Void where prohibited.
                </span>
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (isComplete) {
                setShowModal(true);
              } else {
                toast.info(`Find all 5 pumpkins first! You currently have ${count}/5.`);
              }
            }}
            data-testid="starbucks-drawing-card-cta"
            className={`w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition focus-ring ${
              isComplete
                ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-green-glow"
                : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
          >
            <Gift className="w-4 h-4" /> {isComplete ? "View Drawing Entry" : `Found ${count}/5 Pumpkins`}
          </button>
        </div>
      </div>

      {/* Completion Modal / Starbucks Drawing Card */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          data-testid="pumpkin-hunt-completion-modal"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border-2 border-orange-500/50 bg-[#160c26] p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition focus-ring"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-500/20 border border-emerald-500/50 text-4xl mb-4">
                ☕
              </div>
              <div className="text-[10px] uppercase tracking-widest font-mono text-emerald-400">
                PUMPKIN HUNT COMPLETED (5/5)
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-black mt-1">
                You Found All 5 Pumpkins!
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Mad Max, Dracula, Solar, Gandalf, and Frankenstein are all accounted for!
              </p>
            </div>

            {/* Virtual Starbucks Drawing Voucher Card */}
            <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 to-black p-5 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
                <div className="flex items-center gap-2">
                  <span className="text-xl">☕</span>
                  <span className="font-heading font-black tracking-wide text-white text-sm">
                    STARBUCKS DRAWING ENTRY
                  </span>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  DEMO TICKET
                </span>
              </div>

              <div className="py-4 space-y-2">
                <div className="text-xs text-white/70">
                  <span className="text-white/40 font-mono">Drawing Pool:</span> 5 Total Gift Cards
                </div>
                <div className="text-xs text-white/70">
                  <span className="text-white/40 font-mono">Campaign:</span> Accutek Solar 2026 Halloween Spooktacular
                </div>
                <div className="text-xs text-white/70">
                  <span className="text-white/40 font-mono">Status:</span> Qualified Entry (All 5 Pumpkins Logged)
                </div>
              </div>

              <div className="pt-3 border-t border-emerald-500/20 text-[11px] font-mono text-emerald-400/90 text-center">
                * Contest not live — promotional placeholder. No purchase required.
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  toast.success("Halloween drawing entry recorded locally!");
                }}
                className="flex-1 rounded-xl bg-orange-500 text-black py-3 text-xs font-bold uppercase tracking-wider hover:bg-orange-400 transition focus-ring"
              >
                Close &amp; Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
