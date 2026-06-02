import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Acıbadem Maslak Hospital Istanbul | PET-CT, PET-MRI, GammaKnife from £320 | thediagnostic',
  description:
    'Book PET-CT, PET-MRI, GammaKnife, MRI 3T and more at Acıbadem Maslak Hospital, Istanbul. JCI Accredited. International Patient Centre. Reports in English. From £320.',
  keywords: [
    'Acıbadem Maslak',
    'PET CT Istanbul',
    'PET MRI Istanbul',
    'GammaKnife Istanbul',
    'JCI accredited hospital Turkey',
    'medical imaging Istanbul',
    'scan abroad Turkey',
  ],
};

// ─── Data ────────────────────────────────────────────────────

const CLINIC = {
  name: 'Acıbadem Maslak Hospital',
  slug: 'acibadem-maslak-istanbul',
  city: 'Istanbul, Turkey',
  address: 'Büyükdere Cad. No:40, Maslak, Sarıyer, İstanbul',
  phone: '+90 212 304 4444',
  email: 'international@acibadem.com.tr',
  heroColor: '#1B4F72',
  jci: true,
  iso: true,
  himss: true,
  rating: 4.9,
  reviewCount: 214,
  founded: '2009',
  languages: ['Turkish', 'English', 'Arabic', 'Russian', 'German'],
  about:
    'Acıbadem Maslak Hospital is one of Turkey\'s flagship JCI-accredited tertiary care hospitals, purpose-built to international standards. Located in Maslak — Istanbul\'s modern business and medical district — the hospital houses a world-class nuclear medicine and radiology department equipped with the latest GE and Siemens platforms. A dedicated International Patient Centre provides end-to-end support for overseas visitors, from visa assistance to bedside translation. All imaging reports are delivered in English within 24 hours by subspecialist radiologists and nuclear medicine physicians.',
};

const SCANS = [
  {
    code: 'pet_ct',
    icon: '🔬',
    name: 'PET-CT Scan',
    device: 'GE Discovery MI',
    deviceYear: 2022,
    priceGbp: 1350,
    priceEur: 1580,
    ukPriceGbp: 4500,
    savingPct: 70,
    durationMin: 90,
    available: true,
    description: 'Full-body oncology PET-CT. FDG, PSMA and DOTATATE tracers available.',
    href: '/scan/pet-ct',
  },
  {
    code: 'pet_mri',
    icon: '🧲',
    name: 'PET-MRI',
    device: 'Siemens Biograph mMR',
    deviceYear: 2021,
    priceGbp: 1850,
    priceEur: 2160,
    ukPriceGbp: 7000,
    savingPct: 74,
    durationMin: 120,
    available: true,
    description: 'Simultaneous PET and MRI for superior soft-tissue oncology and neurology staging. Zero additional CT radiation.',
    href: '/scan/pet-mri',
  },
  {
    code: 'gammaknife',
    icon: '🎯',
    name: 'GammaKnife Radiosurgery',
    device: 'Leksell Gamma Knife Icon',
    deviceYear: 2020,
    priceGbp: 6500,
    priceEur: 7600,
    ukPriceGbp: 18000,
    savingPct: 64,
    durationMin: 180,
    available: true,
    description: 'Non-invasive stereotactic radiosurgery for brain tumours, AVM and trigeminal neuralgia. Single-session treatment.',
    href: '/scan/gammaknife',
  },
  {
    code: 'mri_3t',
    icon: '🫧',
    name: 'MRI 3T',
    device: 'Siemens MAGNETOM Prisma',
    deviceYear: 2023,
    priceGbp: 380,
    priceEur: 445,
    ukPriceGbp: 1300,
    savingPct: 71,
    durationMin: 60,
    available: true,
    description: 'Brain, spine, MSK, cardiac, abdominal and pelvic MRI. Contrast and spectroscopy available.',
    href: '/scan/mri-3t',
  },
  {
    code: 'mri_whole_body',
    icon: '🫁',
    name: 'Whole Body MRI',
    device: 'Siemens MAGNETOM Prisma',
    deviceYear: 2023,
    priceGbp: 1100,
    priceEur: 1285,
    ukPriceGbp: 3800,
    savingPct: 71,
    durationMin: 90,
    available: true,
    description: 'Head-to-toe cancer screening with zero ionising radiation.',
    href: '/scan/whole-body-mri',
  },
  {
    code: 'spect_ct',
    icon: '💫',
    name: 'SPECT-CT',
    device: 'GE Discovery NM/CT 670',
    deviceYear: 2021,
    priceGbp: 720,
    priceEur: 840,
    ukPriceGbp: 2400,
    savingPct: 70,
    durationMin: 90,
    available: true,
    description: 'Bone scans, thyroid scintigraphy, cardiac perfusion (MPI), renal DMSA and MAG3.',
    href: '/scan/spect-ct',
  },
  {
    code: 'ct_angio',
    icon: '🫀',
    name: 'CT Angiography',
    device: 'Siemens SOMATOM Force',
    deviceYear: 2022,
    priceGbp: 320,
    priceEur: 375,
    ukPriceGbp: 950,
    savingPct: 66,
    durationMin: 45,
    available: true,
    description: 'Coronary, pulmonary, carotid and peripheral vascular CT angiography.',
    href: '/scan/ct-angio',
  },
];

