"use client";

import { useActionState } from "react";
import { Mail, ShieldCheck, CalendarClock } from "lucide-react";
import {
  updateProfileAction,
  type ProfileState,
} from "@/app/profile/actions";

type ProfileFormProps = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  address: string;
  avatarUrl: string | null;
  role: string;
  memberSince: string | null;
};

export function ProfileForm({
  email,
  firstName,
  lastName,
  phone,
  birthday,
  address,
  avatarUrl,
  role,
  memberSince,
}: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState<
    ProfileState,
    FormData
  >(updateProfileAction, {});

  const initials =
    (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || "U";

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Summary card */}
      <div className="h-fit rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt=""
            className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
          />
        ) : (
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-salon-gold text-2xl font-semibold text-white">
            {initials}
          </div>
        )}
        <h2 className="font-serif text-xl font-semibold text-salon-dark">
          {firstName || lastName ? `${firstName} ${lastName}`.trim() : "Welcome"}
        </h2>
        <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-gray-600">
          <Mail size={14} />
          {email}
        </p>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider text-salon-gold">
          <ShieldCheck size={14} />
          {role}
        </p>
        {memberSince && (
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-gray-500">
            <CalendarClock size={14} />
            Member since{" "}
            {new Date(memberSince).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Editable details */}
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <h2 className="mb-1 font-serif text-2xl font-semibold text-salon-dark">
          Personal Details
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Keep your details up to date so we can prepare for your visits.
        </p>

        {state.success && (
          <div className="mb-5 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
            Profile updated successfully.
          </div>
        )}
        {state.error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                name="firstName"
                defaultValue={firstName}
                required
                className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                name="lastName"
                defaultValue={lastName}
                required
                className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                name="phone"
                type="tel"
                defaultValue={phone}
                placeholder="+94 77 123 4567"
                className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                name="birthday"
                type="date"
                defaultValue={birthday}
                className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              name="address"
              defaultValue={address}
              placeholder="123 Beauty Lane, Suite 4"
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
          >
            {isPending ? "Saving…" : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
