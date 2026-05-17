"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Zap, CalendarClock } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 bg-black border-t border-border" data-testid="site-footer">
      <div className="container mx-auto container-px py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <span className="grid place-items-center w-8 h-8 rounded-md bg-primary text-primary-foreground"><Zap className="w-4 h-4" strokeWidth={2.5} fill="currentColor" /></span>
            <span className="font-heading text-xl font-extrabold">Accutek Solar</span>
          </div>
          <p className="text-foreground/65 text-sm leading-relaxed">
            Family-owned solar &amp; electrical contractor serving Indiana and Illinois since 1994.
          </p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {["NABCEP", "BBB A+", "Licensed", "32 YRS"].map((b) => (
              <span key={b} className="text-[9px] uppercase tracking-[0.22em] font-mono px-2.5 py-1 rounded-sm bg-primary/10 text-primary border border-primary/30">{b}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">// EXPLORE</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/services" className="hover:text-primary transition">Services</Link></li>
            <li><Link href="/service-area" className="hover:text-primary transition">Service Area</Link></li>
            <li><Link href="/tools/calculator" className="hover:text-primary transition">Savings Calculator</Link></li>
            <li><Link href="/about" className="hover:text-primary transition">About</Link></li>
            <li><Link href="/quote" className="hover:text-primary transition">Free Quote</Link></li>
            <li><Link href="/book" className="hover:text-primary transition">Book Online</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">// CONTACT</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-primary" /><a href="tel:+18128787343" className="hover:text-primary transition" data-testid="footer-phone">(812) 878-7343</a></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-primary" /><a href="mailto:solarseth7@yahoo.com" className="hover:text-primary transition">solarseth7@yahoo.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /><span className="text-foreground/75">9797 S Rangeline Rd.<br/>Clinton, IN 47842</span></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">// GET STARTED</div>
          <p className="text-sm text-foreground/70">Tell us about your home or business and we'll size the right system — at no cost.</p>
          <Link href="/quote" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-xs font-bold uppercase tracking-wider hover:shadow-green-glow transition" data-testid="footer-cta">
            Start My Quote
          </Link>
          <Link href="/book" className="mt-3 inline-flex items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-xs font-bold uppercase tracking-wider hover:border-primary transition w-full" data-testid="footer-book">
            <CalendarClock className="w-4 h-4" /> Book Online
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto container-px py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
          <div>© {new Date().getFullYear()} ACCUTEK SOLAR · WWW.ACCUTEKSOLAR.COM</div>
          <div>// THE FUTURE OF ENERGY</div>
        </div>
      </div>
    </footer>
  );
}
