import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'HSM Radyoloji Istanbul | PET-CT, MRI 3T from £320 | thediagnostic',
  description:
    'Book PET-CT, MRI 3T, SPECT-CT and CT Angiography at HSM Radyoloji, Istanbul. Led by Prof. Dr. Mustafa ÖZATEŞ. Reports in English within 24 hours. From £320.',
  keywords: ['HSM Radyoloji', 'MRI Istanbul', 'PET CT Istanbul', 'private radiology Istanbul', 'Prof Mustafa Özateş'],
};

// ─── Data ────────────────────────────────────────────────────

const CLINIC = {
  name: 'HSM Radyoloji',
  slug: 'hsm-radyoloji-istanbul',
  city: 'Istanbul, Turkey',
  address: 'Nişantaşı Mah., Teşvikiye Cad., Şişli, İstanbul',
  phone: '+90 212 000 0000',
  email: 'info@hsmradyoloji.com',
  accentColor: '#17A589',
  jci: false,
  iso: true,
  rating: 4.9,
  reviewCount: 47,
  founded: '2005',
  languages: ['Turkish', 'English'],
  about: 'HSM Radyoloji is led by Prof. Dr. Mustafa ÖZATEŞ, one of Turkey\'s foremost subspecialist radiologists with over 25 years of experience in advanced diagnostic imaging. Operating two state-of-the-art clinics in central Istanbul (Nişantaşı), HSM specialises in nuclear medicine, high-field MRI, and interventional radiology. All studies are read by subspecialist radiologists, and English-language reports are available within 24 hours.',
};

const SCANS = [
  {
    code: 'pet_ct',
    icon: '🔬',
    name: 'PET-CT Scan',
    device: 'Siemens Biograph mCT Flow',
    deviceYear: 2022,
    priceGbp: 1200,
    priceEur: 1400,
    ukPriceGbp: 4000,
    savingPct: 70,
    durationMin: 90,
    available: true,
    description: 'Full-body oncology PET-CT. FDG and PSMA tracers available.',
    href: '/scan/pet-ct',
  },
  {
    code: 'mri_3t',
    icon: '🧲',
    name: 'MRI 3T',
    device: 'Siemens MAGNETOM Vida 3T',
    deviceYear: 2023,
    priceGbp: 320,
    priceEur: 375,
    ukPriceGbp: 1200,
    savingPct: 73,
    durationMin: 60,
    available: true,
    description: 'Brain, spine, MSK, abdominal and pelvic MRI. Contrast available.',
    href: '/scan/mri-3t',
  },
  {
    code: 'mri_whole_body',
    icon: '🫁',
    name: 'Whole Body MRI',
    device: 'Siemens MAGNETOM Vida 3T',
    deviceYear: 2023,
    priceGbp: 950,
    priceEur: 1100,
    ukPriceGbp: 3500,
    savingPct: 73,
    durationMin: 90,
    available: true,
    description: 'Head-to-toe cancer screening with zero radiation.',
    href: '/scan/whole-body-mri',
  },
  {
    code: 'spect_ct',
    icon: '💫',
    name: 'SPECT-CT',
    device: 'Siemens Symbia Intevo Bold',
    deviceYear: 2021,
    priceGbp: 650,
    priceEur: 760,
    ukPriceGbp: 2200,
    savingPct: 70,
    durationMin: 90,
    available: true,
    description: 'Bone scans, thyroid scintigraphy, cardiac perfusion, renal DMSA.',
    href: '/scan/spect-ct',
  },
  {
    code: 'ct_angio',
    icon: '🫀',
    name: 'CT Angiography',
    device: 'Siemens SOMATOM Force',
    deviceYear: 2022,
    priceGbp: 280,
    priceEur: 330,
    ukPriceGbp: 900,
    savingPct: 69,
    durationMin: 45,
    available: true,
    description: 'Coronary, pulmonary, carotid and peripheral vascular CT angiography.',
    href: '/scan/ct-angio',
  },
];

const TEAM = [
  {
    name: 'Prof. Dr. Mustafa ÖZATEŞ',
    title: 'Founder & Consultant Radiologist',
    speciality: 'Nuclear Medicine · Neuroradiology · MRI',
    icon: '👨‍⚕️',
    highlight: true,
  },
  {
    name: 'Subspecialist Radiology Team',
    title: 'Consultant Radiologists',
    speciality: 'MSK · Abdominal · Breast · Vascular',
    icon: '🏥',
    highlight: false,
  },
];

const ACCREDITATIONS = [
  { code: 'ISO', name: 'ISO 9001:2015', desc: 'Quality Management System', icon: '✅' },
  { code: 'TSE', name: 'TSE Certified', desc: 'Turkish Standards Institution', icon: '🏅' },
  { code: 'EN', name: 'English Reports', desc: '24-hour turnaround guaranteed', icon: '📄' },
  { code: 'SIEMENS', name: 'Siemens Partner', desc: 'Authorised Siemens imaging centre', icon: '⚙️' },
];

const HOW_TO_REACH = [
  { icon: '✈️', method: 'From Istanbul Airport (IST)', detail: '45 min by taxi · ~€35' },
  { icon: '🚇', method: 'By Metro', detail: 'M2 line → Osmanbey station (5 min walk)' },
  { icon: '🚕', method: 'By Taxi from Taksim', detail: '10–15 minutes · ~€8' },
  { icon: '🅿️', method: 'Parking', detail: 'Valet parking available on-site' },
];

