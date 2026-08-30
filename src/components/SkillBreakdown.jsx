import { motion } from "framer-motion";
import { EVIDENCE_LEVELS } from "../data/evidenceLevels";

export default function SkillBreakdown({ role, userSkills }) {
  // Build full skill list with evidence status
  const allSkills = role.skills.map((reqSkill) => {
    const userSkill = userSkills.find(
      (us) => us.name.toLowerCase() === reqSkill.name.toLowerCase()
    );
    return {
      ...reqSkill,
      evidence: userSkill ? userSkill.evidence : "missing",
      weight: reqSkill.weight,
    };
  });

  // Group by evidence tier
  const tiers = [
    { key: "demonstrated", skills: allSkills.filter((s) => s.evidence === "demonstrated") },
    { key: "learning", skills: allSkills.filter((s) => s.evidence === "learning") },
    { key: "claimed", skills: allSkills.filter((s) => s.evidence === "claimed") },
    { key: "missing", skills: allSkills.filter((s) => s.evidence === "missing") },
  ].filter((t) => t.skills.length > 0);

  return (
    <div className="space-y-3">
      {tiers.map((tier, tierIdx) => {
        const level = EVIDENCE_LEVELS[tier.key];
        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tierIdx * 0.1 }}
          >
            <div className={`text-xs font-bold uppercase tracking-wider ${level.text} mb-1.5`}>
              {level.emoji} {level.label} ({tier.skills.length})
            </div>
            <div className="space-y-1.5">
              {tier.skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg ${level.bg}/50 border ${level.border}/40`}
                >
                  <span className={`text-sm font-medium ${level.text}`}>
                    {skill.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: level.stroke || "#94a3b8" }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.weight * 100}%` }}
                        transition={{ delay: 0.3 + tierIdx * 0.1, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono w-8 text-right">
                      {Math.round(skill.weight * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
