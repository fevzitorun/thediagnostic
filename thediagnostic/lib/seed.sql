-- =============================================================
-- thediagnostic — Seed Data
-- Test clinics: HSM Radyoloji + Acıbadem
-- =============================================================

-- Scan Types
INSERT INTO scan_types (code, name_en, name_tr, name_ar, category, description_en, description_tr, duration_minutes, icon, sort_order) VALUES
('pet_ct', 'PET-CT Scan', 'PET-BT Taraması', 'فحص PET-CT', 'nuclear',
  'Positron Emission Tomography combined with CT — detects cancer, heart disease and neurological disorders at cellular level.',
  'Pozitron Emisyon Tomografisi ve BT kombinasyonu — hücresel düzeyde kanser, kalp hastalığı ve nörolojik bozuklukları tespit eder.',
  60, '🔬', 1),
('mri_3t', 'MRI 3T', '3T MRI', 'الرنين المغناطيسي 3T', 'mri',
  'High-field 3 Tesla MRI — superior soft tissue contrast for brain, spine, joint and abdominal imaging.',
  'Yüksek alanlı 3 Tesla MRI — beyin, omurga, eklem ve karın görüntülemesi için üstün yumuşak doku kontrastı.',
  45, '🧲', 2),
('gamma_knife', 'GammaKnife', 'GammaKnife', 'سكين جاما', 'interventional',
  'Stereotactic radiosurgery for brain tumours and vascular malformations — non-invasive, no anaesthesia required.',
  'Beyin tümörleri ve vasküler malformasyonlar için stereotaktik radyocerrahi — non-invaziv, anestezi gerektirmez.',
  180, '⚡', 3),
('spect_ct', 'SPECT-CT', 'SPECT-BT', 'SPECT-CT', 'nuclear',
  'Single Photon Emission CT — bone, thyroid, cardiac and renal perfusion studies.',
  'Tek Foton Emisyon BT — kemik, tiroid, kardiyak ve renal perfüzyon çalışmaları.',
  90, '💫', 4),
('pet_mri', 'PET-MRI', 'PET-MRI', 'PET-MRI', 'nuclear',
  'Simultaneous PET and MRI acquisition — superior soft tissue characterisation with metabolic information.',
  'Eşzamanlı PET ve MRI — metabolik bilgiyle üstün yumuşak doku karakterizasyonu.',
  90, '🔮', 5),
('mri_whole_body', 'Whole Body MRI', 'Tüm Vücut MRI', 'الرنين المغناطيسي للجسم كله', 'mri',
  'Complete body screening without radiation — ideal for cancer staging and health check.',
  'Radyasyon olmadan tam vücut taraması — kanser evrelemesi ve sağlık kontrolü için ideal.',
  90, '🫁', 6),
('ct_angio', 'CT Angiography', 'BT Anjiyografi', 'تصوير الأوعية بالأشعة المقطعية', 'ct',
  'Non-invasive visualisation of blood vessels — coronary, pulmonary and carotid arteries.',
  'Kan damarlarının non-invaziv görüntülenmesi — koroner, pulmoner ve karotis arterler.',
  30, '🫀', 7)
ON CONFLICT (code) DO NOTHING;

-- =============================================================
-- CLINIC 1: HSM Radyoloji
-- =============================================================

INSERT INTO clinics (
  id, slug, name, short_name, country, city, address,
  latitude, longitude, phone, email, website,
  logo_url, cover_image_url,
  jci_accredited, iso_certified, other_accreditations,
  partner_since, commission_pct, is_active, is_featured,
  rating, review_count
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'hsm-radyoloji-istanbul',
  'HSM Radyoloji',
  'HSM Radyoloji',
  'TR', 'Istanbul',
  'Nişantaşı Mah. Teşvikiye Cad. No:15, Şişli, İstanbul',
  41.0485, 29.0022,
  '+90 212 000 0000',
  'info@hsmradyoloji.com',
  'https://hsmradyoloji.com',
  NULL, NULL,
  false, true, ARRAY['TSE', 'ISO 9001:2015'],
  '2026-05-01', 12.00, true, true,
  4.9, 0
) ON CONFLICT (slug) DO NOTHING;