// ─── Page ────────────────────────────────────────────────────

export default function HSMRadyolojiPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0E2F48 0%, #17A589 100%)',
          padding: '72px 24px 56px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>{' / '}
              <Link href="/clinics" style={{ color: 'rgba(255,255,255,0.5)' }}>Clinics</Link>{' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>HSM Radyoloji</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start', flexWrap: 'wrap' }}>
              <div>
                {/* Accreditation chips */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>ISO 9001</span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>🇹🇷 Istanbul</span>
                  <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Reports in English</span>
                </div>

                <h1 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(30px, 4.5vw, 56px)',
                  color: '#fff', lineHeight: 1.1, marginBottom: 14,
                }}>
                  HSM Radyoloji
                </h1>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
                  📍 Nişantaşı, Istanbul · Advanced Diagnostic Imaging
                </p>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 28, maxWidth: 520, lineHeight: 1.6 }}>
                  Led by <strong style={{ color: '#fff' }}>Prof. Dr. Mustafa ÖZATEŞ</strong>, one of Turkey&apos;s foremost radiologists.
                  Two state-of-the-art clinics. Reports in English within 24 hours.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/book?clinic=hsm-radyoloji-istanbul" style={{
                    background: '#fff', color: 'var(--accent-2)',
                    padding: '12px 24px', borderRadius: 9,
                    fontSize: 15, fontWeight: 700, display: 'inline-block',
                  }}>
                    Book at HSM Radyoloji →
                  </Link>
                  <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20at%20HSM%20Radyoloji"
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
                  { label: 'Scan types', value: '5 available' },
                  { label: 'Slots', value: 'Mon–Sat' },
                  { label: 'Languages', value: 'TR · EN' },
                  { label: 'Report', value: '24 hours' },
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

        {/* ── ABOUT ── */}
        <section style={{ padding: '56px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--primary-3)', marginBottom: 16 }}>
                About HSM Radyoloji
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 24 }}>
                {CLINIC.about}
              </p>

              {/* Team */}
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: 'var(--primary)', marginBottom: 16 }}>
                Medical Team
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {TEAM.map(member => (
                  <div key={member.name} style={{
                    display: 'flex', gap: 16, alignItems: 'center',
                    background: member.highlight ? 'var(--bg-2)' : '#fff',
                    border: `1px solid ${member.highlight ? 'var(--accent-light)' : 'var(--line)'}`,
                    borderRadius: 12, padding: '14px 18px',
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '50%',
                      background: member.highlight ? 'var(--accent)' : 'var(--primary-05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 22, flexShrink: 0,
                    }}>
                      {member.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: 15 }}>{member.name}</div>
                      <div style={{ fontSize: 13, color: 'var(--accent)', marginBottom: 2 }}>{member.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{member.speciality}</div>
                    </div>
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
                    background: 'var(--bg-2)', borderRadius: 10, padding: '12px 14px',
                  }}>
                    <span style={{ fontSize: 20 }}>{acc.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{acc.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{acc.desc}</div>
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
                Scans &amp; Prices at HSM Radyoloji
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
                    <Link href={`/book?clinic=hsm-radyoloji-istanbul&scan=${scan.code}`} style={{
                      display: 'inline-block',
                      background: 'var(--accent)', color: '#fff',
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

        {/* ── SLOT AVAILABILITY PLACEHOLDER ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
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
              background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--accent-light) 100%)',
              border: '2px dashed var(--accent)',
              borderRadius: 16, padding: 40, textAlign: 'center',
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🗓️</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--primary)', marginBottom: 8 }}>
                Live Slot Calendar
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                Real-time availability for PET-CT, MRI 3T, SPECT-CT and more.<br />
                Slots available Monday – Saturday, 08:00 – 17:00.
              </div>
              <Link href="/book?clinic=hsm-radyoloji-istanbul" style={{
                background: 'var(--accent)', color: '#fff',
                borderRadius: 9, padding: '12px 28px',
                fontSize: 15, fontWeight: 600, display: 'inline-block',
              }}>
                View All Available Slots →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONCIERGE CTA ── */}
        <section style={{ padding: '56px 24px', background: 'var(--bg-2)' }}>
          <div style={{
            maxWidth: 800, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent-2) 100%)',
            borderRadius: 18, padding: '44px 36px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 30, color: '#fff', marginBottom: 10 }}>
              Need Help with Travel?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, marginBottom: 24, lineHeight: 1.7 }}>
              Most UK patients fly London → Istanbul for under £150 return.
              Add our concierge package and we arrange airport transfer, hotel and translation.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?clinic=hsm-radyoloji-istanbul" style={{
                background: '#fff', color: 'var(--primary)',
                borderRadius: 9, padding: '12px 24px',
                fontSize: 15, fontWeight: 700,
              }}>
                Book at HSM Radyoloji →
              </Link>
              <Link href="/book/concierge" style={{
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff',
                borderRadius: 9, padding: '12px 24px', fontSize: 15,
              }}>
                + Add Concierge
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
