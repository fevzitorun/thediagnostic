// Patient follow-up email sequence
// Sent at: day 3, day 7, day 14, day 30 post-scan

import { Resend } from 'resend'
import type { PatientFollowUp } from './types'

const FROM = 'ScanBook Care <care@scanbook.co.uk>'
const REPLY_TO = 'care@scanbook.co.uk'

export type FollowUpStage = 'day3' | 'day7' | 'day14' | 'day30'

export async function sendPatientFollowUp(
  data: PatientFollowUp,
  stage: FollowUpStage
): Promise<{ success: boolean; id?: string; error?: unknown }> {
  const { subject, html } = buildFollowUp(data, stage)

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data: result, error } = await resend.emails.send({
    from: FROM,
    to: data.patientEmail,
    subject,
    html,
    replyTo: REPLY_TO,
  })

  if (error) {
    console.error(`[PatientFollowUp] Failed stage=${stage} booking=${data.bookingRef}:`, error)
    return { success: false, error }
  }

  return { success: true, id: result?.id }
}

function buildFollowUp(data: PatientFollowUp, stage: FollowUpStage): { subject: string; html: string } {
  const { patientName, scanName, clinicName, bookingRef } = data
  const firstName = patientName.split(' ')[0]

  const configs: Record<FollowUpStage, { subject: string; body: string; cta: string; ctaHref: string }> = {
    day3: {
      subject: `How are you feeling after your ${scanName}? — ScanBook`,
      body: `We hope your ${scanName} at ${clinicName} went well. We wanted to check in — how are you feeling ${data.daysPostScan} days on?

If you have your report and would like a second opinion from one of our consultant radiologists, or if you'd like help understanding your results, we're here to help.`,
      cta: 'View your results',
      ctaHref: 'https://scanbook.co.uk/patient/reports',
    },
    day7: {
      subject: `Did you get your ${scanName} report? — ScanBook`,
      body: `Your ${scanName} report from ${clinicName} should be available now. If you haven't received it or have any questions, please reply to this email.

We also wanted to let you know: if you'd like a specialist second opinion on your imaging results, ScanBook can connect you with a UK consultant radiologist or specialist for a remote review.`,
      cta: 'Request a second opinion',
      ctaHref: 'https://scanbook.co.uk/second-opinion',
    },
    day14: {
      subject: `Leave a review for ${clinicName} — ScanBook`,
      body: `Thank you for booking your ${scanName} through ScanBook. We hope everything went smoothly at ${clinicName}.

Your feedback helps other patients choose the right centre. If you have a moment, we'd really appreciate a quick review of your experience.`,
      cta: 'Leave a review',
      ctaHref: `https://scanbook.co.uk/review?ref=${bookingRef}`,
    },
    day30: {
      subject: `Is it time for your next scan? — ScanBook`,
      body: `It's been about a month since your ${scanName} at ${clinicName}. We hope you're doing well.

Many patients find it useful to schedule follow-up scans to monitor their condition or for routine health screening. If your clinician has recommended a follow-up — or if you'd like a proactive health check — we can book you in quickly.`,
      cta: 'Book a follow-up scan',
      ctaHref: 'https://scanbook.co.uk/search',
    },
  }

  const cfg = configs[stage]

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#F2F1EC;font-family:'DM Sans',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F1EC;padding:40px 20px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
        <tr>
          <td style="padding:0 0 24px;text-align:center;">
            <a href="https://scanbook.co.uk" style="text-decoration:none;font-size:22px;letter-spacing:-.5px;">
              <span style="color:#0F4C81;">Scan</span><span style="color:#082A4A;">Book</span>
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;border-radius:16px;border:1.5px solid #E5E1D8;padding:40px;">
            <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">Hi ${firstName},</p>
            ${cfg.body.split('\n\n').map(p =>
              `<p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">${p.trim()}</p>`
            ).join('')}
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">
              <tr>
                <td style="text-align:center;">
                  <a href="${cfg.ctaHref}"
                     style="display:inline-block;padding:13px 28px;background:#082A4A;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
                    ${cfg.cta} →
                  </a>
                </td>
              </tr>
            </table>
            <p style="font-size:12px;color:#9CA3AF;line-height:1.6;margin:28px 0 0;text-align:center;">
              Booking ref: ${bookingRef} · Questions? Reply to this email.<br/>
              <a href="https://scanbook.co.uk/patient/unsubscribe?ref=${bookingRef}" style="color:#9CA3AF;text-decoration:none;">Unsubscribe from follow-up emails</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9CA3AF;">
              © 2026 ScanBook · Connective Hub Limited · Company No. 11148446
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  return { subject: cfg.subject, html }
}
