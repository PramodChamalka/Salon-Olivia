import { BookingsTable } from "@/components/admin/BookingsTable";

export default function AdminBookingsPage() {
  return (
    <>
      <h1 className="mb-6 font-serif text-xl font-bold text-salon-dark">
        Bookings
      </h1>
      <BookingsTable />
    </>
  );
}
