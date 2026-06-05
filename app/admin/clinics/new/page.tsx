// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import NewClinicForm from './NewClinicForm'

export const metadata = { title: 'Add Clinic — Admin' }

export default async function AdminNewClinicPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  const allowed = ['super_admin', 'admin', 'sales']
  if (!profile || !allowed.includes(profile.role)) redirect('/admin/clinics')

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Add clinic</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Register a new clinic on the platform</p>
      </div>
      <NewClinicForm />
    </>
  )
}
