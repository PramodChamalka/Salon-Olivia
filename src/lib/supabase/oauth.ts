import { createClient } from '@/lib/supabase/client'

export async function signInWithGoogle(redirectTo: string) {
  const supabase = createClient()
  const params = new URLSearchParams()
  if (redirectTo) params.set('redirect', redirectTo)

  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback${
        params.toString() ? `?${params.toString()}` : ''
      }`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  })
}
