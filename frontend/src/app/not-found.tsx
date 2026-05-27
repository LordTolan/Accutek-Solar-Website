"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sun, ArrowRight, Phone, Home, Search, Zap } from "lucide-react";

const SOLAR_PUNS = [
  "This page went off-grid.",
  "Looks like this panel isn't connected.",
  "404: Insufficient sunlight to load this page.",
  "Even our best inverter couldn't convert this URL.",
  "This page is in a solar eclipse right now.",
  "We checked every panel on the array — no page here.",
  "This URL has a shade problem.",
  "Our sun tracker couldn't find what you're looking for.",
  "Watts going on? This page doesn't exist.",
  "This page got struck by lightning and didn't have a surge protector.",
];

export default function NotFoundPage() {
  const [pun, setPun] = useState(SOLAR_PUNS[0]);
  const [sunRotation, setSunRotation] = useState(0);

  useEffect(() => {
    setPun(SOLAR_PUNS[Math.floor(Math.random() * SOLAR_PUNS.length)]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSunRotation((r) => r + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  function newPun() {
    let next = pun;
    while (next === pun) {
      next = SOLAR_PUNS[Math.floor(Math.random() * SOLAR_PUNS.length)];
    }
    setPun(next);
  }

  return (
    <section className="py-20 md:py-32 min-h-[70vh] flex items-center" data-testid="not-found-page">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-bg grid-bg-fade opacity-30" />
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto container-px max-w-3xl text-center">
        {/* Spinning sun */}
        <div className="mx-auto mb-8 relative w-28 h-28">
          <div
            className="absolute inset-0 grid place-items-center"
            style={{ transform: `rotate(${sunRotation}deg)` }}
          >
            <Sun className="w-28 h-28 text-primary/20" strokeWidth={1} />
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-heading text-5xl font-black text-primary text-glow">404</span>
          </div>
        </div>

        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">
          // ERROR | PAGE NOT FOUND
        </div>

        <h1 className="text-3xl md:text-5xl font-heading font-black text-balance">
          Uh oh. <span className="text-primary">Dark sky ahead.</span>
        </h1>

        {/* Rotating pun */}
        <div className="mt-6 min-h-[3rem] flex items-center justify-center">
          <p className="text-lg md:text-xl text-foreground/70 max-w-lg leading-relaxed">
            {pun}
          </p>
        </div>

        <button
          onClick={newPun}
          className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition cursor-pointer"
          data-testid="new-pun-button"
        >
          <Zap className="w-3 h-3" /> // CLICK FOR ANOTHER BAD SOLAR PUN
        </button>

        {/* System diagnostics joke */}
        <div className="mt-10 bg-card rounded-xl border border-border shadow-ambient-lg overflow-hidden text-left max-w-md mx-auto" data-testid="diagnostics-card">
          <header className="px-6 pt-5 pb-3 border-b border-border/60">
            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary">
              // SYSTEM DIAGNOSTICS
            </div>
          </header>
          <div className="px-6 py-5 font-mono text-xs space-y-2 text-foreground/70">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Panel status</span>
              <span className="text-primary">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Inverter</span>
              <span className="text-primary">CONVERTING</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Battery</span>
              <span className="text-primary">98%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested page</span>
              <span className="text-red-400">NOT FOUND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Recommendation</span>
              <span className="text-primary">GO HOME</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:shadow-green-glow hover:-translate-y-0.5 transition focus-ring"
            data-testid="home-cta"
          >
            <Home className="w-4 h-4" /> Back to Base
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card text-foreground px-7 py-4 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition focus-ring"
            data-testid="quote-cta"
          >
            <Search className="w-4 h-4" /> Get a Free Quote
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="tel:+18128787343"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition"
          >
            <Phone className="w-4 h-4" /> Need help? Call (812) 878-7343
          </a>
        </div>

        <p className="mt-12 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
          // ACCUTEK SOLAR | EVEN OUR 404 RUNS ON CLEAN ENERGY
        </p>
      </div>
    </section>
  );
}
