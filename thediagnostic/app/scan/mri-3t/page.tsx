import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MRI 3T Scan in Istanbul | From £320 | thediagnostic',
  description:
    'Book a 3 Tesla MRI scan in Istanbul from £320. Brain, spine, MSK, abdominal. Subspecialist report in English within 24 hours. Save 73% vs UK private.',
  keywords: [
    'MRI 3T Istanbul', 'MRI scan Turkey price', '3 Tesla MRI abroad', 'MRI scan cost UK',
    'private MRI scan Turkey', 'brain MRI Istanbul', 'spine MRI abroad', 'MRI 24 hour report',
    'NHS MRI waiting list', '3T vs 1.5T MRI',
  ],
  openGraph: {
    title: 'MRI 3T Scan in Istanbul from £320 | thediagnostic',
    description: 'Siemens 3 Tesla MRI at JCI-accredited Istanbul clinics. English report in 24 hours. Save 73% vs UK private. Available within 3–7 days.',
  },
};

// ─── Data ───────────────────────────────────────────────────

const PRICE_COMPARISON = [
  { country: '🇬🇧 UK Private',    price: '£900–£1,500',  wait: '2–6 weeks',  highlight: false },
  { country: '🇬🇧 NHS',           price: 'Free',          wait: '3–6 months', highlight: false },
  { country: '🇩🇪 Germany',       price: '€800–€1,200',  wait: '3–8 weeks',  highlight: false },
  { country: '🇹🇷 thediagnostic', price: 'From £320',    wait: '3–7 days',   highlight: true  },
];

const BODY_AREAS = [
  { icon: '🧠', title: 'Brain & Neurological', desc: 'MS plaques, stroke, epilepsy, brain tumours, white matter disease, vascular malformations. 3T provides superior small-lesion detection vs 1.5T.' },
  { icon: '🦴', title: 'Spine', desc: 'Cervical, thoracic, and lumbar spine. Disc herniation, spinal cord compression, nerve root assessment. Crystal-clear resolution at 3T.' },
  { icon: '🦵', title: 'MSK & Joints', desc: 'Knee, hip, shoulder, ankle, wrist. Ligament tears, cartilage damage, tendon pathology. 3T resolution allows detection of sub-5mm lesions.' },
  { icon: '🫃', title: 'Abdomen & Pelvis', desc: 'Liver, pancreas, kidneys, prostate, uterus. MRCP for bile duct assessment. No ionising radiation — ideal for repeated follow-up imaging.' },
  { icon: '🎀', title: 'Breast MRI', desc: 'High-sensitivity screening for women with BRCA or dense breast tissue. Staging of known breast cancer. Contrast-enhanced bilateral examination.' },
  { icon: '❤️', title: 'Cardiac MRI', desc: 'Myocardial function, viability, cardiomyopathy assessment, congenital heart disease. The gold standard for tissue characterisation in cardiology.' },
];

const THREE_T_VS_FIFTEEN = [
  { aspect: 'Spatial resolution',      t3: 'Superior (0.5–0.8 mm)',    t15: 'Standard (1–2 mm)' },
  { aspect: 'Signal-to-noise ratio',   t3: '2× higher',                t15: 'Baseline' },
  { aspect: 'Scan time',               t3: 'Shorter',                  t15: 'Longer' },
  { aspect: 'Small lesion detection',  t3: 'Excellent (< 3 mm)',       t15: 'Limited' },
  { aspect: 'Brain & spine detail',    t3: 'Exceptional',              t15: 'Good' },
  { aspect: 'Functional MRI (fMRI)',   t3: 'High quality',             t15: 'Standard' },
  { aspect: 'Spectroscopy',            t3: 'Enhanced',                 t15: 'Standard' },
];

const CLINICS = [
  {
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    city: 'Nişantaşı, Istanbul',
    device: 'Siemens MAGNETOM Vida 3T',
    deviceYear: 2022,
    priceGbp: 320,
    ukPriceGbp: 1100,
    saving: 71,
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
    device: 'Siemens MAGNETOM Prisma 3T',
    deviceYear: 2022,
    priceGbp: 380,
    ukPriceGbp: 1200,
    saving: 68,
    jci: true, iso: true,
    turnaround: '18 hours',
    rating: 4.8,
    lead: 'International Patient Centre',
    highlight: 'JCI Accredited · Research-grade Prisma',
    color: '#1B4F72',
  },
];

