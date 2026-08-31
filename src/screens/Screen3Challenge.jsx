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
      <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-xl card-border card-shadow mt-10">
        <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-zinc-900 flex items-center justify-center text-white">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">
          All challenges completed!
        </h2>
        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 text-zinc-900 text-[11px] font-bold uppercase tracking-wider mb-4 border border-zinc-200">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Active Challenge
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
            Project Brief
          </h1>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold uppercase tracking-wider mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Challenge Completed
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-2">
            Skill Proven!
          </h1>
          <p className="text-sm text-zinc-500 max-w-md mx-auto">
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
          className="bg-white rounded-xl p-5 card-border card-shadow flex items-center justify-between"
        >
          <div className="flex-1 pr-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-semibold text-zinc-900">Current readiness</span>
              <span className="font-mono font-bold text-zinc-500 tabular-nums">{readinessScore}%</span>
            </div>
            <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-zinc-900 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${readinessScore}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            <p className="text-[11px] font-medium text-zinc-400 mt-2">
              Complete this challenge to improve your score.
            </p>
          </div>
          
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
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
