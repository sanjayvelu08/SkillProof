import { motion, AnimatePresence } from "framer-motion";
import { EVIDENCE_LEVELS, EVIDENCE_OPTIONS } from "../data/evidenceLevels";

export default function SkillSelector({ skills, userSkills, onToggleSkill, onChangeEvidence }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => {
        const userSkill = userSkills.find(
          (us) => us.name.toLowerCase() === skill.name.toLowerCase()
        );
        const isSelected = !!userSkill;
        const evidence = userSkill?.evidence || "claimed";
        const level = EVIDENCE_LEVELS[evidence];

        return (
          <motion.div
            key={skill.name}
            layout
            className={`
              relative rounded-xl transition-all duration-200
              ${
                isSelected
                  ? `${level.bg} shadow-sm`
                  : "bg-slate-50 hover:bg-slate-100/80 hover:shadow-sm"
              }
            `}
          >
            <div className="flex items-center gap-1.5 px-3 py-2">
              <button
                onClick={() => onToggleSkill(skill.name)}
                className={`
                  text-sm font-medium cursor-pointer
                  ${isSelected ? level.text : "text-slate-500 hover:text-slate-700"}
                `}
              >
                {isSelected && (
                  <span className="mr-1">{level.emoji}</span>
                )}
                {skill.name}
              </button>
              {isSelected && (
                <button
                  onClick={() => onToggleSkill(skill.name)}
                  className="ml-0.5 text-slate-300 hover:text-slate-500 cursor-pointer p-0.5 rounded-full hover:bg-white/60"
                  title="Remove skill"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-1 px-3 pb-2.5 pt-0.5">
                    {EVIDENCE_OPTIONS.map((opt) => {
                      const optLevel = EVIDENCE_LEVELS[opt];
                      return (
                        <button
                          key={opt}
                          onClick={() => onChangeEvidence(skill.name, opt)}
                          className={`
                            text-[11px] font-medium px-2 py-1 rounded-lg cursor-pointer transition-all
                            ${
                              evidence === opt
                                ? `${optLevel.bg} ${optLevel.text}`
                                : "text-slate-400 hover:text-slate-600 hover:bg-white/60"
                            }
                          `}
                        >
                          {optLevel.emoji} {optLevel.label}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
