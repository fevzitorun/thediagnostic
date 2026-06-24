import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicsByScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'SPECT-CT Scan in Turkey — From £650 | thediagnostic',
  description: 'Book SPECT-CT in Istanbul. Bone scans, thyroid imaging, cardiac perfusion and renal studies at JCI-accredited clinics. Up to 70% cheaper than UK. Siemens Symbia Intevo. English report 24h.',
  keywords: 'SPECT CT Turkey, bone scan Istanbul, cardiac perfusion Turkey, SPECT CT cost UK alternative, nuclear medicine Turkey',
  openGraph: {
    title: 'SPECT-CT Scan Turkey — From £650 (UK avg £2,200+)',
    description: 'Siemens Symbia Intevo at JCI-accredited Istanbul clinics. Bone, thyroid, cardiac studies. English report 24h.',
    url: 'https://thediagnostic.co.uk/scan/spect-ct',
  },
};

const CLINICS = getClinicsByScan('spect_ct').slice(0, 6).map(c => {
  const scan = c.featuredScans.find(s => s.code === 'spect_ct')!;
  return { slug: c.slug, name: c.name, city: c.city, group: c.group, jci: c.jciAccredited, iso: c.isoAccredited, device: scan.deviceName, priceGbp: scan.priceGbp, ukPriceGbp: scan.ukPriceGbp };
});

const INDICATIONS = [
  { title: 'Bone Scan', desc: 'Detects bone metastases, stress fractures, osteomyelitis, Paget\'s disease, and unexplained bone pain. Whole-body bone scan in a single session.' },
  { title: 'Cardiac Perfusion (MPI)', desc: 'Myocardial perfusion imaging — identifies areas of reduced blood flow (ischaemia) and irreversible damage (infarction). Key for CAD assessment.' },
  { title: 'Thyroid Imaging', desc: 'Evaluates thyroid nodules, ectopic thyroid tissue, and post-thyroidectomy remnant detection. Tc-99m pertechnetate or I-123 tracer depending on indication.' },
  { title: 'Renal Scintigraphy', desc: 'DMSA/MAG3 renal scans for differential renal function, obstruction assessment, and renal scarring post-infection.' },
  { title: 'Hepatobiliary (HIDA)', desc: 'Assesses bile duct patency, gallbladder function, and post-surgical biliary leaks. Tc-99m mebrofenin tracer.' },
  { title: 'Sentinel Node Mapping', desc: 'Pre-surgical lymphoscintigraphy for breast cancer, melanoma, and gynaecological malignancies — guides surgical lymph node sampling.' },
];

const UK_VS_TR = [
  { label: 'Price', uk: '£1,800 – £3,000', tr: 'From £650', winner: 'tr' },
  { label: 'Wait time', uk: '4 – 12 weeks (NHS)', tr: '3 – 7 days', winner: 'tr' },
  { label: 'System', uk: 'Varies', tr: 'Siemens Symbia Intevo Bold', winner: 'tr' },
  { label: 'Report turnaround', uk: '3 – 7 days', tr: '18 – 24 hours', winner: 'tr' },
  { label: 'Report language', uk: 'English', tr: 'English (GMC-reg radiologist)', winner: 'equal' },
  { label: 'JCI accreditation', uk: 'Rare', tr: 'Standard at our partners', winner: 'tr' },
];

export default function SpectCtPage() {
  const cheapest = CLINICS.length > 0 ? Math.min(...CLINICS.map(c => c.priceGbp)) : 650;
  const avgUk = 2200;
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
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>SPECT-CT</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#3AABDB', display: 'inline-block' }} />
                  <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>Nuclear Medicine · Hybrid SPECT+CT</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 58px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>SPECT-CT Scan in Turkey</h1>
                <p style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 580, marginBottom: 32 }}>
                  Bone scans, cardiac perfusion, thyroid and renal scintigraphy at JCI-accredited clinics in Istanbul. Siemens Symbia Intevo Bold. GMC-registered radiologist report in English within 24 hours. Up to {saving}% cheaper than UK.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
                  <Link href="/book?scan=spect_ct" style={{ background: '#17A589', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Find Available Slots →</Link>
                  <a href="https://wa.me/447700000000?text=SPECT-CT%20enquiry" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '13px 26px', borderRadius: 10, fontSize: 15 }}>Ask on WhatsApp</a>
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
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>UK avg: <span style={{ textDecoration: 'line-through' }}>£{avgUk.toLocaleString()}</span></div>
                {['Tracer + scan included', 'Nuclear medicine report', 'English report, 24h', 'GP letter template', 'DICOM images'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 10 }}>
                    <span style={{ color: '#17A589', fontWeight: 700 }}>✓</span>{f}
                  </div>
                ))}
                <Link href="/book?scan=spect_ct" style={{ display: 'block', background: '#17A589', color: '#fff', borderRadius: 8, padding: '11px 0', fontSize: 14, fontWeight: 600, textAlign: 'center', marginTop: 20 }}>Book SPECT-CT Now</Link>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>INDICATIONS</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>What SPECT-CT Can Detect</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Nuclear medicine functional imaging combined with CT anatomy — in a single session.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
              {INDICATIONS.map(ind => (
                <div key={ind.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '24px 24px 24px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 4, background: 'var(--brand-blue)' }} />
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{ind.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.65 }}>{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PRICE COMPARISON</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)', marginBottom: 12 }}>UK Private vs Turkey — SPECT-CT</h2>
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

        {CLINICS.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--primary-3)' }}>Where to Get Your SPECT-CT</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {CLINICS.map(clinic => {
                  const s = Math.round(((clinic.ukPriceGbp - clinic.priceGbp) / clinic.ukPriceGbp) * 100);
                  return (
                    <div key={clinic.slug} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                      <div style={{ background: 'var(--primary)', padding: '16px 20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 2 }}>{clinic.name}</h3>
                          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{clinic.city} · {clinic.group}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {clinic.jci && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700 }}>JCI</span>}
                        </div>
                      </div>
                      <div style={{ padding: 18 }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{clinic.device}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
                          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>£{clinic.priceGbp}</div>
                          <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>Save {s}%</div>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link href={`/clinics/${clinic.slug}`} style={{ flex: 1, background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '8px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>View Clinic</Link>
                          <Link href={`/book?scan=spect_ct&clinic=${clinic.slug}`} style={{ flex: 1, border: '1.5px solid var(--accent)', color: 'var(--accent)', borderRadius: 8, padding: '8px 0', fontSize: 13, fontWeight: 600, textAlign: 'center', display: 'block' }}>Book Slot</Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '52px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 4vw, 38px)', color: '#fff', marginBottom: 14 }}>Ready to Book Your SPECT-CT?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>Appointments within 3–7 days. No referral needed. UK-standard report within 24 hours.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=spect_ct" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Find Available Slots →</Link>
                <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Ask on WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
