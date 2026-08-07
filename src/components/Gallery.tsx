"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type GalleryProps = {
  variant?: "full" | "preview";
};

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  category_id: string;
  category_name: string;
  created_at: string;
};

const GALLERY_API_URL = "http://localhost:8000/gallery";

export function Gallery({ variant = "full" }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;

    fetch(GALLERY_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        return res.json() as Promise<GalleryItem[]>;
      })
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filters = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category_name))),
  ];

  const visibleItems =
    variant === "preview"
      ? items.slice(0, 6)
      : activeFilter === "All"
        ? items
        : items.filter((item) => item.category_name === activeFilter);

  return (
    <section id="gallery" className="bg-salon-dark py-20 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {variant === "preview" && (
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold">
              Portfolio Preview
            </h2>
            <div className="mx-auto mb-8 h-1 w-24 bg-salon-gold"></div>
          </div>
        )}

        {variant === "full" && status === "ready" && items.length > 0 && (
          <div className="mb-12 flex flex-wrap justify-center gap-4">
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

        {status === "loading" && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-white/10"
              />
            ))}
          </div>
        )}

        {status === "error" && (
          <p className="text-center text-gray-300">
            We couldn&apos;t load the gallery right now. Please try again
            shortly.
          </p>
        )}

        {status === "ready" && visibleItems.length === 0 && (
          <p className="text-center text-gray-300">
            No photos in this category yet.
          </p>
        )}

        {status === "ready" && visibleItems.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-2xl"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 group-hover:border-salon-gold/50"></div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-serif text-lg tracking-widest text-white">
                    {item.category_name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

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
