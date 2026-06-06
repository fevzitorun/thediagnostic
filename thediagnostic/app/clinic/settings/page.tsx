// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ClinicSettingsForm from './ClinicSettingsForm'

export const metadata = { title: 'Settings — Clinic' }

export default async function ClinicSettingsPage() {
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

  const isAdmin = profile?.role === 'clinic_admin' || profile?.role === 'super_admin' || profile?.role === 'admin'
  if (!isAdmin) redirect('/clinic/dashboard')

  const { data: clinic } = await supabase
    .from('clinics')
    .select('id, name, address, city, postcode, phone, email, website, description, capabilities')
    .eq('id', clinicId)
    .single()

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Clinic settings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Update your clinic profile and capabilities</p>
      </div>

      {clinic && <ClinicSettingsForm clinic={clinic} />}
    </>
  )
}
