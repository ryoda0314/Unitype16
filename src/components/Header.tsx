import React from 'react';
import { BookOpen, HeartHandshake, Home } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    onOpenTypeLibrary: () => void;
    onOpenCompatibility: () => void;
    onGoHome: () => void;
}

export function Header({ onOpenTypeLibrary, onOpenCompatibility, onGoHome }: HeaderProps) {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-40 flex items-center justify-between px-4 lg:px-8 shadow-sm"
        >
            <button
                onClick={onGoHome}
                className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    UniType16
                </span>
            </button>

            <div className="flex items-center gap-2 lg:gap-4">
                <button
                    onClick={onOpenTypeLibrary}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                >
                    <BookOpen size={18} />
                    <span className="hidden sm:inline">タイプ図鑑</span>
                </button>
                <button
                    onClick={onOpenCompatibility}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-sm transition-all"
                >
                    <HeartHandshake size={18} />
                    <span className="hidden sm:inline">相性チェッカー</span>
                </button>
            </div>
        </motion.header>
    );
}
