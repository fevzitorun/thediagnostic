import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner with ScanBook | List Your Imaging Centre',
  description: 'Join 200+ CQC-registered imaging centres on ScanBook. Fill unused scanner capacity with self-pay patients. No setup cost. Go live in 48 hours.',
  alternates: { canonical: 'https://scanbook.co.uk/partners' },
}

const BENEFITS = [
  {
    icon: '📅',
    title: 'Fill your spare capacity',
    desc: 'Self-pay patients book your empty scanner slots in real time, 24/7. Revenue from time you would otherwise lose.',
  },
  {
    icon: '⚡',
    title: 'Go live in 48 hours',
    desc: 'Send us your scan menu and pricing. We handle listing, SEO, patient management and payment processing.',
  },
  {
    icon: '💷',
    title: 'Transparent revenue share',
    desc: 'Simple, fair fee structure. No hidden charges, no exclusivity clauses. You retain the majority of every booking.',
  },
  {
    icon: '🔒',
    title: 'No exclusivity',
    desc: 'Continue working with your existing referral networks, insurers, and NHS contracts alongside ScanBook.',
  },
  {
    icon: '🧠',
    title: 'AI-powered triage',
    desc: 'Our triage assistant matches patients to the right scan type — and to the right centre. Qualified leads only.',
  },
  {
    icon: '📊',
    title: 'Clinic dashboard',
    desc: 'Manage your availability, view bookings, download patient forms and track earnings — all in one place.',
  },
]

const STEPS = [
  { n: '01', title: 'Submit your details', desc: 'Complete the short form below. Tell us about your centre, scan types, and pricing.' },
  { n: '02', title: 'We review & set you up', desc: 'Our team verifies your CQC registration and builds your listing within 48 hours.' },
  { n: '03', title: 'Go live & receive bookings', desc: 'Your centre appears in search results. Patients book directly — you confirm and deliver.' },
  { n: '04', title: 'Monthly settlement', desc: 'We transfer your earnings monthly. Full revenue breakdown in your clinic dashboard.' },
]

const FAQS = [
  {
    q: 'Do you work with NHS trusts and independent sector?',
    a: 'Yes. We work with independent imaging centres, NHS trust private patient units, and mobile scanning providers. Any CQC-registered provider of diagnostic imaging is eligible.',
  },
  {
    q: 'How is pricing set?',
    a: 'You set your own prices. ScanBook adds a transparent platform fee on top — patients see the all-inclusive price. You receive your full invoiced amount monthly.',
  },
  {
    q: 'What scan types can I list?',
    a: 'MRI, CT, Ultrasound (including obstetric), X-Ray, Mammography, DEXA, PET, and fluoroscopy. If you offer a scan type not listed, contact us and we\'ll add it.',
  },
  {
    q: 'Do patients need a GP referral?',
    a: 'ScanBook enables self-referral. Patients book directly without a GP letter. You may optionally require clinical questionnaire completion for certain scan types.',
  },
  {
    q: 'Can I control my availability?',
    a: 'Yes. Your clinic dashboard lets you open and close slots in real time, block dates, and set minimum notice periods. You have full control.',
  },
  {
    q: 'What happens if a patient cancels?',
    a: 'Our cancellation policy gives you 72-hour protected revenue for late cancellations. Standard refunds are handled by ScanBook — you are not involved in the dispute process.',
  },
]

