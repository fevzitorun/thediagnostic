// Agent system shared types

export interface AgentRunResult {
  success: boolean
  agentId: string
  runId: string
  processedCount: number
  errorCount: number
  details?: Record<string, unknown>
}

export interface CqcProvider {
  providerId: string
  name: string
  type: string
  registrationStatus: string
  website?: string
  contacts?: { web?: string; phone?: string }
  addresses: {
    line1?: string
    line2?: string
    city?: string
    county?: string
    postalCode?: string
    region?: string
  }[]
  specialisms?: string[]
  regulatedActivities?: string[]
}

export interface OutreachRecord {
  providerId: string
  providerName: string
  email?: string
  website?: string
  city?: string
  postalCode?: string
  status: 'pending' | 'sent' | 'bounced' | 'replied' | 'converted' | 'opted_out'
  sentAt?: string
  lastContactAt?: string
  notes?: string
}

export interface PatientFollowUp {
  bookingRef: string
  patientEmail: string
  patientName: string
  scanName: string
  scanDate: string
  clinicName: string
  daysPostScan: number
}

export interface TriageResult {
  recommendedScan: string
  scanSlug: string
  urgency: 'routine' | 'soon' | 'urgent'
  reasoning: string
  alternativeScans?: string[]
  bookingHref: string
}
