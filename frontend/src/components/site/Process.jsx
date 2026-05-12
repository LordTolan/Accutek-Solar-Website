import React from "react";
import { ArrowRight } from "lucide-react";

import { Link } from "react-router-dom";

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Free consultation",
      description: "We discuss your goals, review your property, and design a custom solution tailored to your needs and budget.",
    },
    {
      number: "02",
      title: "Transparent proposal",
      description: "Clear pricing, timeline, incentives, and expected savings. No surprises. We handle all permits and paperwork.",
    },
    {
      number: "03",
      title: "Professional installation",
      description: "Our in-house team installs everything with care. We test thoroughly and train you on the system before we leave.",
    },
    {
      number: "04",
      title: "Ongoing support",
      description: "Monitoring, maintenance options, and responsive local service for years to come. We're here when you need us.",
    },
  ];

  return (
    <section className="bg-[#F7F4F0] py-20 lg:py-28 border-y border-[#D8D3CC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <p className="uppercase tracking-[0.2em] text-[#E19233] text-sm mb-3 font-medium">HOW IT WORKS</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tighter text-[#0F1F12]">
              Simple. Clear.<br />Done right.
            </h2>
          </div>
          <p className="max-w-md text-lg text-[#4A5650]">
            From first conversation to long-term performance — we make going solar straightforward and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group bg-white border border-[#D8D3CC] p-8 rounded-sm hover:border-[#E19233] transition-all"
            >
              <div className="font-mono text-5xl font-semibold text-[#E19233] mb-6 tracking-tighter">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-extrabold tracking-tight mb-4 text-[#0F1F12]">
                {step.title}
              </h3>
              <p className="text-[#4A5650] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 text-[#E19233] font-medium hover:gap-3 transition-all"
          >
            Start with a free consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
