import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Scan Packages — Clinic Portal' }
export const dynamic = 'force-dynamic'

export default async function ClinicPackagesPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const clinicRows = await sql`
    SELECT tc.id, tc.name, tc.commission_pct FROM clinic_admins ca
    JOIN tr_clinics tc ON tc.id = ca.clinic_id
    WHERE ca.user_id = ${user.id} LIMIT 1
  `
  if (!clinicRows[0]) redirect('/clinic/dashboard')
  const clinic = clinicRows[0]  as unknown as { id: string; name: string; commission_pct: number }

  // Scans offered by this clinic with pricing
  const rows = await sql`
    SELECT cst.id, cst.scan_type_code, cst.device_name, cst.device_year,
           cst.price_gbp, cst.price_eur, cst.price_usd, cst.uk_price_gbp,
           cst.is_available, cst.notes,
           tst.name_en, tst.category, tst.duration_minutes
    FROM clinic_scan_types cst
    JOIN tr_scan_types tst ON tst.code = cst.scan_type_code
    WHERE cst.clinic_id = ${clinic.id}
    ORDER BY tst.category ASC, tst.name_en ASC
  `

  const scans = rows  as unknown as {
    id: string; scan_type_code: string; device_name: string | null; device_year: number | null;
    price_gbp: number | null; price_eur: number | null; price_usd: number | null; uk_price_gbp: number | null;
    is_available: boolean; notes: string | null;
    name_en: string; category: string | null; duration_minutes: number | null;
  }[]

  const groups: Record<string, typeof scans> = {}
  for (const s of scans) {
    const key = s.category ?? 'Other'
    if (!groups[key]) groups[key] = []
    groups[key].push(s)
  }

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Scan packages</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{scans.length} scan type{scans.length !== 1 ? 's' : ''} offered by {clinic.name}</p>
      </div>

      <div style={{ padding: '14px 18px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#1e40af' }}>
        ℹ To add or remove scan types, or update pricing, contact thediagnostic admin at <strong>info@thediagnostic.co.uk</strong>
      </div>

      {scans.length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No scan packages configured yet
        </div>
      ) : (
        Object.entries(groups).map(([category, items]) => (
          <div key={category} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>{category}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
              {items.map(pkg => {
                const saving = pkg.uk_price_gbp && pkg.price_gbp ? Math.round((1 - pkg.price_gbp / pkg.uk_price_gbp) * 100) : null
                return (
                  <div key={pkg.id} style={{ background: '#fff', border: `1px solid ${pkg.is_available ? 'var(--line)' : '#f0f0f0'}`, borderRadius: 12, padding: '18px 20px', opacity: pkg.is_available ? 1 : 0.55 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary)' }}>{pkg.name_en}</div>
                        {pkg.device_name && <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{pkg.device_name}{pkg.device_year ? ` (${pkg.device_year})` : ''}</div>}
                        {pkg.duration_minutes && <div style={{ fontSize: 11, color: '#bbb', marginTop: 2 }}>{pkg.duration_minutes} min</div>}
                      </div>
                      <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: pkg.is_available ? '#dcfce7' : '#f3f4f6', color: pkg.is_available ? '#166534' : '#888' }}>
                        {pkg.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                    {/* Pricing row */}
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
                      {pkg.price_gbp && (
                        <div style={{ padding: '6px 12px', background: 'var(--bg-2)', borderRadius: 8 }}>
                          <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600 }}>GBP</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>£{Number(pkg.price_gbp).toLocaleString()}</div>
                        </div>
                      )}
                      {pkg.price_eur && (
                        <div style={{ padding: '6px 12px', background: 'var(--bg-2)', borderRadius: 8 }}>
                          <div style={{ fontSize: 10, color: '#aaa', fontWeight: 600 }}>EUR</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>€{Number(pkg.price_eur).toLocaleString()}</div>
                        </div>
                      )}
                    </div>
                    {saving && saving > 0 && (
                      <div style={{ marginTop: 10, fontSize: 12, color: '#17A589', fontWeight: 600 }}>
                        {saving}% less than UK average (£{Number(pkg.uk_price_gbp).toLocaleString()})
                      </div>
                    )}
                    {pkg.notes && (
                      <div style={{ marginTop: 8, fontSize: 12, color: '#888', lineHeight: 1.5, borderTop: '1px solid #f5f5f5', paddingTop: 8 }}>{pkg.notes}</div>
                    )}
                    {/* Clinic's net after platform fee */}
                    {pkg.price_gbp && (
                      <div style={{ marginTop: 8, fontSize: 11, color: '#bbb' }}>
                        Your net: £{Math.round(Number(pkg.price_gbp) * (1 - (clinic.commission_pct ?? 15) / 100)).toLocaleString()} after {clinic.commission_pct ?? 15}% fee
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
    </>
  )
}
