import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Add TR Clinic — Admin' }

export default async function AdminNewClinicPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const profileRows = await sql`SELECT role FROM profiles WHERE id = ${user.id} LIMIT 1`
  const role = (profileRows[0] as { role: string } | undefined)?.role ?? ''
  if (!['super_admin', 'admin', 'sales'].includes(role)) redirect('/admin/clinics')

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Link href="/admin/clinics" style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>← Clinics</Link>
      </div>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Add a TR clinic</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Turkish clinic partnerships managed via database and data file</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Step 1 */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#082A4A', color: '#3AABDB', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>1</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Add to data file</div>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
            Add the clinic to <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>lib/tr-clinics.data.ts</code> with all required fields:
            slug, name, city, hospital_group, jciAccredited, isoAccredited, commissionPct, scanTypes.
          </p>
          <div style={{ padding: '12px 14px', background: 'var(--bg-2)', borderRadius: 8, fontSize: 11, fontFamily: 'monospace', color: '#555', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
            {`{
  slug: 'acıbadem-istanbul',
  name: 'Acıbadem Hastanesi',
  city: 'Istanbul',
  hospital_group: 'Acıbadem',
  jciAccredited: true,
  commissionPct: 15,
  scanTypes: ['pet_ct', 'mri_3t']
}`}
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#082A4A', color: '#3AABDB', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>2</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Seed the database</div>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
            Run the seed script on Railway to insert the new clinic into the <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>tr_clinics</code> table:
          </p>
          <div style={{ padding: '12px 14px', background: '#1e1e2e', borderRadius: 8, fontSize: 11, fontFamily: 'monospace', color: '#a6e3a1', lineHeight: 1.8 }}>
            psql $DATABASE_URL -f seed-tr.sql
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: '#888' }}>
            Or use Railway CLI: <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>railway run psql</code>
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#082A4A', color: '#3AABDB', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>3</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Add scan pricing</div>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6 }}>
            Insert rows into <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>clinic_scan_types</code> with GBP/EUR/USD pricing per scan type. Each row links <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>tr_clinics.id</code> → <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>tr_scan_types.code</code>.
          </p>
        </div>

        {/* Step 4 */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: '24px 28px' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#082A4A', color: '#3AABDB', display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700, marginBottom: 14 }}>4</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>Link clinic portal access</div>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>
            Insert into <code style={{ background: '#f4f4f4', padding: '1px 5px', borderRadius: 4, fontSize: 11 }}>clinic_admins</code> to give the clinic's user account portal access:
          </p>
          <div style={{ padding: '12px 14px', background: '#1e1e2e', borderRadius: 8, fontSize: 11, fontFamily: 'monospace', color: '#a6e3a1', lineHeight: 1.8 }}>
            INSERT INTO clinic_admins (clinic_id, user_id){'\n'}VALUES ('&lt;clinic-uuid&gt;', '&lt;user-uuid&gt;');
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, padding: '16px 20px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 12, fontSize: 13, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Once seeded, the clinic will appear in the clinics list and its portal will be accessible.</span>
        <Link href="/admin/clinics" style={{ padding: '8px 16px', background: 'var(--primary)', color: '#fff', borderRadius: 8, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
          View all clinics →
        </Link>
      </div>
    </>
  )
}
