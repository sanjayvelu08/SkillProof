import { EVIDENCE_LEVELS } from "../data/evidenceLevels";
import { PROJECTS } from "../data/projects";

/**
 * Calculate readiness score for a user's skills against a role's requirements.
 * Returns a value between 0 and 100.
 */
export function calculateReadiness(role, userSkills) {
  if (!role || !role.skills || role.skills.length === 0) return 0;

  let totalContribution = 0;

  for (const requiredSkill of role.skills) {
    const userSkill = userSkills.find(
      (us) => us.name.toLowerCase() === requiredSkill.name.toLowerCase()
    );

    const evidenceLevel = userSkill
      ? EVIDENCE_LEVELS[userSkill.evidence]
      : EVIDENCE_LEVELS.missing;

    totalContribution += requiredSkill.weight * evidenceLevel.weight;
  }

  return Math.round(totalContribution * 100);
}

/**
 * Calculate potential readiness if the user upgrades a specific skill.
 */
export function calculatePotential(role, userSkills, skillName, newEvidence) {
  const simulated = userSkills.map((s) =>
    s.name.toLowerCase() === skillName.toLowerCase()
      ? { ...s, evidence: newEvidence }
      : s
  );

  // If skill wasn't in userSkills, add it
  const found = simulated.some(
    (s) => s.name.toLowerCase() === skillName.toLowerCase()
  );
  if (!found) {
    simulated.push({ name: skillName, evidence: newEvidence });
  }

  return calculateReadiness(role, simulated);
}

/**
 * Find the best project for the user based on their weakest skills.
 */
export function selectProject(role, userSkills) {
  const roleProjects = PROJECTS[role.id];
  if (!roleProjects || roleProjects.length === 0) return null;

  // Find skills that are claimed or missing (weakest)
  const weakSkills = userSkills
    .filter((s) => s.evidence === "claimed" || s.evidence === "missing")
    .map((s) => s.name);

  // Also include role-required skills the user hasn't listed at all
  for (const reqSkill of role.skills) {
    const exists = userSkills.some(
      (us) => us.name.toLowerCase() === reqSkill.name.toLowerCase()
    );
    if (!exists && !weakSkills.includes(reqSkill.name)) {
      weakSkills.push(reqSkill.name);
    }
  }

  let bestProject = roleProjects[0];
  let bestScore = -1;

  for (const project of roleProjects) {
    const overlap = project.demonstrates.filter((s) =>
      weakSkills.some(
        (ws) => ws.toLowerCase() === s.toLowerCase()
      )
    ).length;
    if (overlap > bestScore) {
      bestScore = overlap;
      bestProject = project;
    }
  }

  return bestProject;
}

/**
 * Generate an insight message based on the user's skill profile.
 */
export function generateInsight(role, userSkills, readinessScore) {
  const demonstrated = userSkills.filter(
    (s) => s.evidence === "demonstrated"
  );
  const missing = role.skills.filter(
    (rs) =>
      !userSkills.some(
        (us) => us.name.toLowerCase() === rs.name.toLowerCase()
      )
  );
  const claimed = userSkills.filter((s) => s.evidence === "claimed");

  if (readinessScore >= 80) {
    return `Excellent! You're well-prepared for ${role.title}. Your demonstrated skills give you a strong foundation — focus on filling the remaining gaps.`;
  }

  if (readinessScore >= 50) {
    const topMissing = missing
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 2)
      .map((s) => s.name);
    const claimCount = claimed.length;

    let message = `You have a solid foundation for ${role.title}.`;
    if (topMissing.length > 0) {
      message += ` ${topMissing.join(" and ")} ${topMissing.length === 1 ? "is" : "are"} the most important missing ${topMissing.length === 1 ? "skill" : "skills"} to develop.`;
    }
    if (claimCount > 0) {
      message += ` You also have ${claimCount} skill${claimCount > 1 ? "s" : ""} that you've claimed but not yet demonstrated — proving these would significantly boost your readiness.`;
    }
    return message;
  }

  // Below 50
  const topRequired = role.skills
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((s) => s.name);

  return `You're early in your ${role.title} journey, and that's okay! Focus on building ${topRequired.join(", ")} first — they carry the most weight for this role. Start with one skill and build a project to prove it.`;
}

/**
 * Get the top upgrade opportunity — the skill that would boost score the most.
 */
export function getTopUpgrade(role, userSkills, currentScore) {
  let bestSkill = null;
  let bestGain = 0;
  let bestNewEvidence = "demonstrated";

  for (const userSkill of userSkills) {
    if (userSkill.evidence === "demonstrated") continue;

    const newScore = calculatePotential(
      role,
      userSkills,
      userSkill.name,
      "demonstrated"
    );
    const gain = newScore - currentScore;

    if (gain > bestGain) {
      bestGain = gain;
      bestSkill = userSkill.name;
      bestNewEvidence = "demonstrated";
    }
  }

  // Also check missing skills
  for (const reqSkill of role.skills) {
    const exists = userSkills.some(
      (us) => us.name.toLowerCase() === reqSkill.name.toLowerCase()
    );
    if (!exists) {
      const simulated = [
        ...userSkills,
        { name: reqSkill.name, evidence: "demonstrated" },
      ];
      const newScore = calculateReadiness(role, simulated);
      const gain = newScore - currentScore;

      if (gain > bestGain) {
        bestGain = gain;
        bestSkill = reqSkill.name;
        bestNewEvidence = "demonstrated";
      }
    }
  }

  return bestSkill
    ? { skill: bestSkill, newEvidence: bestNewEvidence, gain: bestGain }
    : null;
}
