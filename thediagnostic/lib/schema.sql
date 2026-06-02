-- =============================================================
-- thediagnostic — PostgreSQL Schema
-- Version: 1.0 | 26 May 2026
-- Connective Hub Limited & Connective Hub Dijital Teknolojiler A.Ş.
-- =============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================
-- USERS & AUTH
-- =============================================================

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT,
  role          VARCHAR(20) NOT NULL DEFAULT 'patient',
  -- role: patient | clinic_admin | admin | concierge
  google_id     TEXT UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  first_name       VARCHAR(100),
  last_name        VARCHAR(100),
  phone            VARCHAR(30),
  date_of_birth    DATE,
  nationality      VARCHAR(5),        -- ISO country code: GB, TR, AE
  preferred_locale VARCHAR(5) DEFAULT 'en',  -- en | tr | ar
  preferred_currency VARCHAR(5) DEFAULT 'GBP',
  gp_name          VARCHAR(200),
  gp_practice      VARCHAR(200),
  gp_email         VARCHAR(255),
  passport_number  VARCHAR(30),
  passport_expiry  DATE,
  emergency_contact_name  VARCHAR(200),
  emergency_contact_phone VARCHAR(30),
  medical_notes    TEXT,              -- Allergies, conditions, medications
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- CLINICS
-- =============================================================

CREATE TABLE IF NOT EXISTS clinics (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            VARCHAR(100) UNIQUE NOT NULL,
  name            VARCHAR(200) NOT NULL,
  short_name      VARCHAR(100),
  country         VARCHAR(5) NOT NULL,    -- TR, DE, AE, PL
  city            VARCHAR(100) NOT NULL,
  address         TEXT,
  latitude        DECIMAL(9,6),
  longitude       DECIMAL(9,6),
  phone           VARCHAR(30),
  email           VARCHAR(255),
  website         VARCHAR(255),
  logo_url        TEXT,
  cover_image_url TEXT,
  -- Accreditations
  jci_accredited  BOOLEAN DEFAULT false,
  iso_certified   BOOLEAN DEFAULT false,
  other_accreditations TEXT[],           -- ['JCI', 'ISO 9001', 'TÜVTURK']
  -- Partnership
  partner_since   DATE,
  commission_pct  DECIMAL(4,2) DEFAULT 15.00,  -- thediagnostic commission %
  is_active       BOOLEAN DEFAULT true,
  is_featured     BOOLEAN DEFAULT false,
  -- Metadata
  rating          DECIMAL(3,2),
  review_count    INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clinic_translations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id        UUID REFERENCES clinics(id) ON DELETE CASCADE,
  locale           VARCHAR(5) NOT NULL,   -- en | tr | ar
  name             VARCHAR(200),
  description      TEXT,
  short_description TEXT,
  address          TEXT,
  how_to_reach     TEXT,
  UNIQUE(clinic_id, locale)
);

