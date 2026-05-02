import React, { useState } from "react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative bg-forest text-bone py-24 lg:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <p className="label-tag text-amber mb-4">— What customers say</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter leading-[0.95]">
              Reviews from
              <br />
              the people who
              <br />
              <span className="italic font-light text-amber">flipped the switch.</span>
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-8 relative">
            <Quote className="absolute -top-4 -left-2 h-16 w-16 text-amber/20" strokeWidth={1} />
            <blockquote
              key={i}
              data-testid="testimonial-quote"
              className="relative font-display text-2xl lg:text-3xl font-light leading-snug text-bone animate-fade-up"
            >
              "{t.quote}"
            </blockquote>
            <div className="mt-8 flex items-center justify-between border-t border-bone/15 pt-6">
              <div>
                <div data-testid="testimonial-author" className="font-mono text-sm text-amber">{t.author}</div>
                <div data-testid="testimonial-location" className="text-xs text-bone/60 mt-1">{t.location}</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  data-testid="testimonial-prev"
                  onClick={prev}
                  className="h-10 w-10 border border-bone/20 hover:bg-bone hover:text-ink transition-colors flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  data-testid="testimonial-next"
                  onClick={next}
                  className="h-10 w-10 border border-bone/20 hover:bg-bone hover:text-ink transition-colors flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <span className="font-mono text-xs text-bone/50 ml-3">
                  {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
