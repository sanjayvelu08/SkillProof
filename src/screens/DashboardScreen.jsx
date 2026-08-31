import { motion } from "framer-motion";
import { ROLE_LIST, ROLES } from "../data/roles";

export default function DashboardScreen({
  user,
  selectedRoleId,
  activeSkills,
  completedProjectIds,
  projectProofs,
  readinessScore,
}) {
  const role = ROLE_LIST.find((r) => r.id === selectedRoleId);
  const demonstratedSkills = (activeSkills || []).filter((s) => s.evidence === "demonstrated");
  const completedCount = Object.keys(completedProjectIds).length;
  const totalSkills = role?.skills.length || 0;

  const completedProjectsList = Object.entries(completedProjectIds)
    .filter(([, done]) => done)
    .map(([id]) => ({ id, proof: projectProofs[id] }));

  // Find project details
  const allProjects = ROLE_LIST.flatMap((r) => r.projects || []);
  // We'll use a simple lookup
  const projectNames = {
    "portfolio": "Portfolio Website",
    "event-dashboard": "Student Event Dashboard",
    "data-viz": "Data Visualization Dashboard",
    "dashboard-ui": "Analytics Dashboard UI",
    "responsive-site": "Responsive Landing Page",
    "wireframe": "Mobile App Wireframe",
    "ui-kit": "Design System Component Kit",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      {/* ─── Header ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
          Welcome back, <span className="text-brand-600">{user.name}</span>
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          {role
            ? `Working toward ${role.title} · ${completedCount} challenge${completedCount !== 1 ? "s" : ""} completed`
            : "Select a career path to start your skill journey"}
        </p>
      </motion.div>

      {/* ─── Stats Grid ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {[
          {
            label: "Career Path",
            value: role?.title || "—",
            icon: role?.icon || "🎯",
            color: "bg-white",
            textColor: "text-zinc-900",
            borderColor: "border-zinc-200",
          },
          {
            label: "Readiness",
            value: `${readinessScore}%`,
            icon: "📊",
            color: "bg-white",
            textColor: readinessScore >= 75 ? "text-emerald-600" : readinessScore >= 50 ? "text-amber-500" : "text-brand-600",
            borderColor: "border-zinc-200",
          },
          {
            label: "Proven Skills",
            value: `${demonstratedSkills.length}/${totalSkills}`,
            icon: "🟢",
            color: "bg-white",
            textColor: "text-zinc-900",
            borderColor: "border-zinc-200",
          },
          {
            label: "Challenges Done",
            value: completedCount,
            icon: "🏆",
            color: "bg-white",
            textColor: "text-zinc-900",
            borderColor: "border-zinc-200",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            className={`rounded-xl p-5 card-shadow border ${stat.borderColor} ${stat.color} transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                {stat.label}
              </span>
              <span className="text-lg opacity-80">{stat.icon}</span>
            </div>
            <div className={`text-2xl sm:text-3xl font-mono font-bold tabular-nums ${stat.textColor} truncate`}>
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ─── Skills Overview ───────────────────────────── */}
      {demonstratedSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 card-shadow card-border"
        >
          <h2 className="text-sm font-bold text-zinc-900 mb-4">Proven Skills</h2>
          <div className="flex flex-wrap gap-2">
            {demonstratedSkills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {skill.name}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* ─── Challenge History ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 card-shadow card-border"
      >
        <h2 className="text-sm font-bold text-zinc-900 mb-4">Challenge History</h2>

        {completedProjectsList.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-zinc-200 rounded-lg bg-zinc-50">
            <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
              <span className="text-xl">🌱</span>
            </div>
            <p className="text-sm font-semibold text-zinc-600 mb-1">No challenges completed yet</p>
            <p className="text-xs text-zinc-400">
              Complete your first challenge to see it here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {completedProjectsList.map((proj, i) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-white border border-zinc-100 shadow-sm hover:border-zinc-200 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-zinc-900 truncate">
                      {projectNames[proj.id] || proj.id}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded flex-shrink-0">
                      Completed
                    </span>
                  </div>
                  {proj.proof && (
                    <div className="flex flex-wrap items-center gap-4 mt-2">
                      {proj.proof.githubUrl && (
                        <a
                          href={proj.proof.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          Repository
                        </a>
                      )}
                      {proj.proof.demoUrl && (
                        <a
                          href={proj.proof.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
