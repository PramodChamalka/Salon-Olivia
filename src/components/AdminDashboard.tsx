"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  TrendingUp,
  Users as UsersIcon,
  DollarSign,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
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

export function AdminDashboard() {
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

  const bookingData = [
    {
      name: "Mon",
      bookings: 12,
    },
    {
      name: "Tue",
      bookings: 19,
    },
    {
      name: "Wed",
      bookings: 15,
    },
    {
      name: "Thu",
      bookings: 22,
    },
    {
      name: "Fri",
      bookings: 30,
    },
    {
      name: "Sat",
      bookings: 45,
    },
    {
      name: "Sun",
      bookings: 38,
    },
  ];

  const serviceData = [
    {
      name: "Haircuts",
      value: 120,
    },
    {
      name: "Coloring",
      value: 85,
    },
    {
      name: "Facials",
      value: 65,
    },
    {
      name: "Nails",
      value: 90,
    },
    {
      name: "Makeup",
      value: 40,
    },
  ];

  return (
    <>
      <h1 className="mb-6 font-serif text-xl font-bold text-salon-dark">
        Dashboard Overview
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Bookings
                </p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {loadStatus === "ready" ? appointments.length : "—"}
                </h3>
                <p className="text-xs text-gray-400 mt-1">All time</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-green-50 p-4 rounded-xl text-green-600 mr-4">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Revenue (Month)
                </p>
                <h3 className="text-2xl font-bold text-gray-900">LKR 450k</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" /> +8% vs last month
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-purple-50 p-4 rounded-xl text-purple-600 mr-4">
                <UsersIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  New Customers
                </p>
                <h3 className="text-2xl font-bold text-gray-900">42</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" /> +5% this week
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-salon-cream p-4 rounded-xl text-salon-gold mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Top Service</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  Balayage Color
                </h3>
                <p className="text-xs text-gray-500 mt-1">35 bookings</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-salon-dark mb-6">
                Bookings Over Time
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6"
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7280",
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7280",
                        fontSize: 12,
                      }}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />

                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#C9A84C"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#C9A84C",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{
                        r: 6,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-salon-dark mb-6">
                Popular Services
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={serviceData}
                    layout="vertical"
                    margin={{
                      top: 0,
                      right: 0,
                      left: 20,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#f3f4f6"
                    />

                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#6b7280",
                        fontSize: 12,
                      }}
                    />

                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: "#374151",
                        fontSize: 12,
                        fontWeight: 500,
                      }}
                    />

                    <Tooltip
                      cursor={{
                        fill: "#f9fafb",
                      }}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />

                    <Bar
                      dataKey="value"
                      fill="#2D2D2D"
                      radius={[0, 4, 4, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
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
                            undefined,
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
    </>
  );
}
