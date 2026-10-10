"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Phone, MessageSquare, ArrowRight } from "lucide-react";

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
    a: "Every project is custom to your property, energy usage, and electrical panel setup. We do not provide one-size-fits-all prices online because real systems require individual site engineering. Please request a quote online or Chat with Seth at (812) 878-7343, and an Accutek team member will follow up directly with custom pricing for your site.",
  },
  {
    q: "Do you offer free estimates?",
    a: "Yes. Every solar, battery storage, and generator consultation is 100% free with no obligation. Reach out through our quote form, contact our office, or Chat with Seth to schedule a free on-site property evaluation.",
  },
  {
    q: "What areas do you serve?",
    a: "Accutek Solar is headquartered in Clinton, IN (9797 S Rangeline Rd) and serves a wide regional footprint across Indiana and East Central Illinois covering over 70 counties and 500+ ZIP codes through our Housecall Pro service territory. Send us your ZIP code or request a quote and our team will gladly confirm service availability for your property.",
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
    q: "How does billing, invoices, and customer account access work?",
    a: "Existing customers can review project details, track service visits, and pay invoices securely online through our Housecall Pro customer portal. For any questions regarding your account or active project, our team is always available by phone or email.",
  },
  {
    q: "What warranties and craftsmanship guarantees do you provide?",
    a: "We install Tier-1 solar panels backed by 25-year manufacturer power production warranties, lithium battery storage systems with 10- to 15-year manufacturer warranties, and authorized standby generators with full factory warranty backing. Beyond manufacturer hardware warranties, Accutek stands behind our installation craftsmanship with direct, lifetime local service — backed by over 32 years of continuous electrical contracting in Indiana and Illinois.",
  },
  {
    q: "Are financing and grant options available?",
    a: "Yes. Flexible financing options are available through third-party lending partners for qualified property owners, and we assist agricultural and rural small business clients with technical documentation for USDA REAP grants. Ask our team during your consultation for current program details.",
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

        {/* Chat with Seth & Get a Quote Fallback Box */}
        <div className="mt-12 p-8 rounded-2xl bg-card border border-border shadow-ambient" data-testid="faq-seth-fallback">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-lg">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary">
                <MessageSquare className="w-4 h-4" /> Have a specific question or custom site requirement?
              </div>
              <h3 className="text-xl font-heading font-bold">Have an off-limits or custom question?</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                Whether you need specific equipment advice, site feasibility checks, or pricing details, talk directly with Seth and the Accutek team.
              </p>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="tel:+18128787343"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground px-5 py-3 text-xs font-bold uppercase tracking-wider hover:shadow-green-glow transition focus-ring w-full sm:w-auto"
                data-testid="faq-chat-with-seth"
              >
                <Phone className="w-3.5 h-3.5" /> Chat with Seth
              </a>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card text-foreground px-5 py-3 text-xs font-bold uppercase tracking-wider hover:border-primary transition focus-ring w-full sm:w-auto"
                data-testid="faq-get-quote"
              >
                Get a Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
