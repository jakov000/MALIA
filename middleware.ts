import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isLoginPage = req.nextUrl.pathname.startsWith('/admin/login');

  if (isOnAdmin && !isLoginPage) {
    if (!isLoggedIn) {
      return Response.redirect(new URL('/admin/login', req.nextUrl));
    }
  }

  return undefined; // return undefined to pass through
});

export const config = {
  matcher: ['/admin/:path*'],
};
