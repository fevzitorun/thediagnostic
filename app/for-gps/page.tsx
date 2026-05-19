import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For GPs & Clinicians | Refer & Earn | ScanBook',
  description: 'Join the ScanBook GP referral programme. Refer patients to private imaging, earn 10% commission per booking, and track earnings in your secure portal.',
  alternates: { canonical: 'https://scanbook.co.uk/for-gps' },
}

const STEPS = [
  {
    n: '1',
    title: 'Register as a GP partner',
    desc: 'Create your free ScanBook GP account. We verify your GMC number and set up your commission wallet.',
    icon: '🩺',
  },
  {
    n: '2',
    title: 'Send a referral link',
    desc: 'Generate a personalised referral link for your patient from your dashboard. They book — you track it live.',
    icon: '🔗',
  },
  {
    n: '3',
    title: 'Earn 10% commission',
    desc: 'You earn 10% of every scan booked through your link, paid monthly to your bank account. No admin, no invoicing.',
    icon: '💷',
  },
]

const BENEFITS = [
  { icon: '⚡', title: 'Same-week appointments', desc: 'Your patients are seen in 2–5 days, not months. Faster diagnosis means faster treatment decisions.' },
  { icon: '📋', title: 'Full radiologist report', desc: 'Every scan includes a written report from a UK-qualified consultant radiologist — sent to your portal and theirs.' },
  { icon: '🔒', title: 'Secure GP portal', desc: 'Track all referrals, view results, and manage earnings from one dashboard. No extra software needed.' },
  { icon: '📞', title: 'Dedicated support line', desc: 'Clinical queries and urgent referral support from our UK-based team, Mon–Fri 9am–6pm.' },
]

const FAQS = [
  {
    q: 'Is this compliant with GMC and RCGP guidelines?',
    a: 'Yes. ScanBook operates within GMC guidance on financial arrangements. Commission is transparently disclosed and does not influence clinical advice. Our legal and compliance documentation is available on request.',
  },
  {
    q: 'How quickly are patients seen?',
    a: 'Most ScanBook partner centres offer appointments within 2–5 working days. Urgent referrals can often be accommodated same-day or next-day.',
  },
  {
    q: 'What scan types are available?',
    a: 'MRI, CT, Ultrasound, X-Ray, DEXA, Mammography, and specialist baby/pregnancy scans. Centres are distributed across the UK.',
  },
  {
    q: 'How and when is commission paid?',
    a: 'Commission is calculated at 10% of the net scan price and paid monthly via bank transfer. Your GP portal shows real-time earnings and a full transaction history.',
  },
  {
    q: 'Can I refer NHS patients?',
    a: 'Yes. Patients can self-pay privately even if they are also under NHS care. Many patients choose to self-refer to avoid long NHS waiting lists.',
  },
]