const ACCREDITATIONS = [
  {
    code: 'JCI',
    name: 'JCI Accredited',
    desc: 'Joint Commission International — global gold standard for hospital quality',
    icon: '🏆',
    highlight: true,
  },
  {
    code: 'ISO',
    name: 'ISO 9001:2015',
    desc: 'Quality Management System certified',
    icon: '✅',
    highlight: false,
  },
  {
    code: 'HIMSS',
    name: 'HIMSS Stage 6',
    desc: 'Advanced Electronic Medical Records & digital workflow',
    icon: '💻',
    highlight: false,
  },
  {
    code: 'EN',
    name: 'English Reports',
    desc: '24-hour turnaround guaranteed for international patients',
    icon: '📄',
    highlight: false,
  },
];

const INTL_SERVICES = [
  {
    icon: '🌍',
    title: 'International Patient Coordinator',
    desc: 'A dedicated coordinator is assigned before your trip. They handle all logistics, pre-scan preparation instructions and scheduling.',
  },
  {
    icon: '🛂',
    title: 'Visa & Travel Assistance',
    desc: 'Official invitation letters for Turkish medical visa applications. Guidance on e-Visa and border requirements for UK, EU and GCC nationals.',
  },
  {
    icon: '🗣️',
    title: 'Professional Interpreters',
    desc: 'In-person interpreters available in English, Arabic, Russian and German. No need to rely on machine translation during consultations.',
  },
  {
    icon: '🛏️',
    title: 'Private Patient Rooms',
    desc: 'Hotel-standard private en-suite rooms for patients staying overnight or wishing to rest post-procedure.',
  },
];

const TESTIMONIALS = [
  {
    name: 'James R.',
    location: 'Manchester, UK',
    scan: 'PET-CT (GE Discovery MI)',
    rating: 5,
    text: 'I was quoted £4,200 on the NHS waiting list — 14 weeks away. Acıbadem had me scanned within four days of booking. The English-speaking coordinator met me at arrivals, the PET-CT facility was immaculate and my oncologist in Manchester said the report was the most thorough she had seen. Total saving including flights and one night hotel: over £2,600.',
  },
  {
    name: 'Fatima Al-H.',
    location: 'Dubai, UAE',
    scan: 'Whole Body MRI',
    rating: 5,
    text: 'As a UAE resident, I was familiar with high-end private hospitals — but Acıbadem Maslak genuinely surprised me. The JCI accreditation gives real confidence and the Arabic-speaking patient coordinator made the entire experience seamless. The MRI suite was spotless and the report arrived the next morning in both English and Arabic. Highly recommended.',
  },
];

const HOW_TO_REACH = [
  { icon: '✈️', method: 'From Istanbul Airport (IST)', detail: '50 min by taxi · ~€45 · Havaist bus to Maslak also available' },
  { icon: '🚇', method: 'By Metro', detail: 'M2 line → Maslak station (3 min walk to hospital entrance)' },
  { icon: '🚕', method: 'By Taxi from Taksim', detail: '20–25 minutes · ~€15' },
  { icon: '🅿️', method: 'Parking', detail: 'Multi-storey car park on-site · First 2 hours complimentary for patients' },
];

// ─── Page ────────────────────────────────────────────────────

