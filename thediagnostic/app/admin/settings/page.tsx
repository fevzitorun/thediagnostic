// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = { title: 'Settings — Admin' }

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'super_admin') redirect('/admin')

  const { data: adminUsers } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email, role, created_at')
    .in('role', ['super_admin', 'admin', 'finance', 'sales', 'support', 'marketing'])
    .order('created_at', { ascending: true })

  const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
    super_admin: { bg: '#111', color: '#fff' },
    admin:       { bg: '#1d4ed8', color: '#fff' },
    finance:     { bg: '#d97706', color: '#fff' },
    sales:       { bg: '#059669', color: '#fff' },
    support:     { bg: '#7c3aed', color: '#fff' },
    marketing:   { bg: '#db2777', color: '#fff' },
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Platform configuration — super admin only</p>
      </div>

      {/* Admin team */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Admin team</div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 2 }}>Users with platform access</div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Name', 'Email', 'Role', 'Joined'].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(adminUsers ?? []).map((u, i) => {
              const rc = ROLE_COLORS[u.role] ?? { bg: '#f3f4f6', color: '#374151' }
              return (
                <tr key={u.id} style={{ borderBottom: i < (adminUsers?.length ?? 0) - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: '#111' }}>{u.first_name} {u.last_name}</td>
                  <td style={{ padding: '12px 16px', color: '#555' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, background: rc.bg, color: rc.color, textTransform: 'uppercase' }}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#aaa', fontSize: 12 }}>
                    {u.created_at ? new Date(u.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Platform config info */}
      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Platform configuration</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { label: 'Default commission rate', value: '12%', note: 'Applied when clinic has no custom rate' },
            { label: 'Stripe mode', value: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ? 'Live' : 'Test', note: 'Payment processing environment' },
            { label: 'Booking flow', value: 'v2 — safety questionnaire per scan type', note: '' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{item.label}</div>
                {item.note && <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{item.note}</div>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
