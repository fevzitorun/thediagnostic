import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicsByScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'MRI 3T Scan in Turkey — From £285 | thediagnostic',
  description: 'Book a 3 Tesla MRI scan in Istanbul at JCI-accredited clinics. Siemens MAGNETOM, Philips Ingenia 3T. Up to 76% cheaper than UK private. GMC-registered radiologist report in English within 24 hours.',
  keywords: 'MRI 3T Turkey, MRI scan Istanbul, 3 Tesla MRI cheap UK alternative, Siemens MAGNETOM Turkey, MRI cost Turkey vs UK',
  openGraph: {
    title: 'MRI 3T Scan Turkey — From £285 (UK avg £1,200+)',
    description: 'Siemens MAGNETOM / Philips Ingenia 3T at JCI-accredited Istanbul clinics. Report in English 24h.',
    url: 'https://thediagnostic.co.uk/scan/mri-3t',
  },
};

const MRI_CLINICS = getClinicsByScan('mri_3t').slice(0, 6).map(c => {
  const scan = c.featuredScans.find(s => s.code === 'mri_3t')!;
  return { slug: c.slug, name: c.name, city: c.city, group: c.group, jci: c.jciAccredited, iso: c.isoAccredited, device: scan.deviceName, priceGbp: scan.priceGbp, ukPriceGbp: scan.ukPriceGbp, rating: c.rating };
});

