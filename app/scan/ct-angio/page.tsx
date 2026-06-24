import { Metadata } from 'next';
import Link from 'next/link';
import { getClinicsByScan } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'CT Angiography in Turkey | From £490 | thediagnostic.co.uk',
  description: 'CT angiography scans in Istanbul from £490 — vs £1,800+ in the UK. JCI-accredited hospitals, 64-/128-slice scanners, cardiologist reports in English within 24 hours.',
  keywords: ['CT angiography Turkey', 'CTA scan Istanbul', 'coronary CTA abroad', 'cardiac CT scan Turkey', 'heart scan Turkey'],
  openGraph: {
    title: 'CT Angiography in Turkey from £490',
    description: 'Non-invasive vascular & coronary imaging at JCI-accredited Istanbul hospitals. Save 70% vs UK prices.',
    url: 'https://thediagnostic.co.uk/scan/ct-angio',
  },
};

const PRICE_GBP = 490;
const UK_PRICE_GBP = 1800;
const SAVING_PCT = Math.round((1 - PRICE_GBP / UK_PRICE_GBP) * 100);

const INDICATIONS = [
  {
    title: 'Coronary CTA',
    icon: '❤️',
    desc: 'Non-invasive assessment of coronary artery disease. Rules out significant stenosis without catheterisation.',
  },
  {
    title: 'Pulmonary Angiography',
    icon: '🫁',
    desc: 'Rapid detection of pulmonary embolism (PE) and evaluation of pulmonary vasculature.',
  },
  {
    title: 'Aortic Imaging',
    icon: '🩻',
    desc: 'Full aorta from arch to iliac bifurcation — aneurysm screening, dissection, pre-TAVI planning.',
  },
  {
    title: 'Carotid & Cerebral',
    icon: '🧠',
    desc: 'Carotid stenosis grading, intracranial aneurysm screening, stroke risk stratification.',
  },
  {
    title: 'Peripheral Vascular',
    icon: '🦵',
    desc: 'Run-off studies from renal arteries to feet — PAD assessment, bypass graft patency.',
  },
  {
    title: 'Renal & Visceral',
    icon: '🔬',
    desc: 'Renal artery stenosis, mesenteric ischaemia, pre-operative vascular mapping.',
  },
];

const PREP_STEPS = [
  { step: '1', title: 'Fast for 4 hours', detail: 'No food or milk for 4 hours before the scan. Water and medications are fine.' },
  { step: '2', title: 'Renal function check', detail: 'eGFR blood test required if you have diabetes, kidney disease, or are on metformin.' },
  { step: '3', title: 'Heart rate optimisation', detail: 'For coronary CTA: beta-blockers may be given on the day to achieve HR <65 bpm for sharper images.' },
  { step: '4', title: 'Allergy history', detail: 'Inform the team of any prior reactions to iodine contrast or shellfish.' },
  { step: '5', title: 'Arrival & IV cannula', detail: 'Arrive 30 min early. IV access is placed for contrast injection.' },
  { step: '6', title: 'Scan (10–20 min)', detail: 'You lie still in the CT gantry. Contrast is injected and you may feel warm briefly. Most scans complete in under 20 minutes.' },
];

const FAQ = [
  {
    q: 'Is CT angiography safe?',
    a: 'Yes. CTA uses iodine contrast and X-ray radiation. Radiation dose is low (2–15 mSv depending on protocol). Contrast reactions are rare (<1%). Overall risk is very low for most patients.',
  },
  {
    q: 'How is CTA different from invasive angiography?',
    a: 'CT angiography is entirely non-invasive — no catheters, no punctures, no arterial access. It is performed as an outpatient procedure and patients go home immediately after.',
  },
  {
    q: 'Will I receive sedation?',
    a: 'No sedation is required. For coronary CTA, a beta-blocker tablet or IV may be given to slow the heart rate, but you remain awake and alert throughout.',
  },
  {
    q: 'Who reports the scan?',
    a: 'All studies are reported by consultant cardiologists or vascular radiologists. Reports are written in English and delivered via secure email within 24 hours.',
  },
  {
    q: 'Can I fly home the same day?',
    a: 'Yes. There is no recovery time. You can leave the clinic immediately after the scan. Flying on the same or next day is fine for standard CTA studies.',
  },
  {
    q: 'What if my GP referred me for a private CTA in the UK?',
    a: 'You can use your GP referral letter at our Istanbul partner clinics. The radiologist\'s report carries the same diagnostic weight as a UK private report.',
  },
  {
    q: 'Is the equipment up to UK standards?',
    a: 'Our partner clinics use Siemens SOMATOM Force, GE Revolution, and Philips IQon scanners — the same top-tier equipment used at leading UK centres such as GSTT and the Brompton.',
  },
  {
    q: 'What does the price include?',
    a: 'The price covers the scan, IV contrast, radiologist/cardiologist report in English, and a digital copy of all images on a USB or via secure cloud download.',
  },
];

