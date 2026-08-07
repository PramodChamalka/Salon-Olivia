import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  role: "customer" | "admin";
  is_active: boolean;
  created_at: string;
};

export default async function AdminCustomersPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, first_name, last_name, phone, role, is_active, created_at")
    .order("created_at", { ascending: false });

  // profiles has no email column -- it lives on auth.users, which isn't
  // exposed via the RLS-scoped client even for an admin, so this needs
  // the service_role client's admin API instead.
  const { data: usersRes } = await supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });
  const emailById = new Map(
    (usersRes?.users ?? []).map((u) => [u.id, u.email ?? "—"])
  );

  const customers = ((profiles ?? []) as Profile[]).map((profile) => ({
    ...profile,
    email: emailById.get(profile.id) ?? "—",
  }));

  return (
    <>
      <h1 className="mb-6 font-serif text-xl font-bold text-salon-dark">
        Customers
      </h1>

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
              const name =
                `${customer.first_name ?? ""} ${customer.last_name ?? ""}`.trim() ||
                "—";
              return (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {customer.email}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {customer.phone || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        customer.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {customer.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        customer.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
