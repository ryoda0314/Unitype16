import React, { useState } from 'react';
import { BookOpen, HeartHandshake, Home, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    onOpenTypeLibrary: () => void;
    onOpenCompatibility: () => void;
    onGoHome: () => void;
}

export function Header({ onOpenTypeLibrary, onOpenCompatibility, onGoHome }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                    onClick={onOpenTypeLibrary}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <BookOpen size={18} />
                    <span>タイプ図鑑</span>
                </button>
                <button
                    onClick={onOpenCompatibility}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-sm transition-all"
                >
                    <HeartHandshake size={18} />
                    <span>相性チェッカー</span>
                </button>
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
                            onOpenTypeLibrary();
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-4 p-4 w-full text-left rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-lg font-bold text-slate-700">タイプ図鑑を見る</span>
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
                        <span className="text-lg font-bold text-slate-700">相性チェッカー</span>
                    </button>
                </motion.div>
            )}
        </motion.header>
    );
}
