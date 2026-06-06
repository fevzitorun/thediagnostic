// Shared template for all city pages (MRI/CT/Ultrasound/Pregnancy/Baby)
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from '@/app/services/[slug]/FaqAccordion'
import { CITIES } from '@/lib/cities-content'
import type { CityData, CityPageConfig } from '@/lib/cities-content'

interface CityPageProps {
  city: CityData
  config: CityPageConfig
  scanRouteKey: string
}

const BODY_PART_LINKS: Record<string, { slug: string; name: string }[]> = {
  'mri-scan': [
    { slug: 'knee',           name: 'Knee MRI' },
    { slug: 'lumbar-spine',   name: 'Lower Back MRI' },
    { slug: 'brain',          name: 'Brain MRI' },
    { slug: 'shoulder',       name: 'Shoulder MRI' },
    { slug: 'hip',            name: 'Hip MRI' },
    { slug: 'cervical-spine', name: 'Neck MRI' },
  ],
  'ct-scan': [
    { slug: 'chest',   name: 'CT Chest' },
    { slug: 'abdomen', name: 'CT Abdomen' },
  ],
  'ultrasound': [
    { slug: 'abdomen', name: 'Abdominal Ultrasound' },
    { slug: 'thyroid', name: 'Thyroid Ultrasound' },
  ],
}

