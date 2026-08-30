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
      className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm h-full"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Potential Improvement
        </p>
      </div>

      {/* Score comparison */}
      <div className="flex items-center gap-3 sm:gap-4 mb-5">
        <div className="text-center flex-1">
          <div className="text-2xl font-extrabold text-slate-400 tabular-nums">
            {currentScore}%
          </div>
          <div className="text-[11px] text-slate-400 font-medium">Current</div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-brand-200 to-emerald-200 relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[11px] text-brand-600 font-bold bg-white px-2 py-0.5 rounded-full shadow-sm border border-brand-100">
            +{gain}%
          </div>
        </div>
        <div className="text-center flex-1">
          <motion.div
            key={potentialScore}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            className="text-2xl font-extrabold text-emerald-600 tabular-nums"
          >
            {potentialScore}%
          </motion.div>
          <div className="text-[11px] text-emerald-500 font-medium">If proved</div>
        </div>
      </div>

      {/* Skill buttons */}
      {upgradeable.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
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
                  text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-all
                  ${
                    isActive
                      ? "bg-brand-50 text-brand-600 ring-1 ring-brand-200 shadow-sm"
                      : `${level.bg} ${level.text} hover:ring-1 hover:ring-slate-200`
                  }
                `}
              >
                {level.emoji} {skill.name}
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
          className="p-3 rounded-xl bg-slate-50/80"
        >
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Upgrade <strong className="text-slate-700">{activeSkill}</strong> from{" "}
            <span className={EVIDENCE_LEVELS[userSkills.find((s) => s.name.toLowerCase() === activeSkill.toLowerCase())?.evidence || "claimed"].text}>
              {EVIDENCE_LEVELS[userSkills.find((s) => s.name.toLowerCase() === activeSkill.toLowerCase())?.evidence || "claimed"].label}
            </span>{" "}
            to Demonstrated → <strong className="text-emerald-600">+{gain}%</strong>
          </p>
        </motion.div>
      )}

      {upgradeable.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-emerald-600 font-medium">All skills demonstrated! 🎉</p>
        </div>
      )}
    </motion.div>
  );
}
