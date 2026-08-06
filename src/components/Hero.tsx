"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Salon Olivia interior",
  },
  {
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Stylist finishing a client's hair",
  },
  {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Luxury salon styling chair",
  },
  {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Calming spa setting with candles",
  },
  {
    src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    alt: "Salon treatment in progress",
  },
];

const SLIDE_DURATION = 6000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="pt-20">
      <div className="relative flex min-h-[80vh] items-center overflow-hidden bg-salon-cream">
        <div
          className="absolute inset-0 z-0"
          role="group"
          aria-label="Salon Olivia photo carousel"
        >
          {SLIDES.map((slide, index) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                index === activeIndex ? "opacity-20" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-salon-cream via-salon-cream/80 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
              Luxury hair & beauty studio
            </p>
            <h1 className="mb-6 font-serif text-5xl font-bold leading-tight text-salon-dark md:text-7xl">
              Elegance for Every Occasion
            </h1>
            <p className="mb-8 text-lg font-light text-gray-600 md:text-xl">
              Discover polished styling, thoughtful care, and a welcoming salon
              experience tailored to your celebration, routine, or self-care
              moment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/appointment"
                className="rounded-full bg-salon-dark px-8 py-4 text-center font-medium text-white shadow-lg transition-colors hover:bg-black"
              >
                Book Appointment
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-gray-200 bg-white px-8 py-4 text-center font-medium text-salon-dark shadow-sm transition-colors hover:border-salon-gold hover:text-salon-gold"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-6 bg-salon-gold"
                  : "w-1.5 bg-salon-dark/25 hover:bg-salon-dark/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
