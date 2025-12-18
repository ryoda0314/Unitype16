"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuestionCard } from "@/components/QuestionCard";
import { ResultView } from "@/components/ResultView";
import { Header } from "@/components/Header";
import { TypeLibraryModal } from "@/components/TypeLibraryModal";
import { CompatibilityCheckerModal } from "@/components/CompatibilityCheckerModal";
import config from "@/data/config.json";
import { calculateScores } from "@/data/scoring";

const ITEMS_PER_STEP = 4;
const STORAGE_KEY = process.env.NEXT_PUBLIC_STORAGE_KEY || "unitype16_mvp_storage_v1";

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [randomizedItems, setRandomizedItems] = useState<typeof config.items>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal States
  const [isTypeLibraryOpen, setIsTypeLibraryOpen] = useState(false);
  const [isCompatibilityCheckOpen, setIsCompatibilityCheckOpen] = useState(false);

  const totalSteps = Math.ceil(config.items.length / ITEMS_PER_STEP);

  // Initialize: Load from LocalStorage or Shuffle
  useEffect(() => {
    const loadState = () => {
      console.log("[DEBUG] loadState() called");
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
          const parsed = JSON.parse(savedData);
          if (parsed && parsed.order && parsed.answers) {
            // Restore Order
            const orderedItems = parsed.order
              .map((id: string) => config.items.find((i) => i.id === id))
              .filter((i: any) => i !== undefined);

            if (orderedItems.length === config.items.length) {
              setRandomizedItems(orderedItems as typeof config.items);
              setAnswers(parsed.answers);
              setShowResult(parsed.showResult || false);
              setHasStarted(parsed.hasStarted || false); // Restore started state
              setCurrentStep(parsed.currentStep || 0);
              setIsLoaded(true);
              return;
            }
          }
        }
      } catch (e) {
        console.error("[DEBUG] Error loading:", e);
      }

      // Fallback: New Shuffle
      const shuffled = [...config.items].sort(() => Math.random() - 0.5);
      setRandomizedItems(shuffled);
      setIsLoaded(true);
    };

    loadState();
  }, []);

  // Save Effect
  useEffect(() => {
    if (!isLoaded || randomizedItems.length === 0) return;

    const stateToSave = {
      answers,
      showResult,
      hasStarted,
      currentStep,
      order: randomizedItems.map(i => i.id)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [answers, showResult, hasStarted, currentStep, randomizedItems, isLoaded]);


  const currentItems = randomizedItems.slice(
    currentStep * ITEMS_PER_STEP,
    (currentStep + 1) * ITEMS_PER_STEP
  );

  const handleAnswerChange = (id: string, val: number) => {
    // UI gives 1-7, scoring uses 0-6
    setAnswers((prev) => ({ ...prev, [id]: val - 1 }));

    // Auto-scroll to next question
    const currentIndex = currentItems.findIndex(q => q.id === id);
    if (currentIndex < currentItems.length - 1) {
      const nextId = currentItems[currentIndex + 1].id;
      setTimeout(() => {
        const nextEl = document.getElementById(`q-${nextId}`);
        if (nextEl) {
          const yOffset = -250;
          const y = nextEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 200);
    } else if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        const nextBtn = document.getElementById("qs-next-btn");
        if (nextBtn) {
          nextBtn.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    }
  };

  // Scroll to top on step change or when result is shown/hidden
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep, showResult, hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    window.scrollTo(0, 0);
  }

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    if (confirm("診断をやり直しますか？")) {
      localStorage.removeItem(STORAGE_KEY);
      // Full Reset
      setAnswers({});
      setShowResult(false);
      setHasStarted(false);
      setCurrentStep(0);
      const shuffled = [...config.items].sort(() => Math.random() - 0.5);
      setRandomizedItems(shuffled);
      window.scrollTo(0, 0);
    }
  };

  const handleGoHome = () => {
    if (showResult || hasStarted) {
      if (confirm("トップに戻りますか？現在の進捗は保存されますが、スタート画面に戻ります。")) {
        setShowResult(false);
        setHasStarted(false);
        window.scrollTo(0, 0);
      }
    } else {
      setIsTypeLibraryOpen(false);
      setIsCompatibilityCheckOpen(false);
      setHasStarted(false);
    }
  };

  const scores = calculateScores(answers);
  const isStepComplete = currentItems.length > 0 && currentItems.every((q) => answers[q.id] !== undefined);
  const isLastStep = currentStep === totalSteps - 1;

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-16 font-sans text-slate-700">
      <Header
        onOpenTypeLibrary={() => setIsTypeLibraryOpen(true)}
        onOpenCompatibility={() => setIsCompatibilityCheckOpen(true)}
        onGoHome={handleGoHome}
      />

      <TypeLibraryModal
        isOpen={isTypeLibraryOpen}
        onClose={() => setIsTypeLibraryOpen(false)}
      />

      <CompatibilityCheckerModal
        isOpen={isCompatibilityCheckOpen}
        onClose={() => setIsCompatibilityCheckOpen(false)}
      />

      <AnimatePresence mode="wait">
        {!hasStarted && !showResult ? (
          /* HERO / START SCREEN */
          <motion.main
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-indigo-50/50"
          >
            <div className="max-w-4xl w-full flex flex-col items-center">

              <div className="mb-8 relative w-full max-w-lg aspect-video">
                {/* Placeholder for Illustration - You need to add the image file */}
                <img
                  src="/assets/hero_illustration_v2.png"
                  alt="University Life"
                  className="w-full h-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/600x400/indigo/white?text=UniType16";
                  }}
                />
              </div>

              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 leading-tight">
                “性格”で選ぶ、<br />
                <span className="text-indigo-600">あなたの理想の大学</span>
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-2xl leading-relaxed">
                たった1分であなたの性格タイプを分析し、
                相性の良い大学ラベル（旧帝大、早慶、MARCHなど）を診断します。
                ありのままの自分で答えてください。
              </p>

              <button
                onClick={handleStart}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                診断スタート
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <div className="mt-8 flex gap-8 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  ⏱ 所要時間: 約1分
                </span>
                <span className="flex items-center gap-1">
                  🔒 登録不要・無料
                </span>
              </div>

            </div>
          </motion.main>
        ) : showResult ? (
          /* RESULT SCREEN */
          <main className="min-h-screen bg-slate-50" key="result">
            <ResultView scores={scores} onReset={handleReset} />
          </main>
        ) : (
          /* QUIZ SCREEN */
          <main className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" key="quiz">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">University Label Diagnosis</h1>
                <p className="mt-2 text-gray-500 text-sm font-medium">
                  {currentStep + 1} / {totalSteps} ステップ
                </p>

                {/* Progress Bar */}
                <div className="mt-6 max-w-md mx-auto h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(answers).length / config.items.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white"
                >
                  {currentItems.map((q, idx) => (
                    <motion.div
                      key={q.id}
                      id={`q-${q.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <QuestionCard
                        question={q.text}
                        value={answers[q.id] !== undefined ? answers[q.id] + 1 : null}
                        onChange={(val) => handleAnswerChange(q.id, val)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="py-12 flex items-center justify-between gap-4 border-t border-gray-100 pt-8 mt-8">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`px-8 py-3 rounded-full font-bold transition-all duration-200 ${currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "bg-white border-2 border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
                    }`}
                >
                  戻る
                </button>

                {!isLastStep ? (
                  <button
                    id="qs-next-btn"
                    disabled={!isStepComplete}
                    onClick={handleNext}
                    className={`px-10 py-3 rounded-full font-bold text-lg transition-all duration-200 ${isStepComplete
                      ? "bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                  >
                    次へ
                  </button>
                ) : (
                  <button
                    id="qs-next-btn"
                    disabled={!isStepComplete}
                    onClick={() => {
                      setShowResult(true);
                    }}
                    className={`px-10 py-3 rounded-full font-bold text-lg transition-all duration-200 ${isStepComplete
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                      }`}
                  >
                    診断結果を見る
                  </button>
                )}
              </div>
            </div>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
