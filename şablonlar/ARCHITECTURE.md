# 🏗️ ScanBook / TheDiagnostic — Tam Proje Mimarisi

## İki Platform, Tek Kod Tabanı

```
scanbook-platform/                    ← GitHub repo adı
├── apps/
│   ├── scanbook/                     ← scanbook.co.uk + scanbook.uk
│   │   ├── app/
│   │   │   ├── (public)/             ← Ana site, arama, listing
│   │   │   ├── (auth)/               ← Login, register
│   │   │   ├── patient/              ← Hasta portalı
│   │   │   ├── clinic/               ← Klinik dashboard
│   │   │   ├── gp/                   ← GP portalı
│   │   │   ├── admin/                ← Super admin + radyoloji paneli
│   │   │   └── api/                  ← API routes
│   │   └── ...config files
│   │
│   └── thediagnostic/                ← thediagnostic.co.uk
│       ├── app/
│       │   ├── (public)/             ← Premium landing, uluslararası klinikler
│       │   ├── (auth)/
│       │   ├── patient/              ← AYNI patient portal (shared package)
│       │   ├── clinic/               ← Uluslararası klinik dashboard
│       │   ├── broker/               ← Medical broker paneli (YENİ)
│       │   └── api/
│       └── ...config files
│
├── packages/
│   ├── ui/                           ← Shared component library
│   │   ├── components/
│   │   │   ├── BookingCard.tsx
│   │   │   ├── ClinicMap.tsx
│   │   │   ├── ScanTypeSelector.tsx
│   │   │   ├── ResultViewer.tsx
│   │   │   └── ...
│   │   └── package.json
│   │
│   ├── db/                           ← Supabase client + tüm queries
│   │   ├── schema.sql                ← Tek DB, iki platform
│   │   ├── queries/
│   │   │   ├── bookings.ts
│   │   │   ├── clinics.ts
│   │   │   ├── patients.ts
│   │   │   └── reports.ts
│   │   └── package.json
│   │
│   ├── stripe/                       ← Shared Stripe logic
│   ├── email/                        ← Resend email templates
│   ├── sms/                          ← Twilio SMS
│   └── ai/                           ← AI slot filling, marketing engine
│
├── turbo.json
├── package.json                      ← pnpm workspaces
└── .env.example
```

---

## 🌍 İki Platform Farkı

| Özellik | scanbook.co.uk | thediagnostic.co.uk |
|---|---|---|
| **Hedef** | UK private scanning | Uluslararası ileri tanı |
| **Scan tipleri** | MRI, CT, US, Baby Scan, X-Ray | PET-CT, Gamma Knife, Proton Therapy, CheckUp |
| **Klinik lokasyonu** | UK (10+ klinik) | Avrupa, Türkiye, UAE, ABD |
| **Fiyat aralığı** | £79–£1,500 | £500–£25,000+ |
| **Para birimi** | GBP | GBP + EUR + USD |
| **Broker özelliği** | Hayır | Evet (coordinator paneli) |
| **Dil** | EN | EN + DE + FR + AR |
| **GDPR** | UK GDPR | EU GDPR + UK GDPR |
| **Supabase** | PAYLAŞILAN (platform kolonu) | PAYLAŞILAN |

---

## 🗄️ SUPABASE DATABASE ŞEMASI

### Temel Tablolar

