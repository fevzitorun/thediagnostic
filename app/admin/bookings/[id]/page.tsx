import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'
import BookingStatusActions from './BookingStatusActions'

export const metadata = { title: 'Booking Detail — Admin' }
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function AdminBookingDetailPage({ params }: PageProps) {
  const { id } = await params
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const rows = await sql`
    SELECT b.*, u.email AS patient_email_addr
    FROM bookings b
    LEFT JOIN users u ON u.id = b.patient_id
    WHERE b.id = ${id}
    LIMIT 1
  `
  if (!rows[0]) notFound()

  const b = rows[0] as Record<string, unknown> & {
    patient_email_addr: string | null
    has_metal_implants: boolean | null
    is_claustrophobic: boolean | null
    is_pregnant: boolean | null
    contrast_required: boolean | null
    stripe_session_id: string | null
    amount_paid: number | null
    report_url: string | null
    booking_ref: string | null
    status: string
    patient_phone: string | null
    created_at: string | null
  }
  const s = STATUS_STYLE[(b.status as string) ?? 'pending'] ?? STATUS_STYLE.pending

  const field = (label: string, value: unknown) => value ? (
    <div key={label}>
      <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase' as const, letterSpacing: 0.8, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#333' }}>{String(value)}</div>
    </div>
  ) : null

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Link href="/admin/bookings" style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>← Bookings</Link>
        <span style={{ color: '#ddd' }}>/</span>
        <span style={{ fontSize: 13, fontFamily: 'monospace', color: 'var(--text-muted)' }}>{b.booking_ref as string}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 18 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Header card */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{(b.patient_name as string) ?? '—'}</div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{(b.package_name as string) ?? 'Scan'}{b.body_part ? ` · ${b.body_part}` : ''}</div>
            </div>
            <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
              {(b.status as string)?.replace(/_/g, ' ')}
            </span>
          </div>

          {/* Patient */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Patient</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {field('Name', b.patient_name)}
              {field('Date of birth', b.patient_dob)}
              {field('Email', b.patient_email_addr)}
              {field('Phone', b.patient_phone)}
              {field('Nationality', b.patient_nationality)}
            </div>
          </div>

          {/* Appointment */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Appointment</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {field('Clinic', b.clinic_name)}
              {field('Date', b.appointment_date)}
              {field('Time', b.appointment_time)}
              {field('Scan', b.package_name)}
              {field('Body part', b.body_part)}
              {field('Scan type code', b.scan_type_code)}
            </div>
          </div>

          {/* Safety answers */}
          {b.has_metal_implants !== null || b.is_claustrophobic !== null ? (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Clinical Flags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {b.has_metal_implants && <span style={{ padding: '4px 10px', background: '#fef9c3', color: '#854d0e', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>⚠ Metal implants</span>}
                {b.is_claustrophobic && <span style={{ padding: '4px 10px', background: '#fef9c3', color: '#854d0e', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>⚠ Claustrophobic</span>}
                {b.is_pregnant && <span style={{ padding: '4px 10px', background: '#fee2e2', color: '#991b1b', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>⛔ Pregnant</span>}
                {b.contrast_required && <span style={{ padding: '4px 10px', background: '#e0f2fe', color: '#0369a1', borderRadius: 8, fontSize: 12, fontWeight: 600 }}>Contrast required</span>}
              </div>
            </div>
          ) : null}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Payment */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Payment</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>
              {b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}
            </div>
            {b.stripe_session_id && (
              <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#bbb', wordBreak: 'break-all', marginTop: 8 }}>
                {b.stripe_session_id as string}
              </div>
            )}
          </div>

          {/* Admin actions */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Actions</div>
            <BookingStatusActions bookingId={id} currentStatus={b.status as string} phone={b.patient_phone as string | null} />
          </div>

          {/* Report */}
          {b.report_url && (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Report</div>
              <a href={b.report_url as string} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#D1F2EB', color: '#0E6655', borderRadius: 8, padding: '10px', textAlign: 'center', fontWeight: 700, textDecoration: 'none', fontSize: 13 }}>
                ↓ Download PDF
              </a>
            </div>
          )}

          {/* Meta */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Info</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Booking ref', value: b.booking_ref },
                { label: 'Created',     value: b.created_at ? new Date(b.created_at as string).toLocaleString('en-GB') : '—' },
                { label: 'ID',          value: id },
              ].map(row => (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#555', wordBreak: 'break-all' }}>{(row.value as string) ?? '—'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