export default function ForGpsPage() {
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
        @media (max-width: 900px) {
          .two-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .hero-h1 { font-size: 36px !important; }
        }
        @media (max-width: 600px) {
          .hero-h1 { font-size: 28px !important; }
          .four-col { grid-template-columns: 1fr !important; }
          .page-pad { padding-left: 20px !important; padding-right: 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ background: 'linear-gradient(160deg, var(--ink-3) 0%, var(--ink-2) 60%, var(--ink) 100%)', padding: '80px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
                GP & Clinician Programme
              </p>
              <h1 className="hero-h1" style={{ fontFamily: 'var(--serif)', fontSize: 50, color: '#fff', letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>
                Refer patients to private imaging. Earn 10% every time.
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.75)', lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
                ScanBook works with GPs, practice nurses, physiotherapists, and other clinicians across the UK. Your patients skip the NHS queue; you earn a transparent commission with zero admin.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link
                  href="/register?role=gp"
                  style={{ padding: '14px 30px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
                >
                  Register as a GP partner →
                </Link>
                <Link
                  href="/gp/dashboard"
                  style={{ padding: '14px 22px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
                >
                  Sign in to GP portal
                </Link>
              </div>
            </div>

            {/* Earnings card */}
            <div style={{ background: 'rgba(255,255,255,.07)', border: '1.5px solid rgba(255,255,255,.12)', borderRadius: 20, padding: '32px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>Example earnings</p>
              {[
                { scan: 'MRI — 1 Body Part', price: '£455', commission: '£45.50' },
                { scan: 'CT Scan — 1 Area', price: '£525', commission: '£52.50' },
                { scan: 'Whole Body MRI', price: '£1,330', commission: '£133.00' },
                { scan: 'Prostate MRI (mpMRI)', price: '£1,080', commission: '£108.00' },
              ].map(row => (
                <div key={row.scan} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, marginBottom: 14, borderBottom: '1px solid rgba(255,255,255,.08)', fontSize: 13 }}>
                  <span style={{ color: 'rgba(255,255,255,.65)' }}>{row.scan}</span>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 11 }}>{row.price}</div>
                    <div style={{ color: '#86EFAC', fontWeight: 700 }}>{row.commission}</div>
                  </div>
                </div>
              ))}
              <div style={{ background: 'rgba(134,239,172,.1)', borderRadius: 10, padding: '14px 16px', marginTop: 4 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>If you refer 10 MRIs per month</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#86EFAC' }}>≈ £455 / month</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>paid monthly, no invoicing required</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: 'var(--paper-2)', borderBottom: '1.5px solid var(--line)', padding: '28px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { val: '10%', label: 'Commission per booking' },
            { val: 'Monthly', label: 'Payment cycle' },
            { val: '2–5 days', label: 'Average wait for patients' },
            { val: '48h', label: 'Report turnaround' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink-3)', fontFamily: 'var(--serif)' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'var(--m)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 48px' }} className="page-pad">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Simple process</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>How the GP programme works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="four-col">
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ position: 'relative', padding: '32px 28px', background: '#fff', border: '1.5px solid var(--line)', borderRadius: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? 'var(--accent)' : 'var(--ink-05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: i === 0 ? '#fff' : 'var(--ink)', marginBottom: 20 }}>
                {step.n}
              </div>
              <div style={{ fontSize: 26, marginBottom: 12 }}>{step.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10 }}>{step.title}</div>
              <p style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section style={{ background: 'var(--paper-2)', borderTop: '1.5px solid var(--line)', borderBottom: '1.5px solid var(--line)', padding: '72px 48px' }} className="page-pad">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Why GPs choose ScanBook</p>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Built for busy clinicians</h2>
          </div>
          <div className="four-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '24px 20px' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{b.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{b.title}</div>
                <p style={{ fontSize: 13, color: 'var(--m)', lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section style={{ background: 'var(--ink-3)', padding: '64px 48px', textAlign: 'center' }} className="page-pad">
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Join 200+ GP partners</p>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 36, color: '#fff', letterSpacing: -0.5, marginBottom: 14 }}>
          Start referring in under 5 minutes
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', maxWidth: 440, margin: '0 auto 32px' }}>
          Free to join. No monthly fee. Earn commission from your first referral.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/register?role=gp"
            style={{ padding: '14px 32px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}
          >
            Create GP account →
          </Link>
          <a
            href="mailto:gps@scanbook.co.uk"
            style={{ padding: '14px 24px', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: 10, fontSize: 14, fontWeight: 500, color: '#fff', textDecoration: 'none' }}
          >
            Talk to our team
          </a>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '72px 48px' }} className="page-pad">
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>FAQs</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 34, color: 'var(--ink-3)', letterSpacing: -0.5 }}>Questions from GPs</h2>
        </div>
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ borderBottom: '1.5px solid var(--line)', padding: '22px 0' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{faq.q}</div>
              <p style={{ fontSize: 14, color: 'var(--m)', lineHeight: 1.75 }}>{faq.a}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--m)' }}>
            More questions? Email us at{' '}
            <a href="mailto:gps@scanbook.co.uk" style={{ color: 'var(--ink)', fontWeight: 600, textDecoration: 'none' }}>gps@scanbook.co.uk</a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