```sql
-- PLATFORM ENUM (iki siteyi ayırt eder)
CREATE TYPE platform AS ENUM ('scanbook', 'thediagnostic');
CREATE TYPE scan_category AS ENUM ('mri', 'ct', 'ultrasound', 'baby_scan', 'xray', 'full_body', 'pet_ct', 'gamma_knife', 'proton', 'checkup', 'nuclear');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
CREATE TYPE report_status AS ENUM ('awaiting_upload', 'under_review', 'approved', 'delivered');
CREATE TYPE user_role AS ENUM ('patient', 'clinic_admin', 'clinic_staff', 'gp', 'radiologist', 'broker', 'super_admin');
CREATE TYPE clinic_tier AS ENUM ('standard', 'premium', 'flagship');

-- USERS (Supabase Auth ile bağlantılı)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'patient',
  platform platform NOT NULL DEFAULT 'scanbook',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth DATE,
  nhs_number TEXT,
  address_line1 TEXT,
  address_city TEXT,
  address_postcode TEXT,
  address_country TEXT DEFAULT 'GB',
  insurance_provider TEXT,
  insurance_number TEXT,
  preferred_language TEXT DEFAULT 'en',
  gdpr_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KLİNİKLER
CREATE TABLE clinics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform platform NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tier clinic_tier DEFAULT 'standard',
  description TEXT,
  address_line1 TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_postcode TEXT,
  address_country TEXT NOT NULL DEFAULT 'GB',
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  phone TEXT,
  email TEXT,
  website TEXT,
  cqc_number TEXT,           -- UK için
  accreditations TEXT[],     -- ['JCI', 'ISO', 'CQC', 'JACIE']
  languages TEXT[] DEFAULT '{en}',
  currency TEXT DEFAULT 'GBP',
  stripe_account_id TEXT,    -- Stripe Connect
  commission_rate DECIMAL(4,2) DEFAULT 10.00, -- %10
  is_active BOOLEAN DEFAULT false,  -- Admin onayı bekliyor
  is_verified BOOLEAN DEFAULT false,
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SCAN TÜRLERİ (Her klinik kendi scan'larını tanımlar)
CREATE TABLE scan_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  category scan_category NOT NULL,
  name TEXT NOT NULL,               -- "MRI Brain 1.5T", "PET-CT Full Body"
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  preparation_instructions TEXT,
  contraindications TEXT,           -- MRI metal implant warnings
  requires_referral BOOLEAN DEFAULT false,
  requires_mri_questionnaire BOOLEAN DEFAULT false,
  price_gbp DECIMAL(10,2),
  price_eur DECIMAL(10,2),
  price_usd DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SLOTLAR (Gerçek zamanlı müsaitlik)
CREATE TABLE slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id) ON DELETE CASCADE,
  scan_type_id UUID REFERENCES scan_types(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  room TEXT,                        -- "MRI Suite A", "CT Room 2"
  is_available BOOLEAN DEFAULT true,
  is_promoted BOOLEAN DEFAULT false, -- AI slot filling
  discount_percent INTEGER DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOOKINGS
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT UNIQUE NOT NULL,  -- SB-20847 / TD-00123
  platform platform NOT NULL,
  patient_id UUID REFERENCES profiles(id),
  slot_id UUID REFERENCES slots(id),
  clinic_id UUID REFERENCES clinics(id),
  scan_type_id UUID REFERENCES scan_types(id),
  gp_referral_id UUID,               -- NULL = self-referral
  status booking_status DEFAULT 'pending',
  
  -- Ödeme
  amount_paid DECIMAL(10,2),
  currency TEXT DEFAULT 'GBP',
  stripe_payment_intent_id TEXT,
  insurance_provider TEXT,
  insurance_auth_code TEXT,
  
  -- Klinik notu
  clinical_notes TEXT,
  patient_notes TEXT,
  
  -- MRI Güvenlik Anketi
  mri_questionnaire JSONB,          -- {metal_implants, pacemaker, pregnancy, claustrophobia, ...}
  questionnaire_completed_at TIMESTAMPTZ,
  
  -- Hatırlatıcılar
  reminder_24h_sent BOOLEAN DEFAULT false,
  reminder_2h_sent BOOLEAN DEFAULT false,
  
  -- Komisyon
  platform_commission DECIMAL(10,2),
  clinic_payout DECIMAL(10,2),
  payout_status TEXT DEFAULT 'pending',
  payout_date DATE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GP REFERRALLER
CREATE TABLE gp_referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gp_id UUID REFERENCES profiles(id),
  patient_id UUID REFERENCES profiles(id),
  platform platform NOT NULL,
  scan_type_requested TEXT NOT NULL,
  preferred_clinic_id UUID REFERENCES clinics(id),
  urgency TEXT DEFAULT 'routine',   -- 'routine', 'urgent'
  clinical_notes TEXT,
  referral_code TEXT UNIQUE,
  status TEXT DEFAULT 'sent',       -- sent, booked, completed
  booking_id UUID REFERENCES bookings(id),
  commission_amount DECIMAL(8,2),
  commission_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RAPORLAR (Radyoloji panelinin kalbi)
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) UNIQUE,
  platform platform NOT NULL,
  
  -- Dosyalar
  dicom_storage_path TEXT,          -- S3/Supabase Storage path
  report_pdf_path TEXT,
  report_images_paths TEXT[],
  
  -- Radyolog
  radiologist_id UUID REFERENCES profiles(id),
  radiologist_name TEXT,
  assigned_at TIMESTAMPTZ,
  
  -- İçerik
  clinical_summary TEXT,
  findings TEXT,
  impression TEXT,
  recommendations TEXT,
  is_normal BOOLEAN,
  urgency_flag BOOLEAN DEFAULT false,  -- Acil bulgular için
  
  -- Durum
  status report_status DEFAULT 'awaiting_upload',
  uploaded_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- GP paylaşımı
  shared_with_gp BOOLEAN DEFAULT false,
  shared_with_gp_at TIMESTAMPTZ,
  
  -- Teleradyoloji (outsource)
  teleradiology_provider TEXT,      -- 'medica', 'in_house', 'clinic'
  external_reference TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BROKER (thediagnostic.co.uk için)
CREATE TABLE broker_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES profiles(id),
  broker_id UUID REFERENCES profiles(id),
  platform platform DEFAULT 'thediagnostic',
  
  -- Hasta talebi
  requested_procedure TEXT NOT NULL, -- "PET-CT", "Gamma Knife Radiosurgery"
  diagnosis TEXT,
  current_country TEXT,
  preferred_countries TEXT[],
  budget_min_usd INTEGER,
  budget_max_usd INTEGER,
  timeframe TEXT,                    -- "ASAP", "within 1 month"
  
  -- Klinik teklifleri
  quotes JSONB DEFAULT '[]',        -- [{clinic_id, price, turnaround, notes}]
  selected_clinic_id UUID REFERENCES clinics(id),
  
  -- Koordinasyon
  travel_arranged BOOLEAN DEFAULT false,
  accommodation_arranged BOOLEAN DEFAULT false,
  interpreter_required BOOLEAN DEFAULT false,
  
  status TEXT DEFAULT 'inquiry',    -- inquiry, quoted, booked, travelling, completed
  broker_fee DECIMAL(10,2),
  broker_fee_paid BOOLEAN DEFAULT false,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI MARKETING LOG
CREATE TABLE ai_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  platform platform NOT NULL,
  trigger_type TEXT,                 -- 'empty_slots', 'last_minute', 'reengagement'
  slots_targeted INTEGER,
  budget_spent DECIMAL(8,2),
  revenue_recovered DECIMAL(10,2),
  bookings_generated INTEGER DEFAULT 0,
  channel TEXT,                      -- 'google_ads', 'email', 'sms', 'meta'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INSURANCE CLAIMS
CREATE TABLE insurance_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id),
  insurer_name TEXT NOT NULL,
  policy_number TEXT,
  auth_code TEXT,
  amount_claimed DECIMAL(10,2),
  amount_approved DECIMAL(10,2),
  status TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- KLİNİK REVIEWS
CREATE TABLE clinic_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id UUID REFERENCES clinics(id),
  patient_id UUID REFERENCES profiles(id),
  booking_id UUID REFERENCES bookings(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  review_text TEXT,
  is_verified BOOLEAN DEFAULT true,  -- Gerçek booking'den geldi
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS) Politikaları

```sql
-- Hastalar sadece kendi verilerini görebilir
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "patients_own_bookings" ON bookings
  FOR ALL USING (patient_id = auth.uid());

