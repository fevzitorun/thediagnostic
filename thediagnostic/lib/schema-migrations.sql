-- ============================================================
-- SCANBOOK — SCHEMA MIGRATIONS
-- Run AFTER schema.sql in Supabase SQL Editor
-- These columns are required by the API routes (webhook, draft, confirm)
-- ============================================================

-- Extensions needed for location index (schema.sql uses ll_to_earth)
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;

-- Add callback_requested to booking_status enum
ALTER TYPE booking_status ADD VALUE IF NOT EXISTS 'callback_requested';

-- ─── BOOKINGS: Missing columns written by webhook & draft API ────────────────
-- The API routes write denormalised patient/clinic data for MVP simplicity.
-- Normalised relationships (clinic_id FK, patient_id FK) can be wired later.

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS clinic_slug       TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS clinic_name       TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS package_name      TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS body_part         TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS side              TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS appointment_date  TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS appointment_time  TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_name      TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_email     TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_phone     TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS patient_dob       TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS scan_reason       TEXT;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS add_consultation  BOOLEAN DEFAULT false;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_session_id TEXT UNIQUE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT;

-- Make required FK columns optional so MVP inserts don't fail
-- (patient_id, slot_id, clinic_id, scan_type_id are normally NOT NULL
--  but we don't always have them during the MVP self-pay flow)
ALTER TABLE bookings ALTER COLUMN platform SET DEFAULT 'scanbook';

-- Index on patient email for portal lookups (patient bookings by email)
CREATE INDEX IF NOT EXISTS idx_bookings_patient_email ON bookings(patient_email);
CREATE INDEX IF NOT EXISTS idx_bookings_stripe_session ON bookings(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);

-- ─── PARTNER LEADS ────────────────────────────────────────────────────────────
-- Stores clinic partnership applications from /partners page and CQC outreach replies.

CREATE TABLE IF NOT EXISTS partner_leads (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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
  source           TEXT DEFAULT 'website_form',  -- 'website_form' | 'outreach_agent' | 'referral'
  assigned_to      UUID REFERENCES auth.users(id),
  last_contact_at  TIMESTAMPTZ,
  next_follow_up   DATE,
  internal_notes   TEXT
);

CREATE INDEX IF NOT EXISTS idx_partner_leads_status ON partner_leads(status);
CREATE INDEX IF NOT EXISTS idx_partner_leads_email  ON partner_leads(email);
CREATE INDEX IF NOT EXISTS idx_partner_leads_region ON partner_leads(region);

-- RLS: Only admin roles can see partner leads
ALTER TABLE partner_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY partner_leads_admin ON partner_leads
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('super_admin', 'admin', 'sales')
    )
  );
