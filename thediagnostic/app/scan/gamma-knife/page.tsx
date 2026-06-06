import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'GammaKnife Treatment in Istanbul | From £6,500 | thediagnostic',
  description:
    'Non-invasive stereotactic radiosurgery for brain tumours in Istanbul. Save 68% vs UK. Leksell Gamma Knife Icon at Acıbadem Maslak. Same-day procedure.',
  keywords: [
    'GammaKnife Istanbul', 'stereotactic radiosurgery Turkey', 'Gamma Knife brain tumour',
    'GammaKnife price UK', 'radiosurgery abroad', 'brain tumour treatment Turkey',
    'Leksell Gamma Knife Icon', 'GammaKnife cost NHS', 'non-invasive brain surgery Istanbul',
  ],
  openGraph: {
    title: 'GammaKnife Treatment in Istanbul from £6,500 | thediagnostic',
    description: 'Non-invasive stereotactic radiosurgery at Acıbadem Maslak. Leksell Gamma Knife Icon. Save 68% vs UK private. Same-day procedure.',
  },
};

// ─── Data ───────────────────────────────────────────────────

const PRICE_COMPARISON = [
  { country: '🇬🇧 UK Private',    price: '£20,000–£25,000', wait: '4–8 weeks',    highlight: false },
  { country: '🇬🇧 NHS',           price: 'Free',             wait: '18–24 months', highlight: false },
  { country: '🇩🇪 Germany',       price: '£12,000–£18,000', wait: '4–10 weeks',   highlight: false },
  { country: '🇹🇷 thediagnostic', price: 'From £6,500',     wait: '3–14 days',    highlight: true  },
];

const CONDITIONS = [
  { icon: '🧠', title: 'Brain Tumours', desc: 'Primary and secondary brain tumours including glioblastoma, glioma, and metastatic lesions — treated without a single incision.' },
  { icon: '🔀', title: 'Arteriovenous Malformations (AVM)', desc: 'Abnormal connections between arteries and veins in the brain — GammaKnife progressively obliterates the AVM over 2–3 years.' },
  { icon: '👂', title: 'Acoustic Neuroma', desc: 'Benign tumour on the acoustic nerve. GammaKnife halts growth and preserves hearing better than surgery in many cases.' },
  { icon: '🫧', title: 'Meningioma', desc: 'Slow-growing tumours arising from the meninges. GammaKnife is effective for meningiomas up to 3 cm, avoiding open craniotomy.' },
  { icon: '⚡', title: 'Trigeminal Neuralgia', desc: 'Severe facial pain caused by nerve compression. GammaKnife delivers precise radiation to the trigeminal nerve root for lasting pain relief.' },
  { icon: '🔵', title: 'Brain Metastases', desc: 'Secondary tumours that have spread to the brain from lung, breast, melanoma or other primaries. Treat up to 10 lesions in a single session.' },
];

const HOW_IT_WORKS = [
  { step: '1', title: 'Initial Consultation', desc: 'Review of your existing MRI/CT scans by a neurosurgeon and radiation oncologist. Treatment plan agreed. Most patients do not need additional imaging before the visit.' },
  { step: '2', title: 'Planning CT / MRI', desc: 'High-resolution MRI and/or CT is taken with a stereotactic frame or thermoplastic mask in place. The coordinates of the target are mapped with sub-millimetre accuracy.' },
  { step: '3', title: 'Treatment Day', desc: 'The Leksell Gamma Knife Icon delivers 192 cobalt-60 beams simultaneously to the target. The procedure itself takes 20 minutes to 2 hours depending on the lesion. No general anaesthesia.' },
  { step: '4', title: 'Follow-up MRI', desc: 'An MRI scan is typically scheduled at 3 and 6 months to assess response. Most patients fly home the same day or the next morning.' },
];

const CLINIC = {
  slug: 'acibadem-maslak-istanbul',
  name: 'Acıbadem Maslak Hospital',
  city: 'Maslak, Istanbul',
  device: 'Leksell Gamma Knife Icon',
  deviceYear: 2021,
  priceGbp: 6500,
  ukPriceGbp: 20000,
  saving: 68,
  jci: true, iso: true,
  turnaround: 'Same-day discharge',
  rating: 4.8,
  lead: 'Department of Neurosurgery & Radiation Oncology',
  highlight: 'JCI Accredited · Leksell Icon (2021)',
  color: '#1B4F72',
};

