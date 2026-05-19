-- ScanBook — Test Clinic Seed Data
-- Run AFTER schema.sql + schema-migrations.sql
-- Sources: medicana.co.uk · motherscan.co.uk · unirad.co.uk

-- ─── CLEAN UP ─────────────────────────────────────────────────────────────────
DELETE FROM slots      WHERE clinic_id IN (SELECT id FROM clinics WHERE slug IN ('medicana-winchester','unirad-glasgow','motherscan-wimbledon','motherscan-islington'));
DELETE FROM scan_types WHERE clinic_id IN (SELECT id FROM clinics WHERE slug IN ('medicana-winchester','unirad-glasgow','motherscan-wimbledon','motherscan-islington'));
DELETE FROM clinics    WHERE slug IN ('medicana-winchester','unirad-glasgow','motherscan-wimbledon','motherscan-islington');

-- ─── 1. MEDICANA WINCHESTER ───────────────────────────────────────────────────
INSERT INTO clinics (platform, name, slug, tier, description, address_line1, address_city, address_postcode, address_country, latitude, longitude, phone, email, website, accreditations, languages, currency, commission_rate, is_active, is_verified, rating, review_count, metadata)
VALUES (
  'scanbook', 'Medicana Winchester', 'medicana-winchester', 'premium',
  'CQC-registered private diagnostic imaging centre. 3T MRI, CT, Ultrasound (Standard & Doppler), X-Ray and Standing CT. Reports in 24–48 hours. Self-referral accepted.',
  'Chilcomb Park, Chilcomb Lane', 'Winchester', 'SO21 1HU', 'GB',
  51.0482, -1.2897,
  '01962 587821', 'info@medicana.co.uk', 'https://medicana.co.uk',
  ARRAY['CQC'], ARRAY['en'], 'GBP',
  12.00, true, true, 4.9, 312,
  '{"scanner_tesla":"3T","report_hours":24,"insurers":["Bupa","AXA Health","Aviva","Vitality","WPA","Cigna"],"facilities":["3T MRI","CT Suite","Ultrasound & Doppler","Standing CT","Same-day appointments"]}'::jsonb
);

-- Medicana — MRI
INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('mri', 'MRI — 1 Body Part',        'Single area. 3T scanner. Radiologist report in 24h.',   45,   455),
  ('mri', 'MRI — 2 Body Parts',       '2 areas in one session.',                                75,   702),
  ('mri', 'MRI — 3 Body Parts',       '3 areas in one session.',                                90,   975),
  ('mri', 'MRI — 4 Body Parts',       '4 areas in one session.',                               120,  1190),
  ('mri', 'Whole Body MRI',           'Head-to-toe comprehensive MRI.',                        180,  1330),
  ('mri', 'Prostate MRI (mpMRI)',      'Multiparametric with contrast. Specialist report.',      60,  1080),
  ('mri', 'Prostate MRI (No Contrast)','Multiparametric without contrast.',                     60,   950),
  ('mri', 'Liver MRI',                'Specialist liver protocol.',                             60,  1080),
  ('mri', 'Arthrogram MRI (Joint)',   'Contrast arthrogram for joint assessment.',              90,  1030),
  ('mri', 'MRCP',                     'Pancreas, gallbladder & bile ducts.',                    45,   455),
  ('mri', 'MRI with Contrast — 1 Part', 'Contrast-enhanced MRI, 1 area.',                      60,   565),
  ('mri', 'MRI with Contrast — 2 Parts','Contrast-enhanced MRI, 2 areas.',                     90,   810),
  ('mri', 'MRI with Contrast — 3 Parts','Contrast-enhanced MRI, 3 areas.',                    120,  1080),
  ('mri', 'MRI with Contrast — 4 Parts','Contrast-enhanced MRI, 4 areas.',                    150,  1300)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'medicana-winchester';

