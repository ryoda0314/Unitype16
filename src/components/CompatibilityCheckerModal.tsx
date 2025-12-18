import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, AlertTriangle } from 'lucide-react';
import universityTypes from '../data/universityTypes.json';
import compatibilityData from '../data/compatibility.json';

interface CompatibilityCheckerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CompatibilityCheckerModal({ isOpen, onClose }: CompatibilityCheckerModalProps) {
    const [typeA, setTypeA] = useState<string>("MACI"); // Default Kyoto
    const [typeB, setTypeB] = useState<string>("MSCI"); // Default Todai

    if (!isOpen) return null;

    const types = Object.keys(universityTypes);

    // Initial check logic
    const checkCompatibility = (a: string, b: string) => {
        if (a === b) return { level: "Self", points: "自己理解", tips: "自分自身とは常に対話が必要です。" };

        const aData = compatibilityData[a as keyof typeof compatibilityData];
        if (!aData) return null;

        // Check compatible list
        const comp = aData.compatible?.find(c => c.type === b);
        if (comp) return { ...comp, status: 'good' };

        // Check incompatible list
        const incomp = aData.incompatible?.find(c => c.type === b);
        if (incomp) return { ...incomp, status: 'bad' };

        // Default / Average
        return {
            level: "Average",
            points: "可もなく不可もなく、普通の相性です。お互いの違いを尊重すればうまくいきます。",
            tips: "共通の目標を持つことで協力しやすくなります。",
            status: 'average'
        };
    };

    const result = checkCompatibility(typeA, typeB);
    const typeAData = universityTypes[typeA as keyof typeof universityTypes];
    const typeBData = universityTypes[typeB as keyof typeof universityTypes];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 lg:pt-20 overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
                        >
                            <X size={24} className="text-slate-500" />
                        </button>

                        <div className="p-8 text-center bg-gradient-to-b from-indigo-50 to-white">
                            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center justify-center gap-2">
                                <Heart className="text-rose-500 fill-rose-500" />
                                相性チェッカー
                            </h2>

                            <div className="flex items-center justify-center gap-4 lg:gap-8 mb-8">
                                {/* Type A Selector */}
                                <div className="flex flex-col gap-2 w-full max-w-[160px]">
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 mb-2 relative shadow-md">
                                        <img src={typeAData.image} alt={typeAData.name} className="w-full h-full object-cover" />
                                        <div className={`absolute bottom-0 left-0 right-0 py-1 text-xs font-bold text-white text-center ${typeAData.color}`}>
                                            {typeA}
                                        </div>
                                    </div>
                                    <select
                                        value={typeA}
                                        onChange={(e) => setTypeA(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        {types.map(t => (
                                            <option key={t} value={t}>{universityTypes[t as keyof typeof universityTypes].name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="text-2xl font-bold text-slate-300">×</div>

                                {/* Type B Selector */}
                                <div className="flex flex-col gap-2 w-full max-w-[160px]">
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-slate-200 mb-2 relative shadow-md">
                                        <img src={typeBData.image} alt={typeBData.name} className="w-full h-full object-cover" />
                                        <div className={`absolute bottom-0 left-0 right-0 py-1 text-xs font-bold text-white text-center ${typeBData.color}`}>
                                            {typeB}
                                        </div>
                                    </div>
                                    <select
                                        value={typeB}
                                        onChange={(e) => setTypeB(e.target.value)}
                                        className="w-full p-2 rounded-lg border border-slate-300 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        {types.map(t => (
                                            <option key={t} value={t}>{universityTypes[t as keyof typeof universityTypes].name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Result Display */}
                            {result && (
                                <div className="animate-popIn">
                                    <div className="inline-block px-6 py-2 rounded-full bg-white shadow-sm border border-slate-200 mb-6">
                                        <span className="text-slate-500 font-medium mr-2">相性レベル:</span>
                                        <span className={`text-xl font-bold ${result.status === 'good' ? 'text-emerald-500' :
                                                result.status === 'bad' ? 'text-rose-500' :
                                                    'text-amber-500'
                                            }`}>
                                            {result.level}
                                        </span>
                                    </div>

                                    <div className="text-left bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
                                        {/* Colored Accent Bar */}
                                        <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${result.status === 'good' ? 'bg-emerald-400' :
                                                result.status === 'bad' ? 'bg-rose-400' :
                                                    'bg-amber-400'
                                            }`} />

                                        <div className="mb-4">
                                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                                                {result.status === 'bad' ? <AlertTriangle size={18} className="text-rose-500" /> : <Heart size={18} className="text-emerald-500" />}
                                                相性のポイント
                                            </h4>
                                            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                                                {result.points}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-2 text-sm">💡 付き合い方のヒント</h4>
                                            <p className="text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">
                                                {result.tips}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
