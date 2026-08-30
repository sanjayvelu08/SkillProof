import { motion } from "framer-motion";
import ScoreRing from "../components/ScoreRing";
import SkillBreakdown from "../components/SkillBreakdown";
import InsightCard from "../components/InsightCard";
import WhatIfCard from "../components/WhatIfCard";
import { generateInsight } from "../utils/scoring";

export default function Screen2Analysis({
  role,
  userSkills,
  readinessScore,
  onNext,
  onBack,
}) {
  const insight = generateInsight(role, userSkills, readinessScore);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-10 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4"
        >
          🔍 Step 2 of 3
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-800"
        >
          Your <span className="text-brand-600">SkillProof</span> Analysis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-2"
        >
          {role.icon} {role.title} Readiness
        </motion.p>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-12 sm:pb-10 space-y-6">
        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <ScoreRing score={readinessScore} label="Career Readiness" />
        </motion.div>

        {/* Insight */}
        <InsightCard insight={insight} />

        {/* Skill breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
        >
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            📋 Skill Breakdown
          </p>
          <SkillBreakdown role={role} userSkills={userSkills} />
        </motion.div>

        {/* What-if card */}
        <WhatIfCard
          role={role}
          userSkills={userSkills}
          currentScore={readinessScore}
        />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between pt-2"
        >
          <button
            onClick={onBack}
            className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            ← Back
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onNext}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-200 cursor-pointer hover:shadow-xl transition-shadow"
          >
            Get My Challenge →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
