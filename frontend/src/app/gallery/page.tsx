"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarClock, X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/lib/site-data";
import { HCP_BOOK_URL } from "@/lib/utils";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function openLightbox(i: number) {
    setLightbox(i);
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = "";
  }

  function navigate(dir: -1 | 1) {
    if (lightbox === null) return;
    const next = (lightbox + dir + GALLERY.length) % GALLERY.length;
    setLightbox(next);
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border" data-testid="gallery-hero">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-50" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" aria-hidden="true" />
        <div className="relative container mx-auto container-px py-16 md:py-24 max-w-6xl">
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// OUR WORK</div>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-balance leading-[1.05]"
            data-testid="gallery-title"
          >
            Every install tells a <span className="text-primary">story.</span>
          </h1>
          <p className="mt-5 text-foreground/70 text-lg max-w-2xl leading-relaxed">
            Solar arrays, battery banks, standby generators, and electrical work across Indiana and
            Illinois. Click any image to see the full-size photo.
          </p>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 md:py-24" data-testid="gallery-grid-section">
        <div className="container mx-auto container-px max-w-7xl">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {GALLERY.map((img, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group relative mb-4 break-inside-avoid block w-full rounded-xl overflow-hidden border border-border bg-card shadow-ambient hover:shadow-ambient-lg hover:-translate-y-0.5 transition focus-ring"
                data-testid={`gallery-item-${i}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  <div className="text-sm font-heading font-bold text-foreground">{img.alt}</div>
                  {img.location && (
                    <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mt-1">
                      {img.location}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
          data-testid="gallery-lightbox"
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 p-2 rounded-md bg-card border border-border hover:border-primary transition focus-ring"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(-1);
            }}
            className="absolute left-4 z-10 p-2 rounded-md bg-card border border-border hover:border-primary transition focus-ring"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="max-w-5xl max-h-[85vh] mx-14 rounded-xl overflow-hidden border border-border shadow-ambient-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={GALLERY[lightbox].src}
              alt={GALLERY[lightbox].alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            <div className="bg-card p-4 border-t border-border">
              <div className="font-heading font-bold">{GALLERY[lightbox].alt}</div>
              {GALLERY[lightbox].location && (
                <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mt-1">
                  {GALLERY[lightbox].location}
                </div>
              )}
              <div className="text-xs text-muted-foreground mt-1">
                {lightbox + 1} / {GALLERY.length}
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(1);
            }}
            className="absolute right-4 z-10 p-2 rounded-md bg-card border border-border hover:border-primary transition focus-ring"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden border-t border-border" data-testid="gallery-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-background" />
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-40" />
        <div className="relative container mx-auto container-px text-center max-w-3xl">
          <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">// WANT YOUR SITE IN THE GALLERY?</div>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-balance">
            Let&apos;s design a system <span className="text-primary">worth showing off.</span>
          </h2>
          <p className="mt-4 text-foreground/70 text-lg">Free estimate, custom design, roof or ground - your call.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:shadow-green-glow transition focus-ring"
              data-testid="gallery-cta-quote"
            >
              Get free estimate <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={HCP_BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 font-bold uppercase tracking-wider text-sm hover:border-primary transition focus-ring"
              data-testid="gallery-cta-book"
            >
              <CalendarClock className="w-4 h-4" /> Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
