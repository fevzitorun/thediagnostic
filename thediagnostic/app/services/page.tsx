import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES } from '@/lib/services-content'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Private Medical Imaging Services | ScanBook',
  description: 'Book private MRI, CT, ultrasound, X-ray, mammogram, baby scan and more — no GP referral required. Results within 24–48 hours across the UK.',
}

const VISIBLE = SERVICES.filter(s => !['cardiac-ct'].includes(s.slug))

const WHY_CARDS = [
  { icon: '⚡', title: 'Appointments within days', desc: 'Not weeks or months. Most of our partner centres can see you within 1–5 working days.' },
  { icon: '📋', title: 'No GP referral needed', desc: 'Self-refer for any scan via ScanBook. No permission slip required.' },
  { icon: '🔬', title: 'Consultant radiologists', desc: 'Every scan is reported by a UK-registered consultant radiologist — not a technician.' },
  { icon: '🔒', title: 'Your data, secured', desc: 'GDPR-compliant platform. Your images and reports are stored securely in your patient portal.' },
]

const POPULAR = [
  { label: 'Knee MRI', href: '/search?type=mri&part=knee', price: '£275' },
  { label: 'Brain MRI', href: '/search?type=mri&part=brain', price: '£295' },
  { label: 'Lumbar Spine MRI', href: '/search?type=mri&part=lumbar-spine', price: '£285' },
  { label: 'Abdominal Ultrasound', href: '/search?type=ultrasound&part=abdomen', price: '£99' },
  { label: 'Chest CT', href: '/search?type=ct&part=chest', price: '£195' },
  { label: 'Early Pregnancy Scan', href: '/search?type=pregnancy&part=early', price: '£89' },
  { label: 'Gender Reveal Scan', href: '/search?type=baby-scan&part=gender', price: '£79' },
  { label: 'Screening Mammogram', href: '/search?type=mammogram', price: '£175' },
  { label: 'Bone Density (DEXA)', href: '/search?type=dexa', price: '£149' },
  { label: 'Full Body MRI', href: '/services/full-body-mri', price: '£795' },
  { label: 'Shoulder MRI', href: '/search?type=mri&part=shoulder', price: '£275' },
  { label: 'Thyroid Ultrasound', href: '/search?type=ultrasound&part=thyroid', price: '£109' },
]

