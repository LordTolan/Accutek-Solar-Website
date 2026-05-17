"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cinematic hero video background.
 * - Autoplay + muted + loop + playsinline (mobile-friendly)
 * - Falls back to a still poster image if the video can't play.
 * - To swap video: replace VIDEO_SRC with the public file path.
 */
const VIDEO_SRC = "/media/hero.mp4"; // Place "Solar Wizard" mp4 at public/media/hero.mp4
const POSTER = "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onErr = () => setErrored(true);
    v.addEventListener("error", onErr);
    // Try to play (some mobile browsers need explicit call)
    v.play().catch(() => {/* autoplay blocked; static poster will show */});
    return () => v.removeEventListener("error", onErr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!errored && (
        <video
          ref={ref}
          src={VIDEO_SRC}
          poster={POSTER}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="hero-video"
        />
      )}
      {errored && (
        <img src={POSTER} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      {/* Cinematic vignette + green tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-black/50 to-transparent" />
      <div className="absolute inset-0 mix-blend-overlay" style={{ background: "radial-gradient(60% 60% at 30% 50%, hsl(123 55% 24% / 0.45), transparent 70%)" }} />
    </div>
  );
}
