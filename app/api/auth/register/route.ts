import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const { firstName, lastName, email, password, phone, marketingConsent } = await req.json()

  if (!email || !password || !firstName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  if (password.length < 8) {
    return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
  }

  // Check duplicate
  const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`
  if (existing.length > 0) {
    return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 12)
  const name = `${firstName} ${lastName}`.trim()

  try {
    const [user] = await sql`
      INSERT INTO users (email, name, password_hash, email_verified)
      VALUES (${email}, ${name}, ${passwordHash}, NOW())
      RETURNING id
    `
    await sql`
      INSERT INTO profiles (id, first_name, last_name, phone, role, marketing_consent)
      VALUES (${user.id}, ${firstName}, ${lastName}, ${phone ?? null}, 'patient', ${marketingConsent ?? false})
    `
    return NextResponse.json({ success: true, userId: user.id })
  } catch (err) {
    console.error('[Register] DB error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}
