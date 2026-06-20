import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getFeaturedClinics } from '@/lib/tr-clinics.data';

export const metadata: Metadata = {
  title: 'PET-CT Scan: UK vs Turkey Full Price Comparison 2026 | thediagnostic',
  description: 'Detailed cost breakdown: PET-CT in UK private hospitals vs Turkey. NHS waiting times, scanner quality, radiologist credentials, and total cost including travel. Updated June 2026.',
  keywords: 'PET CT UK vs Turkey cost, PET scan comparison, PET CT cheap alternative UK, medical tourism Turkey PET CT cost breakdown',
  openGraph: {
    title: 'PET-CT UK vs Turkey — Full Breakdown 2026',
    description: 'Scanner models, radiologist credentials, prices, wait times, and total cost of care. Updated June 2026.',
    url: 'https://thediagnostic.co.uk/compare/pet-ct-uk-vs-turkey',
  },
};

const petCtClinics = getFeaturedClinics()
  .filter(c => c.featuredScans.some(s => s.code === 'pet_ct'))
  .slice(0, 4)
  .map(c => {
    const scan = c.featuredScans.find(s => s.code === 'pet_ct')!;
    return { name: c.name, device: scan.deviceName, priceGbp: scan.priceGbp, ukPriceGbp: scan.ukPriceGbp, jci: c.jciAccredited };
  });

const DETAILED = [
  { category: 'Cost', uk: { val: '£3,500 – £5,200', note: 'Private hospital, tracer + scan only' }, tr: { val: 'From £1,200', note: 'All-inclusive: tracer + scan + report + DICOM + GP letter' } },
  { category: 'NHS wait', uk: { val: '6 – 18 months', note: 'Referral required; varies by region' }, tr: { val: 'N/A', note: 'Self-referral, private, no NHS wait' } },
  { category: 'Private wait', uk: { val: '2 – 4 weeks', note: 'Subject to tracer availability' }, tr: { val: '3 – 7 days', note: 'Most clinics stock F-18 FDG daily' } },
  { category: 'Scanner model', uk: { val: 'Varies (often Siemens Biograph 16 or older)', note: 'Some UK private centres use 2010–2015 era scanners' }, tr: { val: 'Siemens Biograph Vision / mCT · GE Discovery MI', note: 'Latest generation — 2018–2024 installs' } },
  { category: 'Radiation dose', uk: { val: '7 – 10 mSv (standard)', note: 'Depends on scanner and protocol' }, tr: { val: '5 – 8 mSv', note: 'Lower due to newer scanner sensitivity' } },
  { category: 'Report by', uk: { val: 'UK radiologist (GMC registered)', note: 'Usually 2–5 day turnaround' }, tr: { val: 'GMC-registered subspecialist radiologist', note: 'Report delivered in English within 18–24 hours' } },
  { category: 'JCI accreditation', uk: { val: 'Rare — most UK private hospitals are not JCI', note: 'CQC regulated only' }, tr: { val: 'Standard at our partner hospitals', note: 'Acıbadem, Medical Park — JCI since 2008' } },
  { category: 'Tracer included', uk: { val: 'Usually billed separately', note: 'F-18 FDG add-on: £300 – £500 extra' }, tr: { val: 'Included in published price', note: 'No hidden tracer surcharge' } },
  { category: 'Travel + hotel cost', uk: { val: '£0 – £200 (local)', note: 'If travelling to London from regions, add hotel' }, tr: { val: '£150 – £400 return (Istanbul)', note: 'Flights + 2-night hotel often totals £300–£600' } },
  { category: 'Concierge', uk: { val: 'None', note: '' }, tr: { val: 'Included at no charge', note: 'Airport transfer, hotel coordination, WhatsApp support' } },
];

const TOTAL_COST = [
  { scenario: 'UK Private (London)', breakdown: ['Scan: £3,800', 'Tracer: £400', 'GP letter: £75', 'Travel: £120'], total: '£4,395' },
  { scenario: 'thediagnostic (Istanbul)', breakdown: ['Scan + tracer: £1,200', 'Report + GP letter: included', 'Flight (return): £180', 'Hotel (2 nights): £160'], total: '£1,540' },
];

