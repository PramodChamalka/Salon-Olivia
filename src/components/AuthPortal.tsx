"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Lock, Mail, Sparkles, User } from "lucide-react";
import { supabase } from "../lib/supabase/client";

type Mode = "sign-in" | "sign-up" | "reset" | "profile" | "admin";

type FormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: "customer" | "admin";
};

type FormErrors = Partial<Record<keyof FormState | "form", string>>;

const defaultForm: FormState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  role: "customer",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string) {
  return password.length >= 8;
}

export function AuthPortal({ initialMode = "sign-in" }: { initialMode?: Mode }) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionEmail, setSessionEmail] = useState("");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!active || error) {
        return;
      }

      const email = data.session?.user.email ?? "";
      setSessionEmail(email);

      if (data.session && mode === "sign-in") {
        setMode("profile");
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSessionEmail(currentSession?.user.email ?? "");
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [mode]);

  const headline = {
    "sign-in": "Sign in to manage bookings and admin tools.",
    "sign-up": "Create a customer account and complete your profile.",
    reset: "Send a password reset link to your email.",
    profile: "Complete the profile linked to your authenticated account.",
    admin: "Authenticate an admin account and verify access.",
  }[mode];

  const setField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const clearFeedback = () => {
    setErrors({});
    setMessage("");
  };

  const validateBase = () => {
    const nextErrors: FormErrors = {};

    if (!validateEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (mode !== "reset" && !validatePassword(form.password)) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (mode === "sign-up" && form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if ((mode === "sign-up" || mode === "profile") && !form.fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (
      (mode === "sign-up" || mode === "profile") &&
      form.phone.trim() &&
      !/^[0-9+()\s-]{7,20}$/.test(form.phone)
    ) {
      nextErrors.phone = "Enter a valid phone number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const saveProfile = async (userId: string, role: FormState["role"]) => {
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: userId,
        full_name: form.fullName.trim(),
        phone: form.phone.trim() || null,
        role,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      },
    );

    if (error) {
      throw error;
    }
  };

  const verifyAdminRole = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session?.user.id) {
      throw new Error("You must be signed in before verifying admin access.");
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", sessionData.session.user.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (data?.role !== "admin") {
      throw new Error("This account is not assigned the admin role.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearFeedback();

    if (!validateBase()) {
      return;
    }

    try {
      setLoading(true);

      if (mode === "sign-in") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) {
          throw error;
        }

        if (!data.session?.user.id) {
          throw new Error("Login succeeded without a session.");
        }

        setSessionEmail(data.session.user.email ?? form.email);
        setMessage("Signed in successfully.");
        setMode("profile");
        return;
      }

      if (mode === "admin") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (error) {
          throw error;
        }

        if (!data.session?.user.id) {
          throw new Error("Login succeeded without a session.");
        }

        await verifyAdminRole();
        router.push("/admin");
        return;
      }

      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.fullName.trim(),
              phone: form.phone.trim(),
              role: "customer",
            },
          },
        });

        if (error) {
          throw error;
        }

        if (data.user) {
          await saveProfile(data.user.id, "customer");
        }

        setMessage("Account created. Check your email if confirmation is enabled.");
        setMode("profile");
        return;
      }

      if (mode === "reset") {
        const redirectTo =
          typeof window !== "undefined" ? `${window.location.origin}/auth?mode=sign-in` : undefined;
        const { error } = await supabase.auth.resetPasswordForEmail(
          form.email,
          redirectTo ? { redirectTo } : undefined,
        );

        if (error) {
          throw error;
        }

        setMessage("Password reset email sent.");
        return;
      }

      if (mode === "profile") {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }

        const userId = data.session?.user.id;
        if (!userId) {
          throw new Error("Sign in before completing your profile.");
        }

        await saveProfile(userId, form.role);
        setMessage("Profile saved successfully.");
      }
    } catch (submitError) {
      const errorMessage = submitError instanceof Error ? submitError.message : "Unable to submit the form.";
      setErrors({ form: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const authTabs: Array<{ key: Mode; label: string }> = [
    { key: "sign-in", label: "Sign in" },
    { key: "sign-up", label: "Sign up" },
    { key: "reset", label: "Reset" },
    { key: "profile", label: "Profile" },
    { key: "admin", label: "Admin" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7f1_0%,#fffdf9_45%,#f8d7da_100%)] text-salon-charcoal">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-salon-slate transition-colors hover:text-salon-dark"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-salon-gold/30 bg-white/80 px-4 py-2 text-sm font-semibold text-salon-dark shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-salon-gold" /> Salon Olivia Auth
          </div>
        </div>

        <div className="mt-8 grid flex-1 items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-salon-dark px-8 py-10 text-white shadow-2xl shadow-salon-dark/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.35),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.18),transparent_40%)]" />
            <div className="relative z-10 max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <CheckCircle2 size={16} className="text-salon-gold" /> Supabase-backed auth flow
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
                Secure sign-in for guests, staff, and the admin portal.
              </h1>
              <p className="mt-5 text-base leading-7 text-white/80 md:text-lg">
                Use a single branded authentication surface for email login, account creation, password reset,
                and profile completion. Admin access is checked against the profiles table role.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/60">Session status</p>
                  <p className="mt-2 text-lg font-semibold">{sessionEmail || "No active session"}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-white/60">Protected route</p>
                  <p className="mt-2 text-lg font-semibold">/admin access requires role = admin</p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 px-4 py-3">Email + password auth</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">Reset flow included</div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">Profile completion step</div>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-xl shadow-salon-dark/5 backdrop-blur-xl md:p-8">
            <div className="flex flex-wrap gap-2">
              {authTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setMode(tab.key);
                    clearFeedback();
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    mode === tab.key ? "bg-salon-dark text-white" : "bg-salon-cream text-salon-slate hover:bg-salon-card"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <h2 className="font-serif text-3xl font-bold text-salon-dark">
                {mode === "sign-in"
                  ? "Welcome back"
                  : mode === "sign-up"
                    ? "Create your account"
                    : mode === "reset"
                      ? "Reset your password"
                      : mode === "profile"
                        ? "Complete profile"
                        : "Admin sign in"}
              </h2>
              <p className="text-sm leading-6 text-salon-slate">{headline}</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {(mode === "sign-up" || mode === "profile") && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-salon-dark">
                    <User size={16} /> Full name
                  </span>
                  <input
                    value={form.fullName}
                    onChange={(event) => setField("fullName", event.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                  />
                  {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
                </label>
              )}

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-salon-dark">
                  <Mail size={16} /> Email address
                </span>
                <input
                  value={form.email}
                  onChange={(event) => setField("email", event.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </label>

              {mode !== "reset" && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-salon-dark">
                    <Lock size={16} /> Password
                  </span>
                  <input
                    value={form.password}
                    onChange={(event) => setField("password", event.target.value)}
                    type="password"
                    placeholder="Minimum 8 characters"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                  />
                  {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                </label>
              )}

              {mode === "sign-up" && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-salon-dark">
                    <Lock size={16} /> Confirm password
                  </span>
                  <input
                    value={form.confirmPassword}
                    onChange={(event) => setField("confirmPassword", event.target.value)}
                    type="password"
                    placeholder="Repeat your password"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                  />
                  {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                </label>
              )}

              {(mode === "sign-up" || mode === "profile") && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-salon-dark">Phone number</span>
                  <input
                    value={form.phone}
                    onChange={(event) => setField("phone", event.target.value)}
                    type="tel"
                    placeholder="Optional"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </label>
              )}

              {(mode === "sign-up" || mode === "profile") && (
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-salon-dark">Role</span>
                  <select
                    value={form.role}
                    onChange={(event) => setField("role", event.target.value as FormState["role"])}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-salon-dark"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              )}

              {errors.form && (
                <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {errors.form}
                </p>
              )}

              {message && (
                <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-full bg-salon-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-salon-dark/10 transition hover:bg-[#9f5c66] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? "Working..."
                  : mode === "sign-in"
                    ? "Sign in"
                    : mode === "sign-up"
                      ? "Create account"
                      : mode === "reset"
                        ? "Send reset link"
                        : mode === "profile"
                          ? "Save profile"
                          : "Verify admin access"}
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-salon-slate">
              <button
                type="button"
                onClick={() => setMode("reset")}
                className="font-medium text-salon-dark hover:underline"
              >
                Forgot password?
              </button>
              <div>
                Need a different auth flow?{" "}
                <Link href="/admin" className="font-medium text-salon-dark hover:underline">
                  Open admin portal
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}