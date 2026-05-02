import React from "react";
import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Calculators from "@/components/site/Calculators";
import Gallery from "@/components/site/Gallery";
import Testimonials from "@/components/site/Testimonials";
import ServiceArea from "@/components/site/ServiceArea";
import About from "@/components/site/About";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";

export default function HomePage() {
  return (
    <main data-testid="home-page" className="bg-bone">
      <Nav />
      <Hero />
      <Services />
      <Calculators />
      <Gallery />
      <Testimonials />
      <ServiceArea />
      <About />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
