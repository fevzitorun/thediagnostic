// Shared template for all body part pages (MRI/CT/Ultrasound/X-Ray)
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/app/services/[slug]/FaqAccordion'
import type { BodyPartPage } from '@/lib/body-parts-content'

const SCAN_META: Record<string, { serviceSlug: string; serviceLabel: string; color: string; searchParam: string }> = {
  mri:        { serviceSlug: 'mri-scan',   serviceLabel: 'MRI Scan',     color: '#0F4C81', searchParam: 'mri' },
  ct:         { serviceSlug: 'ct-scan',    serviceLabel: 'CT Scan',      color: '#0A3A66', searchParam: 'ct' },
  xray:       { serviceSlug: 'x-ray',      serviceLabel: 'X-Ray',        color: '#374151', searchParam: 'xray' },
  ultrasound: { serviceSlug: 'ultrasound', serviceLabel: 'Ultrasound',   color: '#1E40AF', searchParam: 'ultrasound' },
}

export default function BodyPartPageTemplate({ page }: { page: BodyPartPage }) {
  const meta = SCAN_META[page.scanType]

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --ink: #0F4C81; --ink-2: #0A3A66; --ink-3: #082A4A;
          --ink-05: #E8F0F8; --accent: #EF4444;
          --paper: #FAFAF7; --paper-2: #F2F1EC;
          --line: #E5E1D8; --t: #1A1A1A; --m: #6B6B6B; --s: #9CA3AF;
          --serif: 'Instrument Serif', Georgia, serif;
        }
        body { font-family: 'DM Sans', system-ui, sans-serif; background: var(--paper); color: var(--t); -webkit-font-smoothing: antialiased; }

        .cond-card:hover { border-color: var(--ink) !important; }
        .cond-card { transition: border-color .15s; }
        .related-chip:hover { background: var(--ink-05) !important; border-color: var(--ink) !important; color: var(--ink) !important; }

        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .key-facts { position: static !important; }
          .cond-grid { grid-template-columns: 1fr !important; }
          .use-cases-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-h1 { font-size: 34px !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 28px !important; }
          .use-cases-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--line)', padding: '12px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 12, color: 'var(--s)', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: 'var(--s)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/services" style={{ color: 'var(--s)', textDecoration: 'none' }}>Services</Link>
          <span>›</span>
          <Link href={`/services/${meta.serviceSlug}`} style={{ color: 'var(--s)', textDecoration: 'none' }}>{meta.serviceLabel}</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{page.partName}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 680 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
              Private {meta.serviceLabel} — {page.partName}
            </p>
            <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 46, color: '#fff', letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>
              {page.h1}
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: 28, maxWidth: 560 }}>
              {page.intro.split('.')[0]}.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.15)', color: '#fff', fontWeight: 700 }}>
                From £{page.priceFrom}
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                ✓ No GP referral
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                {page.duration}
              </span>
              {page.scanType === 'mri' || page.scanType === 'ultrasound' ? (
                <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                  ✓ No radiation
                </span>
              ) : null}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href={`/search?type=${meta.searchParam}&part=${page.partSlug}`}
                style={{ padding: '13px 28px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                Book {page.partName} {meta.serviceLabel} →
              </Link>
              <Link
                href={`/services/${meta.serviceSlug}`}
                style={{ padding: '13px 22px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
              >
                About {meta.serviceLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO + KEY FACTS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 52, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Overview</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.2 }}>
              What does a {page.partName} {meta.serviceLabel} show?
            </h2>
            {page.intro.split('\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.8, marginBottom: 14 }}>{para}</p>
            ))}
          </div>

          {/* Quick facts */}
          <div className="key-facts" style={{ background: 'var(--ink-3)', borderRadius: 16, padding: '24px', position: 'sticky', top: 90 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>At a glance</p>
            {[
              { label: 'Price from', value: `£${page.priceFrom}` },
              { label: 'Duration', value: page.duration },
              { label: 'Results', value: page.scanType === 'ultrasound' ? '24 hours' : '48 hours' },
              { label: 'GP referral', value: 'Not required' },
              { label: 'Radiation', value: page.scanType === 'mri' || page.scanType === 'ultrasound' ? 'None' : 'Low dose' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,.08)', fontSize: 13 }}>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{item.label}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
            <Link
              href={`/search?type=${meta.searchParam}&part=${page.partSlug}`}
              style={{ display: 'block', padding: '12px 18px', background: '#fff', color: 'var(--ink-3)', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginTop: 4 }}
            >
              Book from £{page.priceFrom} →
            </Link>
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>What it detects</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
              Conditions identified by {page.partName} {meta.serviceLabel}
            </h2>
          </div>
          <div className="cond-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {page.conditions.map(c => (
              <div key={c.label} className="cond-card" style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 12, padding: '18px 20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{c.label}</div>
                <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO NEEDS IT */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Indications</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
            Who should book this scan?
          </h2>
        </div>
        <div className="use-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {page.whoNeedsIt.map(uc => (
            <div key={uc.title} style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '22px 20px' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{uc.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{uc.title}</div>
              <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{uc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING CTA (mid-page) */}
      <section style={{ background: 'var(--ink-3)', padding: '48px 48px', textAlign: 'center' }} className="page-pad">
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Skip the wait</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: '#fff', letterSpacing: -0.5, marginBottom: 12 }}>
          Book your {page.partName} {meta.serviceLabel} today
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
          Appointments typically available within 2–5 working days. No GP referral required.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/search?type=${meta.searchParam}&part=${page.partSlug}`}
            style={{ padding: '13px 32px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
          >
            Find a centre →
          </Link>
          <Link
            href="/search"
            style={{ padding: '13px 24px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
          >
            Compare prices
          </Link>
        </div>
      </section>

      {/* PREPARATION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 52 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Before your scan</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 24, lineHeight: 1.2 }}>
              How to prepare
            </h2>
            <ul style={{ listStyle: 'none' }}>
              {page.preparation.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, paddingBottom: 16, borderBottom: i < page.preparation.length - 1 ? '1px solid var(--line)' : 'none', marginBottom: i < page.preparation.length - 1 ? 16 : 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink)', flexShrink: 0, marginTop: 2 }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to expect steps */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Your appointment</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 24, lineHeight: 1.2 }}>
              What to expect
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { n: 1, t: 'Check in', d: 'Complete your safety questionnaire and confirmation of preparation (where applicable).' },
                { n: 2, t: 'Positioning', d: 'The radiographer positions you correctly and sets up any specialist equipment.' },
                { n: 3, t: 'The scan', d: `Your ${page.partName} ${meta.serviceLabel} takes approximately ${page.duration}.` },
                { n: 4, t: 'Your report', d: 'A consultant radiologist interprets your images and delivers your written report to your ScanBook portal.' },
              ].map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: i === 0 ? '#fff' : 'var(--ink)', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 4 }}>{s.t}</div>
                    <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>FAQs</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
              {page.partName} {meta.serviceLabel} — questions answered
            </h2>
          </div>
          <FaqAccordion faqs={page.faqs} />
        </div>
      </section>

      {/* RELATED */}
      {page.relatedParts.length > 0 && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Related scans</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {page.relatedParts.map(rel => (
              <Link
                key={rel.slug}
                href={`/${page.scanType === 'mri' ? 'mri-scan' : page.scanType === 'ct' ? 'ct-scan' : page.scanType === 'ultrasound' ? 'ultrasound' : 'x-ray'}/${rel.slug}`}
                className="related-chip"
                style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', transition: 'all .15s' }}
              >
                {rel.name} →
              </Link>
            ))}
            <Link
              href={`/services/${meta.serviceSlug}`}
              className="related-chip"
              style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', transition: 'all .15s' }}
            >
              All {meta.serviceLabel} scans →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
