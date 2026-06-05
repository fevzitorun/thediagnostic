// ScanBook — Test Clinic Data (3 launch partners)
// Last updated: May 2025 — verified against live clinic websites
//
// Sources:
//   Medicana  → https://medicana.co.uk/request-a-scan/
//   MotherScan → https://motherscan.co.uk/
//   Unirad    → https://unirad.co.uk/
//
// Enes: when Supabase is ready, replace usages with:
//   import { getClinic, getAllClinics } from '@/lib/db/clinics'

export type CqcRating = 'Outstanding' | 'Good' | 'Requires Improvement' | 'Pending'

export interface ScanPackage {
  id: string
  name: string
  price: number
  duration: string
  bodyParts?: string[]
  tag?: 'popular' | 'fast' | '3t' | 'hd' | 'specialist'
  reportHours: number
  note?: string
}

export interface ClinicLocation {
  label: string           // "Wimbledon" | "Islington"
  address: string
  postcode: string
  phone: string
  phoneAlt?: string
  city: string
  latitude?: number
  longitude?: number
}

export interface ClinicData {
  id: string
  slug: string
  name: string
  subtitle: string
  // Primary location
  city: string
  address: string
  postcode: string
  phone: string
  email: string
  website?: string
  // Multiple locations (if applicable)
  locations?: ClinicLocation[]
  // Ratings
  rating: number
  reviewCount: number
  googleRating: number
  googleReviewCount: number
  trustpilotRating?: number
  trustpilotReviewCount?: number
  // Equipment
  scannerTesla?: '1.5T' | '2T' | '3T'
  // Accreditation
  cqcRating: CqcRating
  cqcUrl?: string
  regulatedBy?: string    // "CQC" | "Healthcare Improvement Scotland"
  // Operations
  reportHours: number
  priceFrom: number
  openNow: boolean
  hours: { day: string; time: string; isToday?: boolean }[]
  // Info
  facilities: string[]
  transport: { icon: string; text: string }[]
  insurers: string[]
  capabilities: string[]
  // Packages
  packages: {
    mri?: ScanPackage[]
    mri_contrast?: ScanPackage[]
    ct?: ScanPackage[]
    ct_contrast?: ScanPackage[]
    ultrasound?: ScanPackage[]
    xray?: ScanPackage[]
    baby?: ScanPackage[]
    pregnancy?: ScanPackage[]
    blood_tests?: ScanPackage[]
  }
  reviews: {
    author: string
    date: string
    rating: number
    text: string
    source: 'google' | 'trustpilot' | 'doctify'
    scanType?: string
  }[]
  featuredOnHomepage: boolean
  latitude?: number
  longitude?: number
}

// ─── 1. MEDICANA WINCHESTER ───────────────────────────────────────────────────
// Source: https://medicana.co.uk/request-a-scan/

