interface ReferralFormData {
  patientFullName: string
  patientDob: string
  patientSex: string
  patientAddress: string
  patientPostcode: string
  patientEmail: string
  patientPhone: string
  patientNationality: string
  scanType: string
  bodyParts: string
  clinicalSymptoms: string
  clinicalQuery: string
  metalImplants: boolean
  claustrophobia: boolean
  pregnant: boolean
  allergies: boolean
  bookingRef: string
  clinicName: string
  clinicAddress: string
  appointmentDate: string
  completedAt: string
}

export function generateReferralFormHtml(data: ReferralFormData): string {
  const yn = (v: boolean) => (v ? 'Yes' : 'No')
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Referral Form – ${data.bookingRef}</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 13px; color: #222; margin: 40px; }
  h1 { font-size: 20px; color: #082A4A; margin-bottom: 4px; }
  .section { margin: 20px 0; }
  .section h2 { font-size: 14px; font-weight: 700; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 10px; color: #082A4A; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 4px 8px; vertical-align: top; }
  td:first-child { width: 40%; color: #555; font-weight: 600; }
  .ref { font-size: 11px; color: #888; margin-top: 2px; }
  footer { margin-top: 40px; font-size: 11px; color: #aaa; border-top: 1px solid #eee; padding-top: 8px; }
</style>
</head>
<body>
<h1>Diagnostic Imaging Referral Form</h1>
<p class="ref">Booking ref: ${data.bookingRef} &nbsp;|&nbsp; Generated: ${data.completedAt}</p>

<div class="section">
  <h2>Patient Details</h2>
  <table>
    <tr><td>Full Name</td><td>${data.patientFullName}</td></tr>
    <tr><td>Date of Birth</td><td>${data.patientDob}</td></tr>
    <tr><td>Sex</td><td>${data.patientSex}</td></tr>
    <tr><td>Address</td><td>${data.patientAddress}, ${data.patientPostcode}</td></tr>
    <tr><td>Email</td><td>${data.patientEmail}</td></tr>
    <tr><td>Phone</td><td>${data.patientPhone}</td></tr>
    <tr><td>Nationality</td><td>${data.patientNationality}</td></tr>
  </table>
</div>

<div class="section">
  <h2>Examination Details</h2>
  <table>
    <tr><td>Scan Type</td><td>${data.scanType}</td></tr>
    <tr><td>Body Parts</td><td>${data.bodyParts}</td></tr>
    <tr><td>Clinical Symptoms</td><td>${data.clinicalSymptoms}</td></tr>
    <tr><td>Clinical Query</td><td>${data.clinicalQuery}</td></tr>
  </table>
</div>

<div class="section">
  <h2>Safety Checklist</h2>
  <table>
    <tr><td>Metal Implants</td><td>${yn(data.metalImplants)}</td></tr>
    <tr><td>Claustrophobia</td><td>${yn(data.claustrophobia)}</td></tr>
    <tr><td>Pregnant / Possibly Pregnant</td><td>${yn(data.pregnant)}</td></tr>
    <tr><td>Allergies</td><td>${yn(data.allergies)}</td></tr>
  </table>
</div>

<div class="section">
  <h2>Appointment</h2>
  <table>
    <tr><td>Clinic</td><td>${data.clinicName}</td></tr>
    <tr><td>Address</td><td>${data.clinicAddress}</td></tr>
    <tr><td>Date</td><td>${data.appointmentDate}</td></tr>
  </table>
</div>

<footer>The Diagnostic &nbsp;|&nbsp; thediagnostic.co.uk &nbsp;|&nbsp; This document is confidential and intended solely for medical use.</footer>
</body>
</html>`
}
