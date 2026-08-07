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
  const serviceId = String(formData.get('serviceId') ?? '').trim()
  const preferredDate = String(formData.get('preferredDate') ?? '')
  const preferredTimeOfDay = String(formData.get('preferredTime') ?? '')
  const notes = String(formData.get('notes') ?? '').trim()

  if (!fullName || !phone || !serviceId || !preferredDate || !preferredTimeOfDay) {
    return {
      error:
        'Please fill in your name, phone, preferred service, date, and time.',
    }
  }

  const { error } = await supabase.from('appointments').insert({
    customer_id: user.id,
    full_name: fullName,
    phone,
    service_id: serviceId,
    preferred_date: preferredDate,
    preferred_time: `${preferredDate}T${preferredTimeOfDay}:00`,
    notes: notes || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/appointment')
  return { success: true }
}
