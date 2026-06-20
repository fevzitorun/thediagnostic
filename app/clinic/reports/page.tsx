import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { sql } from '@/lib/db'

export const metadata = { title: 'Reports — Clinic Portal' }
export const dynamic = 'force-dynamic'

export default async function ClinicReportsPage() {
  const session = await auth()
  const user = session?.user
  if (!user) redirect('/login')

  const clinicRows = await sql`
    SELECT tc.id FROM clinic_admins ca JOIN tr_clinics tc ON tc.id = ca.clinic_id
    WHERE ca.user_id = ${user.id} LIMIT 1
  `
  if (!clinicRows[0]) redirect('/clinic/dashboard')
  const clinicId = (clinicRows[0]  as unknown as { id: string }).id

  // Confirmed or completed bookings for this clinic
  const rows = await sql`
    SELECT id, booking_ref, patient_name, package_name, body_part, appointment_date, report_url, status
    FROM bookings
    WHERE tr_clinic_id = ${clinicId}
      AND status IN ('confirmed', 'completed')
    ORDER BY appointment_date DESC NULLS LAST
  `

  const bookings = rows  as unknown as {
    id: string; booking_ref: string; patient_name: string | null;
    package_name: string | null; body_part: string | null;
    appointment_date: string | null; report_url: string | null; status: string;
  }[]

  const withReport    = bookings.filter(b => b.report_url)
  const needsReport   = bookings.filter(b => !b.report_url && b.status === 'completed')
  const upcoming      = bookings.filter(b => !b.report_url && b.status === 'confirmed')

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Reports</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Upload scan reports for completed appointments</p>
      </div>

      {/* Info: how to submit reports */}
      <div style={{ padding: '14px 18px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, marginBottom: 24, fontSize: 13, color: '#1e40af', lineHeight: 1.6 }}>
        📤 To upload a report, email the PDF to <strong>reports@thediagnostic.co.uk</strong> with the booking reference in the subject line. Our team will attach it to the patient's record within 2 hours.
      </div>

      {/* Needs report — completed scans without report */}
      {needsReport.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#854d0e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Reports needed ({needsReport.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {needsReport.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fef9c3', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>⚠</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name}{b.body_part ? ` · ${b.body_part}` : ''}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                </div>
                <a href={`mailto:reports@thediagnostic.co.uk?subject=Report: ${b.booking_ref}`}
                  style={{ padding: '7px 14px', background: 'var(--primary)', color: '#fff', borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  Submit report →
                </a>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#bbb', flexShrink: 0 }}>{b.booking_ref}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming — no report expected yet */}
      {upcoming.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Upcoming appointments
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {upcoming.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, opacity: 0.75 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-2)', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>📅</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name}{b.body_part ? ` · ${b.body_part}` : ''}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                </div>
                <div style={{ fontSize: 12, color: '#aaa', flexShrink: 0 }}>After appointment</div>
                <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#bbb', flexShrink: 0 }}>{b.booking_ref}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded reports */}
      {withReport.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Uploaded reports ({withReport.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {withReport.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>📄</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--primary)' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name}{b.body_part ? ` · ${b.body_part}` : ''}{b.appointment_date ? ` · ${b.appointment_date}` : ''}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: '#bbb' }}>{b.booking_ref}</div>
                  <a href={b.report_url!} target="_blank" rel="noreferrer"
                    style={{ padding: '6px 12px', background: '#0369a1', color: '#fff', borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                    View PDF
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {bookings.length === 0 && (
        <div style={{ background: '#fff', border: '1px dashed var(--line)', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No completed appointments yet
        </div>
      )}
    </>
  )
}
