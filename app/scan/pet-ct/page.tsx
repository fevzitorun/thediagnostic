import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'PET-CT Scan in Turkey — From £1,200 | thediagnostic',
  description:
    'Book a PET-CT scan in Istanbul at JCI-accredited clinics. Up to 70% cheaper than UK private prices. Siemens Biograph scanner, GMC-registered radiologist report in English within 24 hours.',
  keywords: 'PET CT scan Turkey, PET CT Istanbul, PET scan cheap UK alternative, full body PET CT cost, Siemens Biograph Turkey',
  openGraph: {
    title: 'PET-CT Scan Turkey — From £1,200 (UK avg £4,000+)',
    description: 'JCI-accredited clinics in Istanbul. Siemens Biograph Vision. Report in English within 24h. Up to 70% cheaper than UK private hospitals.',
    url: 'https://thediagnostic.co.uk/scan/pet-ct',
  },
};

// ─── Data ──────────────────────────────────────────────────────

const PETCT_CLINICS = getFeaturedClinics()
  .filter(c => c.featuredScans.some(s => s.code === 'pet_ct'))
  .slice(0, 6)
  .map(c => {
    const scan = c.featuredScans.find(s => s.code === 'pet_ct')!;
    return {
      slug: c.slug,
      name: c.name,
      city: c.city,
      group: c.group,
      jci: c.jciAccredited,
      iso: c.isoAccredited,
      device: scan.deviceName,
      priceGbp: scan.priceGbp,
      ukPriceGbp: scan.ukPriceGbp,
      rating: c.rating,
      badge: c.highlightBadge,
    };
  });

