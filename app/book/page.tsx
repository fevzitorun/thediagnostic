'use client'

// ─── SCANBOOK BOOKING FLOW ────────────────────────────────────────────────────
// URL params on entry:
//   /book?clinic=medicana-winchester&package=mri-1&date=2026-05-20
//
// Steps:
//   1  Personal details
//   2  Contact & address
//   3  Scan reason & documents
//   4  MRI safety questionnaire
//   5  Review & payment (Stripe)
//
// TODO: POST /api/bookings/draft on step 1, PATCH on each step, POST /api/stripe/checkout on step 5

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { getClinicBySlug } from '@/lib/clinics.data'

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface BookingContext {
  clinicSlug: string
  clinicName: string
  clinicAddress: string
  clinicCity: string
  scanType: string
  packageName: string
  bodyPart: string
  side: 'Left' | 'Right' | 'Bilateral' | null
  price: number
  date: string
  time: string
  slotId: string
  reportHours: number
  addConsultation: boolean
  consultationPrice: number
}

interface PersonalDetails {
  title: string
  firstName: string
  lastName: string
  sex: string
  dob: string
  email: string
  phone: string
  phoneAlt: string
  addressLine1: string
  addressLine2: string
  city: string
  postcode: string
  marketingOptIn: boolean
}

interface ScanDetails {
  reason: string
  hasPreviousImaging: boolean | null
  gpSurgery: string
  hasGpReferral: boolean | null
  hasInsurance: boolean | null
  insurancePreAuth: string
  needsContrast: 'yes' | 'no' | 'unsure' | null
}

// Generic safety answers — works for all scan types
type SafetyAnswers = {
  answers: Record<string, boolean | null>
  details: Record<string, string>
}

// ─── SAFETY CONFIG ────────────────────────────────────────────────────────────

interface SafetyQuestion {
  key: string
  label: string
  disqualifier?: boolean
  disqualifierMessage?: string
  detailPrompt?: string
  textOnly?: boolean  // No yes/no toggle — just a required text field
}

interface ScanSafetyConfig {
  title: string
  subtitle: string
  questions: SafetyQuestion[]
}

