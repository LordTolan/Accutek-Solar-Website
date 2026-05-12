import React from "react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/lib/site-data";
import { ArrowRight, Phone, CalendarClock } from "lucide-react";

/**
 * Conversion CTA - YellowLite inspired clean and trustworthy.
 */
export default function CTASection({
  eyebrow = "LET'S GET STARTED",
  title = "Ready to own your energy?",
  subtitle = "Free consultations. Custom proposals. Local family-owned support across Indiana and Illinois.",
  primaryLabel = "Get a free consultation",
  primaryTo = "/contact",
  variant = "dark",
  testid = "cta-section",
}) {
  const isDark = variant === "dark";
  return (
    <section
      data-testid={testid}
      className={`py-20 lg:py-24 ${isDark ? "bg-[#0F1F12] text-[#F7F4F0]" : "bg-[#F7F4F0] text-[#0F1F12]"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className={`uppercase tracking-[0.2em] text-sm mb-4 font-medium ${isDark ? "text-[#E19233]" : "text-[#E19233]"}`}>
            {eyebrow}
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter leading-none mb-6">
            {title}
          </h2>
          <p className={`text-lg max-w-2xl leading-relaxed mb-10 ${isDark ? "text-[#F7F4F0]/85" : "text-[#4A5650]"}`}>
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={primaryTo}
              className={`group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-medium text-sm transition-all active:scale-[0.985] ${isDark 
                ? "bg-[#E19233] text-[#0F1F12] hover:bg-white" 
                : "bg-[#0F1F12] text-white hover:bg-[#E19233] hover:text-[#0F1F12]"}`}
            >
              <CalendarClock className="h-4 w-4" />
              {primaryLabel}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>

            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm font-mono text-sm border transition-all ${isDark 
                ? "border-white/30 text-[#F7F4F0] hover:bg-white hover:text-[#0F1F12]" 
                : "border-[#0F1F12] text-[#0F1F12] hover:bg-[#0F1F12] hover:text-white"}`}
            >
              <Phone className="h-4 w-4" />
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
