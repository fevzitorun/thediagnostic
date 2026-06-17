import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CLINICS } from '@/lib/clinics.data';

export const metadata: Metadata = {
  title: 'Partner Clinics | Accredited Medical Imaging Centres | thediagnostic',
  description: 'Browse JCI-accredited and ISO-certified diagnostic imaging clinics in Istanbul and beyond. PET-CT, MRI 3T, GammaKnife, SPECT-CT — available within 3–7 days.',
};

export default function ClinicsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ background: 'var(--grad-hero)', padding: '72px 24px 56px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 54px)', color: '#fff', marginBottom: 14 }}>Partner Clinics</h1>
            <p style={{ color: 'var(--text-on-navy-muted)', fontSize: 17, maxWidth: 540, margin: '0 auto' }}>Every clinic is personally vetted — accreditation, equipment vintage, radiologist credentials, and English-language reporting capability.</p>
          </div>
        </section>
        <section style={{ padding: '64px 24px', background: 'var(--bg-light)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
              {['All Clinics', '🇹🇷 Turkey', '🇩🇪 Germany', '🇦🇪 UAE', 'JCI Accredited', 'PET-CT', 'GammaKnife'].map((filter, i) => (
                <button key={filter} style={{
                  background: i === 0 ? 'var(--navy)' : '#fff',
                  color: i === 0 ? '#fff' : 'var(--text-muted)',
                  border: i === 0 ? 'none' : '1px solid var(--border)',
                  borderRadius: 100, padding: '7px 16px', fontSize: 13,
                  cursor: 'pointer', fontWeight: i === 0 ? 600 : 400,
                }}>{filter}</button>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 24 }}>
              {CLINICS.map(clinic => {
                const priceFrom = clinic.featuredScans.length > 0 ? Math.min(...clinic.featuredScans.map(s => s.priceGbp)) : 0;
                return (
                  <div key={clinic.slug} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                    <div style={{ background: 'var(--navy)', padding: '22px 26px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#fff' }}>{clinic.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-on-navy-muted)', marginTop: 2 }}>📍 {clinic.city}</div>
                      </div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {clinic.jciAccredited && <span style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>JCI</span>}
                        {clinic.isoAccredited && <span style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>ISO</span>}
                      </div>
                    </div>
                    <div style={{ padding: 24 }}>
                      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 18 }}>{clinic.description}</p>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
                        {clinic.scanTypes.slice(0, 5).map(st => (
                          <span key={st} style={{ background: 'var(--blue-050)', color: 'var(--navy)', borderRadius: 100, padding: '3px 10px', fontSize: 12 }}>{st.replace('_', ' ').toUpperCase()}</span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>⭐ {clinic.rating} · From</div>
                          <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>£{priceFrom}</div>
                        </div>
                        <Link href={`/clinics/${clinic.slug}`} style={{ background: 'var(--blue)', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 14, fontWeight: 600 }}>View Clinic →</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ background: '#fff', border: '2px dashed var(--border)', borderRadius: 16, padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 280 }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>🌍</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--navy)', marginBottom: 8 }}>More Clinics Coming</div>
                <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, maxWidth: 260 }}>Munich · Abu Dhabi · Warsaw. Want your clinic listed?</div>
                <Link href="/partners" style={{ border: '1.5px solid var(--blue)', color: 'var(--blue)', borderRadius: 8, padding: '9px 18px', fontSize: 14 }}>Partner With Us →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
