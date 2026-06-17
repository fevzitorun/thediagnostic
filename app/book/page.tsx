'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ─── Types ────────────────────────────────────────────────────

interface BookingState {
  // Step 1: Scan type
  scanType: string;
  scanName: string;
  // Step 2: Destination
  country: string;
  city: string;
  // Step 3: Clinic
  clinicId: string;
  clinicName: string;
  clinicSlug: string;
  // Step 4: Date & Slot
  selectedDate: string;
  selectedTime: string;
  slotId: string;
  priceGbp: number;
  // Step 5: Medical Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  hasMetalImplants: boolean | null;
  isClaustrophobic: boolean | null;
  isPregnant: boolean | null;
  weightKg: string;
  medicalNotes: string;
  // Step 6: Concierge
  needsConcierge: boolean;
  flightNeeded: boolean;
  hotelNeeded: boolean;
  hotelNights: string;
  transferNeeded: boolean;
  translatorNeeded: boolean;
  translatorLanguage: string;
  departureCity: string;
  preferredTravelDate: string;
  companionCount: string;
  // Medical add-ons
  preScanDoctorConsult: boolean;
  postScanDoctorConsult: boolean;
  checkUpPackage: boolean;
  insuranceConsultation: boolean;
  // Step 7: Payment
  currency: string;
}

const INITIAL_STATE: BookingState = {
  scanType: '', scanName: '',
  country: '', city: '',
  clinicId: '', clinicName: '', clinicSlug: '',
  selectedDate: '', selectedTime: '', slotId: '', priceGbp: 0,
  firstName: '', lastName: '', email: '', phone: '',
  dateOfBirth: '', nationality: 'GB',
  hasMetalImplants: null, isClaustrophobic: null, isPregnant: null,
  weightKg: '', medicalNotes: '',
  needsConcierge: false,
  flightNeeded: false, hotelNeeded: false, hotelNights: '1',
  transferNeeded: false, translatorNeeded: false, translatorLanguage: '',
  departureCity: '', preferredTravelDate: '', companionCount: '0',
  preScanDoctorConsult: false, postScanDoctorConsult: false,
  checkUpPackage: false, insuranceConsultation: false,
  currency: 'GBP',
};

// ─── Static Data ──────────────────────────────────────────────

const SCAN_TYPES = [
  { code: 'pet_ct', icon: '🔬', name: 'PET-CT Scan', tagline: 'Full-body cancer & disease detection', fromGbp: 1200, popular: true },
  { code: 'mri_3t', icon: '🧲', name: 'MRI 3T', tagline: 'High-field soft tissue imaging', fromGbp: 320, popular: false },
  { code: 'gamma_knife', icon: '⚡', name: 'GammaKnife', tagline: 'Non-invasive brain tumour treatment', fromGbp: 6500, popular: false },
  { code: 'spect_ct', icon: '💫', name: 'SPECT-CT', tagline: 'Bone, thyroid & cardiac perfusion', fromGbp: 650, popular: false },
  { code: 'pet_mri', icon: '🔮', name: 'PET-MRI', tagline: 'Simultaneous metabolic + tissue imaging', fromGbp: 1850, popular: false },
  { code: 'mri_whole_body', icon: '🫁', name: 'Whole Body MRI', tagline: 'Head-to-toe screening, no radiation', fromGbp: 950, popular: false },
  { code: 'ct_angio', icon: '🫀', name: 'CT Angiography', tagline: 'Coronary & vascular imaging', fromGbp: 280, popular: false },
];

const DESTINATIONS = [
  { country: 'TR', city: 'Istanbul', flag: '🇹🇷', label: 'Istanbul, Turkey', clinicCount: 2, popular: true },
  { country: 'TR', city: 'Ankara', flag: '🇹🇷', label: 'Ankara, Turkey', clinicCount: 0, popular: false, comingSoon: true },
  { country: 'DE', city: 'Munich', flag: '🇩🇪', label: 'Munich, Germany', clinicCount: 0, popular: false, comingSoon: true },
  { country: 'AE', city: 'Dubai', flag: '🇦🇪', label: 'Dubai, UAE', clinicCount: 0, popular: false, comingSoon: true },
];

