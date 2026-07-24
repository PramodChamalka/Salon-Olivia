"use client";
import { useState } from "react";
import Link from "next/link";
import { Scissors, Sparkles, Droplets, Palette, Clock3 } from "lucide-react";
import { services } from "../data/services";

type ServicesProps = {
  variant?: "full" | "preview";
};

const iconMap = {
  scissors: <Scissors size={24} />,
  palette: <Palette size={24} />,
  sparkles: <Sparkles size={24} />,
  droplets: <Droplets size={24} />,
};

export function Services({ variant = "full" }: ServicesProps) {
  const [activeTab, setActiveTab] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(services.map((service) => service.category))),
  ];
  const filteredServices =
    variant === "preview"
      ? services.slice(0, 4)
      : activeTab === "All"
        ? services
        : services.filter((service) => service.category === activeTab);

  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold text-salon-dark">
            {variant === "preview" ? "Featured Services" : "Our Services"}
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-salon-gold"></div>

          {variant === "full" && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`rounded-full px-6 py-2 font-medium transition-all ${activeTab === category ? "bg-salon-dark text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={service.image}
                alt={service.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-salon-cream p-3 text-salon-gold">
                    {iconMap[service.icon]}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    <Clock3 size={12} className="mr-1" />
                    {service.duration}
                  </span>
                </div>

                <h3 className="mb-2 font-serif text-xl font-semibold text-salon-dark">
                  {service.name}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-500">
                  {service.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-salon-dark">
                    {service.price}
                  </span>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-sm font-semibold text-salon-gold transition-colors hover:text-salon-dark"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {variant === "preview" && (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
            >
              View All Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
