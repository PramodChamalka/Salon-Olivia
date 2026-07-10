import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Gallery } from '../components/Gallery';
import { Booking } from '../components/Booking';
import { AIAdvisor } from '../components/AIAdvisor';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
export function LandingPage() {
  return (
    <div className="font-sans text-gray-900 bg-white scroll-smooth">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
      <AIAdvisor />
    </div>);

}