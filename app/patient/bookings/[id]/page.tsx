import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'
import { formatBookingRef } from '@/lib/format'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_CONFIG: Record<string, { bg: string; color: string; label: string; description: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e', label: 'Pending review',  description: 'Our clinical team is reviewing your scan details.' },
  confirmed: { bg: '#dcfce7', color: '#166534', label: 'Confirmed',        description: 'Your appointment is confirmed — see you in Istanbul!' },
  completed: { bg: '#dbeafe', color: '#1e40af', label: 'Completed',        description: 'Your scan is complete. Download your report below.' },
  cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled',        description: 'This booking has been cancelled.' },
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const rows = await sql`
    SELECT id, booking_ref, status, clinic_name, package_name, body_part, appointment_date, appointment_time,
           patient_name, patient_dob, patient_email, patient_phone, amount_paid, report_url,
           scan_reason, add_consultation, stripe_payment_intent, created_at
    FROM bookings
    WHERE id = ${id} AND patient_id = ${user.id}
    LIMIT 1
  `
  if (!rows[0]) notFound()

  const b = rows[0] as {
    id: string; booking_ref: string; status: string; clinic_name: string | null;
    package_name: string | null; body_part: string | null; appointment_date: string | null;
    appointment_time: string | null; patient_name: string | null; patient_dob: string | null;
    patient_email: string | null; patient_phone: string | null; amount_paid: number | null;
    report_url: string | null; scan_reason: string | null; add_consultation: boolean | null;
    stripe_payment_intent: string | null; created_at: string;
  }

  const status = STATUS_CONFIG[b.status] ?? STATUS_CONFIG.pending
  const ref = b.booking_ref || formatBookingRef(b.id)

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Link href="/patient/bookings" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>← My Bookings</Link>
      </div>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#3AABDB', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Booking detail</p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--primary)', letterSpacing: -0.5 }}>
            {b.package_name ?? 'Scan'}{b.body_part ? ` — ${b.body_part}` : ''}
          </h1>
        </div>
        <span style={{ padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: status.bg, color: status.color }}>
          {status.label}
        </span>
      </div>

      {/* Status banner */}
      <div style={{ background: status.bg, border: `1px solid ${status.color}30`, borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 13, color: status.color, lineHeight: 1.6 }}>
        {status.description}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18, alignItems: 'start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Appointment */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Appointment</div>
            {[
              { label: 'Clinic', value: b.clinic_name },
              { label: 'Date', value: b.appointment_date },
              { label: 'Time', value: b.appointment_time ?? 'To be confirmed' },
              { label: 'Scan', value: [b.package_name, b.body_part].filter(Boolean).join(' — ') },
              { label: 'Reason', value: b.scan_reason },
            ].filter(r => r.value).map((r, i, arr) => (
              <div key={r.label} style={{ display: 'flex', gap: 16, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)', width: 110, flexShrink: 0 }}>{r.label}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Patient */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Patient details</div>
            {[
              { label: 'Name', value: b.patient_name },
              { label: 'Date of birth', value: b.patient_dob },
              { label: 'Email', value: b.patient_email },
              { label: 'Phone', value: b.patient_phone },
            ].filter(r => r.value).map((r, i, arr) => (
              <div key={r.label} style={{ display: 'flex', gap: 16, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)', width: 110, flexShrink: 0 }}>{r.label}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Payment */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Payment</div>
            {[
              { label: 'Amount paid', value: b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : 'Pending' },
              { label: 'Consultation', value: b.add_consultation ? 'Included' : 'Not added' },
              { label: 'Booking ref', value: ref },
            ].map((r, i, arr) => (
              <div key={r.label} style={{ display: 'flex', gap: 16, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 13 }}>
                <span style={{ color: 'var(--text-muted)', width: 110, flexShrink: 0 }}>{r.label}</span>
                <span style={{ color: 'var(--primary)', fontWeight: 500, fontFamily: r.label === 'Booking ref' ? 'monospace' : 'inherit' }}>{r.value}</span>
              </div>
            ))}
          </div>

          {/* Report */}
          {b.status === 'completed' && (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Your Report</div>
              {b.report_url ? (
                <a href={b.report_url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', padding: '12px', background: 'var(--primary)', color: '#fff', borderRadius: 10, textAlign: 'center', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>
                  ↓ Download Radiology Report (PDF)
                </a>
              ) : (
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Your report is being prepared and will appear here within 24 hours of your scan.</p>
              )}
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Actions */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link href="/book" style={{ display: 'block', padding: '11px', background: 'var(--primary)', color: '#fff', borderRadius: 9, fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>
                Book another scan
              </Link>
              {b.clinic_name && (
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(b.clinic_name + ' Istanbul Turkey')}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'block', padding: '11px', border: '1.5px solid var(--line)', borderRadius: 9, fontSize: 13, fontWeight: 500, color: 'var(--text)', textDecoration: 'none', textAlign: 'center' }}>
                  Get directions →
                </a>
              )}
            </div>
          </div>

          {/* Help */}
          <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14, padding: '18px' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>Need help?</div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12 }}>Our patient team responds within 2 hours.</p>
            <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', background: '#25D366', color: '#fff', borderRadius: 8, padding: '10px', textAlign: 'center', fontWeight: 600, textDecoration: 'none', fontSize: 13 }}>
              WhatsApp us
            </a>
            <a href="mailto:info@thediagnostic.co.uk"
              style={{ display: 'block', marginTop: 8, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none', textAlign: 'center' }}>
              info@thediagnostic.co.uk
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
