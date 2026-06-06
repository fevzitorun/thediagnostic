import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export default async function PatientLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user

  if (!user) redirect('/login')

  const rows = await sql`SELECT first_name FROM profiles WHERE id = ${user.id} LIMIT 1`
  const displayName = (rows[0]?.first_name as string | null) || user.email?.split('@')[0] || 'there'

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafb' }}>

      {/* Top nav */}
      <nav style={{
        height: 60, padding: '0 32px',
        background: '#fff', borderBottom: '1px solid #ebebeb',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>Scan</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#0F4C81' }}>Book</span>
        </Link>

        <div style={{ display: 'flex', gap: 4 }}>
          {[
            { label: 'Dashboard', href: '/patient/dashboard' },
            { label: 'My Bookings', href: '/patient/bookings' },
            { label: 'My Reports', href: '/patient/reports' },
            { label: 'Profile', href: '/patient/profile' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{ padding: '7px 12px', fontSize: 13, color: '#555', textDecoration: 'none', borderRadius: 7, transition: 'background .15s' }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link
            href="/search"
            style={{ padding: '8px 16px', borderRadius: 7, background: '#0F4C81', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
          >
            Book a scan
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: '#0f172a',
              color: '#fff', display: 'grid', placeItems: 'center',
              fontSize: 13, fontWeight: 600,
            }}>
              {displayName[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>{displayName}</span>
          </div>
          <SignOutButton />
        </div>
      </nav>

      {/* Page content */}
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 32px' }}>
        {children}
      </main>
    </div>
  )
}

function SignOutButton() {
  return (
    <Link
      href="/auth/signout"
      style={{ fontSize: 12, color: '#bbb', textDecoration: 'none', padding: '6px 10px', border: '1px solid #ebebeb', borderRadius: 6 }}
    >
      Sign out
    </Link>
  )
}