CREATE TABLE IF NOT EXISTS clinic_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id  UUID REFERENCES clinics(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Clinic admin users
CREATE TABLE IF NOT EXISTS clinic_admins (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id  UUID REFERENCES clinics(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(clinic_id, user_id)
);

-- =============================================================
-- SCAN TYPES & DEVICES
-- =============================================================

CREATE TABLE IF NOT EXISTS scan_types (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code             VARCHAR(50) UNIQUE NOT NULL,  -- 'pet_ct', 'mri_3t', 'gamma_knife'
  name_en          VARCHAR(100) NOT NULL,
  name_tr          VARCHAR(100),
  name_ar          VARCHAR(100),
  category         VARCHAR(50),                  -- 'nuclear', 'mri', 'ct', 'interventional'
  description_en   TEXT,
  description_tr   TEXT,
  description_ar   TEXT,
  preparation_en   TEXT,                         -- Pre-scan preparation instructions
  preparation_tr   TEXT,
  preparation_ar   TEXT,
  duration_minutes INT DEFAULT 60,               -- Typical scan duration
  icon             VARCHAR(50),                  -- emoji or icon name
  is_active        BOOLEAN DEFAULT true,
  sort_order       INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS clinic_scan_types (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id      UUID REFERENCES clinics(id) ON DELETE CASCADE,
  scan_type_code VARCHAR(50) REFERENCES scan_types(code),
  device_name    VARCHAR(200),                   -- e.g. 'Siemens Biograph Vision 600'
  device_year    INT,                            -- Manufacturing year
  price_gbp      DECIMAL(10,2),
  price_eur      DECIMAL(10,2),
  price_usd      DECIMAL(10,2),
  price_try      DECIMAL(10,2),
  price_aed      DECIMAL(10,2),
  uk_price_gbp   DECIMAL(10,2),                 -- UK equivalent for comparison
  is_available   BOOLEAN DEFAULT true,
  notes          TEXT,
  UNIQUE(clinic_id, scan_type_code)
);

-- =============================================================
-- SLOT MANAGEMENT
-- =============================================================

CREATE TABLE IF NOT EXISTS scan_slots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id       UUID REFERENCES clinics(id) ON DELETE CASCADE,
  scan_type_code  VARCHAR(50) REFERENCES scan_types(code),
  device_name     VARCHAR(200),
  slot_date       DATE NOT NULL,
  slot_time       TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  status          VARCHAR(20) DEFAULT 'available',
  -- available | reserved | confirmed | cancelled | blocked
  reserved_by     UUID REFERENCES users(id),    -- Patient who reserved
  reserved_until  TIMESTAMPTZ,                  -- 15-minute lock expires
  booking_id      UUID,                         -- Set when confirmed (FK added after bookings table)
  -- Override pricing (null = use clinic_scan_types price)
  price_gbp       DECIMAL(10,2),
  price_eur       DECIMAL(10,2),
  price_usd       DECIMAL(10,2),
  price_try       DECIMAL(10,2),
  price_aed       DECIMAL(10,2),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(clinic_id, scan_type_code, slot_date, slot_time)
);

CREATE INDEX IF NOT EXISTS idx_scan_slots_date ON scan_slots(slot_date);
CREATE INDEX IF NOT EXISTS idx_scan_slots_status ON scan_slots(status);
CREATE INDEX IF NOT EXISTS idx_scan_slots_clinic ON scan_slots(clinic_id);
CREATE INDEX IF NOT EXISTS idx_scan_slots_lookup ON scan_slots(clinic_id, scan_type_code, slot_date, status);

-- =============================================================
-- BOOKINGS
-- =============================================================

CREATE TABLE IF NOT EXISTS bookings (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference            VARCHAR(20) UNIQUE NOT NULL,  -- e.g. 'TD-2026-00123'
  patient_id           UUID REFERENCES users(id),
  clinic_id            UUID REFERENCES clinics(id),
  scan_slot_id         UUID REFERENCES scan_slots(id),
  scan_type_code       VARCHAR(50) REFERENCES scan_types(code),
  -- Booking details
  appointment_date     DATE NOT NULL,
  appointment_time     TIME NOT NULL,
  status               VARCHAR(30) DEFAULT 'pending',
  -- pending | confirmed | paid | in_progress | completed | cancelled | refunded
  -- Patient medical info (at time of booking)
  patient_first_name   VARCHAR(100),
  patient_last_name    VARCHAR(100),
  patient_dob          DATE,
  patient_phone        VARCHAR(30),
  patient_email        VARCHAR(255),
  patient_nationality  VARCHAR(5),
  medical_notes        TEXT,
  -- MRI safety / scan-specific
  has_metal_implants   BOOLEAN,
  is_claustrophobic    BOOLEAN,
  is_pregnant          BOOLEAN,
  weight_kg            DECIMAL(5,1),
  contrast_required    BOOLEAN DEFAULT false,
  -- Pricing & payment
  currency             VARCHAR(5) DEFAULT 'GBP',
  subtotal             DECIMAL(10,2),
  concierge_fee        DECIMAL(10,2) DEFAULT 0,
  platform_fee         DECIMAL(10,2),
  total_amount         DECIMAL(10,2),
  -- Payment
  payment_provider     VARCHAR(20),               -- 'stripe' | 'iyzico'
  stripe_session_id    TEXT,
  stripe_payment_intent_id TEXT,
  iyzico_payment_id    TEXT,
  payment_status       VARCHAR(20) DEFAULT 'unpaid',
  paid_at              TIMESTAMPTZ,
  -- GP referral (optional)
  gp_referred          BOOLEAN DEFAULT false,
  gp_name              VARCHAR(200),
  gp_letter_requested  BOOLEAN DEFAULT false,
  -- Admin
  admin_notes          TEXT,
  cancelled_reason     TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- Add FK from scan_slots back to bookings
ALTER TABLE scan_slots ADD CONSTRAINT fk_slot_booking
  FOREIGN KEY (booking_id) REFERENCES bookings(id) DEFERRABLE INITIALLY DEFERRED;

CREATE INDEX IF NOT EXISTS idx_bookings_patient ON bookings(patient_id);
CREATE INDEX IF NOT EXISTS idx_bookings_clinic ON bookings(clinic_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(reference);

-- Booking reference sequence
CREATE SEQUENCE IF NOT EXISTS booking_reference_seq START 1000;

CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reference := 'TD-' || EXTRACT(YEAR FROM now()) || '-' || LPAD(nextval('booking_reference_seq')::TEXT, 5, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_reference
  BEFORE INSERT ON bookings
  FOR EACH ROW
  WHEN (NEW.reference IS NULL OR NEW.reference = '')
  EXECUTE FUNCTION generate_booking_reference();

-- =============================================================
-- CONCIERGE
-- =============================================================

CREATE TABLE IF NOT EXISTS concierge_requests (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id           UUID REFERENCES bookings(id) ON DELETE CASCADE,
  patient_id           UUID REFERENCES users(id),
  -- Travel needs
  flight_needed        BOOLEAN DEFAULT false,
  departure_city       VARCHAR(100),
  departure_country    VARCHAR(5),
  departure_airport    VARCHAR(10),              -- IATA code: LHR, LGW
  return_date          DATE,
  -- Accommodation
  accommodation_needed BOOLEAN DEFAULT false,
  accommodation_nights INT DEFAULT 1,
  hotel_preference     VARCHAR(20) DEFAULT 'standard',  -- budget | standard | luxury
  -- Ground transport
  transfer_needed      BOOLEAN DEFAULT false,
  -- Translation
  translator_needed    BOOLEAN DEFAULT false,
  translator_language  VARCHAR(10),             -- 'ar', 'de', 'fr', 'ru'
  -- Status
  status               VARCHAR(20) DEFAULT 'pending',
  -- pending | in_progress | arranged | completed | cancelled
  concierge_agent_id   UUID REFERENCES users(id),  -- Staff handling this
  concierge_notes      TEXT,
  -- Pricing
  flight_cost_gbp      DECIMAL(10,2),
  hotel_cost_gbp       DECIMAL(10,2),
  transfer_cost_gbp    DECIMAL(10,2),
  translator_cost_gbp  DECIMAL(10,2),
  total_cost_gbp       DECIMAL(10,2),
  -- AI-generated plan
  ai_travel_plan       JSONB,
  special_requirements TEXT,
  created_at           TIMESTAMPTZ DEFAULT now(),
  updated_at           TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- SCAN REPORTS
-- =============================================================

CREATE TABLE IF NOT EXISTS scan_reports (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id          UUID REFERENCES bookings(id) ON DELETE CASCADE,
  patient_id          UUID REFERENCES users(id),
  clinic_id           UUID REFERENCES clinics(id),
  -- Files (Cloudflare R2)
  report_pdf_url      TEXT,                      -- R2 pre-signed URL
  dicom_url           TEXT,                      -- DICOM viewer URL
  report_r2_key       TEXT,                      -- R2 object key
  -- Metadata
  report_date         DATE,
  radiologist_name    VARCHAR(200),
  original_language   VARCHAR(10) DEFAULT 'tr',  -- 'tr' | 'en'
  -- Translation (DeepL)
  translation_status  VARCHAR(20) DEFAULT 'pending',
  -- pending | processing | completed | failed
  translated_pdf_url  TEXT,
  translated_r2_key   TEXT,
  translated_at       TIMESTAMPTZ,
  -- AI Summary (Claude)
  ai_summary_patient  TEXT,                      -- Layman-friendly summary
  ai_summary_gp       TEXT,                      -- GP-ready letter draft
  ai_key_findings     JSONB,                     -- [{finding, severity}]
  ai_followup_needed  BOOLEAN,
  ai_followup_urgency VARCHAR(20),               -- routine | soon | urgent
  ai_processed_at     TIMESTAMPTZ,
  -- Flags
  is_urgent           BOOLEAN DEFAULT false,
  is_shared_with_gp   BOOLEAN DEFAULT false,
  gp_shared_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- WHATSAPP
-- =============================================================

CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wa_phone_id      VARCHAR(50),                 -- Meta Phone Number ID
  patient_phone    VARCHAR(20) NOT NULL,
  patient_name     VARCHAR(200),
  booking_id       UUID REFERENCES bookings(id),
  patient_id       UUID REFERENCES users(id),
  locale           VARCHAR(5) DEFAULT 'en',
  status           VARCHAR(20) DEFAULT 'active',
  -- active | resolved | escalated | spam
  escalated_to     UUID REFERENCES users(id),   -- Admin/agent
  last_message_at  TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id  UUID REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  direction        VARCHAR(10) NOT NULL,         -- 'inbound' | 'outbound'
  message_type     VARCHAR(20) DEFAULT 'text',  -- text | template | document | image
  content          TEXT,
  template_name    VARCHAR(100),                -- For outbound templates
  wa_message_id    VARCHAR(100),               -- Meta message ID
  status           VARCHAR(20) DEFAULT 'sent', -- sent | delivered | read | failed
  sent_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wa_conv_phone ON whatsapp_conversations(patient_phone);
CREATE INDEX IF NOT EXISTS idx_wa_msg_conv ON whatsapp_messages(conversation_id);

-- =============================================================
-- GEO PRICING & CURRENCY
-- =============================================================

CREATE TABLE IF NOT EXISTS geo_pricing (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_type_code      VARCHAR(50) REFERENCES scan_types(code),
  country_code        VARCHAR(5) NOT NULL,
  currency            VARCHAR(5) NOT NULL,
  base_price          DECIMAL(10,2) NOT NULL,
  discount_percentage INT DEFAULT 0,
  is_active           BOOLEAN DEFAULT true,
  UNIQUE(scan_type_code, country_code)
);

CREATE TABLE IF NOT EXISTS exchange_rates (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency VARCHAR(5) NOT NULL,
  to_currency  VARCHAR(5) NOT NULL,
  rate         DECIMAL(12,6) NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(from_currency, to_currency)
);

-- =============================================================
-- PARTNER LEADS (Clinic Outreach CRM)
-- =============================================================

CREATE TABLE IF NOT EXISTS partner_leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_name      VARCHAR(200) NOT NULL,
  contact_name     VARCHAR(200),
  contact_email    VARCHAR(255),
  contact_phone    VARCHAR(30),
  country          VARCHAR(5),
  city             VARCHAR(100),
  scan_types       TEXT[],                      -- ['pet_ct', 'mri_3t']
  status           VARCHAR(30) DEFAULT 'new',
  -- new | contacted | interested | demo_scheduled | onboarding | active | rejected
  source           VARCHAR(50),                 -- 'manual' | 'referral' | 'outbound'
  notes            TEXT,
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT now(),
  updated_at       TIMESTAMPTZ DEFAULT now()
);

-- =============================================================
-- BLOG
-- =============================================================

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

-- =============================================================
-- AUDIT LOG
-- =============================================================

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

-- =============================================================
-- INDEXES
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_user ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_clinics_country ON clinics(country);
CREATE INDEX IF NOT EXISTS idx_clinics_city ON clinics(city);
CREATE INDEX IF NOT EXISTS idx_clinics_active ON clinics(is_active);
CREATE INDEX IF NOT EXISTS idx_clinic_scan_types_clinic ON clinic_scan_types(clinic_id);
CREATE INDEX IF NOT EXISTS idx_concierge_booking ON concierge_requests(booking_id);
CREATE INDEX IF NOT EXISTS idx_reports_booking ON scan_reports(booking_id);
CREATE INDEX IF NOT EXISTS idx_reports_patient ON scan_reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published, published_at);
