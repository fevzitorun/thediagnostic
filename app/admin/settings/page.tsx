import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Settings — Admin' }
export const dynamic = 'force-dynamic'

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  super_admin: { bg: '#082A4A', color: '#fff' },
  admin:       { bg: '#1d4ed8', color: '#fff' },
  finance:     { bg: '#d97706', color: '#fff' },
  sales:       { bg: '#059669', color: '#fff' },
  support:     { bg: '#7c3aed', color: '#fff' },
  marketing:   { bg: '#db2777', color: '#fff' },
}

export default async function AdminSettingsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')
  if (user.role !== 'super_admin') redirect('/admin')

  const rows = await sql`
    SELECT p.id, p.first_name, p.last_name, p.role, p.created_at, u.email
    FROM profiles p
    JOIN users u ON u.id = p.id
    WHERE p.role IN ('super_admin','admin','finance','sales','support','marketing')
    ORDER BY p.created_at ASC
  `
  const admins = rows as unknown as { id: string; first_name: string | null; last_name: string | null; role: string; created_at: string; email: string }[]

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Platform configuration — super admin only</p>
      </div>

      {/* Admin team */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
        <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>Admin team ({admins.length})</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Users with platform access</div>
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
            {admins.map((u, i) => {
              const rc = ROLE_COLORS[u.role] ?? { bg: '#f3f4f6', color: '#374151' }
              return (
                <tr key={u.id} style={{ borderBottom: i < admins.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: 'var(--primary)' }}>{u.first_name} {u.last_name}</td>
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

      {/* Platform config */}
      <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)', marginBottom: 16 }}>Platform configuration</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { label: 'Default commission rate', value: '15%', note: 'Applied when clinic has no custom rate (TR clinics)' },
            { label: 'Stripe mode', value: process.env.STRIPE_SECRET_KEY?.startsWith('sk_live') ? 'Live' : 'Test', note: 'Payment processing environment' },
            { label: 'Primary market', value: 'United Kingdom → Istanbul, Turkey', note: 'UK patients booking at JCI-accredited Istanbul hospitals' },
            { label: 'Report language', value: 'English', note: 'All radiology reports delivered in English within 24h' },
          ].map((item, i) => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#333' }}>{item.label}</div>
                {item.note && <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{item.note}</div>}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
