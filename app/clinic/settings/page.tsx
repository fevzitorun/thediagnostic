import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Settings — Clinic Portal' }
export const dynamic = 'force-dynamic'

export default async function ClinicSettingsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const clinicRows = await sql`
    SELECT tc.id, tc.name, tc.short_name, tc.city, tc.address, tc.phone, tc.email, tc.website,
           tc.hospital_group, tc.jci_accredited, tc.iso_certified, tc.commission_pct,
           tc.is_active, tc.is_featured, tc.languages, tc.specialties, tc.rating, tc.review_count,
           p.first_name, p.last_name, u.email AS user_email
    FROM clinic_admins ca
    JOIN tr_clinics tc ON tc.id = ca.clinic_id
    LEFT JOIN profiles p ON p.id = ${user.id}
    LEFT JOIN users u ON u.id = ${user.id}
    WHERE ca.user_id = ${user.id}
    LIMIT 1
  `
  if (!clinicRows[0]) redirect('/clinic/dashboard')

  const clinic = clinicRows[0]  as unknown as {
    id: string; name: string; short_name: string | null; city: string; address: string | null;
    phone: string | null; email: string | null; website: string | null;
    hospital_group: string | null; jci_accredited: boolean; iso_certified: boolean;
    commission_pct: number; is_active: boolean; is_featured: boolean;
    languages: string[] | null; specialties: string[] | null;
    rating: number | null; review_count: number;
    first_name: string | null; last_name: string | null; user_email: string | null;
  }

  const infoRows = [
    { label: 'Clinic name', value: clinic.name },
    { label: 'Short name', value: clinic.short_name },
    { label: 'Hospital group', value: clinic.hospital_group },
    { label: 'City', value: clinic.city },
    { label: 'Address', value: clinic.address },
    { label: 'Phone', value: clinic.phone },
    { label: 'Email', value: clinic.email },
    { label: 'Website', value: clinic.website },
  ]

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Clinic settings</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Your clinic profile and accreditation details</p>
      </div>

      <div style={{ padding: '14px 18px', background: '#fef9c3', border: '1px solid #fde68a', borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#92400e' }}>
        To update clinic details, contact thediagnostic admin at <strong>info@thediagnostic.co.uk</strong> — our team will apply changes within one business day.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        {/* Clinic info */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Clinic information</div>
          {infoRows.filter(r => r.value).map((r, i, arr) => (
            <div key={r.label} style={{ display: 'flex', gap: 14, padding: '9px 0', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f5' : 'none', fontSize: 13 }}>
              <span style={{ color: 'var(--text-muted)', width: 130, flexShrink: 0 }}>{r.label}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 500, wordBreak: 'break-word' }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Status & accreditation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>Status</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: clinic.is_active ? '#dcfce7' : '#fef2f2', color: clinic.is_active ? '#166534' : '#991b1b' }}>
                {clinic.is_active ? '✓ Active' : '✗ Inactive'}
              </span>
              {clinic.is_featured && (
                <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: '#fef9c3', color: '#92400e' }}>★ Featured</span>
              )}
              {clinic.jci_accredited && (
                <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: '#eff6ff', color: '#1e40af' }}>JCI Accredited</span>
              )}
              {clinic.iso_certified && (
                <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, background: '#f0fdf4', color: '#15803d' }}>ISO Certified</span>
              )}
            </div>
            {(clinic.rating || clinic.review_count) && (
              <div style={{ marginTop: 14, fontSize: 14, color: 'var(--primary)', fontWeight: 600 }}>
                {clinic.rating ? `★ ${Number(clinic.rating).toFixed(1)}` : ''}
                {clinic.review_count ? ` · ${clinic.review_count} reviews` : ''}
              </div>
            )}
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Platform commission</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>{clinic.commission_pct ?? 15}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Platform fee deducted from each booking</div>
          </div>

          {(clinic.languages?.length || clinic.specialties?.length) ? (
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Capabilities</div>
              {clinic.languages?.length ? (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, color: '#bbb', marginBottom: 6, fontWeight: 600 }}>LANGUAGES</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {clinic.languages.map(l => (
                      <span key={l} style={{ padding: '3px 9px', background: 'var(--bg-2)', borderRadius: 5, fontSize: 11, color: '#555', fontWeight: 500 }}>{l.toUpperCase()}</span>
                    ))}
                  </div>
                </div>
              ) : null}
              {clinic.specialties?.length ? (
                <div>
                  <div style={{ fontSize: 11, color: '#bbb', marginBottom: 6, fontWeight: 600 }}>SPECIALTIES</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {clinic.specialties.map(s => (
                      <span key={s} style={{ padding: '3px 9px', background: 'var(--bg-2)', borderRadius: 5, fontSize: 11, color: '#555', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Admin account */}
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '22px 26px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>Your account</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', marginBottom: 4 }}>{clinic.first_name} {clinic.last_name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{clinic.user_email}</div>
          </div>
        </div>
      </div>
    </>
  )
}
