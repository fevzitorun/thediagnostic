import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TriageWidget from '@/components/TriageWidget'
import { getFeaturedClinics } from '@/lib/clinics.data'

export const metadata = {
  title: 'ScanBook — Private Medical Scans, Booked Online',
  description: 'Access 200+ CQC-registered imaging centres. MRI, CT, Ultrasound, X-Ray and Baby Scans from £75. Reports in 24 hours.',
}

export default function HomePage() {
  const featured = getFeaturedClinics()

  return (
    <>
      <style>{`
        :root {
          --ink:    #0F4C81;
          --ink-2:  #0A3A66;
          --ink-3:  #082A4A;
          --ink-05: #E8F0F8;
          --accent: #EF4444;
          --paper:  #FAFAF7;
          --paper-2:#F2F1EC;
          --line:   #E5E1D8;
          --serif:  'Instrument Serif', Georgia, serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--paper); -webkit-font-smoothing: antialiased; }

        .hero-h1 { font-family: var(--serif); font-size: 96px; line-height: .97; letter-spacing: -3.4px; color: var(--ink-3); }
        .hero-h1 em { font-style: italic; color: var(--ink); }
        .search-pill:hover { background: var(--ink-05) !important; color: var(--ink) !important; border-color: var(--ink) !important; }
        .needs-card:hover { border-color: var(--ink) !important; transform: translateY(-2px); }
        .centre-card:hover { box-shadow: 0 8px 30px rgba(15,76,129,.12) !important; transform: translateY(-2px); }
        .hiw-step { transition: opacity .2s; }
        .cta-btn-outline:hover { background: rgba(255,255,255,.08) !important; }

        @media (max-width: 768px) {
          .hero-h1 { font-size: 52px !important; letter-spacing: -1.8px !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .avail-panel { display: none !important; }
          .stats-band { grid-template-columns: repeat(2,1fr) !important; }
          .trust-band { grid-template-columns: repeat(2,1fr) !important; }
          .needs-grid { grid-template-columns: 1fr !important; }
          .wait-grid { grid-template-columns: 1fr !important; }
          .centres-grid { display: flex !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; scrollbar-width: none !important; }
          .centre-card { min-width: 300px !important; flex-shrink: 0 !important; }
          .hiw-grid { grid-template-columns: 1fr !important; text-align: left !important; }
          .hiw-step { display: flex !important; gap: 16px !important; align-items: flex-start !important; text-align: left !important; }
          .reviews-grid { display: flex !important; overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
          .review-card { min-width: 280px !important; flex-shrink: 0 !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{ background: 'var(--paper)', padding: '72px 0 64px' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 460px', gap: 64, alignItems: 'center' }}>

            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', letterSpacing: 0.4 }}>
                  200+ CQC-registered centres · No GP referral needed
                </span>
              </div>

              <h1 className="hero-h1">
                A scan within<br />
                the week. Reports<br />
                <em>within the day.</em>
              </h1>

              <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.65, marginTop: 24, marginBottom: 36, maxWidth: 460 }}>
                Private medical imaging, booked online in minutes. MRI, CT, Ultrasound, X-Ray and Baby Scans — from £75.
              </p>

              {/* Search form */}
              <form
                action="/search"
                method="get"
                style={{
                  display: 'flex', background: '#fff', border: '1.5px solid var(--line)',
                  borderRadius: 14, overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(15,76,129,.08)',
                  marginBottom: 20,
                }}
              >
                <div style={{ flex: 1, padding: '14px 18px', borderRight: '1.5px solid var(--line)' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 5 }}>Scan type</div>
                  <select
                    name="type"
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: '#111', background: 'transparent', fontFamily: 'inherit', cursor: 'pointer', appearance: 'none' }}
                  >
                    <option value="">All scans</option>
                    <option value="mri">MRI</option>
                    <option value="ct">CT Scan</option>
                    <option value="ultrasound">Ultrasound</option>
                    <option value="xray">X-Ray</option>
                    <option value="baby-scan">Baby Scan</option>
                    <option value="mri&pathway=full-body">Full Body MRI</option>
                  </select>
                </div>
                <div style={{ flex: 1.2, padding: '14px 18px' }}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 5 }}>Location</div>
                  <input
                    name="location"
                    placeholder="Postcode or city"
                    style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: '#111', background: 'transparent', fontFamily: 'inherit' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'var(--ink-3)', color: '#fff', border: 'none',
                    padding: '0 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'inherit', whiteSpace: 'nowrap',
                    transition: 'background .15s',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  Search
                </button>
              </form>

              {/* Quick pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 12, color: '#9CA3AF', display: 'flex', alignItems: 'center' }}>Popular:</span>
                {[
                  { label: 'MRI Scan',        href: '/services/mri-scan' },
                  { label: 'CT Scan',         href: '/services/ct-scan' },
                  { label: 'Full Body MRI',   href: '/services/full-body-mri' },
                  { label: 'Ultrasound',      href: '/services/ultrasound' },
                  { label: 'Women\'s Health', href: '/services/womens-health' },
                  { label: 'Baby Scan',       href: '/services/baby-scan' },
                  { label: 'PET Scan',        href: '/search?type=pet' },
                ].map(p => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="search-pill"
                    style={{
                      fontSize: 12, fontWeight: 500, color: '#6B7280',
                      padding: '5px 12px', borderRadius: 20,
                      border: '1px solid var(--line)', textDecoration: 'none',
                      background: '#fff', transition: 'all .15s',
                    }}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Live availability panel */}
            <div className="avail-panel" style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 20, padding: 28, boxShadow: '0 8px 40px rgba(15,76,129,.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Live availability</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>Next available slots</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#22C55E' }}>Live</span>
                </div>
              </div>

              {[
                { scan: 'MRI — Knee', clinic: 'Medicana Winchester', time: 'Today, 2:30 pm', price: '£455' },
                { scan: 'CT Scan — Chest', clinic: 'Medicana Winchester', time: 'Tomorrow, 9:00 am', price: '£525' },
                { scan: 'Ultrasound — Abdo', clinic: 'Unirad Glasgow', time: 'Tomorrow, 11:15 am', price: '£195' },
                { scan: 'Baby Scan — 20 wk', clinic: 'MotherScan Wimbledon', time: 'Thu, 10:00 am', price: '£149' },
              ].map((slot, i) => (
                <Link
                  key={i}
                  href="/search"
                  style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--line)' : 'none' }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{slot.scan}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{slot.clinic}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{slot.price}</div>
                    <div style={{ fontSize: 11, color: '#22C55E', marginTop: 2, fontWeight: 500 }}>{slot.time}</div>
                  </div>
                </Link>
              ))}

              <Link
                href="/search"
                style={{
                  display: 'block', marginTop: 20, padding: '12px', textAlign: 'center',
                  background: 'var(--ink-3)', color: '#fff', borderRadius: 10,
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}
              >
                See all available slots →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      <section style={{ background: '#fff', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)' }}>
        <div className="page-pad stats-band" style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {[
            { value: '4.9★', label: 'Trustpilot rating', sub: '2,418 verified reviews' },
            { value: '207',  label: 'Imaging centres', sub: 'Across the UK' },
            { value: '£75',  label: 'From', sub: 'For ultrasound & X-Ray' },
            { value: '24h',  label: 'Report turnaround', sub: 'For most scan types' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '16px 24px', borderRight: i < 3 ? '1px solid var(--line)' : 'none', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--ink-3)', fontWeight: 400, letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#374151', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TRUST BAND ─── */}
      <section style={{ background: 'var(--ink-3)', padding: '28px 48px' }}>
        <div className="trust-band page-pad" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, alignItems: 'center' }}>
          {[
            { title: 'CQC Registered',    desc: 'All partner centres inspected and approved' },
            { title: 'ISO 27001',          desc: 'Medical data handled to highest standards' },
            { title: 'UK GDPR Compliant', desc: 'Your health data is never sold or shared' },
            { title: 'Stripe Secured',     desc: 'PCI-DSS Level 1 payment processing' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.08)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{t.title}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.45)', marginTop: 2, lineHeight: 1.4 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── NEEDS / USE CASES ─── */}
      <section style={{ background: 'var(--paper)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Why patients choose ScanBook</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2 }}>What brings you here?</h2>
          </div>

          <div className="needs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              {
                icon: '🦴',
                title: 'Injury or pain',
                desc: "Knee, back, shoulder — get clarity fast without months of NHS waiting.",
                href: '/search?type=mri&part=knee',
                dark: false,
              },
              {
                icon: '🤰',
                title: 'Pregnancy scan',
                desc: 'Dating, anomaly, growth and gender scans — reassurance at every stage.',
                href: '/search?type=baby-scan',
                dark: false,
              },
              {
                icon: '💙',
                title: 'Health MOT',
                desc: 'Full Body MRI — a complete head-to-toe screen. No symptoms needed.',
                href: '/search?type=mri&pathway=full-body',
                dark: true,
              },
              {
                icon: '📋',
                title: 'GP referred',
                desc: 'Your GP recommended a scan? We accept GP letters and referral codes.',
                href: '/search',
                dark: false,
              },
            ].map((card, i) => (
              <Link
                key={i}
                href={card.href}
                className="needs-card"
                style={{
                  display: 'block', textDecoration: 'none', padding: '28px 24px',
                  borderRadius: 16, border: `1.5px solid ${card.dark ? 'var(--ink-3)' : 'var(--line)'}`,
                  background: card.dark ? 'var(--ink-3)' : '#fff',
                  transition: 'all .18s', cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{card.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: card.dark ? '#fff' : 'var(--ink-3)', marginBottom: 10 }}>
                  {card.title}
                </div>
                <div style={{ fontSize: 13, color: card.dark ? 'rgba(255,255,255,.6)' : '#6B7280', lineHeight: 1.6 }}>
                  {card.desc}
                </div>
                <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700, color: card.dark ? 'rgba(255,255,255,.5)' : 'var(--ink)', letterSpacing: 0.2 }}>
                  Browse scans →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI TRIAGE ─── */}
      <section style={{ background: 'var(--ink-3)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'flex', gap: 64, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>
              AI Scan Finder
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: '#fff', letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 16 }}>
              Not sure which scan you need?
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', lineHeight: 1.7 }}>
              Describe your symptoms and our AI assistant will recommend the most appropriate scan — instantly, and for free.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 320, maxWidth: 520 }}>
            <TriageWidget />
          </div>
        </div>
      </section>

      {/* ─── WAIT GAP ─── */}
      <section style={{ background: 'var(--paper-2)', padding: '80px 0', borderTop: '1.5px solid var(--line)' }}>
        <div className="page-pad wait-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          {/* Sticky text */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>The NHS wait gap</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 20 }}>
              Weeks of waiting — or tomorrow.
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              NHS waiting times for diagnostic imaging have reached record highs. ScanBook gives you access to the same radiologists and equipment — privately, this week.
            </p>
            <Link
              href="/search"
              style={{ display: 'inline-block', padding: '13px 24px', background: 'var(--ink-3)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
            >
              Find a slot this week →
            </Link>
          </div>

          {/* Comparison table */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderRadius: 14, overflow: 'hidden', border: '1.5px solid var(--line)', background: '#fff' }}>
              {/* Header */}
              <div style={{ padding: '12px 16px', background: 'var(--ink-05)', borderBottom: '1.5px solid var(--line)', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8 }}>Scan type</div>
              <div style={{ padding: '12px 16px', background: '#fef2f2', borderBottom: '1.5px solid var(--line)', borderLeft: '1.5px solid var(--line)', fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 0.8 }}>NHS (avg wait)</div>
              <div style={{ padding: '12px 16px', background: 'var(--ink-05)', borderBottom: '1.5px solid var(--line)', borderLeft: '1.5px solid var(--line)', fontSize: 11, fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: 0.8 }}>ScanBook</div>

              {[
                { scan: 'MRI — Knee',        nhs: '22–36 weeks', sb: 'This week' },
                { scan: 'MRI — Spine',        nhs: '18–28 weeks', sb: 'This week' },
                { scan: 'CT — Chest',         nhs: '14–20 weeks', sb: 'Tomorrow' },
                { scan: 'Ultrasound — Abdo',  nhs: '10–16 weeks', sb: 'Today' },
                { scan: 'Full Body MRI',       nhs: 'Not available', sb: 'This week' },
              ].map((row, i) => (
                <>
                  <div key={row.scan + '-scan'} style={{ padding: '14px 16px', borderBottom: i < 4 ? '1px solid var(--line)' : 'none', fontSize: 13, fontWeight: 500, color: '#374151', background: i % 2 === 0 ? '#fff' : '#FAFAF7' }}>
                    {row.scan}
                  </div>
                  <div key={row.scan + '-nhs'} style={{ padding: '14px 16px', borderBottom: i < 4 ? '1px solid var(--line)' : 'none', borderLeft: '1.5px solid var(--line)', fontSize: 13, color: '#EF4444', fontWeight: 500, background: i % 2 === 0 ? '#fff' : '#FAFAF7', textDecoration: 'line-through', textDecorationColor: '#EF4444' }}>
                    {row.nhs}
                  </div>
                  <div key={row.scan + '-sb'} style={{ padding: '14px 16px', borderBottom: i < 4 ? '1px solid var(--line)' : 'none', borderLeft: '1.5px solid var(--line)', fontSize: 13, color: 'var(--ink)', fontWeight: 700, fontStyle: 'italic', fontFamily: 'var(--serif)', background: i % 2 === 0 ? 'var(--ink-05)' : '#EBF2FA' }}>
                    {row.sb}
                  </div>
                </>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 10 }}>
              * NHS wait times sourced from NHS England referral-to-treatment statistics, 2024.
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED CENTRES ─── */}
      <section style={{ background: 'var(--paper)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Our partner centres</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2 }}>Featured imaging centres</h2>
            </div>
            <Link href="/search" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>
              View all centres →
            </Link>
          </div>

          <div className="centres-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {featured.map(clinic => (
              <Link
                key={clinic.id}
                href={`/clinics/${clinic.slug}`}
                className="centre-card"
                style={{
                  textDecoration: 'none', color: 'inherit', display: 'block',
                  border: '1.5px solid var(--line)', borderRadius: 16, overflow: 'hidden',
                  background: '#fff', transition: 'all .2s',
                }}
              >
                {/* Gradient image placeholder */}
                <div style={{
                  height: 160,
                  background: 'linear-gradient(135deg, var(--ink) 0%, var(--ink-3) 100%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px 22px',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                    {clinic.city}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#fff' }}>{clinic.name}</div>
                </div>

                <div style={{ padding: '18px 22px' }}>
                  {/* Capabilities */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {clinic.capabilities.slice(0, 4).map(cap => (
                      <span
                        key={cap}
                        style={{
                          fontSize: 10, padding: '3px 9px', borderRadius: 5,
                          background: 'var(--ink-05)', color: 'var(--ink)',
                          fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5,
                        }}
                      >
                        {cap.replace('_', ' ')}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>From</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--ink-3)', letterSpacing: -0.5 }}>£{clinic.priceFrom}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>★ {clinic.rating}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>{clinic.reviewCount} reviews</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, padding: '10px 0 0', borderTop: '1px solid var(--line)', fontSize: 12, fontWeight: 600, color: 'var(--ink)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>View centre</span>
                    <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ background: 'var(--ink-3)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.3)', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Simple process</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#fff', letterSpacing: -1.2 }}>From search to results in days</h2>
          </div>

          <div className="hiw-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { n: '01', title: 'Search', desc: 'Find your scan type and nearest centre. Filter by date, price and body part.', accent: true },
              { n: '02', title: 'Book & Pay', desc: 'Secure Stripe checkout. Instant confirmation to your email and patient portal.' },
              { n: '03', title: 'Attend',    desc: 'Visit the centre at your appointment time. Show your booking reference.' },
              { n: '04', title: 'Get results', desc: 'Radiologist report delivered to your secure portal within 24 hours.' },
            ].map((step, i) => (
              <div
                key={i}
                className="hiw-step"
                style={{
                  padding: '0 32px', textAlign: 'center',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,.08)' : 'none',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  border: `2px solid ${step.accent ? 'var(--accent)' : 'rgba(255,255,255,.15)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: 13, fontWeight: 700,
                  color: step.accent ? 'var(--accent)' : 'rgba(255,255,255,.5)',
                }}>
                  {step.n}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{step.title}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.65 }}>{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section style={{ background: 'var(--paper)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Patient reviews</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2 }}>What patients say</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink-3)' }}>4.9</div>
              <div>
                <div style={{ fontSize: 13, color: '#F59E0B', letterSpacing: -1 }}>★★★★★</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>2,418 reviews · Trustpilot</div>
              </div>
            </div>
          </div>

          <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              {
                name: 'Sarah M.',
                scan: 'MRI — Knee',
                text: "Booked at 9pm, had my scan at 8am the next day. Report was in my portal by lunchtime. Absolutely outstanding service — wish I'd found this sooner.",
                date: 'December 2024',
              },
              {
                name: 'James R.',
                scan: 'Baby Scan — 20 weeks',
                text: "We were so anxious before the anomaly scan. The sonographer was brilliant, took time to explain everything. Results were clear and reassuring. Highly recommend.",
                date: 'January 2025',
              },
              {
                name: 'Priya K.',
                scan: 'Full Body MRI',
                text: "Had the full body MRI for peace of mind. The report was incredibly detailed. My GP was actually impressed by the level of information. Worth every penny.",
                date: 'November 2024',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="review-card"
                style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16, padding: '24px 26px' }}
              >
                <div style={{ color: '#F59E0B', fontSize: 14, letterSpacing: -0.5, marginBottom: 14 }}>★★★★★</div>
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>"{review.text}"</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>{review.name}</div>
                    <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{review.scan}</div>
                  </div>
                  <div style={{ fontSize: 11, color: '#9CA3AF' }}>{review.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', padding: '100px 48px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 20 }}>Book today</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 80, color: 'var(--ink-3)', letterSpacing: -2.5, lineHeight: .94, marginBottom: 32 }}>
            Ready when<br /><em style={{ color: 'var(--ink)' }}>you are.</em>
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', lineHeight: 1.65, marginBottom: 40 }}>
            No GP referral needed. No waiting room. Just fast, accurate imaging from radiologists who care.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/search" style={{ padding: '15px 32px', background: 'var(--ink-3)', color: '#fff', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Find a scan →
            </Link>
            <Link href="/search" className="cta-btn-outline" style={{ padding: '15px 32px', background: 'transparent', color: 'var(--ink-3)', borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1.5px solid var(--line)', transition: 'background .15s' }}>
              Compare centres
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ─── MOBILE STICKY CTA ─── */}
      <style>{`
        @media (min-width: 769px) { .mobile-sticky { display: none !important; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
      <div className="mobile-sticky" style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
        background: 'var(--ink-3)', padding: '14px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid rgba(255,255,255,.1)',
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>6 centres free tomorrow</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 2 }}>No GP referral needed</div>
        </div>
        <Link href="/search" style={{ padding: '10px 20px', background: '#fff', color: 'var(--ink-3)', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          Book now →
        </Link>
      </div>
    </>
  )
}
