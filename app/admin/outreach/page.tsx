import { sql } from '@/lib/db'
import OutreachCRMClient from './OutreachCRMClient'

export const metadata = { title: 'Clinic Outreach CRM — Admin' }
export const dynamic = 'force-dynamic'

export default async function OutreachPage() {
  let leads: Record<string, unknown>[] = []
  try {
    const rows = await sql`SELECT * FROM partner_leads ORDER BY created_at DESC`
    leads = rows as typeof leads
  } catch {
    // Table may not exist yet
  }

  const stats = {
    total:     leads.length,
    new:       leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    meetings:  leads.filter(l => l.status === 'meeting_booked').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }

  return <OutreachCRMClient leads={leads} stats={stats} />
}
