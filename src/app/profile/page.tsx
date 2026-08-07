import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageShell } from "@/components/PageShell";
import { ProfileForm } from "@/components/ProfileForm";
import { MyAppointments } from "@/components/MyAppointments";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name, last_name, phone, birthday, address, avatar_url, role, created_at")
    .eq("id", user.id)
    .single();

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, preferred_time, status, notes, services(service_name)")
    .eq("customer_id", user.id)
    .order("preferred_time", { ascending: false });

  type AppointmentRow = {
    id: string;
    preferred_time: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    notes: string | null;
    services: { service_name: string } | null;
  };

  const myAppointments = (
    (appointments ?? []) as unknown as AppointmentRow[]
  ).map((appt) => ({
    id: appt.id,
    preferred_time: appt.preferred_time,
    status: appt.status,
    notes: appt.notes,
    service_name: appt.services?.service_name ?? null,
  }));

  return (
    <PageShell>
      <section className="bg-salon-cream/30 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-salon-gold">
            Your Account
          </p>
          <h1 className="mb-10 font-serif text-4xl font-bold text-salon-dark md:text-5xl">
            My Profile
          </h1>

          <ProfileForm
            email={user.email ?? ""}
            firstName={profile?.first_name ?? ""}
            lastName={profile?.last_name ?? ""}
            phone={profile?.phone ?? ""}
            birthday={profile?.birthday ?? ""}
            address={profile?.address ?? ""}
            avatarUrl={profile?.avatar_url ?? null}
            role={profile?.role ?? "customer"}
            memberSince={profile?.created_at ?? null}
          />

          <MyAppointments appointments={myAppointments} />
        </div>
      </section>
    </PageShell>
  );
}
