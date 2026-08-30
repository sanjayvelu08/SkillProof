import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import SuccessOverlay from "../components/SuccessOverlay";

export default function Screen3Challenge({
  project: initialProject,
  activeSkills,
  readinessScore,
  onCompleteProject,
  completedProjectIds,
  proof,
  onSaveProof,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [oldScore, setOldScore] = useState(readinessScore);
  const [newScore, setNewScore] = useState(readinessScore);
  const [upgradedSkills, setUpgradedSkills] = useState([]);

  const project = initialProject;
  const isCompleted = project ? completedProjectIds[project.id] : false;

  function handleComplete(upgraded) {
    const prev = readinessScore;
    setOldScore(prev);

    const newScoreCalc = Math.min(100, prev + Math.round(upgraded.length * 8));
    setNewScore(newScoreCalc);
    setUpgradedSkills(upgraded.map((u) => u.name));
    setShowSuccess(true);
    onCompleteProject(upgraded);
  }

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-50 flex items-center justify-center">
          <span className="text-3xl">🎉</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">
          All challenges completed!
        </h2>
        <p className="text-sm text-slate-400 max-w-sm mx-auto">
          You've completed every available challenge for this career path. 
          Great work building your evidence portfolio!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* ─── Mission Header ────────────────────────────── */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-semibold mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Active Challenge
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-2">
            Prove Your Skills
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Complete this project and submit your proof to demonstrate your abilities.
          </p>
        </motion.div>
      )}

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-2"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-semibold mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Challenge Completed
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-2">
            Skill Proven!
          </h1>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            You've successfully demonstrated your skills through this project.
          </p>
        </motion.div>
      )}

      {/* ─── Project Card ──────────────────────────────── */}
      <ProjectCard
        project={project}
        onComplete={handleComplete}
        isCompleted={isCompleted}
        proof={proof}
        onSaveProof={onSaveProof}
      />

      {/* ─── Score Context ─────────────────────────────── */}
      {!isCompleted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-5 shadow-sm"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Current readiness</span>
            <span className="font-bold text-slate-700 tabular-nums">{readinessScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${readinessScore}%` }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
          <p className="text-[11px] text-slate-300 mt-2">
            Complete this challenge to improve your readiness score
          </p>
        </motion.div>
      )}

      {/* ─── Success Overlay ───────────────────────────── */}
      {showSuccess && (
        <SuccessOverlay
          oldScore={oldScore}
          newScore={newScore}
          upgradedSkills={upgradedSkills}
          onDismiss={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