-- Medicana — CT
INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('ct', 'CT Scan — 1 Area',             'Single area CT. Report in 24h.',          20,  525),
  ('ct', 'CT Scan — 2 Areas',            '2-area CT in one session.',               30,  740),
  ('ct', 'CT Scan — 3 Areas',            '3-area CT in one session.',               40,  920),
  ('ct', 'CT Scan — 4+ Areas',           '4+ area CT in one session.',              50, 1080),
  ('ct', 'CT with Contrast — 1 Area',    'Contrast-enhanced CT, 1 area.',           30,  635),
  ('ct', 'CT with Contrast — 2 Areas',   'Contrast-enhanced CT, 2 areas.',          40,  850),
  ('ct', 'CT with Contrast — 3 Areas',   'Contrast-enhanced CT, 3 areas.',          50, 1030),
  ('ct', 'CT with Contrast — 4+ Areas',  'Contrast-enhanced CT, 4+ areas.',         60, 1190),
  ('ct', 'Standing CT — Knee (Bilateral)','Weight-bearing bilateral knee CT.',      30,  740),
  ('ct', 'Standing CT — Foot & Ankle',   'Weight-bearing bilateral foot/ankle CT.', 30,  920),
  ('ct', 'Standing CT — Hips',           'Weight-bearing hip CT.',                  30,  740)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'medicana-winchester';

-- Medicana — Ultrasound
INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('ultrasound', 'Ultrasound — 1 Area',          'Standard ultrasound, 1 area.',   30, 380),
  ('ultrasound', 'Ultrasound — 2 Areas',         'Standard ultrasound, 2 areas.',  45, 535),
  ('ultrasound', 'Ultrasound — 3 Areas',         'Standard ultrasound, 3 areas.',  60, 705),
  ('ultrasound', 'Ultrasound — 4+ Areas',        'Standard ultrasound, 4+ areas.', 75, 865),
  ('ultrasound', 'Doppler Ultrasound — 1 Area',  'Vascular doppler, 1 area.',      30, 486),
  ('ultrasound', 'Doppler Ultrasound — 2 Areas', 'Vascular doppler, 2 areas.',     45, 648),
  ('ultrasound', 'Doppler Ultrasound — 3 Areas', 'Vascular doppler, 3 areas.',     60, 810)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'medicana-winchester';

-- Medicana — X-Ray
INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('xray', 'X-Ray — 1 View',   'Digital X-Ray, 1 view. Report in 24h.', 15, 107),
  ('xray', 'X-Ray — 2 Views',  '2-view digital X-Ray.',                  20, 130),
  ('xray', 'X-Ray — 3 Views',  '3-view digital X-Ray.',                  25, 163),
  ('xray', 'X-Ray — 4 Views',  '4-view digital X-Ray.',                  30, 195),
  ('xray', 'X-Ray — 5 Views',  '5-view digital X-Ray.',                  35, 220),
  ('xray', 'X-Ray — 6 Views',  '6-view digital X-Ray.',                  40, 250),
  ('xray', 'Leg Length X-Ray', 'Full leg length standing X-Ray.',        30, 270)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'medicana-winchester';


-- ─── 2. UNIRAD GLASGOW ────────────────────────────────────────────────────────
INSERT INTO clinics (platform, name, slug, tier, description, address_line1, address_city, address_postcode, address_country, latitude, longitude, phone, email, website, accreditations, languages, currency, commission_rate, is_active, is_verified, rating, review_count, metadata)
VALUES (
  'scanbook', 'Unirad Imaging', 'unirad-glasgow', 'standard',
  'Glasgow private MRI clinic. Hospital-grade scanner, UK consultant radiologists, next-day availability. Regulated by Healthcare Improvement Scotland.',
  '22 Loanbank Quadrant', 'Glasgow', 'G51 3HZ', 'GB',
  55.8601, -4.3138,
  '0141 846 9116', 'info@unirad.co.uk', 'https://unirad.co.uk',
  ARRAY['Healthcare Improvement Scotland'], ARRAY['en'], 'GBP',
  12.00, true, true, 4.9, 187,
  '{"report_hours":72,"insurers":["Bupa","AXA Health","Aviva"],"facilities":["Hospital-grade MRI","UK Consultant Radiologists","Same-week appointments"]}'::jsonb
);

INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('mri', 'MRI Scan',      'Any single body region. Consultant radiologist report within 72 hours.', 45,  290),
  ('mri', 'Full Body MRI', 'Comprehensive head-to-toe MRI screening.',                              180,  590),
  ('mri', 'GP Consultation','Pre- or post-scan GP consultation.',                                    15,   40)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'unirad-glasgow';


-- ─── 3A. MOTHERSCAN WIMBLEDON ─────────────────────────────────────────────────
INSERT INTO clinics (platform, name, slug, tier, description, address_line1, address_city, address_postcode, address_country, latitude, longitude, phone, email, website, accreditations, languages, currency, commission_rate, is_active, is_verified, rating, review_count, metadata)
VALUES (
  'scanbook', 'MotherScan Wimbledon', 'motherscan-wimbledon', 'standard',
  'Specialist pregnancy and baby scan clinic. HD 4D scans, same-day appointments, female sonographers available on request. CQC regulated.',
  '7 Approach Road', 'London', 'SW20 8BA', 'GB',
  51.4102, -0.2244,
  '0204 537 7811', 'wimbledon@motherscan.co.uk', 'https://motherscan.co.uk',
  ARRAY['CQC'], ARRAY['en'], 'GBP',
  12.00, true, true, 4.9, 840,
  '{"report_hours":0,"self_pay":true,"facilities":["HD 4D Ultrasound","Same-day appointments","Female sonographers","Printed photos + digital images","4D video recording"],"speciality":"baby_scan"}'::jsonb
);

INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT id, 'scanbook', category::scan_category, name, description, duration_minutes, price_gbp, true
FROM clinics, (VALUES
  ('baby_scan',  'Early Pregnancy Scan',          'Confirm heartbeat and dates. 6–14 weeks.',              20,  79),
  ('baby_scan',  'Hello Baby (2 consecutive)',     '2 scans 7–15 days apart. 6–14 weeks.',                 20, 119),
  ('baby_scan',  'Wellbeing Baby Scan',            'Baby wellbeing check. From 14 weeks.',                 20,  79),
  ('baby_scan',  'Gender Reveal Scan',             'Find out the sex. From 16 weeks.',                     20,  79),
  ('baby_scan',  'Wellbeing Check + 3D Imaging',  'Wellbeing + 3D images. From 16 weeks.',                30, 119),
  ('baby_scan',  'Supreme Package',                'Wellbeing + 3D prints + 4D video + gender. 20+ wks.', 60, 179),
  ('baby_scan',  'Throughout Pregnancy Package',   '4 scans from 6 weeks to delivery.',                    60, 299),
  ('baby_scan',  'Emergency Pregnancy Scan',       '24/7 emergency scan line.',                            20, 250),
  ('ultrasound', 'Pelvic Ultrasound Scan',         'Gynaecological assessment.',                           30, 149),
  ('ultrasound', 'IVF Stimulation Follow-up',      'Follicle tracking, 2 scans same cycle.',               30, 249),
  ('baby_scan',  'Early Gender Reveal Blood Test', 'Non-invasive blood test. From 6 weeks.',               15, 120),
  ('baby_scan',  'NIPT Standard + Wellbeing Scan', 'Non-invasive prenatal test. From 10 weeks.',          60, 399),
  ('baby_scan',  'NIPT Advance + Wellbeing Scan',  'Advanced NIPT. From 10 weeks.',                       60, 499),
  ('baby_scan',  'NIPT Absolute with Microdeletions','Comprehensive NIPT + microdeletion testing.',        60, 699)
) AS t(category, name, description, duration_minutes, price_gbp)
WHERE clinics.slug = 'motherscan-wimbledon';