const VS_SURGERY = [
  { aspect: 'Incision',         gammaKnife: 'None',                surgery: 'Craniotomy required' },
  { aspect: 'Anaesthesia',      gammaKnife: 'Not required',        surgery: 'General anaesthesia' },
  { aspect: 'Hospital stay',    gammaKnife: 'Outpatient / 1 night',surgery: '5–10 days' },
  { aspect: 'Sessions',         gammaKnife: '1–3 sessions',        surgery: 'Single major operation' },
  { aspect: 'Recovery time',    gammaKnife: '1–2 days',            surgery: '4–8 weeks' },
  { aspect: 'Infection risk',   gammaKnife: 'None',                surgery: 'Present' },
  { aspect: 'Precision',        gammaKnife: '< 0.5 mm accuracy',   surgery: 'Surgeon-dependent' },
  { aspect: 'Fly same day',     gammaKnife: 'Yes',                 surgery: 'No' },
];

const PREPARATION = [
  { step: '1', title: 'Remote Consultation', desc: 'Send your existing MRI or CT scans via our portal. A neurosurgeon and radiation oncologist will review them and confirm GammaKnife suitability within 48 hours.' },
  { step: '2', title: 'Pre-treatment Imaging', desc: 'High-resolution planning MRI is performed on the day of treatment. No additional imaging trip is required in most cases.' },
  { step: '3', title: 'Frame or Mask Fitting', desc: 'A lightweight thermoplastic mask or stereotactic head frame is fitted to ensure precise, reproducible positioning throughout treatment.' },
  { step: '4', title: 'Treatment', desc: '192 cobalt-60 beams converge on the target simultaneously. Duration: 20 minutes to 2 hours. You are awake, comfortable, and can communicate with the team.' },
  { step: '5', title: 'Post-treatment Monitoring', desc: 'Brief observation (1–2 hours). Most patients experience minimal to no side effects and are discharged the same day.' },
  { step: '6', title: 'Follow-up MRI', desc: 'Arranged at 3 months (and 6 months). Report shared in English. Your UK oncologist or GP receives a copy.' },
];