const CLINICS = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    slug: 'hsm-radyoloji-istanbul',
    name: 'HSM Radyoloji',
    city: 'Nişantaşı, Istanbul',
    lead: 'Prof. Dr. Mustafa ÖZATEŞ',
    jci: false, iso: true,
    rating: 4.9,
    color: '#2698D3',
    prices: { pet_ct: 1200, mri_3t: 320, spect_ct: 650, mri_whole_body: 950, ct_angio: 280 } as Record<string, number>,
    turnaround: '24h report',
    highlight: 'Most affordable',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    slug: 'acibadem-maslak-istanbul',
    name: 'Acıbadem Maslak Hospital',
    city: 'Maslak, Istanbul',
    lead: 'International Patient Centre',
    jci: true, iso: true,
    rating: 4.8,
    color: '#0B1D3A',
    prices: { pet_ct: 1350, mri_3t: 380, gamma_knife: 6500, spect_ct: 720, pet_mri: 1850, mri_whole_body: 1100, ct_angio: 320 } as Record<string, number>,
    turnaround: '18h report',
    highlight: 'JCI Accredited',
  },
];

function generateSlots(scanType: string) {
  const slots: { date: string; dateLabel: string; times: string[] }[] = [];
  const today = new Date();
  for (let i = 3; i <= 16; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 0) continue;
    slots.push({
      date: d.toISOString().split('T')[0],
      dateLabel: d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
      times: scanType === 'gamma_knife'
        ? ['09:00', '13:00']
        : ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'],
    });
  }
  return slots.slice(0, 10);
}

const NATIONALITIES = [
  { code: 'GB', label: '🇬🇧 United Kingdom' },
  { code: 'DE', label: '🇩🇪 Germany' },
  { code: 'TR', label: '🇹🇷 Turkey' },
  { code: 'AE', label: '🇦🇪 UAE' },
  { code: 'SA', label: '🇸🇦 Saudi Arabia' },
  { code: 'FR', label: '🇫🇷 France' },
  { code: 'NL', label: '🇳🇱 Netherlands' },
  { code: 'SE', label: '🇸🇪 Sweden' },
  { code: 'NO', label: '🇳🇴 Norway' },
  { code: 'AU', label: '🇦🇺 Australia' },
  { code: 'US', label: '🇺🇸 USA' },
  { code: 'OTHER', label: 'Other' },
];

const CURRENCIES = [
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺' },
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'TRY', symbol: '₺', flag: '🇹🇷' },
  { code: 'AED', symbol: 'AED', flag: '🇦🇪' },
];

const CONCIERGE_ITEMS = [
  { key: 'flightNeeded',          icon: '✈️', label: 'Flight Search',              desc: 'Best return fares from your departure city',              price: 'Free assistance' },
  { key: 'hotelNeeded',           icon: '🏨', label: 'Hotel near Clinic',           desc: '1–3 nights, budget to luxury options',                    price: 'From £60/night' },
  { key: 'transferNeeded',        icon: '🚗', label: 'Airport Transfer',            desc: 'Private car: airport → clinic → airport',                 price: '£35–£60' },
  { key: 'translatorNeeded',      icon: '🗣️', label: 'Medical Translator',          desc: 'English, Arabic, German, French & more',                  price: 'From £80' },
  { key: 'preScanDoctorConsult',  icon: '👨‍⚕️', label: 'Pre-scan Doctor Consultation', desc: 'Video call with a specialist before your appointment',   price: 'From £60' },
  { key: 'postScanDoctorConsult', icon: '📋', label: 'Post-scan Report Review',     desc: 'Doctor explains your results & advises next steps',       price: 'From £60' },
  { key: 'checkUpPackage',        icon: '🩺', label: 'Health Check-up Package',     desc: 'Blood, urine, ECG & consultation — add to your visit',    price: 'From £120' },
  { key: 'insuranceConsultation', icon: '📄', label: 'Insurance Consultation',      desc: 'We liaise with your insurer and handle pre-authorisation', price: 'Free' },
];

const STEPS = [
  { n: 1, label: 'Scan Type' },
  { n: 2, label: 'Destination' },
  { n: 3, label: 'Clinic' },
  { n: 4, label: 'Date & Slot' },
  { n: 5, label: 'Your Details' },
  { n: 6, label: 'Concierge' },
  { n: 7, label: 'Payment' },
];

// ─── Step Components ──────────────────────────────────────────

