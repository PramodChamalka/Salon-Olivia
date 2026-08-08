"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Role = "customer" | "admin";

type Customer = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: Role;
  is_active: boolean;
  created_at: string;
  email: string;
};

type CustomersTableProps = {
  customers: Customer[];
  currentUserId: string;
};

export function CustomersTable({
  customers: initialCustomers,
  currentUserId,
}: CustomersTableProps) {
  const supabase = useMemo(() => createClient(), []);
  const [customers, setCustomers] = useState(initialCustomers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const displayName = (c: Customer) =>
    `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || c.email;

  const handleRoleChange = async (customer: Customer, nextRole: Role) => {
    if (nextRole === customer.role) return;
    if (
      nextRole === "admin" &&
      !window.confirm(
        `Grant admin access to ${displayName(customer)}? They'll be able to manage bookings, services, gallery, and other customers.`
      )
    ) {
      return;
    }

    const previous = customers;
    setUpdatingId(customer.id);
    setCustomers((rows) =>
      rows.map((row) =>
        row.id === customer.id ? { ...row, role: nextRole } : row
      )
    );

    const { error } = await supabase
      .from("profiles")
      .update({ role: nextRole })
      .eq("id", customer.id);

    if (error) setCustomers(previous);
    setUpdatingId(null);
  };

  const handleToggleActive = async (customer: Customer) => {
    const nextActive = !customer.is_active;
    if (
      !nextActive &&
      !window.confirm(
        `Deactivate ${displayName(customer)}? They won't be able to sign in to booking or account pages until reactivated.`
      )
    ) {
      return;
    }

    const previous = customers;
    setUpdatingId(customer.id);
    setCustomers((rows) =>
      rows.map((row) =>
        row.id === customer.id ? { ...row, is_active: nextActive } : row
      )
    );

    const { error } = await supabase
      .from("profiles")
      .update({ is_active: nextActive })
      .eq("id", customer.id);

    if (error) setCustomers(previous);
    setUpdatingId(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <th className="p-4 font-medium">Name</th>
            <th className="p-4 font-medium">Email</th>
            <th className="p-4 font-medium">Phone</th>
            <th className="p-4 font-medium">Role</th>
            <th className="p-4 font-medium">Status</th>
            <th className="p-4 font-medium">Joined</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.length === 0 && (
            <tr>
              <td className="p-4 text-sm text-gray-500" colSpan={6}>
                No customers yet.
              </td>
            </tr>
          )}
          {customers.map((customer) => {
            const isSelf = customer.id === currentUserId;
            const isUpdating = updatingId === customer.id;
            return (
              <tr
                key={customer.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-4 text-sm font-medium text-gray-900">
                  {displayName(customer)}
                  {isSelf && (
                    <span className="ml-2 text-xs font-normal text-gray-400">
                      (you)
                    </span>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {customer.email}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {customer.phone || "—"}
                </td>
                <td className="p-4">
                  <select
                    value={customer.role}
                    disabled={isSelf || isUpdating}
                    onChange={(e) =>
                      handleRoleChange(customer, e.target.value as Role)
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-medium capitalize cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 ${
                      customer.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    type="button"
                    disabled={isSelf || isUpdating}
                    onClick={() => handleToggleActive(customer)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-60 ${
                      customer.is_active
                        ? "bg-green-100 text-green-800 hover:opacity-80"
                        : "bg-red-100 text-red-700 hover:opacity-80"
                    }`}
                  >
                    {customer.is_active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(customer.created_at).toLocaleDateString("en-US")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
