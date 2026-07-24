import { PageShell } from "../../components/PageShell";
import Link from "next/link";
import { services } from "../../data/services";
import { Clock3, Scissors, Palette, Sparkles, Droplets } from "lucide-react";

const iconMap = {
  scissors: <Scissors size={20} />,
  palette: <Palette size={20} />,
  sparkles: <Sparkles size={20} />,
  droplets: <Droplets size={20} />,
};

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">Our Services</p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-salon-dark md:text-5xl">Signature experiences for every occasion.</h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">From everyday polish to extraordinary bridal styling, each service is crafted to suit your needs and your schedule.</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <article key={service.id} className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <img src={service.image} alt={service.name} className="h-56 w-full object-cover" />
                <div className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-full bg-salon-cream p-3 text-salon-gold">{iconMap[service.icon]}</div>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      <Clock3 size={12} className="mr-1" />
                      {service.duration}
                    </span>
                  </div>
                  <h2 className="mb-3 font-serif text-2xl font-semibold text-salon-dark">{service.name}</h2>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-salon-dark">{service.price}</span>
                    <Link href="/appointment" className="text-sm font-semibold text-salon-gold hover:text-salon-dark">Book Now</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
