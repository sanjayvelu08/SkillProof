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
      ? calculatePotential(
          role,
          userSkills,
          topUpgrade.skill,
          "demonstrated"
        )
      : currentScore;

  const gain = potentialScore - currentScore;
  const activeSkill = selectedSkill || topUpgrade?.skill;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
    >
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
        ⚡ Potential Improvement
      </p>

      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-extrabold text-slate-600">
            {currentScore}%
          </div>
          <div className="text-[11px] text-slate-400">Current</div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-slate-200 via-brand-300 to-emerald-300 relative">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-brand-500 font-bold bg-white px-2 rounded-full border border-brand-100">
            +{gain}%
          </div>
        </div>
        <div className="text-center">
          <motion.div
            key={potentialScore}
            initial={{ scale: 1.3, color: "#10b981" }}
            animate={{ scale: 1, color: "#10b981" }}
            className="text-2xl font-extrabold"
          >
            {potentialScore}%
          </motion.div>
          <div className="text-[11px] text-slate-400">If proved</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                text-xs font-medium px-3 py-1.5 rounded-lg border cursor-pointer transition-all
                ${
                  isActive
                    ? "border-brand-400 bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                    : `${level.border} ${level.bg} ${level.text} hover:ring-1 hover:${level.ring}`
                }
              `}
            >
              {level.emoji} {skill.name}
            </button>
          );
        })}
      </div>

      {activeSkill && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 text-xs text-slate-500"
        >
          Upgrade <strong>{activeSkill}</strong> from{" "}
          <span className={EVIDENCE_LEVELS[userSkills.find((s) => s.name.toLowerCase() === activeSkill.toLowerCase())?.evidence || "claimed"].text}>
            {EVIDENCE_LEVELS[userSkills.find((s) => s.name.toLowerCase() === activeSkill.toLowerCase())?.evidence || "claimed"].label}
          </span>{" "}
          to 🟢 Demonstrated → <strong className="text-emerald-600">+{gain}%</strong>
        </motion.p>
      )}
    </motion.div>
  );
}
