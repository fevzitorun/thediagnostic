// ScanBook — City Page Content
// Used by /mri-scan/[city], /ct-scan/[city], /ultrasound/[city], etc.

export interface CityData {
  slug: string
  name: string
  region: string
  areas: string[]           // Districts / postcodes
  nhsWait: string           // Localised NHS wait message
  clinicCount: string       // "10+" etc — generic until real data
  population: string        // Rough population for meta
  landmarks: string[]       // Notable areas to mention
}

export const CITIES: CityData[] = [
  {
    slug: 'london',
    name: 'London',
    region: 'Greater London',
    areas: ['Central London', 'North London', 'South London', 'East London', 'West London', 'Canary Wharf', 'Harley Street', 'City of London'],
    nhsWait: 'NHS imaging waiting times in London average 14–18 weeks for MRI and 8–12 weeks for CT.',
    clinicCount: '15+',
    population: '9 million',
    landmarks: ['Harley Street', 'Central London', 'the City'],
  },
  {
    slug: 'manchester',
    name: 'Manchester',
    region: 'Greater Manchester',
    areas: ['City Centre', 'Salford', 'Stretford', 'Didsbury', 'Stockport', 'Trafford', 'Bury', 'Bolton'],
    nhsWait: 'NHS imaging waits in Greater Manchester are among the longest in England, often exceeding 16 weeks for MRI.',
    clinicCount: '6+',
    population: '560,000',
    landmarks: ['the city centre', 'MediaCityUK', 'Salford'],
  },
  {
    slug: 'birmingham',
    name: 'Birmingham',
    region: 'West Midlands',
    areas: ['City Centre', 'Edgbaston', 'Solihull', 'Sutton Coldfield', 'Coventry Road', 'Jewellery Quarter'],
    nhsWait: 'NHS imaging waiting lists in the West Midlands regularly exceed 12 weeks for routine scans.',
    clinicCount: '5+',
    population: '1.1 million',
    landmarks: ['the city centre', 'Edgbaston', 'Solihull'],
  },
  {
    slug: 'leeds',
    name: 'Leeds',
    region: 'West Yorkshire',
    areas: ['City Centre', 'Headingley', 'Roundhay', 'Harrogate Road', 'Pudsey', 'Morley'],
    nhsWait: 'NHS waiting times for imaging in West Yorkshire regularly exceed 12–16 weeks.',
    clinicCount: '4+',
    population: '800,000',
    landmarks: ['the city centre', 'Headingley', 'Harrogate'],
  },
  {
    slug: 'bristol',
    name: 'Bristol',
    region: 'South West England',
    areas: ['City Centre', 'Clifton', 'Redland', 'Kingswood', 'Stoke Bishop', 'Bedminster'],
    nhsWait: 'NHS imaging waits in the Bristol area typically run 10–14 weeks for MRI.',
    clinicCount: '4+',
    population: '470,000',
    landmarks: ['Clifton', 'the city centre', 'the Harbourside'],
  },
  {
    slug: 'edinburgh',
    name: 'Edinburgh',
    region: 'Scotland',
    areas: ['City Centre', 'Leith', 'Morningside', 'Stockbridge', 'Portobello', 'Corstorphine'],
    nhsWait: 'NHS Scotland imaging waiting times regularly exceed 12 weeks for MRI in Edinburgh.',
    clinicCount: '3+',
    population: '540,000',
    landmarks: ['the Old Town', 'Morningside', 'Leith'],
  },
  {
    slug: 'glasgow',
    name: 'Glasgow',
    region: 'Scotland',
    areas: ['City Centre', 'West End', 'Southside', 'Merchant City', 'Partick', 'Shawlands'],
    nhsWait: 'NHS Scotland imaging waits in Greater Glasgow regularly exceed 14 weeks.',
    clinicCount: '4+',
    population: '635,000',
    landmarks: ['the West End', 'the city centre', 'Southside'],
  },
  {
    slug: 'liverpool',
    name: 'Liverpool',
    region: 'Merseyside',
    areas: ['City Centre', 'Wirral', 'Childwall', 'Woolton', 'Allerton', 'Aigburth'],
    nhsWait: 'NHS imaging waits in Merseyside often exceed 12–16 weeks for routine MRI.',
    clinicCount: '3+',
    population: '500,000',
    landmarks: ['the city centre', 'the Wirral', 'South Liverpool'],
  },
  {
    slug: 'sheffield',
    name: 'Sheffield',
    region: 'South Yorkshire',
    areas: ['City Centre', 'Ecclesall Road', 'Fulwood', 'Dore', 'Meadowhead', 'Rotherham'],
    nhsWait: 'NHS imaging waits in South Yorkshire regularly reach 14 weeks for MRI.',
    clinicCount: '3+',
    population: '580,000',
    landmarks: ['the city centre', 'Fulwood', 'Ecclesall Road'],
  },
  {
    slug: 'nottingham',
    name: 'Nottingham',
    region: 'East Midlands',
    areas: ['City Centre', 'West Bridgford', 'Beeston', 'Radcliffe on Trent', 'Arnold', 'Mapperley'],
    nhsWait: 'NHS imaging waiting times in Nottingham exceed 12 weeks for most MRI scans.',
    clinicCount: '3+',
    population: '330,000',
    landmarks: ['the city centre', 'West Bridgford', 'Beeston'],
  },
  {
    slug: 'cardiff',
    name: 'Cardiff',
    region: 'Wales',
    areas: ['City Centre', 'Pontcanna', 'Roath', 'Whitchurch', 'Penarth', 'Barry'],
    nhsWait: 'NHS Wales imaging waiting times in Cardiff regularly exceed 16 weeks.',
    clinicCount: '3+',
    population: '370,000',
    landmarks: ['the city centre', 'Pontcanna', 'the Bay'],
  },
  {
    slug: 'newcastle',
    name: 'Newcastle',
    region: 'North East England',
    areas: ['City Centre', 'Jesmond', 'Gosforth', 'Gateshead', 'Sunderland', 'Durham'],
    nhsWait: 'NHS imaging waits in the North East average 12–16 weeks for routine MRI.',
    clinicCount: '3+',
    population: '300,000',
    landmarks: ['Jesmond', 'Gosforth', 'the Quayside'],
  },
  {
    slug: 'brighton',
    name: 'Brighton',
    region: 'East Sussex',
    areas: ['City Centre', 'Hove', 'Kemptown', 'Preston Park', 'Lewes', 'Worthing'],
    nhsWait: 'NHS imaging waits in Sussex reach 12–14 weeks for most scan types.',
    clinicCount: '3+',
    population: '290,000',
    landmarks: ['Hove', 'the seafront', 'the city centre'],
  },
  {
    slug: 'oxford',
    name: 'Oxford',
    region: 'Oxfordshire',
    areas: ['City Centre', 'Headington', 'Cowley', 'Summertown', 'Abingdon', 'Witney'],
    nhsWait: 'Despite the presence of the John Radcliffe, NHS imaging waits in Oxford regularly exceed 12 weeks for non-urgent scans.',
    clinicCount: '3+',
    population: '160,000',
    landmarks: ['Headington', 'Summertown', 'Abingdon'],
  },
  {
    slug: 'cambridge',
    name: 'Cambridge',
    region: 'Cambridgeshire',
    areas: ['City Centre', 'Trumpington', 'Cherry Hinton', 'Ely', 'St Ives', 'Huntingdon'],
    nhsWait: 'NHS imaging waiting times in Cambridgeshire regularly exceed 12 weeks.',
    clinicCount: '2+',
    population: '130,000',
    landmarks: ['the city centre', 'Trumpington', 'Ely'],
  },
]

