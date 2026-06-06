import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PET-CT Scan Abroad | From £1,200 | Istanbul, Turkey',
  description:
    'Book a PET-CT scan in Istanbul at a fraction of UK private prices. JCI-accredited clinics, subspecialist radiologists, English report within 24 hours. Save up to 70% vs UK.',
  keywords: [
    'PET CT scan Turkey', 'PET scan abroad', 'PET CT Istanbul', 'PET scan price UK',
    'NHS PET CT waiting list', 'private PET CT scan cost', 'full body PET CT abroad',
    'PET CT medical tourism Turkey',
  ],
  openGraph: {
    title: 'PET-CT Scan in Istanbul from £1,200 | thediagnostic',
    description: 'World-class PET-CT at JCI-accredited Turkish clinics. Save 70% vs UK private. Available within 3–7 days.',
  },
};

// ─── Data ───────────────────────────────────────────────────

const PRICE_COMPARISON = [
  { country: '🇬🇧 UK Private',    price: '£3,500–£5,000', wait: '2–8 weeks',   highlight: false },
  { country: '🇬🇧 NHS',           price: 'Free',           wait: '12–18 months', highlight: false },
  { country: '🇩🇪 Germany',       price: '€2,800–€4,200', wait: '4–10 weeks',  highlight: false },
  { country: '🇹🇷 thediagnostic', price: 'From £1,200',   wait: '3–7 days',    highlight: true  },
];

const WHAT_IT_DETECTS = [
  { icon: '🎗️', title: 'Cancer Detection & Staging', desc: 'Detects primary tumours and metastases across the whole body with exceptional sensitivity.' },
  { icon: '🫀', title: 'Cardiac Disease', desc: 'Assesses myocardial viability and blood flow — critical for treatment planning before surgery.' },
  { icon: '🧠', title: 'Neurological Disorders', desc: 'Alzheimer\'s, Parkinson\'s, epilepsy focus localisation and brain tumour assessment.' },
  { icon: '🔍', title: 'Treatment Monitoring', desc: 'Measures how well chemotherapy or radiotherapy is working — earlier and more accurately than CT alone.' },
  { icon: '⚠️', title: 'Unknown Primary', desc: 'Identifies the source of cancer when other imaging hasn\'t found it.' },
  { icon: '📊', title: 'Lymphoma Staging', desc: 'The gold standard for staging and restaging Hodgkin\'s and Non-Hodgkin\'s lymphoma.' },
];

const PREPARATION = [
  { step: '1', title: '6 Hours Before', desc: 'Fast — no food or sugary drinks. Plain water is fine. No strenuous exercise for 24 hours.' },
  { step: '2', title: 'Medications', desc: 'Take regular medications as normal, with water only. Inform us of all medications at booking.' },
  { step: '3', title: 'Diabetic Patients', desc: 'Special preparation required — contact us before booking for personalised guidance.' },
  { step: '4', title: 'On the Day', desc: 'Arrive 30 minutes early. Wear comfortable, loose clothing. No metal jewellery.' },
  { step: '5', title: 'The Scan', desc: 'Radiotracer injection → 60-minute uptake rest → 20–30 minute scan. Total: ~2 hours.' },
  { step: '6', title: 'After the Scan', desc: 'Drink plenty of water. Avoid close contact with pregnant women and young children for 6 hours.' },
];

const CLINICS = [
  {
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    city: 'Nişantaşı, Istanbul',
    device: 'Siemens Biograph mCT Flow',
    deviceYear: 2022,
    priceGbp: 1200,
    ukPriceGbp: 4000,
    saving: 70,
    jci: false, iso: true,
    turnaround: '24 hours',
    rating: 4.9,
    lead: 'Prof. Dr. Mustafa ÖZATEŞ',
    highlight: 'Most affordable · Fast appointment',
    color: '#17A589',
  },
  {
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    city: 'Maslak, Istanbul',
    device: 'GE Discovery MI PET/CT 4-ring',
    deviceYear: 2023,
    priceGbp: 1350,
    ukPriceGbp: 4500,
    saving: 70,
    jci: true, iso: true,
    turnaround: '18 hours',
    rating: 4.8,
    lead: 'International Patient Centre',
    highlight: 'JCI Accredited · Latest technology',
    color: '#1B4F72',
  },
];

