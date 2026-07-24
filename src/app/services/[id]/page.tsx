import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "../../../components/PageShell";
import { services } from "../../../data/services";
import { Clock3, Scissors, Palette, Sparkles, Droplets } from "lucide-react";

type ServiceDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const iconMap = {
  scissors: <Scissors size={20} />,
  palette: <Palette size={20} />,
  sparkles: <Sparkles size={20} />,
  droplets: <Droplets size={20} />,
};

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { id } = await params;
  const service = services.find((item) => item.id === Number(id));

  if (!service) {
    notFound();
  }

  return (
    <PageShell>
      <section className="bg-salon-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <img src={service.image} alt={service.name} className="h-[400px] w-full rounded-3xl object-cover shadow-xl" />
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">Service Details</p>
              <h1 className="mb-4 font-serif text-4xl font-bold text-salon-dark">{service.name}</h1>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">{service.description}</p>
              <div className="mb-8 flex flex-wrap gap-4">
                <span className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-salon-dark shadow-sm">
                  <Clock3 size={14} className="mr-2" />
                  {service.duration}
                </span>
                <span className="inline-flex items-center rounded-full bg-salon-gold/15 px-4 py-2 text-sm font-medium text-salon-dark">
                  {service.price}
                </span>
              </div>
              <div className="rounded-2xl border border-salon-cream bg-white p-6 shadow-sm">
                <div className="mb-3 flex items-center text-salon-dark">
                  <div className="mr-3 rounded-full bg-salon-cream p-3 text-salon-gold">{iconMap[service.icon]}</div>
                  <span className="font-semibold">Perfect for {service.category.toLowerCase()} styling and care.</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">Book this service for a tailored treatment plan that brings out your best features with comfort and precision.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/appointment" className="rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black">Book This Service</Link>
                <Link href="/services" className="rounded-full border border-gray-300 px-6 py-3 font-medium text-salon-dark transition-colors hover:border-salon-gold hover:text-salon-gold">Back to Services</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
