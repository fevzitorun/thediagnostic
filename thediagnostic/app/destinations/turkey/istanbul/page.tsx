import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Medical Imaging Istanbul | PET-CT, MRI, PET-MRI from £320 | thediagnostic',
  description:
    'Book medical scans in Istanbul, Turkey. PET-CT from £1,200, MRI 3T from £320. JCI-accredited hospitals, no waiting lists, English reports within 24 hours. Save up to 75% vs UK prices.',
  keywords: [
    'medical imaging Istanbul',
    'PET CT Istanbul',
    'scan abroad Turkey',
    'MRI Istanbul',
    'private radiology Istanbul',
    'medical tourism Istanbul',
    'PET MRI Turkey',
    'health tourism Istanbul',
    'cheap MRI scan abroad',
  ],
  openGraph: {
    title: 'Medical Imaging in Istanbul | Save up to 75% vs UK Prices',
    description: 'PET-CT, MRI 3T, Whole Body MRI and more at JCI-accredited Istanbul hospitals. No waiting lists. Reports in English within 24 hours.',
    type: 'website',
  },
};

// ─── Data ────────────────────────────────────────────────────

const WHY_ISTANBUL = [
  {
    icon: '💷',
    title: 'Save 60–75% vs UK Prices',
    desc: 'A PET-CT costs £4,000–£5,000 privately in the UK. In Istanbul the same scan at a JCI-accredited hospital starts at £1,200. MRI 3T from £320 vs £1,200 in London. The saving typically covers flights, hotel and still leaves money in your pocket.',
    stat: 'Up to 75% saving',
  },
  {
    icon: '🏆',
    title: 'World-Class Technology',
    desc: 'Istanbul\'s leading imaging centres operate Siemens Biograph mMR (PET-MRI), GE Discovery MI (PET-CT), Siemens MAGNETOM Prisma 3T and Leksell Gamma Knife Icon — the same platforms found at top UK and US academic hospitals.',
    stat: 'Latest Gen Equipment',
  },
  {
    icon: '⏱️',
    title: 'No Waiting Lists',
    desc: 'NHS PET-CT waits average 8–14 weeks. Private UK clinics book 2–4 weeks out. Istanbul clinics typically offer next-day or same-week slots. Urgent cases are accommodated within 24–48 hours.',
    stat: 'Appointments within days',
  },
  {
    icon: '✈️',
    title: 'Easy Direct Flights',
    desc: 'Istanbul is served by more direct flights from the UK than almost any other city. London Heathrow, Gatwick and Stansted all have multiple daily services to Istanbul Airport (IST) and Sabiha Gökçen (SAW). Flight time: 3h 40min. Return fares from £90.',
    stat: 'Daily flights from UK',
  },
  {
    icon: '🏥',
    title: 'JCI & ISO Accredited Hospitals',
    desc: 'Several Istanbul hospitals hold Joint Commission International (JCI) accreditation — the same standard recognised by NHS insurers, BUPA and AXA Health. Reports are accepted worldwide without question.',
    stat: 'Internationally recognised',
  },
  {
    icon: '🗣️',
    title: 'English-Language Service',
    desc: 'Istanbul\'s international hospitals employ English-speaking coordinators, radiologists who write reports in English, and professional interpreters. Communication is never a barrier. Reports arrive within 24 hours in your inbox.',
    stat: 'Full English support',
  },
];

const CLINICS = [
  {
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    district: 'Maslak',
    badge: 'JCI Accredited',
    badgeColor: '#F59E0B',
    badgeBg: '#FEF3C7',
    rating: 4.9,
    reviews: 214,
    scans: ['PET-CT', 'PET-MRI', 'GammaKnife', 'MRI 3T', 'Whole Body MRI', 'SPECT-CT', 'CT Angio'],
    priceFrom: 320,
    highlight: 'International Patient Centre · Visa assistance · Arabic, Russian interpreters',
    color: '#1B4F72',
  },
  {
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    district: 'Nişantaşı',
    badge: 'ISO 9001',
    badgeColor: '#17A589',
    badgeBg: '#D1F2EB',
    rating: 4.9,
    reviews: 47,
    scans: ['PET-CT', 'MRI 3T', 'Whole Body MRI', 'SPECT-CT', 'CT Angio'],
    priceFrom: 280,
    highlight: 'Led by Prof. Dr. Mustafa ÖZATEŞ · Siemens partner · 24h English reports',
    color: '#17A589',
  },
];

const PRICE_TABLE = [
  { scan: 'MRI 3T', istanbul: '£320', uk: '£1,200', saving: '73%' },
  { scan: 'PET-CT', istanbul: '£1,200', uk: '£4,500', saving: '73%' },
  { scan: 'PET-MRI', istanbul: '£1,850', uk: '£7,000', saving: '74%' },
  { scan: 'Whole Body MRI', istanbul: '£950', uk: '£3,500', saving: '73%' },
  { scan: 'SPECT-CT', istanbul: '£650', uk: '£2,200', saving: '70%' },
  { scan: 'CT Angiography', istanbul: '£280', uk: '£950', saving: '71%' },
  { scan: 'GammaKnife', istanbul: '£6,500', uk: '£18,000', saving: '64%' },
];

