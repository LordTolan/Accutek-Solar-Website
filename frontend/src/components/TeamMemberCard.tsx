"use client";

import { useState } from "react";
import { User } from "lucide-react";

type Props = {
  name: string;
  role: string;
  slug: string;
  bio: string;
  index?: number;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// Subtle accent rotation so each placeholder feels distinct but on-brand
const ACCENTS = [
  "from-primary/20 to-primary/5",
  "from-secondary/30 to-secondary/5",
  "from-primary/15 to-secondary/15",
  "from-secondary/20 to-primary/10",
];

/**
 * Team member card with branded initials placeholder.
 *
 * To swap in a real headshot: drop a JPG at /app/frontend/public/team/{slug}.jpg
 * (recommended size: 800x800 or larger, square crop). The image is loaded
 * automatically; if it's missing, the styled initials block stays.
 */
export default function TeamMemberCard({ name, role, slug, bio, index = 0 }: Props) {
  const [imgOk, setImgOk] = useState(true);
  const initials = getInitials(name);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <article className="group" data-testid={`team-card-${slug}`}>
      <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card shadow-ambient transition hover:shadow-ambient-lg hover:-translate-y-1">
        {/* Branded initials placeholder (always rendered) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${accent} grid place-items-center`}
          aria-hidden={imgOk ? "true" : undefined}
        >
          <div className="text-center">
            <span className="block font-heading text-[6rem] md:text-[7rem] font-black leading-none text-primary tracking-tight" data-testid={`team-initials-${slug}`}>
              {initials}
            </span>
            <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-mono text-foreground/60">
              <User className="w-3 h-3" /> headshot | drop /team/{slug}.jpg
            </div>
          </div>
        </div>

        {/* Real headshot overlays on top of placeholder when /team/{slug}.jpg exists */}
        <img
          src={`/team/${slug}.jpg`}
          alt={`${name} - ${role}`}
          loading="lazy"
          decoding="async"
          onError={() => setImgOk(false)}
          onLoad={(e) => {
            // Mark OK only if the image actually loaded with non-zero dimensions
            const img = e.currentTarget as HTMLImageElement;
            if (img.naturalWidth > 0) setImgOk(true);
          }}
          className={`relative w-full h-full object-cover transition-opacity duration-300 ${imgOk ? "opacity-100" : "opacity-0"}`}
          data-testid={`team-photo-${slug}`}
        />

        {/* Role chip */}
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.22em] font-mono px-2.5 py-1 rounded bg-background/90 border border-border text-primary backdrop-blur" data-testid={`team-role-chip-${slug}`}>
          // {role}
        </span>
      </div>

      <h3 className="mt-5 font-heading text-xl md:text-2xl font-extrabold" data-testid={`team-name-${slug}`}>{name}</h3>
      <p className="mt-2 text-sm text-foreground/70 leading-relaxed" data-testid={`team-bio-${slug}`}>{bio}</p>
    </article>
  );
}