const SAFETY_INFO = [
  {
    q: 'Claustrophobia',
    a: 'Both clinics offer a wide-bore 3T scanner (70 cm bore). Mild sedation is available on request. Patients are in constant contact with the radiographer via intercom. Most patients who are concerned about claustrophobia manage well.',
  },
  {
    q: 'Metal implants',
    a: 'Most modern implants (knee replacements, hip prostheses, dental fillings, coronary stents) are MRI-compatible. Inform us at booking of any implants. Cochlear implants, certain cardiac devices, and metal fragments near eyes are contraindications — the team will advise.',
  },
  {
    q: 'Contrast agent (gadolinium)',
    a: 'Contrast is used for specific indications (e.g. brain tumours, MS, vascular lesions, liver characterisation). It is given by intravenous injection. Gadolinium contrast is safe in most patients; it is avoided in severe renal impairment and pregnancy.',
  },
];

const PREPARATION = [
  { step: '1', title: 'Booking', desc: 'Share your clinical indication and any previous imaging via the portal. Confirm if contrast is required. We will advise on fasting requirements — most MRI scans do not require fasting.' },
  { step: '2', title: 'On the Day', desc: 'Arrive 15 minutes early. Remove all metal jewellery, piercings, and watches before entering the scanning room. Wear comfortable clothing without metal zips.' },
  { step: '3', title: 'The Scan', desc: 'You will lie on the scanner table. The scan takes 30–60 minutes depending on the region. You will hear loud knocking noises — earplugs and/or headphones are provided.' },
  { step: '4', title: 'Your Report', desc: 'A subspecialist radiologist issues a detailed written report in English within 24 hours. Delivered via secure patient portal. DICOM images available for download.' },
];

