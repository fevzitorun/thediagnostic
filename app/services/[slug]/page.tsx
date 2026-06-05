import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FaqAccordion from './FaqAccordion'
import { getService, getRelatedServices, getAllServiceSlugs } from '@/lib/services-content'
import type { Metadata } from 'next'

interface PageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllServiceSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const svc = getService(slug)
  if (!svc) return {}
  return {
    title: `Private ${svc.name} | From £${svc.priceFrom} | No GP Referral | ScanBook`,
    description: `${svc.description} No GP referral required. Results ${svc.reportHours}. Book online today.`,
    alternates: { canonical: `https://scanbook.co.uk/services/${slug}` },
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const svc = getService(slug)
  if (!svc) notFound()

  const related = getRelatedServices(slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: svc.name,
    description: svc.description,
    procedureType: 'Diagnostic',
    bodyLocation: svc.name,
    url: `https://scanbook.co.uk/services/${slug}`,
    provider: {
      '@type': 'MedicalOrganization',
      name: 'ScanBook',
      url: 'https://scanbook.co.uk',
    },
    ...(svc.faqs.length > 0 && {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: svc.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    }),
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

        .bp-chip { display: inline-block; padding: 8px 14px; border: 1.5px solid var(--line); border-radius: 8px; font-size: 13px; color: var(--t); text-decoration: none; background: #fff; transition: all .15s; }
        .bp-chip:hover { border-color: var(--ink); color: var(--ink); background: var(--ink-05); }
        .related-card:hover { box-shadow: 0 4px 20px rgba(15,76,129,.1); transform: translateY(-2px); }
        .related-card { transition: box-shadow .2s, transform .2s; }

        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .hero-price-row { flex-direction: column; gap: 12px !important; }
          .hero-h1 { font-size: 38px !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 30px !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .use-cases-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr !important; }
          .variants-grid { grid-template-columns: 1fr !important; }
          .packages-grid { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: 'var(--paper-2)', borderBottom: '1px solid var(--line)', padding: '12px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 6, fontSize: 12, color: 'var(--s)', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--s)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link href="/services" style={{ color: 'var(--s)', textDecoration: 'none' }}>Services</Link>
          <span>›</span>
          <span style={{ color: 'var(--ink)' }}>{svc.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ maxWidth: 700 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
              Private {svc.name}
            </p>
            <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 48, color: '#fff', letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 }}>
              {svc.name}
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', lineHeight: 1.7, marginBottom: 28, maxWidth: 580 }}>
              {svc.description}
            </p>

            {/* Badges */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.15)', color: '#fff', fontWeight: 600 }}>
                From £{svc.priceFrom}
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                Results {svc.reportHours}
              </span>
              <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                {svc.scanDuration}
              </span>
              {svc.radiationFree && (
                <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(134,239,172,.15)', color: '#86EFAC', fontWeight: 600 }}>
                  ✓ Radiation-free
                </span>
              )}
              {!svc.requiresReferral && (
                <span style={{ fontSize: 12, padding: '5px 14px', borderRadius: 20, background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.8)', fontWeight: 500 }}>
                  No GP referral
                </span>
              )}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                href={`/search?type=${svc.slug}`}
                style={{ padding: '13px 28px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
              >
                Book {svc.shortName} →
              </Link>
              <Link
                href="/search"
                style={{ padding: '13px 24px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 600, color: '#fff', textDecoration: 'none' }}
              >
                Find a centre
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 48px' }} className="page-pad">
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>About this scan</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 24, lineHeight: 1.2 }}>
              What is a {svc.name}?
            </h2>
            {svc.whatIs.text.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--m)', lineHeight: 1.8, marginBottom: 16 }}>{para}</p>
            ))}
          </div>

          {/* Key facts panel */}
          <div style={{ background: 'var(--ink-3)', borderRadius: 18, padding: '28px', position: 'sticky', top: 90 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 18 }}>Key facts</p>
            <ul style={{ listStyle: 'none' }}>
              {svc.whatIs.keyFacts.map((fact, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'rgba(255,255,255,.85)', lineHeight: 1.5, paddingBottom: i < svc.whatIs.keyFacts.length - 1 ? 14 : 0, marginBottom: i < svc.whatIs.keyFacts.length - 1 ? 14 : 0, borderBottom: i < svc.whatIs.keyFacts.length - 1 ? '1px solid rgba(255,255,255,.08)' : 'none' }}>
                  <span style={{ color: '#86EFAC', flexShrink: 0, marginTop: 1 }}>✓</span>
                  {fact}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)' }}>
              <Link
                href={`/search?type=${svc.slug}`}
                style={{ display: 'block', padding: '12px 20px', background: '#fff', color: 'var(--ink-3)', borderRadius: 9, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
              >
                Book {svc.shortName} from £{svc.priceFrom} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHO NEEDS IT */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '64px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Indications</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Who needs this scan?</h2>
          </div>
          <div className="use-cases-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {svc.whoNeedsIt.map(uc => (
              <div key={uc.title} style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '22px 20px' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{uc.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{uc.title}</div>
                <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY PARTS / VARIANTS / PATHWAYS / PACKAGES */}
      {svc.type === 'body_part' && svc.bodyPartGroups && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Areas covered</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>What area do you need scanned?</h2>
          </div>
          {svc.bodyPartGroups.map(group => (
            <div key={group.group} style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--s)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
                {group.group}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.parts.map(part => (
                  <Link
                    key={part.slug}
                    href={`/search?type=${svc.slug}&part=${part.slug}`}
                    className="bp-chip"
                  >
                    {part.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {svc.type === 'variant' && svc.variants && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Scan types</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Choose your scan</h2>
          </div>
          <div className="variants-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {svc.variants.map(v => (
              <Link
                key={v.id}
                href={`/search?type=${svc.slug}&part=${v.id}`}
                style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '20px', textDecoration: 'none', display: 'block', transition: 'border-color .15s' }}
              >
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{v.label}</div>
                <div style={{ fontSize: 12, color: 'var(--s)', marginBottom: 12 }}>{v.prepNote}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>From £{v.priceFrom}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {(svc.type === 'pathway') && (svc.pathways ?? []).length > 0 && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Packages</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Choose your scan</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {(svc.pathways ?? []).map(p => (
              <Link
                key={p.id}
                href={`/search?type=${svc.slug}&part=${p.id}`}
                style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '22px 24px', textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, transition: 'border-color .15s' }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)' }}>{p.label}</span>
                    {p.ageRange && (
                      <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 20, background: 'var(--ink-05)', color: 'var(--ink)', fontWeight: 600 }}>
                        {p.ageRange}
                      </span>
                    )}
                    {p.durationHint && (
                      <span style={{ fontSize: 11, color: 'var(--s)' }}>{p.durationHint}</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>From £{p.priceFrom}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink)', marginTop: 4 }}>Book →</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {svc.type === 'package' && svc.packages && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Packages</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Choose your package</h2>
          </div>
          <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
            {svc.packages.map((pkg, i) => (
              <div
                key={pkg.id}
                style={{ background: '#fff', border: `1.5px solid ${i === 0 ? 'var(--line)' : i === 1 ? 'var(--ink)' : 'var(--line)'}`, borderRadius: 16, padding: '26px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
              >
                {i === 1 && (
                  <div style={{ position: 'absolute', top: 14, right: 14, fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: 'var(--ink)', color: '#fff', letterSpacing: 1, textTransform: 'uppercase' }}>
                    Popular
                  </div>
                )}
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{pkg.label}</div>
                <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6, marginBottom: 16, flexGrow: 1 }}>{pkg.desc}</p>
                <ul style={{ listStyle: 'none', marginBottom: 20 }}>
                  {pkg.includes.map(inc => (
                    <li key={inc} style={{ fontSize: 13, color: 'var(--m)', paddingBottom: 6, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ color: '#166534', flexShrink: 0 }}>✓</span>
                      {inc}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1.5px solid var(--line)' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink-3)' }}>From £{pkg.priceFrom}</div>
                  <Link
                    href={`/search?type=${svc.slug}&package=${pkg.id}`}
                    style={{ padding: '10px 20px', background: 'var(--ink-3)', color: '#fff', borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: 'none' }}
                  >
                    Book →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WHAT TO EXPECT */}
      <section style={{ background: 'var(--ink-3)', padding: '72px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Your appointment</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: '#fff', letterSpacing: -0.5 }}>What to expect</h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {svc.whatToExpect.map((step, i) => (
              <div key={step.step} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '24px 20px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: i === 0 ? '#EF4444' : 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 14 }}>
                  {step.step}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{step.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREPARATION */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 48px' }} className="page-pad">
        <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Before your scan</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 28, lineHeight: 1.2 }}>
              How to prepare
            </h2>
            <ul style={{ listStyle: 'none' }}>
              {svc.preparation.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, paddingBottom: 18, borderBottom: i < svc.preparation.length - 1 ? '1px solid var(--line)' : 'none', marginBottom: i < svc.preparation.length - 1 ? 18 : 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink)', flexShrink: 0, marginTop: 2 }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.7 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking CTA card */}
          <div style={{ background: 'var(--paper-2)', border: '1.5px solid var(--line)', borderRadius: 20, padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
            <div style={{ fontSize: 36 }}>{svc.icon}</div>
            <div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 8 }}>
                Ready to book?
              </div>
              <p style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.7 }}>
                Book your private {svc.name.toLowerCase()} online in under 5 minutes. No GP referral. Appointments typically within {svc.scanDuration.includes('60') ? 'days' : '2–5 days'}.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Link
                href={`/search?type=${svc.slug}`}
                style={{ display: 'block', padding: '13px 24px', background: 'var(--ink-3)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}
              >
                Find a centre & book →
              </Link>
              <Link
                href="/search"
                style={{ display: 'block', padding: '13px 24px', border: '1.5px solid var(--line)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', textAlign: 'center', background: '#fff' }}
              >
                Compare all centres
              </Link>
            </div>
            <div style={{ fontSize: 12, color: 'var(--s)', textAlign: 'center' }}>
              From £{svc.priceFrom} · Results {svc.reportHours}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '72px 48px' }} className="page-pad">
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>FAQs</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>
              {svc.name} — common questions
            </h2>
          </div>
          <FaqAccordion faqs={svc.faqs} />
        </div>
      </section>

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 48px' }} className="page-pad">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Related services</h2>
          </div>
          <div className="related-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {related.map(rel => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="related-card"
                style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16, padding: '24px', textDecoration: 'none', display: 'block' }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{rel.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{rel.name}</div>
                <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.5, marginBottom: 14 }}>{rel.description}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>From £{rel.priceFrom} →</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
