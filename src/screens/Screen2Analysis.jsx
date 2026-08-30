import { motion } from "framer-motion";
import ScoreRing from "../components/ScoreRing";
import SkillBreakdown from "../components/SkillBreakdown";
import InsightCard from "../components/InsightCard";
import WhatIfCard from "../components/WhatIfCard";

export default function Screen2Analysis({
  role,
  userSkills,
  readinessScore,
  insight,
  onGetChallenge,
}) {
  const demonstrated = userSkills.filter((s) => s.evidence === "demonstrated").length;
  const totalSkills = role.skills.length;

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ─── Hero: Score Section ───────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 rounded-3xl p-6 sm:p-10 text-white"
      >
        {/* Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Score ring */}
          <div className="flex-shrink-0">
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
                <motion.circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 58}
                  initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                  animate={{
                    strokeDashoffset: 2 * Math.PI * 58 - (readinessScore / 100) * 2 * Math.PI * 58,
                  }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="text-4xl sm:text-5xl font-extrabold tabular-nums"
                >
                  {readinessScore}%
                </motion.span>
                <span className="text-xs text-white/60 font-medium mt-1 uppercase tracking-wide">
                  Ready
                </span>
              </div>
            </div>
          </div>

          {/* Score details */}
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-2">
              Career Readiness
            </p>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
              Your {role.title} Readiness
            </h1>

            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
              <div className="text-center">
                <div className="text-2xl font-bold">{demonstrated}</div>
                <div className="text-[11px] text-white/50 font-medium">Proven</div>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <div className="text-2xl font-bold">{totalSkills}</div>
                <div className="text-[11px] text-white/50 font-medium">Required</div>
              </div>
              <div className="w-px bg-white/15" />
              <div className="text-center">
                <div className="text-2xl font-bold">{totalSkills - demonstrated}</div>
                <div className="text-[11px] text-white/50 font-medium">To Prove</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Insight ──────────────────────────────────── */}
      {insight && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InsightCard insight={insight} />
        </motion.div>
      )}

      {/* ─── Two-Column Analysis ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Skill Breakdown — wider */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-white rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <h2 className="text-sm font-bold text-slate-800 mb-4">Skill Breakdown</h2>
          <SkillBreakdown role={role} userSkills={userSkills} />
        </motion.div>

        {/* What If — narrower */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <WhatIfCard role={role} userSkills={userSkills} currentScore={readinessScore} />
        </motion.div>
      </div>

      {/* ─── CTA ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGetChallenge}
          className="px-8 py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-lg shadow-brand-200/50 hover:shadow-xl hover:shadow-brand-300/50 cursor-pointer transition-all"
        >
          Get My Challenge →
        </motion.button>
      </motion.div>
    </div>
  );
}
