import { createClient } from '@/lib/supabase/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const redirectTo = searchParams.get('redirect')
  const error = searchParams.get('error_description')

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(error)}`
    )
  }

  if (code) {
    const supabase = await createClient()
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)
    if (!exchangeError) {
      if (redirectTo) {
        return NextResponse.redirect(`${origin}${redirectTo}`)
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()

      return NextResponse.redirect(
        `${origin}${profile?.role === 'admin' ? '/admin' : '/'}`
      )
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent(
      'Could not sign in with Google. Please try again.'
    )}`
  )
}