const FAQS = [
  {
    q: 'Do I need a referral letter for a PET-CT scan in Turkey?',
    a: 'No referral is required to book through thediagnostic. However, you should share any relevant previous imaging and clinical history at the time of booking to ensure the radiologist can provide a clinically meaningful report.',
  },
  {
    q: 'How much does a PET-CT scan cost in Turkey compared to the UK?',
    a: 'A full-body PET-CT scan in Istanbul through thediagnostic starts from £1,200. The same scan at a UK private hospital typically costs £3,500–£5,000. That\'s a saving of up to 70%, not including any NHS waiting time.',
  },
  {
    q: 'How long does it take to get my PET-CT report?',
    a: 'All reports are issued by subspecialist nuclear medicine radiologists and delivered in English within 24 hours of your scan. You\'ll receive the report via our secure patient portal, along with an AI-generated plain-language summary.',
  },
  {
    q: 'Is it safe to fly after a PET-CT scan?',
    a: 'Yes — the radiotracer used (FDG) has a half-life of approximately 110 minutes and is essentially eliminated within hours. You can fly the same day. Some airport security scanners may detect residual radioactivity; we provide a medical certificate to show if required.',
  },
  {
    q: 'What is the difference between PET-CT and a normal CT scan?',
    a: 'A standard CT shows anatomy (structure). PET-CT adds metabolic information — it shows which cells are metabolically active (e.g. cancer cells consume glucose at a much higher rate). This combination provides far greater diagnostic accuracy, especially for cancer staging.',
  },
  {
    q: 'Can I add concierge services to my PET-CT booking?',
    a: 'Yes — our concierge add-on includes airport transfer, hotel near the clinic, and a medical translator if needed. Most patients from the UK fly to Istanbul for under £200 return, stay one night, and are home with their report before the end of the week.',
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function PetCtPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 60%, #17A589 100%)',
          padding: '80px 24px 64px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>
              {' / '}
              <Link href="/scan" style={{ color: 'rgba(255,255,255,0.5)' }}>Scan Types</Link>
              {' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>PET-CT Scan</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.35)',
                  borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                }}>
                  <span style={{ fontSize: 16 }}>🔬</span>
                  <span style={{ color: '#5DEDE0', fontSize: 13, fontWeight: 500 }}>Nuclear Medicine · PET-CT</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  color: '#fff', lineHeight: 1.1, marginBottom: 16,
                }}>
                  PET-CT Scan Abroad<br />
                  <span style={{ color: '#5DEDE0' }}>From £1,200</span>
                </h1>

                <p style={{
                  fontSize: 18, color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7, maxWidth: 560, marginBottom: 32,
                }}>
                  World-class PET-CT at JCI-accredited clinics in Istanbul.
                  No NHS waiting list. Subspecialist radiologist report in English within 24 hours.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/book?scan=pet_ct" style={{
                    background: 'var(--accent)', color: '#fff',
                    padding: '13px 26px', borderRadius: 9,
                    fontSize: 16, fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    Book PET-CT Scan →
                  </Link>
                  <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20a%20PET-CT%20scan"
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
                  { label: 'From', value: '£1,200', accent: true },
                  { label: 'UK private avg', value: '£4,000', accent: false },
                  { label: 'You save', value: 'Up to 70%', accent: true },
                  { label: 'Availability', value: '3–7 days', accent: false },
                  { label: 'Report in', value: '24 hours', accent: false },
                  { label: 'Duration', value: '~2 hours', accent: false },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{item.label}</span>
                    <span style={{
                      fontSize: 14, fontWeight: 600,
                      color: item.accent ? '#5DEDE0' : '#fff',
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--primary-3)', marginBottom: 8 }}>
                PET-CT Price Comparison
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Same world-class technology — dramatically different price and waiting time.
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
                    color: row.highlight ? 'var(--accent-2)' : row.wait.includes('month') ? 'var(--danger, #C0392B)' : 'var(--text-muted)',
                    fontWeight: row.highlight ? 600 : 400,
                  }}>
                    ⏱ {row.wait}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT PET-CT DETECTS ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                CLINICAL APPLICATIONS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary-3)', marginBottom: 10 }}>
                What PET-CT Can Detect
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
                PET-CT combines metabolic (PET) and anatomical (CT) data — detecting disease at cellular level before structural changes appear.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
            }}>
              {WHAT_IT_DETECTS.map(item => (
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

        {/* ── PARTNER CLINICS ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                ISTANBUL CLINICS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary-3)' }}>
                Book Your PET-CT at These Clinics
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: 24 }}>
              {CLINICS.map(clinic => (
                <div key={clinic.slug} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 16, overflow: 'hidden',
                }}>
                  {/* Color band */}
                  <div style={{ background: clinic.color, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: '#fff' }}>{clinic.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{clinic.city}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      {clinic.jci && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 4 }}>JCI</span>}
                      {clinic.iso && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 11 }}>ISO</span>}
                    </div>
                  </div>

                  <div style={{ padding: 24 }}>
                    {/* Highlight badge */}
                    <div style={{
                      display: 'inline-block', background: 'var(--bg-2)',
                      color: 'var(--accent-2)', borderRadius: 100,
                      padding: '4px 12px', fontSize: 12, fontWeight: 600, marginBottom: 16,
                    }}>
                      ✓ {clinic.highlight}
                    </div>

                    {/* Device */}
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>PET-CT Device</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>
                      {clinic.device} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: 13 }}>({clinic.deviceYear})</span>
                    </div>

                    {/* Price row */}
                    <div style={{
                      background: 'var(--bg-2)', borderRadius: 10, padding: '14px 18px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Price</div>
                        <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--primary)' }}>£{clinic.priceGbp.toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>UK private avg</div>
                        <div style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: 14 }}>£{clinic.ukPriceGbp.toLocaleString()}</div>
                        <div style={{ background: 'var(--accent-light)', color: 'var(--accent-2)', borderRadius: 100, padding: '2px 8px', fontSize: 12, fontWeight: 700, display: 'inline-block', marginTop: 2 }}>
                          Save {clinic.saving}%
                        </div>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 13, color: 'var(--text-muted)' }}>
                      <span>⭐ {clinic.rating}/5</span>
                      <span>📄 Report: {clinic.turnaround}</span>
                    </div>

                    <Link href={`/clinics/${clinic.slug}?scan=pet_ct`} style={{
                      display: 'block', textAlign: 'center',
                      background: clinic.color, color: '#fff',
                      borderRadius: 9, padding: '11px 0',
                      fontSize: 15, fontWeight: 600,
                    }}>
                      Book at {clinic.name} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PREPARATION GUIDE ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                PATIENT GUIDE
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary-3)' }}>
                How to Prepare for Your PET-CT
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary-3)' }}>
                PET-CT Questions Answered
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
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-2) 100%)',
            borderRadius: 20, padding: '52px 40px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: '#fff', marginBottom: 12 }}>
              Ready to Book Your PET-CT?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Appointments available within 3–7 days. Subspecialist report in English within 24 hours.
              Save up to 70% vs UK private.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?scan=pet_ct" style={{
                background: '#fff', color: 'var(--primary)',
                borderRadius: 9, padding: '13px 26px',
                fontSize: 16, fontWeight: 700, display: 'inline-block',
              }}>
                Book PET-CT Now →
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
