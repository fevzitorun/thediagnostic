import Link from 'next/link'
import { ScanBookLogo } from './Navbar'

const COLS = [
  {
    title: 'Scans',
    links: [
      { label: 'MRI Scan',        href: '/search?type=mri' },
      { label: 'CT Scan',         href: '/search?type=ct' },
      { label: 'Ultrasound',      href: '/search?type=ultrasound' },
      { label: 'X-Ray',           href: '/search?type=xray' },
      { label: 'Baby Scan',       href: '/search?type=baby-scan' },
      { label: 'Full Body MRI',   href: '/search?type=mri&pathway=full-body' },
    ],
  },
  {
    title: 'Locations',
    links: [
      { label: 'London',          href: '/search?location=london' },
      { label: 'Manchester',      href: '/search?location=manchester' },
      { label: 'Birmingham',      href: '/search?location=birmingham' },
      { label: 'Edinburgh',       href: '/search?location=edinburgh' },
      { label: 'Bristol',         href: '/search?location=bristol' },
      { label: 'All centres',     href: '/search' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us',        href: '/about' },
      { label: 'For Clinicians',  href: '/partners' },
      { label: 'For GPs',        href: '/gp-referrals' },
      { label: 'Blog',            href: '/blog' },
      { label: 'Careers',        href: '/careers' },
      { label: 'Contact',        href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy',  href: '/privacy-policy' },
      { label: 'Terms',           href: '/terms-and-conditions' },
      { label: 'Cookie policy',   href: '/cookie-policy' },
      { label: 'Accessibility',   href: '/accessibility' },
    ],
  },
]

export default function Footer() {
  return (
    <footer style={{ background: '#082A4A', color: '#fff', padding: '64px 48px 32px' }}>
      <style>{`@media(max-width:768px){.footer-top-grid{grid-template-columns:1fr 1fr !important;gap:32px !important;}.footer-wrap{padding:40px 20px 24px !important;}}`}</style>
      <div className="footer-wrap" style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top grid */}
        <div className="footer-top-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: 40, marginBottom: 56 }}>

          {/* Brand column */}
          <div>
            <ScanBookLogo light />
            <p style={{ fontSize: 13, color: 'rgba(250,250,247,.5)', lineHeight: 1.7, marginTop: 16, maxWidth: 240 }}>
              Private medical imaging, booked online. Access 200+ CQC-registered centres across the UK.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {/* Trust badges */}
              {['CQC', 'ISO', 'GDPR'].map(b => (
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
                    style={{ fontSize: 13, color: 'rgba(255,255,255,.55)', textDecoration: 'none', transition: 'color .15s' }}
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
            © 2026 ScanBook · A trading name of Connective Hub Limited · Company No. 11148446
          </p>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00C9A7' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,.3)' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
