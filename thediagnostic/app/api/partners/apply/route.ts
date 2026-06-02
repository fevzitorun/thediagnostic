// POST /api/partners/apply
// Handles clinic partnership application form submission.
// Saves to Supabase + sends notification email to partnerships team.

import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  let body: Record<string, unknown>

  const contentType = req.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    body = await req.json()
  } else {
    const formData = await req.formData()
    body = Object.fromEntries(formData.entries())
  }

  const {
    firstName, lastName, jobTitle, centreName, email,
    phone, website, cqcId, region, weeklySlots, notes,
  } = body as Record<string, string>

  if (!firstName || !centreName || !email || !cqcId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO partner_leads
        (first_name, last_name, job_title, centre_name, email, phone, website,
         cqc_id, region, weekly_slots, notes, status, source)
      VALUES
        (${firstName ?? null}, ${lastName ?? null}, ${jobTitle ?? null}, ${centreName},
         ${email}, ${phone ?? null}, ${website ?? null},
         ${cqcId ?? null}, ${region ?? null}, ${weeklySlots ?? null}, ${notes ?? null},
         'new', 'website_form')
    `
  } catch (err) {
    console.error('[PartnerApply] DB error:', err)
  }

  // Notify partnerships team
  await resend.emails.send({
    from: 'ScanBook <noreply@scanbook.co.uk>',
    to: 'partnerships@scanbook.co.uk',
    subject: `New partner application — ${centreName} (${region})`,
    html: buildNotificationHtml({ firstName, lastName, jobTitle, centreName, email, phone, website, cqcId, region, weeklySlots, notes }),
    replyTo: email,
  })

  // Auto-reply to applicant
  await resend.emails.send({
    from: 'ScanBook Partnerships <partnerships@scanbook.co.uk>',
    to: email,
    subject: `We've received your ScanBook partnership application — ${centreName}`,
    html: buildAutoReplyHtml(firstName, centreName),
    replyTo: 'partnerships@scanbook.co.uk',
  })

  // If this came from a regular form POST, redirect to thank-you page
  if (!contentType.includes('application/json')) {
    return NextResponse.redirect(new URL('/partners/thank-you', req.url))
  }

  return NextResponse.json({ success: true })
}

function buildNotificationHtml(data: Record<string, string | undefined>): string {
  const rows = [
    ['Name', `${data.firstName} ${data.lastName}`],
    ['Job title', data.jobTitle],
    ['Centre', data.centreName],
    ['Email', data.email],
    ['Phone', data.phone || '—'],
    ['Website', data.website || '—'],
    ['CQC ID', data.cqcId],
    ['Region', data.region],
    ['Weekly slots', data.weeklySlots || '—'],
    ['Notes', data.notes || '—'],
  ]

  return `
<html><body style="font-family:sans-serif;padding:24px;max-width:600px;">
  <h2 style="color:#082A4A;">New Partner Application</h2>
  <table style="width:100%;border-collapse:collapse;">
    ${rows.map(([k, v]) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #E5E1D8;font-size:12px;color:#9CA3AF;width:35%;font-weight:600;">${k}</td>
        <td style="padding:8px;border-bottom:1px solid #E5E1D8;font-size:13px;color:#111;">${v ?? '—'}</td>
      </tr>`).join('')}
  </table>
  <p style="margin-top:24px;font-size:13px;color:#6B7280;">Reply to this email to contact the applicant directly.</p>
</body></html>`
}

function buildAutoReplyHtml(firstName: string, centreName: string): string {
  return `
<html><body style="font-family:sans-serif;padding:32px;max-width:560px;background:#F2F1EC;">
  <div style="background:#fff;border-radius:16px;border:1.5px solid #E5E1D8;padding:40px;">
    <a href="https://scanbook.co.uk" style="text-decoration:none;font-size:22px;font-weight:700;">
      <span style="color:#0F4C81;">Scan</span><span style="color:#082A4A;">Book</span>
    </a>
    <h2 style="color:#082A4A;margin:24px 0 16px;font-size:20px;">Thanks for applying, ${firstName}!</h2>
    <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 16px;">
      We've received your partnership application for <strong>${centreName}</strong>.
      A member of our partnerships team will be in touch within <strong>one working day</strong> to discuss the next steps.
    </p>
    <p style="font-size:14px;color:#374151;line-height:1.7;margin:0 0 28px;">
      In the meantime, if you have any questions, reply to this email or contact us at
      <a href="mailto:partnerships@scanbook.co.uk" style="color:#0F4C81;">partnerships@scanbook.co.uk</a>.
    </p>
    <a href="https://scanbook.co.uk/partners" style="display:inline-block;padding:12px 24px;background:#082A4A;color:#fff;border-radius:10px;font-size:14px;font-weight:600;text-decoration:none;">
      View our partner guide →
    </a>
    <p style="font-size:12px;color:#9CA3AF;margin:24px 0 0;">
      ScanBook · Connective Hub Limited · Company No. 11148446
    </p>
  </div>
</body></html>`
}
