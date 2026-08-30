import { motion } from "framer-motion";
import { ROLES } from "../data/roles";
import { PROJECTS } from "../data/projects";

function findProjectById(projectId) {
  for (const roleProjects of Object.values(PROJECTS)) {
    const found = roleProjects.find((p) => p.id === projectId);
    if (found) return found;
  }
  return null;
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`rounded-xl border p-3 sm:p-4 ${color} transition-shadow hover:shadow-md`}>
      <div className="text-xl sm:text-2xl mb-1">{icon}</div>
      <div className="text-lg sm:text-2xl font-extrabold text-slate-800 truncate">{value}</div>
      <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{label}</div>
    </div>
  );
}

export default function DashboardScreen({ user, selectedRoleId, userSkills, completedProjectIds, projectProofs, readinessScore, onBack }) {
  const role = selectedRoleId ? ROLES[selectedRoleId] : null;
  const activeSkills = userSkills || [];
  const demonstratedCount = activeSkills.filter(
    (s) => s.evidence === "demonstrated"
  ).length;
  const completedCount = completedProjectIds?.length || 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-10 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4"
        >
          📊 Dashboard
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-800"
        >
          Welcome back, <span className="text-brand-600">{user?.name || "there"}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-2"
        >
          Here's your SkillProof journey at a glance
        </motion.p>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-12 sm:pb-10 space-y-6">
        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <StatCard
            icon={role?.icon || "🎯"}
            label="Career Path"
            value={role?.title || "Not set"}
            color="bg-brand-50 border-brand-100"
          />
          <StatCard
            icon="📊"
            label="Readiness"
            value={`${readinessScore}%`}
            color="bg-emerald-50 border-emerald-100"
          />
          <StatCard
            icon="🟢"
            label="Demonstrated"
            value={demonstratedCount}
            color="bg-amber-50 border-amber-100"
          />
          <StatCard
            icon="🏆"
            label="Challenges Done"
            value={completedCount}
            color="bg-indigo-50 border-indigo-100"
          />
        </motion.div>

        {/* Challenge History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            🏆 Challenge History
          </h2>

          {completedCount === 0 ? (
            /* Empty state */
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-sm">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-lg font-bold text-slate-700 mb-2">
                No challenges completed yet
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-5">
                Complete your first SkillProof challenge to see your progress here. Prove your skills with real project work!
              </p>
              <button
                onClick={onBack}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-200 cursor-pointer hover:shadow-xl transition-shadow"
              >
                Start Your First Challenge →
              </button>
            </div>
          ) : (
            /* Challenge cards */
            <div className="space-y-3">
              {completedProjectIds.map((projectId) => {
                const project = findProjectById(projectId);
                const proof = projectProofs?.[projectId];
                if (!project) return null;

                return (
                  <motion.div
                    key={projectId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm"
                  >
                    {/* Card header */}
                    <div className="flex items-center justify-between px-5 py-3 bg-emerald-50 border-b border-emerald-100">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="text-sm font-bold text-emerald-700">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      {/* Project name */}
                      <h3 className="text-base font-bold text-slate-800">
                        {project.title}
                      </h3>

                      {/* Skills demonstrated */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.demonstrates.map((skill) => {
                          const userSkill = activeSkills.find(
                            (us) => us.name.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700"
                            >
                              🟢 {skill}
                            </span>
                          );
                        })}
                      </div>

                      {/* Proof links */}
                      {proof && (
                        <div className="flex flex-wrap items-center gap-3 text-sm pt-1">
                          <a
                            href={proof.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            Repository
                          </a>
                          {proof.demoUrl && (
                            <a
                              href={proof.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2"
                            >
                              🌐 Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center pt-2"
        >
          <button
            onClick={onBack}
            className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            ← Back to SkillProof
          </button>
        </motion.div>
      </div>
    </div>
  );
}
