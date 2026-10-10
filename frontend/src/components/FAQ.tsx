"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: "Do we have enough sun in our area for solar to make sense?",
    a: "Yes — we have more solar energy available here in Indiana and Illinois than in Germany, and Germany produces more solar energy per capita than any other country. The seasonal solar harvest is more than sufficient for high-yield returns.",
  },
  {
    q: "What is the difference between roof-mount and ground-mount solar?",
    a: "Roof-mount arrays use your existing roof structure — fast install with zero additional property footprint. Ground-mount arrays sit in your yard or field on ag-grade steel posts — they let us engineer the perfect tilt and true-south orientation, avoid roof shading, and are easier to service with zero roof penetrations. Roughly half of our installs are ground mounts. Sun-tracking pole mounts are also an option for rural lots.",
  },
  {
    q: "What are the different types of PV systems?",
    a: "1) Grid-tied (no batteries, sends surplus power to the grid to reduce or eliminate your electric bill). 2) Hybrid (grid-tied with lithium battery storage to automatically power critical circuits during outages). 3) Off-grid (fully independent standalone system with batteries and a backup generator for low-sun stretches).",
  },
  {
    q: "How much does a solar or backup power system cost?",
    a: "Because every home, farm, or business has unique electricity consumption, electrical panel capacity, and site orientation, every system is custom quoted. Seth personally reviews your historical utility bills and property layout to provide transparent, tailored pricing with no high-pressure sales.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes, every solar, battery, and generator quote is 100% free. You can use our online savings calculator for an instant 25-year projection, submit a quote request, or schedule a free on-site property evaluation.",
  },
  {
    q: "What areas do you serve?",
    a: "Accutek Solar is based in Clinton, IN (9797 S Rangeline Rd) and serves 17 counties across West Central Indiana and East Central Illinois. If you're near our regional footprint, contact us with your ZIP code or county and we'll gladly verify coverage for your site.",
  },
  {
    q: "What services does Accutek offer?",
    a: "We provide turnkey residential, commercial, and agricultural solar PV installations (roof, ground, and pole mounts), lithium battery storage (LFP), authorized Kohler standby generators (plus Generac and Cummins service), high-efficiency mini-split heat pumps, Level 2 EV charging stations, and full master-level electrical contracting and panel upgrades.",
  },
  {
    q: "Do you service systems you didn't install?",
    a: "Yes. With 32 years of hands-on electrical troubleshooting experience, we work on a wide variety of inverter and battery brands (including Enphase, SolarEdge, Sol-Ark, SMA, Outback, Fronius, and Schneider Electric) and routinely take on repair, diagnostic, and restoration work for orphaned systems whose original installer is no longer available.",
  },
  {
    q: "What should I expect for appointment scheduling and service windows?",
    a: "Our typical field work and site evaluation appointments run during standard daytime hours (approximately 10 AM to 5 PM local time, Monday through Friday). Because our crews travel across a multi-county service footprint and take time to do every job right, we schedule planned visits carefully and avoid overpromising same-day field arrivals.",
  },
  {
    q: "What happens during a site assessment and on installation day?",
    a: "During the free site assessment, we inspect your main electrical panel, assess roof structural condition or ground-mount layout, check utility meter access, and review your 12-month power bills. On installation day, our licensed field crew arrives with all equipment, mounts racking and panels, completes the electrical conduit and balance-of-system wiring, conducts safety commissioning, and cleans up thoroughly before demonstrating how your system operates.",
  },
  {
    q: "How long does the entire installation process take?",
    a: "Physical installation on your property typically takes just a few days depending on system size and weather. The broader project timeline usually spans a few weeks to complete site engineering, municipal permitting, utility interconnection approval, and final utility bi-directional meter placement.",
  },
  {
    q: "Do you handle permits, utility interconnection, and HOA approvals?",
    a: "Yes. Accutek manages the entire permitting and utility interconnection process from start to finish. We submit electrical schematics, structural drawings, and net-metering paperwork directly to your electric cooperative or utility, as well as local building authorities and HOA boards.",
  },
  {
    q: "What is net metering and how does solar billing work?",
    a: "Net metering / net billing tracks the difference between the electricity your system produces and the power you consume from the grid. In Indiana, utilities credit your account for excess kilowatt-hours produced in sunny summer months to offset winter usage. In Illinois, customers may also participate in the Illinois Shines SREC incentive program. We model your specific utility provider's rates during system design.",
  },
  {
    q: "How does billing, deposits, and payment work for installations and service?",
    a: "For turnkey solar, battery, and generator installations, project milestones and deposit terms are clearly itemized in your written agreement prior to ordering equipment and commencing work. For service calls, diagnostics, and electrical repairs, invoices are provided upon completion. Existing customers can also review project details and invoices directly through our Housecall Pro customer portal.",
  },
  {
    q: "What warranties and craftsmanship guarantees do you provide?",
    a: "We install Tier-1 solar panels backed by 25-year manufacturer power production warranties, lithium battery storage systems with 10- to 15-year manufacturer warranties, and authorized standby generators with full factory warranty backing. Beyond manufacturer hardware warranties, Accutek stands behind our installation craftsmanship with direct, lifetime local service — backed by over 32 years of continuous electrical contracting in Indiana and Illinois.",
  },
  {
    q: "Do you offer financing options?",
    a: "Yes, flexible solar financing options and loan programs are available to help spread system costs into predictable monthly payments that replace or lower your electric bill. For farms and rural small businesses, we also assist with documentation for USDA REAP grants.",
  },
  {
    q: "Should I choose battery storage, a standby generator, or both?",
    a: "It depends on your backup needs. Lithium batteries provide instantaneous, silent, sub-20-millisecond power transfer during outages and cycle daily with your solar array. Standby generators provide continuous long-duration runtime fueled by natural gas or propane during multi-day severe weather. Pairing solar, hybrid batteries, and an automatic generator delivers the ultimate energy resilience.",
  },
  {
    q: "What ongoing maintenance is required for solar and generators?",
    a: "Solar PV panels have no moving parts and require minimal maintenance beyond occasional visual inspection and keeping ground-mount arrays clear of heavy snow or tall brush. Standby generators require routine oil, filter, and spark plug maintenance, which we provide through scheduled annual preventive service checkups.",
  },
  {
    q: "Do you handle commercial and agricultural installations?",
    a: "Yes. A significant portion of our work includes 3-phase and split-phase commercial and agricultural projects — including grain drying systems, livestock barns, manufacturing shops, facility automation support, decommissioning, and high-capacity standby power across Indiana and Illinois.",
  },
  {
    q: "How long has Accutek Solar been in business?",
    a: "Accutek Solar was founded in 1994 by Keith Davis in Clinton, Indiana. We are a family-owned, second-generation operated electrical and solar contractor with over 32 years of continuous field experience. Keith remains President, and his son Seth Davis oversees day-to-day operations and custom system engineering.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-muted/40" data-testid="faq-section">
      <div className="container mx-auto container-px max-w-4xl">
        <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Common questions</div>
        <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">Everything you wanted to ask.</h2>

        <div className="mt-12 divide-y divide-border border-t border-b border-border">
          {DEFAULT_FAQS.map((it, i) => {
            const isOpen = open === i;
            return (
              <button key={i} onClick={() => setOpen(isOpen ? null : i)} className="w-full text-left py-6 group focus-ring" data-testid={`faq-item-${i}`}>
                <div className="flex items-start justify-between gap-6">
                  <div className="font-heading text-lg md:text-xl font-bold pr-4">{it.q}</div>
                  <ChevronDown className={`shrink-0 w-5 h-5 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="text-foreground/75 leading-relaxed text-base">{it.a}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
