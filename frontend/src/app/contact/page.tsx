import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Accutek Solar - Local Solar & Electrical Contractor",
  description: "Get in touch with Accutek Solar. Located in Clinton, IN, we serve 17 counties across Indiana and Illinois. Call (812) 878-7343 for a free site assessment.",
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SolarEnergyContractor",
    "name": "Accutek Solar",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "9797 S Rangeline Rd.",
      "addressLocality": "Clinton",
      "addressRegion": "IN",
      "postalCode": "47842",
      "addressCountry": "US"
    },
    "telephone": "+18128787343",
    "email": "solarseth7@yahoo.com",
    "url": "https://www.accuteksolar.com",
    "areaServed": ["Indiana", "Illinois"],
    "openingHours": "Mo-Fr 08:00-17:00"
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto container-px max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="text-[10px] uppercase tracking-[0.25em] font-mono text-primary mb-3">// CONNECT WITH US</div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-balance leading-tight">
                Ready to take <span className="text-primary">your power back?</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/70 max-w-xl">
                Whether you have a question about system design, local incentives, or an existing installation, we&#39;re here to help. Reach out directly or visit our shop in Clinton.
              </p>

              <div className="mt-12 space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 border border-primary/20">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold">Office & Shop</div>
                    <p className="mt-1 text-foreground/65 leading-relaxed">
                      9797 S Rangeline Rd.<br />
                      Clinton, IN 47842
                    </p>
                    <a 
                      href="https://www.google.com/maps/search/9797+S+Rangeline+Rd.,+Clinton,+IN,+47842" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-bold text-primary hover:underline"
                    >
                      Get Directions ->
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 border border-primary/20">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold">Call or Text</div>
                    <p className="mt-1 text-foreground/65">(812) 878-7343</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 border border-primary/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-heading text-lg font-bold">Email</div>
                    <p className="mt-1 text-foreground/65">solarseth7@yahoo.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full" />
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-ambient-lg aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3077.58!2d-87.4061!3d39.6556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886d38!2s9797%20S%20Rangeline%20Rd%2C%20Clinton%2C%20IN%2047842!5e0!3m2!1sen!2sus!4v1720875600000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Accutek Solar Location"
                  className="grayscale invert contrast-125 opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
