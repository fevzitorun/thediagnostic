// @ts-nocheck
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppointmentActions from './AppointmentActions'

export const metadata = { title: 'Appointments — Clinic' }

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; date?: string }>
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'callback_requested', label: 'Callback' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:            { bg: '#fef9c3', color: '#854d0e' },
  confirmed:          { bg: '#dcfce7', color: '#166534' },
  completed:          { bg: '#e0f2fe', color: '#0369a1' },
  cancelled:          { bg: '#fef2f2', color: '#991b1b' },
  callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
}

export default async function ClinicAppointmentsPage({ searchParams }: PageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id')
    .eq('id', user.id)
    .single()

  const clinicId = profile?.clinic_id
  if (!clinicId) redirect('/clinic/dashboard')

  const params = await searchParams
  const statusFilter = params.status ?? ''
  const search = params.search ?? ''
  const dateFilter = params.date ?? ''

  let query = supabase
    .from('bookings')
    .select('id, booking_ref, patient_name, patient_email, patient_phone, package_name, body_part, appointment_date, appointment_time, status, amount_paid, add_consultation, created_at')
    .eq('clinic_id', clinicId)
    .order('appointment_date', { ascending: true })
    .order('created_at', { ascending: false })

  if (statusFilter) query = query.eq('status', statusFilter)
  if (dateFilter) query = query.eq('appointment_date', dateFilter)
  if (search) query = query.or(`patient_name.ilike.%${search}%,booking_ref.ilike.%${search}%`)

  const { data: bookings } = await query

  // Group by date for calendar-style display
  const todayStr = new Date().toISOString().split('T')[0]
  const todayBookings = bookings?.filter(b => b.appointment_date === todayStr) ?? []
  const upcomingBookings = bookings?.filter(b => b.appointment_date && b.appointment_date > todayStr) ?? []
  const pastBookings = bookings?.filter(b => !b.appointment_date || b.appointment_date < todayStr) ?? []

  const showGrouped = !statusFilter && !search && !dateFilter

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Appointments</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{bookings?.length ?? 0} bookings{statusFilter ? ` · ${statusFilter.replace('_', ' ')}` : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link
            key={opt.value}
            href={`/clinic/appointments${opt.value ? `?status=${opt.value}` : ''}`}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              textDecoration: 'none',
              background: statusFilter === opt.value ? '#082A4A' : '#f4f4f4',
              color: statusFilter === opt.value ? '#fff' : '#555',
            }}
          >
            {opt.label}
          </Link>
        ))}

        <form method="get" action="/clinic/appointments" style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input
            type="date"
            name="date"
            defaultValue={dateFilter}
            style={{ padding: '7px 10px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
          />
          <input
            name="search"
            defaultValue={search}
            placeholder="Search patient or ref…"
            style={{ padding: '7px 13px', border: '1.5px solid #e8e8e8', borderRadius: 8, fontSize: 13, outline: 'none', width: 200, fontFamily: 'inherit' }}
          />
          <button type="submit" style={{ padding: '7px 16px', background: '#082A4A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Filter</button>
        </form>
      </div>

      {!bookings || bookings.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No appointments found
        </div>
      ) : showGrouped ? (
        <>
          {todayBookings.length > 0 && (
            <AppointmentSection title="Today" bookings={todayBookings} statusStyle={STATUS_STYLE} highlight />
          )}
          {upcomingBookings.length > 0 && (
            <AppointmentSection title="Upcoming" bookings={upcomingBookings} statusStyle={STATUS_STYLE} />
          )}
          {pastBookings.length > 0 && (
            <AppointmentSection title="Past" bookings={pastBookings} statusStyle={STATUS_STYLE} muted />
          )}
        </>
      ) : (
        <AppointmentSection title={`Results (${bookings.length})`} bookings={bookings} statusStyle={STATUS_STYLE} />
      )}
    </>
  )
}

function AppointmentSection({
  title, bookings, statusStyle, highlight, muted
}: {
  title: string
  bookings: Array<{
    id: string; booking_ref: string | null; patient_name: string | null
    patient_email: string | null; patient_phone: string | null
    package_name: string | null; body_part: string | null
    appointment_date: string | null; appointment_time: string | null
    status: string; amount_paid: number | null
    add_consultation: boolean | null; created_at: string
  }>
  statusStyle: Record<string, { bg: string; color: string }>
  highlight?: boolean
  muted?: boolean
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: highlight ? '#082A4A' : '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        {highlight && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C9A7', display: 'inline-block' }} />}
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bookings.map(b => {
          const s = statusStyle[b.status] ?? statusStyle.pending
          return (
            <div key={b.id} style={{ background: '#fff', border: `1px solid ${highlight ? '#d1fae5' : '#ebebeb'}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 18, opacity: muted ? 0.75 : 1 }}>
              {/* Date block */}
              <div style={{ flexShrink: 0, width: 52, textAlign: 'center', borderRight: '1px solid #f0f0f0', paddingRight: 18 }}>
                {b.appointment_date ? (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#111', lineHeight: 1 }}>
                      {new Date(b.appointment_date + 'T12:00:00').getDate()}
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {new Date(b.appointment_date + 'T12:00:00').toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    {b.appointment_time && (
                      <div style={{ fontSize: 11, color: '#666', marginTop: 4, fontWeight: 500 }}>{b.appointment_time}</div>
                    )}
                  </>
                ) : (
                  <div style={{ fontSize: 11, color: '#bbb' }}>TBC</div>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#111', marginBottom: 2 }}>{b.patient_name ?? '—'}</div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {b.package_name ?? 'Unknown scan'}{b.body_part ? ` · ${b.body_part}` : ''}
                  {b.add_consultation && <span style={{ marginLeft: 6, fontSize: 10, background: '#f3e8ff', color: '#6b21a8', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>+ Consult</span>}
                </div>
                <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>
                  {b.patient_email}{b.patient_phone ? ` · ${b.patient_phone}` : ''}
                </div>
              </div>

              {/* Amount */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</div>
                <div style={{ fontSize: 10, color: '#bbb', marginTop: 2, fontFamily: 'monospace' }}>{b.booking_ref}</div>
              </div>

              {/* Status + actions */}
              <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <span style={{ padding: '3px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
                  {b.status.replace('_', ' ')}
                </span>
                <AppointmentActions bookingId={b.id} status={b.status} phone={b.patient_phone} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
