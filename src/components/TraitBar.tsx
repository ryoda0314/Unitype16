"use client";

import { motion } from "framer-motion";

interface TraitBarProps {
    labelLeft: string;
    labelRight: string;
    score: number; // -3 to 3
    colorLeft?: string; // e.g., "bg-blue-500"
    colorRight?: string; // e.g., "bg-red-500"
}

export function TraitBar({
    labelLeft,
    labelRight,
    score,
    colorLeft = "bg-indigo-500",
    colorRight = "bg-emerald-500",
}: TraitBarProps) {
    // Calculate position (0-100 scale)
    // -3 -> 0%, 0 -> 50%, 3 -> 100%
    const clampedScore = Math.max(-3, Math.min(3, score));
    const position = ((clampedScore + 3) / 6) * 100;

    // Percentages for display
    const pctRight = Math.round(position);
    const pctLeft = 100 - pctRight;

    // Determination
    const isLeftDominant = clampedScore < 0;
    const isRightDominant = clampedScore > 0;

    // Labels based on which side is dominant
    const dominantLabel = isLeftDominant ? labelLeft : labelRight;
    const dominantPct = isLeftDominant ? pctLeft : pctRight;

    // Color for the bar fill (always fills from left)
    const barColor = isLeftDominant ? colorLeft : colorRight;

    // Shorthand for left pole letter (just the first character like M, A, C, I)
    const poleLabel = isLeftDominant
        ? labelLeft.charAt(0)
        : labelRight.charAt(0);

    return (
        <div className="w-full max-w-3xl mx-auto py-3 md:py-6">
            {/* Bar Track - Fully Colored */}
            <div className={`relative h-2 md:h-4 ${barColor} rounded-full shadow-inner`}>
                {/* Center Marker */}
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white/20 z-0 transform -translate-x-1/2" />

                {/* Thumb & Floating Label */}
                <motion.div
                    initial={{ left: 0 }}
                    whileInView={{ left: `${position}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                    className="absolute top-1/2 -translate-y-1/2 z-20"
                >
                    {/* Floating Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex flex-col items-center"
                    >
                        <span className={`text-[10px] md:text-lg font-bold text-slate-700 drop-shadow-sm`}>
                            {dominantPct}% {dominantLabel.includes('：') ? dominantLabel.split('：')[1] : dominantLabel}
                        </span>
                        {/* Down Arrow/Caret */}
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-slate-700 opacity-20 mt-1" />
                    </motion.div>

                    {/* Cursor Circle */}
                    <div className="w-4 h-4 md:w-6 md:h-6 -ml-2 md:-ml-3 bg-white rounded-full border-2 md:border-4 border-slate-50 shadow-lg relative transform hover:scale-110 transition-transform">
                        {/* Inner dot for precision */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${barColor} opacity-50`} />
                    </div>
                </motion.div>
            </div>

            <div className="flex justify-between mt-2 px-1">
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isLeftDominant ? "text-slate-600" : "text-slate-400"}`}>
                    {labelLeft.split('：')[0]}
                </span>
                <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${isRightDominant ? "text-slate-600" : "text-slate-400"}`}>
                    {labelRight.split('：')[0]}
                </span>
            </div>
        </div>
    );
}
