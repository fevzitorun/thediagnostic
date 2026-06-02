// @ts-nocheck
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Marketing — Admin' }

export default async function AdminMarketingPage() {
  const supabase = await createClient()

  const [bookingsRes, regRes] = await Promise.all([
    supabase.from('bookings').select('created_at, status, amount_paid').order('created_at', { ascending: false }),
    supabase.from('profiles').select('created_at, role').eq('role', 'patient').order('created_at', { ascending: false }),
  ])

  const bookings = bookingsRes.data ?? []
  const patients = regRes.data ?? []

  // Conversion rate
  const totalBookings = bookings.length
  const totalPatients = patients.length
  const conversionRate = totalPatients > 0 ? ((totalBookings / totalPatients) * 100).toFixed(1) : '0'

  // Cancellation rate
  const cancelled = bookings.filter(b => b.status === 'cancelled').length
  const cancellationRate = totalBookings > 0 ? ((cancelled / totalBookings) * 100).toFixed(1) : '0'

  // Average booking value
  const paidBookings = bookings.filter(b => b.amount_paid)
  const avgValue = paidBookings.length > 0
    ? paidBookings.reduce((s, b) => s + (b.amount_paid ?? 0), 0) / paidBookings.length
    : 0

  // Monthly registrations (last 6 months)
  const monthlyReg: Record<string, number> = {}
  for (const p of patients) {
    const month = p.created_at?.substring(0, 7) ?? ''
    if (month) monthlyReg[month] = (monthlyReg[month] ?? 0) + 1
  }
  const regMonths = Object.keys(monthlyReg).sort().slice(-6)

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Marketing</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Platform growth and conversion metrics</p>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total patients',    value: String(totalPatients),       sub: 'Registered accounts', accent: '#8b5cf6' },
          { label: 'Total bookings',    value: String(totalBookings),       sub: 'All time', accent: '#3b82f6' },
          { label: 'Conversion rate',   value: `${conversionRate}%`,        sub: 'Patients who booked', accent: '#00C9A7' },
          { label: 'Avg booking value', value: `£${avgValue.toFixed(0)}`,   sub: 'Per confirmed booking', accent: '#f59e0b' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Registrations chart */}
      {regMonths.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 20 }}>New patient registrations</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 100 }}>
            {(() => {
              const maxVal = Math.max(...regMonths.map(m => monthlyReg[m] ?? 0), 1)
              return regMonths.map(month => {
                const val = monthlyReg[month] ?? 0
                const pct = (val / maxVal) * 100
                return (
                  <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>{val}</div>
                    <div style={{ width: '100%', background: '#8b5cf6', borderRadius: '4px 4px 0 0', height: `${pct}%`, minHeight: 4 }} />
                    <div style={{ fontSize: 10, color: '#aaa' }}>
                      {new Date(month + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })}
                    </div>
                  </div>
                )
              })
            })()}
          </div>
        </div>
      )}

      {/* Status breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Booking status breakdown</div>
          {['confirmed', 'completed', 'pending', 'cancelled', 'callback_requested'].map(s => {
            const count = bookings.filter(b => b.status === s).length
            const pct = totalBookings > 0 ? (count / totalBookings) * 100 : 0
            const colors: Record<string, string> = { confirmed: '#00C9A7', completed: '#3b82f6', pending: '#f59e0b', cancelled: '#ef4444', callback_requested: '#8b5cf6' }
            return (
              <div key={s} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                  <span style={{ color: '#555', textTransform: 'capitalize' }}>{s.replace('_', ' ')}</span>
                  <span style={{ fontWeight: 600, color: '#111' }}>{count} ({pct.toFixed(0)}%)</span>
                </div>
                <div style={{ height: 6, background: '#f3f4f6', borderRadius: 3 }}>
                  <div style={{ height: '100%', background: colors[s] ?? '#aaa', borderRadius: 3, width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Key metrics</div>
          {[
            { label: 'Cancellation rate', value: `${cancellationRate}%`, note: 'Bookings that ended cancelled' },
            { label: 'Callback rate', value: `${totalBookings > 0 ? ((bookings.filter(b => b.status === 'callback_requested').length / totalBookings) * 100).toFixed(1) : 0}%`, note: 'Chose callback over online payment' },
            { label: 'Completion rate', value: `${totalBookings > 0 ? ((bookings.filter(b => b.status === 'completed').length / totalBookings) * 100).toFixed(1) : 0}%`, note: 'Fully completed appointments' },
          ].map(m => (
            <div key={m.label} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>{m.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#333', marginTop: 2 }}>{m.label}</div>
              <div style={{ fontSize: 12, color: '#aaa' }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
