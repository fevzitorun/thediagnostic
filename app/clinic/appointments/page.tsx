import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Appointments — Clinic Portal' }
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{ status?: string; search?: string; date?: string }>
}

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending',   label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending:   { bg: '#fef9c3', color: '#854d0e' },
  confirmed: { bg: '#dcfce7', color: '#166534' },
  completed: { bg: '#e0f2fe', color: '#0369a1' },
  cancelled: { bg: '#fef2f2', color: '#991b1b' },
}

export default async function ClinicAppointmentsPage({ searchParams }: PageProps) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  // Get user's TR clinic
  const clinicRows = await sql`
    SELECT tc.id FROM clinic_admins ca JOIN tr_clinics tc ON tc.id = ca.clinic_id
    WHERE ca.user_id = ${user.id} LIMIT 1
  `
  if (!clinicRows[0]) redirect('/clinic/dashboard')
  const clinicId = (clinicRows[0]  as unknown as { id: string }).id

  const params = await searchParams
  const statusFilter = params.status ?? ''
  const search = params.search ?? ''
  const dateFilter = params.date ?? ''
  const searchWild = `%${search}%`

  const rows = await sql`
    SELECT id, booking_ref, patient_name, patient_email, patient_phone,
           package_name, body_part, appointment_date, appointment_time,
           status, amount_paid, created_at
    FROM bookings
    WHERE tr_clinic_id = ${clinicId}
      ${statusFilter ? sql`AND status = ${statusFilter}` : sql``}
      ${dateFilter ? sql`AND appointment_date = ${dateFilter}` : sql``}
      ${search ? sql`AND (patient_name ILIKE ${searchWild} OR booking_ref ILIKE ${searchWild})` : sql``}
    ORDER BY
      CASE WHEN appointment_date IS NULL THEN 1 ELSE 0 END,
      appointment_date ASC,
      created_at DESC
  `

  const bookings = rows  as unknown as {
    id: string; booking_ref: string; patient_name: string | null;
    patient_email: string | null; patient_phone: string | null;
    package_name: string | null; body_part: string | null;
    appointment_date: string | null; appointment_time: string | null;
    status: string; amount_paid: number | null; created_at: string;
  }[]

  const todayStr = new Date().toISOString().split('T')[0]
  const showGrouped = !statusFilter && !search && !dateFilter

  const todayB    = bookings.filter(b => b.appointment_date === todayStr)
  const upcomingB = bookings.filter(b => b.appointment_date && b.appointment_date > todayStr)
  const pastB     = bookings.filter(b => !b.appointment_date || b.appointment_date < todayStr)

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Appointments</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{bookings.length} bookings{statusFilter ? ` · ${statusFilter}` : ''}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 18px', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {STATUS_OPTIONS.map(opt => (
          <Link key={opt.value} href={`/clinic/appointments${opt.value ? `?status=${opt.value}` : ''}`}
            style={{ padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 600, textDecoration: 'none', background: statusFilter === opt.value ? 'var(--primary)' : '#f4f4f4', color: statusFilter === opt.value ? '#fff' : '#555' }}>
            {opt.label}
          </Link>
        ))}
        <form method="get" action="/clinic/appointments" style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input type="date" name="date" defaultValue={dateFilter}
            style={{ padding: '7px 10px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
          <input name="search" defaultValue={search} placeholder="Patient or ref…"
            style={{ padding: '7px 13px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, outline: 'none', width: 180, fontFamily: 'inherit' }} />
          <button type="submit" style={{ padding: '7px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Filter</button>
        </form>
      </div>

      {bookings.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>No appointments found</div>
      ) : showGrouped ? (
        <>
          {todayB.length > 0    && <ApptSection title="Today"    bookings={todayB}    highlight />}
          {upcomingB.length > 0 && <ApptSection title="Upcoming" bookings={upcomingB} />}
          {pastB.length > 0     && <ApptSection title="Past"     bookings={pastB}     muted />}
        </>
      ) : (
        <ApptSection title={`Results (${bookings.length})`} bookings={bookings} />
      )}
    </>
  )
}

function ApptSection({ title, bookings, highlight, muted }: {
  title: string
  bookings: { id: string; booking_ref: string; patient_name: string | null; patient_email: string | null; patient_phone: string | null; package_name: string | null; body_part: string | null; appointment_date: string | null; appointment_time: string | null; status: string; amount_paid: number | null }[]
  highlight?: boolean
  muted?: boolean
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: highlight ? 'var(--primary)' : '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        {highlight && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#17A589', display: 'inline-block' }} />}
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bookings.map(b => {
          const s = { pending: STATUS_STYLE.pending, confirmed: STATUS_STYLE.confirmed, completed: STATUS_STYLE.completed, cancelled: STATUS_STYLE.cancelled }[b.status] ?? STATUS_STYLE.pending
          return (
            <div key={b.id} style={{ background: '#fff', border: `1px solid ${highlight ? '#d1fae5' : 'var(--line)'}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 18, opacity: muted ? 0.75 : 1 }}>
              {/* Date block */}
              <div style={{ flexShrink: 0, width: 52, textAlign: 'center', borderRight: '1px solid #f0f0f0', paddingRight: 18 }}>
                {b.appointment_date ? (
                  <>
                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)', lineHeight: 1 }}>
                      {new Date(b.appointment_date + 'T12:00:00').getDate()}
                    </div>
                    <div style={{ fontSize: 10, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      {new Date(b.appointment_date + 'T12:00:00').toLocaleDateString('en-GB', { month: 'short' })}
                    </div>
                    {b.appointment_time && <div style={{ fontSize: 11, color: '#666', marginTop: 4, fontWeight: 500 }}>{b.appointment_time}</div>}
                  </>
                ) : (
                  <div style={{ fontSize: 11, color: '#bbb' }}>TBC</div>
                )}
              </div>
              {/* Patient */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)', marginBottom: 2 }}>{b.patient_name ?? '—'}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.package_name ?? 'Scan'}{b.body_part ? ` · ${b.body_part}` : ''}</div>
                <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{b.patient_email}{b.patient_phone ? ` · ${b.patient_phone}` : ''}</div>
              </div>
              {/* Amount */}
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>{b.amount_paid ? `£${Number(b.amount_paid).toLocaleString()}` : '—'}</div>
                <div style={{ fontSize: 10, color: '#bbb', marginTop: 2, fontFamily: 'monospace' }}>{b.booking_ref}</div>
              </div>
              {/* Status */}
              <div style={{ flexShrink: 0 }}>
                <span style={{ padding: '4px 10px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>
                  {b.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