const SCAN_SAFETY_CONFIG: Record<string, ScanSafetyConfig> = {
  mri: {
    title: 'MRI safety questions',
    subtitle: 'These questions are required for your safety. A clinical team member reviews all answers before your appointment is confirmed.',
    questions: [
      { key: 'previousSurgery',    label: 'Have you had any previous surgery?',                                                     detailPrompt: 'Please describe the surgery and approximate date' },
      { key: 'brainSurgery',       label: 'Have you had any operations on your brain?',                                             detailPrompt: 'Please provide details' },
      { key: 'spineSurgery',       label: 'Have you had any operations on your spine?',                                             detailPrompt: 'Please provide details' },
      { key: 'recentSurgery',      label: 'Have you had any operations in the last 6 weeks?',                                       detailPrompt: 'Please describe the operation' },
      { key: 'metalInBody',        label: 'Do you have any metal in your body — implants, non-removable piercings, or fragments?',  detailPrompt: 'Please describe (type, location, date of insertion if known)' },
      { key: 'claustrophobia',     label: 'Do you suffer from claustrophobia?',                                                     detailPrompt: 'How severe? Have you had an MRI before?' },
      { key: 'epilepsy',           label: 'Do you suffer from epilepsy?',                                                          detailPrompt: 'Are you currently medicated? When was your last episode?' },
      { key: 'fitsBlackouts',      label: 'Do you suffer from regular fits or blackouts?',                                         detailPrompt: 'Please provide details' },
      { key: 'allergies',          label: 'Do you have any allergies?',                                                            detailPrompt: 'Please list your allergies (particularly to contrast agents or iodine)' },
      { key: 'medicinePatch',      label: 'Do you wear a medicine patch — e.g. nicotine, angina, or contraceptive patch?',         detailPrompt: 'Please specify the type of patch' },
      { key: 'pacemaker',          label: 'Do you have a cardiac pacemaker or capsule endoscopy?',                                 disqualifier: true, disqualifierMessage: 'We are unable to perform MRI scans on patients with a cardiac pacemaker or any other cardiac device. Please speak to your GP or cardiologist about alternative imaging options.' },
      { key: 'aneurysmClip',       label: 'Do you have an aneurysm clip in your brain?',                                           disqualifier: true, disqualifierMessage: 'We are unable to perform MRI scans on patients with an aneurysm clip. Please contact your neurosurgeon for guidance.' },
      { key: 'hydrocephalusShunt', label: 'Do you have a programmable hydrocephalus shunt?',                                       detailPrompt: 'Please provide the model if known' },
      { key: 'cochlearImplant',    label: 'Do you have a cochlear implant?',                                                       detailPrompt: 'Please provide the model if known' },
      { key: 'accessibilityNeeds', label: 'Do you require any accessibility adjustments or accommodations?',                       detailPrompt: 'Please describe what you need' },
      { key: 'overWeight',         label: 'Do you weigh over 18 stone (114 kg)?',                                                  detailPrompt: 'Please provide your approximate weight' },
      { key: 'overHeight',         label: 'Are you over 6 foot 4 inches tall?' },
      { key: 'pregnant',           label: 'Are you pregnant or could you be pregnant?',                                            disqualifier: true, disqualifierMessage: 'We are unable to perform MRI scans on pregnant patients. Please speak to your midwife or GP.' },
    ],
  },
  ct: {
    title: 'CT scan safety questions',
    subtitle: 'CT scans use X-ray radiation and sometimes contrast dye. Please answer these questions to ensure your scan is safe.',
    questions: [
      { key: 'pregnant',       label: 'Are you pregnant or could you be pregnant?',                          disqualifier: true, disqualifierMessage: 'CT scans use ionising radiation. We cannot perform CT scans on pregnant patients without specialist clinical approval. Please speak to your GP or midwife.' },
      { key: 'iodineAllergy',  label: 'Are you allergic to iodine, shellfish, or contrast dye?',            detailPrompt: 'Please describe the reaction you experienced' },
      { key: 'kidneyDisease',  label: 'Do you have kidney disease or reduced kidney function?',              detailPrompt: 'Please provide your latest eGFR result if known' },
      { key: 'metformin',      label: 'Are you currently taking Metformin (for diabetes)?',                 detailPrompt: 'Please provide your dose and prescribing GP' },
      { key: 'diabetes',       label: 'Do you have diabetes?' },
      { key: 'thyroidDisease', label: 'Do you have a thyroid condition or have you had thyroid surgery?',   detailPrompt: 'Please provide details' },
      { key: 'heartCondition', label: 'Do you have a heart condition or have you had heart surgery?',       detailPrompt: 'Please provide details' },
      { key: 'recentSurgery',  label: 'Have you had any surgery in the last 6 weeks?',                      detailPrompt: 'Please describe the operation' },
      { key: 'allergies',      label: 'Do you have any other allergies or adverse reactions to medication?', detailPrompt: 'Please list your allergies' },
      { key: 'accessibilityNeeds', label: 'Do you require any accessibility adjustments?',                 detailPrompt: 'Please describe what you need' },
    ],
  },
  ultrasound: {
    title: 'Ultrasound safety questions',
    subtitle: 'Ultrasound is a safe, non-invasive scan. Please answer a few brief questions.',
    questions: [
      { key: 'pregnant',           label: 'Are you pregnant or could you be pregnant?' },
      { key: 'recentSurgery',      label: 'Have you had any surgery in the area to be scanned in the last 6 weeks?', detailPrompt: 'Please describe the operation and area' },
      { key: 'allergies',          label: 'Do you have any allergies (particularly to latex or ultrasound gel)?',    detailPrompt: 'Please list your allergies' },
      { key: 'accessibilityNeeds', label: 'Do you require any accessibility adjustments?',                           detailPrompt: 'Please describe what you need' },
    ],
  },
  baby: {
    title: 'Baby scan information',
    subtitle: 'Please provide some details about your pregnancy. This helps us prepare for your scan and ensure the best experience.',
    questions: [
      { key: 'gestationalAge',         label: 'How many weeks pregnant are you?',                                                    textOnly: true, detailPrompt: 'e.g. 12 weeks, or 12+3' },
      { key: 'multiplePregnancy',       label: 'Are you expecting more than one baby?',                                              detailPrompt: 'Please specify (twins, triplets, etc.)' },
      { key: 'previousScans',           label: 'Have you had any previous ultrasound scans for this pregnancy?',                     detailPrompt: 'When and where? Were any concerns raised?' },
      { key: 'complications',           label: 'Have you been told about any complications with this pregnancy?',                    detailPrompt: 'Please describe' },
      { key: 'medicationOrConditions',  label: 'Are you taking any medication or do you have any health conditions we should know about?', detailPrompt: 'Please list any medications and conditions' },
      { key: 'accessibilityNeeds',      label: 'Do you require any accessibility adjustments?',                                     detailPrompt: 'Please describe what you need' },
    ],
  },
  pregnancy: {
    title: 'Pregnancy scan information',
    subtitle: 'Please provide details about your pregnancy to help us prepare for your scan.',
    questions: [
      { key: 'gestationalAge',    label: 'How many weeks pregnant are you?',                                          textOnly: true, detailPrompt: 'e.g. 20 weeks, or 20+5' },
      { key: 'multiplePregnancy', label: 'Are you expecting more than one baby?',                                     detailPrompt: 'Twins, triplets, etc.' },
      { key: 'previousScans',     label: 'Have you had any previous scans for this pregnancy?',                       detailPrompt: 'When and where? Were any concerns raised?' },
      { key: 'complications',     label: 'Have you been told about any complications with this pregnancy?',           detailPrompt: 'Please describe' },
      { key: 'gpMidwife',         label: 'Have you been referred by your GP or midwife?',                             detailPrompt: 'GP or midwife name and surgery name' },
      { key: 'accessibilityNeeds',label: 'Do you require any accessibility adjustments?',                             detailPrompt: 'Please describe what you need' },
    ],
  },
  xray: {
    title: 'X-ray safety questions',
    subtitle: 'X-rays use a small amount of ionising radiation. Please answer these brief questions before we proceed.',
    questions: [
      { key: 'pregnant',           label: 'Are you pregnant or could you be pregnant?',                              disqualifier: true, disqualifierMessage: 'X-ray uses ionising radiation. We cannot perform X-rays on pregnant patients without specialist clinical approval. Please speak to your GP or midwife.' },
      { key: 'recentXray',         label: 'Have you had an X-ray of this area in the last 3 months?',               detailPrompt: 'When and where?' },
      { key: 'metalImplants',      label: 'Do you have any metal implants in the area to be scanned?',              detailPrompt: 'Please describe (type, location, date inserted if known)' },
      { key: 'accessibilityNeeds', label: 'Do you require any accessibility adjustments?',                          detailPrompt: 'Please describe what you need' },
    ],
  },
}

const DEFAULT_SAFETY_CONFIG: ScanSafetyConfig = {
  title: 'Pre-scan health questions',
  subtitle: 'Please answer these brief questions to help us prepare for your scan.',
  questions: [
    { key: 'pregnant',           label: 'Are you pregnant or could you be pregnant?' },
    { key: 'allergies',          label: 'Do you have any allergies?',                          detailPrompt: 'Please list your allergies' },
    { key: 'recentSurgery',      label: 'Have you had any surgery in the last 6 weeks?',       detailPrompt: 'Please describe the operation' },
    { key: 'accessibilityNeeds', label: 'Do you require any accessibility adjustments?',       detailPrompt: 'Please describe what you need' },
  ],
}

