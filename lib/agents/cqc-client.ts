// CQC Public API client
// Docs: https://api.cqc.org.uk/public/v1

import type { CqcProvider } from './types'

const CQC_BASE = 'https://api.cqc.org.uk/public/v1'

// Service types relevant to diagnostic imaging
const IMAGING_SERVICE_TYPES = [
  'Diagnostic and/or screening service',
  'Diagnostic imaging service',
]

interface CqcListResponse {
  providers: { providerId: string }[]
  nextPageUri?: string
  total: number
}

interface CqcProviderDetail {
  providerId: string
  name: string
  type: string
  registrationStatus: string
  website?: string
  contacts?: { web?: string; phone?: string }[]
  addresses?: {
    line1?: string
    line2?: string
    city?: string
    county?: string
    postalCode?: string
    region?: string
  }[]
  specialisms?: { name: string }[]
  regulatedActivities?: { name: string }[]
}

export async function fetchCqcImagingProviders(
  options: { maxPages?: number; region?: string } = {}
): Promise<CqcProvider[]> {
  const { maxPages = 10, region } = options
  const providers: CqcProvider[] = []
  let pageUri: string | null = buildInitialUri(region)
  let pageCount = 0

  while (pageUri && pageCount < maxPages) {
    const res = await fetch(pageUri, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 }, // cache 24h in Next.js fetch cache
    })

    if (!res.ok) {
      console.error(`[CQC] Fetch failed: ${res.status} ${res.statusText}`)
      break
    }

    const data: CqcListResponse = await res.json()
    pageCount++

    for (const { providerId } of data.providers) {
      const detail = await fetchProviderDetail(providerId)
      if (detail) providers.push(normalise(detail))
    }

    pageUri = data.nextPageUri ? `${CQC_BASE}${data.nextPageUri}` : null
  }

  return providers
}

export async function fetchProviderDetail(providerId: string): Promise<CqcProviderDetail | null> {
  try {
    const res = await fetch(`${CQC_BASE}/providers/${providerId}`, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

function buildInitialUri(region?: string): string {
  const params = new URLSearchParams({
    serviceTypes: 'Diagnostic and/or screening service',
    registrationStatus: 'Registered',
    perPage: '20',
    page: '1',
  })
  if (region) params.set('region', region)
  return `${CQC_BASE}/providers?${params.toString()}`
}

function normalise(raw: CqcProviderDetail): CqcProvider {
  return {
    providerId: raw.providerId,
    name: raw.name,
    type: raw.type,
    registrationStatus: raw.registrationStatus,
    website: raw.website,
    contacts: raw.contacts?.[0],
    addresses: (raw.addresses ?? []).map(a => ({
      line1: a.line1,
      line2: a.line2,
      city: a.city,
      county: a.county,
      postalCode: a.postalCode,
      region: a.region,
    })),
    specialisms: raw.specialisms?.map(s => s.name),
    regulatedActivities: raw.regulatedActivities?.map(a => a.name),
  }
}
