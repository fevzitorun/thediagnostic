// @ts-nocheck
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Finance — Admin' }

export default async function AdminFinancePage() {
  const supabase = await createClient()

  const [allBookings, clinicsRes] = await Promise.all([
    supabase.from('bookings')
      .select('id, amount_paid, status, clinic_name, clinic_id, created_at, commission_rate')
      .in('status', ['confirmed', 'completed'])
      .order('created_at', { ascending: false }),
    supabase.from('clinics')
      .select('id, name, commission_rate, stripe_account_id')
      .eq('status', 'active'),
  ])

  const bookings = allBookings.data ?? []
  const clinics = clinicsRes.data ?? []

  const totalRevenue = bookings.reduce((s, b) => s + (b.amount_paid ?? 0), 0)

  // Per-clinic breakdown
  const clinicMap: Record<string, { name: string; revenue: number; commission: number; bookingCount: number }> = {}
  for (const b of bookings) {
    const cid = b.clinic_id ?? 'unknown'
    if (!clinicMap[cid]) {
      const clinic = clinics.find(c => c.id === cid)
      clinicMap[cid] = { name: b.clinic_name ?? clinic?.name ?? 'Unknown', revenue: 0, commission: 0, bookingCount: 0 }
    }
    const rate = b.commission_rate ?? clinics.find(c => c.id === b.clinic_id)?.commission_rate ?? 0.12
    clinicMap[cid].revenue += b.amount_paid ?? 0
    clinicMap[cid].commission += (b.amount_paid ?? 0) * rate
    clinicMap[cid].bookingCount++
  }

  const platformRevenue = Object.values(clinicMap).reduce((s, c) => s + c.commission, 0)
  const clinicPayouts = totalRevenue - platformRevenue

  // Monthly breakdown (last 6 months)
  const monthly: Record<string, number> = {}
  for (const b of bookings) {
    const month = b.created_at?.substring(0, 7) ?? 'unknown'
    monthly[month] = (monthly[month] ?? 0) + (b.amount_paid ?? 0)
  }
  const sortedMonths = Object.keys(monthly).sort().slice(-6)

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Finance</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Platform revenue and clinic payouts</p>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total GMV',         value: `£${totalRevenue.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'Gross merchandise value', accent: '#00C9A7' },
          { label: 'Platform revenue',  value: `£${platformRevenue.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'Commission earned', accent: '#3b82f6' },
          { label: 'Clinic payouts',    value: `£${clinicPayouts.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, sub: 'Owed to clinics', accent: '#8b5cf6' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Monthly trend */}
      {sortedMonths.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 20 }}>Monthly revenue</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
            {(() => {
              const maxVal = Math.max(...sortedMonths.map(m => monthly[m] ?? 0), 1)
              return sortedMonths.map(month => {
                const val = monthly[month] ?? 0
                const pct = (val / maxVal) * 100
                return (
                  <div key={month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>£{(val / 1000).toFixed(1)}k</div>
                    <div style={{ width: '100%', background: '#00C9A7', borderRadius: '4px 4px 0 0', height: `${pct}%`, minHeight: 4 }} />
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

      {/* Per-clinic breakdown */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Clinic breakdown</div>
        </div>
        {Object.keys(clinicMap).length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No revenue data yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Clinic', 'Bookings', 'Revenue', 'Platform cut', 'Clinic payout', 'Stripe'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(clinicMap)
                .sort((a, b) => b[1].revenue - a[1].revenue)
                .map(([cid, data], i, arr) => {
                  const clinic = clinics.find(c => c.id === cid)
                  const payout = data.revenue - data.commission
                  return (
                    <tr key={cid} style={{ borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{data.name}</td>
                      <td style={{ padding: '12px 16px', color: '#555' }}>{data.bookingCount}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111' }}>£{data.revenue.toLocaleString('en-GB')}</td>
                      <td style={{ padding: '12px 16px', color: '#3b82f6', fontWeight: 500 }}>£{data.commission.toLocaleString('en-GB', { minimumFractionDigits: 0 })}</td>
                      <td style={{ padding: '12px 16px', color: '#8b5cf6', fontWeight: 500 }}>£{payout.toLocaleString('en-GB', { minimumFractionDigits: 0 })}</td>
                      <td style={{ padding: '12px 16px' }}>
                        {clinic?.stripe_account_id ? (
                          <span style={{ padding: '2px 8px', background: '#dcfce7', color: '#166534', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>Connected</span>
                        ) : (
                          <span style={{ padding: '2px 8px', background: '#fef9c3', color: '#854d0e', borderRadius: 4, fontSize: 10, fontWeight: 700 }}>Not set up</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
