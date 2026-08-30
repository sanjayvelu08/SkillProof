import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import ScoreRing from "../components/ScoreRing";
import SuccessOverlay from "../components/SuccessOverlay";
import { selectProject, calculateReadiness } from "../utils/scoring";

export default function Screen3Challenge({
  role,
  userSkills,
  readinessScore,
  onCompleteProject,
  completedProjectIds,
  projectProofs,
  onSaveProof,
  onBack,
}) {
  const project = selectProject(role, userSkills);

  const [isCompleted, setIsCompleted] = useState(
    () => !!(project && completedProjectIds?.includes(project.id))
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [newScore, setNewScore] = useState(readinessScore);

  // Restore newScore from completedProjectSkills if project was already done
  useEffect(() => {
    if (isCompleted) {
      const calculated = calculateReadiness(role, userSkills);
      setNewScore(calculated);
    }
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">No project available for this profile.</p>
      </div>
    );
  }

  function handleComplete() {
    // Simulate upgrading claimed/missing skills to demonstrated
    const upgradedSkills = [];

    const updatedSkills = userSkills.map((s) => {
      if (
        project.demonstrates.some(
          (ps) => ps.toLowerCase() === s.name.toLowerCase()
        ) &&
        s.evidence !== "demonstrated"
      ) {
        upgradedSkills.push(s.name);
        return { ...s, evidence: "demonstrated" };
      }
      return s;
    });

    // Also add any project skills that were missing entirely
    for (const ps of project.demonstrates) {
      const exists = updatedSkills.some(
        (us) => us.name.toLowerCase() === ps.toLowerCase()
      );
      if (!exists) {
        updatedSkills.push({ name: ps, evidence: "demonstrated" });
        upgradedSkills.push(ps);
      }
    }

    if (upgradedSkills.length === 0) {
      // Fallback: upgrade the first non-demonstrated skill
      for (let i = 0; i < updatedSkills.length; i++) {
        if (updatedSkills[i].evidence !== "demonstrated") {
          updatedSkills[i] = {
            ...updatedSkills[i],
            evidence: "demonstrated",
          };
          upgradedSkills.push(updatedSkills[i].name);
          break;
        }
      }
    }

    // Calculate new score
    const calculated = calculateReadiness(role, updatedSkills);

    setNewScore(calculated);
    setIsCompleted(true);
    setShowSuccess(true);
    onCompleteProject(updatedSkills, upgradedSkills, project.id);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center pt-10 pb-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4"
        >
          🚀 Step 3 of 3
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-800"
        >
          Prove Your <span className="text-brand-600">Skills</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 mt-2 max-w-md mx-auto"
        >
          Complete this personalized project to demonstrate your skills and
          boost your readiness score.
        </motion.p>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 pb-12 sm:pb-10 space-y-6">
        {/* Current score reminder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <ScoreRing
            score={isCompleted ? newScore : readinessScore}
            label={isCompleted ? "Updated Readiness" : "Current Readiness"}
          />
        </motion.div>

        {/* Project card */}
        <ProjectCard
          project={project}
          onComplete={handleComplete}
          isCompleted={isCompleted}
          proof={projectProofs?.[project.id] || null}
          onSaveProof={(proof) => onSaveProof(project.id, proof)}
        />

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between pt-2"
        >
          <button
            onClick={onBack}
            className="text-sm text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
          >
            ← Back to Analysis
          </button>
          {isCompleted && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onBack}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-200 cursor-pointer"
            >
              View Updated Score ←
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Success overlay */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay
            oldScore={readinessScore}
            newScore={newScore}
            upgradedSkills={
              project.demonstrates.filter(
                (s) =>
                  !userSkills.some(
                    (us) =>
                      us.name.toLowerCase() === s.toLowerCase() &&
                      us.evidence === "demonstrated"
                  )
              ).length > 0
                ? project.demonstrates.filter(
                    (s) =>
                      !userSkills.some(
                        (us) =>
                          us.name.toLowerCase() === s.toLowerCase() &&
                          us.evidence === "demonstrated"
                      )
                  )
                : [project.demonstrates[0]]
            }
            onDismiss={() => setShowSuccess(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
