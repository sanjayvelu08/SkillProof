import { motion } from "framer-motion";
import RoleCard from "../components/RoleCard";
import SkillSelector from "../components/SkillSelector";
import { ROLE_LIST } from "../data/roles";

export default function Screen1Input({
  selectedRole,
  onSelectRole,
  userSkills,
  onToggleSkill,
  onChangeEvidence,
  onNext,
}) {
  const selectedRoleData = ROLE_LIST.find((r) => r.id === selectedRole);
  const hasSkills = userSkills.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-10 pb-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4"
        >
          🌱 Step 1 of 3
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-800"
        >
          Tell Us About <span className="text-brand-600">Yourself</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-2 max-w-md mx-auto"
        >
          Pick your target role, then tell us what skills you have — and how
          strong they are.
        </motion.p>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-12 sm:pb-10 space-y-8">
        {/* Role selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
            🎯 Choose your target career
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ROLE_LIST.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                isSelected={selectedRole === role.id}
                onClick={() => onSelectRole(role.id)}
              />
            ))}
          </div>
        </motion.section>

        {/* Skill selection */}
        {selectedRoleData && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
              🛠️ Select your skills & evidence level
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Click a skill to add it, then choose your evidence level.
              Required skills for{" "}
              <strong>{selectedRoleData.title}</strong> are shown below.
            </p>

            <SkillSelector
              skills={selectedRoleData.skills}
              userSkills={userSkills}
              onToggleSkill={onToggleSkill}
              onChangeEvidence={onChangeEvidence}
            />

            {hasSkills && (
              <p className="mt-3 text-xs text-slate-400">
                {userSkills.length} of {selectedRoleData.skills.length} skills
                selected
              </p>
            )}
          </motion.section>
        )}

        {/* CTA */}
        {selectedRole && hasSkills && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onNext}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-200 cursor-pointer hover:shadow-xl transition-shadow"
            >
              Analyze My Skills →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
