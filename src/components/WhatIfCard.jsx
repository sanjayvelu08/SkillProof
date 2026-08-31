import { useState } from "react";
import { motion } from "framer-motion";
import { EVIDENCE_LEVELS } from "../data/evidenceLevels";
import { calculatePotential, getTopUpgrade } from "../utils/scoring";

export default function WhatIfCard({ role, userSkills, currentScore }) {
  const [selectedSkill, setSelectedSkill] = useState(null);

  const upgradeable = userSkills.filter((s) => s.evidence !== "demonstrated");
  const topUpgrade = getTopUpgrade(role, userSkills, currentScore);

  const potentialScore = selectedSkill
    ? calculatePotential(role, userSkills, selectedSkill, "demonstrated")
    : topUpgrade
      ? calculatePotential(role, userSkills, topUpgrade.skill, "demonstrated")
      : currentScore;

  const gain = potentialScore - currentScore;
  const activeSkill = selectedSkill || topUpgrade?.skill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl p-6 h-full card-shadow card-border"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-zinc-900">Actionable Insight</h2>
      </div>

      {/* Score comparison */}
      <div className="flex items-center gap-3 sm:gap-4 mb-6">
        <div className="text-center flex-1">
          <div className="text-2xl font-mono font-bold text-zinc-300 tabular-nums">
            {currentScore}%
          </div>
          <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-1">Current</div>
        </div>
        <div className="flex-1 h-px bg-zinc-200 relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-600 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
            +{gain}%
          </div>
        </div>
        <div className="text-center flex-1">
          <motion.div
            key={potentialScore}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-3xl font-mono font-bold text-brand-600 tabular-nums"
          >
            {potentialScore}%
          </motion.div>
          <div className="text-[11px] text-brand-500 font-medium uppercase tracking-wider mt-1">Potential</div>
        </div>
      </div>

      {/* Skill buttons */}
      {upgradeable.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {upgradeable.map((skill) => {
            const level = EVIDENCE_LEVELS[skill.evidence];
            const isActive = activeSkill?.toLowerCase() === skill.name.toLowerCase();
            return (
              <button
                key={skill.name}
                onClick={() =>
                  setSelectedSkill(
                    selectedSkill?.toLowerCase() === skill.name.toLowerCase()
                      ? null
                      : skill.name
                  )
                }
                className={`
                  text-xs font-medium px-3 py-1.5 rounded border transition-colors
                  ${
                    isActive
                      ? "bg-brand-50 text-brand-700 border-brand-200"
                      : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                  }
                `}
              >
                {skill.name}
              </button>
            );
          })}
        </div>
      )}

      {/* Explanation */}
      {activeSkill && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-lg bg-zinc-50 border border-zinc-100"
        >
          <p className="text-sm text-zinc-600 font-medium leading-relaxed">
            Upgrade <strong className="text-zinc-900">{activeSkill}</strong> to Demonstrated → <strong className="text-brand-600 font-mono">+{gain}%</strong>
          </p>
        </motion.div>
      )}

      {upgradeable.length === 0 && (
        <div className="text-center py-4 border border-emerald-100 bg-emerald-50 rounded-lg">
          <p className="text-sm text-emerald-700 font-semibold">All skills demonstrated! 🎉</p>
        </div>
      )}
    </motion.div>
  );
}
