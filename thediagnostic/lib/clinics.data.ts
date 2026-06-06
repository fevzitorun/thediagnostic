export interface ClinicBasic {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  country: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  jciAccredited: boolean;
  isoAccredited: boolean;
  rating: number;
  description: string;
  scanTypes: string[];
  featuredScans: {
    code: string;
    name: string;
    priceGbp: number;
    ukPriceGbp: number;
    deviceName: string;
  }[];
  images: string[];
  isFeatured: boolean;
  phoneIntl?: string;
  website?: string;
  internationalPatientCentre?: boolean;
  group?: string;
  beds?: number;
  foundedYear?: number;
  languages?: string[];
  specialties?: string[];
  highlightBadge?: string;
}

export const CLINICS: ClinicBasic[] = [

  // ── HSM Radyoloji ─────────────────────────────────────────────────────────
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    shortName: 'HSM Radyoloji',
    group: 'HSM',
    country: 'TR',
    city: 'Istanbul',
    address: 'Nişantaşı, Şişli, İstanbul',
    lat: 41.0485,
    lng: 29.0022,
    jciAccredited: false,
    isoAccredited: true,
    rating: 4.9,
    foundedYear: 2008,
    languages: ['en', 'tr', 'ar', 'de'],
    specialties: ['Radiology', 'Nuclear Medicine', 'Interventional Radiology'],
    highlightBadge: 'Expert Radiologist',
    description: 'Led by Prof. Dr. Mustafa ÖZATEŞ, one of Turkey\'s foremost radiologists. Specialising in advanced diagnostic imaging — PET-CT, 3T MRI, SPECT-CT. Reports in English within 24 hours. Nişantaşı\'s premier imaging centre.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio', 'ct_flash', 'mammography_3d'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1200, ukPriceGbp: 4000, deviceName: 'Siemens Biograph mCT Flow' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 320, ukPriceGbp: 1200, deviceName: 'Siemens MAGNETOM Vida 3T' },
      { code: 'spect_ct', name: 'SPECT-CT', priceGbp: 650, ukPriceGbp: 2200, deviceName: 'Siemens Symbia Intevo Bold' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
  },

  // ── Acıbadem Maslak ───────────────────────────────────────────────────────
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    shortName: 'Acıbadem Maslak',
    group: 'Acıbadem',
    country: 'TR',
    city: 'Istanbul',
    address: 'Büyükdere Cad. No:40, Maslak, İstanbul',
    lat: 41.1074,
    lng: 29.0240,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.8,
    beds: 231,
    foundedYear: 2010,
    languages: ['en', 'tr', 'ar', 'ru', 'de', 'fr'],
    specialties: ['Oncology', 'Neurosurgery', 'Cardiology', 'Nuclear Medicine', 'Radiosurgery'],
    highlightBadge: 'JCI Accredited',
    description: 'Turkey\'s first JCI-accredited hospital group flagship. Home to the most advanced nuclear medicine suite in the region — PET-CT, PET-MRI, GammaKnife Esprit, and robotic 3T MRI. Dedicated International Patient Centre with 24/7 concierge.',
    scanTypes: ['pet_ct', 'pet_mri', 'gamma_knife', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio', 'ct_flash', 'mr_linac', 'truebeam', 'da_vinci', 'mako_robot', 'mammography_3d', 'eos_imaging'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1350, ukPriceGbp: 4500, deviceName: 'GE Discovery MI PET/CT 4-ring' },
      { code: 'gamma_knife', name: 'GammaKnife', priceGbp: 6500, ukPriceGbp: 20000, deviceName: 'Leksell Gamma Knife Esprit' },
      { code: 'pet_mri', name: 'PET-MRI', priceGbp: 1850, ukPriceGbp: 5500, deviceName: 'Siemens Biograph mMR' },
      { code: 'mako_robot', name: 'MAKO Robotic Surgery', priceGbp: 4800, ukPriceGbp: 14000, deviceName: 'Stryker MAKO' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.acibadem.com',
  },

  // ── Acıbadem Altunizade ───────────────────────────────────────────────────
  {
    id: '22222222-2222-2222-2222-333333333333',
    slug: 'acibadem-altunizade-istanbul',
    name: 'Acıbadem Altunizade Hospital',
    shortName: 'Acıbadem Altunizade',
    group: 'Acıbadem',
    country: 'TR',
    city: 'Istanbul',
    address: 'Çamlık Sok. No:20, Altunizade, Üsküdar, İstanbul',
    lat: 41.0231,
    lng: 29.0531,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.8,
    beds: 189,
    foundedYear: 2008,
    languages: ['en', 'tr', 'ar', 'ru'],
    specialties: ['Orthopaedics', 'Neurology', 'Oncology', 'Cardiology'],
    highlightBadge: 'JCI Accredited',
    description: 'JCI-accredited Acıbadem Group hospital on the Asian side of Istanbul. Highly regarded for orthopaedic surgery, neurology, and comprehensive diagnostic imaging. Featuring 3T MRI, PET-CT, and advanced interventional radiology.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio', 'da_vinci', 'mako_robot', 'mammography_3d'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1300, ukPriceGbp: 4500, deviceName: 'Siemens Biograph Vision 600' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 330, ukPriceGbp: 1200, deviceName: 'Siemens MAGNETOM Prisma 3T' },
      { code: 'da_vinci', name: 'Da Vinci Robotic Surgery', priceGbp: 5500, ukPriceGbp: 16000, deviceName: 'Da Vinci Xi' },
    ],
    images: [],
    isFeatured: false,
    internationalPatientCentre: true,
    website: 'https://www.acibadem.com',
  },

  // ── Medicana International Şişli ─────────────────────────────────────────
  {
    id: '33333333-3333-3333-3333-111111111111',
    slug: 'medicana-international-sisli-istanbul',
    name: 'Medicana International Istanbul',
    shortName: 'Medicana Şişli',
    group: 'Medicana',
    country: 'TR',
    city: 'Istanbul',
    address: 'Büyükdere Cad. No:171, Şişli, İstanbul',
    lat: 41.0802,
    lng: 29.0108,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.7,
    beds: 280,
    foundedYear: 1992,
    languages: ['en', 'tr', 'ar', 'ru', 'az', 'de'],
    specialties: ['Oncology', 'Haematology', 'Bone Marrow Transplant', 'Cardiology', 'Neurology'],
    highlightBadge: 'Bone Marrow Transplant Centre',
    description: 'Turkey\'s leading bone marrow and stem cell transplant centre. JCI-accredited with a dedicated International Patient Centre. Comprehensive oncology suite including PET-CT, radiotherapy (IMRT, IGRT), and haematology. Over 30 years serving international patients.',
    scanTypes: ['pet_ct', 'mri_3t', 'spect_ct', 'ct_angio', 'ct_flash', 'truebeam', 'mammography_3d', 'fibroscan'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1250, ukPriceGbp: 4000, deviceName: 'GE Discovery IQ PET/CT' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 310, ukPriceGbp: 1200, deviceName: 'Philips Ingenia 3T' },
      { code: 'truebeam', name: 'TrueBeam Radiotherapy', priceGbp: 2800, ukPriceGbp: 8000, deviceName: 'Varian TrueBeam STx' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.medicana.com.tr',
  },

  // ── Medicana Beylikdüzü ───────────────────────────────────────────────────
  {
    id: '33333333-3333-3333-3333-222222222222',
    slug: 'medicana-beylikduzu-istanbul',
    name: 'Medicana Beylikdüzü Hospital',
    shortName: 'Medicana Beylikdüzü',
    group: 'Medicana',
    country: 'TR',
    city: 'Istanbul',
    address: 'Beylikdüzü, İstanbul (near Istanbul Airport)',
    lat: 41.0023,
    lng: 28.6511,
    jciAccredited: false,
    isoAccredited: true,
    rating: 4.6,
    beds: 150,
    foundedYear: 2014,
    languages: ['en', 'tr', 'ar'],
    specialties: ['General Surgery', 'Orthopaedics', 'Cardiology', 'IVF'],
    description: 'Modern Medicana Group hospital near Istanbul Airport. Ideal for patients who prefer minimal transfer time. Full diagnostic suite including 3T MRI and CT. Excellent transport links.',
    scanTypes: ['mri_3t', 'ct_angio', 'mammography_3d', 'pet_ct'],
    featuredScans: [
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 295, ukPriceGbp: 1200, deviceName: 'Siemens MAGNETOM Altea 1.5T/3T' },
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1220, ukPriceGbp: 4000, deviceName: 'Siemens Biograph mCT' },
    ],
    images: [],
    isFeatured: false,
    website: 'https://www.medicana.com.tr',
  },

  // ── Koç University Hospital ───────────────────────────────────────────────
  {
    id: '44444444-4444-4444-4444-111111111111',
    slug: 'koc-university-hospital-istanbul',
    name: 'Koç University Hospital',
    shortName: 'Koç Üniversitesi',
    group: 'Koç',
    country: 'TR',
    city: 'Istanbul',
    address: 'Davutpaşa Cad. No:4, Topkapı, İstanbul',
    lat: 41.0207,
    lng: 28.9249,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.9,
    beds: 430,
    foundedYear: 2014,
    languages: ['en', 'tr', 'ar', 'de', 'fr', 'es'],
    specialties: ['Organ Transplant', 'Oncology', 'Cardiovascular Surgery', 'Neurology', 'Haematology'],
    highlightBadge: 'Academic Medical Centre',
    description: 'Turkey\'s most prestigious academic medical centre, affiliated with VKV American Hospital. JCI-accredited with world-class faculty physicians trained at Harvard, Johns Hopkins, and Mayo Clinic. State-of-the-art 3T MRI, PET-CT, and robotic surgery. One of the top 3 hospitals in Turkey for complex diagnostics and surgery.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_prisma', 'mri_whole_body', 'spect_ct', 'pet_mri', 'ct_angio', 'ct_photon', 'da_vinci', 'gamma_knife', 'truebeam', 'eos_imaging', 'mammography_3d'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1380, ukPriceGbp: 4500, deviceName: 'Siemens Biograph Vision Quadra' },
      { code: 'mri_prisma', name: 'MRI 3T Prisma', priceGbp: 380, ukPriceGbp: 1500, deviceName: 'Siemens MAGNETOM Prisma 3T' },
      { code: 'da_vinci', name: 'Da Vinci Xi Robotic Surgery', priceGbp: 5800, ukPriceGbp: 17000, deviceName: 'Da Vinci Xi' },
      { code: 'gamma_knife', name: 'GammaKnife Radiosurgery', priceGbp: 7000, ukPriceGbp: 22000, deviceName: 'Leksell Gamma Knife Perfexion' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://hastane.ku.edu.tr',
  },

  // ── Florence Nightingale Şişli ────────────────────────────────────────────
  {
    id: '55555555-5555-5555-5555-111111111111',
    slug: 'florence-nightingale-sisli-istanbul',
    name: 'Florence Nightingale Hospital',
    shortName: 'Florence Nightingale',
    group: 'Florence Nightingale',
    country: 'TR',
    city: 'Istanbul',
    address: 'Abide-i Hürriyet Cad. No:290, Şişli, İstanbul',
    lat: 41.0619,
    lng: 29.0057,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.7,
    beds: 310,
    foundedYear: 1986,
    languages: ['en', 'tr', 'ar', 'ru', 'az'],
    specialties: ['Cardiology', 'Cardiovascular Surgery', 'Oncology', 'Neurosurgery', 'IVF'],
    highlightBadge: 'Cardiology Centre of Excellence',
    description: 'Istanbul\'s historic private hospital, JCI-accredited and renowned for cardiovascular surgery and oncology. One of Turkey\'s largest catheterisation laboratories. Full imaging suite including 3T MRI, PET-CT, advanced angiography, and robotic surgery. Serving international patients since 1986.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio', 'dsa_angiography', 'da_vinci', 'truebeam', 'mammography_3d'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1280, ukPriceGbp: 4200, deviceName: 'GE Discovery MI PET/CT' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 315, ukPriceGbp: 1200, deviceName: 'Philips Ingenia Ambition 3T' },
      { code: 'dsa_angiography', name: 'DSA Digital Angiography', priceGbp: 480, ukPriceGbp: 1600, deviceName: 'Philips Azurion 7 B20' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.florence.com.tr',
  },

  // ── Memorial Şişli ────────────────────────────────────────────────────────
  {
    id: '66666666-6666-6666-6666-111111111111',
    slug: 'memorial-sisli-istanbul',
    name: 'Memorial Şişli Hospital',
    shortName: 'Memorial Şişli',
    group: 'Memorial',
    country: 'TR',
    city: 'Istanbul',
    address: 'Piyalepaşa Bulvarı, Şişli, İstanbul',
    lat: 41.0523,
    lng: 28.9883,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.7,
    beds: 240,
    foundedYear: 2000,
    languages: ['en', 'tr', 'ar', 'ru', 'az', 'fr'],
    specialties: ['Oncology', 'Orthopaedics', 'Neurology', 'Organ Transplant', 'Aesthetics'],
    highlightBadge: 'Oncology Centre',
    description: 'JCI-accredited Memorial Group flagship hospital in Şişli, Istanbul. Internationally acclaimed for oncology, organ transplant, and orthopaedic surgery. Comprehensive nuclear medicine suite with PET-CT, MR-Linac radiotherapy, Da Vinci robotics, and MAKO orthopaedic robot. Dedicated International Patient Centre.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio', 'mr_linac', 'da_vinci', 'mako_robot', 'gamma_knife', 'mammography_3d', 'eos_imaging'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1300, ukPriceGbp: 4200, deviceName: 'Siemens Biograph Vision 600' },
      { code: 'mr_linac', name: 'MR-Linac Radiotherapy', priceGbp: 3200, ukPriceGbp: 9500, deviceName: 'Elekta Unity MR-Linac' },
      { code: 'mako_robot', name: 'MAKO Robotic Knee/Hip', priceGbp: 4900, ukPriceGbp: 14000, deviceName: 'Stryker MAKO' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.memorial.com.tr',
  },

  // ── Memorial Ataşehir ─────────────────────────────────────────────────────
  {
    id: '66666666-6666-6666-6666-222222222222',
    slug: 'memorial-atasehir-istanbul',
    name: 'Memorial Ataşehir Hospital',
    shortName: 'Memorial Ataşehir',
    group: 'Memorial',
    country: 'TR',
    city: 'Istanbul',
    address: 'Meriç Sok. No:7, Ataşehir, İstanbul',
    lat: 40.9913,
    lng: 29.1069,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.7,
    beds: 186,
    foundedYear: 2013,
    languages: ['en', 'tr', 'ar', 'ru'],
    specialties: ['Oncology', 'IVF', 'Neurology', 'Cardiology'],
    description: 'JCI-accredited Memorial Group hospital on Istanbul\'s Asian side. Modern, purpose-built facility with comprehensive oncology and diagnostics. Features PET-CT, 3T MRI, and advanced radiotherapy.',
    scanTypes: ['pet_ct', 'mri_3t', 'ct_angio', 'truebeam', 'mammography_3d'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1280, ukPriceGbp: 4200, deviceName: 'GE Discovery MI PET/CT' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 320, ukPriceGbp: 1200, deviceName: 'Siemens MAGNETOM Vida 3T' },
    ],
    images: [],
    isFeatured: false,
    website: 'https://www.memorial.com.tr',
  },

  // ── Liv Hospital Ulus ─────────────────────────────────────────────────────
  {
    id: '77777777-7777-7777-7777-111111111111',
    slug: 'liv-hospital-ulus-istanbul',
    name: 'Liv Hospital Ulus',
    shortName: 'Liv Hospital',
    group: 'Liv',
    country: 'TR',
    city: 'Istanbul',
    address: 'Çırağan Cad. No:7, Beşiktaş/Ulus, İstanbul',
    lat: 41.0700,
    lng: 29.0350,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.8,
    beds: 210,
    foundedYear: 2015,
    languages: ['en', 'tr', 'ar', 'ru', 'de', 'fr'],
    specialties: ['Oncology', 'Robotic Surgery', 'Cardiology', 'Neurosurgery', 'Spine Surgery'],
    highlightBadge: 'Luxury Medical',
    description: 'Istanbul\'s most luxurious JCI-accredited hospital, located in the prestigious Ulus neighbourhood with Bosphorus views. Partner with Johns Hopkins Medicine International. Renowned for cancer care, robotic surgery, and complex neurosurgery. Cutting-edge imaging including photon-counting CT, PET-CT, and 3T MRI.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'ct_angio', 'ct_photon', 'da_vinci', 'truebeam', 'gamma_knife', 'mammography_3d', 'eos_imaging', 'spect_ct'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1400, ukPriceGbp: 4500, deviceName: 'Siemens Biograph Vision Quadra' },
      { code: 'ct_photon', name: 'Photon Counting CT', priceGbp: 420, ukPriceGbp: 1800, deviceName: 'Siemens NAEOTOM Alpha' },
      { code: 'da_vinci', name: 'Da Vinci Robotic Surgery', priceGbp: 5500, ukPriceGbp: 16000, deviceName: 'Da Vinci Xi' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.livhospital.com',
  },

  // ── Medical Park Florya ───────────────────────────────────────────────────
  {
    id: '88888888-8888-8888-8888-111111111111',
    slug: 'medical-park-florya-istanbul',
    name: 'Medical Park Florya Hospital',
    shortName: 'Medical Park Florya',
    group: 'Medical Park',
    country: 'TR',
    city: 'Istanbul',
    address: 'Yeşilköy Mah., Florya, Bakırköy, İstanbul',
    lat: 40.9786,
    lng: 28.7901,
    jciAccredited: false,
    isoAccredited: true,
    rating: 4.6,
    beds: 300,
    foundedYear: 2002,
    languages: ['en', 'tr', 'ar', 'ru'],
    specialties: ['Oncology', 'Cardiology', 'Orthopaedics', 'Paediatrics', 'Neurology'],
    description: 'Large Medical Park Group hospital near Istanbul Airport and Atatürk coastal road. Part of Turkey\'s largest private hospital chain (50+ hospitals). Comprehensive diagnostic and surgical facilities. Ideal for patients arriving at Istanbul Airport (ISL). Full imaging suite with PET-CT, 3T MRI, and advanced radiotherapy.',
    scanTypes: ['pet_ct', 'mri_3t', 'ct_angio', 'spect_ct', 'truebeam', 'mammography_3d', 'da_vinci'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1200, ukPriceGbp: 4000, deviceName: 'GE Discovery IQ PET/CT' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 290, ukPriceGbp: 1200, deviceName: 'GE Signa Pioneer 3T' },
      { code: 'da_vinci', name: 'Da Vinci Robotic Surgery', priceGbp: 5200, ukPriceGbp: 15000, deviceName: 'Da Vinci Si' },
    ],
    images: [],
    isFeatured: false,
    website: 'https://www.medicalpark.com.tr',
  },

  // ── Medical Park Göztepe ──────────────────────────────────────────────────
  {
    id: '88888888-8888-8888-8888-222222222222',
    slug: 'medical-park-goztepe-istanbul',
    name: 'Medical Park Göztepe Hospital',
    shortName: 'Medical Park Göztepe',
    group: 'Medical Park',
    country: 'TR',
    city: 'Istanbul',
    address: 'Eğitim Mah., Göztepe, Kadıköy, İstanbul',
    lat: 40.9806,
    lng: 29.0698,
    jciAccredited: false,
    isoAccredited: true,
    rating: 4.6,
    beds: 260,
    foundedYear: 2005,
    languages: ['en', 'tr', 'ar'],
    specialties: ['Orthopaedics', 'Cardiology', 'General Surgery', 'Neurology'],
    description: 'Medical Park Group hospital on the Asian side, serving Kadıköy and surroundings. Comprehensive diagnostics and surgical care. Good transport links from Sabiha Gökçen Airport. 3T MRI and advanced CT suite.',
    scanTypes: ['mri_3t', 'ct_angio', 'pet_ct', 'mammography_3d', 'spect_ct'],
    featuredScans: [
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 285, ukPriceGbp: 1200, deviceName: 'Philips Ingenia 3T' },
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1200, ukPriceGbp: 4000, deviceName: 'Siemens Biograph mCT' },
    ],
    images: [],
    isFeatured: false,
    website: 'https://www.medicalpark.com.tr',
  },

  // ── Anadolu Medical Center ────────────────────────────────────────────────
  {
    id: '99999999-9999-9999-9999-111111111111',
    slug: 'anadolu-medical-center-kocaeli',
    name: 'Anadolu Medical Center',
    shortName: 'Anadolu Sağlık',
    group: 'Anadolu',
    country: 'TR',
    city: 'Kocaeli',
    address: 'Cumhuriyet Mah. 2255 Sokak No:3, Gebze, Kocaeli',
    lat: 40.7988,
    lng: 29.4266,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.9,
    beds: 346,
    foundedYear: 2005,
    languages: ['en', 'tr', 'ar', 'ru', 'de'],
    specialties: ['Oncology', 'Haematology', 'Bone Marrow Transplant', 'Cardiology', 'Robotic Surgery'],
    highlightBadge: 'Johns Hopkins Affiliate',
    description: 'Turkey\'s only Johns Hopkins Medicine International affiliate hospital. JCI-accredited with the highest clinical standards in the country. Home to a world-class bone marrow transplant centre, proton therapy facility, and the most comprehensive oncology programme in Turkey. Located in Gebze, 45 minutes from Istanbul by car.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_prisma', 'mri_whole_body', 'pet_mri', 'spect_ct', 'ct_angio', 'ct_photon', 'da_vinci', 'mako_robot', 'truebeam', 'gamma_knife', 'mr_linac', 'mammography_3d', 'eos_imaging', 'fibroscan'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1380, ukPriceGbp: 4800, deviceName: 'GE Discovery MI DR PET/CT' },
      { code: 'mri_prisma', name: 'MRI 3T Prisma', priceGbp: 370, ukPriceGbp: 1500, deviceName: 'Siemens MAGNETOM Prisma 3T' },
      { code: 'pet_mri', name: 'PET-MRI', priceGbp: 1850, ukPriceGbp: 5500, deviceName: 'Siemens Biograph mMR' },
      { code: 'mr_linac', name: 'MR-Linac Radiotherapy', priceGbp: 3000, ukPriceGbp: 9000, deviceName: 'Elekta Unity MR-Linac' },
    ],
    images: [],
    isFeatured: true,
    internationalPatientCentre: true,
    website: 'https://www.anadolusaglik.org',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export const SCAN_TYPES = [
  { code: 'pet_ct',          nameEn: 'PET-CT Scan',               nameTr: 'PET-BT',              nameAr: 'فحص PET-CT',                     icon: '🔬', durationMin: 90,  category: 'nuclear' },
  { code: 'mri_3t',          nameEn: 'MRI 3T',                    nameTr: '3T MRI',               nameAr: 'الرنين المغناطيسي 3T',            icon: '🧲', durationMin: 60,  category: 'mri' },
  { code: 'mri_prisma',      nameEn: 'MRI 3T Prisma',             nameTr: '3T Prisma MRI',        nameAr: 'الرنين المغناطيسي 3T بريزما',    icon: '🧲', durationMin: 60,  category: 'mri' },
  { code: 'mri_whole_body',  nameEn: 'Whole Body MRI',            nameTr: 'Tüm Vücut MRI',        nameAr: 'رنين مغناطيسي للجسم كله',        icon: '🫁', durationMin: 90,  category: 'mri' },
  { code: 'gamma_knife',     nameEn: 'GammaKnife',                nameTr: 'GammaKnife',           nameAr: 'سكين جاما',                       icon: '⚡', durationMin: 180, category: 'radiosurgery' },
  { code: 'spect_ct',        nameEn: 'SPECT-CT',                  nameTr: 'SPECT-BT',             nameAr: 'SPECT-CT',                        icon: '💫', durationMin: 90,  category: 'nuclear' },
  { code: 'pet_mri',         nameEn: 'PET-MRI',                   nameTr: 'PET-MRI',              nameAr: 'PET-MRI',                         icon: '🔮', durationMin: 90,  category: 'nuclear' },
  { code: 'ct_angio',        nameEn: 'CT Angiography',            nameTr: 'BT Anjiyografi',       nameAr: 'تصوير الأوعية بالأشعة',          icon: '🫀', durationMin: 45,  category: 'ct' },
  { code: 'ct_flash',        nameEn: 'Flash CT',                  nameTr: 'Flash BT',             nameAr: 'فلاش CT',                        icon: '⚡', durationMin: 30,  category: 'ct' },
  { code: 'ct_photon',       nameEn: 'Photon Counting CT',        nameTr: 'Foton Sayıcı BT',      nameAr: 'CT عد الفوتون',                  icon: '🔬', durationMin: 35,  category: 'ct' },
  { code: 'da_vinci',        nameEn: 'Da Vinci Robotic Surgery',  nameTr: 'Da Vinci Robotik',     nameAr: 'الجراحة الروبوتية دا فينشي',     icon: '🤖', durationMin: 240, category: 'robotic' },
  { code: 'mako_robot',      nameEn: 'MAKO Robotic Surgery',      nameTr: 'MAKO Robotik Cerrahi', nameAr: 'جراحة MAKO الروبوتية',           icon: '🦿', durationMin: 120, category: 'robotic' },
  { code: 'truebeam',        nameEn: 'TrueBeam Radiotherapy',     nameTr: 'TrueBeam Radyoterapi', nameAr: 'علاج إشعاعي TrueBeam',           icon: '🎯', durationMin: 30,  category: 'radiotherapy' },
  { code: 'mr_linac',        nameEn: 'MR-Linac Radiotherapy',     nameTr: 'MR-Linac Radyoterapi', nameAr: 'علاج MR-Linac الإشعاعي',         icon: '🎯', durationMin: 60,  category: 'radiotherapy' },
  { code: 'dsa_angiography', nameEn: 'DSA Digital Angiography',   nameTr: 'DSA Dijital Anjiyo',   nameAr: 'تصوير الأوعية الرقمي DSA',       icon: '🩸', durationMin: 60,  category: 'interventional' },
  { code: 'mammography_3d',  nameEn: '3D Tomosynthesis Mammography', nameTr: '3D Mamografi',     nameAr: 'تصوير الثدي الشعاعي 3D',          icon: '🩺', durationMin: 20,  category: 'imaging' },
  { code: 'eos_imaging',     nameEn: 'EOS Skeletal Imaging',      nameTr: 'EOS Görüntüleme',      nameAr: 'تصوير الهيكل العظمي EOS',        icon: '🦴', durationMin: 10,  category: 'imaging' },
  { code: 'fibroscan',       nameEn: 'FibroScan (Liver)',         nameTr: 'FibroScan',            nameAr: 'فيبروسكان الكبد',                icon: '🫀', durationMin: 20,  category: 'imaging' },
];

