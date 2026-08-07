"use client";

import { useActionState, useEffect, useRef } from "react";
import { UserRound } from "lucide-react";
import {
  createAppointmentAction,
  type AppointmentState,
} from "@/app/appointment/actions";

export function AppointmentForm() {
  const [state, formAction, isPending] = useActionState<
    AppointmentState,
    FormData
  >(createAppointmentAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center">
        <div className="mr-3 rounded-full bg-salon-cream p-3 text-salon-gold">
          <UserRound size={20} />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-semibold text-salon-dark">
            Appointment Request
          </h2>
          <p className="text-sm text-gray-600">
            Tell us what you are looking for and we&rsquo;ll be in touch
            shortly.
          </p>
        </div>
      </div>

      {state.success && (
        <div className="mb-5 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          Request received! Our team will confirm your appointment shortly.
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

      <form ref={formRef} action={formAction} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="fullName"
              required
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              name="phone"
              type="tel"
              required
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
              placeholder="+94 77 123 4567"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Preferred Service
          </label>
          <select
            name="service"
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
          >
            <option>Signature Haircut & Styling</option>
            <option>Reborn Color Treatment</option>
            <option>Radiance Facial</option>
            <option>Luxury Gel Manicure</option>
          </select>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preferred Date
            </label>
            <input
              name="preferredDate"
              type="date"
              required
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Preferred Time
            </label>
            <input
              name="preferredTime"
              type="time"
              required
              className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            name="notes"
            rows={4}
            className="w-full rounded-lg border border-gray-200 p-3 focus:border-salon-gold focus:outline-none"
            placeholder="Tell us about your vision or special occasion."
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-salon-dark px-6 py-3 font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
