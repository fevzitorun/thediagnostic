// Clinic outreach email templates — sent via Resend

import { Resend } from 'resend'
import type { CqcProvider } from './types'

const FROM = 'ScanBook Partnerships <partnerships@scanbook.co.uk>'
const REPLY_TO = 'partnerships@scanbook.co.uk'

export async function sendClinicOutreachEmail(
  provider: CqcProvider,
  recipientEmail: string
): Promise<{ success: boolean; id?: string; error?: unknown }> {
  const clinicName = provider.name
  const city = provider.addresses[0]?.city ?? 'your area'

  const subject = `Partner with ScanBook — private imaging bookings for ${clinicName}`

  const html = buildOutreachHtml(clinicName, city)

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: recipientEmail,
    subject,
    html,
    replyTo: REPLY_TO,
    headers: {
      'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=Unsubscribe>`,
    },
  })

  if (error) {
    console.error(`[OutreachAgent] Failed to send to ${recipientEmail}:`, error)
    return { success: false, error }
  }

  return { success: true, id: data?.id }
}

function buildOutreachHtml(clinicName: string, city: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Partner with ScanBook</title>
</head>
<body style="margin:0;padding:0;background:#F2F1EC;font-family:'DM Sans',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F1EC;padding:40px 20px;">
    <tr><td>
      <table width="600" align="center" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">

        <!-- HEADER -->
        <tr>
          <td style="padding:0 0 24px;text-align:center;">
            <a href="https://scanbook.co.uk" style="text-decoration:none;font-size:22px;letter-spacing:-.5px;">
              <span style="color:#0F4C81;">Scan</span><span style="color:#082A4A;">Book</span>
            </a>
          </td>
        </tr>

        <!-- CARD -->
        <tr>
          <td style="background:#fff;border-radius:16px;border:1.5px solid #E5E1D8;overflow:hidden;">

            <!-- Header bar -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#082A4A;padding:32px 40px;">
                  <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;line-height:1.3;">
                    Fill your scanner capacity with self-pay patients
                  </h1>
                  <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,.65);">
                    Zero upfront cost. No exclusivity. You set the price.
                  </p>
                </td>
              </tr>
            </table>

            <!-- Body -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:32px 40px;">
                  <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">
                    Dear ${clinicName} team,
                  </p>
                  <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 20px;">
                    I'm reaching out from <strong>ScanBook</strong> — the UK's fastest-growing online platform for private medical imaging. We connect self-pay patients directly with CQC-registered imaging centres across the UK, and we'd love to list ${clinicName} as a partner in ${city}.
                  </p>

                  <p style="font-size:13px;font-weight:700;color:#082A4A;margin:0 0 12px;letter-spacing:.3px;">Why partner with ScanBook?</p>
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                    ${benefit('📅', 'Fill empty scanner slots', 'We direct patients to available capacity — generating revenue from time you\'d otherwise lose.')}
                    ${benefit('💷', 'Zero commission on first £10k', 'We operate on a transparent fee structure. You retain the majority of every booking.')}
                    ${benefit('🔒', 'No exclusivity required', 'Continue working with your existing referral networks and insurers alongside ScanBook.')}
                    ${benefit('⚡', 'Go live in 48 hours', 'Send us your scan menu and pricing — we handle listing, SEO, and patient management.')}
                  </table>

                  <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 28px;">
                    We currently work with imaging centres across London, Manchester, Birmingham, Edinburgh, and 11 other UK cities. Patients book online 24/7 and receive a confirmed appointment — reducing your admin burden.
                  </p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="text-align:center;">
                        <a href="https://scanbook.co.uk/partners?ref=outreach&clinic=${encodeURIComponent(clinicName)}"
                           style="display:inline-block;padding:13px 28px;background:#0F4C81;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
                          Start our free partnership conversation →
                        </a>
                        <p style="margin:14px 0 0;font-size:12px;color:#9CA3AF;">
                          Or reply directly to this email — we'll get back to you within one business day.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Sign-off -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 40px 32px;">
                  <p style="font-size:13px;color:#6B7280;line-height:1.6;margin:0;">
                    Warm regards,<br/>
                    <strong style="color:#082A4A;">The ScanBook Partnerships Team</strong><br/>
                    Connective Hub Limited · Company No. 11148446<br/>
                    <a href="https://scanbook.co.uk" style="color:#0F4C81;text-decoration:none;">scanbook.co.uk</a> ·
                    <a href="mailto:partnerships@scanbook.co.uk" style="color:#0F4C81;text-decoration:none;">partnerships@scanbook.co.uk</a>
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 0;text-align:center;">
            <p style="margin:0;font-size:11px;color:#9CA3AF;line-height:1.6;">
              © 2026 ScanBook · A trading name of Connective Hub Limited<br/>
              You received this because you operate a CQC-registered diagnostic imaging service in the UK.<br/>
              <a href="mailto:partnerships@scanbook.co.uk?subject=Unsubscribe" style="color:#9CA3AF;text-decoration:none;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function benefit(icon: string, title: string, desc: string): string {
  return `
    <tr>
      <td style="padding:8px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:36px;vertical-align:top;font-size:20px;">${icon}</td>
            <td style="vertical-align:top;padding-left:8px;">
              <div style="font-size:13px;font-weight:600;color:#111;margin-bottom:2px;">${title}</div>
              <div style="font-size:12px;color:#6B7280;line-height:1.5;">${desc}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}
