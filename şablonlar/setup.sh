#!/bin/bash
# ============================================================
# SCANBOOK PLATFORM — GitHub & Local Setup
# Bunu terminal'de adım adım çalıştır
# ============================================================

echo "🚀 ScanBook Platform Kurulumu Başlıyor..."

# ─── ADIM 1: Turborepo ile Monorepo Oluştur ───────────────

npx create-turbo@latest scanbook-platform --package-manager pnpm
cd scanbook-platform

# ─── ADIM 2: Dizin Yapısını Oluştur ──────────────────────

# Mevcut örnek uygulamaları temizle
rm -rf apps/docs apps/web

# scanbook ve thediagnostic uygulamaları oluştur
pnpm create next-app apps/scanbook \
  --typescript --tailwind --eslint \
  --app --src-dir --import-alias "@/*" \
  --no-turbopack

pnpm create next-app apps/thediagnostic \
  --typescript --tailwind --eslint \
  --app --src-dir --import-alias "@/*" \
  --no-turbopack

# Shared packages
mkdir -p packages/ui/src/components
mkdir -p packages/ui/src/hooks
mkdir -p packages/db/src/queries
mkdir -p packages/db/src/schema
mkdir -p packages/stripe/src
mkdir -p packages/email/src/templates
mkdir -p packages/sms/src
mkdir -p packages/ai/src

# ─── ADIM 3: Root Package.json ───────────────────────────

cat > package.json << 'EOF'
{
  "name": "scanbook-platform",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "dev:scanbook": "turbo dev --filter=scanbook",
    "dev:diagnostic": "turbo dev --filter=thediagnostic",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check",
    "db:generate": "cd packages/db && npx supabase gen types typescript --local > src/database.types.ts",
    "db:push": "supabase db push",
    "db:reset": "supabase db reset"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.4.0",
    "@types/node": "^20"
  },
  "packageManager": "pnpm@9.0.0"
}
EOF

# ─── ADIM 4: turbo.json ──────────────────────────────────

cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "globalEnv": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "STRIPE_SECRET_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "RESEND_API_KEY",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "NEXT_PUBLIC_GOOGLE_MAPS_KEY",
    "OPENAI_API_KEY",
    "PLATFORM",
    "NODE_ENV"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
EOF

# ─── ADIM 5: packages/db kurulumu ───────────────────────

cat > packages/db/package.json << 'EOF'
{
  "name": "@scanbook/db",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.43.0",
    "@supabase/ssr": "^0.4.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0"
  }
}
EOF

cat > packages/db/src/index.ts << 'EOF'
export { createClient, createServerClient } from './client'
export * from './queries/bookings'
export * from './queries/clinics'
export * from './queries/slots'
export * from './queries/reports'
export * from './queries/patients'
export type { Database } from './database.types'
EOF

cat > packages/db/src/client.ts << 'EOF'
import { createClient as supabaseCreateClient } from '@supabase/supabase-js'
import { createServerClient as supabaseServerClient, type CookieOptions } from '@supabase/ssr'
import type { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side
export const createClient = () =>
  supabaseCreateClient<Database>(supabaseUrl, supabaseAnonKey)

// Server-side (Next.js App Router)
export const createServerClient = (cookieStore: any) =>
  supabaseServerClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          try { cookieStore.set({ name, value, ...options }) } catch {}
        },
        remove(name: string, options: CookieOptions) {
          try { cookieStore.set({ name, value: '', ...options }) } catch {}
        },
      },
    }
  )
EOF

# ─── ADIM 6: packages/db/src/queries ────────────────────

cat > packages/db/src/queries/clinics.ts << 'EOF'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

type DB = SupabaseClient<Database>
type Platform = 'scanbook' | 'thediagnostic'

// Klinikleri ara (harita için)
export async function searchClinics(
  db: DB,
  params: {
    platform: Platform
    city?: string
    scanCategory?: string
    lat?: number
    lng?: number
    radiusKm?: number
  }
) {
  let query = db
    .from('clinics')
    .select(`
      id, name, slug, tier, address_city, address_postcode,
      latitude, longitude, rating, review_count,
      description, images, phone,
      scan_types (id, name, category, price_gbp, duration_minutes)
    `)
    .eq('platform', params.platform)
    .eq('is_active', true)
    .eq('is_verified', true)

  if (params.city) {
    query = query.ilike('address_city', `%${params.city}%`)
  }

  if (params.scanCategory) {
    query = query.contains('scan_types.category', [params.scanCategory])
  }

  return query.order('rating', { ascending: false })
}

