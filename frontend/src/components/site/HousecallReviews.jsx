import React from "react";
import { Star, ShieldCheck } from "lucide-react";

export default function HousecallReviews() {
  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="relative bg-bone py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-12">
          <div className="col-span-12 lg:col-span-7">
            <p className="label-tag text-amberDark mb-4 flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              — Verified customer reviews
            </p>
            <h2 className="font-display text-4xl lg:text-6xl font-extrabold tracking-tighter text-ink leading-[0.95]">
              What our customers
              <br />
              <span className="italic font-semibold">are saying.</span>
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-base text-ink2 leading-relaxed">
              Live reviews collected through Housecall Pro after every job —
              unfiltered, verified, and posted directly by the homeowners we've
              served.
            </p>
          </div>
        </div>

        {/* Widget container */}
        <div
          data-testid="housecall-widget-container"
          className="mx-auto w-full max-w-[1000px] bg-bone2 border border-line p-2 sm:p-4"
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-line mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber fill-amber" />
              <span className="label-tag text-ink2">
                Powered by Housecall Pro
              </span>
            </div>
            <span className="font-mono text-[10px] text-ink2/60 hidden sm:inline">
              Live · Updated continuously
            </span>
          </div>
          <iframe
            src="https://client.housecallpro.com/reviews/widget/097cf23f-be1a-41ea-981b-8e6b9c7514eb"
            title="Accutek Solar — Housecall Pro Customer Reviews"
            data-testid="housecall-iframe"
            className="block w-full bg-bone"
            style={{ border: "none", height: "1000px" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