function normalizeScanType(type: string): string {
  const aliases: Record<string, string> = {
    'baby-scan': 'baby', 'baby_scan': 'baby',
    'pregnancy-scan': 'pregnancy', 'pregnancy_scan': 'pregnancy',
    'full-body': 'mri', 'fullbody': 'mri',
    'ct-contrast': 'ct', 'mri-contrast': 'mri',
  }
  return aliases[type] ?? type
}

function getSafetyConfig(scanType: string): ScanSafetyConfig {
  return SCAN_SAFETY_CONFIG[normalizeScanType(scanType)] ?? DEFAULT_SAFETY_CONFIG
}

// Capability check — does this clinic support this scan type?
function clinicSupports(capabilities: string[], scanType: string): boolean {
  const capMap: Record<string, string[]> = {
    mri:        ['mri', 'mri_contrast'],
    ct:         ['ct', 'ct_contrast'],
    ultrasound: ['ultrasound'],
    baby:       ['baby_scan', 'baby', 'ultrasound'],
    pregnancy:  ['pregnancy_scan', 'pregnancy', 'baby_scan', 'ultrasound'],
    xray:       ['xray'],
  }
  const required = capMap[normalizeScanType(scanType)]
  if (!required) return true  // unknown type — let it through
  return required.some(cap => capabilities.includes(cap))
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5

function ProgressBar({ step }: { step: number }) {
  const labels = ['Personal', 'Contact', 'Scan details', 'Safety', 'Review']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 36 }}>
      {labels.map((label, i) => {
        const n = i + 1
        const done = n < step
        const active = n === step
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < labels.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: done ? '#0F4C81' : active ? '#111' : '#f0f0f0',
                color: done || active ? '#fff' : '#bbb',
                display: 'grid', placeItems: 'center',
                fontSize: 12, fontWeight: 600,
                border: `2px solid ${done ? '#0F4C81' : active ? '#111' : '#e8e8e8'}`,
                transition: 'all .2s',
              }}>
                {done ? '✓' : n}
              </div>
              <span style={{ fontSize: 10, color: active ? '#111' : done ? '#0F4C81' : '#bbb', fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done ? '#0F4C81' : '#f0f0f0', margin: '0 4px', marginBottom: 20, transition: 'background .3s' }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#666', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>
      {children}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
    </label>
  )
}

function Input({ value, onChange, placeholder, type = 'text', required }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', color: '#111', outline: 'none', transition: 'border-color .15s', background: '#fff' }}
      onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
      onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
    />
  )
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', color: value ? '#111' : '#bbb', outline: 'none', background: '#fff', appearance: 'none' }}
      onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
      onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ width: '100%', padding: '11px 13px', border: '1.5px solid #e8e8e8', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', color: '#111', outline: 'none', resize: 'vertical', background: '#fff', transition: 'border-color .15s' }}
      onFocus={e => (e.currentTarget.style.borderColor = '#0F4C81')}
      onBlur={e => (e.currentTarget.style.borderColor = '#e8e8e8')}
    />
  )
}

// ─── BOOKING SUMMARY SIDEBAR ──────────────────────────────────────────────────

