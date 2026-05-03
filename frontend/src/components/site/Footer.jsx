import React from "react";
import { COMPANY } from "@/lib/site-data";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="bg-ink text-bone/80 py-12"
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
                <div className="label-tag text-amber">Est. {COMPANY.founded}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-bone/60 max-w-sm leading-relaxed">
              Family-owned solar PV, battery backup, Kohler generators and
              licensed electrical work since {COMPANY.founded}. Keith Davis,
              President · Seth & Quill Davis, day-to-day operations.
            </p>
          </div>
          <div className="col-span-6 md:col-span-3">
            <div className="label-tag text-bone/40 mb-4">Visit</div>
            <p className="text-sm font-mono text-bone leading-relaxed">
              {COMPANY.address.street}
              <br />
              {COMPANY.address.city}, {COMPANY.address.state} {COMPANY.address.zip}
            </p>
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
              <li><a href="#services" className="hover:text-amber transition-colors">Services</a></li>
              <li><a href="#calculators" className="hover:text-amber transition-colors">Calculators</a></li>
              <li><a href="#service-area" className="hover:text-amber transition-colors">Service area</a></li>
              <li><a href="#contact" className="hover:text-amber transition-colors">Free estimate</a></li>
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
