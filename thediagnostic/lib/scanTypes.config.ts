// ScanBook — Scan Type Behavior Configuration
// v1.0 — Catalog Visibility Matrix implementation
//
// HOW TO USE:
//   import { SCAN_TYPES, getScanType, getVisibleScanTypes } from '@/lib/scanTypes.config'
//
// Every UI component (homepage, /search, /centres, /book) feeds from this single source.
// Never hard-code scan type lists in components.

// ─── TYPES ────────────────────────────────────────────────────────────────────

export type SearchBehavior =
  | 'body_part_driven'   // MRI, CT, X-Ray — user picks scan type + body part
  | 'pathway_driven'     // Baby Scan, Pregnancy — user picks a clinical pathway
  | 'package_driven'     // Mammogram, DEXA — user picks a pre-defined package
  | 'variant_driven'     // Ultrasound, Dental — service-specific variants, not generic body parts

export type VisibilityStatus = 'visible' | 'coming_soon' | 'internal_only'

export type BookingTemplate =
  | 'mri_standard'
  | 'ct_standard'
  | 'ultrasound_standard'
  | 'xray_standard'
  | 'baby_scan'
  | 'pregnancy'
  | 'mammogram'
  | 'dexa'
  | 'dental'

export type MobilePickerType =
  | 'body_part_sheet'    // Bottom sheet with grouped body parts
  | 'pathway_chips'      // Chip-based pathway selector
  | 'package_list'       // Simple list of packages
  | 'variant_grid'       // 2-column grid of variants

export type FilterType =
  | 'body_part'
  | 'laterality'
  | 'location'
  | 'machine_type'
  | 'contrast'
  | 'pathway'
  | 'gestational_age'
  | 'package_type'
  | 'variant'

export type CentreCapability =
  | 'mri'
  | 'ct'
  | 'ultrasound'
  | 'xray'
  | 'baby_scan'
  | 'pregnancy_scan'
  | 'mammogram'
  | 'dexa'
  | 'dental_xray'
  | 'dental_cbct'

export interface BodyPartGroup {
  groupLabel: string
  parts: BodyPart[]
}

export interface BodyPart {
  userFacingName: string    // Shown in UI: "Knee"
  slug: string              // URL safe: "knee"
  canonicalNames: string[]  // Internal/DB: ["Knee", "Knee - Left", "Knee - Right", "Knee - Both"]
  lateralityRequired: boolean
}

export interface PathwayOption {
  id: string
  label: string
  description: string
  durationHint?: string     // "~20 min"
  ageRange?: string         // "6–14 weeks"
  priceFrom?: number
}

export interface PackageOption {
  id: string
  label: string
  description: string
  priceFrom?: number
  includes?: string[]
}

export interface VariantOption {
  id: string
  label: string
  prepNote?: string          // "Fasting required" / "Full bladder"
  priceFrom?: number
}

export interface ScanTypeConfig {
  id: string
  label: string               // "MRI Scan"
  shortLabel: string          // "MRI" (for chips, tabs)
  slug: string                // URL slug: "mri"
  description: string         // Short user-facing description
  icon: string                // Emoji fallback
  visibilityStatus: VisibilityStatus
  searchBehavior: SearchBehavior
  bookingTemplate: BookingTemplate
  supportedFilters: FilterType[]
  centreCapabilities: CentreCapability[]
  mobilePickerType: MobilePickerType
  priceFrom?: number          // Lowest price to show as "from £X"
  reportHoursTypical?: number // Typical report turnaround
  requiresReferral: boolean
  // Behavior-specific data (only one will be set per scan type)
  bodyPartGroups?: BodyPartGroup[]
  pathwayOptions?: PathwayOption[]
  packageOptions?: PackageOption[]
  variantOptions?: VariantOption[]
  // Homepage
  showOnHomepage: boolean
  homepagePopularLinks?: { label: string; prefilter: string }[]
  // Navigation
  showInServicesNav: boolean
  showInCentresFilter: boolean
  showInBookDropdown: boolean
  sortOrder: number
}

