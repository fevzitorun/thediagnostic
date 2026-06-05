import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafb', display: 'flex', flexDirection: 'column' }}>

      {/* Minimal nav */}
      <nav style={{ height: 56, padding: '0 32px', display: 'flex', alignItems: 'center', background: '#fff', borderBottom: '1px solid #ebebeb' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>Scan</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#0F4C81' }}>Book</span>
        </Link>
      </nav>

      {/* Centered card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 420, background: '#fff', borderRadius: 18, border: '1px solid #ebebeb', padding: '40px 36px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          {children}
        </div>
      </div>

      <footer style={{ padding: '20px 32px', textAlign: 'center', fontSize: 12, color: '#bbb' }}>
        © 2026 Connective Hub Limited ·{' '}
        <Link href="/privacy-policy" style={{ color: '#bbb', textDecoration: 'none' }}>Privacy</Link>
        {' · '}
        <Link href="/terms-and-conditions" style={{ color: '#bbb', textDecoration: 'none' }}>Terms</Link>
      </footer>
    </div>
  )
}
