"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 bg-secondary text-secondary-foreground" data-testid="site-footer">
      <div className="container mx-auto container-px py-16 grid md:grid-cols-4 gap-10">
        <div>
          <div className="font-heading text-2xl font-extrabold">Accutek Solar</div>
          <p className="mt-3 text-secondary-foreground/70 text-sm leading-relaxed">
            Family-owned solar &amp; electrical company serving Indiana and Illinois since 1994.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["NABCEP", "BBB A+", "Licensed & Insured", "32 Years"].map((b) => (
              <span key={b} className="text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-white/10">{b}</span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-secondary-foreground/60">Explore</div>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-primary">Services</Link></li>
            <li><Link href="/service-area" className="hover:text-primary">Service Area</Link></li>
            <li><Link href="/tools/calculator" className="hover:text-primary">Savings Calculator</Link></li>
            <li><Link href="/about" className="hover:text-primary">About</Link></li>
            <li><Link href="/quote" className="hover:text-primary">Free Quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-secondary-foreground/60">Contact</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5" /><a href="tel:+18128787343" className="hover:text-primary" data-testid="footer-phone">(812) 878-7343</a></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5" /><a href="mailto:solarseth7@yahoo.com" className="hover:text-primary">solarseth7@yahoo.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /><span>9797 S Rangeline Rd.<br/>Clinton, IN 47842</span></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-secondary-foreground/60">Get a Free Estimate</div>
          <p className="mt-4 text-sm text-secondary-foreground/70">Tell us about your home or business and we'll size the right system — at no cost.</p>
          <Link href="/quote" className="mt-5 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-bold hover:-translate-y-0.5 transition" data-testid="footer-cta">
            Start My Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container mx-auto container-px py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/60">
          <div>© {new Date().getFullYear()} Accutek Solar. All rights reserved.</div>
          <div>The future of energy.</div>
        </div>
      </div>
    </footer>
  );
}
