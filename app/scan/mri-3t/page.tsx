import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'MRI 3T Scan in Turkey — From £285 | thediagnostic',
  description:
    'Book a 3 Tesla MRI scan in Istanbul at JCI-accredited clinics. Siemens MAGNETOM Prisma, Philips Ingenia, GE Signa Pioneer. From £285. Report in English within 24h. Up to 76% cheaper than UK private.',
  keywords: 'MRI 3T Turkey, MRI 3 Tesla Istanbul, 3T MRI scan UK alternative, Siemens Prisma Turkey, MRI scan cost Turkey, private MRI cheap',
  openGraph: {
    title: 'MRI 3T Scan Turkey — From £285 (UK avg £1,200+)',
    description: 'Siemens MAGNETOM Prisma / Philips Ingenia 3T at JCI-accredited Istanbul clinics. English report in 24h. No referral needed.',
    url: 'https://thediagnostic.co.uk/scan/mri-3t',
  },
};

// ─── Data ──────────────────────────────────────────────────────

const MRI_CLINICS = getFeaturedClinics()
  .filter(c => c.featuredScans.some(s => s.code === 'mri_3t'))
  .slice(0, 6)
  .map(c => {
    const scan = c.featuredScans.find(s => s.code === 'mri_3t')!;
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
  { label: 'Price',              uk: '£900 – £1,600',    tr: 'From £285',                        winner: 'tr' },
  { label: 'Wait time',          uk: '4 – 16 weeks',     tr: '3 – 7 days',                       winner: 'tr' },
  { label: 'Field strength',     uk: '1.5T or 3T',       tr: '3T standard at our partners',       winner: 'tr' },
  { label: 'Scanner brands',     uk: 'Varies',           tr: 'Siemens Prisma / Philips Ingenia',  winner: 'tr' },
  { label: 'Report language',    uk: 'English',          tr: 'English (GMC-reg radiologist)',     winner: 'equal' },
  { label: 'Report turnaround',  uk: '2 – 5 days',      tr: '18 – 24 hours',                    winner: 'tr' },
  { label: 'GP letter',          uk: 'Extra cost',       tr: 'Included free',                    winner: 'tr' },
  { label: 'JCI accreditation',  uk: 'Rare',             tr: 'Standard at our partners',          winner: 'tr' },
];

const MRI_1T5_VS_3T = [
  { aspect: 'Signal-to-noise ratio', t15: 'Baseline',         t3: '2× higher',            better: '3T' },
  { aspect: 'Scan duration',         t15: '45 – 75 min',      t3: '20 – 45 min',          better: '3T' },
  { aspect: 'Brain detail',          t15: 'Good',             t3: 'Excellent (1mm slice)', better: '3T' },
  { aspect: 'Spinal cord',           t15: 'Standard',         t3: 'Superior resolution',  better: '3T' },
  { aspect: 'Cardiac MRI',           t15: 'Limited',          t3: 'Gold standard',        better: '3T' },
  { aspect: 'Breast MRI',            t15: 'Adequate',         t3: 'Preferred protocol',   better: '3T' },
  { aspect: 'Small lesion detection',t15: '≥ 5 mm reliable',  t3: '≥ 2 mm reliable',      better: '3T' },
  { aspect: 'Claustrophobia risk',   t15: 'Standard bore',    t3: 'Wide bore available',  better: 'equal' },
];

const SPECIALTIES = [
  { icon: '🧠', label: 'Brain & Spine', desc: 'Tumour detection, MS plaques, stroke, disc herniation, AVM mapping.' },
  { icon: '🫀', label: 'Cardiac MRI', desc: 'Heart function, myocardial perfusion, cardiomyopathy assessment.' },
  { icon: '🦴', label: 'Musculoskeletal', desc: 'Ligament tears, cartilage damage, joint disorders, bone marrow.' },
  { icon: '🫁', label: 'Abdomen & Pelvis', desc: 'Liver lesion characterisation, prostate, renal, gynaecology.' },
  { icon: '🔬', label: 'Breast MRI', desc: 'High-risk screening, implant integrity, pre-surgical staging.' },
  { icon: '🧬', label: 'Whole Body MRI', desc: 'Head-to-toe cancer surveillance without ionising radiation.' },
];

const FAQ = [
  {
    q: 'What is the difference between 1.5T and 3T MRI?',
    a: 'Tesla (T) measures the strength of the magnetic field. A 3T magnet is twice as strong as 1.5T, producing a higher signal-to-noise ratio. This means finer detail, shorter scan times, and better detection of small lesions (down to 2mm vs ~5mm on 1.5T). For brain, spine, cardiac, and musculoskeletal imaging, 3T is the current clinical standard.',
  },
  {
    q: 'Is 3T MRI safe?',
    a: 'Yes. 3T MRI is widely used worldwide with an excellent safety record. It uses a powerful magnetic field and radio waves — no ionising radiation. Standard contraindications apply: certain metal implants (pacemakers, cochlear implants, some surgical clips) may be incompatible. You will complete a safety screening form. Most modern implants are MRI-conditional — our clinical team will verify before booking.',
  },
  {
    q: 'What scanner models do your Turkish partner clinics use?',
    a: 'Our partners use Siemens MAGNETOM Prisma 3T, Siemens MAGNETOM Vida 3T, Philips Ingenia Ambition 3T, and GE Signa Pioneer 3T — the same top-tier scanners used in leading UK private hospitals.',
  },
  {
    q: 'Will my UK GP accept the report?',
    a: 'Yes. All reports are produced by GMC-registered subspecialist radiologists and written in English using standard UK clinical formatting, including findings, clinical correlation, and recommendation sections. A GP referral letter template is included at no extra cost.',
  },
  {
    q: 'How long does an MRI 3T scan take?',
    a: 'Typical scan time is 20–45 minutes depending on body region and number of sequences. Brain MRI is usually 25–30 minutes; lumbar spine 20–25 minutes; full spine or abdominal MRI 45–60 minutes. Total clinic time including registration, changing, and positioning is approximately 90 minutes.',
  },
  {
    q: 'Is contrast dye always needed?',
    a: 'Not always. Many MRI scans are performed without contrast. Contrast (gadolinium) is used when enhanced lesion characterisation is needed — for example, suspected tumours, post-surgical changes, or inflammatory conditions. Our clinical team will advise at booking.',
  },
  {
    q: 'Do I need a referral from a GP?',
    a: 'No. thediagnostic is a self-referral service. You can book directly. Our AI Scan Advisor helps confirm the appropriate protocol for your symptoms before we confirm the appointment.',
  },
  {
    q: 'How soon do I get my report?',
    a: 'Written radiology report within 18–24 hours of the scan. DICOM images and GP letter included. Reports are delivered via encrypted email to you and optionally to your GP.',
  },
];

const PREPARATION = [
  { step: '01', title: 'No fasting required', desc: 'For most MRI scans, you can eat and drink normally. Abdominal/pelvic MRI may require 4h fasting — we will advise at booking.' },
  { step: '02', title: 'No metal objects', desc: 'Remove jewellery, piercings, hairpins before arrival. Leave metal-containing items at home if possible.' },
  { step: '03', title: 'Declare implants', desc: 'Tell us about any surgical implants, pacemakers, cochlear implants, or shrapnel. We will check MRI compatibility before confirming.' },
  { step: '04', title: 'Wear comfortable clothing', desc: 'Loose cotton clothing is ideal. You may be asked to change into a clinic gown depending on the body area being scanned.' },
  { step: '05', title: 'Arrive 20 minutes early', desc: 'Complete the safety screening form on arrival. The radiographer will position you on the scanner table and explain the procedure.' },
  { step: '06', title: 'Lie still in the scanner', desc: 'The scanner is loud — earplugs or headphones are provided. Most 3T scanners have a wide bore design. The scan itself is painless.' },
];

// ─── Page ──────────────────────────────────────────────────────

export default function Mri3tPage() {
  const cheapestPrice = MRI_CLINICS.length > 0 ? Math.min(...MRI_CLINICS.map(c => c.priceGbp)) : 285;
  const avgUkPrice = 1200;
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

            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link>
              <span>/</span>
              <Link href="/scan" style={{ color: 'inherit' }}>Scan Types</Link>
              <span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>MRI 3T Scan</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3AABDB', display: 'inline-block' }} />
                  <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>Advanced Imaging · High-Field MRI</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
                  MRI 3T Scan in Turkey
                </h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Superior soft tissue imaging for brain, spine, joints, and abdomen at
                  JCI-accredited clinics in Istanbul. Siemens Prisma, Philips Ingenia, GE Pioneer.
                  Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=mri_3t" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>
                    Find Available Slots →
                  </Link>
                  <a href="https://wa.me/447700000000?text=MRI%203T%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>
                    Ask on WhatsApp
                  </a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { value: `From £${cheapestPrice}`, label: 'thediagnostic price' },
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
                <div style={{ fontSize: 42, fontWeight: 800, color: '#3AABDB', lineHeight: 1, marginBottom: 4 }}>£{cheapestPrice}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
                  UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUkPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {['3T scanner (Siemens / Philips)', 'GMC radiologist report', 'English report, 24h', 'GP letter template', 'DICOM images included'].map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                      <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <Link href="/book?scan=mri_3t" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center' }}>
                  Book MRI 3T Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────── */}
        <div style={{ background: '#0B3565', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✓ JCI-Accredited Radiology Centres', '✓ Siemens Prisma · Philips Ingenia · GE Pioneer', '✓ GMC-Registered Subspecialist Radiologist', '✓ No Referral Required', '✓ Report in English · 24h'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── 1.5T VS 3T ────────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>WHY 3T?</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>1.5T vs 3T MRI — What Difference Does It Make?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>Double the field strength means double the signal. For diagnostic clarity, that matters — especially for small lesions, cardiac, and neurological cases.</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '10px 0 0 0', fontWeight: 600 }}>Criterion</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', fontWeight: 600 }}>1.5 Tesla MRI</th>
                    <th style={{ padding: '14px 20px', textAlign: 'center', borderRadius: '0 10px 0 0', fontWeight: 600, background: '#3AABDB' }}>3 Tesla MRI</th>
                  </tr>
                </thead>
                <tbody>
                  {MRI_1T5_VS_3T.map((row, i) => (
                    <tr key={row.aspect} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 500, color: 'var(--text)' }}>{row.aspect}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>{row.t15}</td>
                      <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <span style={{ color: row.better === '3T' ? '#17A589' : 'var(--text)', fontWeight: row.better === '3T' ? 700 : 400 }}>
                          {row.better === '3T' && '✓ '}{row.t3}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── SPECIALTIES ───────────────────────────────────── */}
        <section style={{ padding: '0 24px 80px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3.5vw, 38px)', color: 'var(--primary-3)', marginBottom: 12 }}>What Can Be Scanned with MRI 3T?</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {SPECIALTIES.map(s => (
                <div key={s.label} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{s.label}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── UK vs TURKEY COMPARISON ───────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — MRI 3T</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Same scanner brands. Same image quality. Dramatically different cost and availability.</p>
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
                    <tr key={row.label} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg-2)' }}>
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
          </div>
        </section>

        {/* ── PARTNER CLINICS ───────────────────────────────── */}
        {MRI_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get Your MRI 3T in Istanbul</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560 }}>Every clinic verified for scanner model, radiologist credentials, and English reporting capability.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
                {MRI_CLINICS.map(clinic => {
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
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>MRI 3T from</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{clinic.ukPriceGbp.toLocaleString()}</div>
                            <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Clinic</Link>
                          <Link href={`/book?scan=mri_3t&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── PREPARATION ───────────────────────────────────── */}
        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PREPARATION GUIDE</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>How to Prepare for Your MRI 3T</h2>
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
        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--brand-blue)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Common Questions About MRI 3T</h2>
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
        <section style={{ padding: '64px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>
                Ready to Book Your MRI 3T?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
                Appointments in Istanbul within 3–7 days. No referral needed. English report delivered within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=mri_3t" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>
                  Find Available Slots →
                </Link>
                <a href="https://wa.me/447700000000?text=MRI%203T%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>
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
