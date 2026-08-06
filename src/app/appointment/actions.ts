'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type AppointmentState = { error?: string; success?: boolean }

export async function createAppointmentAction(
  _prev: AppointmentState,
  formData: FormData
): Promise<AppointmentState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be signed in to book an appointment.' }
  }

  const fullName = String(formData.get('fullName') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const service = String(formData.get('service') ?? '').trim()
  const preferredDate = String(formData.get('preferredDate') ?? '')
  const preferredTimeOfDay = String(formData.get('preferredTime') ?? '')
  const notes = String(formData.get('notes') ?? '').trim()

  if (!fullName || !phone || !preferredDate || !preferredTimeOfDay) {
    return {
      error: 'Please fill in your name, phone, preferred date, and time.',
    }
  }

  // appointments has no service/service_id column yet, so the chosen
  // service rides along in notes rather than being silently dropped.
  const combinedNotes = service
    ? `Requested service: ${service}${notes ? `\n\n${notes}` : ''}`
    : notes || null

  const { error } = await supabase.from('appointments').insert({
    customer_id: user.id,
    full_name: fullName,
    phone,
    preferred_date: preferredDate,
    preferred_time: `${preferredDate}T${preferredTimeOfDay}:00`,
    notes: combinedNotes,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/appointment')
  return { success: true }
}