const MEDICANA_WINCHESTER: ClinicData = {
  id: 'medicana-winchester',
  slug: 'medicana-winchester',
  name: 'Medicana Winchester',
  subtitle: 'Private Diagnostic Imaging Centre · Winchester',
  city: 'Winchester',
  address: 'Chilcomb Park, Chilcomb Lane',
  postcode: 'SO21 1HU',
  phone: '01962 587821',
  email: 'info@medicana.co.uk',
  website: 'https://medicana.co.uk',
  rating: 4.9,
  reviewCount: 312,
  googleRating: 4.8,
  googleReviewCount: 214,
  trustpilotRating: 4.9,
  trustpilotReviewCount: 98,
  scannerTesla: '3T',
  cqcRating: 'Outstanding',
  regulatedBy: 'CQC',
  cqcUrl: 'https://www.cqc.org.uk',
  reportHours: 24,
  priceFrom: 107,            // X-Ray from £107 (cheapest service)
  openNow: true,
  capabilities: ['mri', 'ct', 'ultrasound', 'xray'],
  hours: [
    { day: 'Monday',    time: '8am – 7pm' },
    { day: 'Tuesday',   time: '8am – 7pm' },
    { day: 'Wednesday', time: '8am – 7pm' },
    { day: 'Thursday',  time: '8am – 7pm' },
    { day: 'Friday',    time: '8am – 6pm' },
    { day: 'Saturday',  time: '9am – 4pm' },
    { day: 'Sunday',    time: 'Closed' },
  ],
  facilities: [
    '3T MRI Scanner',
    'CT Suite',
    'Ultrasound Suite (Standard & Doppler)',
    'Standing CT (weight-bearing)',
    'Same-day & next-day appointments',
    'International patients welcome',
    'No GP referral required',
    'Fixed pricing — no hidden fees',
  ],
  transport: [
    { icon: '🚗', text: 'Chilcomb Park — free on-site parking' },
    { icon: '🚉', text: '10 min drive from Winchester station' },
    { icon: '🚌', text: 'Bus links from Winchester city centre' },
    { icon: '♿', text: 'Wheelchair accessible' },
  ],
  insurers: ['Bupa', 'AXA Health', 'Aviva', 'Vitality', 'WPA', 'Cigna'],
  packages: {
    mri: [
      {
        id: 'mri-1', name: 'MRI — 1 Body Part', price: 455, duration: '45 min',
        tag: 'popular', reportHours: 24,
        bodyParts: [
          'Brain & Head', 'Pituitary Fossa', 'IAMs', 'Sinuses', 'Face',
          'Neck', 'Cervical Spine', 'Thoracic Spine', 'Lumbar Spine', 'Sacrum', 'Coccyx',
          'Shoulder', 'Elbow', 'Wrist', 'Hand', 'Upper Arm', 'Forearm',
          'Hip', 'Knee', 'Ankle', 'Foot', 'Thigh', 'Calf',
          'Chest', 'Abdomen', 'Pelvis', 'MRCP',
        ],
      },
      { id: 'mri-2', name: 'MRI — 2 Body Parts', price: 702,  duration: '75 min', reportHours: 24 },
      { id: 'mri-3', name: 'MRI — 3 Body Parts', price: 975,  duration: '90 min', reportHours: 48 },
      { id: 'mri-4', name: 'MRI — 4 Body Parts', price: 1190, duration: '2 hrs',  reportHours: 48 },
      { id: 'mri-wb',       name: 'Whole Body MRI',            price: 1330, duration: '3 hrs',  tag: '3t',        reportHours: 48 },
      { id: 'mri-prostate', name: 'Prostate MRI (mpMRI)',       price: 1080, duration: '60 min', tag: 'specialist', reportHours: 48, note: 'Multiparametric with contrast' },
      { id: 'mri-prostate-nc', name: 'Prostate MRI (No Contrast)', price: 950, duration: '60 min', tag: 'specialist', reportHours: 48 },
      { id: 'mri-liver',   name: 'Liver MRI',                  price: 1080, duration: '60 min', tag: 'specialist', reportHours: 48 },
      { id: 'mri-arthrogram', name: 'Arthrogram MRI (Joint)',  price: 1030, duration: '90 min', tag: 'specialist', reportHours: 48 },
    ],
    mri_contrast: [
      { id: 'mric-1', name: 'MRI with Contrast — 1 Part', price: 565,  duration: '60 min', reportHours: 24 },
      { id: 'mric-2', name: 'MRI with Contrast — 2 Parts', price: 810,  duration: '90 min', reportHours: 24 },
      { id: 'mric-3', name: 'MRI with Contrast — 3 Parts', price: 1080, duration: '2 hrs',  reportHours: 48 },
      { id: 'mric-4', name: 'MRI with Contrast — 4 Parts', price: 1300, duration: '2.5 hrs', reportHours: 48 },
    ],
    ct: [
      { id: 'ct-1', name: 'CT Scan — 1 Area', price: 525,  duration: '20 min', tag: 'fast', reportHours: 24 },
      { id: 'ct-2', name: 'CT Scan — 2 Areas', price: 740,  duration: '30 min', reportHours: 24 },
      { id: 'ct-3', name: 'CT Scan — 3 Areas', price: 920,  duration: '40 min', reportHours: 48 },
      { id: 'ct-4', name: 'CT Scan — 4+ Areas', price: 1080, duration: '50 min', reportHours: 48 },
      { id: 'ct-standing-knee', name: 'Standing CT — Knee (Bilateral)', price: 740, duration: '30 min', tag: 'specialist', reportHours: 24, note: 'Weight-bearing' },
      { id: 'ct-standing-foot', name: 'Standing CT — Foot & Ankle (Bilateral)', price: 920, duration: '30 min', tag: 'specialist', reportHours: 24, note: 'Weight-bearing' },
      { id: 'ct-standing-hip', name: 'Standing CT — Hips', price: 740, duration: '30 min', tag: 'specialist', reportHours: 24, note: 'Weight-bearing' },
    ],
    ct_contrast: [
      { id: 'ctc-1', name: 'CT with Contrast — 1 Area',  price: 635,  duration: '30 min', reportHours: 24 },
      { id: 'ctc-2', name: 'CT with Contrast — 2 Areas', price: 850,  duration: '40 min', reportHours: 24 },
      { id: 'ctc-3', name: 'CT with Contrast — 3 Areas', price: 1030, duration: '50 min', reportHours: 48 },
      { id: 'ctc-4', name: 'CT with Contrast — 4+ Areas', price: 1190, duration: '60 min', reportHours: 48 },
    ],
    ultrasound: [
      { id: 'us-1', name: 'Ultrasound — 1 Area',  price: 380, duration: '30 min', tag: 'popular', reportHours: 24 },
      { id: 'us-2', name: 'Ultrasound — 2 Areas', price: 535, duration: '45 min', reportHours: 24 },
      { id: 'us-3', name: 'Ultrasound — 3 Areas', price: 705, duration: '60 min', reportHours: 24 },
      { id: 'us-4', name: 'Ultrasound — 4+ Areas', price: 865, duration: '75 min', reportHours: 24 },
      { id: 'us-doppler-1', name: 'Doppler Ultrasound — 1 Area',  price: 486, duration: '30 min', tag: 'specialist', reportHours: 24 },
      { id: 'us-doppler-2', name: 'Doppler Ultrasound — 2 Areas', price: 648, duration: '45 min', tag: 'specialist', reportHours: 24 },
      { id: 'us-doppler-3', name: 'Doppler Ultrasound — 3 Areas', price: 810, duration: '60 min', tag: 'specialist', reportHours: 24 },
    ],
    xray: [
      { id: 'xray-1', name: 'X-Ray — 1 View', price: 107, duration: '15 min', tag: 'fast', reportHours: 24 },
      { id: 'xray-2', name: 'X-Ray — 2 Views', price: 130, duration: '20 min', reportHours: 24 },
      { id: 'xray-3', name: 'X-Ray — 3 Views', price: 163, duration: '25 min', reportHours: 24 },
      { id: 'xray-4', name: 'X-Ray — 4 Views', price: 195, duration: '30 min', reportHours: 24 },
      { id: 'xray-5', name: 'X-Ray — 5 Views', price: 220, duration: '35 min', reportHours: 24 },
      { id: 'xray-6', name: 'X-Ray — 6 Views', price: 250, duration: '40 min', reportHours: 24 },
      { id: 'xray-leg', name: 'Leg Length X-Ray', price: 270, duration: '30 min', tag: 'specialist', reportHours: 24 },
    ],
  },
  reviews: [
    {
      author: 'Sarah M.',
      date: 'March 2025',
      rating: 5,
      text: 'Booked a knee MRI on Monday, had results by Tuesday lunchtime. The 3T scanner gives incredible detail and the radiologist report was thorough. My GP was very impressed.',
      source: 'google',
      scanType: 'Knee MRI',
    },
    {
      author: 'James T.',
      date: 'February 2025',
      rating: 5,
      text: 'Fantastic experience from start to finish. Staff were professional, facility is spotless. Much better than waiting on the NHS.',
      source: 'trustpilot',
      scanType: 'CT Chest',
    },
    {
      author: 'Rebecca K.',
      date: 'April 2025',
      rating: 5,
      text: 'Had a whole body MRI — worth every penny. Comprehensive report, stunning image quality, same-day appointment available.',
      source: 'google',
      scanType: 'Whole Body MRI',
    },
    {
      author: 'David L.',
      date: 'January 2025',
      rating: 5,
      text: 'Booked online in 5 minutes. Parking is easy at Chilcomb Park, the scanner was brand new, and I had my results the next morning.',
      source: 'trustpilot',
      scanType: 'Lumbar Spine MRI',
    },
  ],
  featuredOnHomepage: true,
  latitude: 51.0482,
  longitude: -1.2897,
}

