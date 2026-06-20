import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getClinicBySlug, CLINICS } from '@/lib/tr-clinics.data';

export async function generateStaticParams() {
  return CLINICS.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) return {};
  return {
    title: `${clinic.name} — Medical Imaging in ${clinic.city}, Turkey | thediagnostic`,
    description: `${clinic.description.slice(0, 155)}`,
    openGraph: { title: clinic.name, description: clinic.description.slice(0, 155), url: `https://thediagnostic.co.uk/clinics/${slug}` },
  };
}

export default async function ClinicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinic = getClinicBySlug(slug);
  if (!clinic) notFound();

  const petCtScan = clinic.featuredScans.find(s => s.code === 'pet_ct');
  const cheapestScan = clinic.featuredScans.reduce((min, s) => s.priceGbp < min.priceGbp ? s : min, clinic.featuredScans[0]);

  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section style={{ background: 'linear-gradient(135deg, #061E32 0%, #082A4A 100%)', padding: '60px 24px 48px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16, fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              <Link href="/" style={{ color: 'inherit' }}>Home</Link><span>/</span>
              <Link href="/destinations/turkey/istanbul" style={{ color: 'inherit' }}>Istanbul</Link><span>/</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{clinic.name}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                  {clinic.jciAccredited && <span style={{ background: 'rgba(58,171,219,0.2)', border: '1px solid rgba(58,171,219,0.4)', color: '#3AABDB', borderRadius: 100, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>JCI Accredited</span>}
                  {clinic.isoAccredited && <span style={{ background: 'rgba(23,165,137,0.2)', border: '1px solid rgba(23,165,137,0.4)', color: '#17A589', borderRadius: 100, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>ISO Certified</span>}
                  {clinic.internationalPatientCentre && <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', borderRadius: 100, padding: '3px 12px', fontSize: 12 }}>International Patient Centre</span>}
                </div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#fff', lineHeight: 1.15, marginBottom: 12 }}>{clinic.name}</h1>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
                  📍 {clinic.address}, {clinic.city}, Turkey
                  {clinic.group && <span style={{ marginLeft: 16, color: 'rgba(255,255,255,0.4)' }}>· {clinic.group} Group</span>}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                  <span style={{ color: '#FBBF24', fontSize: 16 }}>{'★'.repeat(Math.round(clinic.rating))}</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{clinic.rating}</span>
                  {clinic.languages && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>· {clinic.languages.map(l => l.toUpperCase()).join(' · ')}</span>}
                </div>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 600, marginBottom: 28 }}>{clinic.description}</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href={`/book?clinic=${clinic.slug}`} style={{ background: '#17A589', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600 }}>Book at This Clinic →</Link>
                  <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 24px', borderRadius: 10, fontSize: 14 }}>Ask on WhatsApp</a>
                </div>
              </div>
              {/* Price card */}
              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: '24px 22px', minWidth: 210, flexShrink: 0 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Scans from</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: '#3AABDB', lineHeight: 1, marginBottom: 4 }}>£{cheapestScan?.priceGbp ?? '—'}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 18 }}>incl. radiologist report</div>
                {clinic.foundedYear && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>Est. {clinic.foundedYear}</div>}
                {clinic.beds && <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{clinic.beds} beds</div>}
                {clinic.specialties && clinic.specialties.slice(0, 3).map(s => (
                  <div key={s} style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>· {s}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED SCANS */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>AVAILABLE SCANS</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', color: 'var(--primary-3)' }}>Featured Scans at {clinic.shortName}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {clinic.featuredScans.map(scan => {
                const savedPct = Math.round(((scan.ukPriceGbp - scan.priceGbp) / scan.ukPriceGbp) * 100);
                return (
                  <div key={scan.code} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: 22 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>{scan.name}</h3>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{scan.deviceName}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-2)', borderRadius: 8, padding: '10px 12px', marginBottom: 14 }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Istanbul price</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)' }}>£{scan.priceGbp.toLocaleString()}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', textDecoration: 'line-through' }}>UK £{scan.ukPriceGbp.toLocaleString()}</div>
                        <div style={{ background: '#D1F2EB', color: '#0E6655', borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700, marginTop: 2 }}>Save {savedPct}%</div>
                      </div>
                    </div>
                    <Link href={`/book?clinic=${clinic.slug}&scan=${scan.code}`} style={{ display: 'block', background: 'var(--primary)', color: '#fff', borderRadius: 8, padding: '9px 0', fontSize: 13, fontWeight: 600, textAlign: 'center' }}>Book This Scan</Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ALL SCAN TYPES */}
        <section style={{ padding: '40px 24px 64px', background: 'var(--bg-2)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>ALL CAPABILITIES</div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--primary-3)' }}>Full Scan Type List</h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {clinic.scanTypes.map(t => (
                <span key={t} style={{ background: '#fff', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 100, padding: '5px 14px', fontSize: 12, fontWeight: 500 }}>
                  {t.replace(/_/g, ' ').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '64px 24px', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', background: 'linear-gradient(135deg, #082A4A 0%, #0B3565 100%)', borderRadius: 'var(--radius-xl)', padding: '52px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', color: '#fff', marginBottom: 14 }}>Book at {clinic.shortName}</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                Appointments within 3–10 days. Full concierge service included. UK-standard report in English within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href={`/book?clinic=${clinic.slug}`} style={{ background: '#17A589', color: '#fff', borderRadius: 10, padding: '13px 28px', fontSize: 15, fontWeight: 700 }}>Book Now →</Link>
                <Link href="/destinations/turkey/istanbul" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 10, padding: '13px 28px', fontSize: 15 }}>All Istanbul Clinics</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
