// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import OutreachCRMClient from './OutreachCRMClient'

export const metadata = { title: 'Clinic Outreach CRM — Admin' }

export default async function OutreachPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('partner_leads')
    .select('*')
    .order('created_at', { ascending: false })

  const stats = {
    total: leads?.length ?? 0,
    new: leads?.filter(l => l.status === 'new').length ?? 0,
    contacted: leads?.filter(l => l.status === 'contacted').length ?? 0,
    meetings: leads?.filter(l => l.status === 'meeting_booked').length ?? 0,
    converted: leads?.filter(l => l.status === 'converted').length ?? 0,
  }

  return <OutreachCRMClient leads={leads ?? []} stats={stats} />
}
