"use client";

import React, { useState } from 'react';
import { BookOpen, HeartHandshake, Menu, X, Globe, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

interface HeaderProps {
    onOpenTypeLibrary: () => void;
    onOpenCompatibility: () => void;
    onOpenAbout: () => void;
    onGoHome: () => void;
}

const localeLabels: Record<string, string> = {
    ja: '日本語',
    en: 'English',
    ko: '한국어',
};

const localeFlags: Record<string, string> = {
    ja: '🇯🇵',
    en: '🇺🇸',
    ko: '🇰🇷',
};

export function Header({ onOpenTypeLibrary, onOpenCompatibility, onOpenAbout, onGoHome }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const t = useTranslations('common');
    const tAbout = useTranslations('about');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale as any });
        setIsLangMenuOpen(false);
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 h-20 lg:h-28 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4 lg:px-8 shadow-sm"
        >
            <button
                onClick={onGoHome}
                className="flex items-center gap-2 lg:gap-4 hover:opacity-70 transition-opacity"
            >
                <img
                    src="/assets/logo_header.png"
                    alt="UniType16 Logo"
                    className="h-12 lg:h-20 w-auto object-contain hover:scale-105 transition-transform translate-y-1 lg:translate-y-2"
                />
                <span className="text-2xl lg:text-4xl font-black text-slate-800 tracking-tight font-sans">
                    UniType<span className="text-indigo-600">16</span>
                </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4">
                <button
                    onClick={onOpenAbout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                >
                    <Info size={18} />
                    <span>{tAbout('title')}</span>
                </button>
                <button
                    onClick={onOpenTypeLibrary}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <BookOpen size={18} />
                    <span>{t('header.typeLibrary')}</span>
                </button>
                <button
                    onClick={onOpenCompatibility}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-sm transition-all"
                >
                    <HeartHandshake size={18} />
                    <span>{t('header.compatibility')}</span>
                </button>

                {/* Language Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-colors"
                    >
                        <Globe size={16} />
                        <span>{localeFlags[locale]} {localeLabels[locale]}</span>
                    </button>
                    {isLangMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden w-36 z-50">
                            {['ja', 'en', 'ko'].map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => handleLocaleChange(loc)}
                                    className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 transition-colors ${locale === loc ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700'}`}
                                >
                                    {localeFlags[loc]} {localeLabels[loc]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Hamburger Button */}
            <button
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-20 lg:top-28 left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 lg:hidden flex flex-col gap-4"
                >
                    <button
                        onClick={() => {
                            onOpenAbout();
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 p-4 w-full text-left rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                            <Info size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-700">{tAbout('title')}</span>
                    </button>

                    <button
                        onClick={() => {
                            onOpenTypeLibrary();
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 p-4 w-full text-left rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-700">{t('header.typeLibrary')}</span>
                    </button>

                    <button
                        onClick={() => {
                            onOpenCompatibility();
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 p-4 w-full text-left rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                            <HeartHandshake size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-700">{t('header.compatibility')}</span>
                    </button>

                    {/* Mobile Language Switcher */}
                    <div className="border-t border-slate-100 pt-4 mt-2">
                        <p className="text-xs text-slate-400 font-bold uppercase mb-2 px-2">Language</p>
                        <div className="flex gap-2 flex-wrap">
                            {['ja', 'en', 'ko'].map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => {
                                        handleLocaleChange(loc);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${locale === loc ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {localeFlags[loc]} {localeLabels[loc]}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
