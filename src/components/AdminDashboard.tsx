"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  Users as UsersIcon,
  DollarSign,
  Award,
  Bell,
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

type Appointment = {
  id: string;
  full_name: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  created_at: string;
};

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  useEffect(() => {
    let cancelled = false;
    const supabase = createClient();

    supabase
      .from("appointments")
      .select("id, full_name, phone, preferred_date, preferred_time, notes, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setStatus("error");
          return;
        }
        setAppointments(data ?? []);
        setStatus("ready");
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-salon-dark text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <span className="font-serif text-2xl font-bold text-salon-gold">
            Salon Olivia
          </span>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a
            href="#"
            className="flex items-center px-4 py-3 bg-salon-gold/20 text-salon-gold rounded-lg font-medium"
          >
            <LayoutDashboard size={20} className="mr-3" /> Overview
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Calendar size={20} className="mr-3" /> Bookings
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Scissors size={20} className="mr-3" /> Services
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Users size={20} className="mr-3" /> Customers
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Award size={20} className="mr-3" /> Staff
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <Settings size={20} className="mr-3" /> Settings
          </a>
          <a
            href="/"
            className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" /> Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0">
          <h1 className="font-serif text-xl font-bold text-salon-dark">
            Dashboard Overview
          </h1>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-salon-dark transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <img
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&w=100&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover"
              />

              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Ms. Nadeeka
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
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
                  {status === "ready" ? appointments.length : "—"}
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
                    <th className="p-4 font-medium">Preferred Date & Time</th>
                    <th className="p-4 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {status === "loading" &&
                    Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx}>
                        <td className="p-4" colSpan={4}>
                          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                        </td>
                      </tr>
                    ))}

                  {status === "error" && (
                    <tr>
                      <td className="p-4 text-sm text-red-600" colSpan={4}>
                        Couldn&apos;t load bookings right now. Please refresh.
                      </td>
                    </tr>
                  )}

                  {status === "ready" && appointments.length === 0 && (
                    <tr>
                      <td className="p-4 text-sm text-gray-500" colSpan={4}>
                        No appointments yet.
                      </td>
                    </tr>
                  )}

                  {status === "ready" &&
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
                          {new Date(booking.preferred_time).toLocaleString(
                            undefined,
                            {
                              dateStyle: "medium",
                              timeStyle: "short",
                            }
                          )}
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
        </div>
      </main>
    </div>
  );
}