const FAQS = [
  {
    q: 'Do I need contrast for my MRI scan?',
    a: 'It depends on the clinical question. Brain tumour assessment, MS monitoring, liver lesion characterisation, and vascular imaging typically require contrast. Routine spine, joint, and most abdominal MRI scans can be done without contrast. Confirm at booking and we will advise.',
  },
  {
    q: 'I am claustrophobic — can I still have a 3T MRI in Istanbul?',
    a: 'Yes. Both partner clinics use wide-bore 3T scanners (70 cm diameter). Mild oral sedation can be arranged in advance. Feet-first positioning is possible for many body areas. Our coordinators will discuss options with you before you travel.',
  },
  {
    q: 'Is it safe to have a 3T MRI during pregnancy?',
    a: 'MRI does not use ionising radiation and is generally considered safer than CT during pregnancy. However, gadolinium contrast is avoided during pregnancy. First-trimester MRI is generally reserved for clinically urgent indications. Inform us at booking and the radiologist will advise.',
  },
  {
    q: 'How quickly will I receive my MRI report?',
    a: 'All reports are issued by subspecialist radiologists and delivered in English within 24 hours of your scan. You receive the full written report plus a plain-language summary via our secure portal. DICOM images are available for download to share with your UK clinician.',
  },
  {
    q: 'Will my UK GP or specialist accept an MRI report from Turkey?',
    a: 'Yes. Turkish radiologists holding subspecialty qualifications produce reports that are clinically equivalent to those from UK radiologists. Our reports are in English with standard terminology. Most UK specialists accept these reports. If needed, we can arrange a second opinion from a UK-based radiologist for an additional fee.',
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function Mri3tPage() {
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
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>MRI 3T Scan</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.35)',
                  borderRadius: 100, padding: '5px 14px', marginBottom: 20,
                }}>
                  <span style={{ fontSize: 16 }}>🧲</span>
                  <span style={{ color: '#5DEDE0', fontSize: 13, fontWeight: 500 }}>Magnetic Resonance Imaging · 3 Tesla</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  color: '#fff', lineHeight: 1.1, marginBottom: 16,
                }}>
                  MRI 3T Scan in Istanbul<br />
                  <span style={{ color: '#5DEDE0' }}>From £320</span>
                </h1>

                <p style={{
                  fontSize: 18, color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.7, maxWidth: 560, marginBottom: 32,
                }}>
                  Siemens 3 Tesla MRI at JCI-accredited Istanbul clinics. Brain, spine, MSK,
                  abdominal, breast, and cardiac imaging. Subspecialist report in English within
                  24 hours. Save 73% vs UK private.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/book?scan=mri_3t" style={{
                    background: 'var(--accent)', color: '#fff',
                    padding: '13px 26px', borderRadius: 9,
                    fontSize: 16, fontWeight: 600,
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                  }}>
                    Book MRI 3T Scan →
                  </Link>
                  <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20an%20MRI%203T%20scan"
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
                  { label: 'From',          value: '£320',       accent: true },
                  { label: 'UK private avg', value: '£900–£1,500', accent: false },
                  { label: 'You save',      value: 'Up to 73%',  accent: true },
                  { label: 'Availability',  value: '3–7 days',   accent: false },
                  { label: 'Duration',      value: '45–60 min',  accent: false },
                  { label: 'Report in',     value: '24 hours',   accent: false },
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
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--primary)', marginBottom: 8 }}>
                MRI 3T Price Comparison
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                Same Siemens 3 Tesla technology — dramatically different price and waiting time.
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

        {/* ── WHAT CAN MRI 3T SCAN ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                CLINICAL APPLICATIONS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 10 }}>
                What Can MRI 3T Scan?
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 520, margin: '0 auto' }}>
                MRI provides high-resolution soft tissue imaging without ionising radiation — the preferred modality for a wide range of clinical investigations.
              </p>
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20,
            }}>
              {BODY_AREAS.map(item => (
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

        {/* ── 3T VS 1.5T ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                TECHNOLOGY
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 8 }}>
                Why 3T is Better Than 1.5T
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                3 Tesla MRI has twice the magnetic field strength of standard 1.5T scanners, delivering significantly better image quality — especially critical for detecting small lesions.
              </p>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--bg-2)', color: 'var(--text-muted)', fontWeight: 600 }}>Feature</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--accent-light)', color: 'var(--accent-2)', fontWeight: 700 }}>3T MRI</th>
                    <th style={{ textAlign: 'left', padding: '12px 16px', background: 'var(--bg-2)', color: 'var(--text-muted)', fontWeight: 600 }}>1.5T MRI</th>
                  </tr>
                </thead>
                <tbody>
                  {THREE_T_VS_FIFTEEN.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '13px 16px', fontWeight: 600, color: 'var(--text)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.aspect}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--accent-2)', fontWeight: 500, background: i % 2 === 0 ? '#f0fdf9' : '#e8f8f4' }}>✓ {row.t3}</td>
                      <td style={{ padding: '13px 16px', color: 'var(--text-muted)', background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>{row.t15}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── PARTNER CLINICS ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                ISTANBUL CLINICS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)' }}>
                Book Your MRI 3T Scan
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
                    <div style={{
                      display: 'inline-block', background: 'var(--bg-2)',
                      color: 'var(--accent-2)', borderRadius: 100,
                      padding: '4px 12px', fontSize: 12, fontWeight: 600, marginBottom: 16,
                    }}>
                      ✓ {clinic.highlight}
                    </div>

                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>MRI Device</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>
                      {clinic.device} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: 13 }}>({clinic.deviceYear})</span>
                    </div>

                    <div style={{
                      background: 'var(--bg-2)', borderRadius: 10, padding: '14px 18px',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
                    }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Price from</div>
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

                    <div style={{ display: 'flex', gap: 16, marginBottom: 20, fontSize: 13, color: 'var(--text-muted)' }}>
                      <span>⭐ {clinic.rating}/5</span>
                      <span>📄 Report: {clinic.turnaround}</span>
                    </div>

                    <Link href={`/clinics/${clinic.slug}?scan=mri_3t`} style={{
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

        {/* ── MRI SAFETY INFO ── */}
        <section style={{ padding: '72px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                SAFETY & SUITABILITY
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--primary)', marginBottom: 8 }}>
                Common MRI Safety Questions
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                MRI is safe for the vast majority of patients. Here is what you need to know before booking.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SAFETY_INFO.map((item, i) => (
                <div key={i} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 12, padding: 24,
                  display: 'flex', gap: 20,
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'var(--accent-light)', color: 'var(--accent-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>
                    {i === 0 ? '😮' : i === 1 ? '🔩' : '💉'}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: 15, marginBottom: 6 }}>
                      {item.q}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.7 }}>
                      {item.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                How to Prepare for Your MRI 3T
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
                MRI 3T Questions Answered
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
              Ready to Book Your MRI 3T?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Appointments available within 3–7 days. Subspecialist report in English within 24 hours.
              Save up to 73% vs UK private.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?scan=mri_3t" style={{
                background: '#fff', color: 'var(--primary)',
                borderRadius: 9, padding: '13px 26px',
                fontSize: 16, fontWeight: 700, display: 'inline-block',
              }}>
                Book MRI 3T Now →
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
