import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'Medical Imaging in Istanbul, Turkey — thediagnostic',
  description: 'Istanbul is Europe\'s leading medical tourism destination. JCI-accredited hospitals, world-class radiologists, and advanced scanners — PET-CT, MRI 3T, GammaKnife. Up to 75% cheaper than UK.',
  keywords: 'Istanbul medical tourism, imaging Istanbul, PET CT Istanbul, MRI Istanbul, hospital Istanbul UK patients, medical travel Turkey',
  openGraph: {
    title: 'Medical Imaging in Istanbul — Up to 75% cheaper than UK',
    description: 'JCI-accredited hospitals, GMC-reg radiologists, advanced scanners. Updated 2026.',
    url: 'https://thediagnostic.co.uk/destinations/turkey/istanbul',
  },
};

const istanbulClinics = getFeaturedClinics().filter(c => c.city === 'Istanbul');

const SCAN_PRICES = [
  { scan: 'PET-CT', istanbul: 'From £1,200', uk: '£3,500–£5,200', savePct: 70, href: '/scan/pet-ct' },
  { scan: 'MRI 3T', istanbul: 'From £285', uk: '£900–£1,500', savePct: 76, href: '/scan/mri-3t' },
  { scan: 'GammaKnife', istanbul: 'From £6,500', uk: '£18,000–£25,000', savePct: 68, href: '/scan/gamma-knife' },
  { scan: 'PET-MRI', istanbul: 'From £1,850', uk: '£4,500–£7,000', savePct: 66, href: '/scan/pet-mri' },
  { scan: 'SPECT-CT', istanbul: 'From £650', uk: '£1,800–£3,000', savePct: 70, href: '/scan' },
  { scan: 'CT (photon counting)', istanbul: 'From £380', uk: '£800–£1,400', savePct: 58, href: '/scan' },
];

const WHY_ISTANBUL = [
  { icon: '🏥', title: 'JCI-Accredited Hospitals', desc: 'Acıbadem, Medical Park, and partner groups hold JCI accreditation — the same international standard used by top US and UK hospitals. Turkey has more JCI-accredited hospitals than any country in Europe.' },
  { icon: '🧲', title: 'Latest Scanner Technology', desc: 'Istanbul hospitals invest aggressively in new equipment. Siemens Biograph Vision 600, GE Discovery MI, Philips Ingenia Ambition — 2018–2024 installs. Often newer than UK private equivalents.' },
  { icon: '🩺', title: 'GMC-Registered Radiologists', desc: 'Our partner clinics employ subspecialist radiologists with UK GMC registration, American Board certification, or European Fellowship credentials. Reports are written in English and formatted for NHS onward referral.' },
  { icon: '✈️', title: 'Easy to Reach', desc: 'Istanbul (IST/SAW) has direct daily flights from London Heathrow, Gatwick, Stansted, Manchester, and Birmingham. Flight time: 3.5–4 hours. Combined with scan appointments, most patients complete the trip in 2–3 nights.' },
  { icon: '🌙', title: 'World-Class City', desc: 'Istanbul is Europe\'s largest city — a 2,000-year-old metropolis straddling Asia and Europe. International Patient Centres offer 24/7 English support, airport transfers, and hotel coordination.' },
  { icon: '💷', title: 'No Hidden Costs', desc: 'thediagnostic\'s pricing is all-inclusive: tracer or contrast, scan, subspecialist report in English, GP letter template, and DICOM images. No surprise billing. No excess charges.' },
];

