// POST /api/admin/clinics
// Admin: create a new clinic.

import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export async function POST(req: Request) {
  const session = await auth()
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const {
    name, address, city, postcode, phone, email, website,
    description, commission_rate, capabilities, status,
  } = body as Record<string, unknown>

  if (!name || !city || !postcode) {
    return NextResponse.json({ error: 'Name, city and postcode are required' }, { status: 400 })
  }

  const slug = (name as string).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const rows = await sql`
    INSERT INTO clinics
      (name, slug, address, city, postcode, phone, email, website,
       description, commission_rate, capabilities, status)
    VALUES
      (${name}, ${slug}, ${address ?? null}, ${city}, ${postcode},
       ${phone ?? null}, ${email ?? null}, ${website ?? null},
       ${description ?? null}, ${commission_rate ?? 0.12},
       ${JSON.stringify(capabilities ?? [])}, ${status ?? 'pending'})
    RETURNING id
  `

  return NextResponse.json({ id: rows[0]?.id })
}
