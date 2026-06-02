// Referral form PDF generator
// Matches UK clinical standard (based on NHS/CQC requirements)
// Compatible with GetScanned, scanbook.co.uk and NHS GP systems

export interface ReferralFormData {
  // Patient
  patientFullName: string;
  patientDob: string;
  patientSex: string;
  patientAddress: string;
  patientPostcode: string;
  patientEmail: string;
  patientPhone: string;
  patientNationality?: string;

  // Personal GP
  gpName?: string;
  gpSurgeryName?: string;
  gpSurgeryAddress?: string;
  gpEmail?: string;

  // Referring Clinician (if applicable)
  referrerName?: string;
  referrerJobRole?: string;
  referrerClinic?: string;
  referrerEmail?: string;
  referrerGmcNumber?: string;

  // Examination
  scanType: string;           // e.g. "PET-CT Scan"
  bodyParts: string;          // e.g. "Whole body (skull base to mid-thigh)"
  clinicalSymptoms: string;   // Patient's description of symptoms
  clinicalQuery: string;      // Clinical question being asked
  contrastRequired?: boolean;

  // MRI Safety (metal / implants)
  metalImplants?: boolean;
  metalImplantsDetail?: string;
  cardiacPacemaker?: boolean;
  metalwork?: boolean;
  jointReplacement?: boolean;
  contraceptiveCoil?: boolean;
  cochlearImplant?: boolean;
  hydrocephalusShunt?: boolean;
  dentalImplants?: boolean;
  metallicEyeObject?: boolean;
  recentSurgery?: boolean;     // Surgery in last 3 months
  recentSurgeryDetail?: string;

  // General health
  allergies?: boolean;
  allergiesDetail?: string;
  infectionRisk?: boolean;
  diabetic?: boolean;
  specialNeeds?: string;
  claustrophobia?: boolean;

  // Contrast-specific
  kidneyFunctionNormal?: boolean;
  lastGfr?: string;

  // Female patients
  pregnant?: boolean;
  lastMenstrualPeriod?: string;
  breastfeeding?: boolean;

  // Booking reference
  bookingRef: string;
  clinicName: string;
  clinicAddress: string;
  appointmentDate: string;
  completedAt: string;
}

function yesNo(val?: boolean | null): string {
  if (val === true) return 'Yes';
  if (val === false) return 'No';
  return 'Not stated';
}

function field(label: string, value: string | undefined): string {
  return `
    <tr>
      <td style="padding:6px 10px;font-weight:600;color:#1a1a1a;width:45%;border-bottom:1px dashed #ccc;font-size:13px">${label}</td>
      <td style="padding:6px 10px;color:#333;border-bottom:1px dashed #ccc;font-size:13px">${value || '<span style="color:#999">—</span>'}</td>
    </tr>`;
}