export default function CtAngioPage() {
  const clinics = getClinicsByScan('ct_angio');

  return (
    <main style={{ fontFamily: 'var(--font-body)', background: 'var(--bg)', color: '#1a2a3a' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0B3565 0%, #082A4A 60%, #051d36 100%)',
        padding: '80px 24px 72px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 20, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 600 }}>CT Angiography · Istanbul</span>
            </div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, lineHeight: 1.1, margin: '0 0 20px', fontFamily: 'var(--font-serif)' }}>
              CT Angiography<br />
              <span style={{ color: '#3AABDB' }}>from £{PRICE_GBP}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, lineHeight: 1.7, maxWidth: 540, margin: '0 0 32px' }}>
              Non-invasive vascular and coronary imaging at JCI-accredited Istanbul hospitals. 128-slice scanners, cardiologist-reported in English within 24 hours.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/book" style={{ background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '13px 28px', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                Book CT Angiography
              </Link>
              <a href="https://wa.me/447700000000?text=I%20need%20CT%20angiography%20in%20Istanbul" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', borderRadius: 8, padding: '13px 20px', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Price card */}
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '28px 32px', minWidth: 220, textAlign: 'center', flexShrink: 0 }}>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Istanbul price</div>
            <div style={{ color: '#3AABDB', fontSize: 42, fontWeight: 800, letterSpacing: -1 }}>£{PRICE_GBP}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, margin: '4px 0 16px', textDecoration: 'line-through' }}>UK avg £{UK_PRICE_GBP.toLocaleString()}</div>
            <div style={{ background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.4)', borderRadius: 8, padding: '6px 12px', color: '#17A589', fontSize: 13, fontWeight: 700 }}>
              Save {SAVING_PCT}%
            </div>
            <div style={{ marginTop: 16, color: 'rgba(255,255,255,0.45)', fontSize: 12, lineHeight: 1.6 }}>
              Includes contrast &<br />English cardiologist report
            </div>
          </div>
        </div>
      </section>

      {/* UK vs Turkey comparison */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-serif)' }}>UK vs Turkey — CT Angiography</h2>
          <p style={{ textAlign: 'center', color: '#607D8B', marginBottom: 36 }}>Like-for-like comparison on the metrics that matter</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F6F9FC' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: '#546E7A', borderBottom: '2px solid #CDDDE9' }}>Factor</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#546E7A', borderBottom: '2px solid #CDDDE9' }}>🇬🇧 UK Private</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: 600, color: '#0B3565', borderBottom: '2px solid #3AABDB', background: 'rgba(58,171,219,0.05)' }}>🇹🇷 Istanbul</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Scan price', '£1,200 – £2,500', `£${PRICE_GBP} – £750`],
                  ['Wait time (private)', '2–4 weeks', '24–72 hours'],
                  ['Scanner generation', '64–256 slice', '128–256 slice'],
                  ['Report language', 'English', 'English'],
                  ['Report turnaround', '3–7 days', '24 hours'],
                  ['JCI accreditation', 'Not applicable', '✓ Available'],
                  ['Cardiologist review', 'Variable', '✓ Included'],
                  ['Images on USB/cloud', 'Extra charge', '✓ Included'],
                ].map(([factor, uk, tr], i) => (
                  <tr key={factor} style={{ background: i % 2 === 0 ? '#fff' : '#F6F9FC' }}>
                    <td style={{ padding: '11px 16px', fontWeight: 500, borderBottom: '1px solid #CDDDE9' }}>{factor}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: '#607D8B', borderBottom: '1px solid #CDDDE9' }}>{uk}</td>
                    <td style={{ padding: '11px 16px', textAlign: 'center', color: '#0B3565', fontWeight: 600, borderBottom: '1px solid #CDDDE9', background: 'rgba(58,171,219,0.03)' }}>{tr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Indications */}
      <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-serif)' }}>What CT Angiography Can Assess</h2>
          <p style={{ textAlign: 'center', color: '#607D8B', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px' }}>
            CTA provides high-resolution 3D images of blood vessels without invasive catheters
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
            {INDICATIONS.map(ind => (
              <div key={ind.title} style={{ background: '#fff', borderRadius: 12, padding: '24px', border: '1px solid var(--line)', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{ind.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#082A4A' }}>{ind.title}</h3>
                <p style={{ fontSize: 14, color: '#546E7A', margin: 0, lineHeight: 1.65 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner clinics */}
      {clinics.length > 0 && (
        <section style={{ padding: '64px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-serif)' }}>Partner Clinics for CT Angiography</h2>
            <p style={{ textAlign: 'center', color: '#607D8B', marginBottom: 40 }}>{clinics.length} verified Istanbul centres</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
              {clinics.map(clinic => {
                const scan = clinic.featuredScans.find(s => s.code === 'ct_angio');
                return (
                  <div key={clinic.slug} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: '24px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16, color: '#082A4A' }}>{clinic.shortName}</div>
                        <div style={{ color: '#607D8B', fontSize: 13, marginTop: 2 }}>{clinic.city} · {clinic.jciAccredited ? 'JCI Accredited' : 'ISO Accredited'}</div>
                      </div>
                      {scan && (
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: '#0B3565', fontWeight: 800, fontSize: 20 }}>£{scan.priceGbp}</div>
                          <div style={{ color: '#17A589', fontSize: 11, fontWeight: 600 }}>Save {Math.round((1 - scan.priceGbp / scan.ukPriceGbp) * 100)}%</div>
                        </div>
                      )}
                    </div>
                    {scan && <div style={{ fontSize: 12, color: '#78909C' }}>{scan.deviceName}</div>}
                    <Link href={`/clinics/${clinic.slug}`} style={{ marginTop: 'auto', display: 'block', textAlign: 'center', background: 'var(--primary)', color: '#fff', borderRadius: 7, padding: '9px 16px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
                      View Clinic
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Preparation guide */}
      <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-serif)' }}>How to Prepare</h2>
          <p style={{ textAlign: 'center', color: '#607D8B', marginBottom: 40 }}>Simple preparation ensures the best image quality</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PREP_STEPS.map(s => (
              <div key={s.step} style={{ display: 'flex', gap: 20, background: '#fff', borderRadius: 12, padding: '20px 24px', border: '1px solid var(--line)' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: '#082A4A' }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#546E7A', lineHeight: 1.65 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 28, fontWeight: 700, marginBottom: 40, fontFamily: 'var(--font-serif)' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQ.map(item => (
              <details key={item.q} style={{ background: 'var(--bg)', borderRadius: 10, padding: '18px 20px', border: '1px solid var(--line)' }}>
                <summary style={{ fontWeight: 600, fontSize: 15, cursor: 'pointer', color: '#082A4A', listStyle: 'none' }}>
                  {item.q}
                </summary>
                <p style={{ margin: '12px 0 0', fontSize: 14, color: '#546E7A', lineHeight: 1.7 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '72px 24px', background: 'linear-gradient(135deg, #082A4A, #0B3565)', textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: 32, fontWeight: 700, margin: '0 0 12px', fontFamily: 'var(--font-serif)' }}>
          Ready to book your CT Angiography?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, margin: '0 0 32px' }}>
          Same-week appointments available. English-speaking coordinators on hand.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/book" style={{ background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '14px 32px', fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Book Now — from £{PRICE_GBP}
          </Link>
          <Link href="/compare/pet-ct-uk-vs-turkey" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: 8, padding: '14px 24px', fontWeight: 600, fontSize: 15, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
            Compare All Prices
          </Link>
        </div>
      </section>

    </main>
  );
}
