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
              relative rounded-md transition-all duration-200 border
              ${
                isSelected
                  ? "bg-zinc-900 border-zinc-900 text-white"
                  : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
              }
            `}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5">
              <button
                onClick={() => onToggleSkill(skill.name)}
                className="text-xs font-semibold cursor-pointer text-inherit"
              >
                {skill.name}
              </button>
              {isSelected && (
                <button
                  onClick={() => onToggleSkill(skill.name)}
                  className="ml-1 text-zinc-400 hover:text-white cursor-pointer transition-colors"
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
                  className="overflow-hidden bg-zinc-800 rounded-b-md"
                >
                  <div className="flex gap-0.5 px-1 pb-1 pt-1 border-t border-zinc-700">
                    {EVIDENCE_OPTIONS.map((opt) => {
                      const optLevel = EVIDENCE_LEVELS[opt];
                      const isActive = evidence === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => onChangeEvidence(skill.name, opt)}
                          className={`
                            flex-1 text-[10px] font-bold px-1.5 py-1 rounded transition-colors uppercase tracking-wider cursor-pointer
                            ${
                              isActive
                                ? "bg-brand-500 text-white"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-700"
                            }
                          `}
                        >
                          {optLevel.label}
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
