import { motion } from "framer-motion";
import { ROLE_LIST } from "../data/roles";
import RoleCard from "../components/RoleCard";
import SkillSelector from "../components/SkillSelector";

export default function Screen1Input({
  selectedRoleId,
  onSelectRole,
  userSkills,
  onToggleSkill,
  onChangeEvidence,
  onAnalyze,
  canAnalyze,
}) {
  const selectedRole = ROLE_LIST.find((r) => r.id === selectedRoleId);

  return (
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
      {/* ─── Hero Header ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4 sm:pt-6"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-2">
          {selectedRoleId ? "Now, tell us your skills" : "What's your target career?"}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-md mx-auto">
          {selectedRoleId
            ? "Select the skills you have and rate your evidence level honestly."
            : "Choose the role you're working toward. We'll analyze what you need to get there."}
        </p>
      </motion.div>

      {/* ─── Role Selection ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {!selectedRoleId && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ROLE_LIST.map((role, i) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
              >
                <RoleCard
                  role={role}
                  isSelected={selectedRoleId === role.id}
                  onClick={() => onSelectRole(role.id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 bg-white rounded-2xl p-4 sm:p-5 shadow-sm"
          >
            <span className="text-2xl sm:text-3xl">{selectedRole.icon}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-slate-800">{selectedRole.title}</h3>
              <p className="text-xs text-slate-400 truncate">{selectedRole.description}</p>
            </div>
            <button
              onClick={() => onSelectRole(null)}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Change
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* ─── Skill Selection ───────────────────────────── */}
      {selectedRole && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-800">Select your skills</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {userSkills.length} of {selectedRole.skills.length} selected
              </p>
            </div>
            {userSkills.length > 0 && (
              <div className="text-xs font-medium text-brand-500 bg-brand-50 px-2.5 py-1 rounded-full">
                {Math.round((userSkills.length / selectedRole.skills.length) * 100)}% covered
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(userSkills.length / selectedRole.skills.length) * 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          <SkillSelector
            skills={selectedRole.skills}
            userSkills={userSkills}
            onToggleSkill={onToggleSkill}
            onChangeEvidence={onChangeEvidence}
          />

          {/* Evidence legend */}
          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-slate-100">
            {[
              { color: "bg-slate-300", label: "Claimed", desc: "I say I know this" },
              { color: "bg-amber-400", label: "Learning", desc: "Currently developing" },
              { color: "bg-emerald-500", label: "Demonstrated", desc: "Applied in a project" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[11px] text-slate-500 font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── CTA ───────────────────────────────────────── */}
      {selectedRole && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center pb-8"
        >
          <motion.button
            whileHover={canAnalyze ? { scale: 1.02 } : {}}
            whileTap={canAnalyze ? { scale: 0.98 } : {}}
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`px-8 py-3.5 rounded-xl font-semibold text-sm transition-all ${
              canAnalyze
                ? "bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-200/50 hover:shadow-xl hover:shadow-brand-300/50 cursor-pointer"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Analyze My Skills →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