function BookingSummary({ ctx, showConsultation, onToggleConsultation }: {
  ctx: BookingContext
  showConsultation: boolean
  onToggleConsultation: (v: boolean) => void
}) {
  const total = ctx.price + (showConsultation ? ctx.consultationPrice : 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '20px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Your appointment</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🏥</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{ctx.clinicName}</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{ctx.clinicCity}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>🧲</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{ctx.packageName}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{ctx.bodyPart}{ctx.side ? ` — ${ctx.side}` : ''}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📅</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111' }}>{ctx.date}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{ctx.time}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 9, padding: '10px 12px', fontSize: 12, color: '#92400e', lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 600 }}>Please note:</strong> Appointment requests are subject to our clinical safety checks. Do not make travel plans until the centre confirms your slot.
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '20px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Cost</div>

        {[
          { label: `${ctx.bodyPart}${ctx.side ? ` — ${ctx.side}` : ''} ${ctx.packageName}`, value: `£${ctx.price}` },
          { label: 'Pre-scan clinical check', value: 'Included' },
          { label: 'Scan at centre', value: 'Included' },
          { label: `Radiologist report (${ctx.reportHours}h)`, value: 'Included' },
          { label: 'ScanBook fee', value: '£0' },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f5f5f5', fontSize: 13 }}>
            <span style={{ color: '#666' }}>{row.label}</span>
            <span style={{ color: row.value === 'Included' ? '#0F4C81' : '#111', fontWeight: row.value === 'Included' ? 500 : 400 }}>{row.value}</span>
          </div>
        ))}

        {showConsultation && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f5f5f5', fontSize: 13 }}>
            <span style={{ color: '#666' }}>Post-scan consultation</span>
            <span style={{ color: '#111' }}>£{ctx.consultationPrice}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontSize: 15, fontWeight: 600, color: '#111' }}>
          <span>Total</span>
          <span>£{total}</span>
        </div>
      </div>

      {!showConsultation && (
        <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 16, padding: '16px 18px' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 6 }}>Add a post-scan consultation</div>
          <p style={{ fontSize: 12, color: '#888', lineHeight: 1.6, marginBottom: 12 }}>
            Speak to a clinician about your results. Know what's next — without paying hundreds for a private GP appointment.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: '#bbb', textDecoration: 'line-through' }}>£50</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#111' }}>£{ctx.consultationPrice}</span>
            <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 20, background: '#E8F0F8', color: '#0F4C81', fontWeight: 600 }}>when you book now</span>
          </div>
          <button
            onClick={() => onToggleConsultation(true)}
            style={{ width: '100%', padding: '10px', border: '1.5px solid #0F4C81', borderRadius: 9, background: '#fff', color: '#0F4C81', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0F4C81'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0F4C81' }}
          >
            Add consultation — £{ctx.consultationPrice}
          </button>
        </div>
      )}

      {showConsultation && (
        <div style={{ background: '#E8F0F8', border: '1px solid #E5E1D8', borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#0F4C81', fontWeight: 500 }}>✓ Post-scan consultation added</div>
          <button onClick={() => onToggleConsultation(false)} style={{ fontSize: 11, color: '#888', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}>Remove</button>
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 16, padding: '18px 18px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#bbb', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>What happens after booking</div>
        {[
          { n: 1, title: 'Clinical safety check', body: 'Our team reviews your safety answers within 1 working day.' },
          { n: 2, title: 'Centre confirmation',   body: 'The scanning centre calls you to confirm your exact time.' },
          { n: 3, title: 'Your scan',             body: 'Attend your appointment. Bring your booking confirmation.' },
          { n: 4, title: 'Your report',           body: `Radiologist report delivered within ${ctx.reportHours}h to your portal.` },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < 3 ? 12 : 0, marginBottom: i < 3 ? 12 : 0, borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#f8f8f8', border: '1px solid #ebebeb', display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, color: '#888', flexShrink: 0, marginTop: 1 }}>{s.n}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#111', marginBottom: 2 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── STEP 1: PERSONAL DETAILS ─────────────────────────────────────────────────

function Step1({ data, onChange, onNext }: { data: PersonalDetails; onChange: (d: Partial<PersonalDetails>) => void; onNext: () => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, letterSpacing: -0.6, color: '#111', marginBottom: 6 }}>About you</h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 1.6 }}>We need these details to confirm your identity and prepare your scan.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 14, marginBottom: 14 }}>
        <div>
          <FieldLabel>Title</FieldLabel>
          <Select value={data.title} onChange={v => onChange({ title: v })} options={['Mr', 'Miss', 'Mrs', 'Ms', 'Dr', 'Mx']} placeholder="Select" />
        </div>
        <div />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <FieldLabel required>First name</FieldLabel>
          <Input value={data.firstName} onChange={v => onChange({ firstName: v })} placeholder="First name" required />
        </div>
        <div>
          <FieldLabel required>Last name</FieldLabel>
          <Input value={data.lastName} onChange={v => onChange({ lastName: v })} placeholder="Last name" required />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <FieldLabel required>Sex assigned at birth</FieldLabel>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Male', 'Female', 'Other'].map(opt => (
            <button
              key={opt}
              onClick={() => onChange({ sex: opt })}
              style={{ flex: 1, padding: '11px', border: `1.5px solid ${data.sex === opt ? '#111' : '#e8e8e8'}`, borderRadius: 9, background: data.sex === opt ? '#111' : '#fff', color: data.sex === opt ? '#fff' : '#444', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}
            >
              {opt}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 6, lineHeight: 1.5 }}>Required for clinical safety screening purposes.</p>
      </div>

      <div style={{ marginBottom: 28 }}>
        <FieldLabel required>Date of birth</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: 10 }}>
          <Select value={data.dob.split('-')[2] ?? ''} onChange={v => onChange({ dob: `${data.dob.split('-')[0] ?? ''}-${data.dob.split('-')[1] ?? ''}-${v}` })} options={Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))} placeholder="Day" />
          <Select value={data.dob.split('-')[1] ?? ''} onChange={v => onChange({ dob: `${data.dob.split('-')[0] ?? ''}-${v}-${data.dob.split('-')[2] ?? ''}` })} options={['01','02','03','04','05','06','07','08','09','10','11','12']} placeholder="Month" />
          <Select value={data.dob.split('-')[0] ?? ''} onChange={v => onChange({ dob: `${v}-${data.dob.split('-')[1] ?? ''}-${data.dob.split('-')[2] ?? ''}` })} options={Array.from({ length: 100 }, (_, i) => String(new Date().getFullYear() - i))} placeholder="Year" />
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!data.firstName || !data.lastName || !data.sex || !data.dob}
        style={{ width: '100%', padding: 14, background: data.firstName && data.lastName && data.sex && data.dob ? '#111' : '#e8e8e8', color: data.firstName && data.lastName && data.sex && data.dob ? '#fff' : '#bbb', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: data.firstName && data.lastName && data.sex ? 'pointer' : 'not-allowed', fontFamily: 'inherit', transition: 'background .15s' }}
        onMouseEnter={e => { if (data.firstName && data.lastName) e.currentTarget.style.background = '#0F4C81' }}
        onMouseLeave={e => { if (data.firstName && data.lastName) e.currentTarget.style.background = '#111' }}
      >
        Continue →
      </button>
    </div>
  )
}

// ─── STEP 2: CONTACT & ADDRESS ────────────────────────────────────────────────

