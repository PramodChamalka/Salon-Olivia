import { CalendarClock } from "lucide-react";

type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

type MyAppointment = {
  id: string;
  preferred_time: string;
  status: AppointmentStatus;
  notes: string | null;
  service_name: string | null;
};

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-500",
};

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Awaiting confirmation",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

type MyAppointmentsProps = {
  appointments: MyAppointment[];
};

export function MyAppointments({ appointments }: MyAppointmentsProps) {
  return (
    <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
      <h2 className="mb-1 font-serif text-2xl font-semibold text-salon-dark">
        My Appointments
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Track the status of your booking requests here.
      </p>

      {appointments.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven&rsquo;t requested an appointment yet.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {appointments.map((appt) => (
            <li key={appt.id} className="flex items-start gap-4 py-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-salon-cream text-salon-gold">
                <CalendarClock size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-salon-dark">
                    {appt.service_name ?? "Appointment"}
                  </p>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[appt.status]}`}
                  >
                    {STATUS_LABELS[appt.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">
                  {new Date(appt.preferred_time).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                {appt.notes && (
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {appt.notes}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
