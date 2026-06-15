-- thediagnostic — TR Klinik & Tarama Türü Seed Verisi
-- Modül 9: lib/tr-clinics.data.ts içeriğinin tr_clinics / tr_scan_types / clinic_scan_types tablolarına aktarımı
-- Run AFTER lib/schema-vercel.sql + lib/schema-migrations.sql + lib/schema-tr-migrations.sql

-- ─── CLEAN UP ─────────────────────────────────────────────────────────────
DELETE FROM clinic_scan_types WHERE clinic_id IN (SELECT id FROM tr_clinics WHERE slug IN ('hsm-radyoloji-istanbul','acibadem-maslak-istanbul','acibadem-altunizade-istanbul','medicana-international-sisli-istanbul','medicana-beylikduzu-istanbul','koc-university-hospital-istanbul','florence-nightingale-sisli-istanbul','memorial-sisli-istanbul','memorial-atasehir-istanbul','liv-hospital-ulus-istanbul','medical-park-florya-istanbul','medical-park-goztepe-istanbul','anadolu-medical-center-kocaeli'));
DELETE FROM tr_clinics WHERE slug IN ('hsm-radyoloji-istanbul','acibadem-maslak-istanbul','acibadem-altunizade-istanbul','medicana-international-sisli-istanbul','medicana-beylikduzu-istanbul','koc-university-hospital-istanbul','florence-nightingale-sisli-istanbul','memorial-sisli-istanbul','memorial-atasehir-istanbul','liv-hospital-ulus-istanbul','medical-park-florya-istanbul','medical-park-goztepe-istanbul','anadolu-medical-center-kocaeli');
DELETE FROM tr_scan_types WHERE code IN ('pet_ct','mri_3t','mri_prisma','mri_whole_body','gamma_knife','spect_ct','pet_mri','ct_angio','ct_flash','ct_photon','da_vinci','mako_robot','truebeam','mr_linac','dsa_angiography','mammography_3d','eos_imaging','fibroscan');

-- ─── 1. TARAMA / CİHAZ KATALOĞU (18 kod) ────────────────────────────────────
INSERT INTO tr_scan_types (code, name_en, name_tr, name_ar, category, duration_minutes, icon, sort_order) VALUES
  ('pet_ct', 'PET-CT Scan', 'PET-BT', 'فحص PET-CT', 'nuclear', 90, '🔬', 0),
  ('mri_3t', 'MRI 3T', '3T MRI', 'الرنين المغناطيسي 3T', 'mri', 60, '🧲', 1),
  ('mri_prisma', 'MRI 3T Prisma', '3T Prisma MRI', 'الرنين المغناطيسي 3T بريزما', 'mri', 60, '🧲', 2),
  ('mri_whole_body', 'Whole Body MRI', 'Tüm Vücut MRI', 'رنين مغناطيسي للجسم كله', 'mri', 90, '🫁', 3),
  ('gamma_knife', 'GammaKnife', 'GammaKnife', 'سكين جاما', 'radiosurgery', 180, '⚡', 4),
  ('spect_ct', 'SPECT-CT', 'SPECT-BT', 'SPECT-CT', 'nuclear', 90, '💫', 5),
  ('pet_mri', 'PET-MRI', 'PET-MRI', 'PET-MRI', 'nuclear', 90, '🔮', 6),
  ('ct_angio', 'CT Angiography', 'BT Anjiyografi', 'تصوير الأوعية بالأشعة', 'ct', 45, '🫀', 7),
  ('ct_flash', 'Flash CT', 'Flash BT', 'فلاش CT', 'ct', 30, '⚡', 8),
  ('ct_photon', 'Photon Counting CT', 'Foton Sayıcı BT', 'CT عد الفوتون', 'ct', 35, '🔬', 9),
  ('da_vinci', 'Da Vinci Robotic Surgery', 'Da Vinci Robotik', 'الجراحة الروبوتية دا فينشي', 'robotic', 240, '🤖', 10),
  ('mako_robot', 'MAKO Robotic Surgery', 'MAKO Robotik Cerrahi', 'جراحة MAKO الروبوتية', 'robotic', 120, '🦿', 11),
  ('truebeam', 'TrueBeam Radiotherapy', 'TrueBeam Radyoterapi', 'علاج إشعاعي TrueBeam', 'radiotherapy', 30, '🎯', 12),
  ('mr_linac', 'MR-Linac Radiotherapy', 'MR-Linac Radyoterapi', 'علاج MR-Linac الإشعاعي', 'radiotherapy', 60, '🎯', 13),
  ('dsa_angiography', 'DSA Digital Angiography', 'DSA Dijital Anjiyo', 'تصوير الأوعية الرقمي DSA', 'interventional', 60, '🩸', 14),
  ('mammography_3d', '3D Tomosynthesis Mammography', '3D Mamografi', 'تصوير الثدي الشعاعي 3D', 'imaging', 20, '🩺', 15),
  ('eos_imaging', 'EOS Skeletal Imaging', 'EOS Görüntüleme', 'تصوير الهيكل العظمي EOS', 'imaging', 10, '🦴', 16),
  ('fibroscan', 'FibroScan (Liver)', 'FibroScan', 'فيبروسكان الكبد', 'imaging', 20, '🫀', 17);

