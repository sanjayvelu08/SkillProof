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
        className="bg-zinc-900 rounded-xl p-8 sm:p-10 text-white relative overflow-hidden card-shadow"
      >
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          {/* Score ring */}
          <div className="flex-shrink-0">
            <ScoreRing score={readinessScore} size="large" />
          </div>

          {/* Score details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-brand-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
              Skill Intelligence Report
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              {role.title} Readiness
            </h1>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-sm mx-auto sm:mx-0">
              <div>
                <div className="text-2xl font-mono font-bold text-emerald-400 mb-1">{demonstrated}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Proven</div>
              </div>
              <div className="w-px bg-white/10 mx-auto" />
              <div>
                <div className="text-2xl font-mono font-bold text-white mb-1">{totalSkills}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Required</div>
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
        {/* Skill Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 bg-white rounded-xl p-6 card-shadow card-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-900">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h2 className="text-base font-bold text-zinc-900">Skill Breakdown</h2>
          </div>
          <SkillBreakdown role={role} userSkills={userSkills} />
        </motion.div>

        {/* What If */}
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
        className="flex justify-center pb-8"
      >
        <button
          onClick={onGetChallenge}
          className="px-8 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-md cursor-pointer transition-colors"
        >
          Get My Challenge →
        </button>
      </motion.div>
    </div>
  );
}
