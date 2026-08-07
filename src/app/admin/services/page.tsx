import { ServicesAdmin } from "@/components/admin/ServicesAdmin";

export default function AdminServicesPage() {
  return (
    <>
      <h1 className="mb-6 font-serif text-xl font-bold text-salon-dark">
        Manage Services
      </h1>
      <ServicesAdmin />
    </>
  );
}
