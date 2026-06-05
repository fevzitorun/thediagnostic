-- ============================================================
-- THE DIAGNOSTIC — VERCEL POSTGRES SCHEMA
-- Run this in Vercel Dashboard → Storage → your DB → Query tab
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- ─── ENUMS ───────────────────────────────────────────────────────────────────

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM (
    'pending', 'confirmed', 'completed', 'cancelled', 'callback_requested'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE clinic_status AS ENUM (
    'active', 'pending', 'inactive', 'suspended'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'patient', 'gp', 'clinic', 'clinic_admin', 'clinic_staff',
    'super_admin', 'admin', 'finance', 'sales', 'support', 'marketing'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE scan_category AS ENUM (
    'mri', 'ct', 'ultrasound', 'xray', 'baby_scan', 'other'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ─── USERS ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS users (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT NOT NULL UNIQUE,
  name             TEXT,
  image            TEXT,
  password_hash    TEXT,
  email_verified   TIMESTAMPTZ,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- ─── PROFILES ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS profiles (
  id                 UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  role               user_role NOT NULL DEFAULT 'patient',
  first_name         TEXT,
  last_name          TEXT,
  phone              TEXT,
  clinic_id          UUID,
  marketing_consent  BOOLEAN DEFAULT false,
  nhs_number         TEXT,
  date_of_birth      DATE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── CLINICS ─────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS clinics (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform         TEXT NOT NULL DEFAULT 'scanbook',
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  tier             TEXT DEFAULT 'standard',
  description      TEXT,
  address_line1    TEXT,
  address_city     TEXT,
  address_postcode TEXT,
  address_country  TEXT DEFAULT 'GB',
  latitude         DOUBLE PRECISION,
  longitude        DOUBLE PRECISION,
  phone            TEXT,
  email            TEXT,
  website          TEXT,
  accreditations   TEXT[] DEFAULT '{}',
  languages        TEXT[] DEFAULT '{en}',
  currency         TEXT DEFAULT 'GBP',
  commission_rate  NUMERIC(5,2) DEFAULT 12.00,
  stripe_account_id TEXT,
  cqc_rating       TEXT,
  capabilities     JSONB DEFAULT '[]',
  metadata         JSONB DEFAULT '{}',
  status           clinic_status NOT NULL DEFAULT 'pending',
  is_active        BOOLEAN DEFAULT true,
  is_verified      BOOLEAN DEFAULT false,
  rating           NUMERIC(3,2),
  review_count     INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_clinics_slug   ON clinics(slug);
CREATE INDEX IF NOT EXISTS idx_clinics_city   ON clinics(address_city);
CREATE INDEX IF NOT EXISTS idx_clinics_status ON clinics(status);

-- ─── SCAN TYPES / PACKAGES ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS scan_types (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id        UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  platform         TEXT NOT NULL DEFAULT 'scanbook',
  category         scan_category NOT NULL DEFAULT 'mri',
  name             TEXT NOT NULL,
  description      TEXT,
  duration_minutes INTEGER DEFAULT 45,
  price_gbp        NUMERIC(10,2) NOT NULL,
  body_parts       TEXT[] DEFAULT '{}',
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- packages is an alias view for scan_types (some pages use both names)
CREATE TABLE IF NOT EXISTS packages (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id        UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  scan_type        TEXT,
  price            NUMERIC(10,2) NOT NULL,
  duration_minutes INTEGER DEFAULT 45,
  description      TEXT,
  body_parts       TEXT[] DEFAULT '{}',
  is_active        BOOLEAN DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_packages_clinic ON packages(clinic_id);

-- ─── SLOTS ───────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS slots (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clinic_id     UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
  scan_type_id  UUID REFERENCES scan_types(id) ON DELETE SET NULL,
  starts_at     TIMESTAMPTZ NOT NULL,
  ends_at       TIMESTAMPTZ NOT NULL,
  room          TEXT,
  is_available  BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_slots_clinic    ON slots(clinic_id);
CREATE INDEX IF NOT EXISTS idx_slots_starts_at ON slots(starts_at);

-- ─── BOOKINGS ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bookings (
  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref            TEXT NOT NULL UNIQUE,
  status                 booking_status NOT NULL DEFAULT 'pending',
  platform               TEXT NOT NULL DEFAULT 'scanbook',
  clinic_id              UUID REFERENCES clinics(id),
  clinic_slug            TEXT,
  clinic_name            TEXT,
  package_name           TEXT,
  body_part              TEXT,
  side                   TEXT,
  appointment_date       TEXT,
  appointment_time       TEXT,
  patient_id             UUID REFERENCES users(id),
  patient_name           TEXT,
  patient_email          TEXT,
  patient_phone          TEXT,
  patient_dob            TEXT,
  nhs_number             TEXT,
  scan_reason            TEXT,
  add_consultation       BOOLEAN DEFAULT false,
  amount_paid            NUMERIC(10,2),
  currency               TEXT DEFAULT 'gbp',
  stripe_session_id      TEXT UNIQUE,
  stripe_payment_intent  TEXT,
  gp_id                  UUID,
  referral_code          TEXT,
  report_url             TEXT,
  report_uploaded_at     TIMESTAMPTZ,
  gp_notes               TEXT,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bookings_patient_email  ON bookings(patient_email);
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_session ON bookings(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ref            ON bookings(booking_ref);
CREATE INDEX IF NOT EXISTS idx_bookings_status         ON bookings(status);

-- ─── GPS ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gps (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID REFERENCES users(id) ON DELETE CASCADE,
  name                 TEXT,
  practice_name        TEXT,
  practice_address     TEXT,
  gmc_number           TEXT UNIQUE,
  phone                TEXT,
  email                TEXT,
  referral_code        TEXT UNIQUE DEFAULT upper(substring(gen_random_uuid()::text, 1, 8)),
  commission_rate      NUMERIC(5,2) DEFAULT 5.00,
  status               TEXT DEFAULT 'pending',
  total_earned         NUMERIC(10,2) DEFAULT 0,
  pending_payout       NUMERIC(10,2) DEFAULT 0,
  bank_account_last4   TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── GP EARNINGS ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gp_earnings (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gp_id          UUID NOT NULL REFERENCES gps(id) ON DELETE CASCADE,
  amount         NUMERIC(10,2) NOT NULL,
  period_start   DATE,
  period_end     DATE,
  status         TEXT DEFAULT 'pending',
  paid_at        TIMESTAMPTZ,
  booking_count  INTEGER DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gp_earnings_gp ON gp_earnings(gp_id);

-- ─── PARTNER LEADS ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS partner_leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name       TEXT,
  last_name        TEXT,
  job_title        TEXT,
  centre_name      TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  website          TEXT,
  cqc_id           TEXT,
  region           TEXT,
  weekly_slots     TEXT,
  notes            TEXT,
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new','contacted','meeting_booked','contract_sent','converted','rejected','opted_out')),
  source           TEXT DEFAULT 'website_form',
  internal_notes   TEXT,
  last_contact_at  TIMESTAMPTZ,
  next_follow_up   DATE,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_leads_status ON partner_leads(status);
CREATE INDEX IF NOT EXISTS idx_partner_leads_email  ON partner_leads(email);

-- ─── MESSAGES ────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS messages (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject      TEXT,
  body         TEXT,
  from_name    TEXT,
  from_email   TEXT,
  clinic_name  TEXT,
  booking_ref  TEXT,
  read_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
