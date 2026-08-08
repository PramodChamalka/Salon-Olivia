'use server'

import { createClient } from '@/lib/supabase/server'

export type NewsletterState = { error?: string; success?: boolean }

export async function subscribeAction(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()

  if (!email) return { error: 'Please enter your email.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('subscribers').insert({ email })

  if (error) {
    if (error.code === '23505') {
      return { success: true } // already subscribed — treat as success
    }
    return { error: 'Something went wrong. Please try again.' }
  }
  return { success: true }
}