const PRACTICAL_INFO = [
  {
    icon: '✈️',
    title: 'Getting to Istanbul',
    items: [
      'London → Istanbul: ~3h 40min direct (multiple daily flights)',
      'Airlines: Turkish Airlines, British Airways, EasyJet, Pegasus',
      'Return fares: typically £90–£200 from London airports',
      'Airports: Istanbul Airport (IST) — main hub · Sabiha Gökçen (SAW) — Asian side',
    ],
  },
  {
    icon: '🏨',
    title: 'Where to Stay',
    items: [
      'Maslak area: modern business hotels near Acıbadem (from £65/night)',
      'Taksim / Nişantaşı: central, near HSM Radyoloji, walkable to metro',
      'Recommended: Wyndham Grand Istanbul Levent, DoubleTree Maslak',
      'Most procedures are same-day — one overnight is usually sufficient',
    ],
  },
  {
    icon: '💱',
    title: 'Currency & Payment',
    items: [
      'Currency: Turkish Lira (TRY). Clinics also accept EUR, USD and GBP.',
      'Credit cards widely accepted at all international hospitals',
      'ATMs available throughout Maslak and Nişantaşı',
      'No need to carry large amounts of cash',
    ],
  },
  {
    icon: '🗣️',
    title: 'Language',
    items: [
      'International hospital staff speak English — no language barrier',
      'Arabic, Russian and German coordinators available at Acıbadem',
      'Menus, signs and Uber/Bolt apps all available in English',
      'Istanbul is one of the most English-friendly cities in the region',
    ],
  },
  {
    icon: '🛂',
    title: 'Visas',
    items: [
      'UK passport holders: Turkey e-Visa available online in minutes (£20)',
      'EU nationals: may enter visa-free or with simple e-Visa',
      'GCC nationals: visa-on-arrival at Istanbul Airport',
      'Hospitals can provide official invitation letters for visa applications',
    ],
  },
  {
    icon: '🚇',
    title: 'Getting Around',
    items: [
      'Metro M2 line connects airport, Maslak, Taksim and Nişantaşı',
      'Uber and Bolt (local) available throughout the city',
      'Hospital coordinators can arrange private airport transfers',
      'Taxi from Istanbul Airport to Maslak: ~50 min, ~€45',
    ],
  },
];

// ─── Page ────────────────────────────────────────────────────

