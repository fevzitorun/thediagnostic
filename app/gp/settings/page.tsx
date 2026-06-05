// @ts-nocheck
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import GPSettingsForm from './GPSettingsForm'

export const metadata = { title: 'Settings — GP Portal' }

export default async function GPSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: gp } = await supabase
    .from('gps')
    .select('id, name, practice_name, practice_address, gmc_number, phone, email')
    .eq('user_id', user.id)
    .single()

  if (!gp) redirect('/gp/dashboard')

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#888' }}>Manage your GP profile and payout details</p>
      </div>
      <GPSettingsForm gp={gp} />
    </>
  )
}