-- HSM Translations
INSERT INTO clinic_translations (clinic_id, locale, name, description, short_description, how_to_reach) VALUES
('11111111-1111-1111-1111-111111111111', 'en',
  'HSM Radyoloji',
  'HSM Radyoloji is led by Prof. Dr. Mustafa ÖZATEŞ, one of Turkey''s foremost radiologists. Operating two state-of-the-art clinics in Istanbul, HSM specialises in advanced diagnostic imaging including PET-CT, 3T MRI, and interventional radiology. All reports are issued by subspecialist radiologists and available in English within 24 hours.',
  'Expert diagnostic imaging in Istanbul. Led by Prof. Dr. Mustafa ÖZATEŞ.',
  'Located in Nişantaşı, central Istanbul. 15 minutes from Taksim by taxi. Metro: Osmanbey station (M2 line).'),
('11111111-1111-1111-1111-111111111111', 'tr',
  'HSM Radyoloji',
  'HSM Radyoloji, Türkiye''nin önde gelen radyologlarından Prof. Dr. Mustafa ÖZATEŞ liderliğinde faaliyet göstermektedir. İstanbul''da iki son teknoloji klinik işleten HSM, PET-BT, 3T MRI ve girişimsel radyoloji dahil ileri tanı görüntülemesi konusunda uzmanlaşmıştır. Tüm raporlar alt uzmanlık radyologları tarafından düzenlenir ve 24 saat içinde hazır edilir.',
  'İstanbul''da uzman tanı görüntüleme. Prof. Dr. Mustafa ÖZATEŞ liderliğinde.',
  'Nişantaşı, merkezi İstanbul''da yer almaktadır. Taksim''den taksıyla 15 dakika. Metro: Osmanbey istasyonu (M2 hattı).'),
('11111111-1111-1111-1111-111111111111', 'ar',
  'HSM راديولوجي',
  'يقود HSM Radyoloji البروفيسور الدكتور مصطفى أوزاطاش، أحد أبرز أطباء الأشعة في تركيا. يدير عيادتين متطورتين في إسطنبول، ويتخصص HSM في التصوير التشخيصي المتقدم بما في ذلك PET-CT وMRI 3T والأشعة التدخلية.',
  'تصوير تشخيصي متقدم في إسطنبول. بقيادة البروفيسور الدكتور مصطفى أوزاطاش.',
  'تقع في نيشانتاشي، وسط إسطنبول. 15 دقيقة من تقسيم بالتاكسي.')
ON CONFLICT (clinic_id, locale) DO NOTHING;

-- HSM Scan Types & Pricing
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, device_year, price_gbp, price_eur, price_usd, price_try, price_aed, uk_price_gbp, is_available) VALUES
('11111111-1111-1111-1111-111111111111', 'pet_ct',        'Siemens Biograph mCT Flow',   2022, 1200.00, 1400.00, 1550.00, 38500.00, 5700.00, 4000.00, true),
('11111111-1111-1111-1111-111111111111', 'mri_3t',        'Siemens MAGNETOM Vida 3T',    2023,  320.00,  375.00,  415.00, 10200.00, 1520.00, 1200.00, true),
('11111111-1111-1111-1111-111111111111', 'mri_whole_body','Siemens MAGNETOM Vida 3T',    2023,  950.00, 1100.00, 1220.00, 30500.00, 4500.00, 3500.00, true),
('11111111-1111-1111-1111-111111111111', 'spect_ct',      'Siemens Symbia Intevo Bold',  2021,  650.00,  760.00,  840.00, 20900.00, 3100.00, 2200.00, true),
('11111111-1111-1111-1111-111111111111', 'ct_angio',      'Siemens SOMATOM Force',       2022,  280.00,  330.00,  365.00,  9000.00, 1330.00,  900.00, true)
ON CONFLICT (clinic_id, scan_type_code) DO NOTHING;

-- HSM Slots — Next 14 days (Mon-Sat, 08:00-16:00, every 90 min)
INSERT INTO scan_slots (clinic_id, scan_type_code, device_name, slot_date, slot_time, duration_minutes, status)
SELECT
  '11111111-1111-1111-1111-111111111111',
  sc.code,
  CASE sc.code
    WHEN 'pet_ct'         THEN 'Siemens Biograph mCT Flow'
    WHEN 'mri_3t'         THEN 'Siemens MAGNETOM Vida 3T'
    WHEN 'mri_whole_body' THEN 'Siemens MAGNETOM Vida 3T'
    WHEN 'spect_ct'       THEN 'Siemens Symbia Intevo Bold'
    WHEN 'ct_angio'       THEN 'Siemens SOMATOM Force'
  END,
  d.slot_date,
  t.slot_time,
  CASE sc.code
    WHEN 'pet_ct'         THEN 90
    WHEN 'mri_3t'         THEN 60
    WHEN 'mri_whole_body' THEN 90
    WHEN 'spect_ct'       THEN 90
    WHEN 'ct_angio'       THEN 45
  END,
  'available'
