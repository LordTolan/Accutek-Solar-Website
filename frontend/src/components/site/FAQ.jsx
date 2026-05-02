import React from "react";
import { FAQS } from "@/lib/site-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative bg-bone2 py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <p className="label-tag text-amberDark mb-4">— Common questions</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold tracking-tighter text-ink leading-[0.95]">
              Straight
              <br />
              answers,
              <br />
              <span className="italic font-light">no fluff.</span>
            </h2>
            <p className="mt-6 text-sm text-ink2">
              Don't see what you're looking for? Call us or send a message —
              we answer every inquiry personally.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-line"
                >
                  <AccordionTrigger
                    data-testid={`faq-trigger-${i}`}
                    className="font-display text-lg lg:text-xl font-bold tracking-tight text-ink hover:text-amberDark hover:no-underline text-left py-6"
                  >
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    data-testid={`faq-content-${i}`}
                    className="text-base text-ink2 leading-relaxed pb-6"
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
