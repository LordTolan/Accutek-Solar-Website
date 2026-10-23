import { Star, ShieldCheck } from "lucide-react";
import { PumpkinCollectible } from "@/components/HalloweenPumpkinHunt";

export default function HCPReviews() {
  return (
    <section className="py-20 md:py-28 bg-card/40 border-y border-border relative" data-testid="hcp-reviews-section">
      <div className="container mx-auto container-px">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">
              What our customers <span className="text-primary">are saying.</span>
            </h2>
            <p className="mt-3 text-foreground/70 max-w-xl text-base">
              Real feedback from residential, agricultural, and commercial solar installations across West Central Indiana & East Central Illinois.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border shadow-ambient text-xs font-mono text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Verified Housecall Pro Partner</span>
              <div className="flex text-amber-400 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
            <PumpkinCollectible pumpkinId="dracula" size="sm" />
          </div>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-border bg-background shadow-ambient-lg p-1 md:p-2">
          <iframe
            src="https://client.housecallpro.com/reviews/widget/097cf23f-be1a-41ea-981b-8e6b9c7514eb"
            height="900"
            width="100%"
            style={{ border: "none", display: "block" }}
            title="Accutek Solar Customer Reviews"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

