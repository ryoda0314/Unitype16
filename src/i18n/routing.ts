import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: ['ja', 'en', 'ko'],
    defaultLocale: 'ja'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
    createNavigation(routing);
