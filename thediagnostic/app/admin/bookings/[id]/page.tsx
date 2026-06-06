// @ts-nocheck
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BookingStatusActions from './BookingStatusActions'

export const metadata = { title: 'Booking — Admin' }

interface PageProps {
  params: Promise<{ id: string }>
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dcfce7', color: '#166534' },
  completed:          { bg: '#e0f2fe', color: '#0369a1' },
  cancelled:          { bg: '#fef2f2', color: '#991b1b' },
  callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
}

export default async function AdminBookingDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single()

  if (!booking) notFound()

  const s = STATUS_STYLE[booking.status] ?? STATUS_STYLE.pending

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/admin/bookings" style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>← Bookings</Link>
        <span style={{ color: '#ddd' }}>/</span>
        <span style={{ fontSize: 13, fontFamily: 'monospace', color: '#666' }}>{booking.booking_ref}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 4 }}>{booking.patient_name ?? '—'}</div>
                <div style={{ fontSize: 14, color: '#888' }}>{booking.package_name ?? 'Unknown scan'}{booking.body_part ? ` · ${booking.body_part}` : ''}</div>
              </div>
              <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color }}>
                {booking.status?.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Patient details */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Patient</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Name', value: booking.patient_name },
                { label: 'Date of birth', value: booking.patient_dob },
                { label: 'Email', value: booking.patient_email },
                { label: 'Phone', value: booking.patient_phone },
                { label: 'NHS number', value: booking.nhs_number },
                { label: 'GP', value: booking.gp_name },
              ].map(row => row.value ? (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: '#333' }}>{row.value}</div>
                </div>
              ) : null)}
            </div>
          </div>

          {/* Appointment */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Appointment</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { label: 'Clinic', value: booking.clinic_name },
                { label: 'Date', value: booking.appointment_date },
                { label: 'Time', value: booking.appointment_time },
                { label: 'Scan', value: booking.package_name },
                { label: 'Body part', value: booking.body_part },
                { label: 'Add consultation', value: booking.add_consultation ? 'Yes' : null },
              ].map(row => row.value ? (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: '#333' }}>{row.value}</div>
                </div>
              ) : null)}
            </div>
          </div>

          {/* Safety answers */}
          {booking.safety_answers && (
            <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Safety questionnaire</div>
              <pre style={{ fontSize: 12, color: '#555', background: '#f9fafb', padding: 14, borderRadius: 8, overflow: 'auto', lineHeight: 1.6 }}>
                {JSON.stringify(booking.safety_answers, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Payment */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Payment</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>
              {booking.amount_paid ? `£${booking.amount_paid}` : '—'}
            </div>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
              {booking.stripe_session_id ? 'Paid via Stripe' : booking.status === 'callback_requested' ? 'Callback — payment pending' : 'Not yet paid'}
            </div>
            {booking.stripe_session_id && (
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#bbb', wordBreak: 'break-all' }}>
                {booking.stripe_session_id}
              </div>
            )}
          </div>

          {/* Admin actions */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Actions</div>
            <BookingStatusActions bookingId={booking.id} currentStatus={booking.status} phone={booking.patient_phone} />
          </div>

          {/* Metadata */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Info</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Booking ref', value: booking.booking_ref },
                { label: 'Created', value: booking.created_at ? new Date(booking.created_at).toLocaleString('en-GB') : '—' },
                { label: 'Clinic ID', value: booking.clinic_id },
              ].map(row => (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', color: '#555' }}>{row.value ?? '—'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
