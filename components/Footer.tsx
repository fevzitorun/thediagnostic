import Link from 'next/link';

const SCANS = [
  { href: '/scan/pet-ct', label: 'PET-CT Scan' },
  { href: '/scan/mri-3t', label: 'MRI 3T' },
  { href: '/scan/gamma-knife', label: 'GammaKnife' },
  { href: '/scan/spect-ct', label: 'SPECT-CT' },
  { href: '/scan/pet-mri', label: 'PET-MRI' },
];

const DESTINATIONS = [
  { href: '/destinations/turkey/istanbul', label: 'Istanbul, Turkey' },
  { href: '/destinations/turkey/ankara', label: 'Ankara, Turkey' },
  { href: '/destinations/germany/munich', label: 'Munich, Germany' },
  { href: '/destinations/uae/dubai', label: 'Dubai, UAE' },
];

const COMPARE = [
  { href: '/compare/pet-ct-uk-vs-turkey', label: 'PET-CT: UK vs Turkey' },
  { href: '/compare/mri-uk-vs-turkey', label: 'MRI: UK vs Turkey' },
  { href: '/compare/gamma-knife-uk-vs-germany', label: 'GammaKnife: UK vs Germany' },
];

const COMPANY = [
  { href: '/about', label: 'About Us' },
  { href: '/clinics', label: 'Partner Clinics' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--primary-3)',
      color: 'rgba(255,255,255,0.75)',
      paddingTop: 64,
      paddingBottom: 40,
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 40,
          marginBottom: 48,
        }}>
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36, background: 'var(--accent)',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>td</span>
              </div>
              <span style={{ color: '#fff', fontSize: 18, fontFamily: 'var(--font-serif)' }}>
                the<strong>diagnostic</strong>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
              Advanced diagnostics. No waiting lists. No compromise.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
                style={{ color: '#25D366', fontSize: 13 }}>WhatsApp</a>
              <a href="mailto:care@thediagnostic.co.uk"
                style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>care@thediagnostic.co.uk</a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Scan Types
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SCANS.map(s => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', transition: 'color 0.15s' }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Destinations
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {DESTINATIONS.map(d => (
                <li key={d.href}>
                  <Link href={d.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Price Compare
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPARE.map(c => (
                <li key={c.href}>
                  <Link href={c.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPANY.map(c => (
                <li key={c.href}>
                  <Link href={c.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 24, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ fontSize: 13 }}>
            &copy; 2026 Connective Hub Limited. Registered in England &amp; Wales. &middot; Connective Hub Dijital Teknolojiler A.&Scaron;.
          </p>
          <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🇬🇧 EN</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🇹🇷 TR</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>🇸🇦 AR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