const UK_VS_TR = [
  { label: 'Price', uk: '£3,500 – £5,200', tr: 'From £1,200', winner: 'tr' },
  { label: 'Wait time', uk: '6 – 18 months (NHS)', tr: '3 – 7 days', winner: 'tr' },
  { label: 'Scanner', uk: 'Varies (often older)', tr: 'Siemens Biograph Vision / mCT', winner: 'tr' },
  { label: 'Report language', uk: 'English', tr: 'English (GMC-reg radiologist)', winner: 'equal' },
  { label: 'Report turnaround', uk: '2 – 5 days', tr: '18 – 24 hours', winner: 'tr' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
  { label: 'Concierge service', uk: 'None', tr: 'Flight + hotel + transfer', winner: 'tr' },
];

const FAQ = [
  {
    q: 'What is a PET-CT scan?',
    a: 'A PET-CT (Positron Emission Tomography – Computed Tomography) combines metabolic imaging (PET) with anatomical imaging (CT) in a single session. It detects cancer, metastases, cardiac disease, and neurological conditions at a cellular level — before structural changes are visible on a standard MRI or CT.',
  },
  {
    q: 'Why is PET-CT cheaper in Turkey?',
    a: 'Turkish private hospitals operate at significantly lower overhead costs than UK private hospitals, while using identical scanner technology (Siemens Biograph, GE Discovery). Clinical staff hold international credentials. The savings are structural — not a reflection of quality.',
  },
  {
    q: 'Will my UK GP or NHS specialist accept the report?',
    a: 'Yes. All reports are produced by GMC-registered subspecialist radiologists and written in English using standard UK clinical formatting. Our GP letter template is included free of charge for onward NHS referral.',
  },
  {
    q: 'Do I need a referral from a GP?',
    a: 'No. thediagnostic is a self-referral service. You can book directly. However, our AI Scan Advisor and clinical team will verify that PET-CT is appropriate for your situation before confirming your booking.',
  },
  {
    q: 'How do I prepare for a PET-CT scan?',
    a: 'You will fast for 4–6 hours before the scan (water is fine). Avoid strenuous exercise for 24 hours beforehand. Diabetic patients require special preparation — our clinical team will guide you. The tracer injection is given 60 minutes before scanning. The scan itself takes 20–30 minutes.',
  },
  {
    q: 'Is there radiation involved?',
    a: 'Yes — a small dose of radioactive tracer (F-18 FDG) is injected. The effective dose is approximately 7–10 mSv, similar to a chest CT. For cancer detection and staging, the diagnostic benefit significantly outweighs this risk. Our radiologists will advise if an alternative is more appropriate for your case.',
  },
  {
    q: 'What is included in the price?',
    a: 'The scan fee includes the tracer, scanner time, a full written radiology report by a subspecialist radiologist, a GP referral letter template, and DICOM images. Optional concierge services (flight, hotel, transfer, translator) are quoted separately.',
  },
  {
    q: 'How quickly can I get an appointment?',
    a: 'Most patients are booked within 3–7 days of enquiry. Emergency bookings within 24–48 hours are possible at selected clinics. Use the Slot Finder above to see live availability.',
  },
];

const PREPARATION = [
  { step: '01', title: 'Fast for 4–6 hours', desc: 'Water only. No food, juice or sugary drinks. Diabetic? Tell us at booking — special protocol applies.' },
  { step: '02', title: 'No exercise 24h prior', desc: 'Strenuous activity increases muscle FDG uptake and can mask or simulate pathological findings.' },
  { step: '03', title: 'Arrive 90 minutes early', desc: 'The F-18 FDG tracer is injected and requires a 60-minute uptake period before scanning begins.' },
  { step: '04', title: 'Wear comfortable clothing', desc: 'No metal objects. Remove jewellery. Comfortable, loose-fitting clothes — ideally without metal zips.' },
  { step: '05', title: 'Scan takes 20–30 min', desc: 'You lie still on the scanner table. The machine is open and well-lit. Not claustrophobic.' },
  { step: '06', title: 'Report in 18–24 hours', desc: 'Delivered to your email in English. DICOM images included. GP letter attached.' },
];

// ─── Page ──────────────────────────────────────────────────────

export default function PetCtPage() {
  const cheapestPrice = PETCT_CLINICS.length > 0 ? Math.min(...PETCT_CLINICS.map(c => c.priceGbp)) : 1200;
  const avgUkPrice = 4200;
  const saving = Math.round(((avgUkPrice - cheapestPrice) / avgUkPrice) * 100);

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section style={{
          background: 'linear-gradient(135deg, #061E32 0%, #082A4A 55%, #0B3565 100%)',
          padding: '72px 24px 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link>
              <span>/</span>
              <Link href="/scan" style={{ color: 'inherit' }}>Scan Types</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>PET-CT Scan</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3AABDB', display: 'inline-block' }} />
                  <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>Most Booked · Nuclear Medicine</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
                  PET-CT Scan in Turkey
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Full-body cancer and disease detection at JCI-accredited clinics in Istanbul.
                  Siemens Biograph Vision scanner. GMC-registered radiologist report in English
                  within 24 hours. Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=pet_ct" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    Find Available Slots →
                  </Link>
                  <a href="https://wa.me/447700000000?text=I%27d%20like%20to%20book%20a%20PET-CT%20scan" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>
                    Ask on WhatsApp
                  </a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { value: `From £${cheapestPrice.toLocaleString()}`, label: 'thediagnostic price' },
                    { value: `Save ${saving}%`, label: 'vs UK private avg' },
                    { value: '3–7 days', label: 'appointment wait' },
                    { value: '24h', label: 'report turnaround' },
                  ].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(58,171,219,0.35)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#3AABDB', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price card */}
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#3AABDB', lineHeight: 1, marginBottom: 4 }}>£{cheapestPrice.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                  UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUkPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {['Tracer + scan included', 'GMC radiologist report', 'English report, 24h', 'GP letter template', 'DICOM images'].map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/book?scan=pet_ct" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
                  Book PET-CT Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <div style={{ background: '#0B3565', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              '✓ JCI-Accredited Clinics',
              '✓ Siemens Biograph Vision Scanner',
              '✓ GMC-Registered Radiologist',
              '✓ No GP Referral Required',
              '✓ Report in English · 24h',
            ].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── UK vs TURKEY COMPARISON ───────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — PET-CT</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Same technology. Same clinical standards. Dramatically different cost and wait time.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '10px 0 0 0', fontWeight: 600 }}>Criteria</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600 }}>🇬🇧 UK Private</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', borderRadius: '0 10px 0 0', fontWeight: 600 }}>🇹🇷 thediagnostic</th>
                  </tr>
                </thead>
                <tbody>
                  {UK_VS_TR.map((row, i) => (
                    <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text)' }}>{row.label}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: row.winner === 'tr' ? 'var(--text-muted)' : 'var(--text)' }}>{row.uk}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{ color: row.winner === 'tr' ? '#17A589' : 'var(--text)', fontWeight: row.winner === 'tr' ? 700 : 400 }}>
                          {row.winner === 'tr' && '✓ '}{row.tr}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ textAlign: 'center', marginTop: 28 }}>
              <Link href="/compare/pet-ct-uk-vs-turkey" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>
                See full price breakdown →
              </Link>
            </div>
          </div>
        </section>

        {/* ── PARTNER CLINICS WITH PET-CT ───────────────────── */}
        {PETCT_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get Your PET-CT</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>All clinics personally verified — accreditation, scanner model, and English-language reporting capability.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {PETCT_CLINICS.map(clinic => {
                  const savedPct = Math.round(((clinic.ukPriceGbp - clinic.priceGbp) / clinic.ukPriceGbp) * 100);
                  return (
                    <div key={clinic.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <div style={{ background: 'var(--primary)', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{clinic.name}</h3>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{clinic.city}, Turkey · {clinic.group}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {clinic.jci && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>JCI</span>}
                          {clinic.iso && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>ISO</span>}
                        </div>
                      </div>
                      <div style={{ padding: 20 }}>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Scanner</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 16 }}>{clinic.device}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '12px 14px', marginBottom: 16 }}>
                          <div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>PET-CT from</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp.toLocaleString()}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{clinic.ukPriceGbp.toLocaleString()}</div>
                            <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Clinic</Link>
                          <Link href={`/book?scan=pet_ct&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── PREPARATION GUIDE ─────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PREPARATION GUIDE</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>How to Prepare for Your PET-CT</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>Follow these steps to ensure accurate results and a smooth appointment.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {PREPARATION.map(step => (
                <div key={step.step} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 24px 24px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--brand-blue)' }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.1em', marginBottom: 8 }}>STEP {step.step}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Common Questions About PET-CT</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {FAQ.map(item => (
                <div key={item.q} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 10 }}>{item.q}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, margin: 0 }}>{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────── */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>
                Ready to Book Your PET-CT?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
                Appointments available within 3–7 days. No referral needed. UK-standard report within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=pet_ct" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>
                  Find Available Slots →
                </Link>
                <a href="https://wa.me/447700000000?text=PET-CT%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
