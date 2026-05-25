"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, CalendarClock, LogIn } from "lucide-react";
import { HCP_BOOK_URL } from "@/lib/utils";
import { CUSTOMER_PORTAL } from "@/lib/site-data";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="mt-24 bg-card border-t border-border" data-testid="site-footer">
      <div className="container mx-auto container-px py-16 grid md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/logo.png"
            alt="Accutek Solar"
            width={458}
            height={192}
            sizes="(max-width: 768px) 180px, 240px"
            className="h-12 md:h-14 w-auto object-contain mb-5"
            data-testid="footer-logo"
          />
          <p className="text-foreground/70 text-sm leading-relaxed">
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
            <li><Link href="/services" className="text-foreground/80 hover:text-primary transition">Services</Link></li>
            <li><Link href="/service-area" className="text-foreground/80 hover:text-primary transition">Service Area</Link></li>
            <li><Link href="/tools/calculator" className="text-foreground/80 hover:text-primary transition">Savings Calculator</Link></li>
            <li><Link href="/blog" className="text-foreground/80 hover:text-primary transition">Solar Blog</Link></li>
            <li><Link href="/about" className="text-foreground/80 hover:text-primary transition">About · Meet the Team</Link></li>
            <li><Link href="/quote" className="text-foreground/80 hover:text-primary transition">Free Quote</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">// CUSTOMER TOOLS</div>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={HCP_BOOK_URL} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition flex items-center gap-2">
                <CalendarClock className="w-3.5 h-3.5" /> Book Online
              </a>
            </li>
            <li>
              <a
                href={CUSTOMER_PORTAL.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-primary transition flex items-center gap-2"
                data-testid="footer-portal-link"
              >
                <LogIn className="w-3.5 h-3.5" /> Customer Portal
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-foreground/50 leading-relaxed">
            Existing customers can view invoices, job history, and estimates through the Housecall Pro portal.
          </p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-primary mb-4">// CONTACT</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 mt-0.5 text-primary" /><a href="tel:+18128787343" className="text-foreground/85 hover:text-primary transition" data-testid="footer-phone">(812) 878-7343</a></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5 text-primary" /><a href="mailto:solarseth7@yahoo.com" className="text-foreground/85 hover:text-primary transition">solarseth7@yahoo.com</a></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" /><span className="text-foreground/75">9797 S Rangeline Rd.<br/>Clinton, IN 47842</span></li>
          </ul>
          <Link href="/quote" className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-xs font-bold uppercase tracking-wider hover:shadow-green-glow transition w-full" data-testid="footer-cta">
            Start My Quote
          </Link>
        </div>
      </div>
      <div className="border-t border-border bg-muted/40">
        <div className="container mx-auto container-px py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] font-mono text-muted-foreground">
          <div>© {new Date().getFullYear()} ACCUTEK SOLAR · WWW.ACCUTEKSOLAR.COM</div>
          <div>// THE FUTURE OF ENERGY</div>
        </div>
      </div>
    </footer>
  );
}
