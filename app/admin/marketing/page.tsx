import { sql } from '@/lib/db'

export const metadata = { title: 'Marketing — Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminMarketingPage() {
  const [metricsRows, monthlyRegRows, statusRows] = await Promise.all([
    sql`
      SELECT
        (SELECT COUNT(*) FROM profiles WHERE role = 'patient')             AS total_patients,
        COUNT(b.id)                                                         AS total_bookings,
        COUNT(b.id) FILTER (WHERE b.status = 'completed')                  AS completed,
        COUNT(b.id) FILTER (WHERE b.status = 'cancelled')                  AS cancelled,
        COALESCE(AVG(b.amount_paid) FILTER (WHERE b.amount_paid IS NOT NULL),0) AS avg_value
      FROM bookings b
    `,
    sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM') AS month,
        COUNT(*)::int                  AS count
      FROM profiles
      WHERE role = 'patient'
        AND created_at > NOW() - INTERVAL '6 months'
      GROUP BY month
      ORDER BY month ASC
    `,
    sql`
      SELECT status, COUNT(*)::int AS count
      FROM bookings
      GROUP BY status
      ORDER BY count DESC
    `,
  ])

  const m = metricsRows[0] as { total_patients: string; total_bookings: string; completed: string; cancelled: string; avg_value: string }
  const totalPatients  = Number(m.total_patients)
  const totalBookings  = Number(m.total_bookings)
  const avgValue       = Number(m.avg_value)
  const cancelled      = Number(m.cancelled)
  const completed      = Number(m.completed)
  const conversionRate = totalPatients > 0 ? ((totalBookings / totalPatients) * 100).toFixed(1) : '0'
  const cancellationRate = totalBookings > 0 ? ((cancelled / totalBookings) * 100).toFixed(1) : '0'
  const completionRate   = totalBookings > 0 ? ((completed / totalBookings) * 100).toFixed(1) : '0'

  const monthly = monthlyRegRows as { month: string; count: number }[]
  const maxMonthly = Math.max(...monthly.map(r => r.count), 1)

  const statuses = statusRows as { status: string; count: number }[]
  const statusColors: Record<string, string> = { confirmed: '#17A589', completed: '#3AABDB', pending: '#f59e0b', cancelled: '#ef4444' }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Marketing</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Platform growth and conversion metrics</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total Patients',     value: String(totalPatients), sub: 'Registered accounts',    accent: '#8b5cf6' },
          { label: 'Total Bookings',     value: String(totalBookings), sub: 'All time',               accent: '#3AABDB' },
          { label: 'Conversion Rate',    value: `${conversionRate}%`,  sub: 'Patients who booked',    accent: '#17A589' },
          { label: 'Avg Booking Value',  value: `£${Math.round(avgValue).toLocaleString('en-GB')}`, sub: 'Per booking', accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Monthly registrations bar chart */}
      {monthly.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>New Patient Registrations (last 6 months)</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 100 }}>
            {monthly.map(r => {
              const pct = (r.count / maxMonthly) * 100
              return (
                <div key={r.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>{r.count}</div>
                  <div style={{ width: '100%', background: '#8b5cf6', borderRadius: '4px 4px 0 0', height: `${pct}%`, minHeight: 4 }} />
                  <div style={{ fontSize: 10, color: '#aaa' }}>
                    {new Date(r.month + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Status breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Booking status breakdown</div>
          {statuses.map(s => {
            const pct = totalBookings > 0 ? (s.count / totalBookings) * 100 : 0
            return (
              <div key={s.status} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: '#555', textTransform: 'capitalize' }}>{s.status}</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{s.count} ({pct.toFixed(0)}%)</span>
                </div>
                <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3 }}>
                  <div style={{ height: '100%', background: statusColors[s.status] ?? '#aaa', borderRadius: 3, width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Key metrics</div>
          {[
            { label: 'Cancellation rate',  value: `${cancellationRate}%`,  note: 'Bookings that ended cancelled' },
            { label: 'Completion rate',    value: `${completionRate}%`,    note: 'Fully completed scan appointments' },
            { label: 'Conversion rate',    value: `${conversionRate}%`,    note: 'Registered patients who booked' },
          ].map(metric => (
            <div key={metric.label} style={{ marginBottom: 22 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--primary)' }}>{metric.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333', marginTop: 2 }}>{metric.label}</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{metric.note}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