// ─── 2. UNIRAD GLASGOW ────────────────────────────────────────────────────────
// Source: https://unirad.co.uk/

const UNIRAD_GLASGOW: ClinicData = {
  id: 'unirad-glasgow',
  slug: 'unirad-glasgow',
  name: 'Unirad Imaging',
  subtitle: 'Private MRI Scan Clinic · Glasgow',
  city: 'Glasgow',
  address: '22 Loanbank Quadrant',
  postcode: 'G51 3HZ',
  phone: '0141 846 9116',
  email: 'info@unirad.co.uk',
  website: 'https://unirad.co.uk',
  rating: 4.9,
  reviewCount: 187,
  googleRating: 4.9,
  googleReviewCount: 187,
  cqcRating: 'Pending',
  regulatedBy: 'Healthcare Improvement Scotland',
  reportHours: 72,
  priceFrom: 290,
  openNow: true,
  capabilities: ['mri'],
  hours: [
    { day: 'Monday',    time: '8am – 6pm' },
    { day: 'Tuesday',   time: '8am – 6pm' },
    { day: 'Wednesday', time: '8am – 6pm' },
    { day: 'Thursday',  time: '8am – 6pm' },
    { day: 'Friday',    time: '8am – 5pm' },
    { day: 'Saturday',  time: '9am – 2pm' },
    { day: 'Sunday',    time: 'Closed' },
  ],
  facilities: [
    'Hospital-grade MRI technology',
    'UK-registered consultant radiologists',
    'Same-week & next-day availability',
    'Digital radiologist report included',
    'Health screening packages',
    'GP referral partner programme',
    'No GP referral required',
    'No hidden fees',
  ],
  transport: [
    { icon: '🚇', text: 'Govan Subway station (2 min walk)' },
    { icon: '🚗', text: 'Street parking on Loanbank Quadrant' },
    { icon: '🚌', text: 'Bus routes from Glasgow city centre' },
  ],
  insurers: ['Bupa', 'AXA Health', 'Aviva'],
  packages: {
    mri: [
      {
        id: 'mri-1', name: 'MRI Scan', price: 290, duration: '45 min',
        tag: 'popular', reportHours: 72,
        note: 'Any single body region',
        bodyParts: [
          'Head & Brain', 'Neck',
          'Cervical Spine', 'Thoracic Spine', 'Lumbar Spine',
          'Shoulder', 'Elbow', 'Hand & Wrist',
          'Chest', 'Abdomen', 'Pelvis',
          'Hip', 'Knee', 'Foot & Ankle',
          'Cardiac', 'Prostate',
        ],
      },
      {
        id: 'mri-fb', name: 'Full Body MRI', price: 590, duration: '3 hrs',
        tag: '3t', reportHours: 72,
        note: 'Comprehensive head-to-toe screening',
      },
      {
        id: 'gp-consult', name: 'GP Consultation', price: 40, duration: '15 min',
        reportHours: 0,
        note: 'Available before or after your scan',
      },
    ],
  },
  reviews: [
    {
      author: 'Craig B.',
      date: 'March 2025',
      rating: 5,
      text: 'Booked Saturday, scanned Monday, results by Tuesday. Absolutely superb service. The whole team was professional and the facility is modern and clean.',
      source: 'google',
      scanType: 'Knee MRI',
    },
    {
      author: 'Fiona D.',
      date: 'February 2025',
      rating: 5,
      text: "Couldn't recommend Unirad highly enough. Got my brain MRI done quickly and the report was thorough. So much better than waiting on the NHS.",
      source: 'google',
      scanType: 'Brain MRI',
    },
    {
      author: 'Andrew M.',
      date: 'April 2025',
      rating: 5,
      text: 'Easy online booking, friendly staff, comprehensive radiologist report delivered on time. Will use again.',
      source: 'google',
      scanType: 'Lumbar Spine MRI',
    },
    {
      author: 'Helen S.',
      date: 'January 2025',
      rating: 5,
      text: 'Full body MRI was excellent value. The report was incredibly detailed and everything was explained clearly by the team.',
      source: 'google',
      scanType: 'Full Body MRI',
    },
  ],
  featuredOnHomepage: true,
  latitude: 55.8601,
  longitude: -4.3138,
}