export default function ServicesPage() {
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

        .svc-card { background: #fff; border: 1.5px solid var(--line); border-radius: 16px; padding: 28px; display: flex; flex-direction: column; transition: box-shadow .2s, transform .2s; }
        .svc-card:hover { box-shadow: 0 8px 32px rgba(15,76,129,.1); transform: translateY(-2px); }
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .popular-pill:hover { background: var(--ink-05) !important; border-color: var(--ink) !important; color: var(--ink) !important; }

        @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .svc-grid { grid-template-columns: 1fr; } .hero-h1 { font-size: 36px !important; } }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '80px 48px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          Private Medical Imaging
        </p>
        <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 52, color: '#fff', letterSpacing: -1, lineHeight: 1.1, marginBottom: 20, maxWidth: 700, margin: '0 auto 20px' }}>
          Every scan you need,<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.8)' }}>faster than the NHS</em>
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,.7)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px' }}>
          Book private MRI, CT, ultrasound, X-ray and more — no GP referral required. Results reported by a consultant radiologist within 24–48 hours.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/search" style={{ padding: '14px 32px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Find a scan →
          </Link>
          <Link href="/search" style={{ padding: '14px 32px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 15, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
            View centres
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, justifyContent: 'center', marginTop: 52, flexWrap: 'wrap' }}>
          {[
            { n: 'From £75', l: 'Starting price' },
            { n: '48h', l: 'Typical report time' },
            { n: '4.9 ★', l: 'Average rating' },
            { n: 'No referral', l: 'Self-refer online' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: '#fff', letterSpacing: -0.5 }}>{s.n}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Our services</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink-3)', letterSpacing: -0.5 }}>All the scans you need</h2>
        </div>

        <div className="svc-grid">
          {VISIBLE.map(svc => (
            <div key={svc.slug} className="svc-card">
              <div style={{ fontSize: 36, marginBottom: 16 }}>{svc.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 6 }}>{svc.name}</div>
              <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6, flexGrow: 1, marginBottom: 20 }}>{svc.description}</p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: 'var(--ink-05)', color: 'var(--ink)' }}>
                  From £{svc.priceFrom}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#F0FDF4', color: '#166534' }}>
                  Results {svc.reportHours}
                </span>
                {svc.radiationFree && (
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: '#F0FDF4', color: '#166534' }}>
                    No radiation
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <Link
                  href={`/services/${svc.slug}`}
                  style={{ flex: 1, padding: '10px', border: '1.5px solid var(--line)', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', textAlign: 'center' }}
                >
                  Learn more
                </Link>
                <Link
                  href={`/search?type=${svc.slug}`}
                  style={{ flex: 1, padding: '10px', background: 'var(--ink-3)', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', textAlign: 'center' }}
                >
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPULAR SEARCHES */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '56px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Popular scans</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Most booked this month</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {POPULAR.map(p => (
              <Link
                key={p.href}
                href={p.href}
                className="popular-pill"
                style={{ padding: '10px 18px', border: '1.5px solid var(--line)', borderRadius: 24, fontSize: 13, fontWeight: 500, color: 'var(--t)', textDecoration: 'none', background: '#fff', display: 'flex', alignItems: 'center', gap: 8, transition: 'all .15s' }}
              >
                {p.label}
                <span style={{ fontSize: 12, color: 'var(--ink)', fontWeight: 700 }}>{p.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SCANBOOK */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Why ScanBook</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 14 }}>Better than waiting</h2>
          <p style={{ fontSize: 16, color: 'var(--m)', maxWidth: 520, margin: '0 auto' }}>
            NHS imaging waiting times now average 12–18 weeks. ScanBook connects you to accredited private centres — usually within days.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
          {WHY_CARDS.map(c => (
            <div key={c.title} style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16, padding: '28px 24px' }}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NHS WAITING TIME COMPARISON */}
      <section style={{ background: 'var(--ink-3)', padding: '72px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>The wait gap</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: '#fff', letterSpacing: -0.5, marginBottom: 16 }}>
            The NHS waits. <em>We don&apos;t.</em>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.6)', marginBottom: 48, lineHeight: 1.7 }}>
            Average NHS diagnostic imaging waits in England have risen to 12–18 weeks for many scan types. Private scans through ScanBook are typically available within days.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, textAlign: 'left' }}>
            {[
              { scan: 'MRI Scan', nhs: '12–18 weeks', sb: '2–5 days' },
              { scan: 'CT Scan', nhs: '8–14 weeks', sb: '1–3 days' },
              { scan: 'Ultrasound', nhs: '6–12 weeks', sb: '1–3 days' },
            ].map(row => (
              <div key={row.scan} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '20px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 14 }}>{row.scan}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>NHS wait</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#FCA5A5' }}>{row.nhs}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>ScanBook</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#86EFAC' }}>{row.sb}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link href="/search" style={{ display: 'inline-block', padding: '14px 36px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
              Book your scan today →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '72px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Common questions</h2>
        </div>

        {[
          { q: 'Do I need a GP referral to book a scan?', a: 'No. ScanBook allows self-referral for all the scans listed on this page. You can book directly without seeing a GP first.' },
          { q: 'How quickly can I get an appointment?', a: 'Most of our partner centres can offer appointments within 1–5 working days. Availability varies by scan type and location.' },
          { q: 'Will the radiologist report go to my GP?', a: 'Your report is delivered to your ScanBook patient portal. You can choose to share it with your GP, specialist, or any other clinician.' },
          { q: 'Are your centres CQC registered?', a: 'Yes. All ScanBook partner imaging centres are registered with the Care Quality Commission (CQC) or equivalent national regulators in devolved nations.' },
          { q: 'What if I need to cancel or reschedule?', a: 'Cancellations made more than 48 hours before your appointment receive a full refund. Cancellations within 48 hours may be subject to a £35 rebooking fee.' },
          { q: 'Can I use private medical insurance?', a: 'Many of our partner centres accept major UK insurers including Bupa, AXA Health, Aviva, and Vitality. Contact the centre directly to confirm your policy details before booking.' },
        ].map((faq, i) => (
          <div key={i} style={{ borderBottom: '1.5px solid var(--line)', padding: '20px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 8 }}>{faq.q}</div>
            <div style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.7 }}>{faq.a}</div>
          </div>
        ))}
      </section>

      {/* CTA STRIP */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', padding: '56px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5, marginBottom: 12 }}>
          Ready to book?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--m)', marginBottom: 28 }}>
          Find a centre near you and book your scan in under 5 minutes.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/search" style={{ padding: '13px 32px', background: 'var(--ink-3)', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
            Search centres →
          </Link>
          <Link href="/clinics" style={{ padding: '13px 28px', border: '1.5px solid var(--line)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>
            Browse all clinics
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
