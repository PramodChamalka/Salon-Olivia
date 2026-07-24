import Image from "next/image";
import Link from "next/link";
import { PageShell } from "../components/PageShell";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Gallery } from "../components/Gallery";
import { Stats } from "../components/Stats";
import { Testimonials } from "../components/Testimonials";
import { WhyChooseUs } from "../components/WhyChooseUs";

export default function LandingPage() {
  return (
    <PageShell>
      <div className="bg-white font-sans text-gray-900 scroll-smooth">
        <Hero />

        <section id="about" className="bg-salon-cream/20 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
                About Salon Olivia
              </p>
              <h2 className="mb-6 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
                A calm retreat for beauty, confidence, and celebration.
              </h2>
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
              <Link
                href="/about"
                className="inline-flex rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
              >
                Read More
              </Link>
            </div>

            <div className="overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/oliv.jpeg"
                alt="Salon Olivia interior"
                className="h-[500px] w-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <Services variant="preview" />
        <Gallery variant="preview" />
        <Stats />
        <Testimonials variant="preview" />

        <section className="bg-salon-cream/40 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="mb-4 font-serif text-4xl font-bold text-salon-dark">
              Ready for Your Special Day?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
              Let our team create a look that feels effortless, elevated, and
              entirely you.
            </p>
            <Link
              href="/appointment"
              className="inline-flex rounded-full bg-salon-dark px-8 py-3 font-medium text-white transition-colors hover:bg-black"
            >
              Book Today
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