function section(title: string, rows: string): string {
  return `
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
      <thead>
        <tr>
          <th colspan="2" style="background:#2B7A9E;color:white;padding:8px 10px;text-align:left;font-size:13px;font-weight:600;border-radius:3px 3px 0 0">${title}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

export function generateReferralFormHtml(data: ReferralFormData): string {
  const metalChecklist = [
    data.metalImplants && 'Any known metallic piercing/object/shrapnel',
    data.cardiacPacemaker && 'Cardiac pacemaker, ICD, cardiac stent or metallic heart valve',
    data.metalwork && 'Metalwork/clips/coils after fractures or surgery',
    data.jointReplacement && 'Any joint or limb replacement (e.g. hip/knee)',
    data.contraceptiveCoil && 'Contraceptive coil',
    data.cochlearImplant && 'Internal hearing devices or cochlear implant',
    data.hydrocephalusShunt && 'Hydrocephalus shunt, spinal shunt or neurostimulator',
    data.dentalImplants && 'Any dental implants, fillings, dentures or devices',
    data.metallicEyeObject && 'Any metallic object in the eye',
    data.recentSurgery && `Surgery in the last 3 months${data.recentSurgeryDetail ? `: ${data.recentSurgeryDetail}` : ''}`,
  ].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>Referral Form — ${data.patientFullName} — ${data.scanType}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background: #fff; color: #1a1a1a; }
    .page { max-width: 800px; margin: 0 auto; padding: 40px; }
    @media print {
      .page { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:32px;padding-bottom:20px;border-bottom:2px solid #2B7A9E">
    <div style="display:flex;align-items:center;gap:12px">
      <svg width="44" height="50" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M148 38 C132 18, 108 8, 82 8 C46 8, 16 38, 16 74 C16 100, 30 122, 52 137 L82 162 L112 137 C134 122, 148 100, 148 74 C148 66, 146 59, 143 52"
          stroke="#2B7A9E" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M152 32 C158 24, 162 14, 158 6" stroke="#2B7A9E" stroke-width="8" fill="none" stroke-linecap="round"/>
        <circle cx="90" cy="44" r="7" fill="#2B7A9E"/>
        <line x1="90" y1="51" x2="90" y2="72" stroke="#2B7A9E" stroke-width="5" stroke-linecap="round"/>
        <path d="M90 72 Q104 76, 108 90" stroke="#2B7A9E" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="108" cy="96" r="10" fill="#2B7A9E"/>
        <line x1="78" y1="80" x2="50" y2="116" stroke="#2B7A9E" stroke-width="5" stroke-linecap="round"/>
        <circle cx="50" cy="116" r="6" stroke="#2B7A9E" stroke-width="4" fill="none"/>
        <circle cx="78" cy="80" r="6" fill="#2B7A9E"/>
      </svg>
      <div>
        <div style="font-size:10px;color:#666;letter-spacing:0.12em;text-transform:uppercase">The</div>
        <div style="font-size:20px;font-weight:700;color:#1a1a1a">Diagnostic</div>
        <div style="font-size:11px;color:#666">thediagnostic.co.uk</div>
      </div>
    </div>
    <div style="text-align:right">
      <div style="font-size:18px;font-weight:600;color:#1a1a1a">${data.scanType}</div>
      <div style="font-size:12px;color:#666;margin-top:4px">Referral Form</div>
    </div>
  </div>

  <!-- Summary bar -->
  <div style="background:#F0F7FF;border:1px solid #C8DFF0;border-radius:6px;padding:12px 16px;margin-bottom:24px;display:flex;gap:24px;flex-wrap:wrap">
    <div><span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.08em">Date of Birth</span><div style="font-weight:600;font-size:13px">${data.patientDob}</div></div>
    <div><span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.08em">Booking Ref</span><div style="font-weight:600;font-size:13px">${data.bookingRef}</div></div>
    <div><span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.08em">Appointment</span><div style="font-weight:600;font-size:13px">${data.appointmentDate}</div></div>
    <div><span style="font-size:11px;color:#666;text-transform:uppercase;letter-spacing:.08em">Completed</span><div style="font-weight:600;font-size:13px">${data.completedAt}</div></div>
  </div>

  ${section('Patient Details', [
    field('Full Name', data.patientFullName),
    field('Date of Birth', data.patientDob),
    field('Sex', data.patientSex),
    field('Address', data.patientAddress),
    field('Postcode', data.patientPostcode),
    field('Email', data.patientEmail),
    field('Telephone', data.patientPhone),
    field('Nationality', data.patientNationality),
  ].join(''))}

  ${section('Personal GP Details', [
    field('GP Name', data.gpName),
    field('Surgery Name', data.gpSurgeryName),
    field('Surgery Address', data.gpSurgeryAddress),
    field('GP Email', data.gpEmail),
  ].join(''))}

  ${data.referrerName ? section('Referring Clinician Details', [
    field('Clinician Name', data.referrerName),
    field('Job Role', data.referrerJobRole),
    field('Clinic', data.referrerClinic),
    field('Email', data.referrerEmail),
    field('GMC Number', data.referrerGmcNumber),
  ].join('')) : ''}

  ${section('Examination Requested', [
    field('Scan Requested', data.scanType),
    field('Body Part(s) Required', data.bodyParts),
    field('Clinical Symptoms / Signs', data.clinicalSymptoms),
    field('Clinical Query', data.clinicalQuery),
    field('Contrast Required', data.contrastRequired !== undefined ? yesNo(data.contrastRequired) : undefined),
  ].join(''))}

  <!-- MRI Safety Section -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
    <thead>
      <tr><th colspan="2" style="background:#2B7A9E;color:white;padding:8px 10px;text-align:left;font-size:13px;font-weight:600;border-radius:3px 3px 0 0">Does the patient have any of the following? (Metal / Implants)</th></tr>
    </thead>
    <tbody>
      <tr><td colspan="2" style="padding:10px">
        ${metalChecklist.length > 0
          ? `<ul style="margin:0;padding-left:18px">${metalChecklist.map(item => `<li style="font-size:13px;color:#c0392b;font-weight:600;margin-bottom:4px">${item}</li>`).join('')}</ul>`
          : '<span style="color:#27ae60;font-size:13px;font-weight:600">None declared</span>'}
        ${data.metalImplantsDetail ? `<div style="margin-top:8px;font-size:13px"><strong>Details:</strong> ${data.metalImplantsDetail}</div>` : ''}
      </td></tr>
    </tbody>
  </table>

  ${section('General Health', [
    field('Any Allergies?', data.allergies !== undefined ? `${yesNo(data.allergies)}${data.allergiesDetail ? ` — ${data.allergiesDetail}` : ''}` : undefined),
    field('Infection Risk (e.g. MRSA)?', yesNo(data.infectionRisk)),
    field('Diabetic?', yesNo(data.diabetic)),
    field('Special Needs (hearing, mobility, speech)', data.specialNeeds || 'None'),
    field('Claustrophobia?', yesNo(data.claustrophobia)),
  ].join(''))}

  ${data.contrastRequired ? section('For Scans with Contrast', [
    field("Is patient's kidney function normal?", yesNo(data.kidneyFunctionNormal)),
    field('Last GFR Result (if available)', data.lastGfr),
  ].join('')) : ''}

  ${section('Patients Born Female', [
    field('Is the patient pregnant?', yesNo(data.pregnant)),
    field('Start Date of Last Menstrual Period', data.lastMenstrualPeriod),
    field('Is the patient breastfeeding?', yesNo(data.breastfeeding)),
  ].join(''))}

  <!-- Reporting section -->
  <div style="background:#F8F8F8;border:1px solid #ddd;border-radius:6px;padding:16px;margin-bottom:24px">
    <div style="font-weight:700;font-size:13px;margin-bottom:8px">Reporting</div>
    <div style="font-size:13px;color:#333;margin-bottom:4px">Please send all reports and images to: <strong>reports@thediagnostic.co.uk</strong></div>
    <div style="font-size:13px;color:#333">For clinical enquiries: <strong>care@thediagnostic.co.uk</strong> · WhatsApp: <strong>+44 7700 000 000</strong></div>
  </div>

  <!-- Clinic section -->
  <div style="background:#F0F7FF;border:1px solid #C8DFF0;border-radius:6px;padding:16px;margin-bottom:32px">
    <div style="font-weight:700;font-size:13px;margin-bottom:8px">Appointment Clinic</div>
    <div style="font-size:13px;font-weight:600">${data.clinicName}</div>
    <div style="font-size:13px;color:#555">${data.clinicAddress}</div>
    <div style="font-size:13px;color:#555">Appointment: <strong>${data.appointmentDate}</strong></div>
  </div>

  <!-- Footer -->
  <div style="border-top:1px solid #ddd;padding-top:16px;font-size:11px;color:#888;text-align:center">
    ${data.patientFullName} | DOB ${data.patientDob} | thediagnostic.co.uk | Booking Ref: ${data.bookingRef} | Generated: ${data.completedAt}
  </div>

</div>
</body>
</html>`;
}

