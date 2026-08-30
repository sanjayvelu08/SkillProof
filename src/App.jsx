import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Screen1Input from "./screens/Screen1Input";
import Screen2Analysis from "./screens/Screen2Analysis";
import Screen3Challenge from "./screens/Screen3Challenge";
import AuthScreen from "./screens/AuthScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { useAuth } from "./contexts/AuthContext";
import { ROLES } from "./data/roles";
import { calculateReadiness } from "./utils/scoring";
import { loadProgress, saveProgress } from "./utils/storage";

function SkillProofApp() {
  const { user, signOut } = useAuth();
  const saved = loadProgress();

  const [screen, setScreen] = useState(saved.screen);
  const [selectedRoleId, setSelectedRoleId] = useState(saved.selectedRoleId);
  const [userSkills, setUserSkills] = useState(saved.userSkills);
  const [completedProjectSkills, setCompletedProjectSkills] = useState(saved.completedProjectSkills);
  const [completedProjectIds, setCompletedProjectIds] = useState(saved.completedProjectIds);
  const [projectProofs, setProjectProofs] = useState(saved.projectProofs || {});
  const [showDashboard, setShowDashboard] = useState(false);

  // Persist progress to localStorage on every state change
  useEffect(() => {
    saveProgress({ screen, selectedRoleId, userSkills, completedProjectSkills, completedProjectIds, projectProofs });
  }, [screen, selectedRoleId, userSkills, completedProjectSkills, completedProjectIds, projectProofs]);

  const role = selectedRoleId ? ROLES[selectedRoleId] : null;

  const readinessScore = useMemo(() => {
    if (!role) return 0;
    const skillsToUse = completedProjectSkills || userSkills;
    return calculateReadiness(role, skillsToUse);
  }, [role, userSkills, completedProjectSkills]);

  // Use completedProjectSkills for Screen 2/3 if project was completed
  const activeSkills = completedProjectSkills || userSkills;

  function handleToggleSkill(skillName) {
    setCompletedProjectSkills(null); // Reset if user changes skills
    setUserSkills((prev) => {
      const exists = prev.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );
      if (exists) {
        return prev.filter(
          (s) => s.name.toLowerCase() !== skillName.toLowerCase()
        );
      }
      return [...prev, { name: skillName, evidence: "claimed" }];
    });
  }

  function handleChangeEvidence(skillName, evidence) {
    setCompletedProjectSkills(null);
    setUserSkills((prev) =>
      prev.map((s) =>
        s.name.toLowerCase() === skillName.toLowerCase()
          ? { ...s, evidence }
          : s
      )
    );
  }

  function handleSelectRole(roleId) {
    setSelectedRoleId(roleId);
    setUserSkills([]);
    setCompletedProjectSkills(null);
    setCompletedProjectIds([]);
  }

  function handleCompleteProject(updatedSkills, upgradedSkills, projectId) {
    setCompletedProjectSkills(updatedSkills);
    if (projectId) {
      setCompletedProjectIds((prev) =>
        prev.includes(projectId) ? prev : [...prev, projectId]
      );
    }
  }

  function handleSaveProof(projectId, proof) {
    setProjectProofs((prev) => ({ ...prev, [projectId]: proof }));
  }

  function handleResetProgress() {
    setScreen(1);
    setSelectedRoleId(null);
    setUserSkills([]);
    setCompletedProjectSkills(null);
    setCompletedProjectIds([]);
    setProjectProofs({});
    setShowDashboard(false);
  }

  const pageVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleResetProgress()}
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80"
          >
            <span className="text-lg sm:text-xl">🛡️</span>
            <span className="font-extrabold text-base sm:text-lg text-slate-800">
              Skill<span className="text-brand-600">Proof</span>
            </span>
          </button>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowDashboard((v) => !v)}
              className={`text-[11px] sm:text-xs font-medium cursor-pointer px-2 py-1 rounded-lg transition-colors ${
                showDashboard
                  ? "text-brand-600 bg-brand-50"
                  : "text-slate-400 hover:text-brand-600 hover:bg-brand-50/50"
              }`}
            >
              📊 <span className="hidden xs:inline">Dashboard</span>
            </button>

            <span className="text-[11px] text-slate-400 hidden md:inline truncate max-w-[120px]">
              Hi, {user?.name || user?.email}
            </span>

            <div className="w-px h-4 bg-slate-200 hidden sm:block" />

            <button
              onClick={signOut}
              className="text-[11px] sm:text-xs text-slate-400 hover:text-rose-500 cursor-pointer font-medium"
            >
              Logout
            </button>

            <div className="w-px h-4 bg-slate-200" />

            {/* Step indicators */}
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    if (s < screen || (s === 1)) setScreen(s);
                  }}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] sm:text-xs font-bold cursor-pointer transition-all
                    ${
                      screen === s
                        ? "bg-brand-500 text-white shadow-md shadow-brand-200"
                        : s < screen
                          ? "bg-brand-100 text-brand-600 hover:bg-brand-200"
                          : "bg-slate-100 text-slate-400"
                    }
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Screens */}
      {showDashboard ? (
        <DashboardScreen
          user={user}
          selectedRoleId={selectedRoleId}
          userSkills={activeSkills}
          completedProjectIds={completedProjectIds}
          projectProofs={projectProofs}
          readinessScore={readinessScore}
          onBack={() => setShowDashboard(false)}
        />
      ) : (
      <AnimatePresence mode="wait">
        {screen === 1 && (
          <motion.div
            key="screen1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Screen1Input
              selectedRole={selectedRoleId}
              onSelectRole={handleSelectRole}
              userSkills={userSkills}
              onToggleSkill={handleToggleSkill}
              onChangeEvidence={handleChangeEvidence}
              onNext={() => setScreen(2)}
            />
          </motion.div>
        )}

        {screen === 2 && role && (
          <motion.div
            key="screen2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Screen2Analysis
              role={role}
              userSkills={activeSkills}
              readinessScore={readinessScore}
              onNext={() => setScreen(3)}
              onBack={() => setScreen(1)}
            />
          </motion.div>
        )}

        {screen === 3 && role && (
          <motion.div
            key="screen3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Screen3Challenge
              role={role}
              userSkills={activeSkills}
              readinessScore={readinessScore}
              onCompleteProject={handleCompleteProject}
              completedProjectIds={completedProjectIds}
              projectProofs={projectProofs}
              onSaveProof={handleSaveProof}
              onBack={() => setScreen(2)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      )}
    </div>
  );
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (!user.name) {
    return <OnboardingScreen />;
  }

  return <SkillProofApp />;
}
