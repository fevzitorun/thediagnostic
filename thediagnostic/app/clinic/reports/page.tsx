// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ReportUploader from './ReportUploader'

export const metadata = { title: 'Reports — Clinic' }

export default async function ClinicReportsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('clinic_id')
    .eq('id', user.id)
    .single()

  const clinicId = profile?.clinic_id
  if (!clinicId) redirect('/clinic/dashboard')

  // Completed bookings that need or have reports
  const { data: bookings } = await supabase
    .from('bookings')
    .select('id, booking_ref, patient_name, package_name, appointment_date, report_url, report_uploaded_at, status')
    .eq('clinic_id', clinicId)
    .in('status', ['confirmed', 'completed'])
    .order('appointment_date', { ascending: false })

  const withReport = bookings?.filter(b => b.report_url) ?? []
  const withoutReport = bookings?.filter(b => !b.report_url && b.status === 'completed') ?? []
  const upcoming = bookings?.filter(b => !b.report_url && b.status === 'confirmed') ?? []

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Reports</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Upload scan reports for completed appointments</p>
      </div>

      {/* Needs report */}
      {withoutReport.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#854d0e', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            ⚠️ Reports needed ({withoutReport.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {withoutReport.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid #fde68a', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name} · {b.appointment_date ?? 'Date TBC'}</div>
                  <div style={{ fontSize: 11, color: '#bbb', fontFamily: 'monospace', marginTop: 2 }}>{b.booking_ref}</div>
                </div>
                <ReportUploader bookingId={b.id} />
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
              <div key={b.id} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, opacity: 0.75 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name} · {b.appointment_date ?? 'Date TBC'}</div>
                  <div style={{ fontSize: 11, color: '#bbb', fontFamily: 'monospace', marginTop: 2 }}>{b.booking_ref}</div>
                </div>
                <div style={{ fontSize: 12, color: '#aaa' }}>After appointment</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports uploaded */}
      {withReport.length > 0 && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
            Uploaded reports ({withReport.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {withReport.map(b => (
              <div key={b.id} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>📄</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#111' }}>{b.patient_name ?? '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{b.package_name} · {b.appointment_date ?? 'Date TBC'}</div>
                  <div style={{ fontSize: 11, color: '#bbb', fontFamily: 'monospace', marginTop: 2 }}>{b.booking_ref}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <a
                    href={b.report_url!}
                    target="_blank"
                    rel="noreferrer"
                    style={{ padding: '6px 12px', background: '#0369a1', color: '#fff', borderRadius: 7, fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
                  >
                    View PDF
                  </a>
                  {b.report_uploaded_at && (
                    <div style={{ fontSize: 10, color: '#bbb', marginTop: 4 }}>
                      Uploaded {new Date(b.report_uploaded_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!bookings || bookings.length === 0 && (
        <div style={{ background: '#fff', border: '1px dashed #ddd', borderRadius: 14, padding: '64px', textAlign: 'center', color: '#bbb', fontSize: 14 }}>
          No completed appointments yet
        </div>
      )}
    </>
  )
}