const UK_VS_TR = [
  { label: 'Price (single body part)', uk: '£900 – £1,500', tr: 'From £285', winner: 'tr' },
  { label: 'Wait time', uk: '4 – 16 weeks (NHS)', tr: '3 – 7 days', winner: 'tr' },
  { label: 'Scanner field strength', uk: '1.5T or 3T', tr: '3T — Siemens / Philips / GE', winner: 'tr' },
  { label: 'Report language', uk: 'English', tr: 'English (GMC-reg radiologist)', winner: 'equal' },
  { label: 'Report turnaround', uk: '3 – 7 days', tr: '18 – 24 hours', winner: 'tr' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
  { label: 'Concierge service', uk: 'None', tr: 'Flight + hotel + transfer', winner: 'tr' },
];

const FAQ = [
  { q: 'Why choose 3T over 1.5T MRI?', a: '3 Tesla MRI produces images with twice the signal-to-noise ratio of 1.5T — delivering sharper images, better resolution for small lesions, and shorter scan times. For brain, spine, musculoskeletal, and abdominal imaging, 3T is the current clinical gold standard.' },
  { q: 'Why is MRI so much cheaper in Turkey?', a: 'Turkish private hospitals operate at significantly lower overhead costs while using the same scanner technology (Siemens MAGNETOM, Philips Ingenia). Clinical staff hold international credentials. The savings are structural — not a reflection of scan quality.' },
  { q: 'Will my UK GP accept the report?', a: 'Yes. All reports are produced by GMC-registered subspecialist radiologists in English using standard UK clinical formatting. A GP letter template for NHS onward referral is included free of charge.' },
  { q: 'Do I need a referral?', a: 'No. thediagnostic is a self-referral service. You can book directly. Our AI Scan Advisor will verify that MRI is appropriate for your situation.' },
  { q: 'How do I prepare for an MRI?', a: 'Remove all metal objects and jewellery. Inform us of any implants, pacemakers, or metallic clips. Fasting is usually not required unless contrast (gadolinium) is needed — we will advise. Wear comfortable clothing without metal zips.' },
  { q: 'Is MRI safe?', a: 'MRI uses magnetic fields and radio waves — no ionising radiation. It is considered extremely safe. Patients with certain metallic implants (older pacemakers, cochlear implants) may not be suitable — our clinical team will screen you in advance.' },
  { q: 'What body parts can be scanned?', a: 'Brain and spine, musculoskeletal (knee, shoulder, hip, wrist, ankle), abdomen and pelvis, cardiac, breast, prostate, liver, whole-body. Ask our clinical team if your specific area is available.' },
  { q: 'What is included in the price?', a: 'Scan time, full written radiology report by a subspecialist radiologist, GP referral letter template, and DICOM images. Gadolinium contrast (if clinically indicated) may be quoted separately at the time of booking.' },
];

const PREP = [
  { step: '01', title: 'Remove all metal', desc: 'Jewellery, piercings, hearing aids, removable dental work — all must be removed before entering the scanner room.' },
  { step: '02', title: 'Declare implants', desc: 'Pacemakers, cochlear implants, aneurysm clips, joint replacements, surgical staples — tell us at booking. Most modern implants are MRI-conditional.' },
  { step: '03', title: 'Contrast protocol', desc: 'If gadolinium contrast is needed, a cannula is inserted before scanning. Inform us of any kidney problems or prior gadolinium reactions.' },
  { step: '04', title: 'Wear loose clothing', desc: 'Comfortable, metal-free clothing. A gown will be provided. Leave valuables at home or in the secure locker.' },
  { step: '05', title: 'Scan takes 20–60 min', desc: 'Lie still in the scanner (open-bore available at some clinics). Earplugs provided — the machine is loud. Completely painless.' },
  { step: '06', title: 'Report in 18–24 hours', desc: 'Delivered to your email in English. DICOM images on CD or secure download. GP letter included.' },
];

export default function Mri3tPage() {
  const cheapest = MRI_CLINICS.length > 0 ? Math.min(...MRI_CLINICS.map(c => c.priceGbp)) : 285;
  const avgUk = 1200;
  const saving = Math.round(((avgUk - cheapest) / avgUk) * 100);

  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #061E32 0%, #082A4A 55%, #0B3565 100%)', padding: '72px 24px 60px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link><span>/</span>
              <Link href="/scan" style={{ color: 'inherit' }}>Scan Types</Link><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>MRI 3T</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3AABDB', display: 'inline-block' }} />
                  <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>High-Field MRI · 3 Tesla</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>MRI 3T Scan in Turkey</h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  High-field 3 Tesla MRI at JCI-accredited clinics in Istanbul. Siemens MAGNETOM, Philips Ingenia, GE Signa. GMC-registered radiologist report in English within 24 hours. Up to {saving}% cheaper than UK private hospitals.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=mri_3t" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Find Available Slots →</Link>
                  <a href="https://wa.me/447700000000?text=MRI%203T%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 500 }}>Ask on WhatsApp</a>
                </div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[{ value: `From £${cheapest}`, label: 'thediagnostic price' }, { value: `Save ${saving}%`, label: 'vs UK private avg' }, { value: '3–7 days', label: 'appointment wait' }, { value: '24h', label: 'report turnaround' }].map(s => (
                    <div key={s.label} style={{ borderLeft: '2px solid rgba(58,171,219,0.35)', paddingLeft: 14 }}>
                      <div style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', fontWeight: 700, color: '#3AABDB', fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 24px', minWidth: 220, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>From</div>
                <div style={{ fontSize: 42, fontWeight: 800, color: '#3AABDB', lineHeight: 1, marginBottom: 4 }}>£{cheapest}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>UK private avg: <span style={{ textDecoration: 'line-through' }}>£{avgUk.toLocaleString()}</span></div>
                {['3T scanner included', 'GMC radiologist report', 'English report, 24h', 'GP letter template', 'DICOM images'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                    <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/book?scan=mri_3t" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Book MRI 3T Now</Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ background: '#0B3565', borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '14px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            {['✓ JCI-Accredited Clinics', '✓ Siemens / Philips / GE 3T', '✓ GMC-Registered Radiologist', '✓ No GP Referral Required', '✓ Report in English · 24h'].map(t => (
              <span key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            ))}
          </div>
        </div>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — MRI 3T</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Same scanner technology. Same clinical standards. Dramatically different cost.</p>
            </div>
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
                    <td style={{ padding: '14px 20px', fontWeight: 500 }}>{row.label}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center', color: row.winner === 'tr' ? 'var(--text-muted)' : 'var(--text)' }}>{row.uk}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                      <span style={{ color: row.winner === 'tr' ? '#17A589' : 'var(--text)', fontWeight: row.winner === 'tr' ? 700 : 400 }}>{row.winner === 'tr' && '✓ '}{row.tr}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {MRI_CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 48 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>Where to Get Your MRI 3T</h2>
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
                          <div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>MRI 3T from</div><div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp}</div></div>
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

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PREPARATION GUIDE</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>How to Prepare for Your MRI 3T</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {PREP.map(step => (
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

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQ</div>
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

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(26px, 4vw, 40px)', color: '#fff', marginBottom: 14 }}>Ready to Book Your MRI 3T?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>Appointments within 3–7 days. No referral needed. UK-standard report within 24 hours.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=mri_3t" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Find Available Slots →</Link>
                <a href="https://wa.me/447700000000?text=MRI%203T%20scan%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