-- ─── 3B. MOTHERSCAN ISLINGTON ─────────────────────────────────────────────────
INSERT INTO clinics (platform, name, slug, tier, description, address_line1, address_city, address_postcode, address_country, latitude, longitude, phone, email, website, accreditations, languages, currency, commission_rate, is_active, is_verified, rating, review_count, metadata)
VALUES (
  'scanbook', 'MotherScan Islington', 'motherscan-islington', 'standard',
  'Specialist pregnancy and baby scan clinic in Islington. HD 4D scans, same-day appointments. CQC regulated.',
  '117 Holloway Road', 'London', 'N7 8LT', 'GB',
  51.5521, -0.1169,
  '0204 631 6636', 'islington@motherscan.co.uk', 'https://motherscan.co.uk',
  ARRAY['CQC'], ARRAY['en'], 'GBP',
  12.00, true, true, 4.9, 840,
  '{"report_hours":0,"self_pay":true,"facilities":["HD 4D Ultrasound","Same-day appointments","Female sonographers","Printed photos + digital images","4D video recording"],"speciality":"baby_scan"}'::jsonb
);

-- Islington — copy scan types from Wimbledon
INSERT INTO scan_types (clinic_id, platform, category, name, description, duration_minutes, price_gbp, is_active)
SELECT
  (SELECT id FROM clinics WHERE slug = 'motherscan-islington'),
  platform, category, name, description, duration_minutes, price_gbp, is_active
FROM scan_types
WHERE clinic_id = (SELECT id FROM clinics WHERE slug = 'motherscan-wimbledon');


-- ─── TEST SLOTS (next 2 working days) ────────────────────────────────────────

-- Medicana MRI slots
INSERT INTO slots (clinic_id, scan_type_id, starts_at, ends_at, room, is_available)
SELECT
  (SELECT id FROM clinics WHERE slug = 'medicana-winchester'),
  st.id,
  slot_time.t,
  slot_time.t + INTERVAL '45 minutes',
  'MRI Suite A',
  true
FROM
  (SELECT id FROM scan_types WHERE clinic_id = (SELECT id FROM clinics WHERE slug = 'medicana-winchester') AND name = 'MRI — 1 Body Part') AS st,
  (VALUES
    (NOW() + INTERVAL '1 day' + INTERVAL '9 hours'),
    (NOW() + INTERVAL '1 day' + INTERVAL '11 hours'),
    (NOW() + INTERVAL '2 days' + INTERVAL '9 hours'),
    (NOW() + INTERVAL '2 days' + INTERVAL '14 hours')
  ) AS slot_time(t);

-- Unirad MRI slots
INSERT INTO slots (clinic_id, scan_type_id, starts_at, ends_at, room, is_available)
SELECT
  (SELECT id FROM clinics WHERE slug = 'unirad-glasgow'),
  st.id,
  slot_time.t,
  slot_time.t + INTERVAL '45 minutes',
  'MRI Room',
  true
FROM
  (SELECT id FROM scan_types WHERE clinic_id = (SELECT id FROM clinics WHERE slug = 'unirad-glasgow') AND name = 'MRI Scan') AS st,
  (VALUES
    (NOW() + INTERVAL '1 day' + INTERVAL '10 hours'),
    (NOW() + INTERVAL '2 days' + INTERVAL '10 hours')
  ) AS slot_time(t);

-- MotherScan Wimbledon slots
INSERT INTO slots (clinic_id, scan_type_id, starts_at, ends_at, room, is_available)
SELECT
  (SELECT id FROM clinics WHERE slug = 'motherscan-wimbledon'),
  st.id,
  slot_time.t,
  slot_time.t + INTERVAL '20 minutes',
  'Scan Room 1',
  true
FROM
  (SELECT id FROM scan_types WHERE clinic_id = (SELECT id FROM clinics WHERE slug = 'motherscan-wimbledon') AND name = 'Early Pregnancy Scan') AS st,
  (VALUES
    (NOW() + INTERVAL '4 hours'),
    (NOW() + INTERVAL '1 day' + INTERVAL '9 hours'),
    (NOW() + INTERVAL '1 day' + INTERVAL '11 hours')
  ) AS slot_time(t);