export default function CityPageTemplate({ city, config, scanRouteKey }: CityPageProps) {
  const bodyParts = BODY_PART_LINKS[scanRouteKey] ?? []
  const otherCities = CITIES.filter(c => c.slug !== city.slug).slice(0, 10)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalProcedure',
        name: `Private ${config.scanName} in ${city.name}`,
        description: `Book a private ${config.scanName} in ${city.name} without a GP referral. Results within ${config.reportTime}.`,
        url: `https://scanbook.co.uk/${scanRouteKey}/${city.slug}`,
        procedureType: 'https://schema.org/DiagnosticProcedure',
        howPerformed: `A ${config.scanName} typically takes ${config.duration}. A UK consultant radiologist provides a written report within ${config.reportTime}.`,
      },
      {
        '@type': 'FAQPage',
        mainEntity: config.keyFaqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        .city-chip:hover { background: var(--ink-05) !important; border-color: var(--ink) !important; color: var(--ink) !important; }
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .key-facts { position: static !important; }
          .cond-grid { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .hero-h1 { font-size: 34px !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 28px !important; }
          .four-col { grid-template-columns: 1fr !important; }
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
          <Link href={`/services/${config.scanSlug}`} style={{ color: 'var(--s)', textDecoration: 'none' }}>{config.scanName}</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{city.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
              Private {config.scanName} · {city.name}
            </p>
            <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 48, color: '#fff', letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>
              Private {config.scanName} in {city.name}
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: 28, maxWidth: 580 }}>
              {city.nhsWait} Book a private appointment through ScanBook and be seen within days — no GP letter needed.
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.15)', color: '#fff', fontWeight: 700 }}>
                From £{config.priceFrom}
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                ✓ No GP referral
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                Results in {config.reportTime}
              </span>
              {config.radiationFree && (
                <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                  ✓ No radiation
                </span>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href={`/search?type=${config.searchParam}&location=${city.slug}`}
                style={{ padding: '13px 28px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                Find a centre in {city.name} →
              </Link>
              <Link
                href={`/services/${config.scanSlug}`}
                style={{ padding: '13px 22px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
              >
                About {config.scanName}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NHS WAIT BANNER */}
      <section style={{ background: '#FEF3C7', borderBottom: '1.5px solid #FDE68A', padding: '20px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⏱</span>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#92400E' }}>NHS waiting times in {city.region}: </span>
            <span style={{ fontSize: 14, color: '#78350F' }}>{city.nhsWait}</span>
          </div>
          <Link
            href={`/search?type=${config.searchParam}&location=${city.slug}`}
            style={{ padding: '8px 20px', background: '#92400E', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Book privately →
          </Link>
        </div>
      </section>

      {/* OVERVIEW + KEY FACTS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 52, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Overview</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.2 }}>
              Private {config.scanName} in {city.name}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.8, marginBottom: 16 }}>
              ScanBook connects you with accredited private imaging centres across {city.name} and {city.region}. All centres are CQC-registered, use NHS-grade equipment, and provide written reports from UK-qualified consultant radiologists.
            </p>
            <p style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.8, marginBottom: 28 }}>
              Unlike NHS imaging, you can book your {config.scanName} without a GP referral and choose a time that suits you — typically within 2–5 working days. Your results are delivered to your secure ScanBook portal, ready to share with any clinician.
            </p>

            <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Areas served in {city.name}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {city.areas.map(area => (
                <span key={area} style={{ padding: '6px 14px', background: 'var(--ink-05)', borderRadius: 20, fontSize: 12, fontWeight: 500, color: 'var(--ink-2)' }}>
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Quick facts panel */}
          <div className="key-facts" style={{ background: 'var(--ink-3)', borderRadius: 16, padding: '24px', position: 'sticky', top: 90 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>At a glance</p>
            {[
              { label: 'Price from',       value: `£${config.priceFrom}` },
              { label: 'Scan duration',    value: config.duration },
              { label: 'Results',          value: config.reportTime },
              { label: 'GP referral',      value: 'Not required' },
              { label: 'Availability',     value: '2–5 working days' },
              { label: `Centres in ${city.name}`, value: city.clinicCount },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12, borderBottom: '1px solid rgba(255,255,255,.08)', fontSize: 13 }}>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{item.label}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{item.value}</span>
              </div>
            ))}
            <Link
              href={`/search?type=${config.searchParam}&location=${city.slug}`}
              style={{ display: 'block', padding: '12px 18px', background: '#fff', color: 'var(--ink-3)', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none', textAlign: 'center', marginTop: 4 }}
            >
              Book from £{config.priceFrom} →
            </Link>
          </div>
        </div>
      </section>

      {/* KEY CONDITIONS */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>What it covers</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
              Common reasons for a {config.scanName} in {city.name}
            </h2>
          </div>
          <div className="cond-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {config.keyConditions.map(condition => (
              <div key={condition} className="cond-card" style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 12, padding: '18px 20px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="#0F4C81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-3)', lineHeight: 1.5 }}>{condition}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SCANBOOK */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Why ScanBook</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
            The smarter way to get a {config.scanName} in {city.name}
          </h2>
        </div>
        <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { icon: '⚡', title: 'Appointments in days', desc: `Typically 2–5 working days — not months. No long NHS imaging queue in ${city.name}.` },
            { icon: '🏥', title: `${city.clinicCount} local centres`, desc: `Compare accredited imaging centres across ${city.name} and ${city.region}. Choose the one nearest to you.` },
            { icon: '📋', title: 'No referral needed', desc: 'Self-refer directly through ScanBook. No GP appointment required beforehand.' },
            { icon: '🔬', title: 'Consultant radiologist report', desc: 'Every scan includes a written report from a UK-qualified consultant radiologist.' },
          ].map(item => (
            <div key={item.title} style={{ background: 'var(--paper-2)', border: '1.5px solid var(--line)', borderRadius: 14, padding: '24px 20px' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{item.title}</div>
              <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MID-PAGE CTA */}
      <section style={{ background: 'var(--ink-3)', padding: '56px 48px', textAlign: 'center' }} className="page-pad">
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Skip the NHS wait</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: '#fff', letterSpacing: -0.5, marginBottom: 12 }}>
          Book your {config.scanName} in {city.name} today
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', maxWidth: 480, margin: '0 auto 28px' }}>
          {city.clinicCount} accredited imaging centres in {city.name} and {city.region}. Appointments within days, not months.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/search?type=${config.searchParam}&location=${city.slug}`}
            style={{ padding: '13px 32px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
          >
            Find a centre in {city.name} →
          </Link>
          <Link
            href="/search"
            style={{ padding: '13px 24px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
          >
            Compare all prices
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>The process</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
            How to book a private {config.scanName} in {city.name}
          </h2>
        </div>
        <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: '1', title: 'Search', desc: `Filter by scan type, location, and price. Compare ${city.name} imaging centres side by side.` },
            { n: '2', title: 'Book online', desc: 'Choose your preferred time slot and pay securely. Instant confirmation sent to your email.' },
            { n: '3', title: 'Attend your scan', desc: `Visit your chosen imaging centre in ${city.name}. No GP letter required — just bring your booking confirmation.` },
            { n: '4', title: 'Receive results', desc: `Your consultant radiologist report is delivered to your ScanBook portal within ${config.reportTime}.` },
          ].map((step, i) => (
            <div key={step.n} style={{ textAlign: 'center', padding: '28px 16px' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: i === 0 ? '#fff' : 'var(--ink)', margin: '0 auto 16px' }}>
                {step.n}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{step.title}</div>
              <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>FAQs</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
              {config.scanName} in {city.name} — questions answered
            </h2>
          </div>
          <FaqAccordion faqs={config.keyFaqs} />
        </div>
      </section>

      {/* BODY PART INTERNAL LINKS */}
      {bodyParts.length > 0 && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 8 }}>
            {config.scanName} by body area
          </h2>
          <p style={{ fontSize: 14, color: 'var(--m)', marginBottom: 24 }}>
            Need a scan of a specific area? Browse our dedicated {config.scanName} pages.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {bodyParts.map(part => (
              <Link
                key={part.slug}
                href={`/${scanRouteKey}/${part.slug}`}
                className="city-chip"
                style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', transition: 'all .15s' }}
              >
                {part.name} →
              </Link>
            ))}
            <Link
              href={`/services/${config.scanSlug}`}
              className="city-chip"
              style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', transition: 'all .15s' }}
            >
              All {config.scanName} types →
            </Link>
          </div>
        </section>
      )}

      {/* OTHER CITIES */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', padding: '48px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 20 }}>
            Private {config.scanName} in other cities
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {otherCities.map(c => (
              <Link
                key={c.slug}
                href={`/${scanRouteKey}/${c.slug}`}
                className="city-chip"
                style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', transition: 'all .15s' }}
              >
                {config.scanName} in {c.name} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
