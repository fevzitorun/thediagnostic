import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

// Role-based nav — each item specifies which roles can see it
const NAV: { label: string; href: string; icon: string; roles: string[] }[] = [
  { label: 'Dashboard',  href: '/admin',           icon: '◈', roles: ['super_admin','admin','finance','sales','support','marketing'] },
  { label: 'Bookings',   href: '/admin/bookings',  icon: '📋', roles: ['super_admin','admin','support'] },
  { label: 'Clinics',    href: '/admin/clinics',   icon: '🏥', roles: ['super_admin','admin','sales'] },
  { label: 'Patients',   href: '/admin/patients',  icon: '👥', roles: ['super_admin','admin','support'] },
  { label: 'Finance',    href: '/admin/finance',   icon: '£',  roles: ['super_admin','finance'] },
  { label: 'Marketing',  href: '/admin/marketing', icon: '📣', roles: ['super_admin','marketing'] },
  { label: 'Messages',   href: '/admin/messages',  icon: '✉',  roles: ['super_admin','admin','support'] },
  { label: 'Outreach',   href: '/admin/outreach',  icon: '📨', roles: ['super_admin','sales'] },
  { label: 'Agents',     href: '/admin/agents',    icon: '🤖', roles: ['super_admin'] },
  { label: 'Settings',   href: '/admin/settings',  icon: '⚙',  roles: ['super_admin'] },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  // Role comes from JWT session (set at login from profiles table)
  const role = user.role ?? ''
  const adminRoles = ['super_admin','admin','finance','sales','support','marketing']
  if (!adminRoles.includes(role)) redirect('/')

  // Fetch display name from DB
  const rows = await sql`SELECT first_name FROM profiles WHERE id = ${user.id} LIMIT 1`
  const firstName = (rows[0]?.first_name as string | null) ?? null

  const visibleNav = NAV.filter(item => item.roles.includes(role))
  const displayName = firstName || user.email?.split('@')[0] || 'Admin'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f4f4f0' }}>

      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: '#0F1923', color: '#fff',
        display: 'flex', flexDirection: 'column',
        position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: '#00C9A7', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700 }}>S</div>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Admin</span>
          </Link>
          <div style={{ marginTop: 8, fontSize: 10, color: 'rgba(255,255,255,.35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
            {role.replace('_', ' ')}
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {visibleNav.map(item => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 12px', borderRadius: 8, marginBottom: 2,
                fontSize: 13, color: 'rgba(255,255,255,.7)', textDecoration: 'none',
                transition: 'all .15s',
              }}
              onMouseEnter={undefined}
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

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