export default function PartnersPage() {
  return (
    <>
      <style>{`
        :root {
          --ink: #0F4C81; --ink-3: #082A4A; --line: #E5E1D8;
          --paper: #FAFAF7; --paper-2: #F2F1EC;
          --serif: 'Instrument Serif', Georgia, serif;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--paper); -webkit-font-smoothing: antialiased; }
        .benefit-card:hover { border-color: var(--ink) !important; transform: translateY(-2px); transition: all .18s; }
        .form-input:focus { outline: none; border-color: var(--ink) !important; box-shadow: 0 0 0 3px rgba(15,76,129,.08); }
        @media (max-width: 768px) {
          .hero-h { font-size: 40px !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .page-pad { padding: 0 20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ─── HERO ─── */}
      <section style={{ background: 'var(--ink-3)', padding: '96px 0 80px' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,.1)', borderRadius: 20, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,.6)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 24 }}>
                For imaging centres
              </div>
              <h1 className="hero-h" style={{ fontFamily: 'var(--serif)', fontSize: 52, color: '#fff', letterSpacing: -1.8, lineHeight: 1.05, marginBottom: 20 }}>
                More patients.<br/>
                <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,.6)' }}>Less empty scanner time.</em>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,.65)', lineHeight: 1.7, marginBottom: 36, maxWidth: 460 }}>
                ScanBook connects your CQC-registered imaging centre with self-pay patients across the UK. No setup cost. Full price control. Go live in 48 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="#apply" style={{ padding: '14px 28px', background: '#fff', color: 'var(--ink-3)', borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
                  Apply to partner →
                </a>
                <a href="#how-it-works" style={{ padding: '14px 24px', border: '1.5px solid rgba(255,255,255,.25)', color: 'rgba(255,255,255,.8)', borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                  See how it works
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 20, border: '1px solid rgba(255,255,255,.1)', padding: '36px 32px' }}>
              {[
                { value: '200+', label: 'Imaging centres on platform' },
                { value: '£75', label: 'Lowest scan price (X-Ray)' },
                { value: '48h', label: 'Average time to go live' },
                { value: '24/7', label: 'Booking availability' },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#fff', letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)' }}>{s.label}</div>
                </div>
              )).slice(0, 3)}
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#fff', letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>24/7</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)' }}>Booking availability</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section style={{ background: '#fff', borderBottom: '1.5px solid var(--line)', padding: '20px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['CQC-registered providers only', 'GDPR compliant', 'ISO 27001 data security', 'Stripe-powered payments', 'UK-based support team'].map(t => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
              <span style={{ color: '#22C55E', fontSize: 16 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section style={{ background: 'var(--paper)', padding: '80px 0' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>Why list on ScanBook</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2 }}>Everything you need to grow private revenue</h2>
          </div>
          <div className="benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {BENEFITS.map(b => (
              <div
                key={b.title}
                className="benefit-card"
                style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 14, padding: '28px 24px', transition: 'all .18s' }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{b.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how-it-works" style={{ background: 'var(--paper-2)', padding: '80px 0', borderTop: '1.5px solid var(--line)' }}>
        <div className="page-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>Getting started</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: 'var(--ink-3)', letterSpacing: -1.2 }}>Live in 48 hours</h2>
          </div>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ position: 'relative' }}>
                {i < STEPS.length - 1 && (
                  <div style={{ position: 'absolute', top: 20, left: '60%', width: '80%', height: 1, background: 'var(--line)', zIndex: 0 }} />
                )}
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--ink-3)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, marginBottom: 16, position: 'relative', zIndex: 1 }}>
                  {s.n}
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.7 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" style={{ background: 'var(--paper)', padding: '80px 0', borderTop: '1.5px solid var(--line)' }}>
        <div className="page-pad two-col" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 48px', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80 }}>

          {/* Left copy */}
          <div style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>Start the conversation</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink-3)', letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 20 }}>
              Apply to list your imaging centre
            </h2>
            <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.7, marginBottom: 32 }}>
              Complete the form and a member of our partnerships team will contact you within one working day. No commitment required at this stage.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                '✓ No setup fees or listing costs',
                '✓ Go live in 48 hours',
                '✓ Full price control — you set your rates',
                '✓ Cancel anytime — no minimum term',
              ].map(t => (
                <div key={t} style={{ fontSize: 14, color: '#374151', fontWeight: 500 }}>{t}</div>
              ))}
            </div>

            <div style={{ marginTop: 40, padding: '20px', background: '#fff', borderRadius: 12, border: '1.5px solid var(--line)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)', marginBottom: 4 }}>Prefer to talk first?</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>Book a 20-minute call with our partnerships team.</div>
              <a href="mailto:partnerships@scanbook.co.uk?subject=Partnership enquiry" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>
                partnerships@scanbook.co.uk →
              </a>
            </div>
          </div>

          {/* Right form */}
          <PartnerApplicationForm />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section style={{ background: 'var(--paper-2)', padding: '80px 0', borderTop: '1.5px solid var(--line)' }}>
        <div className="page-pad" style={{ maxWidth: 720, margin: '0 auto', padding: '0 48px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 40, color: 'var(--ink-3)', letterSpacing: -1.2, marginBottom: 40 }}>
            Common questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {FAQS.map((f, i) => (
              <div key={f.q} style={{ padding: '24px 0', borderBottom: i < FAQS.length - 1 ? '1px solid var(--line)' : 'none' }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink-3)', marginBottom: 10 }}>{f.q}</div>
                <div style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section style={{ background: 'var(--ink-3)', padding: '80px 0' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 44, color: '#fff', letterSpacing: -1.2, marginBottom: 16 }}>
            Ready to fill your scanner?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', lineHeight: 1.7, marginBottom: 32 }}>
            Join the UK's fastest-growing private imaging network. CQC-verified. No exclusivity. Cancel anytime.
          </p>
          <a href="#apply" style={{ display: 'inline-block', padding: '15px 36px', background: '#fff', color: 'var(--ink-3)', borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>
            Apply to partner →
          </a>
        </div>
      </section>

      <Footer />
    </>
  )
}

function PartnerApplicationForm() {
  return (
    <form
      action="/api/partners/apply"
      method="POST"
      style={{ background: '#fff', border: '1.5px solid var(--line)', borderRadius: 18, padding: 36 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>First name *</label>
          <input name="firstName" required className="form-input" style={inputStyle} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Last name *</label>
          <input name="lastName" required className="form-input" style={inputStyle} />
        </div>
      </div>

      <FormField label="Job title *" name="jobTitle" required />
      <FormField label="Centre / organisation name *" name="centreName" required />
      <FormField label="Work email address *" name="email" type="email" required />
      <FormField label="Phone number" name="phone" type="tel" />
      <FormField label="Centre website (if any)" name="website" type="url" />
      <FormField label="CQC provider ID *" name="cqcId" required placeholder="e.g. 1-123456789" />

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
          City / region *
        </label>
        <select name="region" required className="form-input" style={inputStyle}>
          <option value="">Select…</option>
          {['London','Manchester','Birmingham','Edinburgh','Bristol','Leeds','Sheffield','Liverpool','Glasgow','Cardiff','Belfast','Leicester','Nottingham','Newcastle','Other'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 8 }}>
          Scan types you offer *
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {['MRI', 'CT', 'Ultrasound', 'X-Ray', 'Mammogram', 'DEXA', 'PET', 'Baby / Pregnancy Scan'].map(type => (
            <label key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151', cursor: 'pointer' }}>
              <input type="checkbox" name="scanTypes" value={type} style={{ accentColor: 'var(--ink)' }} />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
          Approximate number of scanner slots available per week
        </label>
        <select name="weeklySlots" className="form-input" style={inputStyle}>
          <option value="">Select…</option>
          {['1–5', '6–15', '16–30', '30+'].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
          Anything else you'd like us to know?
        </label>
        <textarea name="notes" rows={3} className="form-input" style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <button
        type="submit"
        style={{ width: '100%', padding: '14px', background: 'var(--ink-3)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
      >
        Submit application →
      </button>
      <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 12, textAlign: 'center', lineHeight: 1.6 }}>
        We'll contact you within 1 working day. No commitment at this stage.
        By submitting you agree to our <Link href="/privacy-policy" style={{ color: '#9CA3AF' }}>Privacy Policy</Link>.
      </p>
    </form>
  )
}

function FormField({ label, name, type = 'text', required = false, placeholder = '' }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="form-input" style={inputStyle} />
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1.5px solid var(--line)',
  borderRadius: 8, fontSize: 13, color: '#111', fontFamily: 'inherit',
  transition: 'border-color .15s, box-shadow .15s', boxSizing: 'border-box',
}
