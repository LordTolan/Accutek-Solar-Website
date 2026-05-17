import Link from "next/link";
import { CalendarClock, Phone, ArrowRight } from "lucide-react";

export const metadata = { title: "Book Online · Accutek Solar" };

/**
 * Housecall Pro Book Online integration target.
 * The marker div with id "hcp-book-widget" is where the HCP "Book Online" script
 * mounts its inline iframe / widget. When the embed snippet is provided, paste the
 * <script> into /app/frontend/src/app/layout.tsx <head> and the widget will hydrate here.
 */
export default function BookPage() {
  return (
    <section className="py-16 md:py-24" data-testid="book-page">
      <div className="container mx-auto container-px max-w-4xl">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// Online booking</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Pick a time. We'll bring the <span className="text-primary text-glow">expertise.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Schedule your free site visit straight from our Housecall Pro calendar — or call (812) 878-7343 and speak to Seth.
        </p>

        {/* HCP widget mount point */}
        <div className="mt-12 bg-card border border-border rounded-lg p-6 md:p-10 shadow-ambient-lg">
          <div id="hcp-book-widget" data-testid="hcp-book-widget" className="min-h-[420px] grid place-items-center text-center">
            {/* Placeholder shown until the HCP <script> hydrates this container */}
            <div className="max-w-md">
              <CalendarClock className="w-10 h-10 text-primary mx-auto" />
              <h2 className="mt-5 font-heading text-2xl font-extrabold">Online booking is loading</h2>
              <p className="mt-3 text-foreground/70 text-sm">
                If the Housecall Pro calendar doesn't appear in a moment, use the options below.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 justify-center">
                <Link href="/quote" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-6 py-3 font-bold focus-ring uppercase tracking-wider text-sm" data-testid="book-quote-fallback">
                  Send a quote request <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="tel:+18128787343" className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-6 py-3 font-bold focus-ring" data-testid="book-call-fallback">
                  <Phone className="w-4 h-4" /> Call (812) 878-7343
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground font-mono text-center">
          Powered by Housecall Pro · Accutek Solar · Clinton, IN
        </p>
      </div>
    </section>
  );
}
