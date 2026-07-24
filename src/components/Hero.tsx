"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="pt-20">
      <div className="relative flex min-h-[80vh] items-center bg-salon-cream">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Salon Olivia interior"
            className="h-full w-full object-cover opacity-20"
          />
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
      </div>
    </section>
  );
}
