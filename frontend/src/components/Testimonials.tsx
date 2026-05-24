"use client";

import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    initials: "A.F.",
    location: "Dana, IN",
    quote: "Superior knowledge of his products along with great service and reliability!",
    rating: 5,
  },
  {
    initials: "E.D.",
    location: "Clinton, IN",
    quote: "Accutek Solar designed a customized system for us based upon our location, lifestyle, and budget. We are extremely satisfied with our PV panels and solar thermal tubes. Clean solar energy has enabled us to lower our carbon footprint and eliminate our monthly electric bill.",
    rating: 5,
  },
  {
    initials: "J.V.",
    location: "Terre Haute, IN",
    quote: "I am really glad I decided to buy a system from Accutek. There is no better feeling than seeing your electric meter spin backwards! System was installed in a timely manner with professionalism and has been working flawlessly since.",
    rating: 5,
  },
  {
    initials: "J.R.",
    location: "Ivy Tech, Lafayette, IN",
    quote: "Accutek has been key in the design, integration, and custom installation of new and existing systems at the Craig Porter Energy Center. Their expertise and installation quality is one to admire.",
    rating: 5,
  },
];

type T = { initials: string; location: string; quote: string; rating: number };

export default function Testimonials() {
  const items: T[] = TESTIMONIALS;
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", () => setSelected(embla.selectedScrollSnap()));
  }, [embla]);

  if (!items.length) return null;

  return (
    <section className="py-20 md:py-28" data-testid="testimonials-section">
      <div className="container mx-auto container-px">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Real customers \u00b7 Real results</div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">From neighbors who chose the future.</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => embla?.scrollPrev()} aria-label="Previous" className="w-11 h-11 grid place-items-center rounded-full border border-border hover:bg-muted focus-ring" data-testid="testimonial-prev">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => embla?.scrollNext()} aria-label="Next" className="w-11 h-11 grid place-items-center rounded-full border border-border hover:bg-muted focus-ring" data-testid="testimonial-next">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {items.map((t, i) => (
              <div key={i} className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 rounded-2xl border border-border/60 bg-card p-7 shadow-ambient" data-testid={`testimonial-${i}`}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-6">\u201c{t.quote}\u201d</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center text-sm font-bold">{t.initials}</div>
                  <div className="text-sm text-foreground/60">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {items.map((_, i) => (
            <button key={i} onClick={() => embla?.scrollTo(i)} className={`w-2.5 h-2.5 rounded-full transition ${i === selected ? "bg-primary" : "bg-border"}`} aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