// ─── 3A. MOTHERSCAN WIMBLEDON ─────────────────────────────────────────────────
// Source: https://motherscan.co.uk/

const MOTHERSCAN_WIMBLEDON: ClinicData = {
  id: 'motherscan-wimbledon',
  slug: 'motherscan-wimbledon',
  name: 'MotherScan Wimbledon',
  subtitle: 'Private Pregnancy & Baby Scan Clinic · Wimbledon',
  city: 'London SW20',
  address: '7 Approach Road',
  postcode: 'SW20 8BA',
  phone: '0204 537 7811',
  email: 'wimbledon@motherscan.co.uk',
  website: 'https://motherscan.co.uk',
  // Second location listed for reference
  locations: [
    {
      label: 'Wimbledon',
      address: '7 Approach Road',
      postcode: 'SW20 8BA',
      phone: '0204 537 7811',
      phoneAlt: '07951 600 202',
      city: 'London SW20',
      latitude: 51.4102,
      longitude: -0.2244,
    },
    {
      label: 'Islington',
      address: '117 Holloway Road',
      postcode: 'N7 8LT',
      phone: '0204 631 6636',
      phoneAlt: '07585 470 000',
      city: 'London N7',
      latitude: 51.5521,
      longitude: -0.1169,
    },
  ],
  rating: 4.9,
  reviewCount: 840,
  googleRating: 4.9,
  googleReviewCount: 620,
  trustpilotRating: 4.9,
  trustpilotReviewCount: 220,
  cqcRating: 'Good',
  regulatedBy: 'CQC',
  reportHours: 0,
  priceFrom: 79,
  openNow: true,
  capabilities: ['baby_scan', 'pregnancy_scan', 'ultrasound'],
  hours: [
    { day: 'Monday',    time: '9am – 7pm' },
    { day: 'Tuesday',   time: '9am – 7pm' },
    { day: 'Wednesday', time: '9am – 7pm' },
    { day: 'Thursday',  time: '9am – 7pm' },
    { day: 'Friday',    time: '9am – 7pm' },
    { day: 'Saturday',  time: '9am – 6pm' },
    { day: 'Sunday',    time: '10am – 4pm' },
  ],
  facilities: [
    'HD 3D & 4D Live Ultrasound',
    'Same-day appointments available',
    'Female sonographers available on request',
    'Printed photos & digital images included',
    '4D video recording available',
    '24/7 emergency scan line',
    'Two London locations (Wimbledon & Islington)',
  ],
  transport: [
    { icon: '🚉', text: 'Raynes Park station (5 min walk)' },
    { icon: '🚗', text: 'Street parking on Approach Road' },
    { icon: '🚌', text: 'Bus routes 57, 131 stop outside' },
  ],
  insurers: [],
  packages: {
    pregnancy: [
      { id: 'preg-early',     name: 'Early Pregnancy Scan',              price: 79,  duration: '20 min', tag: 'popular', reportHours: 0, note: '6–14 weeks' },
      { id: 'preg-hello',     name: 'Hello Baby (2 consecutive scans)',   price: 119, duration: '2 × 20 min', reportHours: 0, note: '6–14 weeks, 7–15 days apart' },
      { id: 'preg-wellbeing', name: 'Wellbeing Baby Scan',               price: 79,  duration: '20 min', reportHours: 0, note: 'From 14 weeks' },
      { id: 'preg-gender',    name: 'Gender Reveal Scan',                price: 79,  duration: '20 min', reportHours: 0, note: 'From 16 weeks' },
      { id: 'preg-wb3d',      name: 'Wellbeing Check + 3D Imaging',      price: 119, duration: '30 min', reportHours: 0, note: 'From 16 weeks' },
      { id: 'preg-supreme',   name: 'Supreme Package',                   price: 179, duration: '60 min', tag: 'hd',      reportHours: 0, note: 'Wellbeing + 3D prints + 4D video + gender. From 20 weeks' },
      { id: 'preg-throughout', name: 'Throughout Pregnancy Package',     price: 299, duration: 'Multiple', reportHours: 0, note: '4 scans from 6 weeks to delivery' },
      { id: 'preg-emergency', name: 'Emergency Pregnancy Scan',          price: 250, duration: '20 min', tag: 'fast',    reportHours: 0, note: 'Available anytime — 24/7 line' },
    ],
    ultrasound: [
      { id: 'us-pelv',  name: 'Pelvic Ultrasound Scan',           price: 149, duration: '30 min', reportHours: 24 },
      { id: 'us-ivf',   name: 'IVF Stimulation Follow-up (2 scans)', price: 249, duration: '2 × 30 min', reportHours: 0, note: 'Same cycle' },
    ],
    blood_tests: [
      { id: 'bt-gender',     name: 'Early Gender Reveal Blood Test',              price: 120, duration: '—', reportHours: 48, note: 'Non-invasive. From 6 weeks' },
      { id: 'bt-nipt-std',   name: 'NIPT Standard + Wellbeing Scan',             price: 399, duration: '60 min', reportHours: 72, note: 'From 10 weeks' },
      { id: 'bt-nipt-adv',   name: 'NIPT Advance + Wellbeing Scan',              price: 499, duration: '60 min', reportHours: 72, note: 'From 10 weeks' },
      { id: 'bt-nipt-abs',   name: 'NIPT Absolute with Microdeletions + Wellbeing', price: 699, duration: '60 min', tag: 'specialist', reportHours: 72, note: 'From 10 weeks' },
    ],
  },
  reviews: [
    {
      author: 'Sophie A.',
      date: 'April 2025',
      rating: 5,
      text: 'The most beautiful experience. Our 4D scan was so clear we could see every detail. The sonographer was warm and took her time. Already recommended to three friends.',
      source: 'google',
      scanType: '4D Bonding Scan',
    },
    {
      author: 'Priya N.',
      date: 'March 2025',
      rating: 5,
      text: 'Came in for an early reassurance scan at 8 weeks. Staff were so kind and reassuring. Saw the heartbeat straight away. Will be coming back for all my pregnancy scans.',
      source: 'trustpilot',
      scanType: 'Early Reassurance Scan',
    },
    {
      author: 'Emma W.',
      date: 'February 2025',
      rating: 5,
      text: 'Same-day appointment, perfect gender reveal — they built up the surprise beautifully. Beautiful video to share with family.',
      source: 'google',
      scanType: 'Gender Reveal Scan',
    },
    {
      author: 'Charlotte B.',
      date: 'January 2025',
      rating: 5,
      text: 'Had the Supreme Package — worth every penny. The 4D images were incredible quality and the whole team made us feel so welcome.',
      source: 'google',
      scanType: 'Supreme Package',
    },
  ],
  featuredOnHomepage: true,
  latitude: 51.4102,
  longitude: -0.2244,
}

