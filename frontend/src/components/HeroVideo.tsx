"use client";

import { useRef, useEffect } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slightly slower for a more cinematic feel
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-10" />
      
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-poster.jpg"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover grayscale opacity-40 brightness-75"
      >
        <source src="/media/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Grid overlay for technical vibe */}
      <div className="absolute inset-0 grid-bg opacity-30 z-10" />
    </div>
  );
}
