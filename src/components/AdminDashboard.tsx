"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, TrendingUp, Users as UsersIcon, DollarSign, Award } from "lucide-react";
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
import { BookingsTable } from "@/components/admin/BookingsTable";

export function AdminDashboard() {
  const supabase = useMemo(() => createClient(), []);
  const [totalBookings, setTotalBookings] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("appointments")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => {
        if (!cancelled) setTotalBookings(count ?? 0);
      });
    return () => {
      cancelled = true;
    };
  }, [supabase]);

  const bookingData = [
    { name: "Mon", bookings: 12 },
    { name: "Tue", bookings: 19 },
    { name: "Wed", bookings: 15 },
    { name: "Thu", bookings: 22 },
    { name: "Fri", bookings: 30 },
    { name: "Sat", bookings: 45 },
    { name: "Sun", bookings: 38 },
  ];

  const serviceData = [
    { name: "Haircuts", value: 120 },
    { name: "Coloring", value: 85 },
    { name: "Facials", value: 65 },
    { name: "Nails", value: 90 },
    { name: "Makeup", value: 40 },
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
              {totalBookings ?? "—"}
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
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 12 }}
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
                  dot={{ r: 4, fill: "#C9A84C", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
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
                margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
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
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />

                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#374151", fontSize: 12, fontWeight: 500 }}
                />

                <Tooltip
                  cursor={{ fill: "#f9fafb" }}
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

      <BookingsTable />
    </>
  );
}
