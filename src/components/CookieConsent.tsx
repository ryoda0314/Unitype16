"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "unitype16_cookie_consent";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations('cookie');

    useEffect(() => {
        const consent = localStorage.getItem(CONSENT_KEY);
        if (!consent) {
            // Show after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem(CONSENT_KEY, "accepted");
        setIsVisible(false);
        // Here you would initialize analytics/ad scripts
        // e.g., window.gtag?.('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
    };

    const handleDecline = () => {
        localStorage.setItem(CONSENT_KEY, "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 md:p-6">
                        <div className="flex items-start gap-4">
                            <div className="hidden md:flex w-12 h-12 bg-amber-100 rounded-full items-center justify-center shrink-0">
                                <Cookie className="w-6 h-6 text-amber-600" />
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <Cookie className="w-5 h-5 text-amber-600 md:hidden" />
                                        {t('title')}
                                    </h3>
                                    <button
                                        onClick={handleDecline}
                                        className="p-1 hover:bg-slate-100 rounded-full transition-colors md:hidden"
                                    >
                                        <X className="w-5 h-5 text-slate-400" />
                                    </button>
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {t('description')}
                                </p>

                                <div className="text-xs text-slate-500 space-y-1">
                                    <p>• {t('analytics')}</p>
                                    <p>• {t('ads')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
                            <button
                                onClick={handleDecline}
                                className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                            >
                                {t('decline')}
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors shadow-sm"
                            >
                                {t('accept')}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
