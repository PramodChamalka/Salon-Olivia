import React, { useState } from 'react';
import { Scissors, Sparkles, Droplets, Palette, Clock } from 'lucide-react';
export function Services() {
  const [activeTab, setActiveTab] = useState('All');
  const categories = ['All', 'Hair', 'Skin', 'Nails', 'Makeup'];
  const services = [
  {
    id: 1,
    category: 'Hair',
    name: 'Signature Haircut & Styling',
    description:
    'Personalised consultation, wash, cut, and professional styling.',
    duration: '60 min',
    price: 'LKR 4,500',
    icon: <Scissors size={24} />
  },
  {
    id: 2,
    category: 'Hair',
    name: 'Balayage Color Treatment',
    description: 'Hand-painted highlights for a natural, sun-kissed look.',
    duration: '180 min',
    price: 'LKR 15,000',
    icon: <Palette size={24} />
  },
  {
    id: 3,
    category: 'Skin',
    name: 'Radiance Facial',
    description:
    'Deep cleansing, exfoliation, and custom mask for glowing skin.',
    duration: '75 min',
    price: 'LKR 6,500',
    icon: <Sparkles size={24} />
  },
  {
    id: 4,
    category: 'Nails',
    name: 'Luxury Gel Manicure',
    description:
    'Cuticle care, shaping, massage, and long-lasting gel polish.',
    duration: '45 min',
    price: 'LKR 3,500',
    icon: <Droplets size={24} />
  },
  {
    id: 5,
    category: 'Makeup',
    name: 'Bridal Makeup Package',
    description: 'Complete bridal look including trial, hair, and makeup.',
    duration: '240 min',
    price: 'LKR 35,000',
    icon: <Sparkles size={24} />
  },
  {
    id: 6,
    category: 'Skin',
    name: 'Anti-Aging Treatment',
    description: 'Advanced serum infusion and massage to reduce fine lines.',
    duration: '90 min',
    price: 'LKR 8,500',
    icon: <Sparkles size={24} />
  }];

  const filteredServices =
  activeTab === 'All' ?
  services :
  services.filter((s) => s.category === activeTab);
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-salon-dark mb-4">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-salon-gold mx-auto mb-8"></div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category) =>
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === category ? 'bg-salon-dark text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              
                {category}
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) =>
          <div
            key={service.id}
            className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            
              <div className="flex justify-between items-start mb-4">
                <div className="bg-salon-cream p-3 rounded-xl text-salon-gold">
                  {service.icon}
                </div>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full flex items-center">
                  <Clock size={12} className="mr-1" /> {service.duration}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-salon-dark mb-2">
                {service.name}
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {service.description}
              </p>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-semibold text-salon-dark text-lg">
                  {service.price}
                </span>

                {/* Hover Button */}
                <button
                onClick={() =>
                document.querySelector('#appointments')?.scrollIntoView({
                  behavior: 'smooth'
                })
                }
                className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 bg-salon-gold text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300">
                
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}