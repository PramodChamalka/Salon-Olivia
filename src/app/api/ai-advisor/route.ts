import { NextResponse, type NextRequest } from 'next/server'

const ADVISOR_ENDPOINT = 'https://hostit.api.stellarcode.digital/chat'

export async function POST(request: NextRequest) {
  const { question } = await request.json()

  if (typeof question !== 'string' || !question.trim()) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  let upstream: Response
  try {
    upstream = await fetch(ADVISOR_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
  } catch (err) {
    console.error('AI advisor upstream request failed:', err)
    return NextResponse.json({ error: 'Advisor unavailable.' }, { status: 502 })
  }

  if (!upstream.ok) {
    const detail = await upstream.text()
    console.error('AI advisor upstream error:', upstream.status, detail)
    return NextResponse.json({ error: 'Advisor unavailable.' }, { status: 502 })
  }

  const data = await upstream.json()
  return NextResponse.json(data)
}
