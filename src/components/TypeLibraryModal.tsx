import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import universityTypes from '../data/universityTypes.json';
import { determineType } from '../data/scoring'; // Just in case, though we iterate keys

interface TypeLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TypeLibraryModal({ isOpen, onClose }: TypeLibraryModalProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    // Get all types as array
    const types = Object.entries(universityTypes).map(([code, data]) => ({
        code,
        ...data
    }));

    if (!isOpen) return null;

    const selectedTypeData = selectedType ? universityTypes[selectedType as keyof typeof universityTypes] : null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <h2 className="text-2xl font-bold text-slate-900">大学タイプ図鑑</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                >
                                    <X size={24} className="text-slate-500" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 lg:p-10">
                                {selectedTypeData ? (
                                    /* Detail View */
                                    <div className="animate-fadeIn">
                                        <button
                                            onClick={() => setSelectedType(null)}
                                            className="mb-6 text-sm text-indigo-600 font-medium hover:underline flex items-center gap-1"
                                        >
                                            ← 一覧に戻る
                                        </button>

                                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-8 border border-slate-100">
                                            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                                                <div className="w-full max-w-xs shrink-0">
                                                    <div className={`aspect-square rounded-[2rem] overflow-hidden ${selectedTypeData.color} bg-opacity-10 mb-4`}>
                                                        <img
                                                            src={selectedTypeData.image}
                                                            alt={selectedTypeData.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex-1 text-center lg:text-left">
                                                    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold text-white mb-4 ${selectedTypeData.color}`}>
                                                        {selectedType}
                                                    </div>
                                                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                                                        {selectedTypeData.name}
                                                    </h3>
                                                    <p className="text-xl text-slate-600 font-medium mb-6">
                                                        {selectedTypeData.desc}
                                                    </p>
                                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                            Stereotype
                                                        </h4>
                                                        <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                                                            {selectedTypeData.stereotype}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Grid View */
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                                        {types.map((type) => (
                                            <button
                                                key={type.code}
                                                onClick={() => setSelectedType(type.code)}
                                                className="group bg-white border border-slate-200 rounded-2xl p-4 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all text-left flex flex-col items-center"
                                            >
                                                <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 mb-4 relative">
                                                    <img
                                                        src={type.image}
                                                        alt={type.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-bold text-white ${type.color}`}>
                                                        {type.code}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-1">{type.name}</h3>
                                                <p className="text-xs text-slate-500 font-medium line-clamp-1">{type.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
