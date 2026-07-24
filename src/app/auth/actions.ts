'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const MAX_ATTEMPTS = 5
const LOCK_MINUTES = 15

export type AuthState = { error?: string }

export async function registerAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const confirm = String(formData.get('confirmPassword') ?? '')
  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const birthday = String(formData.get('birthday') ?? '')
  const address = String(formData.get('address') ?? '').trim()

  if (!email || !password || !firstName || !lastName) {
    return { error: 'Please fill in all required fields.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }
  if (password.length < 8) {
    return { error: 'Password must be at least 8 characters.' }
  }
  if (password !== confirm) {
    return { error: 'Passwords do not match.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        birthday,
        address,
      },
    },
  })

  if (error) {
    const msg = error.message.toLowerCase()
    if (msg.includes('already registered') || msg.includes('already been registered')) {
      return { error: 'An account with this email already exists. Please sign in instead.' }
    }
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/login?registered=1')
}

export async function loginAction(
  _prev: AuthState,
  formData: FormData
): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase()
  const password = String(formData.get('password') ?? '')
  const redirectTo = String(formData.get('redirect') ?? '')

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { data: attempt } = await supabaseAdmin
    .from('login_attempts')
    .select('fail_count, locked_until')
    .eq('email', email)
    .maybeSingle()

  if (attempt?.locked_until && new Date(attempt.locked_until) > new Date()) {
    const mins = Math.ceil(
      (new Date(attempt.locked_until).getTime() - Date.now()) / 60000
    )
    return { error: `Too many failed attempts. Locked for ${mins} more minute(s).` }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    const nextCount = (attempt?.fail_count ?? 0) + 1
    const lockedUntil =
      nextCount >= MAX_ATTEMPTS
        ? new Date(Date.now() + LOCK_MINUTES * 60000).toISOString()
        : null

    await supabaseAdmin.from('login_attempts').upsert({
      email,
      fail_count: nextCount,
      locked_until: lockedUntil,
    })

    if (lockedUntil) {
      return { error: `Too many failed attempts. Account locked for ${LOCK_MINUTES} minutes.` }
    }
    return {
      error: `Invalid email or password. ${MAX_ATTEMPTS - nextCount} attempt(s) remaining.`,
    }
  }

  await supabaseAdmin.from('login_attempts').delete().eq('email', email)

  revalidatePath('/', 'layout')
  redirect(redirectTo || '/')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}
