import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Gallery", href: "/gallery" },
    { label: "Book Appointment", href: "/appointment" },
    { label: "Contact", href: "/contact" },
  ];

  const serviceHighlights = [
    "Hair Styling & Cutting",
    "Color & Highlights",
    "Facials & Skincare",
    "Manicure & Pedicure",
    "Bridal Makeup",
    "Spa Treatments",
  ];

  return (
    <footer className="bg-salon-dark pb-8 pt-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="mb-6 block font-serif text-3xl font-bold text-salon-gold">
              Salon Olivia
            </span>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Elevating beauty and confidence through expert care, premium
              products, and a luxurious salon experience in the heart of Sri
              Lanka.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-salon-gold hover:text-white"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-salon-gold hover:text-white"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-salon-gold hover:text-white"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors hover:bg-salon-gold hover:text-white"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg font-bold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-salon-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg font-bold">Our Services</h4>
            <ul className="space-y-3">
              {serviceHighlights.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-400 transition-colors hover:text-salon-gold"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-serif text-lg font-bold">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white focus:border-salon-gold focus:outline-none"
              />
              <button
                type="button"
                className="rounded-lg bg-salon-gold px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-gray-500 md:mb-0">
            © 2026 Salon Olivia. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="transition-colors hover:text-salon-gold">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-salon-gold">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
