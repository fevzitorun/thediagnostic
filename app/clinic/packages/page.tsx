// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PackageManager from './PackageManager'

export const metadata = { title: 'Packages — Clinic' }

export default async function ClinicPackagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id, role')
    .eq('id', user.id)
    .single()

  const clinicId = profile?.clinic_id
  if (!clinicId) redirect('/clinic/dashboard')

  const { data: packages } = await supabase
    .from('packages')
    .select('id, name, scan_type, price, duration_minutes, description, is_active, body_parts')
    .eq('clinic_id', clinicId)
    .order('scan_type', { ascending: true })
    .order('price', { ascending: true })

  const isAdmin = profile?.role === 'clinic_admin' || profile?.role === 'super_admin' || profile?.role === 'admin'

  const scanTypeGroups: Record<string, typeof packages> = {}
  for (const pkg of packages ?? []) {
    const key = pkg.scan_type ?? 'Other'
    if (!scanTypeGroups[key]) scanTypeGroups[key] = []
    scanTypeGroups[key]!.push(pkg)
  }

  return (
    <>
      <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Packages</h1>
          <p style={{ fontSize: 14, color: '#888' }}>{packages?.length ?? 0} scan packages</p>
        </div>
        {isAdmin && <PackageManager clinicId={clinicId} mode="add" />}
      </div>

      {Object.keys(scanTypeGroups).length === 0 ? (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No packages yet — add your first scan package
        </div>
      ) : (
        Object.entries(scanTypeGroups).map(([scanType, pkgs]) => (
          <div key={scanType} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
              {scanType}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
              {pkgs?.map(pkg => (
                <div key={pkg.id} style={{
                  background: '#fff', border: `1px solid ${pkg.is_active ? '#ebebeb' : '#f5f5f5'}`,
                  borderRadius: 12, padding: '18px 20px', opacity: pkg.is_active ? 1 : 0.55,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{pkg.name}</div>
                      {pkg.duration_minutes && (
                        <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{pkg.duration_minutes} min</div>
                      )}
                    </div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#111' }}>£{pkg.price}</div>
                  </div>
                  {pkg.description && (
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 10, lineHeight: 1.5 }}>{pkg.description}</div>
                  )}
                  {pkg.body_parts && Array.isArray(pkg.body_parts) && pkg.body_parts.length > 0 && (
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
                      {(pkg.body_parts as string[]).map((part: string) => (
                        <span key={part} style={{ padding: '2px 8px', background: '#f0f9ff', color: '#0369a1', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{part}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700,
                      background: pkg.is_active ? '#dcfce7' : '#f3f4f6',
                      color: pkg.is_active ? '#166534' : '#6b7280',
                    }}>
                      {pkg.is_active ? 'Active' : 'Hidden'}
                    </span>
                    {isAdmin && <PackageManager clinicId={clinicId} mode="edit" pkg={pkg} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  )
}
