import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

const NAV = [
  { label: 'Dashboard',    href: '/clinic/dashboard',    icon: '◈' },
  { label: 'Appointments', href: '/clinic/appointments', icon: '📅' },
  { label: 'Reports',      href: '/clinic/reports',      icon: '📄' },
  { label: 'Packages',     href: '/clinic/packages',     icon: '🔬' },
  { label: 'Messages',     href: '/clinic/messages',     icon: '✉' },
  { label: 'Settings',     href: '/clinic/settings',     icon: '⚙' },
]

export default async function ClinicLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const role = user.role ?? ''
  const clinicId = user.clinicId ?? null
  const allowedRoles = ['clinic_admin', 'clinic_staff', 'super_admin', 'admin']
  if (!allowedRoles.includes(role)) redirect('/')

  const profileRows = await sql`SELECT first_name FROM profiles WHERE id = ${user.id} LIMIT 1`
  const displayName = (profileRows[0]?.first_name as string | null) || user.email?.split('@')[0] || 'Staff'

  const clinicRows = clinicId
    ? await sql`SELECT name, status FROM clinics WHERE id = ${clinicId} LIMIT 1`
    : []
  const clinic = clinicRows[0] ?? null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f4f0' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: '#082A4A', color: '#fff',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <Link href="/clinic/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#00C9A7', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700 }}>S</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Clinic</span>
          </Link>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,.5)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {clinic?.name ?? 'ScanBook'}
          </div>
          {clinic?.status && clinic.status !== 'active' && (
            <div style={{ marginTop: 6, padding: '2px 8px', background: '#fef9c3', color: '#854d0e', borderRadius: 4, fontSize: 10, fontWeight: 700, display: 'inline-block' }}>
              {clinic.status.toUpperCase()}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                fontSize: 13, color: 'rgba(255,255,255,.7)', textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User footer */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#00C9A7', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
              {displayName[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>{displayName}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)' }}>{user.email}</div>
            </div>
          </div>
          <Link href="/" style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', textDecoration: 'none', display: 'block', marginBottom: 4 }}>← View site</Link>
          <Link href="/auth/signout" style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', textDecoration: 'none' }}>Sign out</Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