const FAQS = [
  {
    q: 'Do I need a GP or oncologist referral to access GammaKnife through thediagnostic?',
    a: 'No formal referral is required to start the process. However, you should share all relevant imaging (MRI, CT) and any biopsy reports when you enquire. The neurosurgery team will assess suitability and the team may request additional information from your UK specialist.',
  },
  {
    q: 'Is it safe to fly back to the UK after GammaKnife treatment?',
    a: 'Yes. GammaKnife treatment does not involve surgery, radioactive tracers, or general anaesthesia. The vast majority of patients fly home the same day or the next morning. Your team will advise based on your specific case.',
  },
  {
    q: 'How many GammaKnife sessions will I need?',
    a: 'Most patients require 1–3 sessions (fractions). Single-session treatment (radiosurgery) is standard for most brain metastases, acoustic neuromas, and meningiomas. Larger or more complex lesions may be treated with 3–5 fractions (hypofractionated stereotactic radiotherapy) using the same machine.',
  },
  {
    q: 'Can GammaKnife be used instead of NHS radiotherapy?',
    a: 'GammaKnife is a form of stereotactic radiosurgery — distinct from conventional radiotherapy. It is used for specific brain lesions where high-precision treatment is needed. It does not replace whole-brain radiotherapy. Your oncologist can advise whether GammaKnife is clinically appropriate for your case.',
  },
  {
    q: 'What are the side effects of GammaKnife treatment?',
    a: 'Side effects are generally mild and temporary: fatigue, mild headache, or nausea for 24–48 hours. Radiation-induced oedema (swelling) can occasionally occur weeks later and is usually managed with a short course of corticosteroids. Serious side effects are rare when treatment is performed at an experienced centre.',
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function GammaKnifePage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #1B4F72 55%, #7D3C98 100%)',
          padding: '80px 24px 64px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>
              {' / '}
              <Link href="/scan" style={{ color: 'rgba(255,255,255,0.5)' }}>Scan Types</Link>
              {' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>GammaKnife</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(230,126,34,0.2)', border: '1px solid rgba(230,126,34,0.4)',
                  borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                }}>
                  <span style={{ fontSize: 16 }}>🎯</span>
                  <span style={{ color: '#F0A868', fontSize: 13, fontWeight: 500 }}>Stereotactic Radiosurgery · GammaKnife</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  color: '#fff', lineHeight: 1.1, marginBottom: 16,
                }}>
                  GammaKnife in Istanbul<br />
                  <span style={{ color: '#F5C97A' }}>From £6,500</span>
                </h1>

                <p style={{
                  fontSize: 18, color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7, maxWidth: 560, marginBottom: 32,
                }}>
                  Non-invasive brain radiosurgery at Acıbadem Maslak — Istanbul's leading
                  neuroscience centre. Leksell Gamma Knife Icon. No scalpel, no anaesthesia,
                  no hospital stay. Save 68% vs UK private.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/book?scan=gamma_knife" style={{
                    background: '#E67E22', color: '#fff',
                    padding: '13px 26px', borderRadius: 9,
                    fontSize: 16, fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    Book GammaKnife Consultation →
                  </Link>
                  <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20GammaKnife%20treatment"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: '#25D366', color: '#fff',
                      padding: '13px 26px', borderRadius: 9,
                      fontSize: 16, fontWeight: 500,
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Ask on WhatsApp
                  </a>
                </div>
              </div>

              {/* Quick info card */}
              <div style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16, padding: 28, minWidth: 220,
              }}>
                {[
                  { label: 'From',          value: '£6,500',         accent: true },
                  { label: 'UK private avg', value: '£20,000–£25,000', accent: false },
                  { label: 'You save',      value: 'Up to 68%',      accent: true },
                  { label: 'Availability',  value: '3–14 days',      accent: false },
                  { label: 'Procedure',     value: 'Same day',       accent: false },
                  { label: 'Anaesthesia',   value: 'Not required',   accent: false },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                    <span style={{
                      fontSize: 14, fontWeight: 600,
                      color: item.accent ? '#F5C97A' : '#fff',
                    }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICE COMPARISON ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--primary)', marginBottom: 8 }}>
                GammaKnife Price Comparison
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Same Leksell technology used worldwide — dramatically different price and waiting time.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {PRICE_COMPARISON.map(row => (
                <div key={row.country} style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 16, alignItems: 'center',
                  background: row.highlight ? 'linear-gradient(90deg, var(--accent-light) 0%, #fff 100%)' : '#fff',
                  border: row.highlight ? '2px solid var(--accent)' : '1px solid var(--line)',
                  borderRadius: 12, padding: '18px 24px',
                }}>
                  <div style={{ fontWeight: row.highlight ? 700 : 500, color: row.highlight ? 'var(--accent-2)' : 'var(--text)', fontSize: 15 }}>
                    {row.country}
                    {row.highlight && (
                      <span style={{ marginLeft: 8, background: 'var(--accent)', color: '#fff', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                        BEST VALUE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: row.highlight ? 'var(--accent-2)' : 'var(--text)' }}>
                    {row.price}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: row.highlight ? 'var(--accent-2)' : row.wait.includes('month') ? '#C0392B' : 'var(--text-muted)',
                    fontWeight: row.highlight ? 600 : 400,
                  }}>
                    ⏱ {row.wait}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT IS GAMMAKNIFE ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                CLINICAL APPLICATIONS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 10 }}>
                What is GammaKnife Treated For?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
                GammaKnife delivers 192 beams of precisely focused radiation to a target with sub-millimetre accuracy — destroying abnormal tissue without touching the surrounding brain.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
            }}>
              {CONDITIONS.map(item => (
                <div key={item.title} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 24,
                  display: 'flex', gap: 16,
                }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--primary)', marginBottom: 6 }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PATIENT JOURNEY
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                How GammaKnife Works
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              {HOW_IT_WORKS.map((item, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 14, padding: 24, textAlign: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1B4F72, #17A589)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 18, margin: '0 auto 16px',
                  }}>
                    {item.step}
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 15, marginBottom: 8 }}>
                    {item.title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PARTNER CLINIC ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ marginBottom: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                ISTANBUL CLINIC
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                Book Your GammaKnife Treatment
              </h2>
            </div>

            <div style={{
              background: '#fff', border: '1px solid var(--line)',
              borderRadius: 16, overflow: 'hidden',
            }}>
              {/* Color band */}
              <div style={{ background: CLINIC.color, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: '#fff' }}>{CLINIC.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{CLINIC.city}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {CLINIC.jci && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 4 }}>JCI</span>}
                  {CLINIC.iso && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 11 }}>ISO</span>}
                </div>
              </div>

              <div style={{ padding: 24 }}>
                <div style={{
                  display: 'inline-block', background: 'var(--bg-2)',
                  color: 'var(--accent-2)', borderRadius: 100,
                  padding: '4px 12px', fontSize: 12, fontWeight: 600, marginBottom: 16,
                }}>
                  ✓ {CLINIC.highlight}
                </div>

                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>GammaKnife Device</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>
                  {CLINIC.device} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: 13 }}>({CLINIC.deviceYear})</span>
                </div>

                <div style={{
                  background: 'var(--bg-2)', borderRadius: 10, padding: '14px 18px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Price</div>
                    <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--primary)' }}>£{CLINIC.priceGbp.toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>UK private avg</div>
                    <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: 14 }}>£{CLINIC.ukPriceGbp.toLocaleString()}</div>
                    <div style={{ background: 'var(--accent-light)', color: 'var(--accent-2)', borderRadius: 100, padding: '2px 8px', fontSize: 12, fontWeight: 700, display: 'inline-block', marginTop: 2 }}>
                      Save {CLINIC.saving}%
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 13, color: 'var(--text-muted)' }}>
                  <span>⭐ {CLINIC.rating}/5</span>
                  <span>🏥 {CLINIC.turnaround}</span>
                  <span>👨‍⚕️ {CLINIC.lead}</span>
                </div>

                <Link href={`/clinics/${CLINIC.slug}?scan=gamma_knife`} style={{
                  display: 'block', textAlign: 'center',
                  background: CLINIC.color, color: '#fff',
                  borderRadius: 9, padding: '11px 0',
                  fontSize: 15, fontWeight: 600,
                }}>
                  Book at {CLINIC.name} →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── GAMMAKNIFE VS SURGERY ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                TREATMENT COMPARISON
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 8 }}>
                GammaKnife vs Open Brain Surgery
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                For eligible patients, GammaKnife offers equivalent or superior local control with dramatically less risk and recovery time.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--bg-2)', color: 'var(--text-muted)', fontWeight: 600, borderRadius: '8px 0 0 0' }}>Aspect</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--accent-light)', color: 'var(--accent-2)', fontWeight: 700 }}>GammaKnife</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--bg-2)', color: 'var(--text-muted)', fontWeight: 600, borderRadius: '0 8px 0 0' }}>Open Surgery</th>
                  </tr>
                </thead>
                <tbody>
                  {VS_SURGERY.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--text)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.aspect}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--accent-2)', fontWeight: 500, background: i % 2 === 0 ? '#f0fdf9' : '#e8f8f4' }}>✓ {row.gammaKnife}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--text-muted)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.surgery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.6 }}>
              * GammaKnife is not suitable for all brain lesions. Suitability is assessed on a case-by-case basis by the neurosurgery team based on lesion size, location, and histology.
            </p>
          </div>
        </section>

        {/* ── PREPARATION ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PATIENT GUIDE
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                What to Expect — Step by Step
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {PREPARATION.map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 20, alignItems: 'flex-start',
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 20,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'var(--accent-light)', color: 'var(--accent-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 16, flexShrink: 0,
                  }}>
                    {item.step}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 15, marginBottom: 4 }}>
                      {item.title}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                FAQ
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                GammaKnife Questions Answered
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 24,
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 15, marginBottom: 10 }}>
                    Q: {faq.q}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                    {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{
            maxWidth: 700, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, #1a1a2e 0%, #1B4F72 60%, #7D3C98 100%)',
            borderRadius: 20, padding: '52px 40px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#fff', marginBottom: 12 }}>
              Ready to Discuss GammaKnife Treatment?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Send us your MRI and we will arrange a remote consultation with the neurosurgery team
              within 48 hours. Appointments available within 3–14 days. Save up to 68% vs UK private.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?scan=gamma_knife" style={{
                background: '#E67E22', color: '#fff',
                borderRadius: 9, padding: '13px 26px',
                fontSize: 16, fontWeight: 700, display: 'inline-block',
              }}>
                Book GammaKnife Consultation →
              </Link>
              <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: '#fff',
                  borderRadius: 9, padding: '13px 26px',
                  fontSize: 16, fontWeight: 600, display: 'inline-block',
                }}>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
