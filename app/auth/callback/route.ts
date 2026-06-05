// OAuth callback handled by NextAuth at /api/auth/callback/[provider]
// This route kept for legacy redirects only
import { NextResponse } from 'next/server'
export async function GET(req: Request) {
  const url = new URL(req.url)
  const redirect = url.searchParams.get('redirect') ?? '/patient/dashboard'
  return NextResponse.redirect(new URL(redirect, req.url))
}
