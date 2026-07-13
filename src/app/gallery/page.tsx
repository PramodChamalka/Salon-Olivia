import { PageShell } from "../../components/PageShell";

const images = [
  "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
];

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

          <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={image}
                  alt={`Salon Olivia gallery ${index + 1}`}
                  className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
