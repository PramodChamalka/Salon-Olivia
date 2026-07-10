"use client";

import React from "react";
import {
  Calendar,
  Star,
  Sparkles,
  Clock,
  ShieldCheck,
  Heart,
} from "lucide-react";
export function Hero() {
  return (
    <section id="home" className="pt-20">
      {/* Hero Banner */}
      <div className="relative bg-salon-cream min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Salon Interior"
            className="w-full h-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-salon-cream via-salon-cream/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-salon-dark leading-tight mb-6">
              Your Beauty,
              <br />
              <span className="text-salon-gold">Our Passion</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-light">
              Experience luxury beauty services tailored to your unique style.
              Discover the perfect blend of expertise, relaxation, and
              transformation at Salon Olivia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document.querySelector("#appointments")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="bg-salon-dark text-white px-8 py-4 rounded-full font-medium hover:bg-black transition-colors text-center shadow-lg"
              >
                Book Appointment
              </button>
              <button
                onClick={() =>
                  document.querySelector("#services")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="bg-white text-salon-dark border border-gray-200 px-8 py-4 rounded-full font-medium hover:border-salon-gold hover:text-salon-gold transition-colors text-center shadow-sm"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Strip */}
      <div className="bg-salon-rose/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-4 rounded-full shadow-sm text-salon-gold mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                Online Booking
              </h3>
              <p className="text-gray-600 text-sm">
                Easy and convenient scheduling at your fingertips.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-4 rounded-full shadow-sm text-salon-gold mb-4">
                <Star size={32} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                Expert Stylists
              </h3>
              <p className="text-gray-600 text-sm">
                Highly trained professionals dedicated to your look.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="bg-white p-4 rounded-full shadow-sm text-salon-gold mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                AI Recommendations
              </h3>
              <p className="text-gray-600 text-sm">
                Personalised style advice powered by technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
              Why Choose Us
            </h2>
            <div className="w-24 h-1 bg-salon-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Clock size={24} />,
                title: "Time Efficiency",
                desc: "Prompt service without compromising quality.",
              },
              {
                icon: <ShieldCheck size={24} />,
                title: "Premium Products",
                desc: "We use only top-tier, salon-exclusive brands.",
              },
              {
                icon: <Heart size={24} />,
                title: "Personalised Care",
                desc: "Treatments tailored to your specific needs.",
              },
              {
                icon: <Sparkles size={24} />,
                title: "Relaxing Ambiance",
                desc: "A tranquil environment to unwind and refresh.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-salon-cream/30 p-8 rounded-2xl hover:shadow-md transition-shadow border border-salon-cream"
              >
                <div className="text-salon-gold mb-4">{feature.icon}</div>
                <h4 className="font-serif text-lg font-semibold mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
