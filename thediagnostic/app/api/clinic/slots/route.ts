// GET  /api/clinic/slots?from=YYYY-MM-DD&to=YYYY-MM-DD&scan=pet_ct
// POST /api/clinic/slots   — add one or bulk slots
// PATCH /api/clinic/slots  — update slot status

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { auth } from '@/lib/auth';

async function getClinicId(session: Awaited<ReturnType<typeof auth>>) {
  if (!session?.user) return null;
  const role = (session.user as Record<string, unknown>).role as string | undefined;
  if (role === 'admin' || role === 'super_admin') return null; // admin sees all
  const clinicId = (session.user as Record<string, unknown>).clinicId as string | undefined;
  return clinicId ?? null;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const clinicId = await getClinicId(session);
  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from') ?? new Date().toISOString().split('T')[0];
  const to = searchParams.get('to') ?? new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0];
  const scan = searchParams.get('scan');

  let rows;
  if (clinicId) {
    rows = scan
      ? await sql`SELECT s.*, b.patient_first_name, b.patient_last_name, b.patient_email, b.reference AS booking_ref
                  FROM scan_slots s
                  LEFT JOIN bookings b ON b.id = s.booking_id
                  WHERE s.clinic_id = ${clinicId} AND s.slot_date BETWEEN ${from} AND ${to}
                    AND s.scan_type_code = ${scan}
                  ORDER BY s.slot_date, s.slot_time`
      : await sql`SELECT s.*, b.patient_first_name, b.patient_last_name, b.patient_email, b.reference AS booking_ref
                  FROM scan_slots s
                  LEFT JOIN bookings b ON b.id = s.booking_id
                  WHERE s.clinic_id = ${clinicId} AND s.slot_date BETWEEN ${from} AND ${to}
                  ORDER BY s.slot_date, s.slot_time`;
  } else {
    // admin: return all
    rows = await sql`SELECT s.*, c.name AS clinic_name,
                       b.patient_first_name, b.patient_last_name, b.reference AS booking_ref
                    FROM scan_slots s
                    JOIN clinics c ON c.id = s.clinic_id
                    LEFT JOIN bookings b ON b.id = s.booking_id
                    WHERE s.slot_date BETWEEN ${from} AND ${to}
                    ORDER BY s.slot_date, s.slot_time LIMIT 500`;
  }
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const clinicId = await getClinicId(session);
  if (!clinicId) return NextResponse.json({ error: 'Clinic ID required' }, { status: 400 });

  const body = await req.json() as {
    slots?: Array<{ scan_type_code: string; slot_date: string; slot_time: string; duration_minutes?: number; price_gbp?: number }>;
    // single slot mode
    scan_type_code?: string;
    slot_date?: string;
    slot_time?: string;
    duration_minutes?: number;
    price_gbp?: number;
  };

  const items = body.slots ?? [body];
  if (!items.length) return NextResponse.json({ error: 'No slots provided' }, { status: 400 });

  let inserted = 0;
  for (const slot of items) {
    if (!slot.scan_type_code || !slot.slot_date || !slot.slot_time) continue;
    await sql`
      INSERT INTO scan_slots (clinic_id, scan_type_code, slot_date, slot_time, duration_minutes, price_gbp, status)
      VALUES (${clinicId}, ${slot.scan_type_code}, ${slot.slot_date}, ${slot.slot_time},
              ${slot.duration_minutes ?? 60}, ${slot.price_gbp ?? null}, 'available')
      ON CONFLICT (clinic_id, scan_type_code, slot_date, slot_time) DO NOTHING
    `;
    inserted++;
  }
  return NextResponse.json({ inserted });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const clinicId = await getClinicId(session);
  const { id, status } = await req.json() as { id: string; status: string };

  const allowed = ['available', 'blocked', 'cancelled'];
  if (!allowed.includes(status)) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });

  if (clinicId) {
    await sql`UPDATE scan_slots SET status = ${status}, updated_at = now()
              WHERE id = ${id} AND clinic_id = ${clinicId} AND status NOT IN ('confirmed', 'reserved')`;
  } else {
    await sql`UPDATE scan_slots SET status = ${status}, updated_at = now() WHERE id = ${id}`;
  }
  return NextResponse.json({ ok: true });
}