export interface CityPageConfig {
  scanType: 'mri' | 'ct' | 'ultrasound' | 'xray' | 'pregnancy' | 'baby-scan'
  scanName: string       // "MRI Scan"
  scanSlug: string       // for /services/mri-scan link
  priceFrom: number
  reportTime: string
  radiationFree: boolean
  duration: string
  searchParam: string    // for /search?type=X&location=Y
  keyConditions: string[]
  keyFaqs: { q: string; a: string }[]
}

export const CITY_SCAN_CONFIGS: Record<string, CityPageConfig> = {
  'mri-scan': {
    scanType: 'mri',
    scanName: 'MRI Scan',
    scanSlug: 'mri-scan',
    priceFrom: 275,
    reportTime: '48 hours',
    radiationFree: true,
    duration: '20–60 minutes',
    searchParam: 'mri',
    keyConditions: ['Joint & sports injuries', 'Back pain & disc problems', 'Neurological assessment', 'Organ & soft tissue imaging'],
    keyFaqs: [
      { q: 'Do I need a GP referral for a private MRI scan?', a: 'No. You can self-refer and book directly through ScanBook without seeing a GP first.' },
      { q: 'How quickly can I get an MRI appointment?', a: 'Most of our partner centres offer appointments within 2–5 working days. Availability varies by centre and scan type.' },
      { q: 'Is the MRI scan included in my report price?', a: 'Yes. Your ScanBook price includes the scan, the radiographer\'s time, and a written report from a UK consultant radiologist.' },
    ],
  },
  'ct-scan': {
    scanType: 'ct',
    scanName: 'CT Scan',
    scanSlug: 'ct-scan',
    priceFrom: 185,
    reportTime: '48 hours',
    radiationFree: false,
    duration: '10–30 minutes',
    searchParam: 'ct',
    keyConditions: ['Chest & lung conditions', 'Abdominal investigation', 'Vascular assessment', 'Bone & trauma'],
    keyFaqs: [
      { q: 'Do I need a referral for a private CT scan?', a: 'No. You can book a private CT scan through ScanBook without a GP referral.' },
      { q: 'Is CT safe?', a: 'CT uses ionising radiation, but modern scanners minimise dose. The benefits of diagnosis usually far outweigh the small radiation risk.' },
    ],
  },
  'ultrasound': {
    scanType: 'ultrasound',
    scanName: 'Ultrasound Scan',
    scanSlug: 'ultrasound',
    priceFrom: 99,
    reportTime: '24 hours',
    radiationFree: true,
    duration: '20–40 minutes',
    searchParam: 'ultrasound',
    keyConditions: ['Abdominal & digestive organs', 'Pelvic assessment', 'Thyroid & neck', 'Breast & vascular'],
    keyFaqs: [
      { q: 'Do I need to fast before an ultrasound?', a: 'For abdominal scans, fasting for 4–6 hours beforehand improves image quality. Other scan types require no preparation.' },
      { q: 'Can I get results on the day?', a: 'The sonographer shares initial findings during your scan. A written radiologist report is typically available within 24 hours.' },
    ],
  },
  'pregnancy-scan': {
    scanType: 'pregnancy',
    scanName: 'Pregnancy Scan',
    scanSlug: 'pregnancy-scan',
    priceFrom: 89,
    reportTime: 'Same day',
    radiationFree: true,
    duration: '20–45 minutes',
    searchParam: 'pregnancy',
    keyConditions: ['Early pregnancy confirmation', 'Dating & nuchal assessment', 'Anomaly / morphology scan', 'Growth & wellbeing scans'],
    keyFaqs: [
      { q: 'How early can I have a private pregnancy scan?', a: 'From 6 weeks gestation. A heartbeat is usually visible from 7 weeks on an abdominal scan.' },
      { q: 'Do I need a referral for a private pregnancy scan?', a: 'No. Book directly through ScanBook at any stage of pregnancy.' },
    ],
  },
  'baby-scan': {
    scanType: 'baby-scan',
    scanName: 'Baby Scan',
    scanSlug: 'baby-scan',
    priceFrom: 79,
    reportTime: 'Same day',
    radiationFree: true,
    duration: '20–45 minutes',
    searchParam: 'baby-scan',
    keyConditions: ['Heartbeat confirmation', 'Gender reveal from 16 weeks', '3D baby scan', '4D HD Live video'],
    keyFaqs: [
      { q: 'When is the best time for a 4D baby scan?', a: '26–30 weeks is optimal. Baby has enough fat for clear facial images but still has space to move.' },
      { q: 'Can I find out the gender?', a: 'Yes, from 16 weeks onwards. We achieve over 95% gender accuracy.' },
    ],
  },
  'x-ray': {
    scanType: 'xray',
    scanName: 'X-Ray',
    scanSlug: 'x-ray',
    priceFrom: 75,
    reportTime: 'Same day',
    radiationFree: false,
    duration: '10–20 minutes',
    searchParam: 'xray',
    keyConditions: ['Fractures & trauma', 'Arthritis & joint assessment', 'Chest & lung conditions', 'Spinal assessment'],
    keyFaqs: [
      { q: 'Do I need a referral for a private X-ray?', a: 'No. Book directly through ScanBook without seeing a GP first.' },
      { q: 'How quickly will I get my report?', a: 'Images are reviewed by a UK consultant radiologist and a written report is available same day in most cases.' },
      { q: 'Is X-ray radiation safe?', a: 'X-ray uses a very small amount of ionising radiation — a chest X-ray is equivalent to roughly 2.5 days of background radiation. The diagnostic benefit far outweighs any risk for most patients.' },
    ],
  },
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getCity(slug: string): CityData | undefined {
  return CITIES.find(c => c.slug === slug)
}

export function getAllCitySlugs(): string[] {
  return CITIES.map(c => c.slug)
}

export function getCityScanConfig(scanRouteKey: string): CityPageConfig | undefined {
  return CITY_SCAN_CONFIGS[scanRouteKey]
}

export const ALL_CITY_SLUGS = new Set(CITIES.map(c => c.slug))