// ─── BODY PART DATA ───────────────────────────────────────────────────────────
// Shared across MRI, CT, X-Ray (each type only uses what's relevant)

const SPINE_PARTS: BodyPart[] = [
  {
    userFacingName: 'Cervical Spine (Neck)',
    slug: 'cervical-spine',
    canonicalNames: ['Cervical Spine', 'Neck'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Thoracic Spine (Mid Back)',
    slug: 'thoracic-spine',
    canonicalNames: ['Thoracic Spine'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Lumbar Spine (Lower Back)',
    slug: 'lumbar-spine',
    canonicalNames: ['Lumbar Spine', 'Lower Back'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Sacrum & Coccyx',
    slug: 'sacrum',
    canonicalNames: ['Sacrum', 'Coccyx'],
    lateralityRequired: false,
  },
]

const HEAD_NECK_PARTS: BodyPart[] = [
  {
    userFacingName: 'Brain / Head',
    slug: 'brain',
    canonicalNames: ['Brain/Head', 'Head', 'Brain', 'Pituitary Fossa', 'IAMs'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Neck & Throat',
    slug: 'neck',
    canonicalNames: ['Neck', 'Throat', 'Soft Tissue Neck'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Sinuses',
    slug: 'sinuses',
    canonicalNames: ['Sinuses', 'Face'],
    lateralityRequired: false,
  },
]

const UPPER_LIMB_PARTS: BodyPart[] = [
  {
    userFacingName: 'Shoulder',
    slug: 'shoulder',
    canonicalNames: ['Shoulder', 'Shoulder - Left', 'Shoulder - Right'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Elbow',
    slug: 'elbow',
    canonicalNames: ['Elbow', 'Elbow - Left', 'Elbow - Right'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Wrist & Hand',
    slug: 'wrist-hand',
    canonicalNames: ['Wrist', 'Hand', 'Wrist - Left', 'Wrist - Right', 'Hand - Left', 'Hand - Right'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Upper Arm',
    slug: 'upper-arm',
    canonicalNames: ['Upper Arm', 'Humerus'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Forearm',
    slug: 'forearm',
    canonicalNames: ['Forearm', 'Radius', 'Ulna'],
    lateralityRequired: true,
  },
]

const LOWER_LIMB_PARTS: BodyPart[] = [
  {
    userFacingName: 'Hip',
    slug: 'hip',
    canonicalNames: ['Hip', 'Hip - Left', 'Hip - Right', 'Hip - Both'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Knee',
    slug: 'knee',
    canonicalNames: ['Knee', 'Knee - Left', 'Knee - Right', 'Knee - Both'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Ankle & Foot',
    slug: 'ankle-foot',
    canonicalNames: ['Ankle', 'Foot', 'Ankle - Left', 'Ankle - Right', 'Foot - Left', 'Foot - Right'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Thigh',
    slug: 'thigh',
    canonicalNames: ['Thigh', 'Femur'],
    lateralityRequired: true,
  },
  {
    userFacingName: 'Calf',
    slug: 'calf',
    canonicalNames: ['Calf', 'Tibia', 'Fibula'],
    lateralityRequired: true,
  },
]

const TORSO_PARTS: BodyPart[] = [
  {
    userFacingName: 'Chest / Thorax',
    slug: 'chest',
    canonicalNames: ['Chest', 'Thorax', 'Lungs'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Abdomen',
    slug: 'abdomen',
    canonicalNames: ['Abdomen', 'Upper Abdomen', 'Liver', 'Kidneys'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Pelvis',
    slug: 'pelvis',
    canonicalNames: ['Pelvis', 'Lower Abdomen'],
    lateralityRequired: false,
  },
  {
    userFacingName: 'Whole Body',
    slug: 'whole-body',
    canonicalNames: ['Whole Body', 'Full Body'],
    lateralityRequired: false,
  },
]

// ─── SCAN TYPE CONFIGS ────────────────────────────────────────────────────────

export const SCAN_TYPES: ScanTypeConfig[] = [
  // ── 1. MRI ────────────────────────────────────────────────────────────────
  {
    id: 'mri',
    label: 'MRI Scan',
    shortLabel: 'MRI',
    slug: 'mri',
    description: 'High-resolution soft tissue imaging — no radiation. Ideal for joints, spine, brain and organs.',
    icon: '🧠',
    visibilityStatus: 'visible',
    searchBehavior: 'body_part_driven',
    bookingTemplate: 'mri_standard',
    supportedFilters: ['body_part', 'laterality', 'location', 'machine_type', 'contrast'],
    centreCapabilities: ['mri'],
    mobilePickerType: 'body_part_sheet',
    priceFrom: 275,
    reportHoursTypical: 48,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 1,
    homepagePopularLinks: [
      { label: 'MRI Scan', prefilter: '' },
      { label: 'Knee MRI', prefilter: 'knee' },
      { label: 'Brain MRI', prefilter: 'brain' },
      { label: 'Back MRI', prefilter: 'lumbar-spine' },
      { label: 'Shoulder MRI', prefilter: 'shoulder' },
    ],
    bodyPartGroups: [
      { groupLabel: 'Head & Neck', parts: HEAD_NECK_PARTS },
      { groupLabel: 'Spine & Back', parts: SPINE_PARTS },
      { groupLabel: 'Upper Limb', parts: UPPER_LIMB_PARTS },
      { groupLabel: 'Lower Limb', parts: LOWER_LIMB_PARTS },
      { groupLabel: 'Chest & Abdomen', parts: TORSO_PARTS },
    ],
  },

  // ── 2. CT ─────────────────────────────────────────────────────────────────
  {
    id: 'ct',
    label: 'CT Scan',
    shortLabel: 'CT',
    slug: 'ct',
    description: 'Fast cross-sectional imaging. Excellent for chest, abdomen and coronary assessment.',
    icon: '🔬',
    visibilityStatus: 'visible',
    searchBehavior: 'body_part_driven',
    bookingTemplate: 'ct_standard',
    supportedFilters: ['body_part', 'location', 'contrast'],
    centreCapabilities: ['ct'],
    mobilePickerType: 'body_part_sheet',
    priceFrom: 185,
    reportHoursTypical: 48,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 2,
    homepagePopularLinks: [
      { label: 'CT Scan', prefilter: '' },
      { label: 'CT Chest', prefilter: 'chest' },
      { label: 'CT Abdomen', prefilter: 'abdomen' },
      { label: 'Coronary CT', prefilter: 'chest' },
    ],
    bodyPartGroups: [
      { groupLabel: 'Head & Neck', parts: HEAD_NECK_PARTS },
      { groupLabel: 'Spine', parts: SPINE_PARTS },
      { groupLabel: 'Chest & Abdomen', parts: TORSO_PARTS },
    ],
  },

  // ── 3. ULTRASOUND ─────────────────────────────────────────────────────────
  {
    id: 'ultrasound',
    label: 'Ultrasound',
    shortLabel: 'Ultrasound',
    slug: 'ultrasound',
    description: 'Real-time, radiation-free imaging. Ideal for abdomen, pelvis, thyroid and vascular assessment.',
    icon: '🔊',
    visibilityStatus: 'visible',
    searchBehavior: 'variant_driven',
    bookingTemplate: 'ultrasound_standard',
    supportedFilters: ['variant', 'location'],
    centreCapabilities: ['ultrasound'],
    mobilePickerType: 'variant_grid',
    priceFrom: 99,
    reportHoursTypical: 24,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 3,
    homepagePopularLinks: [
      { label: 'Abdominal Ultrasound', prefilter: 'abdomen' },
      { label: 'Pelvic Ultrasound', prefilter: 'pelvis' },
      { label: 'Thyroid Ultrasound', prefilter: 'thyroid' },
    ],
    variantOptions: [
      { id: 'abdomen',  label: 'Abdomen',           prepNote: 'Fast for 4–6 hours',     priceFrom: 99  },
      { id: 'pelvis',   label: 'Pelvis',             prepNote: 'Full bladder required',   priceFrom: 99  },
      { id: 'thyroid',  label: 'Thyroid',            prepNote: 'No preparation needed',   priceFrom: 109 },
      { id: 'breast',   label: 'Breast',             prepNote: 'No preparation needed',   priceFrom: 149 },
      { id: 'doppler',  label: 'Doppler / Vascular', prepNote: 'No preparation needed',   priceFrom: 149 },
      { id: 'msk',      label: 'Musculoskeletal',    prepNote: 'No preparation needed',   priceFrom: 129 },
      { id: 'liver',    label: 'Liver',              prepNote: 'Fast for 4–6 hours',     priceFrom: 99  },
      { id: 'kidneys',  label: 'Kidneys',            prepNote: 'Drink water beforehand',  priceFrom: 99  },
      { id: 'scrotum',  label: 'Scrotum / Testes',  prepNote: 'No preparation needed',   priceFrom: 119 },
    ],
  },

  // ── 4. X-RAY ──────────────────────────────────────────────────────────────
  {
    id: 'xray',
    label: 'X-Ray',
    shortLabel: 'X-Ray',
    slug: 'x-ray',
    description: 'Quick bone and joint imaging. Results typically within 30 minutes.',
    icon: '🦴',
    visibilityStatus: 'visible',
    searchBehavior: 'body_part_driven',
    bookingTemplate: 'xray_standard',
    supportedFilters: ['body_part', 'laterality', 'location'],
    centreCapabilities: ['xray'],
    mobilePickerType: 'body_part_sheet',
    priceFrom: 75,
    reportHoursTypical: 24,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 4,
    bodyPartGroups: [
      { groupLabel: 'Head & Neck', parts: HEAD_NECK_PARTS.slice(0, 1) },
      { groupLabel: 'Spine', parts: SPINE_PARTS },
      { groupLabel: 'Upper Limb', parts: UPPER_LIMB_PARTS },
      { groupLabel: 'Lower Limb', parts: LOWER_LIMB_PARTS },
      { groupLabel: 'Chest & Abdomen', parts: TORSO_PARTS.slice(0, 2) },
    ],
  },

  // ── 5. MAMMOGRAM ──────────────────────────────────────────────────────────
  {
    id: 'mammogram',
    label: 'Mammogram',
    shortLabel: 'Mammogram',
    slug: 'mammogram',
    description: 'Private breast screening and diagnostic imaging. No GP referral required.',
    icon: '🩺',
    visibilityStatus: 'visible',
    searchBehavior: 'package_driven',
    bookingTemplate: 'mammogram',
    supportedFilters: ['package_type', 'location'],
    centreCapabilities: ['mammogram'],
    mobilePickerType: 'package_list',
    priceFrom: 175,
    reportHoursTypical: 48,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 5,
    packageOptions: [
      {
        id: 'screening',
        label: 'Screening Mammogram',
        description: 'Routine annual breast screening for women with no symptoms.',
        priceFrom: 175,
        includes: ['2D digital mammogram', 'Radiologist report', '48h results'],
      },
      {
        id: 'diagnostic',
        label: 'Diagnostic Mammogram',
        description: 'For women with breast symptoms or clinical concerns.',
        priceFrom: 225,
        includes: ['Full diagnostic mammogram', 'Radiologist report', '48h results'],
      },
      {
        id: 'tomo',
        label: '3D Mammogram (Tomosynthesis)',
        description: 'Superior to standard mammogram — detects more cancers, fewer false positives.',
        priceFrom: 275,
        includes: ['3D tomosynthesis', 'Radiologist report', '48h results'],
      },
      {
        id: 'combo',
        label: 'Mammogram + Ultrasound',
        description: 'Comprehensive breast assessment combining both modalities.',
        priceFrom: 349,
        includes: ['Mammogram', 'Breast ultrasound', 'Combined radiologist report'],
      },
    ],
  },

  // ── 6. PREGNANCY SCAN ─────────────────────────────────────────────────────
  {
    id: 'pregnancy',
    label: 'Pregnancy Scan',
    shortLabel: 'Pregnancy',
    slug: 'pregnancy-scan',
    description: 'Private pregnancy scans across all trimesters. Experienced sonographers, same-day results.',
    icon: '🤰',
    visibilityStatus: 'visible',
    searchBehavior: 'pathway_driven',
    bookingTemplate: 'pregnancy',
    supportedFilters: ['pathway', 'gestational_age', 'location'],
    centreCapabilities: ['pregnancy_scan'],
    mobilePickerType: 'pathway_chips',
    priceFrom: 89,
    reportHoursTypical: 1,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 6,
    pathwayOptions: [
      {
        id: 'early',
        label: 'Early Pregnancy',
        description: 'Reassurance and confirmation of pregnancy.',
        ageRange: '6–10 weeks',
        priceFrom: 89,
      },
      {
        id: 'dating',
        label: 'Dating Scan',
        description: 'Confirm gestational age and due date.',
        ageRange: '10–14 weeks',
        priceFrom: 99,
      },
      {
        id: 'anomaly',
        label: 'Anomaly / Morphology Scan',
        description: 'Detailed structural assessment of baby.',
        ageRange: '18–22 weeks',
        priceFrom: 149,
      },
      {
        id: 'growth',
        label: 'Growth & Wellbeing Scan',
        description: 'Monitor baby\'s growth and position.',
        ageRange: '24–40 weeks',
        priceFrom: 119,
      },
      {
        id: 'reassurance',
        label: 'Reassurance Scan',
        description: 'Peace of mind scan if you have concerns.',
        ageRange: 'Any trimester',
        priceFrom: 89,
      },
    ],
  },

  // ── 7. BABY SCAN ──────────────────────────────────────────────────────────
  {
    id: 'baby-scan',
    label: 'Baby Scan',
    shortLabel: 'Baby',
    slug: 'baby-scan',
    description: 'Bonding, gender reveal and 4D scans. Memorable experience packages available.',
    icon: '👶',
    visibilityStatus: 'visible',
    searchBehavior: 'pathway_driven',
    bookingTemplate: 'baby_scan',
    supportedFilters: ['pathway', 'gestational_age', 'location'],
    centreCapabilities: ['baby_scan'],
    mobilePickerType: 'pathway_chips',
    priceFrom: 79,
    reportHoursTypical: 0,
    requiresReferral: false,
    showOnHomepage: true,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: true,
    sortOrder: 7,
    homepagePopularLinks: [
      { label: 'Baby Scan', prefilter: '' },
      { label: '4D Baby Scan', prefilter: '4d' },
      { label: 'Gender Scan', prefilter: 'gender' },
    ],
    pathwayOptions: [
      {
        id: 'early',
        label: 'Early Reassurance',
        description: 'See your baby\'s heartbeat for the first time.',
        ageRange: '6–14 weeks',
        durationHint: '~20 min',
        priceFrom: 79,
      },
      {
        id: 'dating',
        label: 'Dating Scan',
        description: 'Confirm your due date.',
        ageRange: '10–14 weeks',
        durationHint: '~20 min',
        priceFrom: 89,
      },
      {
        id: 'gender',
        label: 'Gender Reveal Scan',
        description: 'Find out if it\'s a boy or a girl.',
        ageRange: '16+ weeks',
        durationHint: '~20 min',
        priceFrom: 79,
      },
      {
        id: '3d',
        label: '3D Scan',
        description: 'Beautiful 3D images of your baby.',
        ageRange: '24–32 weeks',
        durationHint: '~30 min',
        priceFrom: 99,
      },
      {
        id: '4d',
        label: '4D / HD Live Scan',
        description: 'Moving video of your baby in real time.',
        ageRange: '26–32 weeks',
        durationHint: '~40 min',
        priceFrom: 149,
      },
      {
        id: 'growth',
        label: 'Growth Scan',
        description: 'Check baby\'s size and position.',
        ageRange: '28–40 weeks',
        durationHint: '~30 min',
        priceFrom: 119,
      },
    ],
  },

  // ── 8. DEXA ───────────────────────────────────────────────────────────────
  {
    id: 'dexa',
    label: 'DEXA Scan',
    shortLabel: 'DEXA',
    slug: 'dexa',
    description: 'Bone density and body composition scanning. Essential for osteoporosis assessment.',
    icon: '🦷',
    visibilityStatus: 'coming_soon',
    searchBehavior: 'package_driven',
    bookingTemplate: 'dexa',
    supportedFilters: ['package_type', 'location'],
    centreCapabilities: ['dexa'],
    mobilePickerType: 'package_list',
    priceFrom: 149,
    reportHoursTypical: 48,
    requiresReferral: false,
    showOnHomepage: false,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: false,
    sortOrder: 8,
    packageOptions: [
      {
        id: 'bone_density',
        label: 'Bone Density Scan',
        description: 'Lumbar spine and hip — gold standard osteoporosis test.',
        priceFrom: 149,
        includes: ['Spine + hip measurement', 'T-score & Z-score', 'Radiologist report'],
      },
      {
        id: 'body_comp',
        label: 'Body Composition Scan',
        description: 'Detailed breakdown of muscle, fat and bone mass.',
        priceFrom: 175,
        includes: ['Full body composition', 'Fat mass %', 'Lean mass analysis'],
      },
      {
        id: 'dexa_screening',
        label: 'DEXA Screening Package',
        description: 'Bone density + body composition combined.',
        priceFrom: 249,
        includes: ['Bone density', 'Body composition', 'Lifestyle report'],
      },
    ],
  },

  // ── 9. DENTAL ─────────────────────────────────────────────────────────────
  {
    id: 'dental',
    label: 'Dental Imaging',
    shortLabel: 'Dental',
    slug: 'dental',
    description: 'OPG, cephalometric and 3D CBCT dental scans.',
    icon: '🦷',
    visibilityStatus: 'coming_soon',
    searchBehavior: 'variant_driven',
    bookingTemplate: 'dental',
    supportedFilters: ['variant', 'location'],
    centreCapabilities: ['dental_xray', 'dental_cbct'],
    mobilePickerType: 'variant_grid',
    priceFrom: 65,
    reportHoursTypical: 48,
    requiresReferral: false,
    showOnHomepage: false,
    showInServicesNav: true,
    showInCentresFilter: true,
    showInBookDropdown: false,
    sortOrder: 9,
    variantOptions: [
      { id: 'opg',          label: 'OPG (Panoramic)',        prepNote: 'Remove jewellery', priceFrom: 65  },
      { id: 'ceph',         label: 'Cephalometric (Lateral)', prepNote: 'Remove jewellery', priceFrom: 75  },
      { id: 'cbct_single',  label: 'CBCT — Single Arch',     prepNote: 'Remove jewellery', priceFrom: 145 },
      { id: 'cbct_full',    label: 'CBCT — Full Jaw',        prepNote: 'Remove jewellery', priceFrom: 195 },
    ],
  },
]

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getScanType(id: string): ScanTypeConfig | undefined {
  return SCAN_TYPES.find(s => s.id === id)
}

export function getVisibleScanTypes(): ScanTypeConfig[] {
  return SCAN_TYPES.filter(s => s.visibilityStatus === 'visible').sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getNavScanTypes(): ScanTypeConfig[] {
  return SCAN_TYPES.filter(s => s.showInServicesNav).sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getCentresFilterScanTypes(): ScanTypeConfig[] {
  return SCAN_TYPES.filter(s => s.showInCentresFilter).sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getBookDropdownScanTypes(): ScanTypeConfig[] {
  return SCAN_TYPES.filter(s => s.showInBookDropdown).sort((a, b) => a.sortOrder - b.sortOrder)
}

export function getHomepagePopularLinks(): { label: string; href: string }[] {
  return SCAN_TYPES.filter(s => s.showOnHomepage && s.homepagePopularLinks)
    .flatMap(s =>
      (s.homepagePopularLinks ?? []).map(link => ({
        label: link.label,
        href: link.prefilter
          ? `/search?type=${s.id}&part=${link.prefilter}`
          : `/search?type=${s.id}`,
      }))
    )
}

// Returns the adaptive search behavior for a given scan type
// Used by <SearchBar /> to decide which UI to render
export function getSearchBehavior(scanTypeId: string): SearchBehavior | null {
  return getScanType(scanTypeId)?.searchBehavior ?? null
}
