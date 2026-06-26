import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-salon-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-serif text-3xl font-bold text-salon-gold mb-6 block">
              Salon Olivia
            </span>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Elevating beauty and confidence through expert care, premium
              products, and a luxurious salon experience in the heart of Sri
              Lanka.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-salon-gold hover:text-white transition-colors">
                
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-salon-gold hover:text-white transition-colors">
                
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-salon-gold hover:text-white transition-colors">
                
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-salon-gold hover:text-white transition-colors">
                
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
              'Home',
              'About Us',
              'Services',
              'Gallery',
              'Book Appointment',
              'Contact'].
              map((link) =>
              <li key={link}>
                  <a
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-salon-gold transition-colors text-sm">
                  
                    {link}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
              'Hair Styling & Cutting',
              'Color & Highlights',
              'Facials & Skincare',
              'Manicure & Pedicure',
              'Bridal Makeup',
              'Spa Treatments'].
              map((service) =>
              <li key={service}>
                  <a
                  href="#services"
                  className="text-gray-400 hover:text-salon-gold transition-colors text-sm">
                  
                    {service}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-salon-gold text-sm" />
              
              <button
                type="button"
                className="bg-salon-gold text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-600 transition-colors text-sm">
                
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2026 Salon Olivia. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-salon-gold transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-salon-gold transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}