import CalculatorClient from "@/components/CalculatorClient";

export const metadata = { title: "Solar Savings Calculator" };

export default function CalculatorPage() {
  return (
    <section className="py-16 md:py-24" data-testid="calculator-page">
      <div className="container mx-auto container-px max-w-6xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Tools</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">Solar Savings Calculator</h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">Drag the slider to see how much solar could save you over 25 years.</p>
        <div className="mt-12"><CalculatorClient /></div>
      </div>
    </section>
  );
}
