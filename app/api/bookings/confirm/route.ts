import { NextResponse, type NextRequest } from 'next/server'
import { sql } from '@/lib/db'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { bookingId, stripeSessionId } = body

  if (!bookingId && !stripeSessionId) {
    return NextResponse.json({ error: 'bookingId or stripeSessionId required' }, { status: 400 })
  }

  try {
    if (bookingId) {
      await sql`UPDATE bookings SET status = 'confirmed' WHERE id = ${bookingId}`
    } else {
      await sql`UPDATE bookings SET status = 'confirmed' WHERE stripe_session_id = ${stripeSessionId}`
    }
    return NextResponse.json({ confirmed: true })
  } catch (err) {
    console.error('[Confirm] DB update failed:', err)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}
