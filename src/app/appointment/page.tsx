import { PageShell } from "../../components/PageShell";
import { CalendarDays, Clock3, Sparkles, UserRound } from "lucide-react";

export default function AppointmentPage() {
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
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center">
                <div className="mr-3 rounded-full bg-salon-cream p-3 text-salon-gold">
                  <UserRound size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-salon-dark">
                    Appointment Request
                  </h2>
                  <p className="text-sm text-gray-600">
                    Tell us what you are looking for and we’ll be in touch
                    shortly.
                  </p>
                </div>
              </div>
              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                      placeholder="+94 77 123 4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Preferred Service
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none">
                    <option>Signature Haircut & Styling</option>
                    <option>Reborn Color Treatment</option>
                    <option>Radiance Facial</option>
                    <option>Luxury Gel Manicure</option>
                  </select>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                    placeholder="Tell us about your vision or special occasion."
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