const PRACTICAL = [
  { q: 'When should I travel?', a: 'Most patients book 5–14 days in advance. Emergency cases can often be accommodated within 48–72 hours. Best to fly in the day before your scan appointment and fly home the day after receiving your report.' },
  { q: 'Do I need a visa?', a: 'UK citizens can obtain a Turkish e-Visa online within minutes (usually £20–£40 for 90-day multiple entry). No consulate visit required.' },
  { q: 'What airport should I use?', a: 'Istanbul Airport (IST) is the main hub — 45 minutes from most clinics. Istanbul Sabiha Gökçen (SAW) is closer to Asian-side hospitals. Our concierge arranges airport transfers for all patients.' },
  { q: 'What language do doctors speak?', a: 'All partner hospital International Patient Centres provide English-speaking coordinators 24/7. Most attending physicians also speak English. Formal interpretation is available if required.' },
  { q: 'Is it safe to receive medical care in Turkey?', a: 'Turkey is the world\'s 4th largest medical tourism destination (2023 MTQUA). JCI-accredited hospitals in Istanbul serve patients from 100+ countries annually. Acıbadem Group alone treats over 40,000 international patients per year.' },
];

export default function IstanbulPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #061E32 0%, #082A4A 55%, #0B3565 100%)', padding: '80px 24px 64px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Destinations</span><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>Turkey</span><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Istanbul</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>🇹🇷 Istanbul, Turkey · Medical Tourism Hub</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              Advanced Medical Imaging<br />in Istanbul
            </h1>
            <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 600, marginBottom: 36 }}>
              Europe&apos;s most advanced hospital cluster. JCI-accredited. GMC-registered radiologists. Latest-generation scanners. Up to 75% cheaper than UK private hospitals — 3.5 hours from London.
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
              {[{ value: '13+', label: 'Partner hospitals' }, { value: 'JCI', label: 'Accredited partners' }, { value: '24h', label: 'English reports' }, { value: '3.5h', label: 'From London' }].map(s => (
                <div key={s.label} style={{ borderLeft: '2px solid rgba(58,171,219,0.35)', paddingLeft: 14 }}>
                  <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 700, color: '#3AABDB', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/book" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Book Your Scan →</Link>
              <a href="https://wa.me/447700000000?text=Istanbul%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15 }}>Ask on WhatsApp</a>
            </div>
          </div>
        </section>

        {/* Scan price overview */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>ISTANBUL SCAN PRICES</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>What Scans Cost in Istanbul vs UK</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Prices include scan, tracer/contrast, subspecialist report in English, and DICOM images.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {SCAN_PRICES.map(s => (
                <Link key={s.scan} href={s.href} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 22, display: 'block', textDecoration: 'none' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 12 }}>{s.scan}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Istanbul</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#17A589' }}>{s.istanbul}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK: {s.uk}</div>
                      <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 10px', fontSize: 11, fontWeight: 700, marginTop: 4 }}>Save {s.savePct}%</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>View details →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Istanbul */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>WHY ISTANBUL</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Why Patients Choose Istanbul</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {WHY_ISTANBUL.map(w => (
                <div key={w.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{w.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{w.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner clinics in Istanbul */}
        {istanbulClinics.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER HOSPITALS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Our Istanbul Partners</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {istanbulClinics.map(c => (
                  <div key={c.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)' }}>{c.name}</h3>
                      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                        {c.jciAccredited && <span style={{ background: '#EBF5FB', color: '#1B4F72', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>JCI</span>}
                        {c.isoAccredited && <span style={{ background: '#EAFAF1', color: '#1E8449', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>ISO</span>}
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>{c.description.slice(0, 120)}…</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {c.scanTypes.slice(0, 4).map(t => (
                        <span key={t} style={{ background: 'var(--bg-2)', color: 'var(--text-muted)', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 500 }}>{t.replace(/_/g, ' ').toUpperCase()}</span>
                      ))}
                    </div>
                    <Link href={`/clinics/${c.slug}`} style={{ display: 'block', background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>View Hospital →</Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Practical info */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRACTICAL GUIDE</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Planning Your Istanbul Trip</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {PRACTICAL.map(item => (
                <div key={item.q} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>Ready to Book in Istanbul?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>Our concierge team handles flights, hotel, transfers, and appointments — you just show up.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Book Your Scan →</Link>
                <a href="https://wa.me/447700000000?text=Istanbul%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>WhatsApp Concierge</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
