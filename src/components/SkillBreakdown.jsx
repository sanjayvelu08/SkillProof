import { motion } from "framer-motion";
import { EVIDENCE_LEVELS } from "../data/evidenceLevels";

const TIER_STYLES = {
  demonstrated: {
    dot: "bg-emerald-500",
    bar: "#10b981",
    label: "text-emerald-700",
    count: "bg-emerald-100 text-emerald-700",
    rowHover: "hover:bg-emerald-50/50",
    rowBorder: "border-b border-emerald-100/60",
  },
  learning: {
    dot: "bg-amber-400",
    bar: "#f59e0b",
    label: "text-amber-700",
    count: "bg-amber-100 text-amber-700",
    rowHover: "hover:bg-amber-50/50",
    rowBorder: "border-b border-amber-100/60",
  },
  claimed: {
    dot: "bg-slate-300",
    bar: "#94a3b8",
    label: "text-slate-500",
    count: "bg-slate-100 text-slate-500",
    rowHover: "hover:bg-slate-50",
    rowBorder: "border-b border-slate-100",
  },
  missing: {
    dot: "bg-rose-400",
    bar: "#f87171",
    label: "text-rose-600",
    count: "bg-rose-50 text-rose-600",
    rowHover: "hover:bg-rose-50/40",
    rowBorder: "border-b border-rose-100/50",
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
    <div className="divide-y divide-slate-100">
      {tiers.map((tier, tierIdx) => {
        const style = TIER_STYLES[tier.key];
        const level = EVIDENCE_LEVELS[tier.key];

        return (
          <motion.div
            key={tier.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tierIdx * 0.08, duration: 0.3 }}
            className={tierIdx === 0 ? "pt-0" : "pt-4"}
          >
            {/* Category header */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className={`w-2 h-2 rounded-full ${style.dot}`} />
              <span className={`text-xs font-semibold uppercase tracking-wide ${style.label}`}>
                {level.label}
              </span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${style.count}`}>
                {tier.skills.length}
              </span>
            </div>

            {/* Skill rows */}
            <div>
              {tier.skills.map((skill, skillIdx) => (
                <div
                  key={skill.name}
                  className={`
                    flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors
                    ${style.rowHover}
                    ${skillIdx < tier.skills.length - 1 ? style.rowBorder : ""}
                  `}
                >
                  {/* Skill name */}
                  <span className="text-sm font-medium text-slate-700 flex-1 min-w-0 truncate">
                    {skill.name}
                  </span>

                  {/* Weight bar + percentage */}
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <div className="w-16 sm:w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: style.bar }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.weight * 100}%` }}
                        transition={{ delay: 0.2 + tierIdx * 0.08 + skillIdx * 0.04, duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-400 w-7 text-right tabular-nums">
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