export default function AcibademMaslakPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 60%, #17A589 100%)',
          padding: '72px 24px 56px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>{' / '}
              <Link href="/clinics" style={{ color: 'rgba(255,255,255,0.5)' }}>Clinics</Link>{' / '}
              <Link href="/destinations/turkey/istanbul" style={{ color: 'rgba(255,255,255,0.5)' }}>Istanbul</Link>{' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Acıbadem Maslak</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', flexWrap: 'wrap' }}>
              <div>
                {/* Accreditation chips */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'rgba(255,215,0,0.2)', color: '#FFD700',
                    border: '1px solid rgba(255,215,0,0.4)',
                    borderRadius: 100, padding: '4px 14px', fontSize: 12, fontWeight: 700,
                  }}>
                    🏆 JCI Accredited
                  </span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>ISO 9001</span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>HIMSS Stage 6</span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>🇹🇷 Istanbul</span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Reports in English</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(30px, 4.5vw, 56px)',
                  color: '#fff', lineHeight: 1.1, marginBottom: 14,
                }}>
                  Acıbadem Maslak Hospital
                </h1>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                  📍 Maslak, Istanbul · Nuclear Medicine &amp; Advanced Imaging
                </p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 28, maxWidth: 540, lineHeight: 1.6 }}>
                  Turkey&apos;s most advanced JCI-accredited imaging centre. PET-MRI, GammaKnife,
                  PET-CT and full nuclear medicine services with an{' '}
                  <strong style={{ color: '#fff' }}>International Patient Centre</strong> dedicated to overseas visitors.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/book?clinic=acibadem-maslak-istanbul" style={{
                    background: '#fff', color: '#1B4F72',
                    padding: '12px 24px', borderRadius: 9,
                    fontSize: 15, fontWeight: 700, display: 'inline-block',
                  }}>
                    Book at Acıbadem →
                  </Link>
                  <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20at%20Ac%C4%B1badem%20Maslak"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      background: '#25D366', color: '#fff',
                      padding: '12px 24px', borderRadius: 9,
                      fontSize: 15, fontWeight: 600, display: 'inline-flex', gap: 8, alignItems: 'center',
                    }}>
                    Ask on WhatsApp
                  </a>
                </div>
              </div>

              {/* Quick stats */}
              <div style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 14, padding: 24, minWidth: 200,
              }}>
                {[
                  { label: 'Rating', value: '⭐ 4.9/5' },
                  { label: 'Est.', value: CLINIC.founded },
                  { label: 'Scan types', value: '7 available' },
                  { label: 'Slots', value: 'Mon–Sun' },
                  { label: 'Languages', value: 'TR · EN · AR · RU' },
                  { label: 'Report', value: '24 hours' },
                  { label: 'Accreditation', value: 'JCI ✓' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.08)',
                  }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── JCI EXPLANATION BOX ── */}
        <section style={{ padding: '40px 24px 0', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{
              background: 'linear-gradient(135deg, #FEF9E7 0%, #FEF3C7 100%)',
              border: '1px solid #F59E0B',
              borderRadius: 14, padding: '24px 28px',
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 20, alignItems: 'start',
            }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: '#F59E0B', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 24, flexShrink: 0,
              }}>🏆</div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#92400E', marginBottom: 6 }}>
                  Why JCI Accreditation Matters for International Patients
                </h3>
                <p style={{ fontSize: 14, color: '#78350F', lineHeight: 1.7, margin: 0 }}>
                  The <strong>Joint Commission International (JCI)</strong> is the world&apos;s leading independent
                  healthcare accreditation body, recognised by the NHS, insurance companies and health ministries in
                  over 100 countries. JCI accreditation means a hospital has met rigorous standards for patient safety,
                  infection control, surgical protocols and clinical governance — the same standards applied to top
                  US and European hospitals. For international patients, it means your scan and report will be
                  accepted without question by your home country doctor, insurer or specialist.
                  Fewer than 5% of Turkish hospitals hold JCI status.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ padding: '48px 24px 56px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--primary-3)', marginBottom: 16 }}>
                About Acıbadem Maslak Hospital
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
                {CLINIC.about}
              </p>

              {/* International Patient Centre */}
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 6 }}>
                International Patient Centre
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>
                Acıbadem Maslak&apos;s International Patient Centre is a full-service unit exclusively for overseas patients.
                Every aspect of your visit — before, during and after — is coordinated through one dedicated contact point.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {INTL_SERVICES.map(svc => (
                  <div key={svc.title} style={{
                    background: 'var(--primary-05)',
                    border: '1px solid var(--line)',
                    borderRadius: 12, padding: '16px 18px',
                  }}>
                    <div style={{ fontSize: 26, marginBottom: 10 }}>{svc.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)', marginBottom: 6 }}>{svc.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{svc.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accreditations + How to Reach */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 16 }}>
                Accreditations
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
                {ACCREDITATIONS.map(acc => (
                  <div key={acc.code} style={{
                    display: 'flex', gap: 12, alignItems: 'center',
                    background: acc.highlight ? 'linear-gradient(135deg, #FEF9E7 0%, #FEF3C7 100%)' : 'var(--bg-2)',
                    border: `1px solid ${acc.highlight ? '#F59E0B' : 'var(--line)'}`,
                    borderRadius: 10, padding: '12px 14px',
                  }}>
                    <span style={{ fontSize: 20 }}>{acc.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: acc.highlight ? '#92400E' : 'var(--text)' }}>{acc.name}</div>
                      <div style={{ fontSize: 11, color: acc.highlight ? '#78350F' : 'var(--text-muted)' }}>{acc.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 16 }}>
                How to Get There
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {HOW_TO_REACH.map(item => (
                  <div key={item.method} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    background: '#fff', border: '1px solid var(--line)',
                    borderRadius: 9, padding: '10px 14px',
                  }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.method}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SCAN TYPES & PRICING ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                AVAILABLE SCANS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                Scans &amp; Prices at Acıbadem Maslak
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {SCANS.map(scan => (
                <div key={scan.code} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 14, padding: '20px 24px',
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto auto',
                  gap: 20, alignItems: 'center',
                }}>
                  {/* Icon + Name */}
                  <div style={{ fontSize: 32 }}>{scan.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', marginBottom: 2 }}>
                      {scan.name}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
                      {scan.device} <span style={{ color: 'var(--line)' }}>·</span> {scan.deviceYear}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{scan.description}</div>
                  </div>

                  {/* Duration */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Duration</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{scan.durationMin} min</div>
                  </div>

                  {/* Price + CTA */}
                  <div style={{ textAlign: 'right', minWidth: 160 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>From</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)' }}>£{scan.priceGbp.toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
                      UK avg: <span style={{ textDecoration: 'line-through' }}>£{scan.ukPriceGbp.toLocaleString()}</span>
                      {' '}<span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>-{scan.savingPct}%</span>
                    </div>
                    <Link href={`/book?clinic=acibadem-maslak-istanbul&scan=${scan.code}`} style={{
                      display: 'inline-block',
                      background: 'var(--primary)', color: '#fff',
                      borderRadius: 7, padding: '7px 16px',
                      fontSize: 13, fontWeight: 600,
                    }}>
                      Book Slot →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PATIENT TESTIMONIALS ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                PATIENT EXPERIENCES
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                What International Patients Say
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 16, padding: '28px 28px',
                }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} style={{ color: '#F59E0B', fontSize: 16 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--text)', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.location}</div>
                    </div>
                    <div style={{
                      background: 'var(--primary-05)', border: '1px solid var(--line)',
                      borderRadius: 8, padding: '5px 10px',
                      fontSize: 11, color: 'var(--primary)', fontWeight: 600,
                    }}>
                      {t.scan}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SLOT AVAILABILITY PLACEHOLDER ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                AVAILABLE SLOTS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                Next Available Appointments
              </h2>
            </div>

            {/* Slot calendar placeholder — will be replaced with live component */}
            <div style={{
              background: 'linear-gradient(135deg, var(--primary-05) 0%, var(--accent-light) 100%)',
              border: '2px dashed var(--primary)',
              borderRadius: 16, padding: 40, textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🗓️</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 8 }}>
                Live Slot Calendar
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                Real-time availability for PET-CT, PET-MRI, GammaKnife, MRI 3T and more.<br />
                Slots available 7 days a week, 07:00 – 19:00. Priority slots for international patients.
              </div>
              <Link href="/book?clinic=acibadem-maslak-istanbul" style={{
                background: 'var(--primary)', color: '#fff',
                borderRadius: 9, padding: '12px 28px',
                fontSize: 15, fontWeight: 600, display: 'inline-block',
              }}>
                View All Available Slots →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONCIERGE CTA ── */}
        <section style={{ padding: '56px 24px', background: 'var(--bg)' }}>
          <div style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 60%, #17A589 100%)',
            borderRadius: 18, padding: '44px 36px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, color: '#fff', marginBottom: 10 }}>
              Ready to Book at Acıbadem Maslak?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
              Most UK patients fly London → Istanbul for under £150 return.
              Combined with up to 70% savings on scans, the total trip costs less than the UK scan alone.
              Add our concierge package and we arrange airport transfer, hotel and translation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?clinic=acibadem-maslak-istanbul" style={{
                background: '#fff', color: 'var(--primary)',
                borderRadius: 9, padding: '12px 24px',
                fontSize: 15, fontWeight: 700,
              }}>
                Book at Acıbadem →
              </Link>
              <Link href="/book/concierge" style={{
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                borderRadius: 9, padding: '12px 24px', fontSize: 15,
              }}>
                + Add Concierge
              </Link>
              <Link href="/destinations/turkey/istanbul" style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)',
                borderRadius: 9, padding: '12px 24px', fontSize: 15,
              }}>
                Istanbul Guide →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
