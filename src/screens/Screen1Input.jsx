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
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
          {selectedRoleId ? "Identify your skills" : "What's your target career?"}
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto">
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
            className="flex items-center gap-4 bg-white rounded-xl p-4 sm:p-5 card-shadow card-border"
          >
            <div className="w-12 h-12 rounded-lg bg-zinc-100 flex items-center justify-center text-2xl flex-shrink-0">
              {selectedRole.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-zinc-900">{selectedRole.title}</h3>
              <p className="text-xs text-zinc-500 truncate">{selectedRole.description}</p>
            </div>
            <button
              onClick={() => onSelectRole(null)}
              className="text-xs font-medium text-zinc-500 hover:text-zinc-900 px-3 py-1.5 rounded-md hover:bg-zinc-100 transition-colors"
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
          className="bg-white rounded-xl p-5 sm:p-6 card-shadow card-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Skill Assessment</h2>
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                {userSkills.length}/{selectedRole.skills.length} SELECTED
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-zinc-100 rounded-full mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-brand-500 rounded-full"
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
          <div className="flex flex-wrap gap-4 mt-6 pt-5 border-t border-zinc-100">
            {[
              { color: "bg-zinc-300", label: "Claimed", desc: "Basic knowledge" },
              { color: "bg-amber-400", label: "Learning", desc: "Developing" },
              { color: "bg-emerald-500", label: "Demonstrated", desc: "Applied in project" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[11px] text-zinc-500 font-medium">{item.label}</span>
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
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className={`px-8 py-3 rounded-lg font-semibold text-sm transition-colors ${
              canAnalyze
                ? "bg-zinc-900 hover:bg-zinc-800 text-white shadow-md cursor-pointer"
                : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
            }`}
          >
            Analyze My Skills →
          </button>
        </motion.div>
      )}
    </div>
  );
}