export default function IstanbulDestinationPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 55%, #17A589 100%)',
          padding: '80px 24px 64px',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)' }}>Home</Link>{' / '}
              <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.5)' }}>Destinations</Link>{' / '}
              <Link href="/destinations/turkey" style={{ color: 'rgba(255,255,255,0.5)' }}>Turkey</Link>{' / '}
              <span style={{ color: 'rgba(255,255,255,0.85)' }}>Istanbul</span>
            </div>

            <div style={{ maxWidth: 760 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>🇹🇷 Istanbul, Turkey</span>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>JCI Accredited Clinics</span>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>Save up to 75%</span>
                <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 100, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>3h 40min from London</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(32px, 5vw, 62px)',
                color: '#fff', lineHeight: 1.08, marginBottom: 18,
              }}>
                Medical Imaging in Istanbul
              </h1>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 32, lineHeight: 1.7, maxWidth: 620 }}>
                Istanbul offers world-class PET-CT, MRI 3T, PET-MRI and nuclear medicine at
                JCI-accredited hospitals — at a fraction of UK prices. No waiting lists.
                English reports in 24 hours. Fly in, scan, fly home.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/book?destination=istanbul" style={{
                  background: '#fff', color: '#1B4F72',
                  padding: '14px 28px', borderRadius: 9,
                  fontSize: 16, fontWeight: 700, display: 'inline-block',
                }}>
                  Book a Scan in Istanbul →
                </Link>
                <a href="#clinics" style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', padding: '14px 28px', borderRadius: 9,
                  fontSize: 16, display: 'inline-block',
                }}>
                  View Clinics ↓
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUICK PRICE COMPARISON ── */}
        <section style={{ padding: '56px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                PRICE COMPARISON
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                Istanbul vs UK Prices
              </h2>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)' }}>
                    <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600, borderRadius: '10px 0 0 0' }}>Scan Type</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>UK Private</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 13, color: '#fff', fontWeight: 700 }}>Istanbul</th>
                    <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600, borderRadius: '0 10px 0 0' }}>Saving</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_TABLE.map((row, i) => (
                    <tr key={row.scan} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg-2)' }}>
                      <td style={{ padding: '13px 20px', fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>{row.scan}</td>
                      <td style={{ padding: '13px 20px', fontSize: 14, textAlign: 'right', color: 'var(--text-muted)', textDecoration: 'line-through' }}>{row.uk}</td>
                      <td style={{ padding: '13px 20px', fontSize: 16, fontWeight: 700, textAlign: 'right', color: 'var(--primary)' }}>{row.istanbul}</td>
                      <td style={{ padding: '13px 20px', textAlign: 'right' }}>
                        <span style={{
                          background: 'var(--accent-light)', color: 'var(--accent-2)',
                          borderRadius: 20, padding: '3px 10px',
                          fontSize: 13, fontWeight: 700,
                        }}>
                          -{row.saving}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
              * Prices are indicative from figures for JCI-accredited Istanbul centres. Actual prices may vary. UK prices based on published private clinic rates, 2025.
            </p>
          </div>
        </section>

        {/* ── WHY ISTANBUL ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                WHY ISTANBUL
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--primary-3)', maxWidth: 540 }}>
                6 Reasons to Choose Istanbul for Medical Imaging
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
              {WHY_ISTANBUL.map((reason, i) => (
                <div key={reason.title} style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 14, padding: '28px 24px',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', top: 18, right: 18,
                    fontSize: 11, fontWeight: 700, color: 'var(--accent-2)',
                    background: 'var(--accent-light)', borderRadius: 20, padding: '3px 10px',
                  }}>
                    {reason.stat}
                  </div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{reason.icon}</div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--primary)', marginBottom: 10 }}>
                    {i + 1}. {reason.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                    {reason.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLINICS ── */}
        <section id="clinics" style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                ISTANBUL CLINICS
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                Our Verified Istanbul Partners
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              {CLINICS.map(clinic => (
                <div key={clinic.slug} style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 16, overflow: 'hidden',
                  boxShadow: '0 2px 16px rgba(27,79,114,0.06)',
                }}>
                  {/* Colour header strip */}
                  <div style={{
                    background: clinic.color,
                    padding: '20px 24px',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{
                          background: clinic.badgeBg, color: clinic.badgeColor,
                          borderRadius: 20, padding: '3px 10px',
                          fontSize: 12, fontWeight: 700, display: 'inline-block', marginBottom: 10,
                        }}>
                          {clinic.badge}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, color: '#fff', margin: 0 }}>
                          {clinic.name}
                        </h3>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: '4px 0 0' }}>
                          📍 {clinic.district}, Istanbul
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 20, color: '#fff', fontWeight: 700 }}>⭐ {clinic.rating}</div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{clinic.reviews} reviews</div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px 24px' }}>
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Available Scans</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {clinic.scans.map(scan => (
                          <span key={scan} style={{
                            background: 'var(--primary-05)', color: 'var(--primary)',
                            borderRadius: 20, padding: '3px 10px',
                            fontSize: 12, fontWeight: 600,
                          }}>
                            {scan}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      background: 'var(--bg-2)', borderRadius: 8, padding: '10px 14px',
                      fontSize: 13, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5,
                    }}>
                      {clinic.highlight}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Scans from</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--primary)' }}>£{clinic.priceFrom}</div>
                      </div>
                      <Link href={`/clinics/${clinic.slug}`} style={{
                        background: clinic.color, color: '#fff',
                        borderRadius: 9, padding: '10px 20px',
                        fontSize: 14, fontWeight: 600, display: 'inline-block',
                      }}>
                        View Clinic →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRACTICAL INFO ── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                PLAN YOUR TRIP
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: 'var(--primary-3)' }}>
                Practical Information for Istanbul
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {PRACTICAL_INFO.map(section => (
                <div key={section.title} style={{
                  background: '#fff', border: '1px solid var(--line)',
                  borderRadius: 14, padding: '22px 22px',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{section.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 14 }}>
                    {section.title}
                  </h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.items.map((item, i) => (
                      <li key={i} style={{
                        fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5,
                        paddingLeft: 16, position: 'relative',
                      }}>
                        <span style={{
                          position: 'absolute', left: 0, top: 6,
                          width: 5, height: 5, borderRadius: '50%',
                          background: 'var(--accent)', display: 'block',
                        }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section style={{ padding: '56px 24px', background: 'var(--bg)' }}>
          <div style={{
            maxWidth: 820, margin: '0 auto', textAlign: 'center',
            background: 'linear-gradient(135deg, #0E2F48 0%, #1B4F72 55%, #17A589 100%)',
            borderRadius: 18, padding: '48px 36px',
          }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, color: '#fff', marginBottom: 12 }}>
              Ready to Book Your Istanbul Scan?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, marginBottom: 28, lineHeight: 1.7 }}>
              Tell us which scan you need. We&apos;ll match you with the right Istanbul clinic,
              confirm availability and send a full cost breakdown including flights and hotel options.
              No commitment required.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/book?destination=istanbul" style={{
                background: '#fff', color: '#1B4F72',
                borderRadius: 9, padding: '14px 28px',
                fontSize: 16, fontWeight: 700,
              }}>
                Get a Free Quote →
              </Link>
              <a href="https://wa.me/447700000000?text=Hi%2C%20I%27d%20like%20to%20book%20a%20scan%20in%20Istanbul"
                target="_blank" rel="noopener noreferrer"
                style={{
                  background: '#25D366', color: '#fff',
                  borderRadius: 9, padding: '14px 28px',
                  fontSize: 16, fontWeight: 600, display: 'inline-flex', gap: 8, alignItems: 'center',
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
