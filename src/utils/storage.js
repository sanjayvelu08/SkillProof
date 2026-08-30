const STORAGE_KEY = "skillproof_progress";

/**
 * Shape of persisted state:
 * {
 *   screen: number,
 *   selectedRoleId: string | null,
 *   userSkills: Array<{ name: string, evidence: string }>,
 *   completedProjectSkills: Array<{ name: string, evidence: string }> | null,
 *   completedProjectIds: string[],
 * }
 */

const DEFAULT_STATE = {
  screen: 1,
  selectedRoleId: null,
  userSkills: [],
  completedProjectSkills: null,
  completedProjectIds: [],
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveProgress(state) {
  try {
    const payload = {
      screen: state.screen,
      selectedRoleId: state.selectedRoleId,
      userSkills: state.userSkills,
      completedProjectSkills: state.completedProjectSkills,
      completedProjectIds: state.completedProjectIds,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently fail
  }
}
