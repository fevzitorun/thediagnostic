import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const session = req.auth
  const { pathname } = req.nextUrl

  const protectedRoutes = ['/patient', '/clinic', '/admin', '/gp']
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))

  if (isProtected && !session?.user) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (session?.user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/patient/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/patient/:path*',
    '/clinic/:path*',
    '/admin/:path*',
    '/gp/:path*',
    '/login',
    '/register',
  ],
}