export function getClinicsByGroup(group: string): ClinicBasic[] {
  return CLINICS.filter(c => c.group === group);
}

export function getFeaturedClinics(): ClinicBasic[] {
  return CLINICS.filter(c => c.isFeatured);
}

export function getClinicBySlug(slug: string): ClinicBasic | undefined {
  return CLINICS.find(c => c.slug === slug);
}

export function getClinicsWithScan(scanCode: string): ClinicBasic[] {
  return CLINICS.filter(c => c.scanTypes.includes(scanCode));
}

export const CLINIC_GROUPS = ['Acıbadem', 'Medicana', 'Koç', 'Florence Nightingale', 'Memorial', 'Liv', 'Medical Park', 'Anadolu', 'HSM'];

// Legacy alias used by search page
export const TEST_CLINICS = CLINICS;

export interface ClinicCard {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  country: string;
  rating: number;
  priceFrom: number;
  scanTypes: string[];
  jciAccredited: boolean;
  isFeatured: boolean;
  description: string;
}

export function toClinicCard(clinic: ClinicBasic): ClinicCard {
  return {
    id: clinic.id,
    slug: clinic.slug,
    name: clinic.name,
    shortName: clinic.shortName,
    city: clinic.city,
    country: clinic.country,
    rating: clinic.rating,
    priceFrom: clinic.featuredScans.length > 0
      ? Math.min(...clinic.featuredScans.map(s => s.priceGbp))
      : 0,
    scanTypes: clinic.scanTypes,
    jciAccredited: clinic.jciAccredited,
    isFeatured: clinic.isFeatured,
    description: clinic.description,
  };
}
