// POST /api/agents/clinic-outreach
// Fetches CQC-registered imaging providers and sends partnership outreach emails.
// Protected by AGENT_SECRET header.

import { NextResponse } from 'next/server'
import { fetchCqcImagingProviders } from '@/lib/agents/cqc-client'
import { sendClinicOutreachEmail } from '@/lib/agents/outreach-email'
import type { AgentRunResult } from '@/lib/agents/types'

export const runtime = 'nodejs'
export const maxDuration = 300 // 5 min — CQC API calls are slow

export async function POST(req: Request): Promise<NextResponse<AgentRunResult>> {
  if (!authorised(req)) {
    return NextResponse.json(
      { success: false, agentId: 'clinic-outreach', runId: '', processedCount: 0, errorCount: 0 },
      { status: 401 }
    )
  }

  const body = await req.json().catch(() => ({}))
  const region: string | undefined = body.region
  const maxPages: number = body.maxPages ?? 3
  const dryRun: boolean = body.dryRun ?? false

  const runId = `outreach-${Date.now()}`
  let processedCount = 0
  let errorCount = 0

  console.log(`[ClinicOutreach] Starting run=${runId} region=${region ?? 'all'} dryRun=${dryRun}`)

  const providers = await fetchCqcImagingProviders({ maxPages, region })
  console.log(`[ClinicOutreach] Fetched ${providers.length} providers from CQC`)

  for (const provider of providers) {
    const email = extractEmail(provider)
    if (!email) {
      console.log(`[ClinicOutreach] No email for ${provider.name} — skipping`)
      continue
    }

    if (dryRun) {
      console.log(`[ClinicOutreach] DRY RUN — would send to ${email} (${provider.name})`)
      processedCount++
      continue
    }

    const result = await sendClinicOutreachEmail(provider, email)
    if (result.success) {
      processedCount++
    } else {
      errorCount++
    }

    // Rate-limit: 2 emails/second to respect Resend limits
    await delay(500)
  }

  return NextResponse.json({
    success: true,
    agentId: 'clinic-outreach',
    runId,
    processedCount,
    errorCount,
    details: { totalProviders: providers.length, region, dryRun },
  })
}

function authorised(req: Request): boolean {
  const secret = req.headers.get('x-agent-secret')
  return secret === process.env.AGENT_SECRET
}

function extractEmail(provider: { website?: string; name: string }): string | null {
  // CQC API doesn't expose email directly — derive from website domain
  if (!provider.website) return null
  try {
    const url = new URL(provider.website.startsWith('http') ? provider.website : `https://${provider.website}`)
    const domain = url.hostname.replace(/^www\./, '')
    // Common contact email patterns
    return `info@${domain}`
  } catch {
    return null
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
