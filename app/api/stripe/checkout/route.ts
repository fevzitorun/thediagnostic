import Stripe from 'stripe'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await request.json()
  const {
    clinicSlug, clinicName, clinicCity,
    packageName, bodyPart, side,
    date, time, reportHours,
    amount, addConsultation, consultationPrice,
    patientName, patientEmail, patientPhone, patientDob,
    scanReason,
  } = body

  const totalAmount = Number(amount) + (addConsultation ? Number(consultationPrice) : 0)
  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const lineItems = [
    {
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `${packageName}${bodyPart ? ` — ${bodyPart}` : ''}`,
          description: `${clinicName}, ${clinicCity} · ${date}${time ? ` at ${time}` : ''} · Report within ${reportHours}h`,
        },
        unit_amount: Math.round(Number(amount) * 100),
      },
      quantity: 1,
    },
  ]

  if (addConsultation) {
    lineItems.push({
      price_data: {
        currency: 'gbp',
        product_data: { name: 'Post-scan consultation', description: 'Speak to a clinician about your results' },
        unit_amount: Math.round(Number(consultationPrice) * 100),
      },
      quantity: 1,
    })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,
    customer_email: patientEmail,
    metadata: {
      clinic_slug: clinicSlug,
      clinic_name: clinicName,
      package_name: packageName,
      body_part: bodyPart ?? '',
      side: side ?? '',
      date,
      time: time ?? '',
      patient_name: patientName,
      patient_email: patientEmail,
      patient_phone: patientPhone ?? '',
      patient_dob: patientDob ?? '',
      scan_reason: (scanReason ?? '').slice(0, 500),
      add_consultation: addConsultation ? '1' : '0',
      amount_gbp: String(totalAmount),
    },
    success_url: `${origin}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/book?clinic=${clinicSlug}`,
    payment_intent_data: {
      description: `ScanBook — ${packageName} at ${clinicName}`,
    },
  })

  return NextResponse.json({ url: session.url })
}
