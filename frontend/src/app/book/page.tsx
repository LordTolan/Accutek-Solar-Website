import Link from "next/link";
import { Phone, ExternalLink } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";

export const metadata = { title: "Book Online · Accutek Solar" };

/**
 * Branded landing page that embeds Accutek's Housecall Pro booking calendar.
 * Direct booking URL provided by Donna:
 *   https://book.housecallpro.com/book/Accutek-Solar/...?v2=true
 */
export default function BookPage() {
  return (
    <section className="py-12 md:py-16" data-testid="book-page">
      <div className="container mx-auto container-px max-w-5xl">
        <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-3">// ONLINE BOOKING</div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-balance">
          Pick a time. We'll bring the <span className="text-primary">expertise.</span>
        </h1>
        <p className="mt-4 text-foreground/70 text-lg max-w-2xl">
          Schedule your free site visit straight from our Housecall Pro calendar — or call (812) 878-7343 and speak to Seth.
        </p>

        <div className="mt-10 bg-card border border-border rounded-lg overflow-hidden shadow-ambient-lg" data-testid="hcp-book-widget">
          <iframe
            src={HCP_BOOK_URL}
            title="Accutek Solar — Book Online (Housecall Pro)"
            className="w-full"
            style={{ height: "min(85vh, 1100px)", border: 0 }}
            loading="lazy"
            allow="payment *; clipboard-write *"
            referrerPolicy="strict-origin-when-cross-origin"
            data-testid="hcp-book-iframe"
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-foreground transition font-bold uppercase tracking-wider" data-testid="open-hcp-newtab">
            Open booking in a new tab <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="flex gap-3">
            <a href="tel:+18128787343" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition" data-testid="book-call-fallback">
              <Phone className="w-3.5 h-3.5" /> (812) 878-7343
            </a>
            <Link href="/quote" className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition" data-testid="book-quote-fallback">
              Send a quote request instead →
            </Link>
          </div>
        </div>

        <p className="mt-6 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground text-center">
          Powered by Housecall Pro · Accutek Solar · Clinton, IN
        </p>
      </div>
    </section>
  );
}