-- Klinik adminler sadece kendi kliniklerini görebilir  
CREATE POLICY "clinic_admin_own_clinic" ON bookings
  FOR SELECT USING (
    clinic_id IN (
      SELECT clinic_id FROM clinic_staff 
      WHERE user_id = auth.uid()
    )
  );

-- Raporlar: hasta + klinik + radyolog
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "report_access" ON reports
  FOR SELECT USING (
    booking_id IN (
      SELECT id FROM bookings WHERE patient_id = auth.uid()
    )
    OR radiologist_id = auth.uid()
    OR auth.uid() IN (SELECT id FROM profiles WHERE role = 'super_admin')
  );
```

---

## 🔧 KURULUM ADIMLARI

### 1. Repo Başlatma (GitHub'da yapılacak)

```bash
# GitHub'da "scanbook-platform" adında yeni repo aç
# Sonra local'de:

npx create-turbo@latest scanbook-platform
cd scanbook-platform

# Seçenekler:
# ✅ pnpm (package manager)
# ✅ TypeScript

# Mevcut apps/web'i sil, yenilerini ekle:
mv apps/web apps/scanbook
cp -r apps/scanbook apps/thediagnostic
```

### 2. Her App için Next.js Kur

```bash
# scanbook app
cd apps/scanbook
# package.json name: "@scanbook/web"

