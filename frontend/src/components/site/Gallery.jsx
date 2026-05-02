import React from "react";
import { GALLERY } from "@/lib/site-data";

export default function Gallery() {
  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <p className="label-tag text-amberDark mb-4">— Real installs</p>
            <h2 className="font-display text-4xl lg:text-6xl font-bold tracking-tighter text-ink leading-[0.95]">
              Built by us.
              <br />
              <span className="italic font-light">Standing on roofs near you.</span>
            </h2>
          </div>
          <p className="font-mono text-sm text-ink2 max-w-xs">
            Selected work from across Indiana & Illinois. Every photo is an
            AccuTek install — no stock images.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3 lg:gap-4">
          {GALLERY.map((g, i) => {
            const span =
              i === 0
                ? "col-span-12 md:col-span-8 aspect-[16/9]"
                : i === 1
                ? "col-span-12 md:col-span-4 aspect-[4/3]"
                : i === 2
                ? "col-span-6 md:col-span-4 aspect-[4/3]"
                : i === 3
                ? "col-span-6 md:col-span-4 aspect-[4/3]"
                : i === 4
                ? "col-span-6 md:col-span-4 aspect-[4/3]"
                : "col-span-12 md:col-span-12 aspect-[21/9]";
            return (
              <figure
                key={i}
                data-testid={`gallery-item-${i}`}
                className={`relative overflow-hidden bg-bone2 border border-line group ${span}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-forest/90 to-transparent text-bone label-tag">
                  {g.alt}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