function StepIndicator({ step }: { step: number }) {
  return (
    <div style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '16px 24px', position: 'sticky', top: 64, zIndex: 10 }}>
      <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 0 }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: step > s.n ? 'var(--blue)' : step === s.n ? 'var(--navy)' : 'var(--border)',
                color: step >= s.n ? '#fff' : 'var(--text-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, flexShrink: 0,
                transition: 'all 0.2s',
              }}>
                {step > s.n ? '✓' : s.n}
              </div>
              <span style={{
                fontSize: 10, fontWeight: step === s.n ? 700 : 400,
                color: step === s.n ? 'var(--navy)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                flex: 1, height: 2, margin: '0 4px', marginTop: -14,
                background: step > s.n ? 'var(--blue)' : 'var(--border)',
                transition: 'background 0.3s',
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScanCard({ scan, selected, onClick }: { scan: typeof SCAN_TYPES[0]; selected: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      textAlign: 'left', padding: 20,
      background: selected ? 'var(--blue-050)' : '#fff',
      border: `2px solid ${selected ? 'var(--navy)' : 'var(--border)'}`,
      borderRadius: 12, cursor: 'pointer', transition: 'all 0.15s',
      display: 'flex', gap: 16, alignItems: 'flex-start',
      width: '100%',
    }}>
      <span style={{ fontSize: 32, flexShrink: 0 }}>{scan.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 2 }}>{scan.name}</div>
          {scan.popular && (
            <span style={{ background: 'var(--blue)', color: '#fff', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
              POPULAR
            </span>
          )}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{scan.tagline}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: selected ? 'var(--navy)' : 'var(--text-muted)' }}>
          From £{scan.fromGbp.toLocaleString()}
        </div>
      </div>
      <div style={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
        border: `2px solid ${selected ? 'var(--navy)' : 'var(--border)'}`,
        background: selected ? 'var(--navy)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {selected && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
      </div>
    </button>
  );
}

