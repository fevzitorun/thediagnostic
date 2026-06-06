import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@/lib/db'
import { sendBookingConfirmation } from '@/lib/email/booking-confirmation'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const {
    clinicSlug, clinicName, packageName, bodyPart, side,
    date, time, amount, addConsultation, consultationPrice,
    patientName, patientEmail, patientPhone, patientDob, scanReason,
  } = body

  const bookingRef = `SB-${Date.now().toString(36).toUpperCase()}`
  const totalAmount = Number(amount) + (addConsultation ? Number(consultationPrice) : 0)

  try {
    await sql`
      INSERT INTO bookings (
        booking_ref, status, platform, clinic_slug, clinic_name,
        package_name, body_part, side, appointment_date, appointment_time,
        patient_name, patient_email, patient_phone, patient_dob,
        scan_reason, add_consultation, amount_paid, currency
      ) VALUES (
        ${bookingRef}, 'callback_requested', 'scanbook', ${clinicSlug ?? null}, ${clinicName ?? null},
        ${packageName ?? null}, ${bodyPart ?? null}, ${side ?? null}, ${date ?? null}, ${time ?? null},
        ${patientName ?? null}, ${patientEmail ?? null}, ${patientPhone ?? null}, ${patientDob ?? null},
        ${scanReason ?? null}, ${!!addConsultation}, ${totalAmount}, 'gbp'
      )
    `
  } catch (err) {
    console.error('[Draft] DB insert failed:', err)
  }

  if (patientEmail && patientName) {
    await sendBookingConfirmation({
      patientName, patientEmail, bookingRef,
      clinicName: clinicName ?? '',
      scanName: packageName ?? '',
      appointmentDate: date,
      appointmentTime: time || undefined,
      amountPaid: totalAmount,
      isCallback: true,
    }).catch(err => console.error('[Resend] callback email failed:', err))
  }

  return NextResponse.json({ bookingRef })
}
