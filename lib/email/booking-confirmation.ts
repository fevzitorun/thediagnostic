import { Resend } from 'resend'

export interface BookingEmailData {
  patientName: string
  patientEmail: string
  bookingRef: string
  clinicName: string
  scanName: string
  appointmentDate?: string
  appointmentTime?: string
  amountPaid?: number
  isCallback?: boolean
  clinicAddress?: string
}

export async function sendBookingConfirmation(data: BookingEmailData) {
  const {
    patientName,
    patientEmail,
    bookingRef,
    clinicName,
    scanName,
    appointmentDate,
    appointmentTime,
    amountPaid,
    isCallback,
    clinicAddress,
  } = data

  const subject = isCallback
    ? `Callback request received — ${bookingRef}`
    : `Booking confirmed — ${bookingRef}`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F2F1EC;font-family:'DM Sans',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F1EC;padding:40px 20px;">
    <tr>
      <td>
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

              <!-- Green top bar -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${isCallback ? '#082A4A' : '#082A4A'};padding:32px 40px;text-align:center;">
                    <div style="width:64px;height:64px;border-radius:50%;background:rgba(255,255,255,.15);margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px;line-height:64px;text-align:center;">
                      ${isCallback ? '📞' : '✅'}
                    </div>
                    <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff;line-height:1.3;">
                      ${isCallback ? 'Callback request received' : 'Booking confirmed'}
                    </h1>
                    <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,.65);">
                      ${isCallback
                        ? 'We\'ll call you within 1 hour (Mon–Fri, 9am–5pm)'
                        : 'Your appointment is booked. See you there!'}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- BOOKING REF -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 40px;text-align:center;border-bottom:1.5px solid #E5E1D8;">
                    <div style="font-size:11px;font-weight:700;color:#9CA3AF;letter-spacing:1.2px;text-transform:uppercase;margin-bottom:8px;">Booking reference</div>
                    <div style="font-size:28px;font-weight:700;color:#082A4A;letter-spacing:3px;font-family:monospace;">${bookingRef}</div>
                  </td>
                </tr>
              </table>

              <!-- DETAILS -->
              <table width="100%" cellpadding="0" cellspacing="0" style="padding:0 40px;">
                ${row('Patient', patientName)}
                ${row('Scan', scanName)}
                ${row('Clinic', clinicName)}
                ${clinicAddress ? row('Address', clinicAddress) : ''}
                ${appointmentDate ? row('Date', appointmentDate) : ''}
                ${appointmentTime ? row('Time', appointmentTime) : ''}
                ${amountPaid ? row('Amount paid', `£${amountPaid}`) : ''}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:32px 40px;text-align:center;border-top:1.5px solid #E5E1D8;">
                    <a href="https://scanbook.co.uk/patient/dashboard"
                       style="display:inline-block;padding:13px 28px;background:#082A4A;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
                      View in patient portal →
                    </a>
                    <p style="margin:16px 0 0;font-size:12px;color:#9CA3AF;">
                      Questions? Reply to this email or call us on <a href="tel:+441234567890" style="color:#0F4C81;text-decoration:none;">01234 567 890</a>
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
                © 2026 ScanBook · A trading name of Connective Hub Limited · Company No. 11148446<br/>
                <a href="https://scanbook.co.uk/privacy-policy" style="color:#9CA3AF;text-decoration:none;">Privacy policy</a> ·
                <a href="https://scanbook.co.uk/terms-and-conditions" style="color:#9CA3AF;text-decoration:none;">Terms</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data: result, error } = await resend.emails.send({
    from: 'ScanBook <bookings@scanbook.co.uk>',
    to: patientEmail,
    subject,
    html,
    replyTo: 'help@scanbook.co.uk',
  })

  if (error) {
    console.error('[Resend] Failed to send booking confirmation:', error)
    return { success: false, error }
  }

  return { success: true, id: result?.id }
}

function row(label: string, value: string) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #F2F1EC;display:flex;justify-content:space-between;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:12px;color:#9CA3AF;padding:10px 0;width:40%;">${label}</td>
            <td style="font-size:13px;font-weight:600;color:#111;padding:10px 0;text-align:right;">${value}</td>
          </tr>
        </table>
      </td>
    </tr>`
}
