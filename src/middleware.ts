import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … if the path contains a dot (e.g. `favicon.ico`)
    matcher: ['/', '/(ja|en|ko)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
