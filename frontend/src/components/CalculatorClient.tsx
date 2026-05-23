"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sun, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function CalculatorClient() {
  const [bill, setBill] = useState(180);
  const [type, setType] = useState<"residential" | "commercial">("residential");

  const r = useMemo(() => {
    const offset = type === "residential" ? 0.85 : 0.7;
    const annual = bill * 12 * offset;
    const tw = annual * 25 * 1.03;
    const kw = Math.max(2, Math.round((bill / 25) * 10) / 10);
    const payback = Math.max(4, Math.round(((kw * 2800) / Math.max(annual, 1)) * 10) / 10);
    return { annual, tw, kw, payback };
  }, [bill, type]);

  return (
    <div className="grid lg:grid-cols-5 gap-8" data-testid="calculator">
      <div className="lg:col-span-3 bg-card rounded-3xl border border-border/60 p-7 md:p-10 shadow-ambient">
        <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-5">Adjust your numbers</div>

        <div className="flex gap-2 mb-8">
          {(["residential", "commercial"] as const).map((s) => (
            <button key={s} onClick={() => setType(s)} className={`px-5 py-3 rounded-xl border text-sm font-bold capitalize transition ${type === s ? "border-primary bg-primary/10" : "border-border"}`} data-testid={`calc-type-${s}`}>{s}</button>
          ))}
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-3">
            <label className="text-sm font-bold">Average monthly electric bill</label>
            <span className="font-heading text-3xl font-black text-primary" data-testid="calc-bill-display">{formatCurrency(bill)}</span>
          </div>
          <input type="range" min={30} max={1500} step={10} value={bill}
            onChange={(e) => setBill(parseInt(e.target.value))}
            className="w-full accent-primary h-2"
            data-testid="calc-bill-slider" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>$30</span><span>$1500</span></div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
          Numbers are a directional estimate based on average Indiana / Illinois sun hours and offset rates. Your real estimate comes from a free Accutek site visit.
        </p>
      </div>

      <div className="lg:col-span-2 bg-secondary text-secondary-foreground rounded-3xl p-7 md:p-10 shadow-ambient-lg relative overflow-hidden" data-testid="calc-result">
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.18em] text-primary mb-3 flex items-center gap-2"><Sun className="w-3.5 h-3.5" /> Your estimate</div>
          <div className="font-heading text-5xl md:text-6xl font-black text-primary leading-none">{formatCurrency(r.tw)}</div>
          <div className="mt-2 text-secondary-foreground/70 text-sm">25-year estimated savings</div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-sm">
            <Mini label="Annual" value={formatCurrency(r.annual)} />
            <Mini label="System" value={`${r.kw} kW`} />
            <Mini label="Payback" value={`${r.payback} yr`} />
          </div>

          <Link href="/quote" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-bold w-full justify-center focus-ring" data-testid="calc-cta">
            Get my real estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-3">
      <div className="text-[10px] uppercase tracking-[0.18em] text-secondary-foreground/60">{label}</div>
      <div className="mt-1 font-heading text-lg font-extrabold">{value}</div>
    </div>
  );
}
