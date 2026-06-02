// @ts-nocheck
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ClinicAdminActions from './ClinicAdminActions'

export const metadata = { title: 'Clinic — Admin' }

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function AdminClinicDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: clinic } = await supabase
    .from('clinics')
    .select('*')
    .eq('id', id)
    .single()

  if (!clinic) notFound()

  const [bookingsRes, staffRes] = await Promise.all([
    supabase.from('bookings')
      .select('id, booking_ref, patient_name, package_name, appointment_date, status, amount_paid, created_at')
      .eq('clinic_id', id)
      .order('created_at', { ascending: false })
      .limit(10),
    supabase.from('profiles')
      .select('id, first_name, last_name, email, role')
      .eq('clinic_id', id),
  ])

  const totalRevenue = await supabase
    .from('bookings')
    .select('amount_paid')
    .eq('clinic_id', id)
    .in('status', ['confirmed', 'completed'])

  const revenue = (totalRevenue.data ?? []).reduce((s, b) => s + (b.amount_paid ?? 0), 0)
  const commissionRate = clinic.commission_rate ?? 0.12
  const platformEarnings = revenue * commissionRate
  const clinicEarnings = revenue * (1 - commissionRate)

  const statusStyle: Record<string, { bg: string; color: string }> = {
    pending:   { bg: '#fef9c3', color: '#854d0e' },
    confirmed: { bg: '#dcfce7', color: '#166534' },
    completed: { bg: '#e0f2fe', color: '#0369a1' },
    cancelled: { bg: '#fef2f2', color: '#991b1b' },
    callback_requested: { bg: '#f3e8ff', color: '#6b21a8' },
  }

  const clinicStatusStyle: Record<string, { bg: string; color: string }> = {
    active:    { bg: '#dcfce7', color: '#166534' },
    pending:   { bg: '#fef9c3', color: '#854d0e' },
    inactive:  { bg: '#f3f4f6', color: '#6b7280' },
    suspended: { bg: '#fef2f2', color: '#991b1b' },
  }
  const cs = clinicStatusStyle[clinic.status ?? 'pending'] ?? clinicStatusStyle.pending

  return (
    <>
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/admin/clinics" style={{ fontSize: 13, color: '#aaa', textDecoration: 'none' }}>← Clinics</Link>
        <span style={{ color: '#ddd' }}>/</span>
        <span style={{ fontSize: 13, color: '#666' }}>{clinic.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 4 }}>{clinic.name}</div>
                <div style={{ fontSize: 14, color: '#888' }}>{clinic.address}, {clinic.city} {clinic.postcode}</div>
                {clinic.website && (
                  <a href={clinic.website} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#0369a1', textDecoration: 'none', display: 'block', marginTop: 4 }}>
                    {clinic.website}
                  </a>
                )}
              </div>
              <span style={{ padding: '5px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: cs.bg, color: cs.color }}>
                {clinic.status ?? 'pending'}
              </span>
            </div>
          </div>

          {/* Revenue */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { label: 'Total revenue', value: `£${revenue.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, color: '#00C9A7' },
              { label: 'Platform cut', value: `£${platformEarnings.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, color: '#3b82f6' },
              { label: 'Clinic earnings', value: `£${clinicEarnings.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`, color: '#8b5cf6' },
            ].map((kpi, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#aaa', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{kpi.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111' }}>{kpi.value}</div>
                <div style={{ height: 3, background: kpi.color, borderRadius: 2, marginTop: 10 }} />
              </div>
            ))}
          </div>

          {/* Recent bookings */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Recent bookings</div>
              <Link href={`/admin/bookings?clinic=${id}`} style={{ fontSize: 12, color: '#00a888', textDecoration: 'none' }}>View all →</Link>
            </div>
            {!bookingsRes.data || bookingsRes.data.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#bbb', fontSize: 13 }}>No bookings</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#fafafa' }}>
                    {['Ref', 'Patient', 'Scan', 'Date', 'Amount', 'Status'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 0.8, textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bookingsRes.data.map((b, i) => {
                    const s = statusStyle[b.status] ?? statusStyle.pending
                    return (
                      <tr key={b.id} style={{ borderBottom: i < bookingsRes.data!.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                        <td style={{ padding: '11px 14px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                          <Link href={`/admin/bookings/${b.id}`} style={{ color: '#0369a1', textDecoration: 'none' }}>{b.booking_ref}</Link>
                        </td>
                        <td style={{ padding: '11px 14px', fontWeight: 500, color: '#111' }}>{b.patient_name ?? '—'}</td>
                        <td style={{ padding: '11px 14px', color: '#555' }}>{b.package_name ?? '—'}</td>
                        <td style={{ padding: '11px 14px', color: '#888', fontSize: 12 }}>{b.appointment_date ?? '—'}</td>
                        <td style={{ padding: '11px 14px', fontWeight: 600 }}>{b.amount_paid ? `£${b.amount_paid}` : '—'}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, textTransform: 'uppercase' }}>
                            {b.status?.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Staff */}
          {staffRes.data && staffRes.data.length > 0 && (
            <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 16 }}>Staff accounts</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {staffRes.data.map(staff => (
                  <div key={staff.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0f2fe', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 700, color: '#0369a1', flexShrink: 0 }}>
                      {(staff.first_name ?? staff.email ?? '?')[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{staff.first_name} {staff.last_name}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{staff.email} · {staff.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Admin actions */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Admin actions</div>
            <ClinicAdminActions clinicId={clinic.id} currentStatus={clinic.status ?? 'pending'} />
          </div>

          {/* Clinic details */}
          <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 14, padding: '24px 28px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 16, textTransform: 'uppercase', letterSpacing: 0.8 }}>Details</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Commission rate', value: `${Math.round((clinic.commission_rate ?? 0.12) * 100)}%` },
                { label: 'Stripe account', value: clinic.stripe_account_id ?? 'Not connected' },
                { label: 'CQC rating', value: clinic.cqc_rating },
                { label: 'Phone', value: clinic.phone },
                { label: 'Email', value: clinic.email },
                { label: 'Capabilities', value: Array.isArray(clinic.capabilities) ? clinic.capabilities.join(', ') : null },
              ].map(row => row.value ? (
                <div key={row.label}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: '#333', wordBreak: 'break-all' }}>{row.value}</div>
                </div>
              ) : null)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
