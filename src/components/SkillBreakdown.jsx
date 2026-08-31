import { motion } from "framer-motion";
import { EVIDENCE_LEVELS } from "../data/evidenceLevels";

const TIER_STYLES = {
  demonstrated: {
    dot: "bg-emerald-500",
    bar: "#10b981",
    label: "text-emerald-700",
    count: "bg-emerald-100 text-emerald-800",
    rowHover: "hover:bg-zinc-50",
    rowBorder: "border-b border-zinc-100",
  },
  learning: {
    dot: "bg-amber-400",
    bar: "#f59e0b",
    label: "text-amber-700",
    count: "bg-amber-100 text-amber-800",
    rowHover: "hover:bg-zinc-50",
    rowBorder: "border-b border-zinc-100",
  },
  claimed: {
    dot: "bg-zinc-300",
    bar: "#a1a1aa",
    label: "text-zinc-600",
    count: "bg-zinc-100 text-zinc-700",
    rowHover: "hover:bg-zinc-50",
    rowBorder: "border-b border-zinc-100",
  },
  missing: {
    dot: "bg-rose-400",
    bar: "#f43f5e",
    label: "text-rose-600",
    count: "bg-rose-50 text-rose-700",
    rowHover: "hover:bg-zinc-50",
    rowBorder: "border-b border-zinc-100",
  },
};

export default function SkillBreakdown({ role, userSkills }) {
  const allSkills = role.skills.map((reqSkill) => {
    const userSkill = userSkills.find(
      (us) => us.name.toLowerCase() === reqSkill.name.toLowerCase()
    );
    return {
      ...reqSkill,
      evidence: userSkill ? userSkill.evidence : "missing",
    };
  });

  const tiers = [
    { key: "demonstrated", skills: allSkills.filter((s) => s.evidence === "demonstrated") },
    { key: "learning", skills: allSkills.filter((s) => s.evidence === "learning") },
    { key: "claimed", skills: allSkills.filter((s) => s.evidence === "claimed") },
    { key: "missing", skills: allSkills.filter((s) => s.evidence === "missing") },
  ].filter((t) => t.skills.length > 0);

  return (
    <div className="divide-y divide-zinc-100">
      {tiers.map((tier, tierIdx) => {
        const style = TIER_STYLES[tier.key];
        const level = EVIDENCE_LEVELS[tier.key];

        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tierIdx * 0.08, duration: 0.3 }}
            className={tierIdx === 0 ? "pt-0 pb-2" : "py-4"}
          >
            {/* Category header */}
            <div className="flex items-center gap-2 mb-3 px-1">
              <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
              <span className={`text-[11px] font-bold uppercase tracking-wider ${style.label}`}>
                {level.label}
              </span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${style.count}`}>
                {tier.skills.length}
              </span>
            </div>

            {/* Skill rows */}
            <div className="space-y-1">
              {tier.skills.map((skill, skillIdx) => (
                <div
                  key={skill.name}
                  className={`
                    flex items-center gap-3 px-2 py-2 rounded-md transition-colors
                    ${style.rowHover}
                  `}
                >
                  {/* Skill name */}
                  <span className="text-sm font-medium text-zinc-800 flex-1 min-w-0 truncate">
                    {skill.name}
                  </span>

                  {/* Weight bar + percentage */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="w-16 sm:w-24 h-1 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: style.bar }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.weight * 100}%` }}
                        transition={{ delay: 0.2 + tierIdx * 0.08 + skillIdx * 0.04, duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[11px] font-mono font-medium text-zinc-400 w-8 text-right tabular-nums">
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
