// ScanBook — Service Page Content Data
// Used by /services (index) and /services/[slug] (individual pages)

export interface ServiceFaq { q: string; a: string }
export interface ServiceStep { step: number; title: string; desc: string }
export interface ServiceUseCase { icon: string; title: string; desc: string }
export interface ServiceVariant { id: string; label: string; prepNote: string; priceFrom: number }
export interface ServicePathway { id: string; label: string; desc: string; ageRange?: string; durationHint?: string; priceFrom: number }
export interface ServicePackage { id: string; label: string; desc: string; priceFrom: number; includes: string[] }
export interface ServiceBodyPart { name: string; slug: string }
export interface ServiceBodyGroup { group: string; parts: ServiceBodyPart[] }

export interface ServiceContent {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  priceFrom: number
  reportHours: string
  scanDuration: string
  radiationFree: boolean
  requiresReferral: boolean
  icon: string
  accentColor: string
  type: 'body_part' | 'variant' | 'pathway' | 'package'
  whatIs: { text: string; keyFacts: string[] }
  whoNeedsIt: ServiceUseCase[]
  preparation: string[]
  whatToExpect: ServiceStep[]
  faqs: ServiceFaq[]
  relatedSlugs: string[]
  bodyPartGroups?: ServiceBodyGroup[]
  variants?: ServiceVariant[]
  pathways?: ServicePathway[]
  packages?: ServicePackage[]
}