-- ─── 2. TR KLİNİKLERİ (13 klinik / 9 grup) ─────────────────────────────────
-- HSM Radyoloji (HSM)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('11111111-1111-1111-1111-111111111111', 'hsm-radyoloji-istanbul', 'HSM Radyoloji', 'HSM Radyoloji', 'TR', 'Istanbul', 'Nişantaşı, Şişli, İstanbul', 41.0485, 29.0022, false, true, 'HSM', true, NULL, 2008, ARRAY['en','tr','ar','de'], ARRAY['Radiology','Nuclear Medicine','Interventional Radiology'], 'Expert Radiologist', 4.9, true, true, NULL);

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'HSM Radyoloji', 'Led by Prof. Dr. Mustafa ÖZATEŞ, one of Turkey''s foremost radiologists. Specialising in advanced diagnostic imaging — PET-CT, 3T MRI, SPECT-CT. Reports in English within 24 hours. Nişantaşı''s premier imaging centre.' FROM tr_clinics WHERE slug = 'hsm-radyoloji-istanbul';

-- Acıbadem Maslak Hospital (Acıbadem)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('22222222-2222-2222-2222-222222222222', 'acibadem-maslak-istanbul', 'Acıbadem Maslak Hospital', 'Acıbadem Maslak', 'TR', 'Istanbul', 'Büyükdere Cad. No:40, Maslak, İstanbul', 41.1074, 29.024, true, true, 'Acıbadem', true, 231, 2010, ARRAY['en','tr','ar','ru','de','fr'], ARRAY['Oncology','Neurosurgery','Cardiology','Nuclear Medicine','Radiosurgery'], 'JCI Accredited', 4.8, true, true, 'https://www.acibadem.com');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Acıbadem Maslak Hospital', 'Turkey''s first JCI-accredited hospital group flagship. Home to the most advanced nuclear medicine suite in the region — PET-CT, PET-MRI, GammaKnife Esprit, and robotic 3T MRI. Dedicated International Patient Centre with 24/7 concierge.' FROM tr_clinics WHERE slug = 'acibadem-maslak-istanbul';

