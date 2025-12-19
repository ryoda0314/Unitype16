import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "UniType16 - 大学ラベル診断",
    description: "たった1分であなたの性格タイプを分析し、相性の良い大学ラベル（旧帝大、早慶、MARCHなど）を診断します。",
    openGraph: {
        title: "UniType16 - 大学ラベル診断",
        description: "性格で選ぶ、あなたの理想の大学。たった1分で相性の良い大学群を診断します。",
        images: [
            {
                url: "/assets/illustration_study.png",
                width: 1200,
                height: 630,
                alt: "UniType16 Preview",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "UniType16 - 大学ラベル診断",
        description: "性格で選ぶ、あなたの理想の大学。たった1分で相性の良い大学群を診断します。",
        images: ["/assets/illustration_study.png"],
    },
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    setRequestLocale(locale);

    // Providing all messages to the client side
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <head>
                <Script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5978675398132986"
                    crossOrigin="anonymous"
                    strategy="afterInteractive"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <CookieConsent />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

