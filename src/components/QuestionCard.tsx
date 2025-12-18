"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
    question: string;
    value: number | null;
    onChange: (value: number) => void;
}

export function QuestionCard({
    question,
    value,
    onChange,
}: QuestionCardProps) {
    // 16Personalities Style:
    // Left = Agree (Green)
    // Right = Disagree (Purple)
    // Values: 7 (Strongly Agree) -> 1 (Strongly Disagree)

    // Options ordered from Left (Agree) to Right (Disagree)
    const options = [7, 6, 5, 4, 3, 2, 1];

    const getColor = (val: number) => {
        if (val === 4) return "border-gray-300 text-gray-300";
        if (val > 4) return "border-emerald-500 text-emerald-500"; // Agree side
        return "border-purple-500 text-purple-500"; // Disagree side
    };

    const getFillColor = (val: number) => {
        if (val === 4) return "bg-gray-400";
        if (val > 4) return "bg-emerald-500";
        return "bg-purple-500";
    }

    // Size calculation (16P style: Ends are big, middle is small)
    // 7, 1 -> Big
    // 6, 2 -> Med
    // 5, 3 -> Small
    // 4 -> Smallest/Grey
    const getSize = (val: number) => {
        const dist = Math.abs(val - 4); // 0 to 3

        // Tailwind classes for width/height
        if (dist === 3) return "w-14 h-14 md:w-16 md:h-16"; // 1 & 7
        if (dist === 2) return "w-10 h-10 md:w-12 md:h-12"; // 2 & 6
        if (dist === 1) return "w-8 h-8 md:w-9 md:h-9";     // 3 & 5
        return "w-6 h-6 md:w-7 md:h-7";                     // 4
    };

    return (
        <div className="w-full max-w-3xl mx-auto py-12 border-b border-gray-100 last:border-0">
            <h3 className="text-xl md:text-2xl font-bold text-slate-700 mb-10 text-center">
                {question}
            </h3>

            <div className="flex flex-col items-center gap-6">

                {/* Mobile Labels (Top) */}
                <div className="flex justify-between w-full md:hidden px-4 text-xs font-bold uppercase tracking-wider">
                    <span className="text-emerald-500">そう思う</span>
                    <span className="text-purple-500">そう思わない</span>
                </div>

                <div className="flex items-center justify-center w-full relative">
                    {/* Desktop Label Left (Agree) */}
                    <span className="hidden md:block absolute left-0 text-emerald-500 font-bold text-sm tracking-wider mr-4">
                        そう思う
                    </span>

                    {/* Circles Container */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-4">
                        {options.map((optionValue) => {
                            const isSelected = value === optionValue;
                            const sizeClass = getSize(optionValue);
                            const colorClass = getColor(optionValue);
                            const fillClass = getFillColor(optionValue);
                            const isNeutral = optionValue === 4;

                            return (
                                <button
                                    key={optionValue}
                                    onClick={() => onChange(optionValue)}
                                    className="relative flex items-center justify-center focus:outline-none group"
                                    aria-label={`Select option ${optionValue}`}
                                >
                                    <motion.div
                                        className={cn(
                                            "rounded-full border-2 transition-all duration-300 ease-out",
                                            colorClass,
                                            sizeClass,
                                            isSelected ? fillClass : "bg-transparent hover:bg-opacity-10",
                                            isSelected ? "border-transparent ring-2 ring-offset-2 ring-opacity-50" : "opacity-40 hover:opacity-100",
                                            isSelected && optionValue > 4 ? "ring-emerald-300" : "",
                                            isSelected && optionValue < 4 ? "ring-purple-300" : "",
                                            isSelected && optionValue === 4 ? "ring-gray-300" : ""
                                        )}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {/* Inner Indicator for Selected State - Optional, but 16P basically just fills it */}
                                    </motion.div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Desktop Label Right (Disagree) */}
                    <span className="hidden md:block absolute right-0 text-purple-500 font-bold text-sm tracking-wider ml-4">
                        そう思わない
                    </span>
                </div>
            </div>
        </div>
    );
}
