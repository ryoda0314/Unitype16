"use client";

import { motion } from "framer-motion";
import universityTypes from "@/data/universityTypes.json";
import { cn } from "@/lib/utils";

interface CompatibilityCardProps {
    typeCode: string;
    level: string;
    points: string;
    tips: string;
    variant: "compatible" | "incompatible";
}

export function CompatibilityCard({
    typeCode,
    level,
    points,
    tips,
    variant,
}: CompatibilityCardProps) {
    const uni = (universityTypes as any)[typeCode];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "p-6 rounded-2xl border transition-all duration-300",
                variant === "compatible"
                    ? "bg-emerald-50/50 border-emerald-100 hover:shadow-lg hover:shadow-emerald-500/5"
                    : "bg-purple-50/50 border-purple-100 hover:shadow-lg hover:shadow-purple-500/5"
            )}
        >
            <div className="flex items-center justify-between mb-4">
                <div>
                    <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                        variant === "compatible" ? "bg-emerald-100 text-emerald-700" : "bg-purple-100 text-purple-700"
                    )}>
                        {level}
                    </span>
                    <h4 className="text-xl font-bold text-gray-800 mt-2">
                        {uni?.name || typeCode}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">{uni?.desc}</p>
                </div>
                <div className="text-3xl font-black text-gray-100 select-none">
                    {typeCode}
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <h5 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                        <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            variant === "compatible" ? "bg-emerald-400" : "bg-purple-400"
                        )} />
                        {variant === "compatible" ? "噛み合う点" : "衝突ポイント"}
                    </h5>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {points}
                    </p>
                </div>

                <div>
                    <h5 className="text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                        <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            variant === "compatible" ? "bg-emerald-400" : "bg-purple-400"
                        )} />
                        {variant === "compatible" ? "維持のコツ" : "まず効く処方箋"}
                    </h5>
                    <p className="text-sm text-gray-600 leading-relaxed font-medium whitespace-pre-line">
                        {tips}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
