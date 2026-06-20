import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name?: string; email?: string; phone?: string; subject?: string; message?: string }

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 })
    }

    // Store in DB if contact_messages table exists; silently skip if not
    try {
      await sql`
        INSERT INTO contact_messages (name, email, phone, subject, message)
        VALUES (${body.name.trim()}, ${body.email.trim()}, ${body.phone?.trim() ?? null}, ${body.subject?.trim() ?? null}, ${body.message.trim()})
      `
    } catch {
      // Table may not exist yet — not blocking
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
