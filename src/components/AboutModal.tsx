"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Info } from "lucide-react";
import { useTranslations } from 'next-intl';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
    const t = useTranslations('about');

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                    <Info className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{t('title')}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] space-y-6">
                            <p className="text-slate-600 leading-relaxed">
                                {t('intro')}
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                                    {t('axesTitle')}
                                </h3>
                                <div className="space-y-3">
                                    <div className="p-4 bg-indigo-50/50 rounded-xl">
                                        <h4 className="font-bold text-indigo-700 mb-1">{t('axis1name')}</h4>
                                        <p className="text-sm text-slate-600">{t('axis1desc')}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-50/50 rounded-xl">
                                        <h4 className="font-bold text-emerald-700 mb-1">{t('axis2name')}</h4>
                                        <p className="text-sm text-slate-600">{t('axis2desc')}</p>
                                    </div>
                                    <div className="p-4 bg-amber-50/50 rounded-xl">
                                        <h4 className="font-bold text-amber-700 mb-1">{t('axis3name')}</h4>
                                        <p className="text-sm text-slate-600">{t('axis3desc')}</p>
                                    </div>
                                    <div className="p-4 bg-rose-50/50 rounded-xl">
                                        <h4 className="font-bold text-rose-700 mb-1">{t('axis4name')}</h4>
                                        <p className="text-sm text-slate-600">{t('axis4desc')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                                    {t('howToReadTitle')}
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {t('howToReadDesc')}
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                                    {t('disclaimerTitle')}
                                </h3>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {t('disclaimerDesc')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
