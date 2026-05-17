import React from "react";
import PageHero from "@/components/site/PageHero";
import Contact from "@/components/site/Contact";
import { COMPANY } from "@/lib/site-data";
import { Phone, Mail, MapPin, Clock, CalendarClock } from "lucide-react";
import useSEO from "@/lib/use-seo";

const QUICK_ACTIONS = [
  {
    icon: CalendarClock,
    label: "Schedule a service call",
    body: "New install, maintenance, diagnostic visit, or commercial consultation.",
    href: "#contact-form",
  },
  {
    icon: Phone,
    label: "Call us directly",
    body: "Mon–Fri, 8am–5pm EST. We answer.",
    href: `tel:${COMPANY.phoneRaw}`,
    value: COMPANY.phone,
  },
  {
    icon: Mail,
    label: "Send an email",
    body: "Attach photos, bills, or panel labels — we'll review them ahead of the call.",
    href: `mailto:${COMPANY.email}`,
    value: COMPANY.email,
  },
];

export default function ContactPage() {
  useSEO({
    title: "Contact — Schedule a Service Call | (812) 878-7343",
    description:
      "Free residential estimates. Commercial site visits by appointment. We respond within one business day across Indiana and Illinois. Call (812) 878-7343.",
    path: "/contact",
  });
  return (
    <main data-testid="contact-page" className="bg-bone">
      <PageHero
        eyebrow="— Get in touch"
        title="Schedule a service call."
        subtitle="Free residential estimates. Commercial site visits by appointment. We respond within one business day across Indiana and Illinois."
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        testid="contact-hero"
      />

      {/* Quick actions */}
      <section className="bg-bone py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            {QUICK_ACTIONS.map((a, i) => {
              const Icon = a.icon;
              return (
                <a
                  key={a.href}
                  href={a.href}
                  data-testid={`contact-quick-${i}`}
                  className="col-span-12 md:col-span-4 bg-bone2 border border-line p-6 lg:p-8 hover:border-forest hover:bg-forest hover:text-bone group transition-colors"
                >
                  <Icon className="h-6 w-6 text-forest group-hover:text-amber transition-colors mb-4" />
                  <div className="font-display text-lg font-bold text-ink group-hover:text-bone tracking-tight">
                    {a.label}
                  </div>
                  <p className="mt-2 text-sm text-ink2 group-hover:text-bone/80 leading-relaxed transition-colors">
                    {a.body}
                  </p>
                  {a.value && (
                    <p className="mt-3 font-mono text-sm text-ink group-hover:text-amber transition-colors">
                      {a.value}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Office info bar */}
      <section className="bg-forest text-bone py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6">
          <Info icon={MapPin} label="Visit" value={COMPANY.address.full} />
          <Info icon={Clock} label="Hours" value={COMPANY.hours} />
          <Info icon={Phone} label="Phone" value={COMPANY.phone} />
          <Info icon={Mail} label="Web" value={COMPANY.website} />
        </div>
      </section>

      {/* Contact form */}
      <div id="contact-form">
        <Contact />
      </div>
    </main>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="col-span-6 md:col-span-3">
      <Icon className="h-4 w-4 text-amber mb-2" />
      <div className="label-tag text-bone/50">{label}</div>
      <div className="font-mono text-sm mt-1 break-all">{value}</div>
    </div>
  );
}
