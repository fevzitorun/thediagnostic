// ScanBook — Blog / Health Hub Content
// Add new articles here. They are statically rendered at build time.

export interface BlogArticle {
  slug: string
  title: string
  metaTitle: string
  metaDesc: string
  category: string
  readTime: number         // minutes
  publishedAt: string      // ISO date string
  author: string
  authorRole: string
  excerpt: string
  heroEmoji: string        // decorative, no images needed
  sections: ArticleSection[]
  relatedSlugs: string[]
  cta?: { label: string; href: string }
}

export type ArticleSection =
  | { type: 'intro';   body: string }
  | { type: 'h2';      heading: string; body: string }
  | { type: 'list';    heading: string; items: string[] }
  | { type: 'callout'; body: string }
  | { type: 'faq';     items: { q: string; a: string }[] }

export const ARTICLES: BlogArticle[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-long-does-an-mri-scan-take',
    title: 'How Long Does an MRI Scan Take? A Complete Guide',
    metaTitle: 'How Long Does an MRI Scan Take? | ScanBook Health Guide',
    metaDesc: 'Find out how long an MRI scan takes for different body parts — brain, knee, spine, abdomen. Plus what to expect before, during, and after your scan.',
    category: 'MRI Scans',
    readTime: 6,
    publishedAt: '2026-05-01',
    author: 'Dr Sarah Okonkwo',
    authorRole: 'Consultant Radiologist',
    excerpt: 'MRI scan times vary by body part and complexity. A simple knee MRI takes around 30 minutes; a full-body scan can take over two hours. Here is what to expect.',
    heroEmoji: '🧲',
    sections: [
      {
        type: 'intro',
        body: 'One of the most common questions patients ask before booking a private MRI scan is: how long will it take? The answer depends on which body part is being scanned, whether contrast dye is used, and the complexity of the clinical question being answered. This guide covers typical durations for the most common MRI scans.',
      },
      {
        type: 'h2',
        heading: 'MRI scan times by body part',
        body: 'The table below gives typical scan durations for common MRI types. These are the time inside the scanner — allow an extra 15–20 minutes for check-in and safety screening.',
      },
      {
        type: 'list',
        heading: 'Typical scan durations',
        items: [
          'Knee MRI — 25–35 minutes',
          'Shoulder MRI — 30–45 minutes',
          'Brain MRI — 30–45 minutes',
          'Lumbar spine (lower back) MRI — 30–45 minutes',
          'Cervical spine (neck) MRI — 30–45 minutes',
          'Hip MRI — 30–40 minutes',
          'Pelvic MRI — 40–60 minutes',
          'Abdominal MRI — 45–60 minutes',
          'Prostate MRI (mpMRI) — 45–60 minutes',
          'Full-body MRI — 90–180 minutes',
        ],
      },
      {
        type: 'h2',
        heading: 'Why does MRI take longer than CT or X-Ray?',
        body: 'Unlike CT or X-Ray, which use ionising radiation and can image very quickly, MRI uses strong magnetic fields and radio waves to build up detailed images slice by slice. The machine needs to take multiple sequences — each targeting different tissue properties — which is what makes it so information-rich, but also slower. A knee MRI might involve 6–8 separate sequences, each lasting 3–5 minutes.',
      },
      {
        type: 'h2',
        heading: 'Does contrast dye make the scan longer?',
        body: 'Yes. If your radiologist requests contrast-enhanced MRI (using a gadolinium-based contrast agent injected into a vein), expect the scan to take 15–30 minutes longer than a non-contrast scan. The contrast agent improves visibility of tumours, inflammation, and blood vessels. It is very well tolerated by most patients.',
      },
      {
        type: 'callout',
        body: 'At ScanBook partner centres, you will complete your MRI safety questionnaire online before your appointment — saving up to 20 minutes on the day. Most patients are in and out within an hour.',
      },
      {
        type: 'h2',
        heading: 'What happens during the scan?',
        body: 'You will lie on a padded table that slides into the MRI scanner — a large, doughnut-shaped machine. The scanner makes loud knocking and buzzing sounds, which is normal. You will be given earplugs or headphones. It is essential to stay completely still during each imaging sequence; even small movements can blur the images and may require sequences to be repeated.',
      },
      {
        type: 'h2',
        heading: 'Can I speed up my MRI scan?',
        body: 'Not directly — scan duration is set by the clinical protocol your radiologist chooses. However, you can minimise delays by: arriving 10 minutes early, completing your safety questionnaire in advance, removing all metal items before entering the scan room, and avoiding caffeine or stimulants that might make it harder to stay still.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Do I need to do anything before my MRI?',
            a: 'For most MRI scans you can eat and drink normally beforehand. Abdominal and pelvic MRI may require fasting for 4–6 hours. Your booking confirmation will specify any preparation needed.',
          },
          {
            q: 'Can I leave the scanner during the scan?',
            a: 'Yes, you can ask the radiographer to stop the scan at any time. However, any sequences that were interrupted will need to be repeated, which extends the total time.',
          },
          {
            q: 'What if I am claustrophobic?',
            a: 'Tell the booking team before your appointment. Some centres have wider-bore scanners that feel less enclosed. Mild sedation can also be arranged through your GP for very anxious patients.',
          },
        ],
      },
    ],
    relatedSlugs: ['mri-scan-vs-ct-scan', 'do-i-need-a-gp-referral-for-a-private-mri', 'what-to-expect-at-a-private-scan'],
    cta: { label: 'Book a private MRI scan', href: '/search?type=mri' },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'mri-scan-vs-ct-scan',
    title: 'MRI vs CT Scan: What Is the Difference?',
    metaTitle: 'MRI vs CT Scan — Key Differences Explained | ScanBook',
    metaDesc: 'MRI and CT scans both produce detailed internal images but work very differently. Find out which scan is right for your symptoms and why your doctor might choose one over the other.',
    category: 'Scan Guides',
    readTime: 7,
    publishedAt: '2026-05-05',
    author: 'Dr James Whitfield',
    authorRole: 'Consultant Radiologist, FRCR',
    excerpt: 'MRI uses magnetic fields; CT uses X-rays. Both are powerful diagnostic tools. The choice depends on what your doctor needs to see and how quickly. Here is a plain-English comparison.',
    heroEmoji: '🔬',
    sections: [
      {
        type: 'intro',
        body: 'MRI (Magnetic Resonance Imaging) and CT (Computed Tomography) are two of the most commonly requested imaging investigations in medicine. Both produce highly detailed cross-sectional images of the inside of the body — but they work in completely different ways, take different amounts of time, and are better suited to different clinical questions.',
      },
      {
        type: 'h2',
        heading: 'How MRI works',
        body: 'MRI uses a powerful magnetic field and radio waves to generate images. When you lie inside the scanner, the magnetic field causes hydrogen atoms in your body (primarily in water molecules) to align. Short pulses of radio waves then knock them out of alignment, and as they realign they emit signals that are captured and converted into images. MRI uses no ionising radiation, making it safe for repeated use and particularly appropriate for children, pregnant women, and younger patients.',
      },
      {
        type: 'h2',
        heading: 'How CT works',
        body: 'CT uses a rotating X-ray beam and detectors to capture hundreds of images from different angles, which a computer assembles into a detailed 3D picture. CT is much faster than MRI — a chest CT takes under 10 seconds — and is excellent for bone, lung, and vascular imaging. CT does use ionising radiation, though modern scanners are optimised to keep doses as low as reasonably achievable.',
      },
      {
        type: 'list',
        heading: 'MRI is usually the better choice for:',
        items: [
          'Brain and spinal cord conditions',
          'Joint injuries (knee, shoulder, hip, ankle)',
          'Soft tissue tumours and masses',
          'Pelvic conditions (prostate, uterus, ovaries)',
          'Liver and abdominal organ assessment',
          'Nerve problems (sciatica, carpal tunnel)',
          'Patients who need repeated scans (no radiation)',
        ],
      },
      {
        type: 'list',
        heading: 'CT is usually the better choice for:',
        items: [
          'Chest and lung conditions (cancer, pulmonary embolism, infection)',
          'Abdominal emergencies (appendicitis, kidney stones)',
          'Bone fractures and trauma',
          'Vascular conditions (aortic aneurysm, arterial blockage)',
          'Cancer staging (fast, whole-body assessment)',
          'Situations requiring rapid results',
        ],
      },
      {
        type: 'h2',
        heading: 'Which costs more?',
        body: 'CT scans are generally less expensive than MRI because the scanners are faster and the imaging time per patient is shorter. At ScanBook partner centres, CT scans start from £185 and MRI scans from £275, though complex protocols with contrast agents or multiple body areas will cost more.',
      },
      {
        type: 'callout',
        body: 'Not sure which scan you need? You do not need a GP referral for either scan through ScanBook. If you describe your symptoms when booking, our clinical team can advise on the most appropriate scan type.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Is MRI or CT more accurate?',
            a: 'Neither is universally more accurate — they answer different clinical questions. MRI is superior for soft tissue and nerve detail; CT is superior for bone, lung, and vascular imaging. The right scan depends on what your doctor needs to find.',
          },
          {
            q: 'Can I have both an MRI and CT on the same day?',
            a: 'Yes. Some clinical situations require both, and this can often be arranged at the same appointment. There are no contraindications to having both on the same day.',
          },
          {
            q: 'Is CT safe?',
            a: 'CT involves a small dose of ionising radiation. For most adults, the diagnostic benefit of a CT scan far outweighs the very small risk from radiation. Modern CT scanners use automatic dose modulation to keep exposure as low as possible.',
          },
        ],
      },
    ],
    relatedSlugs: ['how-long-does-an-mri-scan-take', 'do-i-need-a-gp-referral-for-a-private-mri', 'what-to-expect-at-a-private-scan'],
    cta: { label: 'Compare MRI and CT prices', href: '/search' },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'do-i-need-a-gp-referral-for-a-private-mri',
    title: 'Do I Need a GP Referral for a Private MRI Scan?',
    metaTitle: 'Do I Need a GP Referral for a Private MRI? | ScanBook',
    metaDesc: 'No — you can book a private MRI scan without seeing your GP first. Find out how self-referral works, what a radiologist report includes, and when you should involve your GP.',
    category: 'Booking Advice',
    readTime: 5,
    publishedAt: '2026-05-10',
    author: 'ScanBook Clinical Team',
    authorRole: 'UK-registered radiographers and radiologists',
    excerpt: 'No referral is needed to book a private MRI through ScanBook. You can self-refer, choose your centre, and receive a consultant radiologist report — all without a GP appointment.',
    heroEmoji: '📋',
    sections: [
      {
        type: 'intro',
        body: 'One of the biggest differences between NHS and private MRI scanning is the referral requirement. On the NHS, you need your GP or a specialist to refer you before you can access imaging. Through ScanBook, you can book your own MRI scan directly — without needing to see a doctor first.',
      },
      {
        type: 'h2',
        heading: 'What is self-referral?',
        body: 'Self-referral means booking a scan without a letter from a GP or specialist. You choose the scan type, select a convenient centre and time slot, and pay directly. All ScanBook partner centres accept self-referral patients. Your scan will still be reported by a UK-qualified consultant radiologist, and the written report is sent to your secure patient portal — usually within 48 hours.',
      },
      {
        type: 'h2',
        heading: 'Why do people self-refer?',
        body: 'The most common reasons patients book private MRI scans without a GP referral include: avoiding the 2–4 week wait for a GP appointment, avoiding the subsequent 14–18 week NHS imaging wait, wanting a second opinion on an existing diagnosis, needing rapid results for insurance or medico-legal purposes, and monitoring a known condition with regular imaging.',
      },
      {
        type: 'callout',
        body: 'NHS imaging waiting times currently average 14–18 weeks for MRI in most parts of England. Private appointments through ScanBook are typically available within 2–5 working days.',
      },
      {
        type: 'h2',
        heading: 'When should you involve your GP?',
        body: 'Self-referral is appropriate for most routine and investigative scans. However, you should always see a GP if you have symptoms that could be a medical emergency (chest pain, sudden severe headache, neurological symptoms), if you are pregnant or suspect you might be, or if you have a pacemaker, cochlear implant, or other metallic implant — your GP or specialist will need to confirm MRI safety.',
      },
      {
        type: 'h2',
        heading: 'What is included in the report?',
        body: 'Your ScanBook scan price always includes a written radiologist report. This is produced by a UK-qualified consultant radiologist who has passed the FRCR examination. The report describes the findings in detail, flags anything that needs urgent attention, and makes recommendations for further investigation if needed. You can share this report with your GP, a specialist, or any other healthcare provider.',
      },
      {
        type: 'list',
        heading: 'What self-referral includes at ScanBook:',
        items: [
          'Online booking — no phone call required',
          'MRI safety questionnaire completed before your appointment',
          'Scan performed by a registered radiographer',
          'Written report from a UK consultant radiologist (FRCR)',
          'Results delivered to your patient portal within 48 hours',
          'Ability to share your report with any clinician',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Will my GP receive my MRI results?',
            a: 'Only if you choose to share them. Your results are sent to your ScanBook patient portal first. You can then forward the report to your GP, a specialist, or any other clinician you wish.',
          },
          {
            q: 'Can I use my private MRI report on the NHS?',
            a: 'Yes. NHS clinicians can accept private scan reports and images. You may be asked to bring the images on a disc or USB, which your ScanBook centre can provide.',
          },
          {
            q: 'Is self-referral safe?',
            a: 'Yes. MRI is extremely safe for the vast majority of people. You complete a detailed safety questionnaire before every scan. If there is any concern about your suitability for MRI, the radiographer will discuss this with you before proceeding.',
          },
        ],
      },
    ],
    relatedSlugs: ['how-long-does-an-mri-scan-take', 'mri-scan-vs-ct-scan', 'what-to-expect-at-a-private-scan'],
    cta: { label: 'Book a private MRI — no referral needed', href: '/search?type=mri' },
  },

  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-to-expect-at-a-private-scan',
    title: 'What to Expect at a Private Scan Appointment',
    metaTitle: 'What to Expect at a Private Scan | First-Time Guide | ScanBook',
    metaDesc: 'Nervous about your first private scan? Here is exactly what happens from the moment you arrive to getting your results — for MRI, CT, ultrasound, and more.',
    category: 'Patient Guides',
    readTime: 5,
    publishedAt: '2026-05-14',
    author: 'ScanBook Clinical Team',
    authorRole: 'UK-registered radiographers and radiologists',
    excerpt: 'Your first private scan appointment from start to finish: check-in, the scan itself, what you can and cannot eat beforehand, how long it takes, and when to expect your results.',
    heroEmoji: '🏥',
    sections: [
      {
        type: 'intro',
        body: 'If you have never had a private scan before, you might not know what to expect. The good news is that private imaging centres in the UK are comfortable, well-equipped, and staffed by friendly registered radiographers. This guide walks you through a typical appointment from arrival to receiving your results.',
      },
      {
        type: 'h2',
        heading: 'Before your appointment',
        body: 'For most scans, you can eat and drink normally beforehand. Exceptions include abdominal and pelvic MRI or ultrasound (fast for 4–6 hours), and some CT scans with contrast (instructions will be in your booking confirmation). Wear comfortable, loose-fitting clothing. Leave jewellery at home if possible, as you will need to remove it before an MRI scan.',
      },
      {
        type: 'h2',
        heading: 'Arrival and check-in',
        body: 'Arrive 10–15 minutes before your appointment time. You will be greeted by reception and asked to confirm your details. For MRI scans, you will complete (or confirm your online) safety questionnaire, which asks about metal implants, pacemakers, previous surgeries, and any relevant medical history. This is a safety requirement — all answers are confidential.',
      },
      {
        type: 'h2',
        heading: 'The scan itself',
        body: 'You will be guided into the scan room by a registered radiographer — a healthcare professional trained specifically in medical imaging. They will explain the procedure, position you correctly, and remain nearby throughout. For MRI, you will lie inside the scanner bore; the machine will make loud rhythmic sounds — earplugs or music headphones are provided. For CT and ultrasound you remain more accessible. For ultrasound, a probe is moved over your skin with a small amount of gel.',
      },
      {
        type: 'list',
        heading: 'During your scan, you will be asked to:',
        items: [
          'Lie completely still during each imaging sequence (MRI and CT)',
          'Hold your breath briefly for certain chest or abdominal sequences',
          'Inform the radiographer if you feel unwell or uncomfortable at any point',
          'Avoid wearing deodorant or cosmetics for some breast ultrasound appointments',
        ],
      },
      {
        type: 'h2',
        heading: 'After the scan',
        body: 'Once the scan is complete you can get dressed, leave the centre, eat, drink, and drive normally. There is no recovery period — unless you received contrast dye or sedation, in which case you should rest for a short period and arrange for someone to drive you home. The radiographer may share initial observations, but the formal written report is produced separately by a consultant radiologist.',
      },
      {
        type: 'h2',
        heading: 'Getting your results',
        body: 'Your written radiologist report is delivered to your ScanBook patient portal — typically within 24–48 hours for most scan types. You will receive an email notification when it is ready. Pregnancy and baby scan results are usually available on the day. You can download and share your report with any clinician, and many centres also provide your images on a disc or USB on request.',
      },
      {
        type: 'callout',
        body: 'ScanBook partner centres are CQC-registered and staffed by HCPC-registered radiographers. Every scan includes a written report from a UK consultant radiologist — the same standard as private hospital imaging.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Can I bring someone with me?',
            a: 'Yes. A friend or family member can accompany you to your appointment and wait in the reception area. For child patients, a parent or guardian should always be present.',
          },
          {
            q: 'What if something urgent is found?',
            a: 'If the radiologist identifies a finding that requires urgent attention, the centre will contact you directly and advise you to see your GP or attend A&E. Urgent findings are never left unreported.',
          },
          {
            q: 'How soon will I get my results?',
            a: 'Most reports are delivered within 48 hours. Ultrasound and pregnancy scan reports are often available the same day. Urgent reports can be expedited and delivered within a few hours at most centres.',
          },
        ],
      },
    ],
    relatedSlugs: ['how-long-does-an-mri-scan-take', 'mri-scan-vs-ct-scan', 'do-i-need-a-gp-referral-for-a-private-mri'],
    cta: { label: 'Find a scan centre near you', href: '/search' },
  },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getArticle(slug: string): BlogArticle | undefined {
  return ARTICLES.find(a => a.slug === slug)
}

export function getAllArticleSlugs(): string[] {
  return ARTICLES.map(a => a.slug)
}

export function getArticlesByCategory(category: string): BlogArticle[] {
  return ARTICLES.filter(a => a.category === category)
}

export function getRelatedArticles(slug: string): BlogArticle[] {
  const article = getArticle(slug)
  if (!article) return []
  return article.relatedSlugs
    .map(s => getArticle(s))
    .filter((a): a is BlogArticle => a !== undefined)
    .slice(0, 3)
}

export const ALL_CATEGORIES = [...new Set(ARTICLES.map(a => a.category))]
