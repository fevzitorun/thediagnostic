-- ============================================================
-- SCANBOOK PLATFORM — SUPABASE DATABASE SCHEMA
-- Applies to: scanbook.co.uk + thediagnostic.co.uk
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- fuzzy search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- accent-insensitive search

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE platform AS ENUM ('scanbook', 'thediagnostic');

CREATE TYPE scan_category AS ENUM (
  'mri', 'ct', 'ultrasound', 'baby_scan', 'xray', 'full_body',
  'pet_ct', 'gamma_knife', 'proton_therapy', 'nuclear_medicine',
  'dexa', 'mammography', 'checkup_package'
);

CREATE TYPE booking_status AS ENUM (
  'pending',       -- Ödeme bekleniyor
  'confirmed',     -- Ödeme alındı, slot kilitlendi
  'checked_in',    -- Hasta klinikte
  'completed',     -- Scan tamamlandı
  'cancelled',     -- İptal
  'no_show',       -- Gelmedi
  'refunded'       -- Para iadesi yapıldı
);

CREATE TYPE report_status AS ENUM (
  'awaiting_scan',     -- Scan henüz yapılmadı
  'awaiting_upload',   -- Scan yapıldı, DICOM bekleniyor
  'uploaded',          -- DICOM yüklendi, radyolog atanmadı
  'assigned',          -- Radyologa atandı
  'in_review',         -- Radyolog inceliyor
  'draft',             -- Taslak rapor var
  'approved',          -- Onaylandı
  'delivered',         -- Hastaya teslim edildi
  'urgent_flagged'     -- Acil bulgu
);

CREATE TYPE user_role AS ENUM (
  'patient',
  'clinic_admin',
  'clinic_staff',
  'gp',
  'radiologist',
  'teleradiologist',   -- Outsource radyolog
  'broker',            -- thediagnostic medical broker
  'super_admin'
);

CREATE TYPE clinic_tier AS ENUM ('standard', 'premium', 'flagship');

CREATE TYPE urgency_level AS ENUM ('routine', 'urgent', 'emergency');

-- ============================================================
-- PROFILES (Supabase Auth ile bağlantılı)
-- ============================================================

CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role            user_role NOT NULL DEFAULT 'patient',
  platform        platform NOT NULL DEFAULT 'scanbook',

  -- Kişisel bilgiler
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL,
  phone           TEXT,
  date_of_birth   DATE,
  gender          TEXT,
  nhs_number      TEXT,

  -- Adres
  address_line1   TEXT,
  address_line2   TEXT,
  address_city    TEXT,
  address_postcode TEXT,
  address_country TEXT DEFAULT 'GB',

  -- Sağlık/Sigorta
  insurance_provider TEXT,
  insurance_number   TEXT,
  gp_name            TEXT,
  gp_surgery         TEXT,
  gp_email           TEXT,

  -- Uluslararası (thediagnostic)
  nationality     TEXT,
  passport_number TEXT,
  preferred_language TEXT DEFAULT 'en',

  -- Consent & Marketing
  gdpr_consent        BOOLEAN DEFAULT false,
  gdpr_consent_at     TIMESTAMPTZ,
  marketing_consent   BOOLEAN DEFAULT false,

  -- GP spesifik
  gmc_number      TEXT,              -- General Medical Council
  practice_name   TEXT,
  practice_address TEXT,
  commission_bank_account JSONB,     -- Şifreli

  -- Broker spesifik
  broker_languages TEXT[],

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- KLİNİKLER
-- ============================================================

