"use client";
import { useState } from "react";
import Link from "next/link";

type GalleryProps = {
  variant?: "full" | "preview";
};

export function Gallery({ variant = "full" }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Hair", "Skin", "Nails", "Salon"];
  const images = [
    {
      id: 1,
      category: "Hair",
      src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      category: "Salon",
      src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      category: "Nails",
      src: "images/nail-care-tips.jpg",
    },
    {
      id: 4,
      category: "Skin",
      src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      category: "Hair",
      src: "images/hair.jpeg",
    },
    {
      id: 6,
      category: "Salon",
      src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredImages =
    variant === "preview"
      ? images.slice(0, 6)
      : activeFilter === "All"
        ? images
        : images.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="bg-salon-dark py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-4xl font-bold">
            Portfolio Preview
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 bg-salon-gold"></div>

          {variant === "full" && (
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`text-sm uppercase tracking-wider transition-colors ${activeFilter === filter ? "border-b-2 border-salon-gold pb-1 text-salon-gold" : "text-gray-400 hover:text-white"}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={img.src}
                alt={`Gallery ${img.category}`}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-salon-gold/50"></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-serif text-lg tracking-widest text-white">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {variant === "preview" && (
          <div className="mt-12 text-center">
            <Link
              href="/gallery"
              className="inline-flex rounded-full bg-white px-6 py-3 font-medium text-salon-dark transition-colors hover:bg-salon-cream"
            >
              View Full Gallery
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
