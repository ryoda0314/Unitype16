import { motion } from "framer-motion";
import { determineType } from "@/data/scoring";
import universityTypes from "@/data/universityTypes.json";
import compatibilityData from "@/data/compatibility.json";
import config from "@/data/config.json";
import { CompatibilityCard } from "./CompatibilityCard";
import { TraitBar } from "./TraitBar";
import { typeDescriptions } from "@/data/typeDescriptions";

interface ResultViewProps {
    scores: Record<string, number>;
    onReset: () => void;
}

export function ResultView({ scores, onReset }: ResultViewProps) {
    const typeCode = determineType(scores);
    const uni = (universityTypes as any)[typeCode];
    const compatibility = (compatibilityData as any)[typeCode];
    const axesConfig = (config as any).axesForResult;
    const description = typeDescriptions[typeCode];

    // DEBUG: Log scores to console
    console.log("[ResultView] Received scores:", scores);
    console.log("[ResultView] Determined type:", typeCode);

    return (
        <div className="max-w-5xl mx-auto py-16 px-6 space-y-24 font-sans text-slate-800">
            {/* Hero Section Wrapper with Share Button */}
            <div className="space-y-8">
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden"
                >
                    {/* Colored Background Shape */}
                    <div className={`absolute top-0 right-0 w-full md:w-2/3 h-full ${(uni as any).color || "bg-indigo-500"} opacity-10 md:opacity-100 md:[clip-path:polygon(20%_0%,_100%_0,_100%_100%,_0%_100%)] z-0`} />
                    <div className={`absolute top-0 right-0 w-full h-1/2 md:hidden ${(uni as any).color || "bg-indigo-500"} opacity-20 z-0`} />

                    <div className="relative z-10 flex flex-col md:flex-row items-center">

                        {/* Left Panel: Text Content */}
                        <div className="flex-1 p-8 md:p-16 space-y-6 text-center md:text-left">
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                    あなたの性格タイプ
                                </h4>
                                <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight">
                                    {uni?.name}
                                </h1>
                                <div className="text-2xl md:text-3xl font-bold text-slate-400">
                                    {typeCode}
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed whitespace-pre-line">
                                    {(uni as any).stereotype}
                                </p>
                                <p className="text-slate-500 font-medium">
                                    {uni?.desc}
                                </p>
                            </div>
                        </div>

                        {/* Right Panel: Character Image */}
                        <div className="flex-1 relative min-h-[300px] md:min-h-[500px] w-full flex items-center justify-center p-8">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                                className="relative bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl rotate-2 max-w-sm md:max-w-md w-full"
                            >
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-slate-100 rounded-full" /> {/* Card slot hint */}
                                <img
                                    src={(uni as any).image}
                                    alt={uni?.name}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <div className="flex justify-center">
                    <button
                        onClick={() => {
                            const shareUrl = `${window.location.origin}/share/${typeCode}`;
                            const text = `私の性格タイプは【${uni?.name}】でした！\n\n${description?.tagline}\n\n#UniType16 #大学診断`;
                            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
                            window.open(twitterUrl, '_blank');
                        }}
                        className="flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold shadow-lg hover:bg-slate-800 transition-transform hover:-translate-y-1"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span>結果をXでシェア</span>
                    </button>
                </div>
            </div>

            {/* Trait Breakdown */}
            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-16"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">性格特性の分析</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto" />
                    <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
                        あなたの意思決定や行動パターンを構成する4つの主要な軸を分析しました。
                    </p>
                </div>

                <div className="grid gap-6 bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -z-10 opacity-50" />
                    <div className="grid gap-12 max-w-3xl mx-auto w-full">
                        {/* Axis 1 */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-700 pl-2 border-l-4 border-indigo-400">
                                軸1：達成目標
                            </h3>
                            <TraitBar
                                labelLeft={axesConfig.MP.leftPole}
                                labelRight={axesConfig.MP.rightPole}
                                score={scores.MP}
                                colorLeft="bg-sky-400"
                                colorRight="bg-indigo-400"
                            />
                        </div>

                        {/* Axis 2 */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-700 pl-2 border-l-4 border-emerald-400">
                                軸2：制御焦点
                            </h3>
                            <TraitBar
                                labelLeft={axesConfig.AS.leftPole}
                                labelRight={axesConfig.AS.rightPole}
                                score={scores.AS}
                                colorLeft="bg-emerald-400"
                                colorRight="bg-teal-500"
                            />
                        </div>

                        {/* Axis 3 */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-700 pl-2 border-l-4 border-amber-400">
                                軸3：思考嗜好
                            </h3>
                            <TraitBar
                                labelLeft={axesConfig.CU.leftPole}
                                labelRight={axesConfig.CU.rightPole}
                                score={scores.CU}
                                colorLeft="bg-amber-400"
                                colorRight="bg-orange-500"
                            />
                        </div>

                        {/* Axis 4 */}
                        <div className="space-y-8">
                            <h3 className="text-lg font-bold text-slate-700 pl-2 border-l-4 border-rose-400">
                                軸4：学習の回し方
                            </h3>
                            <TraitBar
                                labelLeft={axesConfig.IN.leftPole}
                                labelRight={axesConfig.IN.rightPole}
                                score={scores.IN}
                                colorLeft="bg-rose-400"
                                colorRight="bg-purple-500"
                            />
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Detailed Analysis Section */}
            {description && (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="space-y-24"
                >
                    {/* Scene & Tagline */}
                    <div className="relative">
                        <img
                            src="/assets/illustration_relax.png"
                            alt="Relaxing"
                            className="absolute -top-32 -right-4 md:-right-12 w-32 md:w-48 opacity-90 rotate-3 z-10 drop-shadow-lg"
                        />
                        <div className="bg-gradient-to-b from-white to-slate-50 rounded-[2.5rem] p-10 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-bl-full -z-10" />

                            <div className="text-center max-w-3xl mx-auto relative z-20">
                                <h3 className="text-3xl font-bold text-slate-900 mb-8 leading-snug">{description.tagline}</h3>
                                <div className="relative">
                                    <span className="absolute -top-6 -left-4 text-6xl text-indigo-100 font-serif">“</span>
                                    <p className="text-xl text-slate-600 leading-relaxed italic relative z-10 px-8">
                                        {description.scene}
                                    </p>
                                    <span className="absolute -bottom-12 -right-4 text-6xl text-indigo-100 font-serif">”</span>
                                </div>
                            </div>

                            <div className="mt-16 pt-16 border-t border-slate-200/60 max-w-4xl mx-auto">
                                <div className="text-center mb-10">
                                    <h4 className="inline-block px-4 py-1.5 bg-slate-900 text-white rounded-full text-sm font-bold tracking-widest uppercase mb-4">Core Drivers</h4>
                                    <h2 className="text-2xl font-bold text-slate-900">思考の原点</h2>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {description.coreAxis.map((axis, i) => (
                                        <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-indigo-600 font-bold border border-indigo-100">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-700 font-medium pt-1 leading-relaxed">{axis}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Overview */}
                    <div className="max-w-4xl mx-auto prose prose-lg prose-slate text-justify md:text-center leading-loose text-slate-600">
                        <p>{description.overview}</p>
                    </div>

                    {/* Content Grids */}
                    <div className="space-y-16">
                        {/* Row 1: Strengths & Weaknesses */}
                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Strength */}
                            <div className="bg-emerald-50/30 rounded-[2rem] p-10 border border-emerald-100/60 relative overflow-hidden group hover:border-emerald-200 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-bl-[4rem] transition-transform group-hover:scale-110 duration-500" />
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center p-3">
                                        <img src="/assets/icons/icon_strength.png" alt="Strength Icon" className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">強み・価値</h3>
                                </div>
                                <ul className="space-y-4">
                                    {description.strengths.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-700">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-sm shadow-emerald-200" />
                                            <span className="text-lg font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Weakness */}
                            <div className="bg-rose-50/30 rounded-[2rem] p-10 border border-rose-100/60 relative overflow-hidden group hover:border-rose-200 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-bl-[4rem] transition-transform group-hover:scale-110 duration-500" />
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center p-3">
                                        <img src="/assets/icons/icon_weakness.png" alt="Weakness Icon" className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">つまずきポイント</h3>
                                </div>
                                <ul className="space-y-4">
                                    {description.weaknesses.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-700">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 shadow-sm shadow-rose-200" />
                                            <span className="text-lg font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Row 2: Motivation & Stress */}
                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="bg-amber-50/30 rounded-[2rem] p-10 border border-amber-100/60 relative overflow-hidden">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center p-3">
                                        <img src="/assets/icons/icon_motivation.png" alt="Motivation Icon" className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">モチベーション</h3>
                                </div>
                                <ul className="space-y-4">
                                    {description.motivation.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-700">
                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                            <span className="text-lg font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-100/50 rounded-[2rem] p-10 border border-slate-200/60 relative overflow-hidden">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center p-3">
                                        <img src="/assets/icons/icon_stress.png" alt="Stress Icon" className="w-full h-full object-contain" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">ストレス</h3>
                                </div>
                                <ul className="space-y-4">
                                    {description.stress.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-700">
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                            <span className="text-lg font-medium leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Relationships & Growth */}
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="bg-white rounded-[2rem] p-10 shadow-lg shadow-slate-100 border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">人間関係</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">{description.relationships}</p>
                        </div>
                        <div className="bg-white rounded-[2rem] p-10 shadow-lg shadow-slate-100 border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                            <h3 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">成長への一手</h3>
                            <ul className="space-y-3">
                                {description.growth.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <span className="text-indigo-500 font-bold mt-0.5">→</span>
                                        <span className="text-lg leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Memes */}
                    <div className="text-center py-8">
                        <p className="text-slate-400 text-sm font-bold tracking-widest uppercase mb-6">Common Phrasing</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {description.memes.map((meme, i) => (
                                <span key={i} className="px-6 py-3 bg-white rounded-full text-slate-600 font-bold shadow-sm border border-slate-200 hover:scale-105 transition-transform cursor-default">
                                    {meme}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Compatibility Sections */}
            <div className="space-y-16">
                <div className="text-center relative">
                    <img
                        src="/assets/illustration_chat.png"
                        alt="Campus Chat"
                        className="absolute -top-20 left-4 md:left-20 w-28 md:w-40 -rotate-6 opacity-90 drop-shadow-lg"
                    />
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">相性分析</h2>
                    <p className="text-slate-500">あなたと他のタイプとの化学反応</p>
                </div>

                <div className="grid xl:grid-cols-2 gap-12">
                    {/* Compatible */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold shadow-sm">✓</div>
                            <h3 className="text-2xl font-bold text-slate-900">最高の相性</h3>
                        </div>
                        <div className="grid gap-6">
                            {compatibility?.compatible?.map((item: any) => (
                                <div key={item.type} className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <CompatibilityCard
                                        variant="compatible"
                                        typeCode={item.type}
                                        level={item.level}
                                        points={item.points}
                                        tips={item.tips}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Incompatible */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 text-2xl font-bold shadow-sm">×</div>
                            <h3 className="text-2xl font-bold text-slate-900">要注意な相性</h3>
                        </div>
                        <div className="grid gap-6">
                            {compatibility?.incompatible?.map((item: any) => (
                                <div key={item.type} className="transform hover:scale-[1.02] transition-transform duration-300">
                                    <CompatibilityCard
                                        variant="incompatible"
                                        typeCode={item.type}
                                        level={item.level}
                                        points={item.points}
                                        tips={item.tips}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Area */}


            {/* Action Area for Reset */}
            <div className="pt-20 text-center pb-24">
                <button
                    onClick={onReset}
                    className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-slate-900 rounded-full hover:bg-slate-800 hover:shadow-2xl hover:shadow-indigo-500/20 active:scale-95"
                >
                    <span className="relative z-10 text-lg tracking-wide">もう一度診断する</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[length:200%_auto] animate-gradient" />
                </button>
            </div>

            {/* DEBUG PANEL */}
            <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs font-mono max-w-xs z-50">
                <div className="font-bold text-yellow-400 mb-2">DEBUG: Raw Scores</div>
                {Object.entries(scores).map(([axis, value]) => (
                    <div key={axis} className="flex justify-between">
                        <span>{axis}:</span>
                        <span className={value === 0 ? "text-red-400" : "text-green-400"}>{typeof value === 'number' ? value.toFixed(2) : 'undefined'}</span>
                    </div>
                ))}
                <div className="mt-2 pt-2 border-t border-white/30">
                    <span className="text-yellow-400">Type: </span>{typeCode}
                </div>
            </div>
        </div >
    );
}
