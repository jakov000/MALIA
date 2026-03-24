import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['de', 'en'],

  // Used when no locale matches
  defaultLocale: 'de',
  
  // Create locale prefix only for non-default locale or always
  localePrefix: 'always',
  
  // Disable automatic locale detection to always force DE as default
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(de|en)/:path*',
    // Match everything else skipping /api, /admin, /_next, files with dot
    '/((?!api|admin|_next|_vercel|.*\\..*).*)'
  ]
};