-- Acıbadem Altunizade Hospital (Acıbadem)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('22222222-2222-2222-2222-333333333333', 'acibadem-altunizade-istanbul', 'Acıbadem Altunizade Hospital', 'Acıbadem Altunizade', 'TR', 'Istanbul', 'Çamlık Sok. No:20, Altunizade, Üsküdar, İstanbul', 41.0231, 29.0531, true, true, 'Acıbadem', true, 189, 2008, ARRAY['en','tr','ar','ru'], ARRAY['Orthopaedics','Neurology','Oncology','Cardiology'], 'JCI Accredited', 4.8, true, false, 'https://www.acibadem.com');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Acıbadem Altunizade Hospital', 'JCI-accredited Acıbadem Group hospital on the Asian side of Istanbul. Highly regarded for orthopaedic surgery, neurology, and comprehensive diagnostic imaging. Featuring 3T MRI, PET-CT, and advanced interventional radiology.' FROM tr_clinics WHERE slug = 'acibadem-altunizade-istanbul';

-- Medicana International Istanbul (Medicana)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('33333333-3333-3333-3333-111111111111', 'medicana-international-sisli-istanbul', 'Medicana International Istanbul', 'Medicana Şişli', 'TR', 'Istanbul', 'Büyükdere Cad. No:171, Şişli, İstanbul', 41.0802, 29.0108, true, true, 'Medicana', true, 280, 1992, ARRAY['en','tr','ar','ru','az','de'], ARRAY['Oncology','Haematology','Bone Marrow Transplant','Cardiology','Neurology'], 'Bone Marrow Transplant Centre', 4.7, true, true, 'https://www.medicana.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Medicana International Istanbul', 'Turkey''s leading bone marrow and stem cell transplant centre. JCI-accredited with a dedicated International Patient Centre. Comprehensive oncology suite including PET-CT, radiotherapy (IMRT, IGRT), and haematology. Over 30 years serving international patients.' FROM tr_clinics WHERE slug = 'medicana-international-sisli-istanbul';

-- Medicana Beylikdüzü Hospital (Medicana)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('33333333-3333-3333-3333-222222222222', 'medicana-beylikduzu-istanbul', 'Medicana Beylikdüzü Hospital', 'Medicana Beylikdüzü', 'TR', 'Istanbul', 'Beylikdüzü, İstanbul (near Istanbul Airport)', 41.0023, 28.6511, false, true, 'Medicana', false, 150, 2014, ARRAY['en','tr','ar'], ARRAY['General Surgery','Orthopaedics','Cardiology','IVF'], NULL, 4.6, true, false, 'https://www.medicana.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Medicana Beylikdüzü Hospital', 'Modern Medicana Group hospital near Istanbul Airport. Ideal for patients who prefer minimal transfer time. Full diagnostic suite including 3T MRI and CT. Excellent transport links.' FROM tr_clinics WHERE slug = 'medicana-beylikduzu-istanbul';

-- Koç University Hospital (Koç)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('44444444-4444-4444-4444-111111111111', 'koc-university-hospital-istanbul', 'Koç University Hospital', 'Koç Üniversitesi', 'TR', 'Istanbul', 'Davutpaşa Cad. No:4, Topkapı, İstanbul', 41.0207, 28.9249, true, true, 'Koç', true, 430, 2014, ARRAY['en','tr','ar','de','fr','es'], ARRAY['Organ Transplant','Oncology','Cardiovascular Surgery','Neurology','Haematology'], 'Academic Medical Centre', 4.9, true, true, 'https://hastane.ku.edu.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Koç University Hospital', 'Turkey''s most prestigious academic medical centre, affiliated with VKV American Hospital. JCI-accredited with world-class faculty physicians trained at Harvard, Johns Hopkins, and Mayo Clinic. State-of-the-art 3T MRI, PET-CT, and robotic surgery. One of the top 3 hospitals in Turkey for complex diagnostics and surgery.' FROM tr_clinics WHERE slug = 'koc-university-hospital-istanbul';

-- Florence Nightingale Hospital (Florence Nightingale)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('55555555-5555-5555-5555-111111111111', 'florence-nightingale-sisli-istanbul', 'Florence Nightingale Hospital', 'Florence Nightingale', 'TR', 'Istanbul', 'Abide-i Hürriyet Cad. No:290, Şişli, İstanbul', 41.0619, 29.0057, true, true, 'Florence Nightingale', true, 310, 1986, ARRAY['en','tr','ar','ru','az'], ARRAY['Cardiology','Cardiovascular Surgery','Oncology','Neurosurgery','IVF'], 'Cardiology Centre of Excellence', 4.7, true, true, 'https://www.florence.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Florence Nightingale Hospital', 'Istanbul''s historic private hospital, JCI-accredited and renowned for cardiovascular surgery and oncology. One of Turkey''s largest catheterisation laboratories. Full imaging suite including 3T MRI, PET-CT, advanced angiography, and robotic surgery. Serving international patients since 1986.' FROM tr_clinics WHERE slug = 'florence-nightingale-sisli-istanbul';

-- Memorial Şişli Hospital (Memorial)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('66666666-6666-6666-6666-111111111111', 'memorial-sisli-istanbul', 'Memorial Şişli Hospital', 'Memorial Şişli', 'TR', 'Istanbul', 'Piyalepaşa Bulvarı, Şişli, İstanbul', 41.0523, 28.9883, true, true, 'Memorial', true, 240, 2000, ARRAY['en','tr','ar','ru','az','fr'], ARRAY['Oncology','Orthopaedics','Neurology','Organ Transplant','Aesthetics'], 'Oncology Centre', 4.7, true, true, 'https://www.memorial.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Memorial Şişli Hospital', 'JCI-accredited Memorial Group flagship hospital in Şişli, Istanbul. Internationally acclaimed for oncology, organ transplant, and orthopaedic surgery. Comprehensive nuclear medicine suite with PET-CT, MR-Linac radiotherapy, Da Vinci robotics, and MAKO orthopaedic robot. Dedicated International Patient Centre.' FROM tr_clinics WHERE slug = 'memorial-sisli-istanbul';

-- Memorial Ataşehir Hospital (Memorial)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('66666666-6666-6666-6666-222222222222', 'memorial-atasehir-istanbul', 'Memorial Ataşehir Hospital', 'Memorial Ataşehir', 'TR', 'Istanbul', 'Meriç Sok. No:7, Ataşehir, İstanbul', 40.9913, 29.1069, true, true, 'Memorial', false, 186, 2013, ARRAY['en','tr','ar','ru'], ARRAY['Oncology','IVF','Neurology','Cardiology'], NULL, 4.7, true, false, 'https://www.memorial.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Memorial Ataşehir Hospital', 'JCI-accredited Memorial Group hospital on Istanbul''s Asian side. Modern, purpose-built facility with comprehensive oncology and diagnostics. Features PET-CT, 3T MRI, and advanced radiotherapy.' FROM tr_clinics WHERE slug = 'memorial-atasehir-istanbul';

-- Liv Hospital Ulus (Liv)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('77777777-7777-7777-7777-111111111111', 'liv-hospital-ulus-istanbul', 'Liv Hospital Ulus', 'Liv Hospital', 'TR', 'Istanbul', 'Çırağan Cad. No:7, Beşiktaş/Ulus, İstanbul', 41.07, 29.035, true, true, 'Liv', true, 210, 2015, ARRAY['en','tr','ar','ru','de','fr'], ARRAY['Oncology','Robotic Surgery','Cardiology','Neurosurgery','Spine Surgery'], 'Luxury Medical', 4.8, true, true, 'https://www.livhospital.com');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Liv Hospital Ulus', 'Istanbul''s most luxurious JCI-accredited hospital, located in the prestigious Ulus neighbourhood with Bosphorus views. Partner with Johns Hopkins Medicine International. Renowned for cancer care, robotic surgery, and complex neurosurgery. Cutting-edge imaging including photon-counting CT, PET-CT, and 3T MRI.' FROM tr_clinics WHERE slug = 'liv-hospital-ulus-istanbul';

-- Medical Park Florya Hospital (Medical Park)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('88888888-8888-8888-8888-111111111111', 'medical-park-florya-istanbul', 'Medical Park Florya Hospital', 'Medical Park Florya', 'TR', 'Istanbul', 'Yeşilköy Mah., Florya, Bakırköy, İstanbul', 40.9786, 28.7901, false, true, 'Medical Park', false, 300, 2002, ARRAY['en','tr','ar','ru'], ARRAY['Oncology','Cardiology','Orthopaedics','Paediatrics','Neurology'], NULL, 4.6, true, false, 'https://www.medicalpark.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Medical Park Florya Hospital', 'Large Medical Park Group hospital near Istanbul Airport and Atatürk coastal road. Part of Turkey''s largest private hospital chain (50+ hospitals). Comprehensive diagnostic and surgical facilities. Ideal for patients arriving at Istanbul Airport (ISL). Full imaging suite with PET-CT, 3T MRI, and advanced radiotherapy.' FROM tr_clinics WHERE slug = 'medical-park-florya-istanbul';

-- Medical Park Göztepe Hospital (Medical Park)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('88888888-8888-8888-8888-222222222222', 'medical-park-goztepe-istanbul', 'Medical Park Göztepe Hospital', 'Medical Park Göztepe', 'TR', 'Istanbul', 'Eğitim Mah., Göztepe, Kadıköy, İstanbul', 40.9806, 29.0698, false, true, 'Medical Park', false, 260, 2005, ARRAY['en','tr','ar'], ARRAY['Orthopaedics','Cardiology','General Surgery','Neurology'], NULL, 4.6, true, false, 'https://www.medicalpark.com.tr');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Medical Park Göztepe Hospital', 'Medical Park Group hospital on the Asian side, serving Kadıköy and surroundings. Comprehensive diagnostics and surgical care. Good transport links from Sabiha Gökçen Airport. 3T MRI and advanced CT suite.' FROM tr_clinics WHERE slug = 'medical-park-goztepe-istanbul';

-- Anadolu Medical Center (Anadolu)
INSERT INTO tr_clinics (id, slug, name, short_name, country, city, address, latitude, longitude, jci_accredited, iso_certified, hospital_group, international_patient_centre, beds, founded_year, languages, specialties, highlight_badge, rating, is_active, is_featured, website)
VALUES ('99999999-9999-9999-9999-111111111111', 'anadolu-medical-center-kocaeli', 'Anadolu Medical Center', 'Anadolu Sağlık', 'TR', 'Kocaeli', 'Cumhuriyet Mah. 2255 Sokak No:3, Gebze, Kocaeli', 40.7988, 29.4266, true, true, 'Anadolu', true, 346, 2005, ARRAY['en','tr','ar','ru','de'], ARRAY['Oncology','Haematology','Bone Marrow Transplant','Cardiology','Robotic Surgery'], 'Johns Hopkins Affiliate', 4.9, true, true, 'https://www.anadolusaglik.org');

INSERT INTO clinic_translations (clinic_id, locale, name, description)
SELECT id, 'en', 'Anadolu Medical Center', 'Turkey''s only Johns Hopkins Medicine International affiliate hospital. JCI-accredited with the highest clinical standards in the country. Home to a world-class bone marrow transplant centre, proton therapy facility, and the most comprehensive oncology programme in Turkey. Located in Gebze, 45 minutes from Istanbul by car.' FROM tr_clinics WHERE slug = 'anadolu-medical-center-kocaeli';

-- ─── 3. KLİNİK - CİHAZ FİYATLANDIRMASI (featuredScans) ─────────────────────
-- HSM Radyoloji
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'Siemens Biograph mCT Flow', 1200, 4000),
  ('mri_3t', 'Siemens MAGNETOM Vida 3T', 320, 1200),
  ('spect_ct', 'Siemens Symbia Intevo Bold', 650, 2200)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'hsm-radyoloji-istanbul';

-- Acıbadem Maslak Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery MI PET/CT 4-ring', 1350, 4500),
  ('gamma_knife', 'Leksell Gamma Knife Esprit', 6500, 20000),
  ('pet_mri', 'Siemens Biograph mMR', 1850, 5500),
  ('mako_robot', 'Stryker MAKO', 4800, 14000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'acibadem-maslak-istanbul';

-- Acıbadem Altunizade Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'Siemens Biograph Vision 600', 1300, 4500),
  ('mri_3t', 'Siemens MAGNETOM Prisma 3T', 330, 1200),
  ('da_vinci', 'Da Vinci Xi', 5500, 16000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'acibadem-altunizade-istanbul';

-- Medicana International Istanbul
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery IQ PET/CT', 1250, 4000),
  ('mri_3t', 'Philips Ingenia 3T', 310, 1200),
  ('truebeam', 'Varian TrueBeam STx', 2800, 8000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'medicana-international-sisli-istanbul';

-- Medicana Beylikdüzü Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('mri_3t', 'Siemens MAGNETOM Altea 1.5T/3T', 295, 1200),
  ('pet_ct', 'Siemens Biograph mCT', 1220, 4000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'medicana-beylikduzu-istanbul';

-- Koç University Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'Siemens Biograph Vision Quadra', 1380, 4500),
  ('mri_prisma', 'Siemens MAGNETOM Prisma 3T', 380, 1500),
  ('da_vinci', 'Da Vinci Xi', 5800, 17000),
  ('gamma_knife', 'Leksell Gamma Knife Perfexion', 7000, 22000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'koc-university-hospital-istanbul';

-- Florence Nightingale Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery MI PET/CT', 1280, 4200),
  ('mri_3t', 'Philips Ingenia Ambition 3T', 315, 1200),
  ('dsa_angiography', 'Philips Azurion 7 B20', 480, 1600)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'florence-nightingale-sisli-istanbul';

-- Memorial Şişli Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'Siemens Biograph Vision 600', 1300, 4200),
  ('mr_linac', 'Elekta Unity MR-Linac', 3200, 9500),
  ('mako_robot', 'Stryker MAKO', 4900, 14000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'memorial-sisli-istanbul';

-- Memorial Ataşehir Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery MI PET/CT', 1280, 4200),
  ('mri_3t', 'Siemens MAGNETOM Vida 3T', 320, 1200)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'memorial-atasehir-istanbul';

-- Liv Hospital Ulus
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'Siemens Biograph Vision Quadra', 1400, 4500),
  ('ct_photon', 'Siemens NAEOTOM Alpha', 420, 1800),
  ('da_vinci', 'Da Vinci Xi', 5500, 16000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'liv-hospital-ulus-istanbul';

-- Medical Park Florya Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery IQ PET/CT', 1200, 4000),
  ('mri_3t', 'GE Signa Pioneer 3T', 290, 1200),
  ('da_vinci', 'Da Vinci Si', 5200, 15000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'medical-park-florya-istanbul';

-- Medical Park Göztepe Hospital
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('mri_3t', 'Philips Ingenia 3T', 285, 1200),
  ('pet_ct', 'Siemens Biograph mCT', 1200, 4000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'medical-park-goztepe-istanbul';

-- Anadolu Medical Center
INSERT INTO clinic_scan_types (clinic_id, scan_type_code, device_name, price_gbp, uk_price_gbp, is_available)
SELECT tr_clinics.id, t.code, t.device_name, t.price_gbp, t.uk_price_gbp, true
FROM tr_clinics, (VALUES
  ('pet_ct', 'GE Discovery MI DR PET/CT', 1380, 4800),
  ('mri_prisma', 'Siemens MAGNETOM Prisma 3T', 370, 1500),
  ('pet_mri', 'Siemens Biograph mMR', 1850, 5500),
  ('mr_linac', 'Elekta Unity MR-Linac', 3000, 9000)
) AS t(code, device_name, price_gbp, uk_price_gbp)
WHERE tr_clinics.slug = 'anadolu-medical-center-kocaeli';

