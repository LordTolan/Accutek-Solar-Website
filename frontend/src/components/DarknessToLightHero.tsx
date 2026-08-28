"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";

const MEDIA_BASE = "/media/darkness-to-light";
const MEDIA_VERSION = "20260828-text-free";

const mediaUrl = (fileName: string) => `${MEDIA_BASE}/${fileName}?v=${MEDIA_VERSION}`;

const HEADLINE = [
  { text: "32 Years of", accent: false },
  { text: "Energy", accent: true },
  { text: "Independence", accent: false },
];

const MARQUEE_ITEMS = [
  "Energy Independence",
  "Solar + Backup Power",
  "West Central Indiana",
  "Est. 1994",
  "Solar Done Right",
  "32 Years Strong",
];

const EASE_OUT: [number, number, number, number] = [0.33, 1, 0.68, 1];

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
};

export default function DarknessToLightHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [posterOnly, setPosterOnly] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    const isSlowNetwork = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
    setPosterOnly(Boolean(connection?.saveData || isSlowNetwork));
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || posterOnly || shouldReduceMotion) return;

    video.play().catch(() => {
      // The poster remains a polished fallback when a browser blocks autoplay.
    });
  }, [posterOnly, shouldReduceMotion]);

  const showVideo = !posterOnly && !shouldReduceMotion;
  const motionProps = shouldReduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : undefined;

  return (
    <section
      ref={sectionRef}
      data-testid="darkness-to-light-hero"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-[#1A1A1A] pb-16 text-[#E8E8E8] md:min-h-[calc(100svh-5rem)] md:pb-0"
      aria-labelledby="darkness-to-light-heading"
    >
      <motion.div style={shouldReduceMotion ? undefined : { scale: videoScale }} className="absolute inset-0">
        {!showVideo && (
          <img
            src={mediaUrl("accutek_hero_poster.jpg")}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {showVideo && (
          <video
            ref={videoRef}
            data-testid="darkness-to-light-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={mediaUrl("accutek_hero_poster.jpg")}
            aria-hidden="true"
            onTimeUpdate={(event) => {
              const video = event.currentTarget;
              if (!video.duration) return;
              const remaining = video.duration - video.currentTime;
              if (remaining < 0.3) {
                video.style.opacity = String(Math.max(0.4, remaining / 0.3));
              } else if (video.currentTime < 0.2) {
                video.style.opacity = String(Math.min(1, video.currentTime / 0.2));
              } else {
                video.style.opacity = "1";
              }
            }}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-150"
          >
            <source src={mediaUrl("hero_9x16.webm")} type="video/webm" media="(max-width: 768px)" />
            <source src={mediaUrl("hero_9x16.mp4")} type="video/mp4" media="(max-width: 768px)" />
            <source src={mediaUrl("hero_16x9.webm")} type="video/webm" />
            <source src={mediaUrl("hero_16x9.mp4")} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/15 to-[#090909]/60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#090909]/80 via-[#090909]/20 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,232,232,.55) 1px, transparent 1px), linear-gradient(90deg, rgba(232,232,232,.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,.65) 0, rgba(0,0,0,.65) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <motion.div
        style={shouldReduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-1 flex-col justify-end"
      >
        <div className="container mx-auto w-full container-px pb-12 pt-12 md:pb-16 md:pt-16 lg:pb-20">
          <div className="max-w-5xl">
            <motion.p
              {...motionProps}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
              className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[#00E676] sm:text-[11px]"
            >
              <span className="inline-block h-px w-10 bg-[#00E676]" />
              Solar + Backup Power
            </motion.p>

            <h1
              id="darkness-to-light-heading"
              className="font-heading text-5xl font-black uppercase leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl xl:text-8xl"
            >
              {HEADLINE.map((line, index) => (
                <span key={line.text} className="block overflow-hidden pb-1">
                  <motion.span
                    initial={shouldReduceMotion ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.85, delay: 0.35 + index * 0.14, ease: EASE_OUT }}
                    className={`block ${line.accent ? "text-[#00E676] drop-shadow-[0_0_24px_rgba(0,230,118,0.35)]" : "text-[#E8E8E8]"}`}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              {...motionProps}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.05, ease: EASE_OUT }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[#E8E8E8]/80 md:text-lg"
            >
              When the grid goes dark, your home does not have to. Get solar and backup power installed by the neighbors who have kept Indiana lights on for three decades.
            </motion.p>

            <motion.div
              {...motionProps}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2, ease: EASE_OUT }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link
                href="/quote"
                data-testid="darkness-to-light-quote-cta"
                className="group inline-flex min-h-12 items-center gap-3 bg-[#00E676] px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#0d0d0d] shadow-[0_0_24px_rgba(0,230,118,0.4)] transition hover:bg-white hover:shadow-[0_0_40px_rgba(0,230,118,0.65)] focus-ring"
              >
                Get a Backup Quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href={HCP_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="darkness-to-light-book-cta"
                className="inline-flex min-h-12 items-center border border-white/35 bg-black/20 px-7 py-3.5 font-heading text-sm font-bold uppercase tracking-[0.16em] text-[#E8E8E8] transition hover:border-[#00E676] hover:text-[#00E676] focus-ring"
              >
                Book Online
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 overflow-hidden border-t border-white/10 bg-[#111111]/80 py-3 backdrop-blur-sm" aria-label="Accutek Solar capabilities">
        <div className={`flex w-max items-center gap-9 whitespace-nowrap ${shouldReduceMotion ? "" : "animate-[hero-marquee_40s_linear_infinite]"}`}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-9 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E8E8E8]/55 sm:text-[11px]">
              {item}
              <span className="h-1 w-1 rotate-45 bg-[#00E676]/80" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
