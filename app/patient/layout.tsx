import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

const NAV = [
  { label: 'Dashboard',   href: '/patient/dashboard' },
  { label: 'My Bookings', href: '/patient/bookings' },
  { label: 'My Reports',  href: '/patient/reports' },
  { label: 'Profile',     href: '/patient/profile' },
]

export default async function PatientLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const rows = await sql`SELECT first_name FROM profiles WHERE id = ${user.id} LIMIT 1`
  const displayName = (rows[0]?.first_name as string | null) || user.email?.split('@')[0] || 'there'

  return (
    <div style={{ minHeight: '100vh', background: '#F6F9FC' }}>
      <nav style={{
        height: 62, padding: '0 28px',
        background: '#082A4A',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-mark.png" alt="" width={28} height={28} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The</div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>Diagnostic</div>
          </div>
        </Link>

        <div style={{ display: 'flex', gap: 2 }}>
          {NAV.map(({ label, href }) => (
            <Link key={href} href={href} style={{ padding: '7px 12px', fontSize: 13, color: 'rgba(255,255,255,0.72)', textDecoration: 'none', borderRadius: 7 }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/book" style={{ padding: '8px 16px', borderRadius: 7, background: '#17A589', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Book a Scan
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#3AABDB', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 600 }}>
              {displayName[0].toUpperCase()}
            </div>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{displayName}</span>
          </div>
          <Link href="/auth/signout" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', padding: '6px 10px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6 }}>
            Sign out
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '40px 28px' }}>
        {children}
      </main>
    </div>
  )
}
