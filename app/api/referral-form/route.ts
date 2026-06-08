// GET /api/referral-form?bookingId=xxx

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { generateReferralFormHtml } from '@/lib/referral-form';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get('bookingId');
  if (!bookingId) {
    return NextResponse.json({ error: 'bookingId required' }, { status: 400 });
  }

  const rows = await sql`
    SELECT b.*, p.first_name, p.last_name, p.date_of_birth, p.email, p.phone,
           p.nationality, p.address_line1, p.postcode,
           c.name AS clinic_name, c.address AS clinic_address
    FROM bookings b
    LEFT JOIN profiles p ON p.id = b.patient_id
    LEFT JOIN clinics c ON c.id = b.clinic_id
    WHERE b.id = ${bookingId}
    LIMIT 1
  `;

  if (!rows.length) {
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  }

  const b = rows[0] as Record<string, unknown>;

  const html = generateReferralFormHtml({
    patientFullName: `${b.first_name} ${b.last_name}`,
    patientDob: String(b.date_of_birth || ''),
    patientSex: String(b.sex || ''),
    patientAddress: String(b.address_line1 || ''),
    patientPostcode: String(b.postcode || ''),
    patientEmail: String(b.email || ''),
    patientPhone: String(b.phone || ''),
    patientNationality: String(b.nationality || ''),
    scanType: String(b.scan_type || ''),
    bodyParts: String(b.body_parts || ''),
    clinicalSymptoms: String(b.medical_notes || ''),
    clinicalQuery: String(b.reason || ''),
    metalImplants: Boolean(b.has_metal_implants),
    claustrophobia: Boolean(b.is_claustrophobic),
    pregnant: Boolean(b.is_pregnant),
    allergies: Boolean(b.has_allergies),
    bookingRef: String(b.id || '').slice(0, 8).toUpperCase(),
    clinicName: String(b.clinic_name || ''),
    clinicAddress: String(b.clinic_address || ''),
    appointmentDate: String(b.appointment_date || ''),
    completedAt: new Date().toLocaleString('en-GB'),
  });

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="referral-${bookingId.slice(0, 8)}.html"`,
    },
  });
}
