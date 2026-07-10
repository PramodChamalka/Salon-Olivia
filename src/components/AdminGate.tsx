"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase/client";
import { AdminDashboard } from "./AdminDashboard";

type GateState = "loading" | "allowed" | "denied";

export function AdminGate() {
  const router = useRouter();
  const [state, setState] = useState<GateState>("loading");

  useEffect(() => {
    let active = true;

    const verifyAccess = async () => {
      const { data, error } = await supabase.auth.getSession();
      const userId = data.session?.user.id;

      if (error || !userId) {
        if (active) {
          setState("denied");
          router.replace("/auth?mode=admin");
        }
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (!active) {
        return;
      }

      if (profileError || profile?.role !== "admin") {
        setState("denied");
        router.replace("/auth?mode=admin");
        return;
      }

      setState("allowed");
    };

    verifyAccess();

    return () => {
      active = false;
    };
  }, [router]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-salon-cream text-salon-dark">
        Verifying admin access...
      </div>
    );
  }

  if (state === "denied") {
    return null;
  }

  return <AdminDashboard />;
}