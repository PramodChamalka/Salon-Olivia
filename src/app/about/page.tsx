import { PageShell } from "../../components/PageShell";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const values = [
  "Uncompromising Quality",
  "Personalised Care",
  "Continuous Innovation",
  "Sustainable Practices",
];

export default function AboutPage() {
  return (
    <PageShell>
      <section className="bg-salon-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
                About Salon Olivia
              </p>
              <h1 className="mb-6 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
                A calm retreat for beauty, confidence, and celebration.
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Founded by Ms. Nadeeka Priyangani, Salon Olivia blends
                international beauty trends with Sri Lankan warmth to create a
                luxurious salon experience that feels deeply personal.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Whether you are preparing for a major event or treating yourself
                to a fresh look, our team is dedicated to helping you feel
                polished, confident, and completely at ease.
              </p>
              <div className="space-y-4">
                {values.map((value) => (
                  <div
                    key={value}
                    className="flex items-center text-salon-dark"
                  >
                    <CheckCircle2 className="mr-3 text-salon-gold" size={20} />
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/appointment"
                className="mt-10 inline-flex rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
              >
                Book Your Visit
              </Link>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-xl">
              <img
                src="/images/oliv.jpeg"
                alt="Salon Olivia interior"
                className="h-[500px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
