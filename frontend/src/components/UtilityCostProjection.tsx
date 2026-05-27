"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

/* ─────────────────────────── Calculation Engine ─────────────────────────── */

interface Projection {
  annualCosts: number[]; // cost each year (0..N)
  totalPaid: number;
  finalMonthly: number;
  currentAnnual: number;
}

function calcProjection(
  monthlyBill: number,
  rate: number,
  years: number
): Projection {
  const A0 = monthlyBill * 12;
  const annualCosts: number[] = [];

  for (let t = 0; t <= years; t++) {
    annualCosts.push(A0 * Math.pow(1 + rate, t));
  }

  // Geometric series: Total = A0 * ((1+r)^N - 1) / r
  const totalPaid =
    rate > 0 ? A0 * ((Math.pow(1 + rate, years) - 1) / rate) : A0 * years;

  const finalMonthly = (A0 * Math.pow(1 + rate, years)) / 12;

  return { annualCosts, totalPaid, finalMonthly, currentAnnual: A0 };
}

/* ─────────────────────────── Animated Counter ─────────────────────────── */

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1200,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = to;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ──────────────────────────── SVG Chart ──────────────────────────── */

function EscalationChart({
  annualCosts,
  years,
}: {
  annualCosts: number[];
  years: number;
}) {
  const inView = useInView(useRef(null));

  const W = 600;
  const H = 220;
  const PAD = { top: 20, right: 20, bottom: 32, left: 10 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...annualCosts);
  const minVal = annualCosts[0];
  const range = maxVal - minVal || 1;

  // build path
  const points = annualCosts.map((v, i) => {
    const x = PAD.left + (i / years) * chartW;
    const y = PAD.top + chartH - ((v - minVal) / range) * chartH;
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD.top + chartH} L ${points[0].x} ${PAD.top + chartH} Z`;

  // Year labels
  const yearLabels = [0, Math.round(years / 3), Math.round((2 * years) / 3), years];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={`Utility cost escalation chart over ${years} years`}
    >
      <defs>
        <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((frac) => (
        <line
          key={frac}
          x1={PAD.left}
          y1={PAD.top + chartH * (1 - frac)}
          x2={PAD.left + chartW}
          y2={PAD.top + chartH * (1 - frac)}
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="4 4"
        />
      ))}

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill="url(#costGrad)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* End dot */}
      <motion.circle
        cx={points[points.length - 1]?.x}
        cy={points[points.length - 1]?.y}
        r={5}
        fill="#ef4444"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.3 }}
      />

      {/* Year labels */}
      {yearLabels.map((yr) => {
        const x = PAD.left + (yr / years) * chartW;
        return (
          <text
            key={yr}
            x={x}
            y={H - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="10"
            fontFamily="var(--font-mono)"
          >
            Yr {yr}
          </text>
        );
      })}

      {/* Cost labels on right side */}
      <text
        x={W - PAD.right}
        y={points[points.length - 1]?.y - 10}
        textAnchor="end"
        fill="#ef4444"
        fontSize="11"
        fontWeight="bold"
        fontFamily="var(--font-mono)"
      >
        {formatCurrency(annualCosts[annualCosts.length - 1])}/yr
      </text>
      <text
        x={PAD.left + 4}
        y={points[0]?.y - 10}
        textAnchor="start"
        fill="rgba(255,255,255,0.5)"
        fontSize="11"
        fontFamily="var(--font-mono)"
      >
        {formatCurrency(annualCosts[0])}/yr
      </text>
    </svg>
  );
}

/* ──────────────────────────── Slider ──────────────────────────── */

function StyledSlider({
  label,
  value,
  min,
  max,
  step,
  displayValue,
  onChange,
  id,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  displayValue: string;
  onChange: (v: number) => void;
  id: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-[0.18em] text-white/50 font-mono"
        >
          {label}
        </label>
        <span className="text-sm font-bold text-white font-mono tabular-nums">
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="utility-slider w-full"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={label}
        />
        {/* Filled track overlay */}
        <div
          className="absolute top-1/2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400 pointer-events-none -translate-y-1/2"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────── Timeframe Pills ──────────────────────── */

function TimeframePills({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const options = [10, 20, 30, 40];

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-white/50 font-mono mb-2">
        Timeframe
      </div>
      <div className="flex gap-2" role="radiogroup" aria-label="Projection timeframe">
        {options.map((yr) => (
          <button
            key={yr}
            role="radio"
            aria-checked={value === yr}
            onClick={() => onChange(yr)}
            className={`
              flex-1 py-2.5 rounded-lg text-sm font-mono font-bold transition-all duration-200
              focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1724] outline-none
              ${
                value === yr
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_12px_-4px_rgba(59,130,246,0.4)]"
                  : "bg-white/5 text-white/40 border border-white/10 hover:border-white/20 hover:text-white/60"
              }
            `}
          >
            {yr}yr
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ Main Component ═══════════════════════ */

export default function UtilityCostProjection() {
  const [monthlyBill, setMonthlyBill] = useState(250);
  const inflationRate = 5.5; // fixed — not user-adjustable
  const [years, setYears] = useState(30);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const projection = useMemo(
    () => calcProjection(monthlyBill, inflationRate / 100, years),
    [monthlyBill, inflationRate, years]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      data-testid="utility-cost-hero"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      {/* Gradient accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f1724] via-[#0a0f1a] to-[#0d1117]" />
      {/* Subtle blue glow top-right */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />
      {/* Subtle red glow bottom-left for contrast */}
      <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-red-600/5 blur-[100px] pointer-events-none" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative container mx-auto container-px py-20 md:py-28 lg:py-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-mono text-blue-400 mb-6"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>30-Year Utility Cost Projection</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-white text-balance max-w-3xl"
        >
          Your Utility Bill Will{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            Never Stop Increasing.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-white/55 text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          Based on historical utility inflation rates, the average homeowner
          could spend hundreds of thousands on electricity over the next 30
          years. See your real numbers below.
        </motion.p>

        {/* Main grid: inputs + results */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 grid lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {/* ── Left: Input panel ── */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 space-y-6">
            {/* Monthly bill slider */}
            <StyledSlider
              id="monthly-bill"
              label="Monthly Electric Bill"
              value={monthlyBill}
              min={50}
              max={450}
              step={10}
              displayValue={`$${monthlyBill}`}
              onChange={(v) => setMonthlyBill(Math.round(v))}
            />

            {/* Timeframe pills */}
            <TimeframePills value={years} onChange={setYears} />
          </div>

          {/* ── Right: Results + Chart ── */}
          <div className="lg:col-span-8 space-y-6">
            {/* Big number card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 relative overflow-hidden">
              {/* Pulsing red glow behind the number */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-500/8 blur-[80px] pointer-events-none" />

              <div className="relative">
                <div className="text-xs uppercase tracking-[0.18em] font-mono text-red-400/70 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Total paid to your utility company over {years} years
                </div>
                <div
                  className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-500"
                  data-testid="total-projection"
                >
                  <AnimatedCounter
                    value={Math.round(projection.totalPaid)}
                    prefix="$"
                    duration={1000}
                  />
                </div>

                {/* Sub-stats row */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/[0.04] border border-white/8 p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/35">
                      Current Annual
                    </div>
                    <div className="mt-1.5 font-heading text-xl md:text-2xl font-extrabold text-white">
                      <AnimatedCounter
                        value={Math.round(projection.currentAnnual)}
                        prefix="$"
                        duration={800}
                      />
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/[0.04] border border-white/8 p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/35">
                      Year {years} Monthly
                    </div>
                    <div className="mt-1.5 font-heading text-xl md:text-2xl font-extrabold text-red-400">
                      <AnimatedCounter
                        value={Math.round(projection.finalMonthly)}
                        prefix="~$"
                        duration={800}
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block rounded-xl bg-white/[0.04] border border-white/8 p-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/35">
                      Increase
                    </div>
                    <div className="mt-1.5 font-heading text-xl md:text-2xl font-extrabold text-orange-400">
                      <AnimatedCounter
                        value={Math.round(
                          ((projection.finalMonthly - monthlyBill) /
                            monthlyBill) *
                            100
                        )}
                        suffix="%"
                        duration={800}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 md:p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] font-mono text-white/35 mb-3">
                Annual Utility Cost Escalation
              </div>
              <EscalationChart
                annualCosts={projection.annualCosts}
                years={years}
              />
            </div>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/quote"
                className="
                  group flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl
                  bg-gradient-to-r from-emerald-600 to-emerald-500
                  text-white px-7 py-4 text-sm font-bold uppercase tracking-wider
                  hover:shadow-[0_0_30px_-8px_rgba(16,185,129,0.5)] hover:-translate-y-0.5
                  transition-all duration-200 focus-ring
                "
                data-testid="projection-cta-primary"
              >
                Get My Solar Savings Plan
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                href="/tools/calculator"
                className="
                  flex-1 inline-flex items-center justify-center gap-2.5 rounded-xl
                  border border-white/15 bg-white/[0.04] text-white/70
                  px-7 py-4 text-sm font-bold uppercase tracking-wider
                  hover:border-white/30 hover:text-white transition-all duration-200 focus-ring
                "
                data-testid="projection-cta-secondary"
              >
                See What Solar Would Cost
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-[11px] text-white/25 max-w-2xl font-mono leading-relaxed"
        >
          Utility escalation estimates are based on historical market trends and
          are provided for illustrative purposes only. Actual utility costs may
          vary.
        </motion.p>
      </div>
    </section>
  );
}
