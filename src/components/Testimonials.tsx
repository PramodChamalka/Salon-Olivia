import Link from "next/link";
import { Star } from "lucide-react";

type TestimonialsProps = {
  variant?: "preview" | "full";
};

const testimonials = [
  {
    name: "Rashmi Perera",
    quote:
      "Every visit feels like a luxury escape. The team truly understands my style.",
  },
  {
    name: "Dilini Fernando",
    quote:
      "From bridal styling to everyday glamour, they always exceed expectations.",
  },
  {
    name: "Nadeesha Silva",
    quote:
      "The atmosphere is elegant, calm, and the results are consistently beautiful.",
  },
  {
    name: "Anjali Jayawardena",
    quote:
      "Their attention to detail and warm hospitality made my special day unforgettable.",
  },
];

export function Testimonials({ variant = "preview" }: TestimonialsProps) {
  const visibleTestimonials =
    variant === "preview" ? testimonials.slice(0, 3) : testimonials;

  return (
    <section className="bg-salon-cream/40 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
            Client Reviews
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-salon-gold" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {visibleTestimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-salon-cream bg-white p-8 shadow-sm"
            >
              <div className="mb-4 flex gap-1 text-salon-gold">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mb-6 text-sm leading-relaxed text-gray-600">
                “{item.quote}”
              </p>
              <p className="font-semibold text-salon-dark">{item.name}</p>
            </div>
          ))}
        </div>

        {variant === "preview" && (
          <div className="mt-12 text-center">
            <Link
              href="/testimonials"
              className="inline-flex rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
            >
              View More Reviews
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
