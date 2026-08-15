"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
  services: { service_name: string } | null;
};

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-500",
};

const STATUS_OPTIONS: AppointmentStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

export function BookingsTable() {
  const supabase = useMemo(() => createClient(), []);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadStatus, setLoadStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    nextStatus: AppointmentStatus
  ) => {
    const previous = appointments;
    setUpdatingId(id);
    setAppointments((rows) =>
      rows.map((row) => (row.id === id ? { ...row, status: nextStatus } : row))
    );

    const { error } = await supabase
      .from("appointments")
      .update({ status: nextStatus })
      .eq("id", id);

    if (error) {
      setAppointments(previous);
    } else if (nextStatus === "confirmed" || nextStatus === "cancelled") {
      // Best-effort: the status change already succeeded above regardless
      // of whether the email goes out.
      fetch("/api/appointments/notify-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId: id, status: nextStatus }),
      }).catch(() => {});
    }
    setUpdatingId(null);
  };

  useEffect(() => {
    let cancelled = false;

    supabase
      .from("appointments")
      .select(
        "id, full_name, phone, preferred_date, preferred_time, notes, status, created_at, services(service_name)"
      )
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setLoadStatus("error");
          return;
        }
        setAppointments((data as unknown as Appointment[]) ?? []);
        setLoadStatus("ready");
      });

    return () => {
      cancelled = true;
    };
  }, [supabase]);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="p-6 border-b border-gray-100">
        <h3 className="font-serif text-lg font-bold text-salon-dark">
          Recent Bookings
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Client Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Preferred Date & Time</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loadStatus === "loading" &&
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="p-4" colSpan={6}>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))}

            {loadStatus === "error" && (
              <tr>
                <td className="p-4 text-sm text-red-600" colSpan={6}>
                  Couldn&apos;t load bookings right now. Please refresh.
                </td>
              </tr>
            )}

            {loadStatus === "ready" && appointments.length === 0 && (
              <tr>
                <td className="p-4 text-sm text-gray-500" colSpan={6}>
                  No appointments yet.
                </td>
              </tr>
            )}

            {loadStatus === "ready" &&
              appointments.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {booking.full_name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {booking.phone}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {booking.services?.service_name ?? "—"}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(booking.preferred_time).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}
                  </td>
                  <td className="p-4">
                    <select
                      value={booking.status}
                      disabled={updatingId === booking.id}
                      onChange={(e) =>
                        handleStatusChange(
                          booking.id,
                          e.target.value as AppointmentStatus
                        )
                      }
                      className={`rounded-full border-0 px-3 py-1 text-xs font-medium capitalize cursor-pointer disabled:cursor-wait disabled:opacity-60 ${STATUS_STYLES[booking.status]}`}
                    >
                      {STATUS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4 max-w-xs truncate text-sm text-gray-600">
                    {booking.notes || "—"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
