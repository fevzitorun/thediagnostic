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
}

export const CLINICS: ClinicBasic[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    shortName: 'HSM Radyoloji',
    country: 'TR',
    city: 'Istanbul',
    address: 'Nişantaşı, Şişli, İstanbul',
    lat: 41.0485,
    lng: 29.0022,
    jciAccredited: false,
    isoAccredited: true,
    rating: 4.9,
    description: 'Led by Prof. Dr. Mustafa ÖZATEŞ, one of Turkey\'s foremost radiologists. Specialising in advanced diagnostic imaging — PET-CT, 3T MRI, SPECT-CT. Reports in English within 24 hours.',
    scanTypes: ['pet_ct', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1200, ukPriceGbp: 4000, deviceName: 'Siemens Biograph mCT Flow' },
      { code: 'mri_3t', name: 'MRI 3T', priceGbp: 320, ukPriceGbp: 1200, deviceName: 'Siemens MAGNETOM Vida 3T' },
      { code: 'spect_ct', name: 'SPECT-CT', priceGbp: 650, ukPriceGbp: 2200, deviceName: 'Siemens Symbia Intevo Bold' },
    ],
    images: [],
    isFeatured: true,
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    shortName: 'Acıbadem Maslak',
    country: 'TR',
    city: 'Istanbul',
    address: 'Büyükdere Cad. No:40, Maslak, İstanbul',
    lat: 41.1074,
    lng: 29.0240,
    jciAccredited: true,
    isoAccredited: true,
    rating: 4.8,
    description: 'Turkey\'s first JCI-accredited hospital. Home to the most advanced nuclear medicine suite in the region — PET-CT, PET-MRI, GammaKnife, and robotic 3T MRI. Dedicated International Patient Centre.',
    scanTypes: ['pet_ct', 'pet_mri', 'gamma_knife', 'mri_3t', 'mri_whole_body', 'spect_ct', 'ct_angio'],
    featuredScans: [
      { code: 'pet_ct', name: 'PET-CT', priceGbp: 1350, ukPriceGbp: 4500, deviceName: 'GE Discovery MI PET/CT 4-ring' },
      { code: 'gamma_knife', name: 'GammaKnife', priceGbp: 6500, ukPriceGbp: 20000, deviceName: 'Leksell Gamma Knife Icon' },
      { code: 'pet_mri', name: 'PET-MRI', priceGbp: 1850, ukPriceGbp: 5500, deviceName: 'Siemens Biograph mMR' },
    ],
    images: [],
    isFeatured: true,
  },
];

export const SCAN_TYPES = [
  { code: 'pet_ct',         nameEn: 'PET-CT Scan',      nameTr: 'PET-BT',          nameAr: 'فحص PET-CT',                  icon: '🔬', durationMin: 90,  category: 'nuclear' },
  { code: 'mri_3t',         nameEn: 'MRI 3T',            nameTr: '3T MRI',           nameAr: 'الرنين المغناطيسي 3T',         icon: '🧲', durationMin: 60,  category: 'mri' },
  { code: 'gamma_knife',    nameEn: 'GammaKnife',         nameTr: 'GammaKnife',       nameAr: 'سكين جاما',                    icon: '⚡', durationMin: 180, category: 'interventional' },
  { code: 'spect_ct',       nameEn: 'SPECT-CT',           nameTr: 'SPECT-BT',         nameAr: 'SPECT-CT',                     icon: '💫', durationMin: 90,  category: 'nuclear' },
  { code: 'pet_mri',        nameEn: 'PET-MRI',            nameTr: 'PET-MRI',          nameAr: 'PET-MRI',                      icon: '🔮', durationMin: 90,  category: 'nuclear' },
  { code: 'mri_whole_body', nameEn: 'Whole Body MRI',     nameTr: 'Tüm Vücut MRI',    nameAr: 'رنين مغناطيسي للجسم كله',     icon: '🫁', durationMin: 90,  category: 'mri' },
  { code: 'ct_angio',       nameEn: 'CT Angiography',     nameTr: 'BT Anjiyografi',   nameAr: 'تصوير الأوعية بالأشعة',       icon: '🫀', durationMin: 45,  category: 'ct' },
];
