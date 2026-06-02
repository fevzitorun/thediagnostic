// ScanBook — Body Part Page Content
// Used by /mri-scan/[part], /ct-scan/[part], /ultrasound/[variant], /x-ray/[part]

export interface BodyPartCondition { label: string; desc: string }
export interface BodyPartUseCase { icon: string; title: string; desc: string }
export interface BodyPartFaq { q: string; a: string }
export interface RelatedPart { slug: string; name: string }

export interface BodyPartPage {
  scanType: 'mri' | 'ct' | 'xray' | 'ultrasound'
  partSlug: string
  partName: string
  h1: string
  metaTitle: string
  metaDesc: string
  priceFrom: number
  duration: string
  intro: string
  conditions: BodyPartCondition[]
  whoNeedsIt: BodyPartUseCase[]
  preparation: string[]
  faqs: BodyPartFaq[]
  relatedParts: RelatedPart[]
}

// ─── MRI BODY PARTS ──────────────────────────────────────────────────────────

const MRI_BASE_PREP = [
  'Remove all metal items — jewellery, piercings, belts, hair clips — before entering the scanner room.',
  'Inform the radiographer of any metal implants, pacemakers, cochlear implants or surgical clips.',
  'Wear comfortable, loose-fitting clothing. A gown will be provided if needed.',
  'Most MRI scans require no fasting — eat and drink normally unless specifically instructed otherwise.',
]

