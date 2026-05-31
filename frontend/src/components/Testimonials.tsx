"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";

type T = { initials: string; location: string; quote: string; rating: number };

const STATIC_TESTIMONIALS: T[] = [
  {
    initials: "A.F.",
    location: "Dana, IN",
    quote: "Superior knowledge of his products along with great service and reliability!",
    rating: 5,
  },
  {
    initials: "E.D.",
    location: "Clinton, IN",
    quote: "Accutek Solar designed a customized system for us based upon our location, lifestyle, and budget. We are extremely satisfied with our PV panels and solar thermal tubes. Clean solar energy has enabled us to lower our carbon footprint and eliminated our monthly electric bill while maintaining a very comfortable lifestyle.",
    rating: 5,
  },
  {
    initials: "J.V.",
    location: "Terre Haute, IN",
    quote: "I am really glad I decided to buy a system from Accutek Systems Inc. There is no better feeling than seeing your electric meter spin backwards! System was installed in a timely manner with professionalism and has been working flawlessly since.",
    rating: 5,
  },
  {
    initials: "J.R.",
    location: "Ivy Tech Community College, Lafayette, IN",
    quote: "Accutek has been key in the design, integration, and custom installation of new and existing systems at the Craig Porter Energy Center. Their expertise and installation quality is one to admire.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [items, setItems] = useState<T[]>(STATIC_TESTIMONIALS);
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    api.getTestimonials()
      .then((d) => { if (d.testimonials?.length) setItems(d.testimonials); })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (!embla) return;
    embla.on("select", () => setSelected(embla.selectedScrollSnap()));
  }, [embla]);

  return (
    <section className="py-20 md:py-28" data-testid="testimonials-section">
      <div className="container mx-auto container-px">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Real customers | Real results</div>
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
              <article key={i} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] bg-card rounded-2xl p-8 shadow-ambient border border-border/60" data-testid={`testimonial-${i}`}>
                <div className="flex gap-1 text-primary">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="w-4 h-4 fill-primary" />)}
                </div>
                <p className="mt-5 text-base leading-relaxed text-foreground/85">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground grid place-items-center font-heading font-bold text-sm">{t.initials}</div>
                  <div className="text-sm">
                    <div className="font-semibold">{t.initials}</div>
                    <div className="text-muted-foreground">{t.location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="md:hidden mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === selected ? "w-8 bg-primary" : "w-2 bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
