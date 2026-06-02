import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Scans',           href: '/services' },
  { label: 'Centres',         href: '/centres' },
  { label: 'How it works',    href: '/#how-it-works' },
  { label: 'For Clinicians',  href: '/for-gps' },
  { label: 'Blog',            href: '/blog' },
]

export function ScanBookLogo({ light = false }: { light?: boolean }) {
  const stroke = light ? '#FAFAF7' : '#0F4C81'
  const dotFill = '#EF4444'
  return (
    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg viewBox="0 0 48 48" width="32" height="32" fill="none">
        <circle cx="24" cy="24" r="22" stroke={stroke} strokeWidth="1.8"/>
        <path d="M8 24 Q14 16, 20 24 T32 24 T44 24" stroke={stroke} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <circle cx="20" cy="24" r="2.4" fill={dotFill}/>
      </svg>
      <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, letterSpacing: '-.5px', lineHeight: 1 }}>
        <span style={{ color: light ? '#FAFAF7' : '#0F4C81' }}>Scan</span>
        <span style={{ color: light ? 'rgba(250,250,247,.7)' : '#082A4A' }}>Book</span>
      </span>
    </Link>
  )
}

export default function Navbar() {
  return (
    <>
      <style>{`
        .sb-nav-link:hover { color: #0F4C81 !important; }
        .sb-book-btn:hover { background: #0A3A66 !important; }
        @media (max-width: 768px) {
          .sb-nav-links { display: none !important; }
          .sb-nav-actions { gap: 8px !important; }
          .sb-sign-in { display: none !important; }
        }
      `}</style>
      <nav style={{
        height: 72, padding: '0 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#FAFAF7', borderBottom: '1px solid #E5E1D8',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <ScanBookLogo />

        <div className="sb-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="sb-nav-link"
              style={{ padding: '6px 12px', fontSize: 13, fontWeight: 500, color: '#4B5563', textDecoration: 'none', borderRadius: 6, transition: 'color .15s' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="sb-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/login"
            className="sb-sign-in"
            style={{ padding: '8px 16px', border: '1.5px solid #E5E1D8', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#374151', textDecoration: 'none', background: '#fff' }}
          >
            Sign in
          </Link>
          <Link
            href="/search"
            className="sb-book-btn"
            style={{ padding: '9px 20px', background: '#082A4A', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'background .15s' }}
          >
            Book a scan
          </Link>
        </div>
      </nav>
    </>
  )
}
