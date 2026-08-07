import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { CustomersTable } from "@/components/admin/CustomersTable";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

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

      <CustomersTable customers={customers} currentUserId={user?.id ?? ""} />
    </>
  );
}