CREATE TABLE clinics (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        platform NOT NULL,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  tier            clinic_tier DEFAULT 'standard',

  -- Bilgiler
  description     TEXT,
  short_description TEXT,
  phone           TEXT,
  email           TEXT,
  website         TEXT,
  logo_url        TEXT,
  images          TEXT[],

  -- Adres
  address_line1   TEXT NOT NULL,
  address_line2   TEXT,
  address_city    TEXT NOT NULL,
  address_postcode TEXT,
  address_country TEXT NOT NULL DEFAULT 'GB',
  latitude        DECIMAL(10,8),
  longitude       DECIMAL(11,8),

  -- Sertifikalar
  cqc_number      TEXT,
  cqc_rating      TEXT,              -- 'Outstanding', 'Good', 'Requires Improvement'
  accreditations  TEXT[] DEFAULT '{}', -- ['CQC', 'JCI', 'ISO9001']
  indemnity_insurer TEXT,
  indemnity_expiry DATE,

  -- Hizmet
  languages       TEXT[] DEFAULT '{en}',
  opening_hours   JSONB,             -- {mon: {open: "08:00", close: "18:00"}, ...}
  equipment       JSONB DEFAULT '{}', -- {mri_1_5t: true, mri_3t: false, ct: true}

  -- Finansal
  currency        TEXT DEFAULT 'GBP',
  stripe_account_id TEXT,            -- Stripe Connect
  commission_rate DECIMAL(4,2) DEFAULT 10.00,
  vat_registered  BOOLEAN DEFAULT false,
  vat_number      TEXT,

  -- Platform
  is_active       BOOLEAN DEFAULT false,
  is_verified     BOOLEAN DEFAULT false,
  is_featured     BOOLEAN DEFAULT false,
  onboarding_complete BOOLEAN DEFAULT false,

  -- Metrikler (cache)
  rating          DECIMAL(2,1) DEFAULT 0.0,
  review_count    INTEGER DEFAULT 0,
  total_bookings  INTEGER DEFAULT 0,

  -- Meta
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Klinik çalışanları (admin birden fazla kliniği yönetebilir)
CREATE TABLE clinic_staff (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id   UUID REFERENCES clinics(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role        TEXT DEFAULT 'staff',  -- 'admin', 'staff', 'radiographer'
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (clinic_id, user_id)
);

-- ============================================================
-- SCAN TÜRLERİ
-- ============================================================

CREATE TABLE scan_types (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id       UUID REFERENCES clinics(id) ON DELETE CASCADE,
  platform        platform NOT NULL,
  category        scan_category NOT NULL,

  -- Bilgiler
  name            TEXT NOT NULL,       -- "MRI Brain 1.5T"
  description     TEXT,
  preparation     TEXT,                -- "Fast for 4 hours before"
  contraindications TEXT,              -- "No metallic implants"
  what_to_bring   TEXT,
  duration_minutes INTEGER NOT NULL,

  -- Fiyatlar (çoklu para birimi)
  price_gbp       DECIMAL(10,2),
  price_eur       DECIMAL(10,2),
  price_usd       DECIMAL(10,2),

  -- Kural
  requires_referral         BOOLEAN DEFAULT false,
  requires_mri_safety_form  BOOLEAN DEFAULT false,
  min_age_years             INTEGER,
  max_age_years             INTEGER,

  -- Rapor SLA
  report_sla_hours          INTEGER DEFAULT 72, -- 3 gün

  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SLOTLAR (Real-time müsaitlik)
-- ============================================================

CREATE TABLE slots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id       UUID REFERENCES clinics(id) ON DELETE CASCADE,
  scan_type_id    UUID REFERENCES scan_types(id) ON DELETE CASCADE,

  starts_at       TIMESTAMPTZ NOT NULL,
  ends_at         TIMESTAMPTZ NOT NULL,
  room            TEXT,               -- "MRI Suite A"

  is_available    BOOLEAN DEFAULT true,
  is_blocked      BOOLEAN DEFAULT false,
  block_reason    TEXT,

  -- AI Slot Filling
  is_promoted         BOOLEAN DEFAULT false,
  promotion_discount  INTEGER DEFAULT 0,  -- %15
  promotion_ends_at   TIMESTAMPTZ,
  ai_campaign_id      UUID,

  -- Booking bağlantısı
  booking_id      UUID,               -- Dolu olduğunda set edilir

  created_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Aynı anda çift booking engeli
  CONSTRAINT no_double_booking UNIQUE (id, booking_id)
);

-- Slot müsaitlik index
CREATE INDEX idx_slots_available ON slots(clinic_id, starts_at, is_available)
  WHERE is_available = true AND is_blocked = false;

-- ============================================================
-- BOOKINGS
-- ============================================================

CREATE TABLE bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref     TEXT UNIQUE NOT NULL,  -- SB-20847 veya TD-00123
  platform        platform NOT NULL,

  -- İlişkiler
  patient_id      UUID REFERENCES profiles(id),
  slot_id         UUID REFERENCES slots(id),
  clinic_id       UUID REFERENCES clinics(id),
  scan_type_id    UUID REFERENCES scan_types(id),
  gp_referral_id  UUID,               -- gp_referrals.id

  status          booking_status DEFAULT 'pending',

  -- Ödeme
  amount_total    DECIMAL(10,2),
  amount_paid     DECIMAL(10,2),
  currency        TEXT DEFAULT 'GBP',
  stripe_payment_intent_id TEXT,
  stripe_charge_id         TEXT,

  -- Sigorta
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  insurance_auth_code TEXT,
  insurance_claim_id UUID,

  -- Klinik notları
  clinical_notes  TEXT,
  patient_notes   TEXT,
  admin_notes     TEXT,

  -- MRI Güvenlik Anketi
  mri_safety_form JSONB,
  /*
  {
    "metal_implants": false,
    "pacemaker": false,
    "cochlear_implant": false,
    "pregnancy": false,
    "breastfeeding": false,
    "claustrophobia": false,
    "kidney_disease": false,
    "tattoos": false,
    "drug_allergies": null,
    "contrast_agent_consent": true,
    "completed_at": "2026-03-18T10:00:00Z",
    "ip_address": "1.2.3.4"
  }
  */
  questionnaire_completed_at TIMESTAMPTZ,

  -- Hatırlatıcılar
  reminder_48h_sent BOOLEAN DEFAULT false,
  reminder_24h_sent BOOLEAN DEFAULT false,
  reminder_2h_sent  BOOLEAN DEFAULT false,

  -- Komisyon & Payout
  platform_commission DECIMAL(10,2),
  clinic_payout_amount DECIMAL(10,2),
  gp_commission_amount DECIMAL(10,2),
  payout_status        TEXT DEFAULT 'pending', -- pending, paid, on_hold
  payout_date          DATE,
  stripe_transfer_id   TEXT,

  -- Uluslararası (thediagnostic)
  patient_country    TEXT,
  travel_notes       TEXT,
  interpreter_needed BOOLEAN DEFAULT false,
  broker_case_id     UUID,            -- broker_cases.id

  -- Timestamps
  confirmed_at    TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  cancelled_at    TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Booking ref generator
CREATE OR REPLACE FUNCTION generate_booking_ref(p platform)
RETURNS TEXT AS $$
DECLARE
  prefix TEXT;
  ref TEXT;
BEGIN
  IF p = 'scanbook' THEN
    prefix := 'SB-';
  ELSE
    prefix := 'TD-';
  END IF;
  ref := prefix || LPAD(FLOOR(RANDOM() * 99999)::TEXT, 5, '0');
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- GP REFERRALLER
-- ============================================================

CREATE TABLE gp_referrals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        platform NOT NULL,

  gp_id           UUID REFERENCES profiles(id),
  patient_id      UUID REFERENCES profiles(id),

  -- Referral detayları
  scan_category   scan_category NOT NULL,
  clinical_indication TEXT NOT NULL,
  urgency         urgency_level DEFAULT 'routine',
  clinical_notes  TEXT,

  -- Hedef
  preferred_clinic_id UUID REFERENCES clinics(id),
  preferred_city  TEXT,
  preferred_date  DATE,

  -- Hasta bilgileri (GP girişi)
  patient_first_name TEXT,
  patient_last_name  TEXT,
  patient_dob        DATE,
  patient_nhs_number TEXT,
  patient_email      TEXT,
  patient_phone      TEXT,

  -- Durum
  referral_code   TEXT UNIQUE,        -- Hastaya gönderilen link kodu
  status          TEXT DEFAULT 'sent', -- sent, opened, booked, completed, expired
  booking_id      UUID REFERENCES bookings(id),

  -- Komisyon
  commission_rate  DECIMAL(4,2) DEFAULT 10.00, -- GP %10 cut
  commission_amount DECIMAL(8,2),
  commission_paid   BOOLEAN DEFAULT false,
  commission_paid_at TIMESTAMPTZ,

  expires_at      TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RAPORLAR (Radyoloji Panelinin Kalbi)
-- ============================================================

CREATE TABLE reports (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID REFERENCES bookings(id) UNIQUE NOT NULL,
  platform        platform NOT NULL,

  -- Dosyalar (Supabase Storage veya AWS S3)
  dicom_path      TEXT,               -- /reports/{id}/dicom/
  pdf_path        TEXT,               -- /reports/{id}/report.pdf
  images_paths    TEXT[] DEFAULT '{}', -- Key images

  -- Radyolog ataması
  radiologist_id  UUID REFERENCES profiles(id),
  radiologist_name TEXT,
  radiologist_credentials TEXT,
  assigned_at     TIMESTAMPTZ,

  -- Teleradyoloji (dış kaynak)
  teleradiology_provider TEXT,        -- 'medica_group', '4ways', 'in_house'
  external_ref    TEXT,
  external_submitted_at TIMESTAMPTZ,
  external_received_at  TIMESTAMPTZ,

  -- Rapor içeriği
  report_template  TEXT,              -- 'mri_brain', 'ct_chest', 'ultrasound_abdomen'
  clinical_history TEXT,
  technique        TEXT,
  findings         TEXT,
  impression       TEXT NOT NULL,     -- Zorunlu
  recommendations  TEXT,
  is_normal        BOOLEAN,

  -- Acil bulgular
  urgent_flag      BOOLEAN DEFAULT false,
  urgent_reason    TEXT,
  urgent_notified_at TIMESTAMPTZ,

  -- Durum takibi
  status           report_status DEFAULT 'awaiting_scan',
  uploaded_at      TIMESTAMPTZ,
  assigned_at_ts   TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  approved_at      TIMESTAMPTZ,
  delivered_at     TIMESTAMPTZ,

  -- GP paylaşımı
  shared_with_gp          BOOLEAN DEFAULT false,
  shared_with_gp_at       TIMESTAMPTZ,
  gp_email_sent_to        TEXT,
  patient_download_count  INTEGER DEFAULT 0,

  -- SLA
  sla_target_at   TIMESTAMPTZ,        -- Teslim edilmesi gereken zaman
  sla_breached    BOOLEAN DEFAULT false,

  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BROKER CASES (thediagnostic için)
-- ============================================================

CREATE TABLE broker_cases (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform        platform DEFAULT 'thediagnostic',
  case_ref        TEXT UNIQUE,        -- TD-CASE-00042

  patient_id      UUID REFERENCES profiles(id),
  broker_id       UUID REFERENCES profiles(id),

  -- Hasta talebi
  procedure_requested TEXT NOT NULL,  -- "PET-CT Full Body", "Gamma Knife"
  diagnosis       TEXT,
  medical_history TEXT,
  current_country TEXT NOT NULL,
  preferred_countries TEXT[] DEFAULT '{}',
  preferred_language  TEXT DEFAULT 'en',

  -- Bütçe
  budget_currency TEXT DEFAULT 'GBP',
  budget_min      DECIMAL(10,2),
  budget_max      DECIMAL(10,2),
  timeframe       TEXT,               -- 'asap', '1_month', '3_months'

  -- Teklifler (JSON)
  quotes JSONB DEFAULT '[]',
  /*
  [{
    "clinic_id": "uuid",
    "clinic_name": "...",
    "country": "DE",
    "city": "Munich",
    "price_gbp": 3500,
    "turnaround_days": 5,
    "available_from": "2026-04-01",
    "notes": "...",
    "sent_at": "...",
    "responded_at": "..."
  }]
  */

  -- Seçilen klinik
  selected_clinic_id   UUID REFERENCES clinics(id),
  booking_id           UUID REFERENCES bookings(id),

  -- Koordinasyon
  visa_required        BOOLEAN DEFAULT false,
  visa_arranged        BOOLEAN DEFAULT false,
  travel_arranged      BOOLEAN DEFAULT false,
  accommodation_arranged BOOLEAN DEFAULT false,
  interpreter_required BOOLEAN DEFAULT false,
  interpreter_language TEXT,
  airport_transfer     BOOLEAN DEFAULT false,

  -- Finansal
  broker_fee_amount    DECIMAL(10,2),
  broker_fee_currency  TEXT DEFAULT 'GBP',
  broker_fee_paid      BOOLEAN DEFAULT false,

  status  TEXT DEFAULT 'new_inquiry',
  -- new_inquiry → quotes_requested → quoted → accepted
  -- → booked → travelling → completed → closed

  internal_notes  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SİGORTA TALEPLERİ
-- ============================================================

CREATE TABLE insurance_claims (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID REFERENCES bookings(id) UNIQUE,
  patient_id      UUID REFERENCES profiles(id),

  insurer_name    TEXT NOT NULL,      -- 'Bupa', 'AXA', 'Aviva'
  policy_number   TEXT NOT NULL,
  auth_code       TEXT,               -- Pre-auth kodu
  claim_number    TEXT,               -- Talebin referans numarası

  amount_claimed  DECIMAL(10,2) NOT NULL,
  amount_approved DECIMAL(10,2),
  amount_paid     DECIMAL(10,2),

  invoice_pdf_path TEXT,
  documents_paths  TEXT[] DEFAULT '{}',

  status          TEXT DEFAULT 'submitted',
  -- submitted → pre_auth_requested → pre_auth_approved → submitted_to_insurer → approved → paid

  submitted_at    TIMESTAMPTZ DEFAULT NOW(),
  pre_auth_at     TIMESTAMPTZ,
  approved_at     TIMESTAMPTZ,
  paid_at         TIMESTAMPTZ,
  notes           TEXT
);

-- ============================================================
-- AI MARKETING
-- ============================================================

CREATE TABLE ai_campaigns (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id       UUID REFERENCES clinics(id),
  platform        platform NOT NULL,

  trigger_type    TEXT NOT NULL,
  -- 'empty_slots_48h', 'last_minute_24h', 'reengagement', 'seasonal'

  -- Hedef slotlar
  slots_targeted       INTEGER,
  slots_available_before INTEGER,
  slots_available_after  INTEGER,
  slots_filled           INTEGER DEFAULT 0,

  -- Kanallar
  channels        TEXT[] DEFAULT '{}', -- ['google_ads', 'email', 'sms', 'meta']
  discount_applied INTEGER DEFAULT 0,  -- %

  -- Bütçe & Gelir
  budget_allocated  DECIMAL(8,2),
  budget_spent      DECIMAL(8,2) DEFAULT 0,
  revenue_generated DECIMAL(10,2) DEFAULT 0,
  roi               DECIMAL(6,2),     -- (revenue/spend - 1) * 100

  -- Email/SMS
  emails_sent     INTEGER DEFAULT 0,
  emails_opened   INTEGER DEFAULT 0,
  sms_sent        INTEGER DEFAULT 0,

  started_at      TIMESTAMPTZ DEFAULT NOW(),
  ended_at        TIMESTAMPTZ,
  status          TEXT DEFAULT 'running'
);

-- ============================================================
-- KLİNİK REVIEWS
-- ============================================================

CREATE TABLE clinic_reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id   UUID REFERENCES clinics(id) ON DELETE CASCADE,
  patient_id  UUID REFERENCES profiles(id),
  booking_id  UUID REFERENCES bookings(id) UNIQUE,

  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       TEXT,
  body        TEXT,

  -- Alt puanlar
  rating_cleanliness  INTEGER CHECK (rating_cleanliness BETWEEN 1 AND 5),
  rating_staff        INTEGER CHECK (rating_staff BETWEEN 1 AND 5),
  rating_wait_time    INTEGER CHECK (rating_wait_time BETWEEN 1 AND 5),
  rating_value        INTEGER CHECK (rating_value BETWEEN 1 AND 5),

  is_verified     BOOLEAN DEFAULT true,  -- Gerçek booking
  is_published    BOOLEAN DEFAULT true,
  admin_note      TEXT,

  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Rating güncelle (trigger)
CREATE OR REPLACE FUNCTION update_clinic_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE clinics
  SET
    rating = (
      SELECT ROUND(AVG(rating)::NUMERIC, 1)
      FROM clinic_reviews
      WHERE clinic_id = NEW.clinic_id AND is_published = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM clinic_reviews
      WHERE clinic_id = NEW.clinic_id AND is_published = true
    )
  WHERE id = NEW.clinic_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_clinic_rating
AFTER INSERT OR UPDATE ON clinic_reviews
FOR EACH ROW EXECUTE FUNCTION update_clinic_rating();

-- ============================================================
-- NOTIFICATIONS LOG
-- ============================================================

CREATE TABLE notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id),
  booking_id  UUID REFERENCES bookings(id),
  platform    platform,

  channel     TEXT NOT NULL,          -- 'email', 'sms', 'push'
  type        TEXT NOT NULL,          -- 'booking_confirmed', 'report_ready', 'reminder_24h'
  status      TEXT DEFAULT 'sent',    -- 'sent', 'delivered', 'failed', 'opened'

  subject     TEXT,
  body_preview TEXT,
  external_id TEXT,                   -- Resend/Twilio message ID

  sent_at     TIMESTAMPTZ DEFAULT NOW(),
  opened_at   TIMESTAMPTZ
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users_own_profile" ON profiles
  FOR ALL USING (id = auth.uid());
CREATE POLICY "admin_all_profiles" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Bookings
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "patient_own_bookings" ON bookings
  FOR SELECT USING (patient_id = auth.uid());
CREATE POLICY "clinic_own_bookings" ON bookings
  FOR SELECT USING (
    clinic_id IN (
      SELECT clinic_id FROM clinic_staff WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "admin_all_bookings" ON bookings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

-- Reports
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "patient_own_reports" ON reports
  FOR SELECT USING (
    booking_id IN (SELECT id FROM bookings WHERE patient_id = auth.uid())
  );
CREATE POLICY "radiologist_assigned_reports" ON reports
  FOR ALL USING (radiologist_id = auth.uid());
CREATE POLICY "clinic_own_reports" ON reports
  FOR SELECT USING (
    booking_id IN (
      SELECT b.id FROM bookings b
      JOIN clinic_staff cs ON b.clinic_id = cs.clinic_id
      WHERE cs.user_id = auth.uid()
    )
  );

-- Slots
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_available_slots" ON slots
  FOR SELECT USING (is_available = true AND is_blocked = false);
CREATE POLICY "clinic_manage_own_slots" ON slots
  FOR ALL USING (
    clinic_id IN (
      SELECT clinic_id FROM clinic_staff WHERE user_id = auth.uid()
    )
  );

-- ============================================================
-- INDEXES (Performans)
-- ============================================================

CREATE INDEX idx_bookings_patient ON bookings(patient_id);
CREATE INDEX idx_bookings_clinic ON bookings(clinic_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_platform ON bookings(platform);
CREATE INDEX idx_slots_clinic_date ON slots(clinic_id, starts_at);
CREATE INDEX idx_clinics_platform ON clinics(platform, is_active);
CREATE INDEX idx_clinics_location ON clinics USING GIST (
  ll_to_earth(latitude::float8, longitude::float8)
) WHERE latitude IS NOT NULL;
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_booking ON reports(booking_id);

-- Full text search
CREATE INDEX idx_clinics_search ON clinics
  USING GIN (to_tsvector('english', name || ' ' || COALESCE(address_city, '') || ' ' || COALESCE(description, '')));

-- ============================================================
-- SAMPLE DATA (İlk 5 Klinik)
-- ============================================================

INSERT INTO clinics (platform, name, slug, tier, address_line1, address_city, address_postcode, address_country, latitude, longitude, cqc_number, languages, is_active, is_verified, description) VALUES
('scanbook', 'Harley Street Imaging Centre', 'harley-street-imaging', 'flagship', '22 Harley Street', 'London', 'W1G 9PL', 'GB', 51.5200, -0.1490, 'CQC-1234567', '{en}', true, true, 'Premium private imaging in the heart of Londons medical district. 1.5T and 3T MRI scanners.'),
('scanbook', 'NovaScan Manchester', 'novascan-manchester', 'premium', '15 Deansgate', 'Manchester', 'M3 4LQ', 'GB', 53.4808, -2.2426, 'CQC-2345678', '{en}', true, true, 'Modern imaging centre in central Manchester. Walk-in ultrasound available.'),
('scanbook', 'Birmingham Diagnostic Centre', 'birmingham-diagnostic', 'standard', '8 Colmore Row', 'Birmingham', 'B3 2QD', 'GB', 52.4808, -1.8960, 'CQC-3456789', '{en}', true, true, 'Full range of diagnostic imaging for the Midlands.'),
('scanbook', 'Leeds Scan & Imaging', 'leeds-scan-imaging', 'premium', '3 Park Row', 'Leeds', 'LS1 5HD', 'GB', 53.7997, -1.5492, 'CQC-4567890', '{en}', true, true, 'Baby scan specialists and full MRI suite in Leeds city centre.'),
('scanbook', 'Edinburgh Private Imaging', 'edinburgh-private-imaging', 'flagship', '11 George Street', 'Edinburgh', 'EH2 2PB', 'GB', 55.9533, -3.1883, 'CQC-5678901', '{en}', true, true, 'Scotlands leading private imaging centre with 3T scanner.');

-- ============================================================
-- VIEWS (Kullanışlı sorgular)
-- ============================================================

-- Bugünkü bookinglar özeti (klinikler için)
CREATE VIEW today_bookings AS
SELECT
  b.id, b.booking_ref, b.status, b.platform,
  b.amount_paid, b.currency,
  p.first_name || ' ' || p.last_name AS patient_name,
  p.phone AS patient_phone,
  st.name AS scan_name, st.duration_minutes,
  s.starts_at, s.room,
  c.name AS clinic_name,
  r.status AS report_status
FROM bookings b
JOIN profiles p ON b.patient_id = p.id
JOIN slots s ON b.slot_id = s.id
JOIN scan_types st ON b.scan_type_id = st.id
JOIN clinics c ON b.clinic_id = c.id
LEFT JOIN reports r ON r.booking_id = b.id
WHERE s.starts_at::DATE = CURRENT_DATE;

-- Rapor bekleyen queue
CREATE VIEW report_queue AS
SELECT
  r.id, r.status, r.urgent_flag, r.sla_target_at,
  b.booking_ref, b.platform,
  p.first_name || ' ' || p.last_name AS patient_name,
  st.name AS scan_type, st.category,
  c.name AS clinic_name,
  r.dicom_path,
  r.assigned_at,
  CASE
    WHEN r.sla_target_at < NOW() THEN true
    ELSE false
  END AS sla_breached
FROM reports r
JOIN bookings b ON r.booking_id = b.id
JOIN profiles p ON b.patient_id = p.id
JOIN scan_types st ON b.scan_type_id = st.id
JOIN clinics c ON b.clinic_id = c.id
WHERE r.status NOT IN ('delivered')
ORDER BY r.urgent_flag DESC, r.sla_target_at ASC;
