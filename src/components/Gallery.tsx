"use client";
import { useState } from "react";
export function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Hair", "Skin", "Nails", "Salon"];
  const images = [
    {
      id: 1,
      category: "Hair",
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "large",
    },
    {
      id: 2,
      category: "Salon",
      src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "small",
    },
    {
      id: 3,
      category: "Nails",
      src: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "small",
    },
    {
      id: 4,
      category: "Skin",
      src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "medium",
    },
    {
      id: 5,
      category: "Hair",
      src: "https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "small",
    },
    {
      id: 6,
      category: "Salon",
      src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      size: "medium",
    },
  ];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((img) => img.category === activeFilter);
  return (
    <section id="gallery" className="py-20 bg-salon-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">Our Portfolio</h2>
          <div className="w-24 h-1 bg-salon-gold mx-auto mb-8"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-sm tracking-wider uppercase transition-colors ${activeFilter === filter ? "text-salon-gold border-b-2 border-salon-gold pb-1" : "text-gray-400 hover:text-white"}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid relative group overflow-hidden rounded-xl cursor-pointer"
            >
              <img
                src={img.src}
                alt={`Gallery ${img.category}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-salon-gold/50 transition-colors duration-300 rounded-xl pointer-events-none"></div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-serif text-lg tracking-widest">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
