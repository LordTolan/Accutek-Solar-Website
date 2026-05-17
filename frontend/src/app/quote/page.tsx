import QuoteWizard from "@/components/QuoteWizard";

export const metadata = { title: "Get Your Free Solar Estimate" };

export default function QuotePage() {
  return (
    <section className="py-16 md:py-24" data-testid="quote-page">
      <div className="container mx-auto container-px max-w-3xl">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// FREE · NO PRESSURE · ~60 SECONDS</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Let's design a system that fits your roof, <span className="text-primary text-glow">your bill, your budget.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Six quick questions from our Accutek Operations playbook — then an instant 25-year savings estimate. A real human follows up, usually same day.
        </p>
        <div className="mt-10">
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