FROM
  generate_series(current_date + 3, current_date + 17, '1 day'::interval) AS d(slot_date)
  CROSS JOIN (VALUES ('08:00'::time), ('09:30'::time), ('11:00'::time), ('13:00'::time), ('14:30'::time), ('16:00'::time)) AS t(slot_time)
  CROSS JOIN (
    SELECT code FROM scan_types WHERE code IN ('pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio')
  ) AS sc
WHERE EXTRACT(DOW FROM d.slot_date) BETWEEN 1 AND 6  -- Monday to Saturday
ON CONFLICT (clinic_id, scan_type_code, slot_date, slot_time) DO NOTHING;

-- =============================================================
-- CLINIC 2: Acıbadem Maslak Hastanesi
-- =============================================================

INSERT INTO clinics (
  id, slug, name, short_name, country, city, address,
  latitude, longitude, phone, email, website,
  logo_url, cover_image_url,
  jci_accredited, iso_certified, other_accreditations,
  partner_since, commission_pct, is_active, is_featured,
  rating, review_count
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'acibadem-maslak-istanbul',
  'Acıbadem Maslak Hospital',
  'Acıbadem Maslak',
  'TR', 'Istanbul',
  'Büyükdere Cad. No:40, Maslak, Sarıyer, İstanbul 34457',
  41.1074, 29.0240,
  '+90 212 304 4444',
  'international@acibadem.com',
  'https://www.acibadem.com.tr/hastane/acibadem-maslak-hastanesi/',
  NULL, NULL,
  true, true, ARRAY['JCI', 'ISO 9001:2015', 'ISO 15189', 'HIMSS'],
  '2026-06-01', 15.00, true, true,
  4.8, 0
) ON CONFLICT (slug) DO NOTHING;

-- Acıbadem Translations
INSERT INTO clinic_translations (clinic_id, locale, name, description, short_description, how_to_reach) VALUES
('22222222-2222-2222-2222-222222222222', 'en',
  'Acıbadem Maslak Hospital',
  'Acıbadem Maslak Hospital is one of Turkey''s most advanced medical facilities and the first hospital in Turkey to receive JCI accreditation. Home to state-of-the-art nuclear medicine, PET-CT, PET-MRI, GammaKnife and robotic MRI suites. The International Patient Centre provides dedicated support for overseas visitors, including English-speaking coordinators and visa assistance.',
  'JCI-accredited hospital in Istanbul with PET-CT, GammaKnife and PET-MRI. Turkey''s gold standard.',
  'Located in Maslak business district, north Istanbul. 20 minutes from Taksim by taxi. Metro: Maslak station (M2 line).'),
('22222222-2222-2222-2222-222222222222', 'tr',
  'Acıbadem Maslak Hastanesi',
  'Acıbadem Maslak Hastanesi, Türkiye''nin en ileri tıp merkezlerinden biri ve Türkiye''de JCI akreditasyonu alan ilk hastanedir. Son teknoloji nükleer tıp, PET-BT, PET-MRI, GammaKnife ve robotik MRI suitelerine ev sahipliği yapmaktadır.',
  'İstanbul''da JCI akredite hastane — PET-BT, GammaKnife ve PET-MRI.',
  'Kuzey İstanbul, Maslak iş bölgesinde yer almaktadır. Taksim''den taksıyla 20 dakika. Metro: Maslak istasyonu (M2 hattı).'),
('22222222-2222-2222-2222-222222222222', 'ar',
  'مستشفى أجيبادم ماسلاك',
  'مستشفى أجيبادم ماسلاك هو أحد أكثر المرافق الطبية تطوراً في تركيا، وأول مستشفى في تركيا يحصل على اعتماد JCI. يضم أجنحة متطورة للطب النووي وفحص PET-CT وPET-MRI وسكين جاما والرنين المغناطيسي الروبوتي.',
  'مستشفى معتمد JCI في إسطنبول مع PET-CT وسكين جاما وPET-MRI.',
  'يقع في منطقة أعمال ماسلاك، شمال إسطنبول. 20 دقيقة من تقسيم بالتاكسي.')