export const MRI_PARTS: BodyPartPage[] = [
  // ── KNEE ──────────────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'knee',
    partName: 'Knee',
    h1: 'Private Knee MRI Scan',
    metaTitle: 'Private Knee MRI Scan | From £275 | No GP Referral | ScanBook',
    metaDesc: 'Book a private knee MRI scan from £275. No GP referral required. Detailed imaging for ligament tears, meniscus, cartilage and more. Results within 48 hours.',
    priceFrom: 275,
    duration: '30–45 minutes',
    intro: 'A private knee MRI scan is the gold-standard investigation for knee pain, sports injuries and joint problems. Unlike X-ray, MRI provides detailed images of all the soft tissue structures inside the knee — including the ACL, PCL, menisci, cartilage, and surrounding tendons — without any ionising radiation. Results are reported by a consultant musculoskeletal radiologist within 48 hours.',
    conditions: [
      { label: 'ACL & PCL tears', desc: 'Complete or partial rupture of the anterior and posterior cruciate ligaments — common in sports injuries and twisting accidents.' },
      { label: 'Meniscus tears', desc: 'Medial and lateral meniscal tears — the most common reason for knee MRI. MRI can classify tear type (radial, bucket-handle, complex) to guide surgical planning.' },
      { label: 'Cartilage damage', desc: 'Chondromalacia patellae, focal cartilage defects, osteochondral lesions — MRI grades the severity and extent of articular cartilage damage.' },
      { label: 'Medial & lateral ligament injuries', desc: 'MCL and LCL sprains or tears, typically from direct contact or valgus/varus stress.' },
      { label: 'Bursitis & effusion', desc: 'Joint effusion (fluid in the knee), pre-patellar bursitis, Baker\'s cyst (popliteal cyst) assessment.' },
      { label: 'Bone bruising', desc: 'Trabecular bone oedema following impact or stress — visible on MRI but invisible on X-ray.' },
      { label: 'Tendinopathy', desc: 'Quadriceps and patellar tendinopathy, jumper\'s knee, and tendon tears.' },
      { label: 'Osteoarthritis assessment', desc: 'Cartilage loss, subchondral bone changes, synovitis and osteophyte formation that X-ray may underestimate.' },
    ],
    whoNeedsIt: [
      { icon: '⚽', title: 'Sports & twisting injury', desc: 'Sudden pivot, tackle, fall or direct impact causing immediate knee pain or swelling.' },
      { icon: '🦵', title: 'Persistent knee pain', desc: 'Knee pain lasting more than 6 weeks that has not responded to physiotherapy or anti-inflammatories.' },
      { icon: '🔓', title: 'Instability & locking', desc: 'Feeling of the knee "giving way", clicking, catching or locking during movement.' },
      { icon: '💧', title: 'Swelling', desc: 'Acute or persistent joint effusion, particularly following an injury.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Your orthopaedic surgeon needs MRI confirmation before recommending arthroscopy, ligament reconstruction, or osteotomy.' },
      { icon: '🔍', title: 'Second opinion', desc: 'Seeking clarity on an existing diagnosis, or reviewing imaging from another provider.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'No special preparation is required for a knee MRI. Eat, drink and take medications normally.',
      'You may wish to bring a pair of shorts — the knee area needs to be accessible, but you can keep your own clothing on in most cases.',
    ],
    faqs: [
      { q: 'Can a knee MRI detect an ACL tear?', a: 'Yes. MRI is the definitive investigation for ACL tears, with sensitivity and specificity over 90%. It shows whether the tear is complete or partial, and whether there is associated meniscal or cartilage damage.' },
      { q: 'How long does a knee MRI take?', a: 'A knee MRI typically takes 30–45 minutes. You\'ll lie on your back with your knee positioned inside a dedicated knee coil. The scan is painless.' },
      { q: 'Do I need a GP referral for a knee MRI?', a: 'No. You can self-refer directly through ScanBook without needing a GP appointment or referral letter.' },
      { q: 'Will the MRI show cartilage damage?', a: 'Yes. MRI is excellent at grading articular cartilage damage. A high-field (1.5T or 3T) scanner with dedicated knee sequences can detect even subtle chondral lesions.' },
      { q: 'Can I walk after a knee MRI?', a: 'Yes — a knee MRI is a diagnostic test and has no physical effect on your knee. You can walk and drive normally immediately after your appointment.' },
      { q: 'How soon will I get my results?', a: 'Your consultant radiologist\'s written report is delivered to your ScanBook patient portal within 48 hours of your scan.' },
    ],
    relatedParts: [
      { slug: 'hip', name: 'Hip MRI' },
      { slug: 'ankle-foot', name: 'Ankle & Foot MRI' },
      { slug: 'lumbar-spine', name: 'Lumbar Spine MRI' },
    ],
  },

  // ── LUMBAR SPINE ───────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'lumbar-spine',
    partName: 'Lumbar Spine',
    h1: 'Private Lumbar Spine MRI Scan',
    metaTitle: 'Private Lumbar Spine MRI Scan | Back Pain | From £285 | ScanBook',
    metaDesc: 'Private lumbar spine MRI for low back pain, sciatica and disc problems. No GP referral. From £285. Results within 48 hours from a consultant radiologist.',
    priceFrom: 285,
    duration: '25–40 minutes',
    intro: 'A lumbar spine MRI is the most effective investigation for low back pain, sciatica, and suspected disc problems. It provides detailed images of the vertebrae, intervertebral discs, spinal canal, and nerve roots — allowing precise identification of disc herniations, spinal stenosis, and the cause of referred leg pain. Results are reported by a consultant radiologist within 48 hours.',
    conditions: [
      { label: 'Disc herniation (slipped disc)', desc: 'Protrusion, extrusion or sequestration of disc material pressing on the spinal canal or nerve roots — the most common cause of sciatica.' },
      { label: 'Spinal stenosis', desc: 'Narrowing of the spinal canal or neural foramina causing nerve compression. Typically causes leg pain on walking (neurogenic claudication).' },
      { label: 'Degenerative disc disease', desc: 'Loss of disc height, Modic endplate changes, and disc desiccation — the structural basis of chronic low back pain.' },
      { label: 'Spondylolisthesis', desc: 'Forward slippage of one vertebra on another, graded by severity. Causes back pain and sometimes nerve compression.' },
      { label: 'Facet joint arthropathy', desc: 'Wear and degeneration of the posterior facet joints — a common contributor to low back pain, especially on extension.' },
      { label: 'Cauda equina assessment', desc: 'Urgent assessment if there is concern about cauda equina compression — bladder/bowel dysfunction, saddle anaesthesia.' },
      { label: 'Stress fractures & bone lesions', desc: 'Vertebral compression fractures, Schmorl\'s nodes, and bone lesions that require further assessment.' },
    ],
    whoNeedsIt: [
      { icon: '🔙', title: 'Persistent low back pain', desc: 'Back pain lasting more than 6 weeks that has not resolved with physiotherapy and analgesia.' },
      { icon: '⚡', title: 'Sciatica', desc: 'Shooting pain, numbness or tingling radiating from the lower back into the buttock, thigh, calf or foot.' },
      { icon: '🦵', title: 'Leg weakness or numbness', desc: 'Neurological symptoms in one or both legs suggesting nerve root compression or cord involvement.' },
      { icon: '🚨', title: 'Cauda equina symptoms', desc: 'Urgent — bladder/bowel dysfunction, saddle anaesthesia, or bilateral leg weakness require same-day assessment.' },
      { icon: '🏋️', title: 'Post-injury back pain', desc: 'Significant back pain following a fall, road traffic accident, or heavy lifting.' },
      { icon: '📋', title: 'Pre-surgical assessment', desc: 'Your spinal surgeon requires MRI confirmation before planning discectomy, decompression or fusion.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'You may be asked to remove your trousers/belt for easier positioning. Loose-fitting clothing is recommended.',
      'No fasting or special preparation is required for a lumbar spine MRI.',
    ],
    faqs: [
      { q: 'Can an MRI show the cause of my sciatica?', a: 'Yes. Lumbar spine MRI is the definitive investigation for sciatica. It identifies the level and type of disc herniation or stenosis responsible for nerve root compression.' },
      { q: 'Will it show if I have a slipped disc?', a: 'Yes. Disc herniation (\'slipped disc\') is one of the most common findings on lumbar spine MRI. The scan shows the position, size and direction of the herniation and whether it is compressing a nerve root.' },
      { q: 'Do I need a referral for a back MRI?', a: 'No. You can self-refer for a private lumbar spine MRI through ScanBook. You don\'t need to see your GP first.' },
      { q: 'What\'s the difference between a lumbar and a full spine MRI?', a: 'A lumbar spine MRI covers L1–S1 and the sacrum — the lower back. A full spine MRI also includes the cervical (neck) and thoracic (mid-back) regions. Your symptoms usually guide which area to scan.' },
      { q: 'How long does the scan take?', a: 'A lumbar spine MRI takes 25–40 minutes. You\'ll lie on your back inside the scanner and need to stay still during the sequences.' },
    ],
    relatedParts: [
      { slug: 'cervical-spine', name: 'Cervical Spine MRI' },
      { slug: 'thoracic-spine', name: 'Thoracic Spine MRI' },
      { slug: 'hip', name: 'Hip MRI' },
    ],
  },

  // ── BRAIN ──────────────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'brain',
    partName: 'Brain',
    h1: 'Private Brain MRI Scan',
    metaTitle: 'Private Brain MRI Scan | From £295 | No GP Referral | ScanBook',
    metaDesc: 'Private brain MRI scan from £295. Investigate headaches, dizziness, memory loss, suspected MS and more. No GP referral. Results within 48 hours.',
    priceFrom: 295,
    duration: '30–50 minutes',
    intro: 'A private brain MRI scan provides detailed images of the brain, including the grey and white matter, blood vessels, and surrounding structures. It is the most sensitive imaging tool for detecting neurological conditions — from early MS lesions to vascular abnormalities — without any radiation. A consultant neuroradiologist reports your scan within 48 hours.',
    conditions: [
      { label: 'Multiple Sclerosis (MS)', desc: 'White matter lesions characteristic of MS — MRI is the primary diagnostic tool for MS and for monitoring disease activity over time.' },
      { label: 'Stroke & TIA investigation', desc: 'Diffusion-weighted MRI detects acute ischaemic strokes within hours. It also identifies old infarcts and haemorrhagic changes.' },
      { label: 'Headaches & migraines', desc: 'Structural investigation for chronic, severe or atypical headaches — ruling out intracranial pathology including tumours, haemorrhage and vascular malformations.' },
      { label: 'Brain tumours & lesions', desc: 'Detection and characterisation of primary brain tumours, metastases, and other focal lesions. MRI provides information about lesion type and vascularity.' },
      { label: 'Memory loss & cognitive decline', desc: 'Structural MRI assesses brain volume, hippocampal atrophy and white matter changes relevant to dementia investigation.' },
      { label: 'Epilepsy investigation', desc: 'High-resolution epilepsy protocols detect subtle cortical malformations, hippocampal sclerosis and other epileptogenic lesions.' },
      { label: 'Pituitary gland assessment', desc: 'Gadolinium-enhanced pituitary MRI for assessment of pituitary adenomas, craniopharyngioma and other sellar pathology.' },
      { label: 'Sinuses & skull base', desc: 'MRI of the paranasal sinuses, skull base, orbits and posterior fossa when CT is insufficient or radiation is to be avoided.' },
    ],
    whoNeedsIt: [
      { icon: '🤕', title: 'Chronic or severe headaches', desc: 'Persistent, worsening or unusually severe headaches not responding to treatment.' },
      { icon: '😵', title: 'Dizziness & balance problems', desc: 'Vertigo, disequilibrium or gait disturbance with no clear ENT cause.' },
      { icon: '⚡', title: 'Suspected MS', desc: 'Visual disturbance, limb weakness, numbness or tingling suggesting a demyelinating process.' },
      { icon: '🧠', title: 'Memory loss', desc: 'Progressive memory impairment, confusion or behavioural change needing structural investigation.' },
      { icon: '🫨', title: 'Seizures', desc: 'New onset seizures, poorly controlled epilepsy, or suspected focal cause.' },
      { icon: '🔍', title: 'Peace of mind / family history', desc: 'Proactive screening when there is a family history of brain tumours, vascular malformations or aneurysm.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'Some brain MRI protocols require a contrast injection (gadolinium). You\'ll be told in advance if this is needed.',
      'If contrast is required, inform the team of any kidney problems or previous contrast reactions.',
      'No fasting is required for a standard brain MRI without contrast.',
    ],
    faqs: [
      { q: 'Can a brain MRI detect a brain tumour?', a: 'Yes. Brain MRI is the most sensitive imaging tool for brain tumours. It can detect and characterise tumours, guide biopsy, and monitor treatment response. Gadolinium contrast is often used to improve lesion visualisation.' },
      { q: 'Will a brain MRI detect MS?', a: 'MRI is the cornerstone of MS diagnosis. It detects white matter lesions characteristic of MS in the brain and spinal cord. A normal brain MRI does not entirely exclude MS, as some patients have predominantly spinal disease.' },
      { q: 'Can a brain MRI detect an aneurysm?', a: 'MRA (MR Angiography) — a specialised protocol often added to brain MRI — can detect intracranial aneurysms. A standard brain MRI is less sensitive for small aneurysms. If aneurysm screening is your reason for the scan, request MRI Brain + MRA when booking.' },
      { q: 'How long does a brain MRI take?', a: 'A standard brain MRI takes 30–50 minutes. If gadolinium contrast or additional sequences (MRA, spectroscopy, diffusion tensor imaging) are added, the scan will take longer.' },
      { q: 'Do I need to fast before a brain MRI?', a: 'Not for a standard brain MRI. If gadolinium contrast is required, there are no strict fasting requirements but staying well-hydrated is helpful.' },
      { q: 'Will a brain MRI show anxiety or depression?', a: 'Standard brain MRI does not diagnose anxiety or depression — these are clinical diagnoses. Research MRI protocols can identify functional brain differences, but these are not available clinically. An MRI may be ordered to rule out organic (structural) causes of mood symptoms.' },
    ],
    relatedParts: [
      { slug: 'cervical-spine', name: 'Cervical Spine MRI' },
      { slug: 'sinuses', name: 'Sinuses MRI' },
    ],
  },

  // ── SHOULDER ───────────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'shoulder',
    partName: 'Shoulder',
    h1: 'Private Shoulder MRI Scan',
    metaTitle: 'Private Shoulder MRI Scan | From £275 | No GP Referral | ScanBook',
    metaDesc: 'Book a private shoulder MRI scan from £275. Rotator cuff tears, labral tears, impingement and more. No GP referral. Radiologist report within 48 hours.',
    priceFrom: 275,
    duration: '30–45 minutes',
    intro: 'A private shoulder MRI scan provides the most comprehensive assessment of the rotator cuff, labrum, biceps tendon, and surrounding bursa — structures that X-ray cannot visualise. It is the investigation of choice for persistent shoulder pain, rotator cuff tears, and pre-operative assessment. Most shoulder MRIs are performed without contrast (plain MRI), though MR Arthrography (with intra-articular contrast) may be recommended for labral assessment.',
    conditions: [
      { label: 'Rotator cuff tears', desc: 'Partial or full-thickness tears of the supraspinatus, infraspinatus, subscapularis and teres minor tendons — MRI classifies tear size and retraction for surgical planning.' },
      { label: 'Shoulder impingement', desc: 'Subacromial impingement syndrome — narrowing of the subacromial space causing tendon impingement, oedema and bursitis.' },
      { label: 'Labral tears (SLAP & Bankart)', desc: 'Superior labrum anterior-posterior (SLAP) lesions and anteroinferior Bankart tears — common in overhead athletes and after dislocation.' },
      { label: 'Frozen shoulder', desc: 'Adhesive capsulitis — MRI shows capsular thickening and rotator interval fibrosis. Used to confirm diagnosis and exclude other pathology.' },
      { label: 'AC joint arthropathy', desc: 'Acromioclavicular joint osteoarthritis, osteolysis and ganglion cysts — a common cause of superior shoulder pain.' },
      { label: 'Calcific tendinitis', desc: 'Calcium deposits within the rotator cuff tendons — identifiable on MRI and used to plan treatment including barbotage (needling).' },
      { label: 'Biceps tendon pathology', desc: 'Long head of biceps tendinopathy, tears and subluxation — assessed within the bicipital groove.' },
    ],
    whoNeedsIt: [
      { icon: '🏋️', title: 'Rotator cuff injury', desc: 'Weakness lifting the arm, difficulty reaching overhead, pain at night lying on the shoulder.' },
      { icon: '🏊', title: 'Overhead athletes', desc: 'Swimmers, throwers, tennis players with shoulder pain or reduced performance — investigation for labral and rotator cuff pathology.' },
      { icon: '🔁', title: 'After dislocation', desc: 'Post-dislocation MRI to assess the labrum and rotator cuff for Bankart or Hill-Sachs lesions before physiotherapy or surgery.' },
      { icon: '❄️', title: 'Frozen shoulder', desc: 'Gradual onset stiffness and pain in all directions — MRI confirms diagnosis and excludes other pathology.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Orthopaedic surgeons typically require MRI before recommending rotator cuff repair, labral surgery or subacromial decompression.' },
      { icon: '🔍', title: 'Unexplained shoulder pain', desc: 'Persistent shoulder pain with no clear diagnosis after physiotherapy — MRI provides a definitive structural assessment.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'Wear a loose top or t-shirt — you\'ll need to remove it for the scan, or a gown will be provided.',
      'If MR Arthrography is planned (dye injected into the joint), this is performed immediately before the MRI by a radiologist under X-ray or ultrasound guidance.',
    ],
    faqs: [
      { q: 'Can an MRI detect a rotator cuff tear?', a: 'Yes. MRI is the gold standard for rotator cuff assessment. It identifies partial and full-thickness tears, measures tear size and retraction, and assesses muscle atrophy — all essential for surgical planning.' },
      { q: 'What\'s the difference between a plain shoulder MRI and MR arthrography?', a: 'Plain MRI is performed without any injection. MR Arthrography involves injecting contrast directly into the shoulder joint to "distend" it, improving visualisation of the labrum and capsule. It\'s particularly useful for labral tears and instability assessment.' },
      { q: 'I had an ultrasound — why do I still need MRI?', a: 'Ultrasound is useful for assessing the supraspinatus and biceps tendons, but it cannot adequately visualise the entire rotator cuff, the labrum or the joint interior. MRI provides a more complete assessment.' },
      { q: 'How long does a shoulder MRI take?', a: 'A plain shoulder MRI takes 30–45 minutes. You\'ll lie with your arm by your side. The shoulder is positioned in a dedicated coil for optimal image quality.' },
      { q: 'Do I need a referral for a shoulder MRI?', a: 'No. You can self-refer for a private shoulder MRI through ScanBook without needing a GP appointment.' },
    ],
    relatedParts: [
      { slug: 'elbow', name: 'Elbow MRI' },
      { slug: 'wrist-hand', name: 'Wrist & Hand MRI' },
      { slug: 'cervical-spine', name: 'Cervical Spine MRI' },
    ],
  },

  // ── HIP ────────────────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'hip',
    partName: 'Hip',
    h1: 'Private Hip MRI Scan',
    metaTitle: 'Private Hip MRI Scan | From £275 | No GP Referral | ScanBook',
    metaDesc: 'Private hip MRI scan from £275. Labral tears, FAI, AVN, hip dysplasia and groin pain investigation. No GP referral. Results within 48 hours.',
    priceFrom: 275,
    duration: '30–45 minutes',
    intro: 'A private hip MRI scan provides detailed imaging of the hip joint, labrum, femoral head, and surrounding soft tissues. It is the investigation of choice for unexplained groin pain, hip impingement, labral tears, and avascular necrosis — conditions that may be missed on X-ray. Results are reported by a consultant musculoskeletal radiologist within 48 hours.',
    conditions: [
      { label: 'Labral tears', desc: 'Tears of the acetabular labrum — the cartilaginous rim of the hip socket. Common cause of deep groin pain, clicking or catching in athletes and young adults.' },
      { label: 'Femoroacetabular impingement (FAI)', desc: 'Cam impingement (bony bump on femoral head) or Pincer impingement (excess coverage of acetabulum) causing pain and labral damage.' },
      { label: 'Avascular necrosis (AVN)', desc: 'Loss of blood supply to the femoral head causing bone death — early stages detectable on MRI before X-ray changes appear.' },
      { label: 'Hip dysplasia', desc: 'Abnormal hip socket coverage leading to labral overload and early osteoarthritis — identified by MRI and plain films.' },
      { label: 'Greater trochanteric pain syndrome', desc: 'Gluteal tendinopathy and trochanteric bursitis — lateral hip pain, often mistaken for back or knee pain.' },
      { label: 'Stress fractures', desc: 'Femoral neck stress fractures in runners and the military — detected on MRI weeks before X-ray changes appear.' },
      { label: 'Groin strains & adductor injuries', desc: 'Adductor longus avulsions and chronic groin injuries in footballers and athletes.' },
    ],
    whoNeedsIt: [
      { icon: '🏃', title: 'Groin & hip pain in athletes', desc: 'Deep anterior groin pain with activity, clicking hip — often FAI or labral tear.' },
      { icon: '🧓', title: 'Hip pain in older adults', desc: 'Hip pain limiting walking or activities of daily living — ruling out AVN, fracture or OA severity.' },
      { icon: '🔁', title: 'Clicking or catching hip', desc: 'Internal or external snapping hip — investigation for labral or tendon pathology.' },
      { icon: '😣', title: 'Unexplained groin pain', desc: 'Groin pain that has not responded to physiotherapy and lacks a clear diagnosis on clinical examination.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Required before hip arthroscopy, PAO (periacetabular osteotomy) or hip replacement surgery.' },
      { icon: '🔍', title: 'Post-dislocation assessment', desc: 'Checking for labral damage, cartilage injury and AVN following traumatic hip dislocation.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'No special preparation is needed for a hip MRI. You can eat, drink and take medications as normal.',
      'Wear loose trousers without a metal zip if possible — though a gown will be provided.',
    ],
    faqs: [
      { q: 'Can an MRI detect a hip labral tear?', a: 'Yes. MRI — particularly 3T MRI with dedicated hip sequences — is the imaging modality of choice for labral tears. MR Arthrography (with intra-articular contrast) provides even better labral detail and may be recommended for suspected tears.' },
      { q: 'What\'s avascular necrosis (AVN) and will MRI detect it?', a: 'AVN is death of bone tissue due to impaired blood supply. MRI detects AVN in its early stages — often months before changes appear on X-ray — making early treatment and joint-preserving surgery possible.' },
      { q: 'Will a hip MRI show arthritis?', a: 'MRI shows early cartilage loss and subchondral bone changes that X-ray may underestimate. However, X-ray is usually the first-line investigation for osteoarthritis — MRI adds value when symptoms are disproportionate to X-ray findings or surgery is being considered.' },
      { q: 'What\'s the difference between a hip MRI and a pelvis MRI?', a: 'A hip MRI focuses on a single joint (or both hips), using dedicated coils and sequences optimised for the hip joint and labrum. A pelvis MRI is broader, covering the pelvic organs, lymph nodes and bony pelvis.' },
      { q: 'How long does a hip MRI take?', a: 'A single hip MRI takes 30–45 minutes. If both hips are scanned together, it typically adds 15 minutes.' },
    ],
    relatedParts: [
      { slug: 'knee', name: 'Knee MRI' },
      { slug: 'lumbar-spine', name: 'Lumbar Spine MRI' },
      { slug: 'pelvis', name: 'Pelvis MRI' },
    ],
  },

  // ── CERVICAL SPINE ─────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'cervical-spine',
    partName: 'Cervical Spine (Neck)',
    h1: 'Private Cervical Spine MRI Scan',
    metaTitle: 'Private Cervical Spine MRI Scan | Neck Pain | From £285 | ScanBook',
    metaDesc: 'Private cervical spine MRI for neck pain, arm pain, numbness and tingling. From £285. No GP referral. Radiologist-reported results within 48 hours.',
    priceFrom: 285,
    duration: '25–40 minutes',
    intro: 'A private cervical spine MRI provides detailed cross-sectional images of the neck vertebrae, intervertebral discs, spinal cord, and nerve roots from C1 to C7. It is the definitive investigation for neck pain radiating into the arm, numbness, weakness, and cervical myelopathy. Results are reported by a consultant radiologist within 48 hours.',
    conditions: [
      { label: 'Cervical disc herniation', desc: 'Disc protrusion or extrusion at C4/5, C5/6 or C6/7 compressing nerve roots — causing arm pain (brachialgia), numbness or weakness.' },
      { label: 'Cervical myelopathy', desc: 'Compression of the spinal cord causing gait disturbance, hand clumsiness, and upper/lower limb weakness — a surgical emergency when severe.' },
      { label: 'Cervical spinal stenosis', desc: 'Narrowing of the spinal canal from disc and facet joint degeneration — can cause both radiculopathy and myelopathy.' },
      { label: 'Cervical spondylosis', desc: 'Age-related degenerative changes: disc dehydration, osteophyte formation, endplate changes — the commonest cause of chronic neck pain.' },
      { label: 'Whiplash assessment', desc: 'Post-traumatic cervical spine MRI following road traffic accidents — identifying disc injury, soft tissue damage or ligamentous instability.' },
      { label: 'Cervical radiculopathy', desc: 'Pinched nerve root causing dermatomal pain, sensory loss and weakness in a specific arm distribution.' },
    ],
    whoNeedsIt: [
      { icon: '🦾', title: 'Arm pain & numbness', desc: 'Pain, tingling or numbness radiating from the neck into the arm, forearm or fingers — classic cervical radiculopathy.' },
      { icon: '🔙', title: 'Persistent neck pain', desc: 'Neck pain lasting more than 6 weeks, particularly if not responding to physiotherapy.' },
      { icon: '🚶', title: 'Gait problems', desc: 'Unsteady walking, difficulty with fine hand movements or increased limb reflexes suggesting myelopathy.' },
      { icon: '🚗', title: 'Post-whiplash', desc: 'Persistent symptoms more than 3 months after a road traffic accident or fall.' },
      { icon: '😴', title: 'Waking with arm symptoms', desc: 'Nocturnal arm numbness, pain or weakness that disturbs sleep.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Required before cervical discectomy, laminectomy, foraminotomy or spinal fusion.' },
    ],
    preparation: MRI_BASE_PREP,
    faqs: [
      { q: 'Can a cervical spine MRI show what\'s causing my arm pain?', a: 'Yes. Cervical radiculopathy — arm pain and numbness caused by a compressed nerve root — is one of the most common indications for cervical MRI. The scan identifies the level, type and severity of disc herniation or foraminal stenosis responsible.' },
      { q: 'What\'s the difference between cervical and lumbar MRI?', a: 'Cervical MRI scans the neck (C1–C7) and is used for arm symptoms and neck pain. Lumbar MRI scans the lower back (L1–S1) and is used for leg symptoms and back pain. If you have symptoms in both areas, separate scans may be required.' },
      { q: 'Can MRI detect cervical myelopathy?', a: 'Yes. Cord compression causing myelopathy is directly visible on MRI. If cord signal change is present (T2 hyperintensity), this indicates significant injury and surgical referral is usually recommended.' },
      { q: 'How long does a cervical spine MRI take?', a: 'A cervical spine MRI takes 25–40 minutes. You\'ll lie on your back with a neck coil positioned around your head and neck.' },
    ],
    relatedParts: [
      { slug: 'thoracic-spine', name: 'Thoracic Spine MRI' },
      { slug: 'lumbar-spine', name: 'Lumbar Spine MRI' },
      { slug: 'brain', name: 'Brain MRI' },
    ],
  },

  // ── ANKLE & FOOT ───────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'ankle-foot',
    partName: 'Ankle & Foot',
    h1: 'Private Ankle & Foot MRI Scan',
    metaTitle: 'Private Ankle & Foot MRI Scan | From £275 | No GP Referral | ScanBook',
    metaDesc: 'Private ankle and foot MRI from £275. Achilles tendon, ligament tears, plantar fasciitis, Morton\'s neuroma. No GP referral. Results within 48 hours.',
    priceFrom: 275,
    duration: '30–45 minutes',
    intro: 'A private ankle and foot MRI scan provides detailed imaging of tendons, ligaments, cartilage, bones, and nerves in the ankle and foot — structures that are difficult to assess with X-ray or clinical examination alone. It is the definitive investigation for Achilles tendon pathology, lateral ligament tears, osteochondral lesions and unexplained foot pain.',
    conditions: [
      { label: 'Achilles tendon pathology', desc: 'Tendinopathy (insertional and mid-portion), partial tears, and complete Achilles rupture — MRI grades the severity and guides conservative vs surgical treatment.' },
      { label: 'Lateral ankle ligament injuries', desc: 'ATFL, CFL and PTFL tears — MRI assesses the completeness of tears for complex or recurrent ankle instability.' },
      { label: 'Osteochondral lesions', desc: 'Cartilage and subchondral bone defects on the talar dome — typically caused by ankle sprains or trauma.' },
      { label: 'Plantar fasciitis & plantar fascia tears', desc: 'Thickening, degeneration and partial or complete tears of the plantar fascia at its calcaneal insertion.' },
      { label: 'Morton\'s neuroma', desc: 'Benign perineural fibrosis of the interdigital nerve — typically presenting as forefoot burning pain between the 3rd and 4th toes.' },
      { label: 'Peroneal tendon pathology', desc: 'Peroneal tendon tears and subluxation — causing lateral ankle pain and instability after inversion sprains.' },
      { label: 'Stress fractures', desc: 'Metatarsal, calcaneal, and navicular stress fractures — detected on MRI weeks before X-ray changes appear.' },
    ],
    whoNeedsIt: [
      { icon: '🏃', title: 'Running injuries', desc: 'Achilles, plantar fascia, stress fracture investigation in runners — crucial before return-to-sport decisions.' },
      { icon: '🦶', title: 'Chronic ankle instability', desc: 'Repeated ankle sprains or a feeling of the ankle giving way — investigation for ligament insufficiency.' },
      { icon: '😣', title: 'Heel pain', desc: 'Plantar fasciitis, calcaneal stress fracture or Baxter\'s nerve entrapment not responding to physiotherapy.' },
      { icon: '🔥', title: 'Forefoot pain', desc: 'Burning interdigital pain suggesting Morton\'s neuroma, or metatarsal stress fracture.' },
      { icon: '💧', title: 'Post-ankle sprain', desc: 'Ankle sprain not recovering as expected — investigation for osteochondral lesion or ligament tear.' },
      { icon: '📋', title: 'Pre-surgical planning', desc: 'Required before Achilles repair, ankle arthroscopy, ligament reconstruction or osteochondral grafting.' },
    ],
    preparation: [
      ...MRI_BASE_PREP,
      'Wear or bring shorts — the foot and ankle need to be accessible.',
      'No preparation is required. You can eat, drink and take medication normally.',
    ],
    faqs: [
      { q: 'Can MRI detect an Achilles tendon tear?', a: 'Yes. MRI is the definitive investigation for Achilles tendon pathology. It distinguishes between tendinopathy, partial tears and complete rupture — information critical for surgical vs conservative treatment planning.' },
      { q: 'Will MRI show Morton\'s neuroma?', a: 'Yes. Morton\'s neuroma appears as a focal ovoid mass between the metatarsal heads on MRI. It is typically best seen on coronal sequences through the forefoot.' },
      { q: 'What if my X-ray was normal but my ankle is still painful?', a: 'X-ray shows bones but not soft tissues. An ankle MRI evaluates ligaments, tendons, cartilage and bone marrow — all of which can be injured despite a normal X-ray. Osteochondral lesions and stress fractures are common causes of persistent ankle pain with normal X-ray.' },
      { q: 'How long does an ankle MRI take?', a: 'An ankle and foot MRI typically takes 30–45 minutes. You\'ll lie with your foot placed in a dedicated extremity coil — entirely outside the main scanner bore, which is useful for those who are claustrophobic.' },
    ],
    relatedParts: [
      { slug: 'knee', name: 'Knee MRI' },
      { slug: 'hip', name: 'Hip MRI' },
    ],
  },

  // ── SHOULDER (already done) → ABDOMEN ─────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'abdomen',
    partName: 'Abdomen',
    h1: 'Private Abdominal MRI Scan',
    metaTitle: 'Private Abdominal MRI Scan | Liver, Kidneys & Organs | From £395 | ScanBook',
    metaDesc: 'Private abdominal MRI scan from £395. Detailed liver, kidney, pancreas and organ imaging without radiation. No GP referral. Results within 48 hours.',
    priceFrom: 395,
    duration: '40–60 minutes',
    intro: 'A private abdominal MRI scan provides high-resolution images of the liver, gallbladder, bile ducts, pancreas, spleen, kidneys, adrenal glands and surrounding structures — without radiation. It is superior to CT for characterising liver lesions, detecting pancreatic pathology, and MRCP (biliary tree imaging). Most abdominal MRI scans require a short period of fasting beforehand.',
    conditions: [
      { label: 'Liver lesions & masses', desc: 'Characterisation of liver lesions detected on ultrasound or CT — distinguishing between haemangiomas, FNH, adenomas and malignant lesions including HCC and metastases.' },
      { label: 'MRCP (bile duct imaging)', desc: 'Non-invasive MRI of the biliary tree and pancreatic duct — for gallstones, strictures, choledocholithiasis and primary sclerosing cholangitis.' },
      { label: 'Pancreatic disease', desc: 'Pancreatic cysts (IPMN), pancreatitis, and pancreatic tumour characterisation.' },
      { label: 'Kidney lesions', desc: 'Renal cell carcinoma characterisation, complex cysts, and angiomyolipomas.' },
      { label: 'Adrenal masses', desc: 'Chemical shift MRI for adrenal adenoma vs metastasis characterisation.' },
      { label: 'Crohn\'s disease (MRE)', desc: 'MR Enterography — assessment of small bowel inflammation, strictures and complications in Crohn\'s disease.' },
    ],
    whoNeedsIt: [
      { icon: '🔍', title: 'Incidental liver lesion', desc: 'Lesion found on ultrasound or CT requiring characterisation before management decisions.' },
      { icon: '🫁', title: 'Abdominal pain investigation', desc: 'Unexplained abdominal pain — liver, pancreatic, biliary or renal cause suspected.' },
      { icon: '🧪', title: 'Abnormal liver function tests', desc: 'Elevated LFTs requiring imaging to identify the underlying cause.' },
      { icon: '🩺', title: 'Crohn\'s disease monitoring', desc: 'Annual or biannual MRE to assess disease extent, activity and response to treatment without radiation.' },
      { icon: '🔬', title: 'Cancer surveillance', desc: 'HCC surveillance in cirrhosis, RCC follow-up, or IPMN monitoring.' },
    ],
    preparation: [
      'Fast for 4–6 hours before your scan (water is allowed). This reduces bowel motion and improves image quality.',
      'Avoid carbonated drinks and foods that cause wind for 24 hours before the scan.',
      'Some abdominal MRI protocols use an intravenous gadolinium contrast agent — inform the team of any kidney problems or previous contrast reactions.',
      'Remove all metal items including jewellery and underwired bras.',
    ],
    faqs: [
      { q: 'Is an abdominal MRI better than CT?', a: 'For liver lesion characterisation, pancreatic assessment and biliary imaging, MRI is generally superior to CT. CT remains preferred for acute abdominal emergencies. The choice depends on the clinical question.' },
      { q: 'Do I need to fast before an abdominal MRI?', a: 'Yes — for most abdominal MRI scans, fasting for 4–6 hours beforehand is required to reduce bowel motion and improve image quality. Water is permitted.' },
      { q: 'What is MRCP?', a: 'MRCP (Magnetic Resonance Cholangiopancreatography) is a specialised MRI sequence that images the bile ducts and pancreatic duct without any injection or endoscopy. It detects gallstones, strictures and other biliary abnormalities.' },
      { q: 'How long does an abdominal MRI take?', a: 'Depending on the sequences required, 40–60 minutes is typical. You\'ll need to perform breath-hold manoeuvres during certain sequences.' },
    ],
    relatedParts: [
      { slug: 'pelvis', name: 'Pelvis MRI' },
      { slug: 'chest', name: 'Chest MRI' },
    ],
  },

  // ── PELVIS ─────────────────────────────────────────────────────────────────
  {
    scanType: 'mri',
    partSlug: 'pelvis',
    partName: 'Pelvis',
    h1: 'Private Pelvic MRI Scan',
    metaTitle: 'Private Pelvic MRI Scan | Prostate, Uterus & Ovaries | From £395 | ScanBook',
    metaDesc: 'Private pelvic MRI scan from £395. Prostate (mpMRI), uterine fibroids, ovarian cysts, endometriosis. No GP referral. Results within 48 hours.',
    priceFrom: 395,
    duration: '40–60 minutes',
    intro: 'A private pelvic MRI scan provides detailed imaging of the organs, bones, blood vessels, lymph nodes and soft tissues of the pelvis. It is the gold standard for prostate cancer assessment (multiparametric MRI), investigation of uterine and ovarian pathology, and staging of pelvic malignancies. No radiation is involved.',
    conditions: [
      { label: 'Prostate assessment (mpMRI)', desc: 'Multiparametric MRI (T2, DWI, DCE) is the recommended investigation before prostate biopsy — identifying significant tumours and guiding targeted biopsy.' },
      { label: 'Uterine fibroids & adenomyosis', desc: 'Location, size and vascularity of fibroids — essential before uterine artery embolisation or myomectomy. MRI distinguishes adenomyosis from fibroids.' },
      { label: 'Ovarian cysts & masses', desc: 'Characterisation of ovarian lesions — endometriomas (chocolate cysts), dermoids, and suspicious masses requiring further assessment.' },
      { label: 'Endometriosis', desc: 'Deep infiltrating endometriosis, adenomyosis and endometriomas — MRI is the most sensitive investigation for advanced endometriosis.' },
      { label: 'Rectal cancer staging', desc: 'High-resolution rectal MRI for cancer staging — assessing tumour depth, circumferential resection margin, and lymph node involvement.' },
      { label: 'Pelvic floor disorders', desc: 'Dynamic pelvic floor MRI (defaecography) for prolapse, obstructed defaecation, and incontinence.' },
    ],
    whoNeedsIt: [
      { icon: '🔬', title: 'Elevated PSA', desc: 'Raised PSA or abnormal rectal examination — mpMRI before biopsy reduces unnecessary procedures.' },
      { icon: '🩸', title: 'Heavy periods & pelvic pain', desc: 'Heavy menstrual bleeding, dysmenorrhoea or pelvic pain — fibroid or adenomyosis investigation.' },
      { icon: '🔍', title: 'Suspected endometriosis', desc: 'Chronic pelvic pain, dyspareunia and infertility — investigation for deep infiltrating endometriosis.' },
      { icon: '📋', title: 'Cancer staging', desc: 'MRI staging of rectal, uterine, cervical or ovarian cancer prior to treatment planning.' },
      { icon: '🩺', title: 'Unexplained pelvic pain', desc: 'Persistent pelvic pain not explained by clinical examination or ultrasound.' },
    ],
    preparation: [
      'You may be asked to use a micro-enema (rectal preparation) 1 hour before a rectal or prostate MRI — specific instructions will be provided when booking.',
      'For uterine / ovarian MRI, a moderately full bladder is helpful — drink 500ml of water 1 hour before and do not empty your bladder.',
      'Remove all metal items including jewellery, piercings and underwired bras.',
      'Some protocols require intravenous gadolinium contrast — inform the team of any kidney problems.',
    ],
    faqs: [
      { q: 'What is multiparametric prostate MRI (mpMRI)?', a: 'mpMRI combines three MRI sequences — T2-weighted (anatomy), diffusion-weighted (DWI, cellularity) and dynamic contrast enhancement (DCE, vascularity) — to identify significant prostate cancer. NICE recommends mpMRI before all prostate biopsies.' },
      { q: 'Can pelvic MRI detect endometriosis?', a: 'MRI is the most sensitive imaging investigation for deep infiltrating endometriosis and adenomyosis. It is superior to ultrasound for mapping disease extent, particularly in the bowel and parametria.' },
      { q: 'What\'s the difference between pelvic MRI and pelvic ultrasound?', a: 'Ultrasound is the first-line investigation for most pelvic conditions — it\'s quick, widely available and excellent for ovarian cysts and fibroids. MRI provides better soft tissue detail, is superior for endometriosis, and is essential for prostate and rectal cancer assessment.' },
      { q: 'How long does a pelvic MRI take?', a: 'A pelvic MRI typically takes 40–60 minutes. Multiparametric prostate MRI takes around 45 minutes.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'Abdominal MRI' },
      { slug: 'hip', name: 'Hip MRI' },
    ],
  },
]

