// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Earnings — GP Portal' }

export default async function GPEarningsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: gp } = await supabase
    .from('gps')
    .select('id, commission_rate, total_earned, pending_payout, bank_account_last4')
    .eq('user_id', user.id)
    .single()

  if (!gp) redirect('/gp/dashboard')

  const { data: completedBookings } = await supabase
    .from('bookings')
    .select('id, patient_name, package_name, clinic_name, amount_paid, created_at, appointment_date')
    .eq('gp_id', gp.id)
    .eq('status', 'completed')
    .order('appointment_date', { ascending: false })

  const { data: payouts } = await supabase
    .from('gp_earnings')
    .select('id, amount, period_start, period_end, status, paid_at, booking_count')
    .eq('gp_id', gp.id)
    .order('period_start', { ascending: false })

  const commissionRate = gp.commission_rate ?? 0.05

  // Monthly breakdown
  const monthly: Record<string, { revenue: number; commission: number; count: number }> = {}
  for (const b of completedBookings ?? []) {
    const month = b.created_at?.substring(0, 7) ?? 'unknown'
    if (!monthly[month]) monthly[month] = { revenue: 0, commission: 0, count: 0 }
    monthly[month].revenue += b.amount_paid ?? 0
    monthly[month].commission += (b.amount_paid ?? 0) * commissionRate
    monthly[month].count++
  }
  const sortedMonths = Object.keys(monthly).sort().reverse().slice(0, 6)

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Earnings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Commission from referrals · {Math.round(commissionRate * 100)}% rate</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { label: 'Total earned',   value: `£${(gp.total_earned ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, sub: 'All time', accent: '#00C9A7' },
          { label: 'Pending payout', value: `£${(gp.pending_payout ?? 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`, sub: 'Next payment (1st of month)', accent: '#8b5cf6' },
          { label: 'Referrals done', value: String(completedBookings?.length ?? 0), sub: 'Completed scans', accent: '#3b82f6' },
        ].map((kpi, i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>{kpi.label}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#111', marginBottom: 4 }}>{kpi.value}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{kpi.sub}</div>
            <div style={{ height: 3, background: kpi.accent, borderRadius: 2, marginTop: 14 }} />
          </div>
        ))}
      </div>

      {/* Bank account info */}
      <div style={{ background: gp.bank_account_last4 ? '#f0fdf4' : '#fffbeb', border: `1px solid ${gp.bank_account_last4 ? '#bbf7d0' : '#fde68a'}`, borderRadius: 12, padding: '16px 20px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: gp.bank_account_last4 ? '#166534' : '#92400e' }}>
            {gp.bank_account_last4 ? `✓ Bank account ending ****${gp.bank_account_last4}` : '⚠ No bank account set up'}
          </div>
          <div style={{ fontSize: 12, color: gp.bank_account_last4 ? '#4ade80' : '#a16207', marginTop: 2 }}>
            {gp.bank_account_last4 ? 'Payouts arrive on the 1st of each month' : 'Add bank details in Settings to receive payouts'}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Monthly breakdown */}
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Monthly commissions</div>
          {sortedMonths.length === 0 ? (
            <div style={{ color: '#bbb', fontSize: 13 }}>No completed referrals yet</div>
          ) : (
            sortedMonths.map(month => {
              const data = monthly[month]
              return (
                <div key={month} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>
                      {new Date(month + '-01').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                    </div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{data.count} referrals</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#166534' }}>£{data.commission.toFixed(2)}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>£{data.revenue.toFixed(0)} GMV</div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Payout history */}
        <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Payout history</div>
          {!payouts || payouts.length === 0 ? (
            <div style={{ color: '#bbb', fontSize: 13 }}>No payouts yet</div>
          ) : (
            payouts.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < payouts.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>
                    {new Date(p.period_start).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>{p.booking_count} scans</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: p.status === 'paid' ? '#166534' : '#854d0e' }}>£{p.amount.toFixed(2)}</div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, textTransform: 'uppercase',
                    background: p.status === 'paid' ? '#dcfce7' : '#fef9c3',
                    color: p.status === 'paid' ? '#166534' : '#854d0e',
                  }}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
