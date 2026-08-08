import { PageShell } from "../../components/PageShell";
import { MapPin, Phone, Mail, Clock3 } from "lucide-react";

export default function ContactPage() {
  return (
    <PageShell>
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
              Contact Us
            </p>
            <h1 className="mb-4 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
              We’d love to hear from you.
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Reach out for appointments, questions, or special occasion
              planning. We are here to help.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6 rounded-3xl border border-salon-cream bg-salon-cream/40 p-8">
              <div className="flex items-start">
                <MapPin className="mr-4 text-salon-gold" size={22} />
                <div>
                  <h2 className="font-semibold text-salon-dark">Visit Us</h2>
                  <p className="text-sm text-gray-600">
                    123 Galewela, Matale, Sri Lanka
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-4 text-salon-gold" size={22} />
                <div>
                  <h2 className="font-semibold text-salon-dark">Call Us</h2>
                  <p className="text-sm text-gray-600">
                    <a href="tel:+94773091720" className="hover:text-salon-gold">
                      +94 77 309 1720
                    </a>
                    <br />
                    <a href="tel:+94776261549" className="hover:text-salon-gold">
                      +94 77 626 1549
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-4 text-salon-gold" size={22} />
                <div>
                  <h2 className="font-semibold text-salon-dark">Email Us</h2>
                  <p className="text-sm text-gray-600">
                    hello@salonolivia.lk
                    <br />
                    bookings@salonolivia.lk
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock3 className="mr-4 text-salon-gold" size={22} />
                <div>
                  <h2 className="font-semibold text-salon-dark">
                    Opening Hours
                  </h2>
                  <p className="text-sm text-gray-600">
                    Mon - Sat: 9:00 AM - 7:00 PM
                    <br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
              <form className="space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none">
                    <option>General Inquiry</option>
                    <option>Booking Question</option>
                    <option>Feedback</option>
                    <option>Careers</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="mb-4 text-center font-serif text-2xl font-bold text-salon-dark">
              Find Us
            </h2>
            <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.301610726496!2d80.5695018!3d7.757801900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afcb36c054a6887%3A0x56765b443de9e10d!2sSalon%20Olivia!5e0!3m2!1sen!2slk!4v1786171380994!5m2!1sen!2slk"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Salon Olivia location on Google Maps"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