# thediagnostic app  
cd apps/thediagnostic
# package.json name: "@thediagnostic/web"
```

### 3. Shared Packages

```bash
mkdir -p packages/ui packages/db packages/stripe packages/email packages/ai
```

### 4. Root package.json

```json
{
  "name": "scanbook-platform",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "db:push": "cd packages/db && supabase db push",
    "db:migrate": "cd packages/db && supabase migration new"
  },
  "devDependencies": {
    "turbo": "latest",
    "typescript": "^5"
  },
  "packageManager": "pnpm@9.0.0"
}
```

### 5. turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalEnv": [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "STRIPE_SECRET_KEY",
    "PLATFORM"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### 6. Platform Config (Anahtar Fikir)

```typescript
// packages/config/platform.ts
export const PLATFORM_CONFIG = {
  scanbook: {
    name: "ScanBook",
    domain: "scanbook.co.uk",
    currency: "GBP",
    locale: "en-GB",
    scanCategories: ['mri', 'ct', 'ultrasound', 'baby_scan', 'xray', 'full_body'],
    features: {
      babyScans: true,
      internationalClinics: false,
      brokerMode: false,
      multiCurrency: false,
    }
  },
  thediagnostic: {
    name: "The Diagnostic",
    domain: "thediagnostic.co.uk",
    currency: "GBP",
    locale: "en-GB",
    scanCategories: ['pet_ct', 'gamma_knife', 'proton', 'checkup', 'nuclear', 'mri', 'ct'],
    features: {
      babyScans: false,
      internationalClinics: true,
      brokerMode: true,
      multiCurrency: true,    // GBP + EUR + USD
    }
  }
}
```

---

## 💳 STRIPE CONNECT MİMARİSİ

```
Sen (Platform) ──→ Stripe Platform Account
                         ↓
              Stripe Connect (Express)
                    ↙        ↘
          Klinik A          Klinik B
          (£249)            (£299)
            ↓                 ↓
    Otomatik split:    Otomatik split:
    Klinik: £224.10    Klinik: £269.10
    ScanBook: £24.90   ScanBook: £29.90
    (10% commission)   (10% commission)
```

Klinik onboarding sırasında Stripe Connect Express account oluşturulur. Ödeme geldiğinde otomatik split.

---

## 🗂️ RAPOR PANELİ (Admin/Radiology)

```
/admin/reports
├── Queue (bekleyen raporlar)
│   ├── Scan tamamlandı → DICOM yüklendi → Radyologa atandı
│   └── SLA tracker (24h/48h target)
│
├── DICOM Viewer (Ohif viewer entegre)
│   └── Tarayıcıda görüntü açma, temel annotation
│
├── Report Editor
│   ├── Template seçimi (MRI Head / CT Chest / ...)
│   ├── Findings, Impression, Recommendations
│   └── Urgency flag (acil bulgu → anlık bildirim)
│
├── Approve & Deliver
│   ├── Onay → PDF generate → Hastaya email/SMS
│   └── GP paylaşım seçeneği
│
└── Teleradiology Queue
    └── Dış radyoloji şirketine gönder → geri al → onay
```

---

## 🚀 DEPLOY

```
GitHub ──→ Vercel (her push'ta otomatik deploy)
              ├── scanbook.co.uk → apps/scanbook
              └── thediagnostic.co.uk → apps/thediagnostic

Supabase (tek instance, iki platform kolonu ile ayrılmış)
AWS S3 (DICOM + PDF storage — HIPAA/GDPR compliant bucket)
```

---

## 📅 TAHMINI FAZLAR

| Faz | Süre | Ne Yapılacak |
|---|---|---|
| **Faz 1** | 2 hafta | Monorepo kurulum, Supabase şema, Auth |
| **Faz 2** | 3 hafta | scanbook ana site + arama + harita |
| **Faz 3** | 2 hafta | Stripe Connect + booking flow |
| **Faz 4** | 2 hafta | Klinik paneli + slot yönetimi |
| **Faz 5** | 2 hafta | Hasta portalı + GP portalı |
| **Faz 6** | 1 hafta | Rapor/radyoloji paneli |
| **Faz 7** | 2 hafta | AI marketing engine |
| **Faz 8** | 2 hafta | thediagnostic fork + broker paneli |
| **Faz 9** | 1 hafta | Test + deploy + domain config |
| **TOPLAM** | ~17 hafta | MVP canlı |
