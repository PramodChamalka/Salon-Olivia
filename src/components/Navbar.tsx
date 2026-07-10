"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Services",
      href: "#services",
    },
    {
      name: "Gallery",
      href: "#gallery",
    },
    {
      name: "Appointments",
      href: "#appointments",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-sm py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => scrollToSection("#home")}
          >
            <span className="font-serif text-2xl font-bold text-salon-dark">
              Salon Olivia
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-600 hover:text-salon-gold transition-colors font-medium text-sm uppercase tracking-wider"
              >
                {link.name}
              </button>
            ))}
            <Link
              href="/auth"
              className="text-gray-600 hover:text-salon-gold transition-colors font-medium text-sm uppercase tracking-wider"
            >
              Sign In
            </Link>
            <button
              onClick={() => scrollToSection("#appointments")}
              className="bg-salon-gold text-white px-6 py-2 rounded-full font-medium hover:bg-yellow-600 transition-colors shadow-sm"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-salon-dark focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-salon-gold hover:bg-salon-cream rounded-md"
              >
                {link.name}
              </button>
            ))}
            <Link
              href="/auth"
              className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-salon-gold hover:bg-salon-cream rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <button
              onClick={() => scrollToSection("#appointments")}
              className="block w-full text-center mt-4 bg-salon-gold text-white px-6 py-3 rounded-md font-medium hover:bg-yellow-600 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