export default function ComparePetCtPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #061E32 0%, #082A4A 100%)', padding: '72px 24px 60px' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 20, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link><span>/</span>
              <Link href="/scan/pet-ct" style={{ color: 'inherit' }}>PET-CT</Link><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>UK vs Turkey Comparison</span>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(58,171,219,0.15)', border: '1px solid rgba(58,171,219,0.3)', borderRadius: 100, padding: '5px 14px', marginBottom: 20 }}>
              <span style={{ color: '#3AABDB', fontSize: 13, fontWeight: 500 }}>Updated June 2026 · Price Comparison</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 52px)', color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
              PET-CT Scan: UK vs Turkey<br />Full Cost Breakdown
            </h1>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: 640, marginBottom: 32 }}>
              We compare scanner models, radiologist credentials, wait times, and total out-of-pocket cost — including travel — so you can make an informed decision.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#3AABDB' }}>£4,395</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Typical UK private total</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 24, fontWeight: 300 }}>vs</div>
              <div style={{ background: 'rgba(23,165,137,0.15)', border: '1px solid rgba(23,165,137,0.3)', borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#17A589' }}>£1,540</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Turkey incl. flights + hotel</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#fff' }}>65%</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>Total cost saving</div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>DETAILED BREAKDOWN</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--primary-3)' }}>Category-by-Category Comparison</h2>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: 'var(--primary)', color: '#fff' }}>
                    <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '10px 0 0 0', fontWeight: 600, width: '22%' }}>Category</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, width: '39%' }}>🇬🇧 UK Private</th>
                    <th style={{ padding: '14px 20px', textAlign: 'left', borderRadius: '0 10px 0 0', fontWeight: 600, width: '39%' }}>🇹🇷 thediagnostic (Turkey)</th>
                  </tr>
                </thead>
                <tbody>
                  {DETAILED.map((row, i) => (
                    <tr key={row.category} style={{ background: i % 2 === 0 ? '#fff' : 'var(--bg)', verticalAlign: 'top' }}>
                      <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--primary)', borderBottom: '1px solid var(--line)' }}>{row.category}</td>
                      <td style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
                        <div style={{ fontWeight: 500, color: 'var(--text)', marginBottom: 4 }}>{row.uk.val}</div>
                        {row.uk.note && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.uk.note}</div>}
                      </td>
                      <td style={{ padding: '16px 20px', borderBottom: '1px solid var(--line)' }}>
                        <div style={{ fontWeight: 600, color: '#17A589', marginBottom: 4 }}>✓ {row.tr.val}</div>
                        {row.tr.note && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.tr.note}</div>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 24px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>TOTAL COST OF CARE</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--primary-3)' }}>What You Actually Pay — End to End</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 600, marginTop: 12 }}>Including all ancillary costs. Based on a single PET-CT scan, standard protocol, patient travelling from London.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {TOTAL_COST.map(s => (
                <div key={s.scenario} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 28 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>{s.scenario}</h3>
                  {s.breakdown.map(b => (
                    <div key={b} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--line)', fontSize: 14, color: 'var(--text-muted)' }}>
                      <span>{b.split(':')[0]}</span><span>{b.split(':')[1]}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0', fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>
                    <span>Total</span><span>{s.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {petCtClinics.length > 0 && (
          <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
            <div style={{ maxWidth: 960, margin: '0 auto' }}>
              <div style={{ marginBottom: 40 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>PARTNER CLINICS</div>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--primary-3)' }}>thediagnostic Partner PET-CT Clinics</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {petCtClinics.map(c => (
                  <div key={c.name} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>{c.name}</h3>
                      {c.jci && <span style={{ background: '#EBF5FB', color: '#1B4F72', borderRadius: 4, padding: '2px 7px', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>JCI</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>{c.device}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{c.priceGbp.toLocaleString()}</div>
                      <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                        Save {Math.round(((c.ukPriceGbp - c.priceGbp) / c.ukPriceGbp) * 100)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 32 }}>
                <Link href="/scan/pet-ct" style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', borderRadius: 10, padding: '13px 28px', fontSize: 15, fontWeight: 600 }}>
                  See All PET-CT Clinics →
                </Link>
              </div>
            </div>
          </section>
        )}

        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '56px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 4vw, 38px)', color: '#fff', marginBottom: 14 }}>Ready to Save on Your PET-CT?</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 16, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>Appointments within 3–7 days. No referral. UK-standard report in 24 hours.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/book?scan=pet_ct" style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700 }}>Book PET-CT Now →</Link>
                <Link href="/scan/pet-ct" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontSize: 15 }}>Learn More</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
