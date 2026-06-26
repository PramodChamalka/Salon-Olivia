import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-salon-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-salon-cream/20 p-8 rounded-3xl border border-salon-cream">
            <h3 className="font-serif text-2xl font-bold text-salon-dark mb-6">
              Send us a Message
            </h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold bg-white"
                    placeholder="Your Name" />
                  
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold bg-white"
                    placeholder="your@email.com" />
                  
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold bg-white">
                  <option>General Inquiry</option>
                  <option>Booking Question</option>
                  <option>Feedback</option>
                  <option>Careers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full border-gray-300 rounded-lg p-3 border focus:ring-salon-gold focus:border-salon-gold bg-white resize-none"
                  placeholder="How can we help you?">
                </textarea>
              </div>

              <button
                type="button"
                className="w-full bg-salon-dark text-white py-4 rounded-lg font-medium hover:bg-black transition-colors shadow-md">
                
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start">
                <div className="bg-salon-cream p-3 rounded-full text-salon-gold mr-4 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-salon-dark mb-1">
                    Visit Us
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    123 Beauty Avenue,
                    <br />
                    Colombo 03,
                    <br />
                    Sri Lanka
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-salon-cream p-3 rounded-full text-salon-gold mr-4 shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-salon-dark mb-1">
                    Call Us
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    +94 11 234 5678
                    <br />
                    +94 77 987 6543
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-salon-cream p-3 rounded-full text-salon-gold mr-4 shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-salon-dark mb-1">
                    Email Us
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    hello@salonolivia.lk
                    <br />
                    bookings@salonolivia.lk
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-salon-cream p-3 rounded-full text-salon-gold mr-4 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-salon-dark mb-1">
                    Opening Hours
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mon - Sat: 9:00 AM - 7:00 PM
                    <br />
                    Sunday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-300">
              <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                <MapPin size={32} className="mb-2" />
                <p className="font-medium">Google Maps Embed Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}