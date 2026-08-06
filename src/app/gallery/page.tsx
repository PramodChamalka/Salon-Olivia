import { PageShell } from "../../components/PageShell";
import { Gallery } from "../../components/Gallery";

export default function GalleryPage() {
  return (
    <PageShell>
      <section className="bg-salon-cream/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
              Gallery
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
              A glimpse of our signature beauty moments.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Browse a curated collection of styles, transformations, and salon
              atmosphere that define the Olivia experience.
            </p>
          </div>
        </div>
      </section>

      <Gallery variant="full" />
    </PageShell>
  );
}