// Klinik detayı
export async function getClinicBySlug(db: DB, slug: string) {
  return db
    .from('clinics')
    .select(`
      *,
      scan_types (*),
      clinic_reviews (rating, body, created_at)
    `)
    .eq('slug', slug)
    .single()
}
EOF

cat > packages/db/src/queries/slots.ts << 'EOF'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

type DB = SupabaseClient<Database>

// Müsait slotları getir
export async function getAvailableSlots(
  db: DB,
  params: {
    clinicId: string
    scanTypeId: string
    dateFrom: string  // ISO date
    dateTo: string
  }
) {
  return db
    .from('slots')
    .select('*')
    .eq('clinic_id', params.clinicId)
    .eq('scan_type_id', params.scanTypeId)
    .eq('is_available', true)
    .eq('is_blocked', false)
    .gte('starts_at', params.dateFrom)
    .lte('starts_at', params.dateTo)
    .order('starts_at')
}

// Slot kilitle (booking sırasında)
export async function lockSlot(db: DB, slotId: string, bookingId: string) {
  return db
    .from('slots')
    .update({ is_available: false, booking_id: bookingId })
    .eq('id', slotId)
    .eq('is_available', true) // Optimistic locking
}
EOF

cat > packages/db/src/queries/bookings.ts << 'EOF'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

type DB = SupabaseClient<Database>

// Yeni booking oluştur
export async function createBooking(
  db: DB,
  data: {
    platform: 'scanbook' | 'thediagnostic'
    patientId: string
    slotId: string
    clinicId: string
    scanTypeId: string
    amountTotal: number
    currency?: string
    stripePaymentIntentId: string
    gpReferralId?: string
    clinicalNotes?: string
  }
) {
  const ref = data.platform === 'scanbook'
    ? `SB-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`
    : `TD-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`

  return db.from('bookings').insert({
    booking_ref: ref,
    platform: data.platform,
    patient_id: data.patientId,
    slot_id: data.slotId,
    clinic_id: data.clinicId,
    scan_type_id: data.scanTypeId,
    amount_total: data.amountTotal,
    amount_paid: data.amountTotal,
    currency: data.currency ?? 'GBP',
    stripe_payment_intent_id: data.stripePaymentIntentId,
    gp_referral_id: data.gpReferralId,
    clinical_notes: data.clinicalNotes,
    status: 'confirmed',
    confirmed_at: new Date().toISOString(),
    platform_commission: data.amountTotal * 0.10,
    clinic_payout_amount: data.amountTotal * 0.90,
  }).select().single()
}

// Hasta bookingları
export async function getPatientBookings(db: DB, patientId: string) {
  return db
    .from('bookings')
    .select(`
      *,
      clinics (name, address_city, address_line1),
      scan_types (name, category, duration_minutes),
      slots (starts_at, room),
      reports (status, delivered_at, urgent_flag)
    `)
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
}

// Klinik bookingları (dashboard için)
export async function getClinicBookings(
  db: DB,
  clinicId: string,
  date?: string
) {
  let query = db
    .from('today_bookings')
    .select('*')
    .eq('clinic_name', clinicId)  // view kullanıyor

  return query
}
EOF

cat > packages/db/src/queries/reports.ts << 'EOF'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../database.types'

type DB = SupabaseClient<Database>

// Rapor kuyruğu (admin/radyoloji için)
export async function getReportQueue(db: DB) {
  return db
    .from('report_queue')
    .select('*')
    .limit(50)
}

// Raporu güncelle (radyolog)
export async function updateReport(
  db: DB,
  reportId: string,
  data: {
    findings?: string
    impression?: string
    recommendations?: string
    isNormal?: boolean
    urgentFlag?: boolean
    urgentReason?: string
    status?: string
  }
) {
  return db
    .from('reports')
    .update({
      findings: data.findings,
      impression: data.impression,
      recommendations: data.recommendations,
      is_normal: data.isNormal,
      urgent_flag: data.urgentFlag,
      urgent_reason: data.urgentReason,
      status: data.status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reportId)
    .select()
    .single()
}

// Raporu teslim et
export async function deliverReport(db: DB, reportId: string) {
  return db
    .from('reports')
    .update({
      status: 'delivered',
      delivered_at: new Date().toISOString(),
    })
    .eq('id', reportId)
}
EOF

# ─── ADIM 7: packages/stripe kurulumu ───────────────────

cat > packages/stripe/package.json << 'EOF'
{
  "name": "@scanbook/stripe",
  "version": "0.0.1",
  "private": true,
  "main": "./src/index.ts",
  "dependencies": {
    "stripe": "^15.0.0"
  }
}
EOF

cat > packages/stripe/src/index.ts << 'EOF'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
  typescript: true,
})

