import Link from 'next/link'
import Stripe from 'stripe'
import Navbar from '@/components/Navbar'

interface PageProps {
  searchParams: Promise<{ session_id?: string; callback?: string; ref?: string; clinic?: string }>
}

export default async function BookingSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams
  const isCallback = !!params.callback

  let clinicName = ''
  let scanName = ''
  let appointmentDate = ''
  let patientEmail = ''
  let bookingRef = params.ref ?? ''
  let amountPaid = 0

  if (params.session_id && !isCallback) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
      const session = await stripe.checkout.sessions.retrieve(params.session_id)
      const m = session.metadata ?? {}
      clinicName = m.clinic_name ?? ''
      scanName = m.package_name ? `${m.package_name}${m.body_part ? ` — ${m.body_part}` : ''}` : ''
      appointmentDate = m.date ?? ''
      patientEmail = m.patient_email ?? session.customer_email ?? ''
      amountPaid = Number(m.amount_gbp) || (session.amount_total ? session.amount_total / 100 : 0)
      bookingRef = `SB-${session.id.slice(-8).toUpperCase()}`
    } catch {
      // Session fetch failed — show generic success
    }
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-dm-sans, 'DM Sans', system-ui, sans-serif); background: #f8fafb; -webkit-font-smoothing: antialiased; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: 560, margin: '64px auto', padding: '0 24px' }}>
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 20, padding: '48px 44px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* Icon */}
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#E8F0F8', display: 'grid', placeItems: 'center', margin: '0 auto 24px', fontSize: 36 }}>
            {isCallback ? '📞' : '✅'}
          </div>

          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 30, color: '#111', letterSpacing: -0.5, marginBottom: 10 }}>
            {isCallback ? 'Callback requested!' : 'Booking confirmed!'}
          </h1>

          <p style={{ fontSize: 15, color: '#666', lineHeight: 1.7, marginBottom: 32 }}>
            {isCallback
              ? 'Our team will call you within 1 working hour (Mon–Fri, 9am–5pm) to finalise your appointment.'
              : 'Your payment was successful. We\'re reviewing your safety information and will confirm your appointment shortly.'}
          </p>

          {/* Details */}
          {(clinicName || bookingRef || isCallback) && (
            <div style={{ background: '#f8fafb', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px', marginBottom: 28, textAlign: 'left' }}>
              {bookingRef && (
                <Row label="Booking ref" value={bookingRef} mono />
              )}
              {scanName && <Row label="Scan" value={scanName} />}
              {clinicName && <Row label="Centre" value={clinicName} />}
              {appointmentDate && <Row label="Requested date" value={appointmentDate} />}
              {patientEmail && <Row label="Confirmation to" value={patientEmail} />}
              {amountPaid > 0 && <Row label="Amount paid" value={`£${amountPaid}`} last />}
            </div>
          )}

          {/* What happens next */}
          <div style={{ textAlign: 'left', marginBottom: 32 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>What happens next</div>
            {(isCallback ? [
              { n: 1, t: 'We call you', b: 'A member of our team calls to confirm your details and preferred times.' },
              { n: 2, t: 'Centre confirms', b: 'The imaging centre reviews your safety information and confirms your slot.' },
              { n: 3, t: 'Your scan', b: 'Attend your appointment. Bring photo ID and any previous imaging.' },
            ] : [
              { n: 1, t: 'Safety review', b: 'Our clinical team reviews your MRI safety questionnaire (1 working day).' },
              { n: 2, t: 'Centre confirmation', b: 'The imaging centre calls you to confirm your exact appointment time.' },
              { n: 3, t: 'Your scan', b: 'Attend your appointment. Bring photo ID and your booking confirmation.' },
              { n: 4, t: 'Your report', b: 'Radiologist report delivered to your patient portal.' },
            ]).map((s, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < arr.length - 1 ? 12 : 0, marginBottom: i < arr.length - 1 ? 12 : 0, borderBottom: i < arr.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#E8F0F8', border: '1px solid #E5E1D8', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 700, color: '#0F4C81', flexShrink: 0, marginTop: 1 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 2 }}>{s.t}</div>
                  <div style={{ fontSize: 12, color: '#888', lineHeight: 1.55 }}>{s.b}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/patient/dashboard"
              style={{ flex: 1, padding: '13px', background: '#082A4A', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none', textAlign: 'center', transition: 'opacity .15s' }}
            >
              Go to my dashboard
            </Link>
            <Link
              href="/search"
              style={{ flex: 1, padding: '13px', border: '1.5px solid #e8e8e8', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#444', textDecoration: 'none', textAlign: 'center' }}
            >
              Book another scan
            </Link>
          </div>

        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#bbb', marginTop: 20, lineHeight: 1.6 }}>
          Questions? Call us on{' '}
          <a href="tel:08001234567" style={{ color: '#888' }}>0800 123 4567</a>
          {' '}or email{' '}
          <a href="mailto:help@scanbook.co.uk" style={{ color: '#888' }}>help@scanbook.co.uk</a>
        </p>
      </div>
    </>
  )
}

function Row({ label, value, last, mono }: { label: string; value: string; last?: boolean; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '8px 0', borderBottom: last ? 'none' : '1px solid #f0f0f0', gap: 16 }}>
      <span style={{ fontSize: 12, color: '#888', flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#111', textAlign: 'right', fontFamily: mono ? 'monospace' : 'inherit' }}>{value}</span>
    </div>
  )
}