function YesNoButton({ label, value, selected, onClick }: { label: string; value: boolean; selected: boolean | null; onClick: () => void }) {
  const isSelected = selected === value;
  return (
    <button onClick={onClick} style={{
      padding: '9px 20px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500,
      background: isSelected ? (value ? 'var(--blue)' : 'var(--danger)') : '#fff',
      color: isSelected ? '#fff' : 'var(--text-muted)',
      border: `1.5px solid ${isSelected ? (value ? 'var(--blue)' : 'var(--danger)') : 'var(--border)'}`,
      transition: 'all 0.15s',
    }}>
      {label}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [payError, setPayError] = useState('');

  const update = (fields: Partial<BookingState>) => setBooking(prev => ({ ...prev, ...fields }));
  const next = () => setStep(s => Math.min(s + 1, 7));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const slots = generateSlots(booking.scanType);
  const selectedClinic = CLINICS.find(c => c.id === booking.clinicId);
  const clinicPrice = selectedClinic?.prices[booking.scanType] ?? 0;

  async function handlePayment() {
    setPayError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicSlug: booking.clinicSlug,
          clinicName: booking.clinicName,
          clinicCity: booking.city,
          packageName: booking.scanName,
          bodyPart: '',
          side: '',
          date: booking.selectedDate,
          time: booking.selectedTime,
          reportHours: selectedClinic?.turnaround === '18h report' ? 18 : 24,
          amount: clinicPrice,
          addConsultation: booking.postScanDoctorConsult,
          consultationPrice: 60,
          patientName: `${booking.firstName} ${booking.lastName}`,
          patientEmail: booking.email,
          patientPhone: booking.phone,
          patientDob: booking.dateOfBirth,
          scanReason: booking.medicalNotes,
        }),
      });
      if (!res.ok) throw new Error('Server error');
      const { url } = await res.json() as { url?: string };
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL');
      }
    } catch {
      setPayError('Payment could not be initiated. Please try again or contact us on WhatsApp.');
      setSubmitting(false);
    }
  }

  const NavButtons = ({ canNext, nextLabel = 'Continue →' }: { canNext: boolean; nextLabel?: string }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
      {step > 1 ? (
        <button onClick={back} style={{ background: '#fff', border: '1.5px solid var(--border)', color: 'var(--text-muted)', borderRadius: 9, padding: '11px 22px', fontSize: 15, cursor: 'pointer' }}>
          ← Back
        </button>
      ) : <div />}
      <button onClick={next} disabled={!canNext} style={{
        background: canNext ? 'var(--blue)' : 'var(--border)',
        color: canNext ? '#fff' : 'var(--text-muted)',
        border: 'none', borderRadius: 9, padding: '11px 28px',
        fontSize: 15, fontWeight: 600, cursor: canNext ? 'pointer' : 'not-allowed',
        transition: 'all 0.15s',
      }}>
        {nextLabel}
      </button>
    </div>
  );

  return (
    <>
      <Navbar />
      <StepIndicator step={step} />

      <main style={{ background: 'var(--bg-light)', minHeight: '100vh', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {step === 1 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>
                  What scan do you need?
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
                  Select the scan type recommended by your doctor, or the one you&apos;d like to book.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 14 }}>
                {SCAN_TYPES.map(scan => (
                  <ScanCard key={scan.code} scan={scan} selected={booking.scanType === scan.code} onClick={() => update({ scanType: scan.code, scanName: scan.name })} />
                ))}
              </div>
              <div style={{ marginTop: 20, padding: '14px 18px', background: 'var(--bg-subtle)', borderRadius: 10, fontSize: 13, color: 'var(--text-muted)' }}>
                💬 <strong>Not sure which scan you need?</strong>{' '}
                <a href="https://wa.me/447700000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>Ask our clinical team on WhatsApp</a>
              </div>
              <NavButtons canNext={!!booking.scanType} />
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Where would you like to travel?</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>All destinations offer the same world-class imaging standards.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
                {DESTINATIONS.map(dest => {
                  const selected = booking.country === dest.country && booking.city === dest.city;
                  return (
                    <button key={`${dest.country}-${dest.city}`}
                      onClick={() => !dest.comingSoon && update({ country: dest.country, city: dest.city })}
                      disabled={!!dest.comingSoon}
                      style={{
                        textAlign: 'left', padding: 22,
                        background: selected ? 'var(--blue-050)' : dest.comingSoon ? 'var(--bg-subtle)' : '#fff',
                        border: `2px solid ${selected ? 'var(--navy)' : 'var(--border)'}`,
                        borderRadius: 12, cursor: dest.comingSoon ? 'default' : 'pointer',
                        opacity: dest.comingSoon ? 0.6 : 1, transition: 'all 0.15s',
                      }}>
                      <div style={{ fontSize: 32, marginBottom: 10 }}>{dest.flag}</div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 4 }}>{dest.label}</div>
                      {dest.comingSoon ? (
                        <div style={{ fontSize: 12, color: 'var(--amber)', fontWeight: 600 }}>Coming Soon</div>
                      ) : (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{dest.clinicCount} clinic{dest.clinicCount !== 1 ? 's' : ''} available</div>
                      )}
                      {dest.popular && !dest.comingSoon && (
                        <div style={{ marginTop: 8, display: 'inline-block', background: 'var(--blue-light)', color: 'var(--blue-dark)', borderRadius: 100, padding: '2px 8px', fontSize: 10, fontWeight: 700 }}>MOST POPULAR</div>
                      )}
                    </button>
                  );
                })}
              </div>
              <NavButtons canNext={!!booking.country} />
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Choose your clinic</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>{booking.scanName} in {booking.city} — {CLINICS.filter(c => c.prices[booking.scanType] !== undefined).length} clinics available</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {CLINICS.filter(c => c.prices[booking.scanType] !== undefined).map(clinic => {
                  const selected = booking.clinicId === clinic.id;
                  const price = clinic.prices[booking.scanType];
                  return (
                    <button key={clinic.id}
                      onClick={() => update({ clinicId: clinic.id, clinicName: clinic.name, clinicSlug: clinic.slug, priceGbp: price })}
                      style={{
                        textAlign: 'left', background: selected ? 'var(--blue-050)' : '#fff',
                        border: `2px solid ${selected ? 'var(--navy)' : 'var(--border)'}`,
                        borderRadius: 14, overflow: 'hidden', cursor: 'pointer', padding: 0, transition: 'all 0.15s',
                      }}>
                      <div style={{ height: 6, background: clinic.color }} />
                      <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
                        <div>
                          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                            {clinic.jci && <span style={{ background: 'var(--blue-050)', color: 'var(--navy)', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>JCI</span>}
                            {clinic.iso && <span style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)', borderRadius: 4, padding: '2px 8px', fontSize: 11 }}>ISO</span>}
                            <span style={{ background: 'var(--blue-light)', color: 'var(--blue-dark)', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600 }}>{clinic.highlight}</span>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--navy)', marginBottom: 2 }}>{clinic.name}</div>
                          <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8 }}>📍 {clinic.city}</div>
                          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{clinic.lead} · ⭐ {clinic.rating} · {clinic.turnaround}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Price</div>
                          <div style={{ fontSize: 28, fontWeight: 700, color: selected ? 'var(--navy)' : 'var(--text-dark)' }}>£{price.toLocaleString()}</div>
                          <div style={{ marginTop: 8, width: 24, height: 24, borderRadius: '50%', border: `2px solid ${selected ? 'var(--navy)' : 'var(--border)'}`, background: selected ? 'var(--navy)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto' }}>
                            {selected && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <NavButtons canNext={!!booking.clinicId} />
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Choose your appointment</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Available slots at {booking.clinicName} — next 14 days</p>
              </div>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Select Date</div>
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
                  {slots.map(slot => {
                    const selected = booking.selectedDate === slot.date;
                    return (
                      <button key={slot.date} onClick={() => update({ selectedDate: slot.date, selectedTime: '' })} style={{
                        flexShrink: 0, padding: '12px 16px',
                        background: selected ? 'var(--navy)' : '#fff',
                        color: selected ? '#fff' : 'var(--text-dark)',
                        border: `1.5px solid ${selected ? 'var(--navy)' : 'var(--border)'}`,
                        borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: selected ? 700 : 400, textAlign: 'center', minWidth: 80,
                      }}>{slot.dateLabel}</button>
                    );
                  })}
                </div>
              </div>
              {booking.selectedDate && (
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Available Times</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {slots.find(s => s.date === booking.selectedDate)?.times.map(time => {
                      const selected = booking.selectedTime === time;
                      return (
                        <button key={time} onClick={() => update({ selectedTime: time })} style={{
                          padding: '10px 20px',
                          background: selected ? 'var(--blue)' : '#fff',
                          color: selected ? '#fff' : 'var(--text-dark)',
                          border: `1.5px solid ${selected ? 'var(--blue)' : 'var(--border)'}`,
                          borderRadius: 9, cursor: 'pointer', fontSize: 15, fontWeight: selected ? 700 : 400,
                        }}>{time}</button>
                      );
                    })}
                  </div>
                </div>
              )}
              {booking.selectedDate && booking.selectedTime && (
                <div style={{ marginTop: 24, background: 'var(--blue-light)', border: '1.5px solid var(--blue)', borderRadius: 12, padding: '16px 20px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--blue-dark)', fontSize: 15, marginBottom: 4 }}>✓ Appointment Selected</div>
                  <div style={{ color: 'var(--text-dark)', fontSize: 14 }}>
                    <strong>{booking.scanName}</strong> at <strong>{booking.clinicName}</strong><br />
                    {new Date(booking.selectedDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} at {booking.selectedTime}<br />
                    <span style={{ color: 'var(--blue-dark)', fontWeight: 700 }}>Price: £{clinicPrice.toLocaleString()}</span>
                  </div>
                </div>
              )}
              <NavButtons canNext={!!booking.selectedDate && !!booking.selectedTime} />
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Your Details</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Required for the clinic to prepare your examination.</p>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 20 }}>Personal Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { field: 'firstName', label: 'First Name', type: 'text', placeholder: 'Sarah' },
                    { field: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Mitchell' },
                    { field: 'email', label: 'Email', type: 'email', placeholder: 'sarah@example.com' },
                    { field: 'phone', label: 'Phone (with country code)', type: 'tel', placeholder: '+44 7700 000000' },
                    { field: 'dateOfBirth', label: 'Date of Birth', type: 'date', placeholder: '' },
                    { field: 'weightKg', label: 'Weight (kg)', type: 'number', placeholder: '70' },
                  ].map(f => (
                    <div key={f.field}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} value={booking[f.field as keyof BookingState] as string ?? ''}
                        onChange={e => update({ [f.field]: e.target.value } as Partial<BookingState>)}
                        placeholder={f.placeholder}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)', outline: 'none', boxSizing: 'border-box' }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 6 }}>Nationality</label>
                  <select value={booking.nationality} onChange={e => update({ nationality: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)' }}>
                    {NATIONALITIES.map(n => <option key={n.code} value={n.code}>{n.label}</option>)}
                  </select>
                </div>
              </div>
              {['mri_3t', 'mri_whole_body', 'pet_mri'].includes(booking.scanType) && (
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 28, marginBottom: 20 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>MRI Safety Screening</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>These questions are mandatory for MRI safety.</p>
                  {[
                    { field: 'hasMetalImplants' as const, label: 'Do you have any metal implants, pacemaker, or surgical staples?', warn: true },
                    { field: 'isClaustrophobic' as const, label: 'Do you experience claustrophobia?', warn: false },
                    { field: 'isPregnant' as const, label: 'Are you pregnant or could you be pregnant?', warn: true },
                  ].map(q => (
                    <div key={q.field} style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-dark)', marginBottom: 10 }}>{q.label}</div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <YesNoButton label="Yes" value={true} selected={booking[q.field]} onClick={() => update({ [q.field]: true } as Partial<BookingState>)} />
                        <YesNoButton label="No" value={false} selected={booking[q.field]} onClick={() => update({ [q.field]: false } as Partial<BookingState>)} />
                      </div>
                      {booking[q.field] === true && q.warn && (
                        <div style={{ marginTop: 10, background: 'var(--amber-light)', border: '1.5px solid var(--amber)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#7D5A00' }}>
                          ⚠️ Our clinical team will contact you to discuss this before confirming your booking.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 28 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>Medical History (Optional)</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>Any allergies, current medications, previous scan reports, or clinical indication for this scan.</p>
                <textarea value={booking.medicalNotes} onChange={e => update({ medicalNotes: e.target.value })}
                  placeholder="e.g. Allergic to iodine contrast. Previous CT chest 2024. Referred by Dr. Smith for oncology staging."
                  rows={4} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, resize: 'vertical', background: '#fff', color: 'var(--text-dark)', boxSizing: 'border-box' }} />
              </div>
              <NavButtons canNext={!!(booking.firstName && booking.lastName && booking.email && booking.phone)} />
            </div>
          )}

          {step === 6 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Add Concierge Services</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Optional. We can arrange everything — you just show up for your scan.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                {CONCIERGE_ITEMS.map(item => {
                  const checked = booking[item.key as keyof BookingState] as boolean;
                  return (
                    <button key={item.key} onClick={() => update({ [item.key]: !checked } as Partial<BookingState>)} style={{
                      textAlign: 'left', padding: '18px 22px',
                      background: checked ? 'var(--bg-subtle)' : '#fff',
                      border: `2px solid ${checked ? 'var(--blue)' : 'var(--border)'}`,
                      borderRadius: 12, cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--navy)', marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.desc}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{item.price}</div>
                        <div style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${checked ? 'var(--blue)' : 'var(--border)'}`, background: checked ? 'var(--blue)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {checked && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {(booking.flightNeeded || booking.transferNeeded) && (
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 8 }}>Your Departure City / Airport</label>
                  <input type="text" value={booking.departureCity} onChange={e => update({ departureCity: e.target.value })} placeholder="e.g. London Heathrow (LHR)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)', boxSizing: 'border-box' }} />
                </div>
              )}
              {booking.translatorNeeded && (
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 8 }}>Preferred Language for Translator</label>
                  <select value={booking.translatorLanguage} onChange={e => update({ translatorLanguage: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)' }}>
                    <option value="">Select language...</option>
                    {['Arabic', 'German', 'French', 'Dutch', 'Swedish', 'Russian', 'Italian', 'Spanish'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              )}
              {booking.hotelNeeded && (
                <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 14 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 8 }}>How many nights?</label>
                  <select value={booking.hotelNights} onChange={e => update({ hotelNights: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)' }}>
                    {['1','2','3','4','5','6','7'].map(n => <option key={n} value={n}>{n} night{n !== '1' ? 's' : ''}</option>)}
                  </select>
                </div>
              )}
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: 22, marginBottom: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-dark)', marginBottom: 16 }}>Travel Planning Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 6 }}>Preferred travel date</label>
                    <input type="date" value={booking.preferredTravelDate} onChange={e => update({ preferredTravelDate: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)', boxSizing: 'border-box' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dark)', display: 'block', marginBottom: 6 }}>Travelling with companions?</label>
                    <select value={booking.companionCount} onChange={e => update({ companionCount: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 14, background: '#fff', color: 'var(--text-dark)' }}>
                      <option value="0">Travelling alone</option>
                      <option value="1">1 companion</option>
                      <option value="2">2 companions</option>
                      <option value="3">3+ companions</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ background: 'var(--bg-subtle)', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: 'var(--text-muted)' }}>
                ✈️ Most UK patients fly London → Istanbul for under £150 return (1h40 direct). No concierge? No problem — skip this step and we&apos;ll send you clinic directions and local hotel suggestions by email.
              </div>
              <NavButtons canNext={true} nextLabel={booking.flightNeeded || booking.hotelNeeded || booking.transferNeeded || booking.translatorNeeded ? 'Add Concierge & Continue →' : 'Skip & Continue →'} />
            </div>
          )}

          {step === 7 && (
            <div>
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 8 }}>Review & Pay</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Check your booking details and complete payment to confirm your slot.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, alignItems: 'start' }}>
                <div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 20 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>Booking Summary</h3>
                    {[
                      { label: 'Scan', value: booking.scanName },
                      { label: 'Clinic', value: booking.clinicName },
                      { label: 'Date', value: booking.selectedDate ? new Date(booking.selectedDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '' },
                      { label: 'Time', value: booking.selectedTime },
                      { label: 'Patient', value: `${booking.firstName} ${booking.lastName}` },
                    ].map(row => (
                      <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{row.label}</span>
                        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-dark)' }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 16 }}>Payment Currency</h3>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {CURRENCIES.map(c => (
                        <button key={c.code} onClick={() => update({ currency: c.code })} style={{
                          padding: '9px 16px', borderRadius: 8, cursor: 'pointer',
                          background: booking.currency === c.code ? 'var(--navy)' : '#fff',
                          color: booking.currency === c.code ? '#fff' : 'var(--text-dark)',
                          border: `1.5px solid ${booking.currency === c.code ? 'var(--navy)' : 'var(--border)'}`,
                          fontSize: 14, fontWeight: 500,
                        }}>{c.flag} {c.code}</button>
                      ))}
                    </div>
                    {booking.currency === 'TRY' && (
                      <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-muted)', background: 'var(--bg-subtle)', borderRadius: 8, padding: '10px 14px' }}>₺ Turkish Lira payments processed via İyzico (3D Secure).</div>
                    )}
                  </div>
                </div>
                <div style={{ position: 'sticky', top: 120 }}>
                  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 14, padding: 24, marginBottom: 16 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--navy)', marginBottom: 18 }}>Price Breakdown</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{booking.scanName}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-dark)' }}>£{clinicPrice.toLocaleString()}</span>
                      </div>
                      {booking.flightNeeded && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Concierge (flight)</span><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>TBD</span></div>}
                      {booking.hotelNeeded && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Hotel (1 night)</span><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>TBD</span></div>}
                      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-dark)' }}>Total Due Now</span>
                        <span style={{ fontSize: 26, fontWeight: 700, color: 'var(--navy)' }}>£{clinicPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                    <span>🔒 SSL Encrypted</span><span>·</span><span>💳 Stripe / İyzico</span><span>·</span><span>✓ PCI DSS</span>
                  </div>
                  {payError && (
                    <div style={{ background: 'var(--danger-tint)', border: '1px solid var(--danger-bg)', borderRadius: 8, padding: '10px 14px', marginBottom: 12, fontSize: 13, color: 'var(--danger)' }}>{payError}</div>
                  )}
                  <button onClick={handlePayment} disabled={submitting} style={{
                    width: '100%', background: submitting ? '#aaa' : 'var(--blue)', color: '#fff',
                    border: 'none', borderRadius: 12, padding: '16px 0',
                    fontSize: 17, fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer',
                    marginBottom: 12, transition: 'background 0.2s',
                  }}>
                    {submitting ? 'Redirecting to payment…' : `Pay £${clinicPrice.toLocaleString()} & Confirm Booking →`}
                  </button>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
                    By paying you agree to our{' '}<Link href="/terms" style={{ color: 'var(--blue)' }}>Terms</Link>{' & '}<Link href="/privacy" style={{ color: 'var(--blue)' }}>Privacy Policy</Link>.<br />Your slot will be confirmed by email within 15 minutes.
                  </div>
                  {step > 1 && (
                    <button onClick={back} style={{ width: '100%', marginTop: 12, background: '#fff', border: '1.5px solid var(--border)', color: 'var(--text-muted)', borderRadius: 9, padding: '11px 0', fontSize: 14, cursor: 'pointer' }}>← Edit Booking</button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
