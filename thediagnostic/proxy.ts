import createMiddleware from 'next-intl/middleware';
import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const session = req.auth;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/patient', '/clinic', '/admin', '/gp'];
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));

  if (isProtected && !session?.user) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session?.user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/patient/dashboard', req.url));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
