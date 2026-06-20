import { sql } from '@/lib/db'

export const metadata = { title: 'Finance — Admin' }
export const dynamic = 'force-dynamic'

export default async function AdminFinancePage() {
  const [topRows, clinicRows, monthlyRows] = await Promise.all([
    sql`
      SELECT
        COALESCE(SUM(amount_paid),0)                                           AS total_revenue,
        COALESCE(SUM(amount_paid * 0.15),0)                                    AS platform_revenue,
        COALESCE(SUM(amount_paid * 0.85),0)                                    AS clinic_payouts,
        COUNT(*)                                                                AS total_transactions,
        AVG(amount_paid)                                                        AS avg_order
      FROM bookings
      WHERE status IN ('confirmed','completed') AND amount_paid IS NOT NULL
    `,
    sql`
      SELECT
        COALESCE(tc.name, b.clinic_name, 'Unknown')                            AS clinic_name,
        COUNT(b.id)::int                                                        AS booking_count,
        COALESCE(SUM(b.amount_paid),0)                                          AS revenue,
        COALESCE(SUM(b.amount_paid * COALESCE(tc.commission_pct,15) / 100),0)  AS platform_fee
      FROM bookings b
      LEFT JOIN tr_clinics tc ON tc.id = b.tr_clinic_id
      WHERE b.status IN ('confirmed','completed') AND b.amount_paid IS NOT NULL
      GROUP BY COALESCE(tc.name, b.clinic_name, 'Unknown')
      ORDER BY revenue DESC
      LIMIT 20
    `,
    sql`
      SELECT
        TO_CHAR(created_at, 'YYYY-MM')   AS month,
        COALESCE(SUM(amount_paid),0)     AS revenue
      FROM bookings
      WHERE status IN ('confirmed','completed') AND amount_paid IS NOT NULL
        AND created_at > NOW() - INTERVAL '6 months'
      GROUP BY month
      ORDER BY month ASC
    `,
  ])

  const top = topRows[0] as { total_revenue: string; platform_revenue: string; clinic_payouts: string; total_transactions: string; avg_order: string }
  const totalRevenue   = Number(top.total_revenue)
  const platformRevenue = Number(top.platform_revenue)
  const clinicPayouts  = Number(top.clinic_payouts)
  const avgOrder       = Number(top.avg_order)
  const totalTx        = Number(top.total_transactions)

  const clinics = clinicRows as { clinic_name: string; booking_count: number; revenue: string; platform_fee: string }[]
  const monthly = monthlyRows as { month: string; revenue: string }[]
  const maxMonthly = Math.max(...monthly.map(m => Number(m.revenue)), 1)

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Finance</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Platform revenue and TR clinic payouts · 15% default commission</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total GMV',          value: `£${totalRevenue.toLocaleString('en-GB')}`,       sub: 'Gross', accent: '#17A589' },
          { label: 'Platform Revenue',   value: `£${platformRevenue.toLocaleString('en-GB')}`,    sub: '~15% commission', accent: '#3AABDB' },
          { label: 'Clinic Payouts',     value: `£${clinicPayouts.toLocaleString('en-GB')}`,      sub: 'Owed to clinics', accent: '#8b5cf6' },
          { label: 'Transactions',       value: String(totalTx),                                  sub: 'Confirmed + completed', accent: '#f59e0b' },
          { label: 'Avg Order',          value: `£${Math.round(avgOrder).toLocaleString('en-GB')}`, sub: 'Per booking', accent: '#082A4A' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', marginBottom: 3 }}>{kpi.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 12 }} />
          </div>
        ))}
      </div>

      {/* Monthly bar chart */}
      {monthly.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>Monthly Revenue (last 6 months)</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', height: 120 }}>
            {monthly.map(m => {
              const val = Number(m.revenue)
              const pct = (val / maxMonthly) * 100
              return (
                <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#888' }}>£{(val / 1000).toFixed(1)}k</div>
                  <div style={{ width: '100%', background: '#3AABDB', borderRadius: '4px 4px 0 0', height: `${pct}%`, minHeight: 4 }} />
                  <div style={{ fontSize: 10, color: '#aaa' }}>
                    {new Date(m.month + '-01').toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Per-clinic breakdown */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>Clinic Breakdown</div>
        </div>
        {clinics.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No revenue data yet</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                {['Clinic', 'Bookings', 'Revenue', 'Platform cut', 'Clinic payout'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clinics.map((c, i) => {
                const rev   = Number(c.revenue)
                const fee   = Number(c.platform_fee)
                const payout = rev - fee
                return (
                  <tr key={c.clinic_name} style={{ borderBottom: i < clinics.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{c.clinic_name}</td>
                    <td style={{ padding: '12px 16px', color: '#555' }}>{c.booking_count}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary)' }}>£{rev.toLocaleString('en-GB')}</td>
                    <td style={{ padding: '12px 16px', color: '#3AABDB', fontWeight: 500 }}>£{fee.toLocaleString('en-GB', { minimumFractionDigits: 0 })}</td>
                    <td style={{ padding: '12px 16px', color: '#8b5cf6', fontWeight: 500 }}>£{payout.toLocaleString('en-GB', { minimumFractionDigits: 0 })}</td>
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