// ─── 3B. MOTHERSCAN ISLINGTON ─────────────────────────────────────────────────
// Same packages as Wimbledon — separate clinic entry for /centres filtering

const MOTHERSCAN_ISLINGTON: ClinicData = {
  ...MOTHERSCAN_WIMBLEDON,
  id: 'motherscan-islington',
  slug: 'motherscan-islington',
  name: 'MotherScan Islington',
  subtitle: 'Private Pregnancy & Baby Scan Clinic · Islington',
  city: 'London N7',
  address: '117 Holloway Road',
  postcode: 'N7 8LT',
  phone: '0204 631 6636',
  email: 'islington@motherscan.co.uk',
  featuredOnHomepage: false,
  latitude: 51.5521,
  longitude: -0.1169,
}

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export const TEST_CLINICS: ClinicData[] = [
  MEDICANA_WINCHESTER,
  UNIRAD_GLASGOW,
  MOTHERSCAN_WIMBLEDON,
  MOTHERSCAN_ISLINGTON,
]

export function getClinicBySlug(slug: string): ClinicData | undefined {
  return TEST_CLINICS.find(c => c.slug === slug)
}

export function getFeaturedClinics(): ClinicData[] {
  return TEST_CLINICS.filter(c => c.featuredOnHomepage)
}