function Step2({ data, onChange, onNext, onBack }: { data: PersonalDetails; onChange: (d: Partial<PersonalDetails>) => void; onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, letterSpacing: -0.6, color: '#111', marginBottom: 6 }}>Contact & address</h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 1.6 }}>We use this to confirm your appointment and send your report. Please double-check your email.</p>

      <div style={{ marginBottom: 14 }}>
        <FieldLabel required>Email address</FieldLabel>
        <Input value={data.email} onChange={v => onChange({ email: v })} placeholder="your@email.com" type="email" required />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <FieldLabel required>Phone number</FieldLabel>
          <Input value={data.phone} onChange={v => onChange({ phone: v })} placeholder="07700 900000" type="tel" required />
        </div>
        <div>
          <FieldLabel>Alternate phone (optional)</FieldLabel>
          <Input value={data.phoneAlt} onChange={v => onChange({ phoneAlt: v })} placeholder="Alternate number" type="tel" />
        </div>
      </div>

      <div style={{ height: 1, background: '#f0f0f0', margin: '24px 0' }} />
      <div style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 16 }}>Your address</div>

      <div style={{ marginBottom: 14 }}>
        <FieldLabel required>Address line 1</FieldLabel>
        <Input value={data.addressLine1} onChange={v => onChange({ addressLine1: v })} placeholder="House number and street" required />
      </div>
      <div style={{ marginBottom: 14 }}>
        <FieldLabel>Address line 2 (optional)</FieldLabel>
        <Input value={data.addressLine2} onChange={v => onChange({ addressLine2: v })} placeholder="Apartment, suite, etc." />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
        <div>
          <FieldLabel required>City</FieldLabel>
          <Input value={data.city} onChange={v => onChange({ city: v })} placeholder="City" required />
        </div>
        <div>
          <FieldLabel required>Postcode</FieldLabel>
          <Input value={data.postcode} onChange={v => onChange({ postcode: v.toUpperCase() })} placeholder="SW1A 2AA" required />
        </div>
      </div>

      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <input
          type="checkbox"
          id="marketing"
          checked={data.marketingOptIn}
          onChange={e => onChange({ marketingOptIn: e.target.checked })}
          style={{ marginTop: 2, flexShrink: 0, accentColor: '#0F4C81', width: 16, height: 16 }}
        />
        <label htmlFor="marketing" style={{ fontSize: 13, color: '#888', lineHeight: 1.6, cursor: 'pointer' }}>
          I&apos;d like to occasionally receive offers and health tips from ScanBook. You can opt out at any time.
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
        <button onClick={onBack} style={{ padding: 14, border: '1.5px solid #e8e8e8', borderRadius: 10, background: '#fff', color: '#444', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
          ← Back
        </button>
        <button
          onClick={onNext}
          style={{ padding: 14, background: '#111', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#0F4C81')}
          onMouseLeave={e => (e.currentTarget.style.background = '#111')}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}

// ─── STEP 3: SCAN DETAILS ─────────────────────────────────────────────────────

function Step3({ data, onChange, onNext, onBack }: { data: ScanDetails; onChange: (d: Partial<ScanDetails>) => void; onNext: () => void; onBack: () => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, letterSpacing: -0.6, color: '#111', marginBottom: 6 }}>About your scan</h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 1.6 }}>These details help our clinical team and the radiologist understand your needs.</p>

      <div style={{ marginBottom: 20 }}>
        <FieldLabel required>Reason for your scan</FieldLabel>
        <Textarea value={data.reason} onChange={v => onChange({ reason: v })} placeholder="e.g. Pain in right knee after sports injury. Suspected ligament damage. Referred by physio." rows={3} />
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 6 }}>Any detail you share helps the radiologist interpret your images more accurately.</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <FieldLabel>Do you have previous imaging for this area?</FieldLabel>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['true', 'Yes'], ['false', 'No']].map(([val, label]) => (
            <button key={val} onClick={() => onChange({ hasPreviousImaging: val === 'true' })} style={{ flex: 1, padding: '10px', border: `1.5px solid ${String(data.hasPreviousImaging) === val ? '#111' : '#e8e8e8'}`, borderRadius: 9, background: String(data.hasPreviousImaging) === val ? '#111' : '#fff', color: String(data.hasPreviousImaging) === val ? '#fff' : '#444', fontSize: 14, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}>{label}</button>
          ))}
        </div>
        {data.hasPreviousImaging && (
          <p style={{ fontSize: 12, color: '#888', marginTop: 8 }}>You can upload previous scans or reports after booking via your patient portal.</p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
        <div>
          <FieldLabel>Do you have a GP referral letter?</FieldLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['true', 'Yes'], ['false', 'No']].map(([val, label]) => (
              <button key={val} onClick={() => onChange({ hasGpReferral: val === 'true' })} style={{ flex: 1, padding: '10px', border: `1.5px solid ${String(data.hasGpReferral) === val ? '#111' : '#e8e8e8'}`, borderRadius: 9, background: String(data.hasGpReferral) === val ? '#111' : '#fff', color: String(data.hasGpReferral) === val ? '#fff' : '#444', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}>{label}</button>
            ))}
          </div>
          <p style={{ fontSize: 11, color: '#bbb', marginTop: 6 }}>Not required — you can self-refer.</p>
        </div>
        <div>
          <FieldLabel>Private health insurance?</FieldLabel>
          <div style={{ display: 'flex', gap: 8 }}>
            {[['true', 'Yes'], ['false', 'No']].map(([val, label]) => (
              <button key={val} onClick={() => onChange({ hasInsurance: val === 'true' })} style={{ flex: 1, padding: '10px', border: `1.5px solid ${String(data.hasInsurance) === val ? '#111' : '#e8e8e8'}`, borderRadius: 9, background: String(data.hasInsurance) === val ? '#111' : '#fff', color: String(data.hasInsurance) === val ? '#fff' : '#444', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      {data.hasInsurance && (
        <div style={{ marginBottom: 20, padding: '14px 16px', background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12 }}>
          <FieldLabel>Pre-authorisation number</FieldLabel>
          <Input value={data.insurancePreAuth} onChange={v => onChange({ insurancePreAuth: v })} placeholder="e.g. BUPA-12345678" />
          <p style={{ fontSize: 11, color: '#bbb', marginTop: 6 }}>Contact your insurer before booking to confirm coverage and obtain this number.</p>
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <FieldLabel>Do you need contrast dye?</FieldLabel>
        <div style={{ display: 'flex', gap: 10 }}>
          {[['unsure', 'Not sure'], ['yes', 'Yes'], ['no', 'No']].map(([val, label]) => (
            <button key={val} onClick={() => onChange({ needsContrast: val as ScanDetails['needsContrast'] })} style={{ flex: 1, padding: '10px', border: `1.5px solid ${data.needsContrast === val ? '#111' : '#e8e8e8'}`, borderRadius: 9, background: data.needsContrast === val ? '#111' : '#fff', color: data.needsContrast === val ? '#fff' : '#444', fontSize: 13, fontFamily: 'inherit', cursor: 'pointer', transition: 'all .15s' }}>{label}</button>
          ))}
        </div>
        {data.needsContrast === 'yes' && (
          <p style={{ fontSize: 12, color: '#f59e0b', marginTop: 8, background: '#fffbeb', padding: '8px 12px', borderRadius: 8, border: '1px solid #fde68a' }}>
            ⚠ Contrast may add £80–£100 to the cost. Our team will confirm this before charging you.
          </p>
        )}
      </div>

      <div style={{ marginBottom: 28 }}>
        <FieldLabel>GP surgery name (optional)</FieldLabel>
        <Input value={data.gpSurgery} onChange={v => onChange({ gpSurgery: v })} placeholder="e.g. The Limes Medical Centre" />
        <p style={{ fontSize: 11, color: '#bbb', marginTop: 6 }}>We only use this in an emergency to contact your GP.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
        <button onClick={onBack} style={{ padding: 14, border: '1.5px solid #e8e8e8', borderRadius: 10, background: '#fff', color: '#444', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
        <button onClick={onNext} style={{ padding: 14, background: '#111', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .15s' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#0F4C81')}
          onMouseLeave={e => (e.currentTarget.style.background = '#111')}
        >Continue →</button>
      </div>
    </div>
  )
}

// ─── STEP 4: SAFETY QUESTIONNAIRE (config-driven) ────────────────────────────

function Step4({ answers, onChange, onNext, onBack, scanType }: {
  answers: SafetyAnswers
  onChange: (d: Partial<SafetyAnswers>) => void
  onNext: () => void
  onBack: () => void
  scanType: string
}) {
  const config = getSafetyConfig(scanType)
  const activeDisqualifier = config.questions.find(
    q => q.disqualifier && answers.answers[q.key] === true
  )

  function setAnswer(key: string, val: boolean) {
    onChange({ answers: { ...answers.answers, [key]: val } })
  }
  function setDetail(key: string, val: string) {
    onChange({ details: { ...answers.details, [key]: val } })
  }

  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, letterSpacing: -0.6, color: '#111', marginBottom: 6 }}>
        {config.title}
      </h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 8, lineHeight: 1.6 }}>{config.subtitle}</p>
      <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#0369a1', marginBottom: 28, lineHeight: 1.6 }}>
        Please answer all questions as accurately as possible. If you are unsure, choose Yes and provide details — our team will follow up.
      </div>

      {activeDisqualifier && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 12, padding: '16px 18px', marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#dc2626', marginBottom: 6 }}>⚠ We may not be able to proceed</div>
          <p style={{ fontSize: 13, color: '#7f1d1d', lineHeight: 1.65 }}>{activeDisqualifier.disqualifierMessage}</p>
          <p style={{ fontSize: 13, color: '#7f1d1d', marginTop: 8 }}>
            Please call us on <a href="tel:08001234567" style={{ color: '#dc2626', fontWeight: 600 }}>0800 123 4567</a> to discuss your options.
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #ebebeb', borderRadius: 14, overflow: 'hidden' }}>
        {config.questions.map((q, i) => {
          const isYes = answers.answers[q.key] === true
          const isDisqualifier = q.disqualifier && isYes
          const showDetail = q.textOnly || (isYes && q.detailPrompt)

          return (
            <div key={q.key} style={{
              padding: '16px 18px',
              borderBottom: i < config.questions.length - 1 ? '1px solid #f5f5f5' : 'none',
              background: isDisqualifier ? '#fff5f5' : isYes ? '#fffbeb' : '#fff',
              transition: 'background .2s',
            }}>
              {/* Question row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontSize: 13, color: '#333', lineHeight: 1.55, flex: 1 }}>{q.label}</span>

                {/* text-only questions skip yes/no buttons */}
                {!q.textOnly && (
                  <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                    {([true, false] as const).map(val => (
                      <button
                        key={String(val)}
                        onClick={() => setAnswer(q.key, val)}
                        style={{
                          width: 52, padding: '6px 0',
                          border: `1.5px solid ${answers.answers[q.key] === val ? (val && q.disqualifier ? '#ef4444' : '#111') : '#e8e8e8'}`,
                          borderRadius: 8,
                          background: answers.answers[q.key] === val ? (val && q.disqualifier ? '#ef4444' : '#111') : '#fff',
                          color: answers.answers[q.key] === val ? '#fff' : '#666',
                          fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s',
                        }}
                      >
                        {val ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Detail textarea */}
              {showDetail && q.detailPrompt && (
                <div style={{ marginTop: 10 }}>
                  <Textarea
                    value={answers.details[q.key] ?? ''}
                    onChange={v => setDetail(q.key, v)}
                    placeholder={q.detailPrompt}
                    rows={2}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 24, padding: '14px 16px', background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12, fontSize: 12, color: '#888', lineHeight: 1.65, marginBottom: 24 }}>
        By continuing, you confirm that your answers are accurate to the best of your knowledge. You consent to this information being shared with the imaging centre for clinical safety review.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
        <button onClick={onBack} style={{ padding: 14, border: '1.5px solid #e8e8e8', borderRadius: 10, background: '#fff', color: '#444', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>← Back</button>
        <button
          onClick={onNext}
          disabled={!!activeDisqualifier}
          style={{ padding: 14, background: activeDisqualifier ? '#e8e8e8' : '#111', color: activeDisqualifier ? '#bbb' : '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: activeDisqualifier ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .15s' }}
          onMouseEnter={e => { if (!activeDisqualifier) e.currentTarget.style.background = '#0F4C81' }}
          onMouseLeave={e => { if (!activeDisqualifier) e.currentTarget.style.background = '#111' }}
        >
          Continue to payment →
        </button>
      </div>
    </div>
  )
}

// ─── STEP 5: REVIEW & PAYMENT ─────────────────────────────────────────────────

function Step5({ personal, ctx, scanDetails, onBack, addConsultation }: {
  personal: PersonalDetails
  ctx: BookingContext
  scanDetails: ScanDetails
  onBack: () => void
  addConsultation: boolean
}) {
  const router = useRouter()
  const total = ctx.price + (addConsultation ? ctx.consultationPrice : 0)
  const [paymentMethod, setPaymentMethod] = useState<'pay' | 'callback'>('pay')
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  return (
    <div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, letterSpacing: -0.6, color: '#111', marginBottom: 6 }}>Review & pay</h2>
      <p style={{ fontSize: 14, color: '#888', marginBottom: 28, lineHeight: 1.6 }}>Double-check your details before confirming.</p>

      <div style={{ background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 14, padding: '18px', marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#bbb', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Booking summary</div>
        {[
          { label: 'Name',         value: `${personal.title ? personal.title + ' ' : ''}${personal.firstName} ${personal.lastName}` },
          { label: 'Date of birth',value: personal.dob || '—' },
          { label: 'Email',        value: personal.email || '—' },
          { label: 'Phone',        value: personal.phone || '—' },
          { label: 'Scan',         value: `${ctx.packageName} — ${ctx.bodyPart}${ctx.side ? ` (${ctx.side})` : ''}` },
          { label: 'Centre',       value: ctx.clinicName },
          { label: 'Date',         value: ctx.date },
          { label: 'Time',         value: ctx.time },
        ].map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, padding: '7px 0', borderBottom: i < 7 ? '1px solid #ebebeb' : 'none', fontSize: 13 }}>
            <span style={{ color: '#888', width: 100, flexShrink: 0 }}>{row.label}</span>
            <span style={{ color: '#111', fontWeight: 500 }}>{row.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: '#888', letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 14 }}>How would you like to proceed?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div
            onClick={() => setPaymentMethod('pay')}
            style={{ padding: '18px 16px', border: `1.5px solid ${paymentMethod === 'pay' ? '#111' : '#e8e8e8'}`, borderRadius: 14, cursor: 'pointer', background: paymentMethod === 'pay' ? '#fafafa' : '#fff', transition: 'all .15s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>💳</span>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${paymentMethod === 'pay' ? '#111' : '#ddd'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {paymentMethod === 'pay' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111' }} />}
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 4 }}>Pay now</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>Secure card payment via Stripe. Free cancellation up to 24 hours before.</div>
            <div style={{ marginTop: 12, fontSize: 15, fontWeight: 700, color: '#111' }}>£{total}</div>
          </div>

          <div
            onClick={() => setPaymentMethod('callback')}
            style={{ padding: '18px 16px', border: `1.5px solid ${paymentMethod === 'callback' ? '#111' : '#e8e8e8'}`, borderRadius: 14, cursor: 'pointer', background: paymentMethod === 'callback' ? '#fafafa' : '#fff', transition: 'all .15s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>📞</span>
              <div style={{ width: 18, height: 18, borderRadius: '50%', border: `2px solid ${paymentMethod === 'callback' ? '#111' : '#ddd'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                {paymentMethod === 'callback' && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111' }} />}
              </div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 4 }}>Request a callback</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>Our team calls you within 1 hour (Mon–Fri, 9–5) to complete your booking and answer questions.</div>
            <div style={{ marginTop: 12, fontSize: 12, color: '#bbb' }}>No payment now</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px', background: '#f8f8f8', border: '1px solid #ebebeb', borderRadius: 12, fontSize: 12, color: '#888', lineHeight: 1.65, marginBottom: 24 }}>
        By confirming this booking, you agree to ScanBook&apos;s{' '}
        <Link href="/terms-and-conditions" style={{ color: '#0F4C81' }}>Terms & Conditions</Link> and{' '}
        <Link href="/privacy-policy" style={{ color: '#0F4C81' }}>Privacy Policy</Link>.
        Your personal and health data will be shared with {ctx.clinicName} for the purposes of your scan. We process your data in accordance with UK GDPR.
      </div>

      {apiError && (
        <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 9, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#dc2626' }}>
          {apiError}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10 }}>
        <button onClick={onBack} disabled={loading} style={{ padding: 14, border: '1.5px solid #e8e8e8', borderRadius: 10, background: '#fff', color: '#444', fontSize: 14, fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>← Back</button>
        <button
          disabled={loading}
          onClick={async () => {
            setLoading(true)
            setApiError(null)
            const bookingPayload = {
              clinicSlug: ctx.clinicSlug,
              clinicName: ctx.clinicName,
              clinicCity: ctx.clinicCity,
              packageName: ctx.packageName,
              bodyPart: ctx.bodyPart,
              side: ctx.side,
              date: ctx.date,
              time: ctx.time,
              reportHours: ctx.reportHours,
              amount: ctx.price,
              addConsultation,
              consultationPrice: ctx.consultationPrice,
              patientName: `${personal.title ? personal.title + ' ' : ''}${personal.firstName} ${personal.lastName}`,
              patientEmail: personal.email,
              patientPhone: personal.phone,
              patientDob: personal.dob,
              scanReason: scanDetails.reason,
            }

            if (paymentMethod === 'pay') {
              const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload),
              })
              if (!res.ok) {
                setApiError('Could not start payment. Please try again or call us.')
                setLoading(false)
                return
              }
              const { url } = await res.json()
              window.location.href = url
            } else {
              const res = await fetch('/api/bookings/draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload),
              })
              if (!res.ok) {
                setApiError('Could not submit your request. Please try again or call us.')
                setLoading(false)
                return
              }
              const { bookingRef } = await res.json()
              router.push(`/book/success?callback=1&ref=${bookingRef}&clinic=${ctx.clinicSlug}`)
            }
          }}
          style={{ padding: 14, background: loading ? '#aaa' : '#0F4C81', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'opacity .15s' }}
          onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {loading ? 'Please wait…' : paymentMethod === 'pay' ? `Pay £${total} securely →` : 'Request callback →'}
        </button>
      </div>

      {paymentMethod === 'pay' && (
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
          {['🔒 Stripe secure', '✓ Free cancellation (24h)', '✓ Instant confirmation'].map((t, i) => (
            <span key={i} style={{ fontSize: 11, color: '#bbb' }}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── BOOKING PAGE CONTENT ─────────────────────────────────────────────────────

function BookingPageContent() {
  const searchParams = useSearchParams()
  const clinicSlug = searchParams.get('clinic') ?? 'medicana-winchester'
  const scanType = searchParams.get('type') ?? 'mri'

  const clinicData = getClinicBySlug(clinicSlug)

  // Capability check — does this clinic support the requested scan type?
  const supported = !clinicData || clinicSupports(clinicData.capabilities, scanType)

  const ctx: BookingContext = {
    clinicSlug,
    clinicName: clinicData?.name ?? 'Medicana Winchester',
    clinicAddress: clinicData ? `${clinicData.address}, ${clinicData.postcode}` : 'Winchester Clinic, Hampshire',
    clinicCity: clinicData ? `${clinicData.city}, ${clinicData.postcode}` : 'Winchester, SO23 9LQ',
    scanType,
    packageName: searchParams.get('package') ?? 'MRI Scan',
    bodyPart: searchParams.get('part') ?? 'Knee',
    side: null,
    price: clinicData ? clinicData.priceFrom : 275,
    date: searchParams.get('date') ?? 'Wednesday 15th May 2026',
    time: searchParams.get('time') ?? '10:30 AM',
    slotId: searchParams.get('slot') ?? '',
    reportHours: clinicData?.reportHours ?? 24,
    addConsultation: false,
    consultationPrice: 40,
  }

  const [step, setStep] = useState(1)
  const [addConsultation, setAddConsultation] = useState(false)

  const [personal, setPersonal] = useState<PersonalDetails>({
    title: '', firstName: '', lastName: '', sex: '', dob: '',
    email: '', phone: '', phoneAlt: '',
    addressLine1: '', addressLine2: '', city: '', postcode: '',
    marketingOptIn: false,
  })

  const [scanDetails, setScanDetails] = useState<ScanDetails>({
    reason: '', hasPreviousImaging: null, gpSurgery: '',
    hasGpReferral: null, hasInsurance: null, insurancePreAuth: '',
    needsContrast: null,
  })

  const [safety, setSafety] = useState<SafetyAnswers>({ answers: {}, details: {} })

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [step])

  // Show capability error before the booking form
  if (!supported) {
    return (
      <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 20 }}>🏥</div>
        <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, color: '#111', marginBottom: 12 }}>
          This scan isn&apos;t available here
        </h1>
        <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 28 }}>
          <strong>{ctx.clinicName}</strong> doesn&apos;t offer this type of scan.
          Search for a centre that does.
        </p>
        <Link
          href={`/search?type=${scanType}`}
          style={{ display: 'inline-block', padding: '12px 28px', background: '#0F4C81', color: '#fff', borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}
        >
          Find a centre →
        </Link>
      </div>
    )
  }

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: var(--font-dm-sans, 'DM Sans', system-ui, sans-serif); background: #f8f8f8; color: #222; -webkit-font-smoothing: antialiased; }
        @media (max-width: 768px) {
          .book-layout { grid-template-columns: 1fr !important; padding: 16px !important; }
          .book-summary { order: -1; }
          .book-nav { padding: 0 16px !important; }
          .book-form { padding: 24px 20px !important; }
          .book-grid-2 { grid-template-columns: 1fr !important; }
          .book-grid-3 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Minimal nav */}
      <nav style={{ height: 56, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #ebebeb', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Scan</span>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#0F4C81' }}>Book</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: '#bbb' }}>Step {step} of {TOTAL_STEPS}</span>
          <Link href={`/clinics/${ctx.clinicSlug}`} style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}>← Back to clinic</Link>
          <a href="tel:08001234567" style={{ fontSize: 13, color: '#111', textDecoration: 'none', fontWeight: 500 }}>📞 0800 123 4567</a>
        </div>
      </nav>

      <div className="book-layout" style={{ maxWidth: 1060, margin: '0 auto', padding: '32px 24px 64px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'start' }}>

        {/* LEFT — form */}
        <div className="book-form" style={{ background: '#fff', border: '1px solid #ebebeb', borderRadius: 18, padding: '32px 36px' }}>
          <ProgressBar step={step} />

          {step === 1 && <Step1 data={personal} onChange={d => setPersonal(p => ({ ...p, ...d }))} onNext={() => setStep(2)} />}
          {step === 2 && <Step2 data={personal} onChange={d => setPersonal(p => ({ ...p, ...d }))} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <Step3 data={scanDetails} onChange={d => setScanDetails(p => ({ ...p, ...d }))} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
          {step === 4 && <Step4 answers={safety} onChange={d => setSafety(p => ({ ...p, ...d }))} onNext={() => setStep(5)} onBack={() => setStep(3)} scanType={scanType} />}
          {step === 5 && <Step5 personal={personal} ctx={{ ...ctx, addConsultation }} scanDetails={scanDetails} addConsultation={addConsultation} onBack={() => setStep(4)} />}
        </div>

        {/* RIGHT — sticky summary */}
        <div style={{ position: 'sticky', top: 76 }}>
          <BookingSummary ctx={{ ...ctx, addConsultation }} showConsultation={addConsultation} onToggleConsultation={setAddConsultation} />
        </div>

      </div>
    </>
  )
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f8f8f8' }} />}>
      <BookingPageContent />
    </Suspense>
  )
}