export const SERVICES: ServiceContent[] = [

  // ── MRI SCAN ────────────────────────────────────────────────────────────────
  {
    slug: 'mri-scan',
    name: 'MRI Scan',
    shortName: 'MRI',
    tagline: 'No GP referral. Results within 48 hours.',
    description: 'High-resolution soft tissue imaging using magnetic fields — no radiation. The gold standard for joints, spine, brain and organ assessment.',
    priceFrom: 275,
    reportHours: '48 hours',
    scanDuration: '20–60 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '🧠',
    accentColor: '#0F4C81',
    type: 'body_part',
    whatIs: {
      text: "MRI (Magnetic Resonance Imaging) uses powerful magnetic fields and radio waves to produce detailed images of the body\'s internal structures — without any ionising radiation. It excels at imaging soft tissues: muscles, ligaments, tendons, cartilage, the brain, spinal cord, and abdominal organs. Unlike X-rays or CT, MRI can see subtle differences between different types of soft tissue, making it invaluable for diagnosing sports injuries, neurological conditions, and joint pathology.\n\nA typical MRI scan takes 20–60 minutes depending on the area being scanned. You'll lie still inside a large, tunnel-shaped scanner while it takes thousands of cross-sectional images. A consultant radiologist then analyses these images and produces a written report — usually within 48 hours.",
      keyFacts: [
        'No ionising radiation — safe for repeat imaging',
        'Superior soft tissue contrast vs CT and X-ray',
        'No GP referral required',
        'Results reported by a consultant radiologist within 48 hours',
        '3T high-field scanners available at selected centres',
      ],
    },
    whoNeedsIt: [
      { icon: '🏃', title: 'Sports injuries', desc: 'Ligament tears, cartilage damage, tendinopathy and stress fractures.' },
      { icon: '🦴', title: 'Joint & back pain', desc: 'Disc herniation, spinal stenosis, arthritis, labral tears.' },
      { icon: '🧠', title: 'Neurological symptoms', desc: 'Headaches, dizziness, numbness, suspected MS or stroke.' },
      { icon: '🔍', title: 'Unexplained symptoms', desc: 'Abdominal masses, pelvic pain, abnormal blood tests.' },
      { icon: '📋', title: 'Second opinion', desc: 'Seeking clarity on an existing diagnosis or surgical plan.' },
      { icon: '🩺', title: 'Health screening', desc: 'Full body MRI for proactive health monitoring.' },
    ],
    preparation: [
      'Remove all metal items including jewellery, piercings, and hair clips before your appointment.',
      'Inform the radiographer of any implants, pacemakers, cochlear implants, or metal surgical clips.',
      'Most MRI scans require no fasting — you can eat and drink normally unless told otherwise.',
      'Wear comfortable, loose-fitting clothing or a gown will be provided.',
      'If you experience claustrophobia, contact us in advance — open MRI and sedation options are available.',
    ],
    whatToExpect: [
      { step: 1, title: 'Safety questionnaire', desc: 'Complete a short MRI safety form to identify any contraindications such as metal implants or pacemakers.' },
      { step: 2, title: 'Positioning', desc: 'The radiographer will position you on the scanner table. A coil (receiver) is placed around the area being scanned.' },
      { step: 3, title: 'The scan', desc: 'You\'ll move into the scanner and need to remain still while it operates. You\'ll hear loud knocking sounds — earplugs are provided.' },
      { step: 4, title: 'Your report', desc: 'A consultant radiologist analyses the images and sends your written report to your ScanBook patient portal within 48 hours.' },
    ],
    faqs: [
      { q: 'Do I need a GP referral?', a: 'No. ScanBook allows you to self-refer for most MRI scans. You can book directly online without seeing a GP first.' },
      { q: 'Is MRI safe?', a: 'Yes. MRI uses no ionising radiation — it relies on magnetic fields and radio waves, which are completely safe for most people. It cannot be used if you have certain metal implants (pacemaker, cochlear implants, some vascular clips).' },
      { q: 'What if I\'m claustrophobic?', a: 'Tell us when booking. Many of our partner centres have wide-bore (70cm) scanners that feel less confined. Open MRI options are available at selected centres, and mild sedation can be arranged with your GP.' },
      { q: 'How soon will I get results?', a: 'Your consultant radiologist\'s written report is typically available within 48 hours of your scan and delivered to your ScanBook patient portal.' },
      { q: 'Can I bring someone with me?', a: 'Yes, a friend or family member can accompany you to the centre. They may not be able to enter the scanning room itself (due to the magnetic field) unless they also complete a safety check.' },
      { q: 'What\'s the difference between 1.5T and 3T MRI?', a: 'The "T" refers to Tesla — the strength of the magnetic field. 3T scanners produce higher resolution images and faster scans, which is useful for detailed brain, cardiac, or musculoskeletal work. 1.5T remains the standard for most clinical indications.' },
    ],
    relatedSlugs: ['ct-scan', 'ultrasound', 'full-body-mri'],
    bodyPartGroups: [
      {
        group: 'Head & Neck',
        parts: [
          { name: 'Brain / Head', slug: 'brain' },
          { name: 'Neck & Throat', slug: 'neck' },
          { name: 'Sinuses', slug: 'sinuses' },
        ],
      },
      {
        group: 'Spine & Back',
        parts: [
          { name: 'Cervical Spine (Neck)', slug: 'cervical-spine' },
          { name: 'Thoracic Spine (Mid Back)', slug: 'thoracic-spine' },
          { name: 'Lumbar Spine (Lower Back)', slug: 'lumbar-spine' },
        ],
      },
      {
        group: 'Upper Limb',
        parts: [
          { name: 'Shoulder', slug: 'shoulder' },
          { name: 'Elbow', slug: 'elbow' },
          { name: 'Wrist & Hand', slug: 'wrist-hand' },
        ],
      },
      {
        group: 'Lower Limb',
        parts: [
          { name: 'Hip', slug: 'hip' },
          { name: 'Knee', slug: 'knee' },
          { name: 'Ankle & Foot', slug: 'ankle-foot' },
        ],
      },
      {
        group: 'Chest & Abdomen',
        parts: [
          { name: 'Chest / Thorax', slug: 'chest' },
          { name: 'Abdomen', slug: 'abdomen' },
          { name: 'Pelvis', slug: 'pelvis' },
        ],
      },
    ],
  },

  // ── CT SCAN ─────────────────────────────────────────────────────────────────
  {
    slug: 'ct-scan',
    name: 'CT Scan',
    shortName: 'CT',
    tagline: 'Fast cross-sectional imaging. Results within 48 hours.',
    description: 'Computed tomography produces detailed cross-sectional images of bones, blood vessels and organs. Faster than MRI, ideal for chest, abdomen and vascular assessment.',
    priceFrom: 185,
    reportHours: '48 hours',
    scanDuration: '10–30 minutes',
    radiationFree: false,
    requiresReferral: false,
    icon: '🔬',
    accentColor: '#0A3A66',
    type: 'body_part',
    whatIs: {
      text: "CT (Computed Tomography) — also called a CAT scan — uses X-rays taken from multiple angles around the body, processed by a computer to create detailed cross-sectional images. It is faster than MRI (often under 10 minutes) and excellent at imaging bones, blood vessels, lungs, and abdominal organs.\n\nCT is particularly useful for diagnosing chest and abdominal conditions, detecting internal injuries, and planning surgery. Some CT scans use an injected contrast agent (a dye) to improve visibility of blood vessels and organs. While CT does involve ionising radiation, modern scanners are highly efficient and doses are carefully managed.",
      keyFacts: [
        'Faster than MRI — scan completed in under 30 minutes',
        'Excellent for chest, lung, abdomen and vascular imaging',
        'Uses low-dose ionising radiation',
        'Contrast dye available for vascular and organ assessment',
        'No GP referral required',
      ],
    },
    whoNeedsIt: [
      { icon: '💨', title: 'Respiratory symptoms', desc: 'Persistent cough, breathlessness, suspected pulmonary embolism.' },
      { icon: '🫀', title: 'Cardiac assessment', desc: 'Coronary artery calcium scoring, CT coronary angiography.' },
      { icon: '🔍', title: 'Abdominal investigation', desc: 'Unexplained abdominal pain, suspected masses, bowel issues.' },
      { icon: '🦴', title: 'Bone & fracture assessment', desc: 'Complex fractures, bone tumours, spinal pathology.' },
      { icon: '🩸', title: 'Vascular conditions', desc: 'Aneurysm monitoring, carotid stenosis, venous thrombosis.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Detailed anatomical mapping before interventional procedures.' },
    ],
    preparation: [
      'You may be asked to fast for 4–6 hours before CT scans involving contrast dye.',
      'Inform the radiographer of any allergies, particularly to iodine or previous contrast reactions.',
      'Remove metal objects — jewellery, belts and some clothing may need to be removed.',
      'If you are or might be pregnant, inform the centre immediately before booking.',
      'Drink plenty of water after your scan if contrast dye was used to aid kidney clearance.',
    ],
    whatToExpect: [
      { step: 1, title: 'Check in & preparation', desc: 'You\'ll complete a short questionnaire about allergies and medical history. If contrast is needed, a cannula is inserted into a vein.' },
      { step: 2, title: 'Positioning', desc: 'You\'ll lie on the CT table. The radiographer explains what will happen and positions you correctly for the scan.' },
      { step: 3, title: 'The scan', desc: 'The table moves through the CT ring while it rotates around you. It\'s completely painless. The whole scan typically takes 5–15 minutes.' },
      { step: 4, title: 'Your report', desc: 'A consultant radiologist produces your written report, usually within 48 hours, delivered to your ScanBook portal.' },
    ],
    faqs: [
      { q: 'Is CT safe — how much radiation is involved?', a: 'Modern CT scanners use significantly less radiation than older machines. A chest CT is roughly equivalent to 1–2 years of background radiation. Your radiographer follows strict "as low as reasonably achievable" (ALARA) principles.' },
      { q: 'What is contrast dye and is it safe?', a: 'Contrast dye (iodine-based) is injected to enhance blood vessels and certain organs. It\'s generally very safe but can cause rare allergic reactions. Inform us of any previous contrast reactions or iodine allergies.' },
      { q: 'How long does a CT scan take?', a: 'The scanning itself takes just 5–15 minutes. Allow 30–60 minutes total for the appointment including preparation and post-scan monitoring if contrast was used.' },
      { q: 'Can I drive after a CT scan?', a: 'Yes, in most cases. If you were given sedation (rarely required), you\'ll need someone to drive you home.' },
      { q: 'Do I need a GP referral?', a: 'No. You can self-refer for most CT scans via ScanBook. Some complex or high-radiation scans may require clinical justification.' },
      { q: 'What\'s the difference between CT and MRI?', a: 'CT is faster and better for bones, lungs and emergency assessment. MRI provides better soft tissue detail without radiation but takes longer. The right choice depends on what your clinician needs to see.' },
    ],
    relatedSlugs: ['mri-scan', 'cardiac-ct', 'ultrasound'],
    bodyPartGroups: [
      {
        group: 'Head & Neck',
        parts: [
          { name: 'Brain / Head', slug: 'brain' },
          { name: 'Neck & Sinuses', slug: 'neck' },
        ],
      },
      {
        group: 'Spine',
        parts: [
          { name: 'Cervical Spine (Neck)', slug: 'cervical-spine' },
          { name: 'Thoracic Spine', slug: 'thoracic-spine' },
          { name: 'Lumbar Spine', slug: 'lumbar-spine' },
        ],
      },
      {
        group: 'Chest',
        parts: [
          { name: 'Chest / Lungs / Thorax', slug: 'chest' },
          { name: 'Coronary Arteries (CTCA)', slug: 'cardiac' },
          { name: 'Pulmonary Embolism (CTPA)', slug: 'chest' },
        ],
      },
      {
        group: 'Abdomen & Pelvis',
        parts: [
          { name: 'Abdomen', slug: 'abdomen' },
          { name: 'Pelvis', slug: 'pelvis' },
          { name: 'Abdomen & Pelvis (combined)', slug: 'abdomen-pelvis' },
          { name: 'Kidneys & Urinary Tract', slug: 'kidneys' },
        ],
      },
    ],
  },

  // ── ULTRASOUND ──────────────────────────────────────────────────────────────
  {
    slug: 'ultrasound',
    name: 'Ultrasound Scan',
    shortName: 'Ultrasound',
    tagline: 'Real-time imaging. No radiation. Results same day.',
    description: 'Diagnostic ultrasound uses sound waves to produce real-time images of organs and soft tissues. Completely radiation-free and ideal for abdomen, pelvis, thyroid and vascular assessment.',
    priceFrom: 99,
    reportHours: '24 hours',
    scanDuration: '20–40 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '🔊',
    accentColor: '#1E40AF',
    type: 'variant',
    whatIs: {
      text: "Ultrasound imaging uses high-frequency sound waves to create real-time images of the body\'s internal structures. Unlike MRI and CT, there is no ionising radiation — making it the preferred choice for assessing abdominal organs, pelvic structures, vascular blood flow, and soft tissue masses.\n\nA sonographer applies a small amount of gel to the skin and moves a transducer (probe) over the area. The sound waves bounce back from internal structures to create live images on screen. Most ultrasound scans are painless and take 20–40 minutes. Results are often available immediately, with a written radiologist report typically within 24 hours.",
      keyFacts: [
        'Zero radiation — safe for all patients including pregnant women',
        'Real-time imaging — results often discussed immediately',
        'No injection or contrast agent required for most scans',
        'Written radiologist report within 24 hours',
        'Wide range of areas: abdomen, pelvis, thyroid, breast, vascular',
      ],
    },
    whoNeedsIt: [
      { icon: '🔍', title: 'Abdominal symptoms', desc: 'Pain, bloating, gallstones, liver disease, kidney stones.' },
      { icon: '🩺', title: 'Pelvic conditions', desc: 'Ovarian cysts, fibroids, bladder assessment, pelvic pain.' },
      { icon: '🦋', title: 'Thyroid assessment', desc: 'Nodules, goitre, hyperthyroidism investigation.' },
      { icon: '💗', title: 'Breast lumps', desc: 'Breast mass characterisation, cysts vs solid lesions.' },
      { icon: '🩸', title: 'Vascular conditions', desc: 'DVT, varicose veins, carotid artery, aneurysm screening.' },
      { icon: '🏃', title: 'Musculoskeletal', desc: 'Tendon tears, bursa, soft tissue masses, guided injections.' },
    ],
    preparation: [
      'For abdominal scans: fast (no food or drink except water) for 4–6 hours before your appointment.',
      'For pelvic scans: arrive with a full bladder — drink 1 litre of water 1 hour before and don\'t urinate.',
      'For thyroid, breast, MSK and vascular scans: no preparation is needed.',
      'Wear loose, comfortable clothing to allow easy access to the area being scanned.',
    ],
    whatToExpect: [
      { step: 1, title: 'Preparation check', desc: 'The sonographer confirms you\'ve followed any required preparation (fasting, full bladder) and explains the procedure.' },
      { step: 2, title: 'Gel & probe', desc: 'A warm gel is applied to the skin. The sonographer gently moves the probe over the area, taking measurements and recording images.' },
      { step: 3, title: 'Immediate feedback', desc: 'The sonographer may share initial findings with you during the scan. The scan typically takes 20–40 minutes.' },
      { step: 4, title: 'Written report', desc: 'A consultant radiologist reviews the images and your written report is delivered to your ScanBook portal within 24 hours.' },
    ],
    faqs: [
      { q: 'Is ultrasound safe?', a: 'Yes. Ultrasound uses sound waves, not radiation, and is completely safe for all patients — including pregnant women and children.' },
      { q: 'Will I need a full bladder?', a: 'Only for pelvic and lower abdominal scans. A full bladder creates an acoustic window for better imaging. For abdominal, thyroid, breast and MSK scans, no bladder preparation is needed.' },
      { q: 'Can ultrasound detect cancer?', a: 'Ultrasound can identify suspicious masses, cysts and structural abnormalities that may require further investigation. It\'s commonly used to characterise lesions found on physical examination or other imaging.' },
      { q: 'How soon will I get results?', a: 'The sonographer may share initial observations immediately after the scan. Your written radiologist report is typically delivered within 24 hours.' },
      { q: 'Is the gel cold?', a: 'We use warmed gel at most of our centres to make the experience more comfortable.' },
      { q: 'What if I need a transvaginal ultrasound?', a: 'A transvaginal ultrasound (internal probe) gives better images of the uterus and ovaries. The sonographer will explain the procedure and obtain your consent. You can decline at any time.' },
    ],
    relatedSlugs: ['mri-scan', 'pregnancy-scan', 'mammogram'],
    variants: [
      { id: 'abdomen',  label: 'Abdominal Ultrasound',   prepNote: 'Fast 4–6 hours beforehand',   priceFrom: 99  },
      { id: 'pelvis',   label: 'Pelvic Ultrasound',      prepNote: 'Full bladder required',        priceFrom: 99  },
      { id: 'thyroid',  label: 'Thyroid Ultrasound',     prepNote: 'No preparation needed',        priceFrom: 109 },
      { id: 'breast',   label: 'Breast Ultrasound',      prepNote: 'No preparation needed',        priceFrom: 149 },
      { id: 'doppler',  label: 'Doppler / Vascular',     prepNote: 'No preparation needed',        priceFrom: 149 },
      { id: 'msk',      label: 'Musculoskeletal (MSK)',  prepNote: 'No preparation needed',        priceFrom: 129 },
      { id: 'liver',    label: 'Liver Ultrasound',       prepNote: 'Fast 4–6 hours beforehand',    priceFrom: 99  },
      { id: 'kidneys',  label: 'Kidney Ultrasound',      prepNote: 'Drink water beforehand',       priceFrom: 99  },
      { id: 'scrotum',  label: 'Scrotal / Testicular',  prepNote: 'No preparation needed',        priceFrom: 119 },
    ],
  },

  // ── X-RAY ───────────────────────────────────────────────────────────────────
  {
    slug: 'x-ray',
    name: 'X-Ray',
    shortName: 'X-Ray',
    tagline: 'Same-day results. No GP referral required.',
    description: 'Fast, targeted bone and joint imaging. Private X-ray scans are available within days, with radiologist-reported results the same day.',
    priceFrom: 75,
    reportHours: '24 hours',
    scanDuration: '10–20 minutes',
    radiationFree: false,
    requiresReferral: false,
    icon: '🦴',
    accentColor: '#374151',
    type: 'body_part',
    whatIs: {
      text: "X-ray (radiography) is the fastest and most accessible form of medical imaging. It uses a low dose of ionising radiation to produce images of bones and dense structures within the body. X-rays are particularly effective for assessing fractures, joint alignment, lung conditions, and foreign body detection.\n\nA private X-ray appointment typically takes 10–20 minutes including positioning and the scan itself. Modern digital X-ray systems produce high-quality images instantly, and a consultant radiologist produces a written report — usually within 24 hours. Unlike NHS walk-in X-ray services, ScanBook appointments are booked in advance at a time of your choosing.",
      keyFacts: [
        'Fastest form of medical imaging — 10 minutes in scanner',
        'Very low radiation dose — comparable to a short flight',
        'Immediate digital images, report within 24 hours',
        'No contrast injection required',
        'No GP referral needed',
      ],
    },
    whoNeedsIt: [
      { icon: '🦴', title: 'Suspected fractures', desc: 'Falls, sports injuries, stress fractures not responding to treatment.' },
      { icon: '💨', title: 'Chest & lung conditions', desc: 'Persistent cough, chest pain, suspected pneumonia or effusion.' },
      { icon: '🦵', title: 'Joint assessment', desc: 'Arthritis severity, joint space narrowing, alignment before surgery.' },
      { icon: '🔍', title: 'Foreign bodies', desc: 'Ingested or embedded objects requiring localisation.' },
      { icon: '🏃', title: 'Sports injuries', desc: 'Avulsion fractures, bone spurs, periosteal reactions.' },
      { icon: '📋', title: 'Pre-operative checks', desc: 'Baseline bone assessment before orthopaedic procedures.' },
    ],
    preparation: [
      'Remove jewellery, belts and any metal objects in the area being scanned.',
      'Wear comfortable clothing — you may be asked to change into a gown.',
      'Inform the radiographer if you are or might be pregnant.',
      'No fasting or special preparation is required for standard X-ray.',
    ],
    whatToExpect: [
      { step: 1, title: 'Positioning', desc: 'The radiographer positions you to capture the clearest view of the area. Multiple positions (views) may be taken for a complete assessment.' },
      { step: 2, title: 'The scan', desc: 'You\'ll be asked to hold still for a few seconds while the image is captured. The procedure is completely painless.' },
      { step: 3, title: 'Image review', desc: 'The radiographer checks the digital images immediately to ensure they are clear and diagnostically useful.' },
      { step: 4, title: 'Written report', desc: 'A consultant radiologist interprets the images and delivers your report to your ScanBook portal within 24 hours.' },
    ],
    faqs: [
      { q: 'How much radiation is in an X-ray?', a: 'Very little. A chest X-ray exposes you to roughly the same radiation you\'d receive from 2–3 days of background radiation from your environment. Modern digital X-ray systems use the lowest dose possible.' },
      { q: 'Can I have an X-ray if I\'m pregnant?', a: 'Ideally, X-rays are avoided during pregnancy — particularly in the first trimester. If clinically urgent, the radiographer will take precautions to minimise foetal dose. Always inform the team if you may be pregnant.' },
      { q: 'How quickly will I get results?', a: 'Your digital images are produced immediately. A written radiologist report is typically available within 24 hours via your ScanBook patient portal.' },
      { q: 'Why choose private X-ray over NHS?', a: 'Private X-ray appointments are available within 1–2 days at a time of your choice. You receive a written radiologist report (not just images), and there\'s no need to wait for a GP referral.' },
      { q: 'Can an X-ray detect cancer?', a: 'X-ray can detect abnormalities that may suggest cancer (such as lung nodules or bone lesions), but it isn\'t specific enough to diagnose cancer on its own. Further imaging (CT or MRI) is usually required.' },
    ],
    relatedSlugs: ['mri-scan', 'ct-scan', 'ultrasound'],
    bodyPartGroups: [
      {
        group: 'Head & Neck',
        parts: [
          { name: 'Skull / Head', slug: 'brain' },
          { name: 'Facial Bones', slug: 'sinuses' },
        ],
      },
      {
        group: 'Spine',
        parts: [
          { name: 'Cervical Spine (Neck)', slug: 'cervical-spine' },
          { name: 'Thoracic Spine', slug: 'thoracic-spine' },
          { name: 'Lumbar Spine (Lower Back)', slug: 'lumbar-spine' },
        ],
      },
      {
        group: 'Upper Limb',
        parts: [
          { name: 'Shoulder', slug: 'shoulder' },
          { name: 'Elbow', slug: 'elbow' },
          { name: 'Wrist', slug: 'wrist-hand' },
          { name: 'Hand & Fingers', slug: 'wrist-hand' },
        ],
      },
      {
        group: 'Lower Limb',
        parts: [
          { name: 'Hip', slug: 'hip' },
          { name: 'Knee', slug: 'knee' },
          { name: 'Ankle', slug: 'ankle-foot' },
          { name: 'Foot & Toes', slug: 'ankle-foot' },
        ],
      },
      {
        group: 'Chest & Abdomen',
        parts: [
          { name: 'Chest / Lungs', slug: 'chest' },
          { name: 'Abdomen', slug: 'abdomen' },
        ],
      },
    ],
  },

  // ── MAMMOGRAM ───────────────────────────────────────────────────────────────
  {
    slug: 'mammogram',
    name: 'Mammogram',
    shortName: 'Mammogram',
    tagline: 'Private breast imaging. No GP referral.',
    description: 'Digital mammography for screening and diagnostic assessment. Rapid appointment times, radiologist-reported results within 48 hours, and consultant referral pathways available.',
    priceFrom: 175,
    reportHours: '48 hours',
    scanDuration: '20–30 minutes',
    radiationFree: false,
    requiresReferral: false,
    icon: '🩺',
    accentColor: '#9D174D',
    type: 'package',
    whatIs: {
      text: "A mammogram uses low-dose X-rays to create detailed images of breast tissue. It is the most effective tool for detecting breast cancer early — before a lump can be felt — and is recommended annually for women over 40 or those with increased risk due to family history or genetic factors.\n\nPrivate mammography appointments are typically available within 1–3 days. Our centres use digital mammography systems, and 3D tomosynthesis (which produces slice-by-slice images for improved accuracy) is available at selected sites. A consultant radiologist interprets every image and produces a written report within 48 hours.",
      keyFacts: [
        'Appointment typically within 1–3 days',
        'Digital mammography at all ScanBook centres',
        '3D tomosynthesis available at selected centres',
        'No GP referral required',
        'Radiologist report within 48 hours',
      ],
    },
    whoNeedsIt: [
      { icon: '📅', title: 'Annual screening', desc: 'Women 40+ seeking yearly breast health monitoring outside NHS screening age.' },
      { icon: '🧬', title: 'Family history', desc: 'First-degree relative with breast cancer or known BRCA mutation.' },
      { icon: '🔍', title: 'Breast symptoms', desc: 'Lump, nipple discharge, skin changes, or asymmetry.' },
      { icon: '📋', title: 'Monitoring', desc: 'Follow-up imaging after previous breast cancer treatment.' },
      { icon: '🩺', title: 'Dense breast tissue', desc: 'Supplementary screening for women with category C or D breast density.' },
    ],
    preparation: [
      'Schedule your appointment 1–2 weeks after your period when breasts are less tender.',
      'Do not apply deodorant, antiperspirant, powder or lotion to the breasts or underarms on the day of your scan — these can affect image quality.',
      'Wear a two-piece outfit for easy access — you\'ll be asked to undress from the waist up.',
      'Inform the team if you are pregnant, breastfeeding, or have breast implants.',
    ],
    whatToExpect: [
      { step: 1, title: 'Positioning', desc: 'You\'ll stand at the mammography machine. A radiographer positions each breast on the platform and gently compresses it using a paddle.' },
      { step: 2, title: 'Compression', desc: 'Compression is necessary to spread the tissue and produce a clear image. It lasts only a few seconds and may feel uncomfortable but not painful.' },
      { step: 3, title: 'Multiple views', desc: 'Usually two views of each breast are taken (top-to-bottom and side-on). The whole appointment takes 20–30 minutes.' },
      { step: 4, title: 'Radiologist report', desc: 'A consultant radiologist reviews your images and delivers a written report to your ScanBook portal within 48 hours.' },
    ],
    faqs: [
      { q: 'Does a mammogram hurt?', a: 'Compression is required for a clear image and may cause temporary discomfort, particularly if your breasts are tender. The compression lasts only a few seconds for each view.' },
      { q: 'How often should I have a mammogram?', a: 'Annual mammography is recommended from age 40–74 for average-risk women, and from age 30–35 for those with a significant family history or BRCA gene mutation.' },
      { q: 'What\'s the difference between screening and diagnostic mammography?', a: 'Screening mammography is for women with no symptoms — it\'s a routine check. Diagnostic mammography is for women with breast symptoms (lump, discharge, skin changes) and involves additional views and often ultrasound.' },
      { q: 'What is 3D tomosynthesis?', a: '3D mammography takes multiple images from different angles and reconstructs them into thin slices, improving detection of cancers in dense breast tissue and reducing false positives.' },
      { q: 'I have breast implants — can I still have a mammogram?', a: 'Yes. Inform the team in advance. Specialist implant displacement views are used to maximise the amount of breast tissue visible.' },
    ],
    relatedSlugs: ['ultrasound', 'mri-scan', 'dexa-scan'],
    packages: [
      {
        id: 'screening',
        label: 'Screening Mammogram',
        desc: 'Routine annual breast screening for women with no symptoms.',
        priceFrom: 175,
        includes: ['2D digital mammogram', 'Consultant radiologist report', 'Results within 48 hours'],
      },
      {
        id: 'diagnostic',
        label: 'Diagnostic Mammogram',
        desc: 'For women with breast symptoms or clinical concerns.',
        priceFrom: 225,
        includes: ['Full diagnostic mammogram', 'Additional specialist views', 'Consultant radiologist report'],
      },
      {
        id: 'tomo',
        label: '3D Mammogram (Tomosynthesis)',
        desc: 'Superior detection — fewer false positives. Recommended for dense breast tissue.',
        priceFrom: 275,
        includes: ['3D tomosynthesis imaging', 'Consultant radiologist report', 'Results within 48 hours'],
      },
      {
        id: 'combo',
        label: 'Mammogram + Breast Ultrasound',
        desc: 'Comprehensive breast assessment combining both imaging modalities.',
        priceFrom: 349,
        includes: ['Digital mammogram', 'Breast ultrasound', 'Combined radiologist report'],
      },
    ],
  },

  // ── PREGNANCY SCAN ──────────────────────────────────────────────────────────
  {
    slug: 'pregnancy-scan',
    name: 'Pregnancy Scan',
    shortName: 'Pregnancy',
    tagline: 'All trimesters. Experienced sonographers. Immediate results.',
    description: 'Private pregnancy ultrasound scans across all stages. Experienced obstetric sonographers, modern equipment, and a reassuring environment — without the NHS wait.',
    priceFrom: 89,
    reportHours: 'Same day',
    scanDuration: '20–45 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '🤰',
    accentColor: '#6D28D9',
    type: 'pathway',
    whatIs: {
      text: "Private pregnancy scans use ultrasound to monitor baby\'s development, check for structural abnormalities, confirm dates, and provide reassurance throughout your pregnancy. Unlike NHS scans (which typically include only the 12-week dating scan and 20-week anomaly scan), private scans can be booked at any stage — including early pregnancy from 6 weeks.\n\nAll ScanBook pregnancy scans are performed by experienced, accredited obstetric sonographers. Images and a brief report are provided immediately, with a full written report within the same day.",
      keyFacts: [
        'Available from 6 weeks gestation',
        'Performed by accredited obstetric sonographers',
        'Completely radiation-free — safe throughout pregnancy',
        'Immediate images and same-day written report',
        'Heartbeat confirmation from 6 weeks',
      ],
    },
    whoNeedsIt: [
      { icon: '🤍', title: 'Early reassurance', desc: 'Confirmation of pregnancy and heartbeat. Ideal after IVF or previous loss.' },
      { icon: '📅', title: 'Dating & confirmation', desc: 'Accurate due date calculation and early chromosomal markers at 11–14 weeks.' },
      { icon: '🔍', title: 'Anomaly screening', desc: 'Detailed structural survey of baby at 18–22 weeks.' },
      { icon: '📈', title: 'Growth monitoring', desc: 'Baby growth and wellbeing checks in the third trimester.' },
      { icon: '😰', title: 'Reassurance scan', desc: 'Peace of mind at any stage when you have concerns.' },
    ],
    preparation: [
      'For early pregnancy scans (under 10 weeks): a transvaginal approach may give a clearer image — this will be discussed with you.',
      'For scans from 10 weeks onwards: drink 1 litre of water 1 hour before and try not to empty your bladder.',
      'Bring a partner, support person, or any previous scan images if available.',
      'Wear comfortable, loose clothing for easy access to your abdomen.',
    ],
    whatToExpect: [
      { step: 1, title: 'Welcome & consent', desc: 'Your sonographer reviews your pregnancy history, confirms your gestational age, and explains the scan.' },
      { step: 2, title: 'The scan', desc: 'Gel is applied to your abdomen. The sonographer carefully scans baby, taking measurements and recording images.' },
      { step: 3, title: 'Your images', desc: 'You\'ll receive printed and digital images of your baby to take home. The sonographer discusses findings with you.' },
      { step: 4, title: 'Written report', desc: 'A comprehensive written report is delivered to your ScanBook portal the same day.' },
    ],
    faqs: [
      { q: 'How early can I have a pregnancy scan?', a: 'A heartbeat can usually be detected from 6 weeks on a transvaginal scan, and from 7–8 weeks on an abdominal scan. We recommend booking from 7 weeks to ensure the best chance of seeing the heartbeat.' },
      { q: 'Is ultrasound safe in pregnancy?', a: 'Yes. Diagnostic ultrasound has been used safely in obstetrics for over 50 years. There is no ionising radiation involved. Our sonographers minimise scan duration and acoustic exposure, particularly in early pregnancy.' },
      { q: 'What\'s the difference between NHS and private pregnancy scans?', a: 'NHS scans are typically limited to two (12-week dating and 20-week anomaly scans). Private scans can be booked at any stage, involve a dedicated appointment with no waiting, and provide immediate results and images.' },
      { q: 'Can I find out the baby\'s gender?', a: 'Gender can usually be determined from 16 weeks onwards. Many packages include gender reveal if requested. Note that gender cannot be guaranteed due to baby\'s position.' },
      { q: 'Can I bring my partner or family?', a: 'Yes — you\'re welcome to bring a support person or partner. Some centres can accommodate additional guests. Check when booking.' },
      { q: 'What if a problem is detected?', a: 'Our sonographers are trained to communicate sensitively. If a concern is identified, you\'ll be advised on the appropriate next steps, which may include referral back to your midwife or an NHS specialist.' },
    ],
    relatedSlugs: ['baby-scan', 'ultrasound', 'mammogram'],
    pathways: [
      { id: 'early', label: 'Early Pregnancy Scan', desc: 'Confirm pregnancy and see your baby\'s heartbeat for the first time.', ageRange: '6–10 weeks', durationHint: '~20 min', priceFrom: 89 },
      { id: 'dating', label: 'Dating Scan', desc: 'Establish your due date and check the early nuchal fold.', ageRange: '10–14 weeks', durationHint: '~25 min', priceFrom: 99 },
      { id: 'anomaly', label: 'Anomaly / Morphology Scan', desc: 'Detailed structural survey of all baby\'s organs and limbs.', ageRange: '18–22 weeks', durationHint: '~40 min', priceFrom: 149 },
      { id: 'growth', label: 'Growth & Wellbeing Scan', desc: 'Monitor baby\'s growth, position, and fluid levels.', ageRange: '24–40 weeks', durationHint: '~30 min', priceFrom: 119 },
      { id: 'reassurance', label: 'Reassurance Scan', desc: 'Peace of mind at any point in your pregnancy.', ageRange: 'Any trimester', durationHint: '~20 min', priceFrom: 89 },
    ],
  },

  // ── BABY SCAN ───────────────────────────────────────────────────────────────
  {
    slug: 'baby-scan',
    name: 'Baby Scan',
    shortName: 'Baby Scan',
    tagline: '2D, 3D & 4D HD Live packages. Gender reveal from 16 weeks.',
    description: 'Private baby scanning packages including gender reveal, bonding, 3D and 4D HD Live experiences. Available from 6 weeks — a moment to remember.',
    priceFrom: 79,
    reportHours: 'Same day',
    scanDuration: '20–45 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '👶',
    accentColor: '#D97706',
    type: 'pathway',
    whatIs: {
      text: "Baby scans offer a memorable, private experience to bond with your baby at various stages of pregnancy. Unlike clinical pregnancy scans, baby scan packages are designed around the experience — with longer appointments, keepsake images, and HD Live 4D video where available.\n\nFrom an early heartbeat confirmation at 6 weeks, to a stunning 4D scan at 28 weeks, our partner centres provide a welcoming environment with state-of-the-art Samsung and GE ultrasound equipment. All scans are performed by accredited sonographers.",
      keyFacts: [
        'Available from 6 weeks gestation',
        '3D and 4D HD Live at selected centres',
        'Gender reveal from 16 weeks',
        'Keepsake images included in all packages',
        'Completely safe — no radiation',
      ],
    },
    whoNeedsIt: [
      { icon: '💝', title: 'Bonding experience', desc: 'See your baby\'s face in 3D or HD Live 4D for a truly memorable moment.' },
      { icon: '🎀', title: 'Gender reveal', desc: 'Find out if it\'s a boy or girl with photos to share with family.' },
      { icon: '🤍', title: 'Early heartbeat', desc: 'Reassurance and confirmation of pregnancy from just 6 weeks.' },
      { icon: '📸', title: 'Keepsake images', desc: 'High-quality printed and digital images to treasure forever.' },
    ],
    preparation: [
      'For early scans (under 10 weeks): a transvaginal approach may give the clearest images.',
      'For scans from 10 weeks: drink 1 litre of water 1 hour before — a full bladder helps image quality.',
      'For 3D/4D scans (24–32 weeks): optimal timing is 26–30 weeks for the best facial images.',
      'Bring a partner, family, or friends to share the experience — ask about guest numbers when booking.',
    ],
    whatToExpect: [
      { step: 1, title: 'Welcome', desc: 'Your sonographer greets you, reviews your dates, and explains what you\'ll see during the scan.' },
      { step: 2, title: 'The scan', desc: 'Gel is applied and the sonographer scans your baby, taking measurements and showing you baby in 2D, 3D or 4D depending on your package.' },
      { step: 3, title: 'Images & video', desc: 'You\'ll receive printed keepsake photos and — for 3D/4D packages — a digital video clip of your session.' },
      { step: 4, title: 'Report', desc: 'A brief report confirming your baby\'s heartbeat, estimated due date and basic measurements is provided on the day.' },
    ],
    faqs: [
      { q: 'When is the best time for a 4D scan?', a: 'Between 26 and 30 weeks is optimal. Too early (before 26 weeks) and baby doesn\'t have much fat under the skin yet. Too late (after 32 weeks) and baby is too cramped to get a good face view.' },
      { q: 'Can you guarantee seeing the baby\'s gender?', a: 'We achieve gender determination in over 95% of scans from 16 weeks. Occasionally baby\'s position means we can\'t confirm — in which case we\'ll rebook you at no charge.' },
      { q: 'Is 4D safe?', a: 'Yes. 4D simply means the 3D images are shown in real time (the 4th dimension being time). The same sound wave technology used for all diagnostic ultrasound is used — completely safe.' },
      { q: 'What\'s the difference between 3D and 4D?', a: '3D produces still images of your baby\'s surface. 4D (or HD Live) produces moving video in real time, allowing you to see yawns, smiles and movement.' },
      { q: 'Can I bring my children?', a: 'Yes — baby scans are a family experience. Check with the specific centre about space when booking.' },
    ],
    relatedSlugs: ['pregnancy-scan', 'ultrasound'],
    pathways: [
      { id: 'early', label: 'Early Heartbeat Scan', desc: 'Confirm pregnancy and see your baby\'s heartbeat.', ageRange: '6–14 weeks', durationHint: '~20 min', priceFrom: 79 },
      { id: 'dating', label: 'Dating Scan', desc: 'Confirm your due date and check early development.', ageRange: '10–14 weeks', durationHint: '~20 min', priceFrom: 89 },
      { id: 'gender', label: 'Gender Reveal Scan', desc: 'Find out if it\'s a boy or a girl — with keepsake images.', ageRange: '16+ weeks', durationHint: '~20 min', priceFrom: 79 },
      { id: '3d', label: '3D Scan', desc: 'Stunning still 3D images of your baby\'s face and hands.', ageRange: '24–32 weeks', durationHint: '~30 min', priceFrom: 99 },
      { id: '4d', label: '4D / HD Live Scan', desc: 'Live moving video of your baby — the ultimate bonding experience.', ageRange: '26–32 weeks', durationHint: '~40 min', priceFrom: 149 },
      { id: 'growth', label: 'Growth Scan', desc: 'Check baby\'s growth, position, and amniotic fluid.', ageRange: '28–40 weeks', durationHint: '~30 min', priceFrom: 119 },
    ],
  },

  // ── DEXA SCAN ───────────────────────────────────────────────────────────────
  {
    slug: 'dexa-scan',
    name: 'DEXA Scan',
    shortName: 'DEXA',
    tagline: 'Bone density & body composition. Results within 48 hours.',
    description: 'DEXA (Dual-Energy X-ray Absorptiometry) is the gold standard for measuring bone density and body composition. Essential for osteoporosis screening and athletic performance monitoring.',
    priceFrom: 149,
    reportHours: '48 hours',
    scanDuration: '20–30 minutes',
    radiationFree: false,
    requiresReferral: false,
    icon: '🦷',
    accentColor: '#047857',
    type: 'package',
    whatIs: {
      text: "DEXA (Dual-Energy X-ray Absorptiometry) uses two very-low-dose X-ray beams to measure the density of your bones and the composition of your body tissues — distinguishing between bone mineral, fat mass, and lean muscle mass.\n\nA DEXA scan is painless, quick (20 minutes), and produces significantly less radiation than a standard chest X-ray. It is the clinical gold standard for diagnosing osteoporosis and monitoring treatment response, and is increasingly used by athletes and health-conscious individuals to track body composition with unmatched precision.",
      keyFacts: [
        'Gold standard for osteoporosis diagnosis',
        'Ultra-low radiation dose — less than a chest X-ray',
        'Distinguishes bone, fat and muscle with precision',
        'No injection or contrast required',
        'Results and T-score within 48 hours',
      ],
    },
    whoNeedsIt: [
      { icon: '🦴', title: 'Osteoporosis screening', desc: 'Women post-menopause, men over 70, long-term steroid use.' },
      { icon: '🧬', title: 'Fracture risk', desc: 'Family history of osteoporosis, previous fragility fracture.' },
      { icon: '🏋️', title: 'Body composition', desc: 'Athletes tracking muscle gain, fat loss and lean mass ratios.' },
      { icon: '💊', title: 'Treatment monitoring', desc: 'Annual check for those on bisphosphonate therapy (Alendronic acid).' },
      { icon: '🩺', title: 'General health check', desc: 'Proactive bone health assessment from age 40 onwards.' },
    ],
    preparation: [
      'No fasting required — eat and drink normally before your appointment.',
      'Avoid calcium supplements for 24 hours before the scan.',
      'Wear comfortable, metal-free clothing — avoid underwired bras and belts.',
      'Inform the team if you have had a contrast CT or nuclear medicine scan within the past 7 days.',
    ],
    whatToExpect: [
      { step: 1, title: 'Positioning', desc: 'You\'ll lie flat on the scanning table. No injections or enclosed machines — the arm of the scanner passes slowly over your body.' },
      { step: 2, title: 'Bone density scan', desc: 'The lumbar spine and hip are the standard sites for osteoporosis assessment. The scan takes around 10 minutes.' },
      { step: 3, title: 'Body composition (if included)', desc: 'A full-body scan maps fat mass, lean mass and visceral fat. This adds approximately 5–10 minutes.' },
      { step: 4, title: 'Report & T-score', desc: 'Your radiologist report includes your T-score and Z-score, showing bone density compared to peak (young adult) and age-matched references. Delivered within 48 hours.' },
    ],
    faqs: [
      { q: 'What is a T-score?', a: 'Your T-score compares your bone density to that of a healthy young adult at peak bone mass. A T-score above -1 is normal; between -1 and -2.5 indicates osteopenia (low bone density); below -2.5 indicates osteoporosis.' },
      { q: 'How often should I have a DEXA scan?', a: 'Every 1–2 years if you have osteoporosis or osteopenia and are on treatment. Every 2–5 years for monitoring in those at moderate risk. Ask your GP or specialist for personalised advice.' },
      { q: 'Can I have a DEXA scan after a hip replacement?', a: 'Yes. The affected hip is excluded from the analysis and the results are still valid. Inform the scanning team of any implants in advance.' },
      { q: 'What\'s the difference between a bone density scan and body composition?', a: 'Bone density scans measure the mineral content of your bones (spine and hip). Body composition adds a full-body scan that quantifies fat mass, lean muscle mass, and visceral fat — useful for general health and athletic monitoring.' },
      { q: 'Is there any radiation risk?', a: 'The radiation dose is extremely low — approximately one-tenth of a standard chest X-ray and far less than background radiation from a transatlantic flight. The benefits of detection greatly outweigh the minimal dose.' },
    ],
    relatedSlugs: ['mri-scan', 'x-ray', 'ct-scan'],
    packages: [
      {
        id: 'bone_density',
        label: 'Bone Density Scan',
        desc: 'Lumbar spine and hip — the gold standard osteoporosis test.',
        priceFrom: 149,
        includes: ['Spine + hip scan', 'T-score & Z-score', 'Radiologist report within 48h'],
      },
      {
        id: 'body_comp',
        label: 'Body Composition Scan',
        desc: 'Precise breakdown of muscle mass, fat mass, and visceral fat.',
        priceFrom: 175,
        includes: ['Full body composition scan', 'Fat mass %', 'Lean mass analysis', 'Visceral fat index'],
      },
      {
        id: 'dexa_full',
        label: 'Bone Density + Body Composition',
        desc: 'Comprehensive scan combining both — the complete picture.',
        priceFrom: 249,
        includes: ['Spine + hip bone density', 'Full body composition', 'T-score, Z-score & body metrics report'],
      },
    ],
  },

  // ── FULL BODY MRI ────────────────────────────────────────────────────────────
  {
    slug: 'full-body-mri',
    name: 'Full Body MRI',
    shortName: 'Full Body MRI',
    tagline: 'Comprehensive health screening. No radiation.',
    description: 'A head-to-toe MRI scan designed for proactive health monitoring. Detects early signs of cancer, cardiovascular disease, organ abnormalities and neurological conditions — all without radiation.',
    priceFrom: 795,
    reportHours: '5 working days',
    scanDuration: '60–90 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '🏥',
    accentColor: '#082A4A',
    type: 'package',
    whatIs: {
      text: "A Full Body MRI is a comprehensive screening scan that examines major organs, tissues, bones and vascular structures from head to toe — all in a single appointment. Unlike individual targeted scans, a full body MRI is designed for proactive health screening: identifying early signs of disease before symptoms develop.\n\nThe scan covers the brain, spine, heart, lungs, liver, kidneys, prostate or pelvis, and major blood vessels. There is no radiation involved — only MRI magnetic fields. A specialist radiologist produces a detailed report, typically within 5 working days.",
      keyFacts: [
        'Head-to-toe screening in one 60–90 minute appointment',
        'No ionising radiation whatsoever',
        'Covers brain, spine, heart, organs, vasculature',
        'Interpreted by specialist screening radiologists',
        'Includes a consultation to discuss results',
      ],
    },
    whoNeedsIt: [
      { icon: '🏥', title: 'Proactive health screening', desc: 'High-achieving individuals who want to take control of their health.' },
      { icon: '🧬', title: 'Family history of cancer', desc: 'Early detection when there is a personal or family history of cancer.' },
      { icon: '💼', title: 'Executive health checks', desc: 'Corporate wellness packages and senior executive health programmes.' },
      { icon: '🎂', title: 'Health milestones', desc: 'The 40, 50 or 60-year health check — a comprehensive baseline.' },
      { icon: '🔍', title: 'Unexplained symptoms', desc: 'A broad investigation when symptoms don\'t point to a specific organ.' },
    ],
    preparation: [
      'You\'ll be asked to fast for 4 hours before the scan (small amounts of water are fine).',
      'Avoid alcohol for 24 hours before the scan to prevent liver signal artefacts.',
      'Remove all metal items — jewellery, piercings, belts, underwired bras.',
      'Inform the team of any metal implants, pacemakers, or claustrophobia.',
      'Wear comfortable, loose clothing or a gown will be provided.',
    ],
    whatToExpect: [
      { step: 1, title: 'Consultation', desc: 'A brief pre-scan consultation reviews your health history, medications, and any symptoms. Consent forms are completed.' },
      { step: 2, title: 'MRI scanning', desc: 'You\'ll be positioned in the MRI scanner. Multiple sequences are acquired covering each body region over 60–90 minutes.' },
      { step: 3, title: 'Radiologist review', desc: 'A specialist screening radiologist reviews all images — a thorough process that takes several days.' },
      { step: 4, title: 'Results consultation', desc: 'A follow-up consultation reviews your detailed written report. Any incidental findings are discussed with referral pathways provided.' },
    ],
    faqs: [
      { q: 'Can a full body MRI detect cancer?', a: 'Yes. MRI can detect a wide range of cancers including brain, spinal, liver, kidney, prostate, ovarian, and bone. However, it is a screening tool — not every cancer will be visible on MRI, and findings require clinical correlation.' },
      { q: 'What does the scan cover?', a: 'A full body MRI covers: brain and spine, heart and great vessels, liver, gallbladder, pancreas, kidneys, adrenal glands, bowel, prostate (men) or uterus/ovaries (women), and major bones.' },
      { q: 'How long does it take to get results?', a: 'Given the volume and complexity of images, specialist screening radiologists typically take 3–5 working days to produce a comprehensive report.' },
      { q: 'What happens if something is found?', a: 'An incidental finding triggers a clear referral pathway — either to a specific specialist or back to your GP with a detailed report and recommended next steps. Our clinical team can help coordinate.' },
      { q: 'Is it suitable for people with claustrophobia?', a: 'A 60–90 minute scan in an enclosed space is challenging for those with claustrophobia. Wide-bore scanners (70cm diameter) are used at our premium centres. Pre-scan anxiolytic medication (from your GP) can help.' },
    ],
    relatedSlugs: ['mri-scan', 'ct-scan', 'dexa-scan'],
    packages: [
      {
        id: 'full_body_standard',
        label: 'Full Body MRI — Standard',
        desc: 'Head-to-toe screening covering all major organs, brain, and vasculature.',
        priceFrom: 795,
        includes: ['Brain & spinal cord', 'Heart & great vessels', 'Liver, kidneys & abdomen', 'Pelvis (gender-specific)', 'Specialist screening radiologist report', 'Results consultation'],
      },
      {
        id: 'full_body_plus',
        label: 'Full Body MRI — Plus',
        desc: 'Extended protocol including additional cardiac and prostate/breast sequences.',
        priceFrom: 1195,
        includes: ['Everything in Standard', 'Cardiac MRI sequences', 'mpMRI prostate or breast MRI', 'Enhanced radiologist consultation', 'GP letter included'],
      },
    ],
  },

  // ── CARDIAC CT ──────────────────────────────────────────────────────────────
  {
    slug: 'cardiac-ct',
    name: 'Cardiac CT Scan',
    shortName: 'Cardiac CT',
    tagline: 'Non-invasive heart assessment. Results within 48 hours.',
    description: 'CT coronary angiography (CTCA) and calcium scoring provide a non-invasive assessment of coronary artery disease risk — no catheter required.',
    priceFrom: 395,
    reportHours: '48 hours',
    scanDuration: '30–60 minutes',
    radiationFree: false,
    requiresReferral: false,
    icon: '🫀',
    accentColor: '#B91C1C',
    type: 'package',
    whatIs: {
      text: "Cardiac CT scans use specialised CT technology to produce detailed images of the heart and coronary arteries — without the need for an invasive catheter. CT Coronary Angiography (CTCA) visualises the coronary arteries in detail, identifying blockages, stenoses and plaque build-up that may be causing chest pain or breathlessness.\n\nCalcium scoring (also called a coronary artery calcium or CAC score) is a simpler, lower-dose scan that quantifies the amount of calcified plaque in the coronary arteries — an established risk marker for future heart attack. Together, these scans help cardiologists and GPs make informed decisions about treatment and prevention.",
      keyFacts: [
        'Non-invasive alternative to cardiac catheterisation',
        'Detects blockages and plaque in coronary arteries',
        'Calcium scoring available as a standalone risk assessment',
        'Results interpreted by a consultant cardiac radiologist',
        'No GP referral required',
      ],
    },
    whoNeedsIt: [
      { icon: '💔', title: 'Chest pain or breathlessness', desc: 'Investigation of symptoms that could indicate coronary artery disease.' },
      { icon: '🧬', title: 'Family history of heart disease', desc: 'Proactive screening when first-degree relatives have had heart attacks.' },
      { icon: '🩺', title: 'High cardiovascular risk', desc: 'Hypertension, high cholesterol, diabetes, or smokers over 50.' },
      { icon: '📊', title: 'Calcium scoring', desc: 'Baseline risk assessment and monitoring over time.' },
    ],
    preparation: [
      'Avoid caffeine (coffee, tea, energy drinks) for 12 hours before your scan — caffeine raises heart rate.',
      'Avoid vigorous exercise for 4 hours before the scan.',
      'A beta-blocker tablet (to slow the heart rate) may be given before the scan — inform us of any medications.',
      'Contrast dye is used for CTCA — inform the team of any allergies or kidney problems.',
    ],
    whatToExpect: [
      { step: 1, title: 'ECG monitoring', desc: 'Electrodes are placed on your chest to monitor heart rhythm. The scan is timed to capture images between heartbeats.' },
      { step: 2, title: 'Contrast injection', desc: 'For CTCA, contrast dye is injected via a small cannula. You may feel a warm flush — this is normal and passes quickly.' },
      { step: 3, title: 'Rapid scan', desc: 'Modern cardiac CT scanners capture the entire heart in a few heartbeats. The scan itself takes under a minute, though the appointment is 30–60 minutes total.' },
      { step: 4, title: 'Report', desc: 'A specialist cardiac radiologist interprets your images and delivers a full report within 48 hours, including your calcium score if requested.' },
    ],
    faqs: [
      { q: 'What is a calcium score?', a: 'A calcium score (CAC) measures the amount of calcified plaque in your coronary arteries. A score of 0 indicates no detectable calcification and a very low short-term risk. Higher scores indicate increasing risk and are used to guide preventive treatment.' },
      { q: 'Is CTCA as reliable as an angiogram?', a: 'For ruling out significant coronary artery disease, CTCA has excellent sensitivity. It\'s the preferred non-invasive investigation for stable chest pain according to NICE guidelines.' },
      { q: 'What\'s the radiation dose?', a: 'Modern cardiac CT uses prospective gating to significantly reduce dose — typically 1–5 mSv for CTCA, comparable to 6 months of background radiation.' },
      { q: 'Will I need beta-blockers?', a: 'A slow, regular heart rate is needed for clear images. If your resting heart rate is above 65 bpm, you may be given a short-acting beta-blocker (oral or IV) before the scan. This is safe and standard practice.' },
    ],
    relatedSlugs: ['ct-scan', 'mri-scan', 'full-body-mri'],
    packages: [
      {
        id: 'calcium_score',
        label: 'Coronary Calcium Score',
        desc: 'Non-contrast CT to quantify coronary artery calcification.',
        priceFrom: 149,
        includes: ['Low-dose non-contrast CT', 'Calcium score (Agatston)', 'Risk stratification report'],
      },
      {
        id: 'ctca',
        label: 'CT Coronary Angiography (CTCA)',
        desc: 'Detailed visualisation of the coronary arteries with contrast.',
        priceFrom: 495,
        includes: ['Contrast-enhanced cardiac CT', 'Full coronary artery assessment', 'Cardiac radiologist report', 'GP letter'],
      },
      {
        id: 'cardiac_full',
        label: 'Calcium Score + CTCA',
        desc: 'Comprehensive cardiac CT package — risk score and full angiography.',
        priceFrom: 595,
        includes: ['Calcium score', 'Full CTCA', 'Combined cardiac radiologist report', 'GP letter'],
      },
    ],
  },

  // ── WOMEN'S HEALTH ──────────────────────────────────────────────────────────
  {
    slug: 'womens-health',
    name: "Women's Health Scans",
    shortName: "Women's Health",
    tagline: 'Private imaging for every stage of a woman\'s health journey.',
    description: 'Specialist women\'s health imaging — from pelvic and breast ultrasound to mammogram, fertility assessment, and menopause bone density — all without a GP referral.',
    priceFrom: 99,
    reportHours: '24 hours',
    scanDuration: '20–45 minutes',
    radiationFree: true,
    requiresReferral: false,
    icon: '🌸',
    accentColor: '#9B2D6F',
    type: 'variant',
    whatIs: {
      text: "Women's health imaging covers a broad range of scans tailored to female anatomy across all life stages — from reproductive years through perimenopause, menopause, and beyond. Private access means no waiting lists and appointments within 1–3 days.\n\nOur centres offer pelvic ultrasound (transvaginal and transabdominal), breast ultrasound, mammography, hysteroscopy imaging support, DEXA bone density scanning, and specialist MRI of the pelvis and breast. All scans are interpreted by consultant radiologists and reported within 24–48 hours.",
      keyFacts: [
        'No GP referral required at any stage',
        'Pelvic, breast, mammogram, DEXA and specialist MRI available',
        'Performed by experienced female sonographers on request',
        'Reports from consultant radiologists within 24–48 hours',
        'Comprehensive coverage from fertility to menopause',
      ],
    },
    whoNeedsIt: [
      { icon: '🩺', title: 'Pelvic pain & irregular periods', desc: 'Investigation of endometriosis, fibroids, PCOS, and ovarian cysts causing pain or cycle disruption.' },
      { icon: '🔬', title: 'Fertility assessment', desc: 'Antral follicle count, ovarian reserve, and uterine assessment before IVF or other fertility treatment.' },
      { icon: '🎀', title: 'Breast screening', desc: 'Annual mammogram or breast ultrasound for routine screening, dense breast tissue, or a new breast lump.' },
      { icon: '🦴', title: 'Menopause bone health', desc: 'DEXA scan to assess bone density and osteoporosis risk as oestrogen levels fall.' },
      { icon: '🤰', title: 'Pregnancy & post-partum', desc: 'Early pregnancy confirmation, pelvic floor assessment, and post-partum pelvic imaging.' },
      { icon: '💊', title: 'HRT monitoring', desc: 'Endometrial thickness assessment and breast screening for women on hormone replacement therapy.' },
    ],
    preparation: [
      'For pelvic ultrasound (transabdominal): arrive with a comfortably full bladder.',
      'For transvaginal ultrasound: an empty bladder is preferred. A female sonographer can be requested.',
      'For mammogram: avoid deodorant, talc, or body lotion on the day — particles can appear on images.',
      'For DEXA scan: no special preparation. Avoid calcium supplements for 24 hours beforehand.',
      'For breast MRI: wear comfortable clothing with no underwired bras or metal fasteners.',
      'Inform the team of any current pregnancy or possibility of pregnancy before booking.',
    ],
    whatToExpect: [
      { step: 1, title: 'Book & choose your scan', desc: 'Select the specific scan from the list below or call us if you\'re unsure which investigation is right for your symptoms.' },
      { step: 2, title: 'Attend your appointment', desc: 'Arrive at the imaging centre. Scans are performed by specialist radiographers or sonographers — a female clinician can be arranged.' },
      { step: 3, title: 'Same-day preliminary findings', desc: 'The sonographer or radiographer shares initial observations during your appointment.' },
      { step: 4, title: 'Written radiologist report', desc: 'A consultant radiologist reviews all images and issues a full written report within 24–48 hours. Copies can be sent to your GP.' },
    ],
    faqs: [
      { q: 'Do I need a GP referral for a women\'s health scan?', a: 'No. All scans listed can be booked directly through ScanBook without seeing a GP first. You can self-refer for any investigation.' },
      { q: 'Can I request a female sonographer?', a: 'Yes. When booking, request a female clinician and we will do our best to accommodate. Availability varies by centre.' },
      { q: 'What is the difference between a transvaginal and transabdominal pelvic ultrasound?', a: 'Transabdominal ultrasound uses a probe on the abdomen and requires a full bladder. Transvaginal uses a slim probe inserted into the vagina and provides better image quality for the uterus and ovaries. The appropriate approach depends on your symptoms and clinical question.' },
      { q: 'What can a pelvic ultrasound detect?', a: 'Fibroids, ovarian cysts (including endometriomas), polycystic ovaries, endometrial thickening, uterine abnormalities, and pelvic free fluid. It is the first-line investigation for pelvic pain, irregular bleeding, and fertility concerns.' },
      { q: 'When should I start having private breast screening?', a: 'Annual mammography is recommended from age 40 for average-risk women, and from age 30–35 for women with a significant family history or BRCA1/2 gene mutation. Breast ultrasound is used for younger women with dense breast tissue.' },
      { q: 'Can I have a DEXA scan if I\'m premenopausal?', a: 'Yes. DEXA is appropriate for premenopausal women with risk factors including prolonged steroid use, a personal or family history of fractures, early menopause, or low body weight.' },
    ],
    relatedSlugs: ['mammogram', 'ultrasound', 'dexa-scan'],
    variants: [
      { id: 'pelvic_us', label: 'Pelvic Ultrasound', prepNote: 'Full bladder for transabdominal; empty for transvaginal', priceFrom: 99 },
      { id: 'breast_us', label: 'Breast Ultrasound', prepNote: 'No deodorant or lotion on the day', priceFrom: 120 },
      { id: 'mammogram', label: 'Mammogram (Digital / 3D)', prepNote: 'No deodorant or talc on the day', priceFrom: 145 },
      { id: 'dexa', label: 'DEXA Bone Density Scan', prepNote: 'Avoid calcium supplements 24h before', priceFrom: 125 },
      { id: 'breast_mri', label: 'Breast MRI', prepNote: 'No underwired bra; some centres require contrast injection', priceFrom: 495 },
      { id: 'pelvic_mri', label: 'Pelvic MRI', prepNote: 'Fasting for 4h preferred; full bladder or empty depending on protocol', priceFrom: 395 },
    ],
  },

]

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getService(slug: string): ServiceContent | undefined {
  return SERVICES.find(s => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map(s => s.slug)
}

export function getRelatedServices(slug: string): ServiceContent[] {
  const service = getService(slug)
  if (!service) return []
  return service.relatedSlugs
    .map(s => getService(s))
    .filter((s): s is ServiceContent => s !== undefined)
    .slice(0, 3)
}