// Payment Intent oluştur (hasta ödeme)
export async function createPaymentIntent(params: {
  amount: number          // pennies (£249 → 24900)
  currency: string        // 'gbp'
  clinicStripeAccountId: string
  platformFeePercent?: number  // default 10
  metadata?: Record<string, string>
}) {
  const feePercent = params.platformFeePercent ?? 10
  const applicationFee = Math.floor(params.amount * (feePercent / 100))

  return stripe.paymentIntents.create({
    amount: params.amount,
    currency: params.currency,
    application_fee_amount: applicationFee,
    transfer_data: {
      destination: params.clinicStripeAccountId,
    },
    metadata: params.metadata ?? {},
    automatic_payment_methods: { enabled: true },
  })
}

// Klinik Stripe Connect onboarding linki
export async function createClinicOnboardingLink(clinicId: string) {
  const account = await stripe.accounts.create({
    type: 'express',
    country: 'GB',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    metadata: { clinic_id: clinicId }
  })

  const link = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/clinic/stripe/refresh`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/clinic/stripe/return`,
    type: 'account_onboarding',
  })

  return { accountId: account.id, url: link.url }
}
EOF

# ─── ADIM 8: apps/scanbook Next.js Yapısı ───────────────

mkdir -p apps/scanbook/src/app/\(public\)
mkdir -p apps/scanbook/src/app/\(auth\)/login
mkdir -p apps/scanbook/src/app/\(auth\)/register
mkdir -p apps/scanbook/src/app/patient/bookings
mkdir -p apps/scanbook/src/app/patient/results
mkdir -p apps/scanbook/src/app/clinic/dashboard
mkdir -p apps/scanbook/src/app/clinic/slots
mkdir -p apps/scanbook/src/app/clinic/bookings
mkdir -p apps/scanbook/src/app/gp/dashboard
mkdir -p apps/scanbook/src/app/gp/referrals
mkdir -p apps/scanbook/src/app/admin/reports
mkdir -p apps/scanbook/src/app/admin/clinics
mkdir -p apps/scanbook/src/app/api/bookings
mkdir -p apps/scanbook/src/app/api/slots
mkdir -p apps/scanbook/src/app/api/stripe
mkdir -p apps/scanbook/src/app/api/reports

# ─── ADIM 9: .env.example ───────────────────────────────

cat > .env.example << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (Resend)
RESEND_API_KEY=re_...

# SMS (Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+44...

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...

# AI (OpenAI - slot filling için)
OPENAI_API_KEY=sk-...

# Platform
PLATFORM=scanbook   # veya thediagnostic
NEXT_PUBLIC_URL=http://localhost:3000
EOF

# ─── ADIM 10: .gitignore ────────────────────────────────

cat >> .gitignore << 'EOF'

# Env files
.env
.env.local
.env.*.local

# Supabase
.supabase/

# Build outputs
.next/
dist/
build/
EOF

# ─── ADIM 11: apps/scanbook/package.json güncelle ────────

cat > apps/scanbook/package.json << 'EOF'
{
  "name": "scanbook",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "14.2.0",
    "react": "^18",
    "react-dom": "^18",
    "@scanbook/db": "*",
    "@scanbook/stripe": "*",
    "@scanbook/ui": "*"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10"
  }
}
EOF

# ─── ADIM 12: GitHub'a push ──────────────────────────────

git init
git add .
git commit -m "feat: initial monorepo setup — scanbook + thediagnostic"

# GitHub'da 'scanbook-platform' repo oluşturduktan sonra:
# git remote add origin https://github.com/KULLANICI_ADIN/scanbook-platform.git
# git push -u origin main

echo ""
echo "✅ KURULUM TAMAMLANDI!"
echo ""
echo "Sonraki adımlar:"
echo "1. GitHub'da 'scanbook-platform' adında private repo oluştur"
echo "2. git remote add origin https://github.com/KULLANICI_ADIN/scanbook-platform.git"
echo "3. git push -u origin main"
echo "4. Supabase'de yeni proje aç (scanbook-prod)"
echo "5. schema.sql dosyasını Supabase SQL Editor'de çalıştır"
echo "6. .env.local dosyasını oluştur (.env.example'dan kopyala)"
echo "7. pnpm install"
echo "8. pnpm dev"
echo ""
echo "🌐 http://localhost:3000  — scanbook"
echo "🌐 http://localhost:3001  — thediagnostic"
