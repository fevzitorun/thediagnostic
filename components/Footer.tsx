import Link from 'next/link'

const COLS = [
  {
    title: 'Scans',
    links: [
      { label: 'PET-CT Scan',       href: '/scan/pet-ct' },
      { label: 'MRI 3T',            href: '/scan/mri-3t' },
      { label: 'GammaKnife',        href: '/scan/gamma-knife' },
      { label: 'PET-MRI',           href: '/scan/pet-mri' },
      { label: 'SPECT-CT',          href: '/scan/spect-ct' },
      { label: 'Whole Body MRI',    href: '/scan/whole-body-mri' },
      { label: 'CT Angiography',    href: '/scan/ct-angio' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Istanbul, Turkey',       href: '/destinations/turkey/istanbul' },
      { label: 'All Clinics',            href: '/clinics' },
      { label: 'UK vs Turkey Prices',    href: '/compare/pet-ct-uk-vs-turkey' },
      { label: 'Medical Tourism Guide',  href: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',          href: '/about' },
      { label: 'For Clinics',       href: '/partners' },
      { label: 'Blog',              href: '/blog' },
      { label: 'Contact',           href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy',    href: '/privacy-policy' },
      { label: 'Terms',             href: '/terms-and-conditions' },
      { label: 'Cookie Policy',     href: '/cookie-policy' },
      { label: 'Accessibility',     href: '/accessibility' },
    ],
  },
]

function DiagnosticLogo() {
  return (
    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo-mark.png" alt="" width={34} height={34} style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
      <div style={{ lineHeight: 1.1 }}>
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase' }}>The</div>
        <div style={{ color: '#fff', fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>Diagnostic</div>
      </div>
    </Link>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#082A4A', color: '#fff', padding: '64px 48px 32px' }}>
      <style>{`@media(max-width:768px){.footer-top-grid{grid-template-columns:1fr 1fr !important;gap:32px !important;}.footer-wrap{padding:40px 20px 24px !important;}}`}</style>
      <div className="footer-wrap" style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top grid */}
        <div className="footer-top-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            <DiagnosticLogo />
            <p style={{ fontSize: 13, color: 'rgba(250,250,247,.5)', lineHeight: 1.7, marginTop: 16, maxWidth: 240 }}>
              Medical imaging technology broker. 60+ advanced diagnostic technologies at JCI-accredited partner clinics in Istanbul. Reports in English within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {['JCI', 'ISO', 'GDPR'].map(b => (
                <div key={b} style={{ padding: '4px 10px', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 0.8 }}>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.35)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 16 }}>
                {col.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <Link
                    key={l.href}
                    href={l.href}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', textDecoration: 'none' }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,.3)', margin: 0 }}>
            © 2026 thediagnostic.co.uk · A trading name of Connective Hub Limited · Company No. 11148446
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#17A589' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
