-- ============================================================
-- thediagnostic — Türkiye (TR) Şema Eklentileri
-- Modül 8: phase-2-LK1dc branch'indeki TR şemasının main'e
-- katkı (additive) migration'ı.
--
-- main'in mevcut `clinics` / `scan_types` tabloları ScanBook
-- (UK) modeline göre tasarlanmış (platform/clinic_status enum,
-- per-clinic scan_types vb.) ve TR klinik modeliyle (JCI/ISO,
-- grup, çok dilli, çok para birimli fiyatlandırma) yapısal
-- olarak uyumsuz. Bu yüzden mevcut tablolar DEĞİŞTİRİLMEDEN,
-- TR klinik kataloğu için `tr_clinics` / `tr_scan_types` adında
-- paralel tablolar eklenir (bkz. lib/tr-clinics.data.ts).
--
-- `users`, `profiles`, `bookings` main'de zaten var ve platform
-- bağımsız kimlik/booking kayıtları için kullanılmaya devam eder;
-- aşağıdaki yeni tablolar bu tablolara UUID id ile referans verir.
--
-- Çalıştırma: main'in schema-vercel.sql + schema-migrations.sql
-- uygulandıktan SONRA bu dosya çalıştırılmalıdır.
-- ============================================================

-- ---------------------------------------------------------
-- TR Klinik Kataloğu (lib/tr-clinics.data.ts ile birebir eşleşir)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS tr_clinics (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            VARCHAR(100) UNIQUE NOT NULL,
  name            VARCHAR(200) NOT NULL,
  short_name      VARCHAR(100),
  country         VARCHAR(5) NOT NULL DEFAULT 'TR',
  city            VARCHAR(100) NOT NULL,
  address         TEXT,
  latitude        DECIMAL(9,6),
  longitude       DECIMAL(9,6),
  phone           VARCHAR(30),
  email           VARCHAR(255),
  website         VARCHAR(255),
  logo_url        TEXT,
  cover_image_url TEXT,
  -- Akreditasyon
  jci_accredited       BOOLEAN DEFAULT false,
  iso_certified        BOOLEAN DEFAULT false,
  other_accreditations TEXT[],
  -- Grup / ortaklık
  hospital_group       VARCHAR(100),    -- 'Acıbadem' | 'Medicana' | 'Koç' | ...
  international_patient_centre BOOLEAN DEFAULT false,
  beds                 INT,
  founded_year         INT,
  languages            TEXT[],
  specialties          TEXT[],
  highlight_badge      VARCHAR(100),
  partner_since        DATE,
  commission_pct       DECIMAL(4,2) DEFAULT 15.00,
  is_active            BOOLEAN DEFAULT true,
  is_featured          BOOLEAN DEFAULT false,
  rating               DECIMAL(3,2),
  review_count         INT DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- TR Tarama/Cihaz Kataloğu (lib/tr-clinics.data.ts SCAN_TYPES)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS tr_scan_types (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code             VARCHAR(50) UNIQUE NOT NULL,  -- 'pet_ct', 'mri_3t', 'gamma_knife'
  name_en          VARCHAR(100) NOT NULL,
  name_tr          VARCHAR(100),
  name_ar          VARCHAR(100),
  category         VARCHAR(50),
  description_en   TEXT,
  description_tr   TEXT,
  description_ar   TEXT,
  preparation_en   TEXT,
  preparation_tr   TEXT,
  preparation_ar   TEXT,
  duration_minutes INT DEFAULT 60,
  icon             VARCHAR(50),
  is_active        BOOLEAN DEFAULT true,
  sort_order       INT DEFAULT 0
);

-- ---------------------------------------------------------
-- Klinik - cihaz/tarama eşlemesi ve çok para birimli fiyatlandırma
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS clinic_scan_types (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id      UUID REFERENCES tr_clinics(id) ON DELETE CASCADE,
  scan_type_code VARCHAR(50) REFERENCES tr_scan_types(code),
  device_name    VARCHAR(200),
  device_year    INT,
  price_gbp      DECIMAL(10,2),
  price_eur      DECIMAL(10,2),
  price_usd      DECIMAL(10,2),
  price_try      DECIMAL(10,2),
  price_aed      DECIMAL(10,2),
  uk_price_gbp   DECIMAL(10,2),
  is_available   BOOLEAN DEFAULT true,
  notes          TEXT,
  UNIQUE(clinic_id, scan_type_code)
);

-- ---------------------------------------------------------
-- Klinik görselleri ve çok dilli içerikler
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS clinic_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id  UUID REFERENCES tr_clinics(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clinic_translations (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id          UUID REFERENCES tr_clinics(id) ON DELETE CASCADE,
  locale             VARCHAR(5) NOT NULL,   -- en | tr | ar
  name               VARCHAR(200),
  description        TEXT,
  short_description  TEXT,
  address            TEXT,
  how_to_reach       TEXT,
  UNIQUE(clinic_id, locale)
);

-- ---------------------------------------------------------
-- Klinik portalı erişimi (main.users ile)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS clinic_admins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id  UUID REFERENCES tr_clinics(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(clinic_id, user_id)
);

-- ---------------------------------------------------------
-- Tarama slotları (Modül 10/11 için)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS scan_slots (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id        UUID REFERENCES tr_clinics(id) ON DELETE CASCADE,
  scan_type_code   VARCHAR(50) REFERENCES tr_scan_types(code),
  device_name      VARCHAR(200),
  slot_date        DATE NOT NULL,
  slot_time        TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  status           VARCHAR(20) DEFAULT 'available',
  -- available | reserved | confirmed | cancelled | blocked
  reserved_by      UUID REFERENCES users(id),
  reserved_until   TIMESTAMPTZ,
  booking_id       UUID REFERENCES bookings(id),
  price_gbp        DECIMAL(10,2),
  price_eur        DECIMAL(10,2),
  price_usd        DECIMAL(10,2),
  price_try        DECIMAL(10,2),
  price_aed        DECIMAL(10,2),
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinic_id, scan_type_code, slot_date, slot_time)
);

-- ---------------------------------------------------------
-- Concierge (uçuş/otel/transfer/tercüman) talepleri
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS concierge_requests (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id           UUID REFERENCES bookings(id) ON DELETE CASCADE,
  patient_id           UUID REFERENCES users(id),
  flight_needed        BOOLEAN DEFAULT false,
  departure_city       VARCHAR(100),
  departure_country    VARCHAR(5),
  departure_airport    VARCHAR(10),
  return_date          DATE,
  accommodation_needed BOOLEAN DEFAULT false,
  accommodation_nights INT DEFAULT 1,
  hotel_preference     VARCHAR(20) DEFAULT 'standard',
  transfer_needed      BOOLEAN DEFAULT false,
  translator_needed    BOOLEAN DEFAULT false,
  translator_language  VARCHAR(10),
  status               VARCHAR(20) DEFAULT 'pending',
  -- pending | in_progress | arranged | completed | cancelled
  concierge_agent_id   UUID REFERENCES users(id),
  concierge_notes      TEXT,
  flight_cost_gbp      DECIMAL(10,2),
  hotel_cost_gbp       DECIMAL(10,2),
  transfer_cost_gbp    DECIMAL(10,2),
  translator_cost_gbp  DECIMAL(10,2),
  total_cost_gbp       DECIMAL(10,2),
  ai_travel_plan       JSONB,
  special_requirements TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- Rapor işleme (R2 + DeepL + Claude)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS scan_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID REFERENCES bookings(id) ON DELETE CASCADE,
  patient_id          UUID REFERENCES users(id),
  clinic_id           UUID REFERENCES tr_clinics(id),
  report_pdf_url      TEXT,
  dicom_url           TEXT,
  report_r2_key       TEXT,
  report_date         DATE,
  radiologist_name    VARCHAR(200),
  original_language   VARCHAR(10) DEFAULT 'tr',  -- 'tr' | 'en'
  translation_status  VARCHAR(20) DEFAULT 'pending',
  -- pending | processing | completed | failed
  translated_pdf_url  TEXT,
  translated_r2_key   TEXT,
  translated_at       TIMESTAMPTZ,
  ai_summary_patient  TEXT,
  ai_summary_gp       TEXT,
  ai_key_findings     JSONB,
  ai_followup_needed  BOOLEAN,
  ai_followup_urgency VARCHAR(20),               -- routine | soon | urgent
  ai_processed_at     TIMESTAMPTZ,
  is_urgent           BOOLEAN DEFAULT false,
  is_shared_with_gp   BOOLEAN DEFAULT false,
  gp_shared_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- Blog / İçerik (SEO sayfaları için)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         VARCHAR(200) UNIQUE NOT NULL,
  locale       VARCHAR(5) DEFAULT 'en',
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  cover_image  TEXT,
  author       VARCHAR(100),
  tags         TEXT[],
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- Çoklu para birimi (Modül 25)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS exchange_rates (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency VARCHAR(5) NOT NULL,
  to_currency   VARCHAR(5) NOT NULL,
  rate          DECIMAL(12,6) NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(from_currency, to_currency)
);

CREATE TABLE IF NOT EXISTS geo_pricing (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type_code      VARCHAR(50) REFERENCES tr_scan_types(code),
  country_code        VARCHAR(5) NOT NULL,
  currency            VARCHAR(5) NOT NULL,
  base_price          DECIMAL(10,2) NOT NULL,
  discount_percentage INT DEFAULT 0,
  is_active           BOOLEAN DEFAULT true,
  UNIQUE(scan_type_code, country_code)
);

-- ---------------------------------------------------------
-- Denetim kaydı
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES users(id),
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id   UUID,
  details     JSONB,
  ip_address  VARCHAR(45),
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- WhatsApp Business API (Modül 29)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wa_phone_id      VARCHAR(50),
  patient_phone    VARCHAR(20) NOT NULL,
  patient_name     VARCHAR(200),
  booking_id       UUID REFERENCES bookings(id),
  patient_id       UUID REFERENCES users(id),
  locale           VARCHAR(5) DEFAULT 'en',
  status           VARCHAR(20) DEFAULT 'active',
  -- active | resolved | escalated | spam
  escalated_to     UUID REFERENCES users(id),
  last_message_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  direction        VARCHAR(10) NOT NULL,         -- 'inbound' | 'outbound'
  message_type     VARCHAR(20) DEFAULT 'text',   -- text | template | document | image
  content          TEXT,
  template_name    VARCHAR(100),
  wa_message_id    VARCHAR(100),
  status           VARCHAR(20) DEFAULT 'sent',   -- sent | delivered | read | failed
  sent_at          TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- profiles tablosuna TR hasta alanları (additive ALTER)
-- ---------------------------------------------------------
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nationality VARCHAR(5);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_locale VARCHAR(5) DEFAULT 'en';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS preferred_currency VARCHAR(5) DEFAULT 'GBP';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS passport_number VARCHAR(30);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS passport_expiry DATE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS emergency_contact_name VARCHAR(200);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS emergency_contact_phone VARCHAR(30);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS medical_notes TEXT;

-- ---------------------------------------------------------
-- bookings tablosuna TR/uluslararası hasta + concierge alanları
-- ---------------------------------------------------------
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS tr_clinic_id UUID REFERENCES tr_clinics(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS scan_slot_id UUID REFERENCES scan_slots(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS scan_type_code VARCHAR(50) REFERENCES tr_scan_types(code);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_nationality VARCHAR(5);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS has_metal_implants BOOLEAN;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_claustrophobic BOOLEAN;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS is_pregnant BOOLEAN;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS weight_kg DECIMAL(5,1);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS contrast_required BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS concierge_fee NUMERIC(10,2) DEFAULT 0;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS platform_fee NUMERIC(10,2);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_provider VARCHAR(20);  -- 'stripe' | 'iyzico'

-- ---------------------------------------------------------
-- İletişim formu mesajları (/contact sayfasından)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT,
  email      TEXT,
  phone      TEXT,
  subject    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ---------------------------------------------------------
-- İndeksler
-- ---------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_scan_slots_clinic_date ON scan_slots(clinic_id, slot_date);
CREATE INDEX IF NOT EXISTS idx_scan_slots_status ON scan_slots(status);
CREATE INDEX IF NOT EXISTS idx_clinic_scan_types_clinic ON clinic_scan_types(clinic_id);
CREATE INDEX IF NOT EXISTS idx_tr_clinics_slug ON tr_clinics(slug);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_conversation ON whatsapp_messages(conversation_id);
