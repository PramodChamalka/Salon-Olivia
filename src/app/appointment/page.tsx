import { PageShell } from "../../components/PageShell";
import { AppointmentForm } from "../../components/AppointmentForm";
import { CalendarDays, Clock3, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AppointmentPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("service_id, service_name")
    .order("service_name");

  return (
    <PageShell>
      <section className="bg-salon-cream/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
                Book an Appointment
              </p>
              <h1 className="mb-6 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
                Reserve your next salon experience.
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Choose your preferred service, date, and stylist. Our team will
                confirm your appointment and help you prepare for your visit.
              </p>
              <div className="space-y-4 rounded-3xl border border-salon-cream bg-white p-8 shadow-sm">
                <div className="flex items-start">
                  <CalendarDays
                    className="mr-3 mt-1 text-salon-gold"
                    size={20}
                  />
                  <div>
                    <h2 className="font-semibold text-salon-dark">
                      Flexible scheduling
                    </h2>
                    <p className="text-sm text-gray-600">
                      Plan your appointment around your routine with easy online
                      booking.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock3 className="mr-3 mt-1 text-salon-gold" size={20} />
                  <div>
                    <h2 className="font-semibold text-salon-dark">
                      Efficient service flow
                    </h2>
                    <p className="text-sm text-gray-600">
                      We help you stay on time with clear coordination and
                      preparation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Sparkles className="mr-3 mt-1 text-salon-gold" size={20} />
                  <div>
                    <h2 className="font-semibold text-salon-dark">
                      Tailored recommendations
                    </h2>
                    <p className="text-sm text-gray-600">
                      Our stylists personalize every detail based on your goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AppointmentForm services={services ?? []} />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
