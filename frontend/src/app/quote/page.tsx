import QuoteWizard from "@/components/QuoteWizard";

export const metadata = { title: "Get Your Free Solar Estimate" };

export default function QuotePage() {
  return (
    <section className="py-16 md:py-24" data-testid="quote-page">
      <div className="container mx-auto container-px max-w-3xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Free · No pressure · 60 seconds</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Let's design a system that fits your roof, your bill, your budget.
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Answer three quick questions and we'll give you an instant 25-year savings estimate. A real human follows up — usually same day.
        </p>
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