// ─── CT BODY PARTS ───────────────────────────────────────────────────────────

export const CT_PARTS: BodyPartPage[] = [
  {
    scanType: 'ct',
    partSlug: 'chest',
    partName: 'Chest',
    h1: 'Private CT Chest Scan',
    metaTitle: 'Private CT Chest Scan | Lungs & Thorax | From £195 | ScanBook',
    metaDesc: 'Private CT chest scan from £195. Lung nodules, COPD, pulmonary embolism, pleural effusion. No GP referral. Radiologist report within 48 hours.',
    priceFrom: 195,
    duration: '15–30 minutes',
    intro: 'A private CT chest scan provides detailed cross-sectional images of the lungs, pleura, mediastinum, heart and thoracic structures. It is more sensitive than chest X-ray for detecting lung nodules, emphysema, interstitial lung disease, pulmonary embolism and mediastinal pathology. Most chest CT scans take under 30 minutes in total.',
    conditions: [
      { label: 'Lung nodules', desc: 'Detection and characterisation of pulmonary nodules — assessing size, morphology and risk of malignancy (Fleischner criteria).' },
      { label: 'Interstitial lung disease (ILD)', desc: 'HRCT (High Resolution CT) for UIP pattern, NSIP, hypersensitivity pneumonitis — gold standard for ILD diagnosis.' },
      { label: 'Pulmonary embolism (CTPA)', desc: 'CT pulmonary angiography for suspected PE — detects clots in the pulmonary arteries.' },
      { label: 'Pleural disease', desc: 'Pleural effusion characterisation, pleural thickening, mesothelioma assessment.' },
      { label: 'Lymph node assessment', desc: 'Mediastinal and hilar lymphadenopathy — assessment for lymphoma, sarcoidosis or metastatic disease.' },
      { label: 'Emphysema & COPD', desc: 'Quantification of emphysema extent and distribution — useful for surgical planning (LVRS) and COPD phenotyping.' },
    ],
    whoNeedsIt: [
      { icon: '💨', title: 'Breathlessness', desc: 'Progressive dyspnoea not explained by lung function tests or chest X-ray.' },
      { icon: '🤧', title: 'Persistent cough', desc: 'Chronic cough, haemoptysis (coughing blood), or recurrent chest infections.' },
      { icon: '🔍', title: 'Lung nodule follow-up', desc: 'Monitoring a previously identified lung nodule, or characterising a new finding on X-ray.' },
      { icon: '🧬', title: 'Cancer staging', desc: 'Staging of known lung, oesophageal or breast cancer.' },
      { icon: '🚬', title: 'Lung cancer screening', desc: 'High-risk individuals (ex-smokers aged 55–74) — low-dose CT lung cancer screening.' },
    ],
    preparation: [
      'No fasting is required for a standard low-dose CT chest without contrast.',
      'For CT pulmonary angiography (CTPA), a contrast cannula will be inserted — inform the team of any contrast allergies.',
      'Remove metal items from the chest area — necklaces, underwired bras.',
      'Inform the team if you are pregnant or may be pregnant.',
    ],
    faqs: [
      { q: 'What\'s the difference between a chest X-ray and a CT chest?', a: 'Chest X-ray is a 2D projection — useful and quick but misses small lesions and has poor sensitivity for many conditions. CT chest is 3D, far more sensitive for lung nodules, interstitial disease, mediastinal pathology and vascular conditions. CT involves more radiation but provides significantly more diagnostic information.' },
      { q: 'Can a CT chest detect lung cancer?', a: 'Yes. Low-dose CT chest (LDCT) is used for lung cancer screening in high-risk individuals and can detect tumours at an early, potentially curable stage. Standard CT chest also detects lung nodules that may represent early cancers.' },
      { q: 'How much radiation does a CT chest involve?', a: 'A standard CT chest gives approximately 5–7 mSv — equivalent to about 2–3 years of background radiation. Low-dose protocols (LDCT) reduce this to approximately 1.5 mSv.' },
      { q: 'Do I need a GP referral for a CT chest scan?', a: 'No. You can self-refer for a private CT chest scan through ScanBook.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'CT Abdomen' },
      { slug: 'cardiac', name: 'Cardiac CT' },
    ],
  },
  {
    scanType: 'ct',
    partSlug: 'abdomen',
    partName: 'Abdomen',
    h1: 'Private CT Abdomen Scan',
    metaTitle: 'Private CT Abdomen Scan | From £225 | No GP Referral | ScanBook',
    metaDesc: 'Private CT abdomen scan from £225. Liver, kidneys, bowel and organ imaging. No GP referral. Results within 48 hours from a consultant radiologist.',
    priceFrom: 225,
    duration: '20–40 minutes',
    intro: 'A private CT abdomen scan provides fast, detailed cross-sectional images of the liver, gallbladder, pancreas, spleen, kidneys, adrenal glands and bowel. It is the investigation of choice for acute and chronic abdominal symptoms requiring rapid, comprehensive assessment — particularly when ultrasound is inconclusive.',
    conditions: [
      { label: 'Abdominal masses', desc: 'Liver, kidney, adrenal and pancreatic masses — CT with contrast provides staging and treatment planning information.' },
      { label: 'Bowel assessment', desc: 'CT colonography (virtual colonoscopy), bowel obstruction, Crohn\'s disease complications, diverticulitis.' },
      { label: 'Abdominal aortic aneurysm (AAA)', desc: 'Assessment and surveillance of AAA — measurement, morphology and surgical planning.' },
      { label: 'Kidney stones', desc: 'CT KUB (kidneys, ureter, bladder) — highly sensitive for urolithiasis and ureteric obstruction.' },
      { label: 'Trauma assessment', desc: 'Solid organ injury assessment following abdominal trauma.' },
    ],
    whoNeedsIt: [
      { icon: '🔍', title: 'Unexplained abdominal pain', desc: 'Chronic or recurring abdominal pain requiring comprehensive organ assessment.' },
      { icon: '🩸', title: 'Blood in urine', desc: 'Haematuria investigation — ruling out kidney, bladder or ureteric causes.' },
      { icon: '📉', title: 'Weight loss', desc: 'Unexplained weight loss requiring systemic assessment.' },
      { icon: '📋', title: 'Cancer staging', desc: 'Staging of bowel, pancreatic, renal or hepatic malignancy.' },
    ],
    preparation: [
      'You may be asked to fast for 4–6 hours before a contrast-enhanced CT abdomen.',
      'An oral contrast agent (dilute liquid) may be given 60 minutes before the scan to opacify the bowel.',
      'An intravenous contrast injection is used in most abdominal CT scans — inform the team of allergies or kidney problems.',
      'Drink plenty of water in the 24 hours before your scan.',
    ],
    faqs: [
      { q: 'Is CT abdomen the same as an abdominal ultrasound?', a: 'No. Ultrasound is the first-line investigation for many abdominal conditions — it\'s quick and has no radiation. CT provides more comprehensive coverage and is better for bowel, retroperitoneal structures and vascular assessment. CT also works in patients where ultrasound is limited by body habitus or bowel gas.' },
      { q: 'What\'s the difference between CT abdomen and CT abdomen + pelvis?', a: 'CT abdomen covers from the diaphragm to the iliac crests. Adding the pelvis extends coverage to include the bladder, prostate/uterus and sigmoid colon. Combined CT abdomen and pelvis is the standard for most clinical indications.' },
      { q: 'Can CT detect bowel cancer?', a: 'Yes. CT colonography (virtual colonoscopy) can detect colorectal polyps and cancers. Standard CT abdomen is less sensitive for early polyps but can detect masses and assess disease extent.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'CT Chest' },
      { slug: 'pelvis', name: 'CT Pelvis' },
    ],
  },
]

// ─── ULTRASOUND VARIANTS ─────────────────────────────────────────────────────

export const ULTRASOUND_VARIANTS: BodyPartPage[] = [
  {
    scanType: 'ultrasound',
    partSlug: 'abdomen',
    partName: 'Abdomen',
    h1: 'Private Abdominal Ultrasound Scan',
    metaTitle: 'Private Abdominal Ultrasound Scan | From £99 | No GP Referral | ScanBook',
    metaDesc: 'Private abdominal ultrasound from £99. Liver, gallbladder, kidneys, spleen. No fasting for most scans. Results within 24 hours.',
    priceFrom: 99,
    duration: '20–30 minutes',
    intro: 'A private abdominal ultrasound scan uses sound waves to produce real-time images of the liver, gallbladder, bile ducts, pancreas, spleen, kidneys and bladder — without any radiation. It is the first-line investigation for most abdominal symptoms and delivers immediate images with a written radiologist report within 24 hours.',
    conditions: [
      { label: 'Gallstones & gallbladder disease', desc: 'Detection of gallstones, gallbladder wall thickening, polyps and acute cholecystitis.' },
      { label: 'Liver assessment', desc: 'Fatty liver (NAFLD), liver cysts, haemangiomas, cirrhosis, portal hypertension and focal lesions.' },
      { label: 'Kidney stones & hydronephrosis', desc: 'Renal calculi, obstructed kidneys, cysts and simple masses.' },
      { label: 'Spleen assessment', desc: 'Splenomegaly, splenic lesions and accessory spleen.' },
      { label: 'Abdominal aorta', desc: 'Aortic diameter measurement and aneurysm screening.' },
    ],
    whoNeedsIt: [
      { icon: '😖', title: 'Abdominal pain', desc: 'Right upper quadrant pain, central abdominal pain, flank pain.' },
      { icon: '🧪', title: 'Abnormal blood tests', desc: 'Elevated liver enzymes, renal function impairment, anaemia investigation.' },
      { icon: '🤢', title: 'Nausea & bloating', desc: 'Chronic nausea, bloating, loss of appetite — ruling out structural abdominal cause.' },
      { icon: '🔍', title: 'Screening', desc: 'AAA screening in men over 65, or NAFLD monitoring in patients with metabolic syndrome.' },
    ],
    preparation: [
      'Fast (no food or drink except water) for 4–6 hours before your appointment for best image quality.',
      'You may drink plain water — staying hydrated helps kidney and bladder imaging.',
      'Take all medications as normal with a small sip of water.',
      'Wear comfortable, loose clothing for easy access to the abdomen.',
    ],
    faqs: [
      { q: 'Do I need to fast for an abdominal ultrasound?', a: 'Yes — fasting for 4–6 hours significantly improves image quality, particularly for the gallbladder (which must be full of bile to see clearly). Water is permitted.' },
      { q: 'Can an abdominal ultrasound detect liver disease?', a: 'Yes. Ultrasound is excellent at detecting fatty liver, cirrhosis, focal liver lesions, and biliary pathology. However, it cannot detect all liver diseases — some conditions require MRI or biopsy for diagnosis.' },
      { q: 'How long does an abdominal ultrasound take?', a: 'The scan itself takes 20–30 minutes. The sonographer will apply gel and scan multiple areas of the abdomen.' },
    ],
    relatedParts: [
      { slug: 'pelvis', name: 'Pelvic Ultrasound' },
      { slug: 'thyroid', name: 'Thyroid Ultrasound' },
    ],
  },
  {
    scanType: 'ultrasound',
    partSlug: 'thyroid',
    partName: 'Thyroid',
    h1: 'Private Thyroid Ultrasound Scan',
    metaTitle: 'Private Thyroid Ultrasound Scan | From £109 | No GP Referral | ScanBook',
    metaDesc: 'Private thyroid ultrasound from £109. Thyroid nodules, goitre, enlarged glands. No preparation needed. Results within 24 hours.',
    priceFrom: 109,
    duration: '20–30 minutes',
    intro: 'A private thyroid ultrasound scan assesses the size, structure, and vascularity of the thyroid gland and surrounding lymph nodes. It is the first-line imaging investigation for thyroid nodules, goitre and thyroid cancer risk stratification using internationally validated criteria (TIRADS). No preparation is required and no radiation is involved.',
    conditions: [
      { label: 'Thyroid nodules', desc: 'Detection, characterisation and risk stratification (TIRADS/BTA) of thyroid nodules — guiding decisions about biopsy (FNA).' },
      { label: 'Goitre', desc: 'Simple and multinodular goitre — assessment of gland size and architecture.' },
      { label: 'Thyroiditis', desc: 'Hashimoto\'s thyroiditis, de Quervain\'s thyroiditis — characteristic ultrasound appearances and vascularity patterns.' },
      { label: 'Cervical lymph nodes', desc: 'Assessment of enlarged neck lymph nodes — screening for malignant involvement in thyroid cancer.' },
    ],
    whoNeedsIt: [
      { icon: '👄', title: 'Neck lump or swelling', desc: 'Any palpable lump in the anterior neck — requires ultrasound assessment before further investigation.' },
      { icon: '🩸', title: 'Abnormal thyroid function tests', desc: 'Hyperthyroid or hypothyroid blood results — identifying the structural cause.' },
      { icon: '😮‍💨', title: 'Difficulty swallowing', desc: 'Dysphagia due to a large goitre or substernal thyroid causing tracheal compression.' },
      { icon: '🔍', title: 'Routine monitoring', desc: 'Follow-up imaging for known thyroid nodules, monitoring after thyroidectomy.' },
    ],
    preparation: [
      'No preparation is required for a thyroid ultrasound.',
      'Wear a low-cut top or loose collar to allow easy access to the neck.',
      'You can eat, drink and take medication as normal.',
    ],
    faqs: [
      { q: 'Can a thyroid ultrasound detect cancer?', a: 'Ultrasound identifies suspicious features (irregular margins, microcalcifications, increased vascularity, solid composition) and uses TIRADS classification to guide biopsy recommendations. Only tissue biopsy (FNA) can definitively diagnose thyroid cancer.' },
      { q: 'What is TIRADS?', a: 'TIRADS (Thyroid Imaging Reporting and Data System) is a standardised system for classifying thyroid nodules based on their ultrasound appearance — used to determine whether biopsy is needed.' },
      { q: 'How long does a thyroid ultrasound take?', a: 'Approximately 20–30 minutes. You\'ll lie on your back with your neck slightly extended while the sonographer scans the gland.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'Abdominal Ultrasound' },
    ],
  },
]

// ─── MRI ADDITIONAL PARTS ────────────────────────────────────────────────────

MRI_PARTS.push(
  {
    scanType: 'mri',
    partSlug: 'wrist-hand',
    partName: 'Wrist & Hand',
    h1: 'Private MRI Wrist & Hand Scan',
    metaTitle: 'Private MRI Wrist & Hand Scan | From £275 | No Referral | ScanBook',
    metaDesc: 'Book a private MRI wrist and hand scan from £275. Diagnose fractures, ligament tears, TFCC injuries, carpal tunnel and more. No GP referral. Results in 48 hours.',
    priceFrom: 275,
    duration: '25–40 minutes',
    intro: 'An MRI wrist and hand scan provides exceptional soft-tissue detail that X-Ray cannot show. It is the gold standard for assessing ligament tears, TFCC injuries, avascular necrosis of the scaphoid, and small occult fractures. The scan involves no radiation and is safe for all ages.',
    conditions: [
      { label: 'Scaphoid fracture', desc: 'Small wrist bone fractures often invisible on X-Ray but clearly visible on MRI, especially in the first week after injury.' },
      { label: 'TFCC tear', desc: 'Triangular fibrocartilage complex tears cause ulnar-sided wrist pain and instability. MRI accurately grades the tear severity.' },
      { label: 'Ligament injuries', desc: 'Scapholunate and lunotriquetral ligament tears from falls or sports injuries.' },
      { label: 'Carpal tunnel syndrome', desc: 'MRI identifies median nerve compression and associated synovitis within the carpal tunnel.' },
      { label: 'Ganglion cysts', desc: 'Benign fluid-filled cysts arising from joint capsules or tendon sheaths — precisely mapped on MRI.' },
      { label: 'Avascular necrosis', desc: 'Loss of blood supply to carpal bones, detected earlier with MRI than any other imaging modality.' },
    ],
    whoNeedsIt: [
      { icon: '🤸', title: 'Athletes & sports players', desc: 'Gymnasts, climbers, and racket sport players with persistent wrist pain after injury.' },
      { icon: '🏢', title: 'Desk workers', desc: 'Repetitive strain, carpal tunnel symptoms, or unexplained hand weakness after prolonged computer use.' },
      { icon: '🤲', title: 'Post-trauma patients', desc: 'Anyone who has fallen on an outstretched hand with ongoing pain despite a normal X-Ray.' },
    ],
    preparation: [
      'No special preparation is required for a wrist MRI.',
      'Remove all jewellery, watches, and rings before entering the scan room.',
      'Wear loose clothing or a hospital gown will be provided.',
      'Inform the radiographer of any previous wrist surgeries or metallic implants.',
    ],
    faqs: [
      { q: 'Can MRI detect a hairline fracture in the wrist?', a: 'Yes — MRI is significantly more sensitive than X-Ray for detecting hairline and stress fractures, particularly in the scaphoid. Many scaphoid fractures are missed on initial X-Ray but clearly visible on MRI.' },
      { q: 'How is a wrist MRI performed?', a: 'You will usually lie on the scanner bed with your arm extended through a dedicated wrist coil. Some centres scan the wrist with your arm at your side (the "superman" position). The radiographer will advise which position gives the best image quality.' },
      { q: 'Is a wrist MRI painful?', a: 'MRI is completely painless. You must remain still during each sequence, which may be uncomfortable if your wrist is very painful. Inform the radiographer and they can position you as comfortably as possible.' },
    ],
    relatedParts: [
      { slug: 'shoulder', name: 'Shoulder MRI' },
      { slug: 'elbow', name: 'Elbow MRI' },
      { slug: 'cervical-spine', name: 'Neck MRI' },
    ],
  },
  {
    scanType: 'mri',
    partSlug: 'elbow',
    partName: 'Elbow',
    h1: 'Private MRI Elbow Scan',
    metaTitle: 'Private MRI Elbow Scan | From £275 | No Referral | ScanBook',
    metaDesc: 'Book a private MRI elbow scan from £275. Diagnose tennis elbow, golfer\'s elbow, UCL tears, loose bodies, and cartilage damage. Results within 48 hours.',
    priceFrom: 275,
    duration: '25–40 minutes',
    intro: 'MRI is the definitive investigation for soft-tissue elbow pathology. Whether you have persistent lateral pain (tennis elbow), medial pain (golfer\'s elbow), locking, or a suspected ligament tear, MRI provides the detail needed to guide treatment and avoid unnecessary surgery.',
    conditions: [
      { label: 'Lateral epicondylitis (tennis elbow)', desc: 'MRI shows the extent of extensor carpi radialis brevis tendon degeneration and any associated tears.' },
      { label: 'Medial epicondylitis (golfer\'s elbow)', desc: 'Common flexor tendon origin pathology graded accurately on MRI.' },
      { label: 'UCL tear', desc: 'Ulnar collateral ligament injuries common in throwing athletes. MRI (often with arthrogram) characterises the tear.' },
      { label: 'Loose bodies', desc: 'Cartilage fragments within the elbow joint causing locking or clicking, mapped precisely before arthroscopy.' },
      { label: 'Olecranon bursitis', desc: 'Inflammation and fluid collection over the elbow point.' },
      { label: 'Osteochondral defects', desc: 'Damage to the cartilage and underlying bone, common in young throwers and gymnasts.' },
    ],
    whoNeedsIt: [
      { icon: '🎾', title: 'Racket sport players', desc: 'Persistent lateral elbow pain unresponsive to physiotherapy or steroid injections.' },
      { icon: '⚾', title: 'Throwing athletes', desc: 'Pitchers, cricketers, and javelin throwers with medial elbow pain or instability.' },
      { icon: '🏗️', title: 'Manual workers', desc: 'Repetitive gripping or tool use causing chronic elbow pain or limited movement.' },
    ],
    preparation: [
      'No food or drink restrictions required.',
      'Remove jewellery, watches, and any removable piercings.',
      'You will be positioned with your elbow inside a dedicated coil.',
      'Tell the radiographer about any previous elbow surgery or metallic implants.',
    ],
    faqs: [
      { q: 'Does MRI show tennis elbow?', a: 'Yes. MRI clearly shows the degree of tendon degeneration at the lateral epicondyle, any partial or full tears, and surrounding soft-tissue oedema — all of which guide whether conservative treatment or surgery is appropriate.' },
      { q: 'Do I need an arthrogram for my elbow MRI?', a: 'A standard MRI is sufficient for most elbow conditions. An MRI arthrogram (with contrast injected into the joint) gives better resolution of the UCL, joint capsule, and cartilage, and is typically requested for suspected ligament tears in athletes.' },
      { q: 'How quickly can I get results?', a: 'Your consultant radiologist report is delivered to your ScanBook portal within 48 hours of your scan.' },
    ],
    relatedParts: [
      { slug: 'shoulder', name: 'Shoulder MRI' },
      { slug: 'wrist-hand', name: 'Wrist & Hand MRI' },
    ],
  },
  {
    scanType: 'mri',
    partSlug: 'thoracic-spine',
    partName: 'Thoracic Spine',
    h1: 'Private MRI Thoracic Spine Scan',
    metaTitle: 'Private Thoracic Spine MRI Scan | From £285 | ScanBook',
    metaDesc: 'Book a private MRI thoracic spine (mid-back) scan from £285. Diagnose disc herniation, spinal stenosis, cord compression, and more. No GP referral.',
    priceFrom: 285,
    duration: '30–45 minutes',
    intro: 'The thoracic spine (mid-back) is the least commonly imaged section of the spine but a critical one when symptoms suggest spinal cord involvement. MRI is the only imaging modality that directly visualises the spinal cord itself, making it essential for ruling out serious pathology such as cord compression or myelopathy.',
    conditions: [
      { label: 'Thoracic disc herniation', desc: 'Discs that bulge or rupture in the mid-back, potentially pressing on the spinal cord or nerve roots.' },
      { label: 'Spinal cord compression (myelopathy)', desc: 'Narrowing of the spinal canal that presses on the cord, causing weakness, numbness, or coordination problems.' },
      { label: 'Vertebral fractures', desc: 'Compression fractures from osteoporosis or trauma, with MRI distinguishing acute from old fractures.' },
      { label: 'Scheuermann\'s disease', desc: 'Abnormal vertebral growth in adolescents causing a pronounced kyphosis (rounded upper back).' },
      { label: 'Metastatic disease', desc: 'Secondary cancer deposits in the vertebrae are sensitively detected on MRI before they are visible on X-Ray.' },
      { label: 'Multiple sclerosis plaques', desc: 'Demyelinating lesions in the thoracic cord, a key diagnostic finding in MS workup.' },
    ],
    whoNeedsIt: [
      { icon: '⚡', title: 'Myelopathy symptoms', desc: 'Anyone with progressive weakness, unsteady gait, or numbness in both legs needs urgent thoracic MRI.' },
      { icon: '🦴', title: 'Osteoporosis patients', desc: 'Sudden mid-back pain in a patient with known or suspected osteoporosis warrants MRI to exclude fragility fracture.' },
      { icon: '🔍', title: 'Cancer follow-up', desc: 'Patients with a history of cancer and new back pain to exclude vertebral metastases.' },
    ],
    preparation: [
      'No fasting or special preparation required.',
      'Inform the radiographer of any previous spinal surgery or implants.',
      'Remove all metallic items and wear loose clothing.',
      'Inform the booking team if you have any neurological symptoms — these may be triaged as urgent.',
    ],
    faqs: [
      { q: 'Why is the thoracic spine imaged less often than lumbar or cervical?', a: 'Most spinal problems occur in the lumbar (lower) or cervical (neck) regions because these are the most mobile. The thoracic spine is stabilised by the rib cage, making disc herniation and degeneration less common — but when it does occur, it can be more serious due to the proximity of the spinal cord.' },
      { q: 'Can I have the thoracic and lumbar spine scanned together?', a: 'Yes. Many patients with whole-spine symptoms have both regions scanned in a single appointment. ScanBook partner centres offer multi-area scan pricing.' },
      { q: 'How urgent is a thoracic MRI?', a: 'If you have progressive neurological symptoms — weakness in the legs, loss of bladder or bowel control, or sudden severe mid-back pain — seek emergency care rather than booking a private scan. For subacute pain without neurological symptoms, routine booking is appropriate.' },
    ],
    relatedParts: [
      { slug: 'cervical-spine', name: 'Neck MRI' },
      { slug: 'lumbar-spine', name: 'Lumbar Spine MRI' },
      { slug: 'brain', name: 'Brain MRI' },
    ],
  },
  {
    scanType: 'mri',
    partSlug: 'prostate',
    partName: 'Prostate',
    h1: 'Private Prostate MRI Scan (mpMRI)',
    metaTitle: 'Private Prostate MRI Scan (mpMRI) | From £450 | ScanBook',
    metaDesc: 'Book a private multiparametric prostate MRI (mpMRI) from £450. The gold-standard investigation for prostate cancer detection. No GP referral needed. 48-hour report.',
    priceFrom: 450,
    duration: '45–60 minutes',
    intro: 'Multiparametric MRI (mpMRI) of the prostate is the gold-standard imaging investigation for prostate cancer detection, staging, and active surveillance. It combines multiple MRI sequences to provide a detailed assessment of the prostate gland, seminal vesicles, and surrounding structures. Private prostate MRI avoids the lengthy NHS wait and delivers a consultant radiologist report scored using the internationally validated PI-RADS system.',
    conditions: [
      { label: 'Prostate cancer detection', desc: 'mpMRI detects clinically significant prostate cancer with high sensitivity, enabling targeted biopsy rather than systematic random sampling.' },
      { label: 'Active surveillance', desc: 'Men on active surveillance for low-risk prostate cancer use mpMRI to monitor for disease progression without repeat biopsies.' },
      { label: 'Pre-biopsy assessment', desc: 'NICE guidelines recommend mpMRI before transrectal biopsy to improve diagnostic accuracy and reduce unnecessary procedures.' },
      { label: 'Post-treatment follow-up', desc: 'Assessment of local recurrence after radical prostatectomy or radiotherapy.' },
      { label: 'Elevated PSA investigation', desc: 'Men with a raised PSA who want investigation before or instead of an NHS referral.' },
      { label: 'BPH assessment', desc: 'Benign prostatic hyperplasia causing lower urinary tract symptoms, assessed alongside cancer exclusion.' },
    ],
    whoNeedsIt: [
      { icon: '🩺', title: 'Raised PSA', desc: 'Men with a PSA above the age-adjusted normal range who want rapid investigation without a long NHS wait.' },
      { icon: '📊', title: 'Active surveillance', desc: 'Men with known low-risk prostate cancer being monitored for progression.' },
      { icon: '👨‍👦', title: 'Family history', desc: 'Men with a first-degree relative with prostate cancer who want proactive screening from age 45.' },
    ],
    preparation: [
      'Follow the preparation instructions sent with your booking — these vary by centre.',
      'Most centres require a micro-enema 1 hour before the scan (supplied by the centre).',
      'Avoid ejaculation for 3 days before the scan to improve seminal vesicle visualisation.',
      'Drink 500ml of water 1 hour before to ensure a comfortably full bladder.',
      'Inform the radiographer of any hip replacements or other metallic implants.',
    ],
    faqs: [
      { q: 'What is PI-RADS?', a: 'PI-RADS (Prostate Imaging Reporting and Data System) is an internationally validated scoring system (1–5) used by radiologists to communicate the likelihood of clinically significant prostate cancer. PI-RADS 4 or 5 indicates a high suspicion and typically leads to a targeted biopsy.' },
      { q: 'Is an MRI better than a PSA blood test for prostate cancer?', a: 'They are complementary. PSA is a blood marker that can be elevated by cancer, infection, or benign enlargement. mpMRI directly visualises the prostate to identify suspicious lesions regardless of PSA level. NICE recommends mpMRI before biopsy for all men with a raised PSA.' },
      { q: 'Do I need a rectal coil for prostate MRI?', a: 'Modern 3T scanners routinely perform prostate MRI without a rectal coil. External surface coils placed on the lower abdomen provide excellent image quality. Confirm with your booking centre.' },
    ],
    relatedParts: [
      { slug: 'pelvis', name: 'Pelvis MRI' },
      { slug: 'abdomen', name: 'Abdominal MRI' },
    ],
  }
)

// ─── CT ADDITIONAL PARTS ──────────────────────────────────────────────────────

CT_PARTS.push(
  {
    scanType: 'ct',
    partSlug: 'brain',
    partName: 'Brain',
    h1: 'Private CT Brain Scan',
    metaTitle: 'Private CT Brain Scan | From £185 | No Referral | ScanBook',
    metaDesc: 'Book a private CT brain scan from £185. Fast imaging for headaches, head injury, stroke risk assessment, and sinus conditions. Results within 48 hours.',
    priceFrom: 185,
    duration: '10–20 minutes',
    intro: 'A CT brain scan is the fastest way to obtain detailed images of the brain and skull. It is particularly valuable for assessing head injuries, sudden severe headaches, and stroke — situations where speed matters. While MRI gives better soft-tissue resolution for elective neurological assessment, CT is faster, more widely available, and sufficient for many clinical questions.',
    conditions: [
      { label: 'Head injury assessment', desc: 'Rapid exclusion of intracranial bleeding or fracture following trauma.' },
      { label: 'Sinusitis', desc: 'CT sinus (included in brain protocols) maps the paranasal sinuses for chronic sinusitis or pre-surgical planning.' },
      { label: 'Calcification & masses', desc: 'CT detects calcified lesions, meningiomas, and other intracranial masses.' },
      { label: 'Hydrocephalus', desc: 'Enlargement of the brain\'s fluid spaces, assessed rapidly with CT.' },
      { label: 'Stroke risk', desc: 'Assessment of cerebrovascular disease and existing changes in patients with TIA or stroke history.' },
      { label: 'Aneurysm screening', desc: 'CT angiography of the brain vessels for family history of cerebral aneurysm.' },
    ],
    whoNeedsIt: [
      { icon: '🤕', title: 'Head injury', desc: 'Anyone with a significant head injury who wants rapid reassurance or formal assessment outside A&E.' },
      { icon: '🧠', title: 'Chronic headaches', desc: 'Patients with persistent or changing headache patterns wanting to exclude a structural cause.' },
      { icon: '👴', title: 'Stroke risk', desc: 'Older patients with vascular risk factors, TIA history, or memory concerns.' },
    ],
    preparation: [
      'No fasting required for a non-contrast CT brain scan.',
      'If contrast is requested: fast for 4 hours beforehand.',
      'Inform the radiographer of any allergies, particularly to contrast agents or shellfish.',
      'Remove all metallic items from the head and neck area.',
    ],
    faqs: [
      { q: 'Is CT or MRI better for a brain scan?', a: 'Both are excellent but for different uses. CT is faster (seconds vs 30–45 minutes), better for acute trauma, and more accessible. MRI gives superior soft-tissue detail and is preferred for neurological conditions, tumour characterisation, and MS assessment. For urgent situations, CT is typically the first-line choice.' },
      { q: 'Can a CT brain scan detect a brain tumour?', a: 'CT can detect most significant brain tumours, particularly with contrast. However, small tumours and low-grade gliomas may be missed on CT. If there is strong clinical suspicion of a brain tumour, MRI is the preferred investigation.' },
      { q: 'How much radiation does a CT brain scan involve?', a: 'A single CT brain scan involves approximately 1–2 mSv of radiation — equivalent to 6–12 months of natural background radiation. Modern scanners use automatic dose reduction. The radiation risk for a single scan is very small.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'CT Chest' },
      { slug: 'abdomen', name: 'CT Abdomen' },
    ],
  },
  {
    scanType: 'ct',
    partSlug: 'pelvis',
    partName: 'Pelvis',
    h1: 'Private CT Pelvis Scan',
    metaTitle: 'Private CT Pelvis Scan | From £195 | No Referral | ScanBook',
    metaDesc: 'Book a private CT pelvis scan from £195. Investigate pelvic pain, hip conditions, lymph nodes, and cancer staging. Results within 48 hours.',
    priceFrom: 195,
    duration: '10–20 minutes',
    intro: 'CT of the pelvis provides rapid, detailed imaging of the pelvic bones, bladder, rectum, and surrounding lymph nodes. It is frequently combined with abdominal CT as a single examination. CT pelvis is faster than MRI and is the preferred modality for cancer staging, acute pelvic pain investigation, and assessment of pelvic fractures.',
    conditions: [
      { label: 'Cancer staging', desc: 'Assessment of pelvic lymph nodes and local spread for colorectal, bladder, prostate, and gynaecological cancers.' },
      { label: 'Pelvic fractures', desc: 'Comprehensive assessment of complex fracture patterns following significant trauma.' },
      { label: 'Hip joint assessment', desc: 'Bony detail of hip joints, acetabulum, and femoral head for arthritis staging and pre-surgical planning.' },
      { label: 'Lymph node disease', desc: 'Detection of enlarged pelvic and inguinal lymph nodes in lymphoma or metastatic disease.' },
      { label: 'Bladder conditions', desc: 'Bladder wall thickening, masses, and stones assessed rapidly.' },
      { label: 'Acute pelvic pain', desc: 'Rapid assessment of acute pelvic pain in emergency presentations.' },
    ],
    whoNeedsIt: [
      { icon: '🔬', title: 'Cancer staging', desc: 'Patients with newly diagnosed pelvic malignancy needing rapid staging before treatment planning.' },
      { icon: '🦴', title: 'Hip & pelvic pain', desc: 'Unexplained hip or pelvic pain with normal X-Ray, particularly in older adults.' },
      { icon: '🔴', title: 'Acute pelvic symptoms', desc: 'Significant pelvic pain with no clear cause on clinical examination.' },
    ],
    preparation: [
      'Drink 500ml of water 1 hour before to fill the bladder (improves image quality).',
      'If contrast is planned: fast for 4 hours. A pre-scan blood test for kidney function may be needed.',
      'Inform the radiographer of any previous pelvic surgery or implants.',
      'Inform the booking team if you are or might be pregnant.',
    ],
    faqs: [
      { q: 'Should I have CT or MRI for my pelvis?', a: 'CT is faster and better for bone, lymph nodes, and cancer staging. MRI gives superior soft-tissue detail and is preferred for prostate, uterus, ovary, and rectal assessments. Many patients have both, as they provide complementary information.' },
      { q: 'Can a CT pelvis detect ovarian cysts?', a: 'CT can detect large ovarian cysts and masses. However, for characterising ovarian pathology in detail — particularly distinguishing benign from malignant lesions — pelvic ultrasound and MRI are more sensitive. If you have pelvic pain, ultrasound is usually the first-line investigation.' },
      { q: 'Is CT safe during pregnancy?', a: 'CT involves ionising radiation and should be avoided during pregnancy unless the clinical benefit clearly outweighs the risk. If you are or might be pregnant, please inform us at booking. Ultrasound and MRI are the preferred modalities during pregnancy.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'CT Abdomen' },
      { slug: 'chest', name: 'CT Chest' },
    ],
  },
  {
    scanType: 'ct',
    partSlug: 'cardiac',
    partName: 'Cardiac',
    h1: 'Private Cardiac CT Scan (CTCA)',
    metaTitle: 'Private Cardiac CT Scan (CTCA) | From £495 | ScanBook',
    metaDesc: 'Book a private CT coronary angiogram (CTCA) from £495. Assess coronary artery disease, calcium scoring, and heart health. Fast results. No GP referral.',
    priceFrom: 495,
    duration: '20–40 minutes',
    intro: 'CT coronary angiography (CTCA) is a non-invasive method to assess the coronary arteries — the blood vessels that supply the heart muscle. CTCA can detect narrowings, blockages, and calcification in the coronary arteries without the need for a catheter procedure. It is increasingly recommended by NICE as the first-line investigation for chest pain with suspected angina.',
    conditions: [
      { label: 'Coronary artery disease', desc: 'Detection and quantification of atherosclerotic plaques and stenosis in the coronary arteries.' },
      { label: 'Coronary calcium scoring', desc: 'Quantification of calcified plaque burden — a powerful predictor of future cardiac events.' },
      { label: 'Chest pain investigation', desc: 'NICE-recommended first investigation for stable chest pain with suspected stable angina.' },
      { label: 'Structural heart disease', desc: 'Assessment of valves, chambers, pericardium, and great vessels.' },
      { label: 'Pre-surgical assessment', desc: 'Coronary anatomy mapping before valve surgery, TAVI, or bypass planning.' },
      { label: 'Cardiac risk screening', desc: 'Proactive assessment for high-risk individuals with multiple cardiovascular risk factors.' },
    ],
    whoNeedsIt: [
      { icon: '❤️', title: 'Chest pain', desc: 'Patients with exertional chest tightness or pain who want rapid investigation without a long cardiology wait.' },
      { icon: '📊', title: 'High cardiovascular risk', desc: 'Men over 45 and women over 55 with two or more risk factors (smoking, hypertension, diabetes, family history).' },
      { icon: '🏃', title: 'Executive health screening', desc: 'Part of a comprehensive health check for individuals wanting proactive heart health assessment.' },
    ],
    preparation: [
      'Fast for 4 hours before the scan (water is allowed).',
      'Avoid caffeine for 12 hours — it raises heart rate and can affect image quality.',
      'Beta-blocker medication may be prescribed before the scan to slow the heart rate; your booking team will advise.',
      'Inform the team of any kidney disease, contrast allergies, or current medications.',
      'Avoid vigorous exercise on the day of the scan.',
    ],
    faqs: [
      { q: 'What is the difference between a CTCA and a coronary angiogram?', a: 'A traditional coronary angiogram (cardiac catheterisation) is an invasive procedure requiring a catheter inserted into an artery. CTCA achieves similar diagnostic information non-invasively using an intravenous contrast injection and CT scanner. CTCA avoids the small but real risks of catheterisation.' },
      { q: 'Can CTCA replace a stress test?', a: 'For stable chest pain, CTCA is now NICE-recommended as the preferred first investigation (over exercise stress testing) because it directly shows the anatomy of the coronary arteries rather than just the functional response. Stress tests and CTCA are complementary in some cases.' },
      { q: 'What is a calcium score?', a: 'A calcium score (Agatston score) quantifies the amount of calcified plaque in the coronary arteries. A score of zero indicates very low risk; higher scores indicate increasing risk. It can be performed without contrast as a quick, low-dose scan taking under 10 minutes.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'CT Chest' },
      { slug: 'abdomen', name: 'CT Abdomen' },
    ],
  }
)

// ─── ULTRASOUND ADDITIONAL VARIANTS ───────────────────────────────────────────

ULTRASOUND_VARIANTS.push(
  {
    scanType: 'ultrasound',
    partSlug: 'pelvis',
    partName: 'Pelvis',
    h1: 'Private Pelvic Ultrasound Scan',
    metaTitle: 'Private Pelvic Ultrasound Scan | From £99 | No Referral | ScanBook',
    metaDesc: 'Book a private pelvic ultrasound scan from £99. Investigate pelvic pain, fibroids, ovarian cysts, endometriosis, and uterine conditions. Same-day results.',
    priceFrom: 99,
    duration: '20–30 minutes',
    intro: 'A pelvic ultrasound is the first-line imaging investigation for most gynaecological conditions. It assesses the uterus and ovaries in detail, detecting fibroids, cysts, polyps, and other abnormalities. Transvaginal ultrasound (with your consent) gives sharper images of the pelvic organs than an abdominal scan alone.',
    conditions: [
      { label: 'Uterine fibroids', desc: 'Non-cancerous growths within or on the uterus — sized, mapped, and quantified on ultrasound.' },
      { label: 'Ovarian cysts', desc: 'Fluid-filled sacs on the ovaries — characterised as simple or complex to guide management.' },
      { label: 'Endometriosis', desc: 'Ultrasound can detect endometriomas (chocolate cysts) and deep infiltrating endometriosis in experienced hands.' },
      { label: 'Polycystic ovary syndrome (PCOS)', desc: 'Multiple small follicles and ovarian volume increase are key diagnostic features assessed on ultrasound.' },
      { label: 'Pelvic inflammatory disease', desc: 'Fluid, thickened tubes, and ovarian changes associated with infection.' },
      { label: 'Abnormal uterine bleeding', desc: 'Uterine lining thickness and cavity abnormalities including polyps and hyperplasia.' },
    ],
    whoNeedsIt: [
      { icon: '🔴', title: 'Pelvic pain', desc: 'Women with chronic or recurrent lower abdominal or pelvic pain seeking a definitive diagnosis.' },
      { icon: '🌊', title: 'Abnormal periods', desc: 'Heavy, irregular, or painful menstruation where fibroids, polyps, or endometriosis may be the cause.' },
      { icon: '🤱', title: 'Fertility concerns', desc: 'Women investigating their fertility, tracking follicle development, or monitoring after IVF.' },
    ],
    preparation: [
      'For an abdominal scan: drink 1 litre of water 1 hour before and do not empty your bladder.',
      'For a transvaginal scan: empty your bladder immediately before the appointment.',
      'If having both: drink water first; you will be scanned abdominally, then asked to empty your bladder for the transvaginal scan.',
      'Wear comfortable, loose clothing. You may be asked to change into a gown.',
    ],
    faqs: [
      { q: 'Is a transvaginal ultrasound necessary?', a: 'A transvaginal ultrasound gives significantly clearer images of the uterus and ovaries, especially in early pregnancy and for detecting small fibroids or polyps. It is always optional. The sonographer will explain the benefits and obtain your consent before proceeding.' },
      { q: 'Can ultrasound detect ovarian cancer?', a: 'Ultrasound can detect ovarian masses and characterise their appearance (simple, complex, solid). Suspicious features prompt further investigation with MRI and blood tests (CA125). Ultrasound alone cannot definitively diagnose cancer.' },
      { q: 'Will I get results the same day?', a: 'The sonographer will share initial findings during the scan. A written radiologist report is usually available within 24 hours.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'Abdominal Ultrasound' },
      { slug: 'thyroid', name: 'Thyroid Ultrasound' },
    ],
  },
  {
    scanType: 'ultrasound',
    partSlug: 'breast',
    partName: 'Breast',
    h1: 'Private Breast Ultrasound Scan',
    metaTitle: 'Private Breast Ultrasound Scan | From £120 | ScanBook',
    metaDesc: 'Book a private breast ultrasound scan from £120. Assess lumps, cysts, and abnormalities. Often used alongside mammography. Results within 24 hours.',
    priceFrom: 120,
    duration: '20–30 minutes',
    intro: 'Breast ultrasound is the key complementary investigation alongside mammography for assessing breast lumps and abnormalities. It is particularly useful in younger women (under 40) where breast tissue is dense and mammography is less sensitive. Ultrasound clearly distinguishes cysts from solid masses and guides biopsy when needed.',
    conditions: [
      { label: 'Breast lumps', desc: 'Characterisation of palpable lumps as cystic (fluid-filled) or solid — the crucial distinction guiding next steps.' },
      { label: 'Breast cysts', desc: 'Simple cysts are benign; complex cysts may require further assessment or aspiration.' },
      { label: 'Breast pain', desc: 'Focal breast pain without a palpable lump investigated to exclude underlying pathology.' },
      { label: 'Nipple discharge', desc: 'Ultrasound identifies dilated ducts or masses behind the nipple associated with discharge.' },
      { label: 'Axillary lymph nodes', desc: 'Assessment of lymph nodes in the armpit for enlargement, which may indicate infection or malignancy.' },
      { label: 'Post-mammography assessment', desc: 'Further characterisation of lesions identified on mammography or MRI.' },
    ],
    whoNeedsIt: [
      { icon: '🔍', title: 'Palpable lump', desc: 'Any new or changed breast lump should be assessed promptly. Ultrasound is usually the first-line investigation.' },
      { icon: '👩', title: 'Women under 40', desc: 'Dense breast tissue makes mammography less reliable. Ultrasound is the preferred modality in younger women.' },
      { icon: '📋', title: 'Surveillance', desc: 'Women with a family history of breast cancer or known high-risk gene variants undergoing regular imaging surveillance.' },
    ],
    preparation: [
      'No special preparation is required.',
      'Avoid applying deodorant, lotion, or talcum powder to the breast or underarm area on the day of the scan.',
      'Wear a top that can be easily removed to the waist.',
      'Inform the sonographer of any previous breast surgery, implants, or biopsies.',
    ],
    faqs: [
      { q: 'Is breast ultrasound or mammography better?', a: 'They are complementary. Mammography is the primary breast cancer screening tool. Ultrasound is better at characterising lumps, assessing dense breast tissue, and guiding biopsy. Most breast clinics use both together.' },
      { q: 'Can a breast ultrasound detect cancer?', a: 'Ultrasound can identify suspicious masses, but it cannot definitively diagnose cancer. A biopsy is required for a tissue diagnosis. If a suspicious lesion is found, you will be advised on the appropriate next steps.' },
      { q: 'Do I need a GP referral?', a: 'No. You can book a private breast ultrasound through ScanBook without seeing your GP. However, if you discover a new breast lump, we strongly recommend also contacting your GP, who can refer you to an NHS breast clinic if needed.' },
    ],
    relatedParts: [
      { slug: 'abdomen', name: 'Abdominal Ultrasound' },
      { slug: 'pelvis', name: 'Pelvic Ultrasound' },
    ],
  }
)

// ─── X-RAY BODY PARTS ─────────────────────────────────────────────────────────

export const XRAY_PARTS: BodyPartPage[] = [
  {
    scanType: 'xray',
    partSlug: 'chest',
    partName: 'Chest',
    h1: 'Private Chest X-Ray',
    metaTitle: 'Private Chest X-Ray | From £75 | Same Day | ScanBook',
    metaDesc: 'Book a private chest X-ray from £75. Fast assessment of lungs, heart, and ribcage. Useful for chest infections, breathlessness, and pre-employment medicals. Same-day results.',
    priceFrom: 75,
    duration: '10–15 minutes',
    intro: 'A chest X-ray is one of the most commonly performed medical investigations. It provides rapid assessment of the lungs, heart size, ribcage, and diaphragm. Private chest X-ray through ScanBook delivers results the same day — essential for pre-employment medicals, visa applications, and rapid symptom assessment.',
    conditions: [
      { label: 'Chest infections & pneumonia', desc: 'Opacities in the lung fields indicate consolidation or infection.' },
      { label: 'Pleural effusion', desc: 'Fluid around the lungs detected as haziness at the lung base.' },
      { label: 'Pneumothorax', desc: 'Collapsed lung — a medical emergency that X-ray can rapidly identify.' },
      { label: 'Heart size assessment', desc: 'Cardiomegaly (enlarged heart) visible on chest X-ray as a widened cardiac silhouette.' },
      { label: 'Rib fractures', desc: 'Following chest trauma, fractures of the ribs and sternum are assessed.' },
      { label: 'Pre-employment & visa', desc: 'Many employers and visa applications (TB screening) require a formal chest X-ray report.' },
    ],
    whoNeedsIt: [
      { icon: '🫁', title: 'Respiratory symptoms', desc: 'Persistent cough, breathlessness, or chest pain that has not been investigated.' },
      { icon: '📋', title: 'Pre-employment medicals', desc: 'Healthcare workers, pilots, and other regulated professions requiring a chest X-ray for employment clearance.' },
      { icon: '✈️', title: 'Visa & immigration', desc: 'Many countries and the UK Home Office require a TB screening chest X-ray as part of the visa process.' },
    ],
    preparation: [
      'No special preparation required.',
      'Wear a top that is easy to remove — you will need to expose your chest.',
      'Remove all jewellery and underwired bras before the scan.',
      'Inform the radiographer if you are or might be pregnant.',
    ],
    faqs: [
      { q: 'How quickly will I get my chest X-ray results?', a: 'A written radiologist report is typically available the same day or within 24 hours. You will receive notification via your ScanBook portal when the report is ready.' },
      { q: 'Can a chest X-ray detect lung cancer?', a: 'A chest X-ray can identify suspicious lung masses and nodules. However, CT of the chest is far more sensitive for detecting small lung cancers and is the recommended investigation for high-risk patients. If you have concerns about lung cancer, a low-dose CT chest is the appropriate scan.' },
      { q: 'Is a chest X-ray safe?', a: 'A chest X-ray involves a very small amount of ionising radiation — equivalent to approximately 3 days of natural background radiation. The radiation risk is negligible, and the diagnostic benefit is significant.' },
    ],
    relatedParts: [
      { slug: 'knee', name: 'Knee X-Ray' },
      { slug: 'spine', name: 'Spine X-Ray' },
    ],
  },
  {
    scanType: 'xray',
    partSlug: 'knee',
    partName: 'Knee',
    h1: 'Private Knee X-Ray',
    metaTitle: 'Private Knee X-Ray | From £75 | Fast Results | ScanBook',
    metaDesc: 'Book a private knee X-ray from £75. Assess arthritis, fractures, joint space, and alignment. Results same day. No GP referral needed.',
    priceFrom: 75,
    duration: '10–15 minutes',
    intro: 'A knee X-ray is the essential first investigation for knee pain, especially in older patients where osteoarthritis is suspected. Multiple views assess the joint space, bony alignment, and the presence of osteophytes, loose bodies, or fractures. Weight-bearing views reflect the true joint space under load.',
    conditions: [
      { label: 'Osteoarthritis', desc: 'Joint space narrowing, osteophytes (bone spurs), and subchondral sclerosis — graded using the Kellgren-Lawrence scale.' },
      { label: 'Knee fractures', desc: 'Tibial plateau fractures, patella fractures, and distal femur fractures assessed after trauma.' },
      { label: 'Patella alignment', desc: 'Patella alta, baja, or lateral tilt associated with anterior knee pain and instability.' },
      { label: 'Loose bodies', desc: 'Bony or calcified fragments within the joint causing locking or catching.' },
      { label: 'Gout & pseudogout', desc: 'Crystal deposition visible as chondrocalcinosis in the joint cartilage.' },
      { label: 'Post-surgical assessment', desc: 'Alignment and position of implants following knee replacement or osteotomy.' },
    ],
    whoNeedsIt: [
      { icon: '🦵', title: 'Knee pain', desc: 'Anyone with knee pain lasting more than 6 weeks, particularly with swelling, stiffness, or difficulty weight-bearing.' },
      { icon: '🏃', title: 'Post-injury', desc: 'Following a fall, sports injury, or direct blow to the knee where a fracture needs to be excluded.' },
      { icon: '🦳', title: 'Arthritis monitoring', desc: 'Patients with known knee arthritis monitoring for progression before considering joint replacement.' },
    ],
    preparation: [
      'No preparation required.',
      'Wear loose trousers or shorts — you will need to expose the knee.',
      'Inform the radiographer of any previous knee surgery or metallic implants.',
      'Weight-bearing views will be requested for arthritis assessment — you will be asked to stand.',
    ],
    faqs: [
      { q: 'Is X-ray or MRI better for a knee injury?', a: 'X-ray assesses bone and joint space — it is the appropriate first investigation for suspected fracture or arthritis. MRI is superior for soft-tissue structures (ligaments, menisci, cartilage) and is the investigation of choice for suspected ACL tear, meniscal injury, or bone bruising after trauma.' },
      { q: 'How many views will be taken?', a: 'A standard knee series includes 2–3 views: anteroposterior (AP), lateral, and sometimes a skyline (patella) view. Weight-bearing AP views are requested when assessing arthritis.' },
      { q: 'Do I need a referral for a private knee X-ray?', a: 'No. You can book directly through ScanBook without seeing a GP. Your radiologist report will advise whether further imaging (such as MRI) is recommended.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'Chest X-Ray' },
      { slug: 'hip', name: 'Hip X-Ray' },
      { slug: 'ankle', name: 'Ankle X-Ray' },
    ],
  },
  {
    scanType: 'xray',
    partSlug: 'spine',
    partName: 'Spine',
    h1: 'Private Spine X-Ray (Back X-Ray)',
    metaTitle: 'Private Spine X-Ray | From £85 | Back Pain Investigation | ScanBook',
    metaDesc: 'Book a private spine X-ray from £85. Assess back pain, scoliosis, fractures, and alignment. Lumbar, cervical, or thoracic regions. Fast results.',
    priceFrom: 85,
    duration: '15–20 minutes',
    intro: 'A spinal X-ray provides rapid assessment of the vertebral alignment, disc space height, and bony structures of the cervical (neck), thoracic (mid-back), or lumbar (lower back) spine. While MRI gives better soft-tissue detail, X-ray is an appropriate first investigation for back pain, scoliosis assessment, and post-trauma evaluation.',
    conditions: [
      { label: 'Scoliosis', desc: 'Lateral curvature of the spine assessed and quantified using the Cobb angle on full-length spinal X-ray.' },
      { label: 'Vertebral fractures', desc: 'Compression fractures from osteoporosis or trauma detected on lateral views.' },
      { label: 'Disc space narrowing', desc: 'Reduced height between vertebrae indicating disc degeneration, often the first radiological sign of spondylosis.' },
      { label: 'Spondylolisthesis', desc: 'Forward slippage of one vertebra on another — graded on weight-bearing lateral X-ray.' },
      { label: 'Ankylosing spondylitis', desc: 'Sacroiliac joint changes and syndesmophytes (bony bridges between vertebrae) in inflammatory spinal disease.' },
      { label: 'Cervical spondylosis', desc: 'Age-related degenerative changes in the neck including osteophytes and disc space loss.' },
    ],
    whoNeedsIt: [
      { icon: '💪', title: 'Back pain', desc: 'Patients with persistent back pain, particularly if there is a history of trauma, cancer, or osteoporosis.' },
      { icon: '📐', title: 'Scoliosis monitoring', desc: 'Children and adolescents with known or suspected scoliosis requiring Cobb angle measurement.' },
      { icon: '🦴', title: 'Osteoporosis', desc: 'Patients with confirmed osteoporosis and new back pain to exclude fragility fractures.' },
    ],
    preparation: [
      'No preparation required.',
      'You will be asked to stand or lie for different views.',
      'Remove clothing from the area being imaged — a gown will be provided.',
      'Remove all belts, zips, and jewellery from the area of interest.',
    ],
    faqs: [
      { q: 'What is the difference between a spine X-ray and spine MRI?', a: 'Spine X-ray shows bone and alignment in seconds. MRI shows the discs, nerves, spinal cord, and soft tissues in far greater detail. X-ray is appropriate for fractures, alignment, and arthritis. MRI is required to assess disc herniations, nerve compression, and spinal cord involvement.' },
      { q: 'Can a spine X-ray show a slipped disc?', a: 'X-ray cannot directly show discs or nerves. It can show disc space narrowing (suggesting disc degeneration) but cannot confirm a disc herniation. MRI is the investigation of choice for suspected disc prolapse.' },
      { q: 'Which region of the spine will be imaged?', a: 'You can book X-ray of the cervical (neck), thoracic (mid-back), or lumbar (lower back) spine — or a full-spine view for scoliosis. Specify your area of concern at booking.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'Chest X-Ray' },
      { slug: 'hip', name: 'Hip X-Ray' },
    ],
  },
  {
    scanType: 'xray',
    partSlug: 'hip',
    partName: 'Hip',
    h1: 'Private Hip X-Ray',
    metaTitle: 'Private Hip X-Ray | From £75 | Arthritis & Fractures | ScanBook',
    metaDesc: 'Book a private hip X-ray from £75. Assess hip arthritis, fractures, avascular necrosis, and implant position. Fast results. No GP referral.',
    priceFrom: 75,
    duration: '10–15 minutes',
    intro: 'Hip X-ray is the primary investigation for hip pain, particularly in older patients with suspected osteoarthritis or fracture. A pelvic X-ray (showing both hips) is the standard view, supplemented by a lateral view of the affected side. Hip X-ray is rapid, informative, and should precede MRI or CT in most cases of hip pain.',
    conditions: [
      { label: 'Hip osteoarthritis', desc: 'Joint space narrowing, osteophytes, and femoral head deformity graded on standing AP X-ray.' },
      { label: 'Hip fractures', desc: 'Neck of femur fractures in older patients following a fall — a surgical emergency.' },
      { label: 'Avascular necrosis', desc: 'Collapse of the femoral head from loss of blood supply — initially subtle on X-ray but progresses to obvious collapse.' },
      { label: 'Hip dysplasia', desc: 'Shallow acetabulum causing hip instability and early arthritis, identified in young adults.' },
      { label: 'Implant assessment', desc: 'Position, loosening, and wear of hip replacement components on follow-up X-ray.' },
      { label: 'Femoroacetabular impingement', desc: 'Bony overgrowth on the femoral head or acetabulum causing pain and movement restriction.' },
    ],
    whoNeedsIt: [
      { icon: '🦴', title: 'Hip pain', desc: 'Any adult with hip pain limiting walking, stairs, or sleep, particularly those over 50.' },
      { icon: '🤕', title: 'After a fall', desc: 'Elderly patients who fall and have hip pain need urgent X-ray to exclude a femoral neck fracture.' },
      { icon: '🔩', title: 'Hip replacement review', desc: 'Post-operative surveillance of hip replacement patients to monitor implant position and joint wear.' },
    ],
    preparation: [
      'No special preparation required.',
      'Wear comfortable loose clothing — you may need to change into a gown.',
      'Remove belts and any metallic items around the hip and pelvis area.',
      'Inform the radiographer of any hip implants or previous surgery.',
    ],
    faqs: [
      { q: 'What is the difference between hip X-ray and hip MRI?', a: 'X-ray is the first-line investigation for suspected arthritis or fracture. MRI is required for stress fractures (invisible on X-ray in the early stages), avascular necrosis before collapse develops, soft-tissue assessment, and labral tears. Many patients need both.' },
      { q: 'How accurate is hip X-ray for arthritis?', a: 'X-ray is very accurate for moderate and severe hip arthritis. Early arthritis may be missed as significant cartilage loss can occur before joint space narrowing is visible on X-ray. MRI and specialised weight-bearing imaging give earlier detection.' },
      { q: 'Can I walk normally after a hip X-ray?', a: 'Yes. X-ray has no physical effect on the body. You can drive, walk, and resume all activities immediately afterwards.' },
    ],
    relatedParts: [
      { slug: 'knee', name: 'Knee X-Ray' },
      { slug: 'spine', name: 'Spine X-Ray' },
    ],
  },
  {
    scanType: 'xray',
    partSlug: 'hand-wrist',
    partName: 'Hand & Wrist',
    h1: 'Private Hand & Wrist X-Ray',
    metaTitle: 'Private Hand & Wrist X-Ray | From £75 | ScanBook',
    metaDesc: 'Book a private hand and wrist X-ray from £75. Assess fractures, arthritis, gout, and bone alignment. Fast results. No GP referral needed.',
    priceFrom: 75,
    duration: '10–15 minutes',
    intro: 'Hand and wrist X-ray is the first-line investigation for injury, pain, or swelling in the hands and wrists. Multiple views assess each individual bone and joint, making it the essential investigation for fractures following falls, arthritis assessment, and gout. Small bones like the scaphoid require additional dedicated views.',
    conditions: [
      { label: 'Wrist fractures', desc: 'Distal radius fractures (Colles\' fracture) from falls on an outstretched hand are among the most common fractures in adults.' },
      { label: 'Scaphoid fracture', desc: 'A frequently missed fracture requiring dedicated scaphoid views; MRI is recommended if initial X-ray is normal but suspicion remains high.' },
      { label: 'Hand arthritis', desc: 'Erosive rheumatoid changes or osteoarthritis at the interphalangeal and metacarpophalangeal joints.' },
      { label: 'Gout', desc: 'Soft-tissue tophi and characteristic bony erosions in chronic gout.' },
      { label: 'Foreign bodies', desc: 'Metallic or glass foreign bodies in the hand detected on X-ray.' },
      { label: 'Finger fractures', desc: 'Assessment following sports injuries — catching a ball, ball sports, or contact sports.' },
    ],
    whoNeedsIt: [
      { icon: '🤚', title: 'Hand or wrist injury', desc: 'Any significant fall, crush, or twisting injury to the wrist or hand requiring fracture exclusion.' },
      { icon: '🦱', title: 'Arthritis assessment', desc: 'Patients with swollen, stiff, or painful finger joints wanting a baseline assessment and diagnosis.' },
      { icon: '🎯', title: 'Sports injuries', desc: 'Athletes with hand injuries from ball sports, martial arts, or contact sports.' },
    ],
    preparation: [
      'No preparation required.',
      'Remove all rings, bracelets, and watches before the scan.',
      'You will be asked to position your hand flat on the X-ray plate for each view.',
      'Tell the radiographer exactly where the pain or swelling is so the correct views are taken.',
    ],
    faqs: [
      { q: 'What if my wrist X-ray is normal but I still have pain?', a: 'A normal wrist X-ray does not exclude all injuries. Scaphoid fractures, cartilage damage, ligament tears, and bone bruising require MRI for diagnosis. If pain persists after a normal X-ray, a wrist MRI is the appropriate next step.' },
      { q: 'How many views will be taken?', a: 'A standard wrist series includes 3 views: PA (front), lateral, and oblique. A scaphoid series adds a scaphoid-specific view. Hand series include PA, oblique, and lateral views.' },
      { q: 'Can X-ray detect a fracture that happened weeks ago?', a: 'Yes. Fractures healing with new bone formation (callus) are often more visible on X-ray 2–3 weeks after injury than on initial imaging.' },
    ],
    relatedParts: [
      { slug: 'chest', name: 'Chest X-Ray' },
      { slug: 'spine', name: 'Spine X-Ray' },
    ],
  },
  {
    scanType: 'xray',
    partSlug: 'ankle',
    partName: 'Ankle & Foot',
    h1: 'Private Ankle & Foot X-Ray',
    metaTitle: 'Private Ankle & Foot X-Ray | From £75 | ScanBook',
    metaDesc: 'Book a private ankle and foot X-ray from £75. Assess fractures, sprains, arthritis, and foot conditions. No GP referral. Fast results.',
    priceFrom: 75,
    duration: '10–15 minutes',
    intro: 'Ankle and foot X-ray is the primary investigation following ankle sprains, twisting injuries, and foot pain. Ottawa ankle rules help determine whether X-ray is necessary, but private patients often prefer rapid definitive assessment. X-ray assesses the bony structures while MRI is required for ligament and tendon assessment.',
    conditions: [
      { label: 'Ankle fractures', desc: 'Malleolar fractures, Lisfranc injuries, and calcaneal (heel bone) fractures assessed after trauma.' },
      { label: 'Foot fractures', desc: 'Metatarsal fractures — particularly the base of the 5th metatarsal — commonly missed at initial presentation.' },
      { label: 'Ankle arthritis', desc: 'Joint space narrowing and osteophyte formation at the tibiotalar and subtalar joints.' },
      { label: 'Hallux valgus (bunion)', desc: 'Severity and alignment assessed before surgical correction.' },
      { label: 'Flat feet', desc: 'Arch height and talocalcaneal angle measured for orthotics prescription and surgical planning.' },
      { label: 'Heel spurs', desc: 'Calcaneal spurs associated with plantar fasciitis visible as bony projections on lateral view.' },
    ],
    whoNeedsIt: [
      { icon: '⚽', title: 'Sports injury', desc: 'Ankle sprains from football, running, and court sports where fracture needs to be excluded.' },
      { icon: '👟', title: 'Foot pain', desc: 'Persistent foot pain, particularly in runners, hikers, and people on their feet all day.' },
      { icon: '🦶', title: 'Deformity', desc: 'Hallux valgus, hammer toes, or flat feet being considered for surgical correction.' },
    ],
    preparation: [
      'No special preparation required.',
      'Wear clothing that allows easy removal of shoes, socks, and trousers to the knee.',
      'Remove all ankle bracelets and foot jewellery.',
      'If you can weight-bear, standing views will be taken for arthritis and deformity assessment.',
    ],
    faqs: [
      { q: 'What is the difference between an ankle X-ray and ankle MRI?', a: 'X-ray assesses the bones and joint space. MRI assesses ligaments (ATFL, CFL), tendons (Achilles, peroneal), and cartilage. For a severe ankle sprain with ongoing instability, an MRI is the investigation of choice after an initial X-ray has excluded fracture.' },
      { q: 'Do I need an X-ray after an ankle sprain?', a: 'The Ottawa rules suggest X-ray is indicated if there is pain at the malleolar zone AND inability to weight-bear, or tenderness at specific bony points. If you are unsure, a private X-ray gives rapid reassurance and a formal radiologist report.' },
      { q: 'Can I walk on my ankle after the X-ray?', a: 'X-ray itself has no effect on the ankle. If a fracture is identified in the report, you will be advised to seek appropriate treatment.' },
    ],
    relatedParts: [
      { slug: 'knee', name: 'Knee X-Ray' },
      { slug: 'hip', name: 'Hip X-Ray' },
      { slug: 'spine', name: 'Spine X-Ray' },
    ],
  },
]

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export function getMriPart(slug: string): BodyPartPage | undefined {
  return MRI_PARTS.find(p => p.partSlug === slug)
}

export function getCtPart(slug: string): BodyPartPage | undefined {
  return CT_PARTS.find(p => p.partSlug === slug)
}

export function getUltrasoundVariant(slug: string): BodyPartPage | undefined {
  return ULTRASOUND_VARIANTS.find(p => p.partSlug === slug)
}

export function getXrayPart(slug: string): BodyPartPage | undefined {
  return XRAY_PARTS.find(p => p.partSlug === slug)
}

export function getAllMriSlugs(): string[] {
  return MRI_PARTS.map(p => p.partSlug)
}

export function getAllCtSlugs(): string[] {
  return CT_PARTS.map(p => p.partSlug)
}

export function getAllUltrasoundSlugs(): string[] {
  return ULTRASOUND_VARIANTS.map(p => p.partSlug)
}

export function getAllXraySlugs(): string[] {
  return XRAY_PARTS.map(p => p.partSlug)
}