ON CONFLICT (clinic_id, locale) DO NOTHING;

-- Acıbadem Scan Types & Pricing
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, device_year, price_gbp, price_eur, price_usd, price_try, price_aed, uk_price_gbp, is_available) VALUES
('22222222-2222-2222-2222-222222222222', 'pet_ct',        'GE Discovery MI PET/CT 4-ring', 2023, 1350.00, 1580.00, 1750.00,  43200.00,  6400.00,  4500.00, true),
('22222222-2222-2222-2222-222222222222', 'pet_mri',       'Siemens Biograph mMR',          2022, 1850.00, 2170.00, 2400.00,  59500.00,  8800.00,  5500.00, true),
('22222222-2222-2222-2222-222222222222', 'gamma_knife',   'Leksell Gamma Knife Icon',      2021, 6500.00, 7600.00, 8400.00, 208000.00, 30800.00, 20000.00, true),
('22222222-2222-2222-2222-222222222222', 'mri_3t',        'Siemens MAGNETOM Prisma 3T',    2023,  380.00,  445.00,  495.00,  12200.00,  1810.00,  1400.00, true),
('22222222-2222-2222-2222-222222222222', 'mri_whole_body','Siemens MAGNETOM Prisma 3T',    2023, 1100.00, 1290.00, 1430.00,  35300.00,  5200.00,  3800.00, true),
('22222222-2222-2222-2222-222222222222', 'spect_ct',      'GE Discovery NM/CT 670',        2022,  720.00,  840.00,  935.00,  23100.00,  3420.00,  2500.00, true),
('22222222-2222-2222-2222-222222222222', 'ct_angio',      'Siemens SOMATOM Force',         2023,  320.00,  375.00,  415.00,  10300.00,  1520.00,  1000.00, true)
ON CONFLICT (clinic_id, scan_type_code) DO NOTHING;

-- Acıbadem Slots — Next 14 days (7 days a week, 08:00-15:00)
INSERT INTO scan_slots (clinic_id, scan_type_code, device_name, slot_date, slot_time, duration_minutes, status)
SELECT
  '22222222-2222-2222-2222-222222222222',
  sc.code,
  CASE sc.code
    WHEN 'pet_ct'         THEN 'GE Discovery MI PET/CT 4-ring'
    WHEN 'pet_mri'        THEN 'Siemens Biograph mMR'
    WHEN 'gamma_knife'    THEN 'Leksell Gamma Knife Icon'
    WHEN 'mri_3t'         THEN 'Siemens MAGNETOM Prisma 3T'
    WHEN 'mri_whole_body' THEN 'Siemens MAGNETOM Prisma 3T'
    WHEN 'spect_ct'       THEN 'GE Discovery NM/CT 670'
    WHEN 'ct_angio'       THEN 'Siemens SOMATOM Force'
  END,
  d.slot_date,
  t.slot_time,
  CASE sc.code
    WHEN 'pet_ct'         THEN 90
    WHEN 'pet_mri'        THEN 90
    WHEN 'gamma_knife'    THEN 240
    WHEN 'mri_3t'         THEN 60
    WHEN 'mri_whole_body' THEN 90
    WHEN 'spect_ct'       THEN 90
    WHEN 'ct_angio'       THEN 45
  END,
  'available'
