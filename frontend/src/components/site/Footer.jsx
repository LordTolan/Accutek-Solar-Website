import React from "react";
import { Link } from "react-router-dom";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-ink text-bone/80 py-12 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 pb-10 border-b border-bone/10">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-3 text-bone">
              <img
                src={COMPANY.logos.icon}
                alt="Accutek Solar"
                className="h-12 w-12 object-contain bg-bone rounded-sm p-1"
              />
              <div>
                <div className="font-display text-xl font-extrabold tracking-tight">
                  {COMPANY.name}
                </div>
                <div className="label-tag text-amber">
                  30 Years · Est. {COMPANY.founded}
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-bone/60 max-w-sm leading-relaxed">
              Family-owned and serving Indiana and Illinois since 1994. Solar &
              storage, backup power, facility automation and diagnostics for
              residential and commercial clients.
            </p>
            <p className="mt-3 text-xs text-bone/40 leading-relaxed">
              Keith Davis, President · Seth & Quill Davis, day-to-day operations.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="label-tag text-bone/40 mb-4">Visit</div>
            <p className="text-sm font-mono text-bone leading-relaxed">
              {COMPANY.address.street}
              <br />
              {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
            </p>
            <p className="text-xs font-mono text-bone/50 mt-3">{COMPANY.hours}</p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <div className="label-tag text-bone/40 mb-4">Contact</div>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              data-testid="footer-phone"
              className="block font-mono text-sm hover:text-amber transition-colors"
            >
              {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              data-testid="footer-email"
              className="block font-mono text-xs hover:text-amber transition-colors mt-1 break-all"
            >
              {COMPANY.email}
            </a>
          </div>
          <div className="col-span-12 md:col-span-2">
            <div className="label-tag text-bone/40 mb-4">Site</div>
            <ul className="space-y-1.5 text-sm">
              {NAV_LINKS.filter((l) => l.to !== "/").map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover:text-amber transition-colors"
                    data-testid={`footer-link-${l.to.replace(/\//g, "")}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row gap-2 items-start md:items-center justify-between text-xs text-bone/40 font-mono">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Family-owned · Est. {COMPANY.founded} · Clinton, Indiana</p>
        </div>
      </div>
    </footer>
  );
}
