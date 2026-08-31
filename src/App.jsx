import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { loadProgress, saveProgress } from "./utils/storage";
import { calculateReadiness, selectProject, generateInsight } from "./utils/scoring";
import { ROLE_LIST } from "./data/roles";

import { useAuth } from "./contexts/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import Screen1Input from "./screens/Screen1Input";
import Screen2Analysis from "./screens/Screen2Analysis";
import Screen3Challenge from "./screens/Screen3Challenge";
import DashboardScreen from "./screens/DashboardScreen";

const screenLabels = ["Select", "Analyze", "Prove"];

function StepProgress({ current, labels }) {
  return (
    <div className="flex items-center gap-1.5">
      {labels.map((label, i) => {
        const isActive = i + 1 === current;
        const isDone = i + 1 < current;
        return (
          <div key={i} className="flex items-center gap-1.5">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
              isActive
                ? "bg-zinc-900 text-white"
                : isDone
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-transparent text-zinc-400 border border-zinc-200"
            }`}>
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                isActive ? "bg-white/20" : isDone ? "bg-zinc-200" : "bg-transparent"
              }`}>
                {isDone ? "✓" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </div>
            {i < labels.length - 1 && (
              <div className={`w-4 sm:w-6 h-px transition-colors ${
                isDone ? "bg-zinc-300" : "bg-zinc-200"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const { user, signOut } = useAuth();

  const saved = loadProgress();
  const [screen, setScreen] = useState(saved.screen || 1);
  const [selectedRoleId, setSelectedRoleId] = useState(saved.selectedRoleId || null);
  const [userSkills, setUserSkills] = useState(saved.userSkills || []);
  const [completedProjectSkills, setCompletedProjectSkills] = useState(saved.completedProjectSkills || []);
  const [completedProjectIds, setCompletedProjectIds] = useState(saved.completedProjectIds || {});
  const [projectProofs, setProjectProofs] = useState(saved.projectProofs || {});
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    saveProgress({ screen, selectedRoleId, userSkills, completedProjectSkills, completedProjectIds, projectProofs });
  }, [screen, selectedRoleId, userSkills, completedProjectSkills, completedProjectIds, projectProofs]);

  if (!user) return <AuthScreen />;
  if (!user.name) return <OnboardingScreen />;

  const selectedRole = ROLE_LIST.find((r) => r.id === selectedRoleId) || null;
  const activeSkills = [...userSkills, ...(completedProjectSkills || []).filter(
    (cs) => !userSkills.some((us) => us.name.toLowerCase() === cs.name.toLowerCase())
  )];
  const readinessScore = selectedRole ? calculateReadiness(selectedRole, activeSkills) : 0;
  const project = selectedRole ? selectProject(selectedRole, activeSkills, completedProjectIds) : null;

  function handleSelectRole(roleId) {
    setSelectedRoleId(roleId);
    setUserSkills([]);
    setCompletedProjectSkills([]);
    setCompletedProjectIds({});
    setProjectProofs({});
    setScreen(1);
    setShowDashboard(false);
  }

  function handleToggleSkill(skillName) {
    setUserSkills((prev) => {
      const exists = prev.find((s) => s.name.toLowerCase() === skillName.toLowerCase());
      return exists
        ? prev.filter((s) => s.name.toLowerCase() !== skillName.toLowerCase())
        : [...prev, { name: skillName, evidence: "claimed" }];
    });
  }

  function handleChangeEvidence(skillName, evidence) {
    setUserSkills((prev) =>
      prev.map((s) => (s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, evidence } : s))
    );
  }

  function handleAnalyze() {
    setScreen(2);
  }

  function handleGetChallenge() {
    setScreen(3);
  }

  function handleCompleteProject(upgradedSkills) {
    setCompletedProjectSkills((prev) => {
      const merged = [...prev];
      upgradedSkills.forEach((us) => {
        const idx = merged.findIndex((m) => m.name.toLowerCase() === us.name.toLowerCase());
        if (idx >= 0) merged[idx] = { ...merged[idx], ...us };
        else merged.push(us);
      });
      return merged;
    });
    if (project) {
      setCompletedProjectIds((prev) => ({ ...prev, [project.id]: true }));
    }
  }

  function handleSaveProof(proof) {
    if (project) {
      setProjectProofs((prev) => ({ ...prev, [project.id]: proof }));
    }
  }

  function handleResetProgress() {
    setSelectedRoleId(null);
    setUserSkills([]);
    setCompletedProjectSkills([]);
    setCompletedProjectIds({});
    setProjectProofs({});
    setScreen(1);
    setShowDashboard(false);
  }

  const insight = selectedRole ? generateInsight(selectedRole, activeSkills, readinessScore) : "";

  return (
    <div className="min-h-screen bg-mesh">
      {/* ─── Top Navigation ───────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left: Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleResetProgress}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-zinc-900 tracking-tight hidden sm:block">
                  Skill<span className="text-brand-600">Proof</span>
                </span>
              </button>

              {selectedRoleId && (
                <div className="hidden md:block">
                  <StepProgress current={screen} labels={screenLabels} />
                </div>
              )}
            </div>

            {/* Right: User + Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setShowDashboard((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                  showDashboard
                    ? "bg-zinc-100 text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                <span className="hidden sm:inline">Dashboard</span>
              </button>

              <div className="w-px h-4 bg-zinc-200 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-[11px] font-bold text-zinc-700 border border-zinc-200">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="text-sm font-medium text-zinc-600 hidden sm:block">{user.name}</span>
              </div>

              <button
                onClick={signOut}
                className="text-xs font-medium text-zinc-400 hover:text-zinc-800 px-2 py-1 rounded-md hover:bg-zinc-50 cursor-pointer transition-colors"
              >
                Log out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile step progress */}
        {selectedRoleId && (
          <div className="md:hidden border-t border-zinc-100 px-4 py-2 bg-white/60">
            <StepProgress current={screen} labels={screenLabels} />
          </div>
        )}
      </nav>

      {/* ─── Main Content ─────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {showDashboard ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <DashboardScreen
                user={user}
                selectedRoleId={selectedRoleId}
                activeSkills={activeSkills}
                completedProjectIds={completedProjectIds}
                projectProofs={projectProofs}
                readinessScore={readinessScore}
              />
            </motion.div>
          ) : screen === 1 ? (
            <motion.div
              key="screen1"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen1Input
                selectedRoleId={selectedRoleId}
                onSelectRole={handleSelectRole}
                userSkills={userSkills}
                onToggleSkill={handleToggleSkill}
                onChangeEvidence={handleChangeEvidence}
                onAnalyze={handleAnalyze}
                canAnalyze={selectedRoleId && userSkills.length > 0}
              />
            </motion.div>
          ) : screen === 2 ? (
            <motion.div
              key="screen2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen2Analysis
                role={selectedRole}
                userSkills={activeSkills}
                readinessScore={readinessScore}
                insight={insight}
                onGetChallenge={handleGetChallenge}
              />
            </motion.div>
          ) : screen === 3 ? (
            <motion.div
              key="screen3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Screen3Challenge
                project={project}
                activeSkills={activeSkills}
                readinessScore={readinessScore}
                onCompleteProject={handleCompleteProject}
                completedProjectIds={completedProjectIds}
                proof={projectProofs[project?.id]}
                onSaveProof={(proof) => handleSaveProof(proof)}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}
