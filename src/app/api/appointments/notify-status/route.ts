import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const NOTIFIABLE_STATUSES = new Set(['confirmed', 'cancelled'])

const EMAIL_COPY: Record<string, { subject: string; heading: string }> = {
  confirmed: {
    subject: 'Your Salon Olivia appointment is confirmed',
    heading: "You're all set!",
  },
  cancelled: {
    subject: 'Your Salon Olivia appointment was cancelled',
    heading: 'Your appointment was cancelled',
  },
}

export async function POST(request: NextRequest) {
  const { appointmentId, status } = await request.json()

  if (typeof appointmentId !== 'string' || !NOTIFIABLE_STATUSES.has(status)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Only an admin may trigger a notification -- authorization mirrors the
  // "admin: update all appointments" RLS policy, checked here explicitly
  // because this route runs with the service_role key, which bypasses RLS.
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  const { data: appointment, error: appointmentError } = await supabaseAdmin
    .from('appointments')
    .select('customer_id, full_name, preferred_time, services(service_name)')
    .eq('id', appointmentId)
    .single()

  if (appointmentError || !appointment) {
    return NextResponse.json({ error: 'Appointment not found.' }, { status: 404 })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  if (!resendApiKey) {
    console.warn(
      'RESEND_API_KEY is not set -- skipping appointment status email.'
    )
    return NextResponse.json({ sent: false, reason: 'not_configured' })
  }

  const { data: authUser, error: authError } =
    await supabaseAdmin.auth.admin.getUserById(appointment.customer_id)

  if (authError || !authUser?.user?.email) {
    return NextResponse.json({ sent: false, reason: 'no_customer_email' })
  }

  const service = (appointment.services as unknown as { service_name: string } | null)
  const when = new Date(appointment.preferred_time).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
  const copy = EMAIL_COPY[status]

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Salon Olivia <onboarding@resend.dev>',
      to: authUser.user.email,
      subject: copy.subject,
      html: `
        <p>Hi ${appointment.full_name},</p>
        <p>${copy.heading}</p>
        <p><strong>${service?.service_name ?? 'Appointment'}</strong><br />${when}</p>
        <p>&mdash; Salon Olivia</p>
      `,
    }),
  })

  if (!emailRes.ok) {
    const detail = await emailRes.text()
    console.error('Resend email failed:', detail)
    return NextResponse.json({ sent: false, reason: 'send_failed' })
  }

  return NextResponse.json({ sent: true })
}