export function getClinicsByCapability(capability: string): ClinicData[] {
  return TEST_CLINICS.filter(c => c.capabilities.includes(capability))
}

// ─── CLINIC CARD (used by /search and /centres) ───────────────────────────────

export interface ClinicCard {
  id: string
  slug: string
  name: string
  address: string
  city: string
  rating: number
  reviewCount: number
  scannerType: string
  reportHours: number
  priceFrom: number
  nextSlot: string
  cqcRating: CqcRating
  regulatedBy: string
  tags: string[]
  capabilities: string[]
  insurers: string[]
  featured: boolean
  locationsCount: number
}

export function toClinicCard(c: ClinicData): ClinicCard {
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    address: `${c.address}, ${c.postcode}`,
    city: c.city,
    rating: c.rating,
    reviewCount: c.reviewCount,
    scannerType: c.scannerTesla ?? (c.capabilities.includes('mri') ? 'MRI' : 'Ultrasound'),
    reportHours: c.reportHours,
    priceFrom: c.priceFrom,
    nextSlot: 'Today',
    cqcRating: c.cqcRating,
    regulatedBy: c.regulatedBy ?? 'CQC',
    tags: c.capabilities,
    capabilities: c.capabilities,
    insurers: c.insurers,
    featured: c.featuredOnHomepage,
    locationsCount: c.locations?.length ?? 1,
  }
}