export function bookingToReferralData(booking: Record<string, unknown>, bookingRef: string): ReferralFormData {
  return {
    patientFullName: `${booking.firstName} ${booking.lastName}`,
    patientDob: String(booking.dateOfBirth || ''),
    patientSex: String(booking.sex || ''),
    patientAddress: String(booking.addressLine1 || ''),
    patientPostcode: String(booking.postcode || ''),
    patientEmail: String(booking.email || ''),
    patientPhone: String(booking.phone || ''),
    patientNationality: String(booking.nationality || ''),
    gpName: String(booking.gpName || ''),
    gpSurgeryName: String(booking.gpSurgery || ''),
    gpEmail: String(booking.gpEmail || ''),
    referrerName: String(booking.referrerName || ''),
    referrerJobRole: String(booking.referrerRole || ''),
    referrerClinic: String(booking.referrerClinic || ''),
    referrerEmail: String(booking.referrerEmail || ''),
    scanType: String(booking.scanName || ''),
    bodyParts: String(booking.bodyParts || ''),
    clinicalSymptoms: String(booking.reason || booking.medicalNotes || ''),
    clinicalQuery: String(booking.clinicalQuery || booking.reason || ''),
    contrastRequired: Boolean(booking.contrastRequired),
    metalImplants: Boolean(booking.hasMetalImplants),
    cardiacPacemaker: Boolean(booking.hasPacemaker),
    claustrophobia: Boolean(booking.isClaustrophobic),
    pregnant: Boolean(booking.isPregnant),
    allergies: Boolean(booking.hasAllergies),
    bookingRef,
    clinicName: String(booking.clinicName || ''),
    clinicAddress: String(booking.clinicAddress || ''),
    appointmentDate: String(booking.selectedDate || ''),
    completedAt: new Date().toLocaleString('en-GB'),
  };
}
