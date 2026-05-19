// @ts-nocheck
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string; description: string }> = {
  pending:            { bg: '#fef9c3', color: '#854d0e', label: 'Pending review',    description: 'Our clinical team is reviewing your safety information.' },
  confirmed:          { bg: '#dcfce7', color: '#166534', label: 'Confirmed',          description: 'Your appointment is confirmed. See you there!' },
  completed:          { bg: '#e0f2fe', color: '#0369a1', label: 'Completed',          description: 'Your scan is complete. Check your portal for your report.' },
  cancelled:          { bg: '#fef2f2', color: '#991b1b', label: 'Cancelled',          description: 'This booking has been cancelled.' },
  callback_requested: { bg: '#f3e8ff', color: '#6b21a8', label: 'Callback requested', description: 'Our team will call you within 1 working hour (Mon–Fri, 9–5).' },
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .eq('patient_id', user.id)
    .single()

  if (!booking) notFound()

  const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending
  const canCancel = booking.status === 'pending' || booking.status === 'confirmed'
  const isCompleted = booking.status === 'completed'

  return (
    <>
      {/* Back link */}
      <div style={{ marginBottom: 28 }}>
        <Link
          href="/patient/dashboard"
          style={{ fontSize: 13, color: '#888', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to dashboard
        </Link>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#0F4C81', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
            Booking details
          </p>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#111', letterSpacing: -0.5 }}>
            {booking.package_name ?? 'Scan'}{booking.body_part ? ` — ${booking.body_part}` : ''}
          </h1>
        </div>
        <div style={{
          padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
          letterSpacing: 0.5, textTransform: 'uppercase',
          background: status.bg, color: status.color,
        }}>
          {status.label}
        </div>
      </div>

      {/* Status info banner */}
      <div style={{ background: status.bg, border: `1px solid ${status.color}22`, borderRadius: 12, padding: '14px 18px', marginBottom: 28, fontSize: 13, color: status.color, lineHeight: 1.6 }}>
        {status.description}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

        {/* Main details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Appointment info */}
          <Card title="Appointment">
            <Row label="Centre" value={booking.clinic_name ?? '—'} />
            <Row label="Date" value={booking.appointment_date ?? '—'} />
            <Row label="Time" value={booking.appointment_time ?? 'To be confirmed'} />
            <Row label="Scan" value={[booking.package_name, booking.body_part, booking.side].filter(Boolean).join(' — ')} />
            {booking.scan_reason && <Row label="Reason" value={booking.scan_reason} last />}
          </Card>

          {/* Patient info */}
          <Card title="Patient details">
            <Row label="Name" value={booking.patient_name ?? '—'} />
            <Row label="Date of birth" value={booking.patient_dob ?? '—'} />
            <Row label="Email" value={booking.patient_email ?? '—'} />
            <Row label="Phone" value={booking.patient_phone ?? '—'} last />
          </Card>

          {/* Payment */}
          <Card title="Payment">
            <Row label="Amount paid" value={booking.amount_paid ? `£${booking.amount_paid}` : '—'} />
            <Row label="Consultation" value={booking.add_consultation ? 'Included' : 'Not added'} />
            <Row label="Booking ref" value={booking.booking_ref ?? '—'} mono />
            {booking.stripe_payment_intent && (
              <Row label="Payment ref" value={booking.stripe_payment_intent.slice(0, 20) + '…'} last mono />
            )}
          </Card>

          {/* Report — only when completed */}
          {isCompleted && (
            <Card title="Your report">
              {booking.report_url ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>Radiology report</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>PDF · Available now</div>
                  </div>
                  <a
                    href={booking.report_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '8px 18px', background: '#082A4A', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                  >
                    Download PDF
                  </a>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: '#888', padding: '12px 0' }}>
                  Your report is being prepared. It will appear here within 24 hours of your scan.
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Actions */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '20px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Actions</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link
                href="/search"
                style={{ display: 'block', padding: '11px 16px', background: '#082A4A', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}
              >
                Book another scan
              </Link>

              {booking.clinic_name && (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(booking.clinic_name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', padding: '11px 16px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 13, fontWeight: 500, color: '#444', textDecoration: 'none', textAlign: 'center' }}
                >
                  Get directions →
                </a>
              )}

              {canCancel && (
                <CancelButton bookingId={booking.id} bookingRef={booking.booking_ref} />
              )}
            </div>
          </div>

          {/* Need help */}
          <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 6 }}>Need help?</div>
            <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 12 }}>
              Our team is available Mon–Fri, 9am–5pm.
            </p>
            <a href="tel:08001234567" style={{ fontSize: 13, fontWeight: 600, color: '#0F4C81', textDecoration: 'none' }}>
              📞 0800 123 4567
            </a>
            <br />
            <a href="mailto:help@scanbook.co.uk" style={{ fontSize: 12, color: '#888', textDecoration: 'none', marginTop: 6, display: 'inline-block' }}>
              help@scanbook.co.uk
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
        {title}
      </div>
      {children}
    </div>
  )
}

function Row({ label, value, last, mono }: { label: string; value: string; last?: boolean; mono?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 16, padding: '8px 0', borderBottom: last ? 'none' : '1px solid #f5f5f5', fontSize: 13 }}>
      <span style={{ color: '#888', width: 120, flexShrink: 0 }}>{label}</span>
      <span style={{ color: '#111', fontWeight: 500, fontFamily: mono ? 'monospace' : 'inherit', wordBreak: 'break-all' }}>{value || '—'}</span>
    </div>
  )
}

function CancelButton({ bookingId, bookingRef }: { bookingId: string; bookingRef: string }) {
  return (
    <form
      action={async () => {
        'use server'
        const { createClient } = await import('@/lib/supabase/server')
        const supabase = await createClient()
        await supabase.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId)
      }}
    >
      <button
        type="submit"
        style={{
          width: '100%', padding: '11px 16px',
          border: '1.5px solid #fca5a5', borderRadius: 9,
          background: '#fff', color: '#dc2626',
          fontSize: 13, fontWeight: 500, cursor: 'pointer',
          fontFamily: 'inherit', transition: 'all .15s',
        }}
        onClick={e => {
          if (!confirm(`Cancel booking ${bookingRef}? This cannot be undone.`)) e.preventDefault()
        }}
      >
        Cancel booking
      </button>
    </form>
  )
}
