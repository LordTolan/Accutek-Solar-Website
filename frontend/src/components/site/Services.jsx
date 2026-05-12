import React from "react";
import { Link } from "react-router-dom";
import { SERVICES, IMAGES } from "@/lib/site-data";
import { Check, ArrowRight } from "lucide-react";

/**
 * Services preview - YellowLite inspired clean cards with clear benefits.
 */
export default function Services({ compact = false }) {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative bg-white py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="uppercase tracking-[0.2em] text-[#E19233] text-sm mb-3 font-medium">WHAT WE DELIVER</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#0F1F12] leading-none">
              Solar. Storage.<br />Backup power.<br />Done right.
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#4A5650]">
            One family-owned team. Every project engineered, installed, and supported in-house across Indiana and Illinois.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                to={`/services#${service.id}`}
                key={service.id}
                data-testid={`service-card-${service.id}`}
                className="group flex flex-col bg-[#F7F4F0] border border-[#D8D3CC] p-8 hover:border-[#E19233] hover:-translate-y-0.5 transition-all duration-200 rounded-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="font-mono text-xs tracking-[0.15em] text-[#4A5650]/70">{service.code}</div>
                  <Icon className="h-6 w-6 text-[#E19233] group-hover:scale-110 transition-transform" />
                </div>

                <h3 className="font-display text-2xl font-extrabold tracking-tight text-[#0F1F12] mb-4">
                  {service.title}
                </h3>

                <p className="text-[#4A5650] leading-relaxed mb-6 flex-1">
                  {service.summary}
                </p>

                {!compact && service.bullets && (
                  <ul className="space-y-2.5 mb-8 text-sm text-[#0F1F12]">
                    {service.bullets.slice(0, 3).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 mt-0.5 text-[#E19233] shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto inline-flex items-center text-sm font-medium text-[#E19233] group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 border border-[#0F1F12] px-8 py-3.5 text-sm font-medium rounded-sm hover:bg-[#0F1F12] hover:text-white transition-colors"
          >
            Explore all services & solutions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
