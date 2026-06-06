import Stripe from 'stripe'
import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@/lib/db'
import { sendBookingConfirmation } from '@/lib/email/booking-confirmation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) return NextResponse.json({ error: 'Missing signature' }, { status: 400 })

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const m = session.metadata ?? {}

    const bookingRef = `SB-${Date.now().toString(36).toUpperCase()}`

    await sql`
      INSERT INTO bookings (
        booking_ref, status, platform,
        clinic_slug, clinic_name, package_name, body_part, side,
        appointment_date, appointment_time,
        patient_name, patient_email, patient_phone, patient_dob,
        scan_reason, add_consultation, amount_paid, currency,
        stripe_session_id, stripe_payment_intent
      ) VALUES (
        ${bookingRef}, 'confirmed', 'scanbook',
        ${m.clinic_slug ?? null}, ${m.clinic_name ?? null}, ${m.package_name ?? null},
        ${m.body_part ?? null}, ${m.side ?? null},
        ${m.date ?? null}, ${m.time ?? null},
        ${m.patient_name ?? null}, ${m.patient_email ?? null},
        ${m.patient_phone ?? null}, ${m.patient_dob ?? null},
        ${m.scan_reason ?? null}, ${m.add_consultation === '1'},
        ${Number(m.amount_gbp ?? 0)}, 'gbp',
        ${session.id}, ${session.payment_intent as string ?? null}
      )
    `

    if (m.patient_email && m.patient_name) {
      await sendBookingConfirmation({
        patientName: m.patient_name,
        patientEmail: m.patient_email,
        bookingRef,
        clinicName: m.clinic_name ?? '',
        scanName: m.package_name ?? '',
        appointmentDate: m.date,
        appointmentTime: m.time || undefined,
        amountPaid: Number(m.amount_gbp ?? 0),
        isCallback: false,
      })
    }
  }

  return NextResponse.json({ received: true })
}