FROM
  generate_series(current_date + 2, current_date + 16, '1 day'::interval) AS d(slot_date)
  CROSS JOIN (VALUES ('08:00'::time), ('09:30'::time), ('11:00'::time), ('13:00'::time), ('15:00'::time)) AS t(slot_time)
  CROSS JOIN (
    SELECT code FROM scan_types WHERE code IN ('pet_ct', 'pet_mri', 'gamma_knife', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio')
  ) AS sc
ON CONFLICT (clinic_id, scan_type_code, slot_date, slot_time) DO NOTHING;

-- =============================================================
-- EXCHANGE RATES (initial)
-- =============================================================

INSERT INTO exchange_rates (from_currency, to_currency, rate) VALUES
('GBP', 'EUR', 1.17),
('GBP', 'USD', 1.29),
('GBP', 'TRY', 42.50),
('GBP', 'AED', 4.74),
('EUR', 'GBP', 0.85),
('USD', 'GBP', 0.78)
ON CONFLICT (from_currency, to_currency) DO UPDATE SET rate = EXCLUDED.rate, updated_at = now();

-- =============================================================
-- GEO PRICING (UK vs thediagnostic comparison)
-- =============================================================

INSERT INTO geo_pricing (scan_type_code, country_code, currency, base_price) VALUES
('pet_ct',        'GB', 'GBP', 1300.00),
('pet_ct',        'DE', 'EUR', 1500.00),
('pet_ct',        'AE', 'AED', 6500.00),
('mri_3t',        'GB', 'GBP',  320.00),
('mri_3t',        'DE', 'EUR',  390.00),
('mri_3t',        'AE', 'AED', 1600.00),
('gamma_knife',   'GB', 'GBP', 6500.00),
('mri_whole_body','GB', 'GBP', 1000.00),
('spect_ct',      'GB', 'GBP',  680.00),
('pet_mri',       'GB', 'GBP', 1850.00)
ON CONFLICT DO NOTHING;

-- =============================================================
-- BLOG POSTS (initial — EN)
-- =============================================================

INSERT INTO blog_posts (slug, locale, title, excerpt, author, tags, is_published, published_at) VALUES
('pet-ct-scan-guide-uk-patients', 'en',
  'The Complete Guide to PET-CT Scans for UK Patients',
  'Everything you need to know about PET-CT scans — what they detect, how to prepare, and why thousands of UK patients choose to have them in Turkey at a fraction of NHS waiting times.',
  'thediagnostic Editorial', ARRAY['PET-CT', 'Guide', 'UK Patients'], true, now()),
('nhs-waiting-list-alternative-turkey', 'en',
  'NHS Waiting Lists: How Medical Tourism to Turkey Offers a Faster Alternative',
  'With NHS diagnostic waiting times reaching 12–18 months, many UK patients are discovering that accredited Turkish hospitals can deliver the same world-class imaging in under a week.',
  'thediagnostic Editorial', ARRAY['NHS', 'Medical Tourism', 'Turkey'], true, now()),
('acibadem-vs-uk-private-hospitals', 'en',
  'Acıbadem vs UK Private Hospitals: Quality, Price & Waiting Times Compared',
  'JCI-accredited Acıbadem hospitals vs leading UK private hospitals — a detailed comparison of scan quality, radiologist expertise, report turnaround and total cost.',
  'thediagnostic Editorial', ARRAY['Acıbadem', 'Comparison', 'UK'], false, NULL),
('gamma-knife-treatment-turkey-guide', 'en',
  'GammaKnife Treatment in Turkey: What to Expect',
  'A complete patient guide to GammaKnife stereotactic radiosurgery in Istanbul — consultation process, procedure day, recovery, and follow-up.',
  'thediagnostic Editorial', ARRAY['GammaKnife', 'Turkey', 'Brain'], false, NULL)
ON CONFLICT (slug) DO NOTHING;

-- =============================================================
-- PARTNER LEADS (initial outreach targets)
-- =============================================================

INSERT INTO partner_leads (clinic_name, country, city, scan_types, status, source) VALUES
('Memorial Şişli Hospital',               'TR', 'Istanbul',   ARRAY['pet_ct', 'mri_3t'],              'new', 'manual'),
('Liv Hospital Vadistanbul',              'TR', 'Istanbul',   ARRAY['pet_ct', 'gamma_knife'],          'new', 'manual'),
('Medical Park Gebze',                    'TR', 'Istanbul',   ARRAY['pet_ct', 'mri_3t', 'spect_ct'],  'new', 'manual'),
('Ludwig-Maximilians-Universität Klinikum','DE', 'Munich',    ARRAY['pet_ct', 'pet_mri'],             'new', 'manual'),
('MedPolonia',                            'PL', 'Poznan',    ARRAY['pet_ct'],                         'new', 'manual'),
('Cleveland Clinic Abu Dhabi',            'AE', 'Abu Dhabi', ARRAY['pet_ct', 'mri_3t', 'gamma_knife'],'new', 'manual')
ON CONFLICT DO NOTHING;
