import { GalleryAdmin } from "@/components/admin/GalleryAdmin";

export default function AdminGalleryPage() {
  return (
    <>
      <h1 className="mb-6 font-serif text-xl font-bold text-salon-dark">
        Manage Gallery
      </h1>
      <GalleryAdmin />
    </>
  );
}
