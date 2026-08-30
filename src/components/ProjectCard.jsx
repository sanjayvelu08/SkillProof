import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function isValidUrl(str) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isGitHubUrl(str) {
  try {
    const url = new URL(str);
    return (
      (url.hostname === "github.com" || url.hostname === "www.github.com") &&
      url.pathname.split("/").filter(Boolean).length >= 2
    );
  } catch {
    return false;
  }
}

export default function ProjectCard({
  project,
  onComplete,
  isCompleted,
  proof,
  onSaveProof,
}) {
  const [githubUrl, setGithubUrl] = useState(proof?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(proof?.demoUrl || "");
  const [githubError, setGithubError] = useState("");
  const [demoError, setDemoError] = useState("");
  const [proofSaved, setProofSaved] = useState(!!proof);

  function validateAndSave() {
    let valid = true;

    // Validate GitHub URL (required)
    if (!githubUrl.trim()) {
      setGithubError("GitHub repository URL is required.");
      valid = false;
    } else if (!isValidUrl(githubUrl.trim())) {
      setGithubError("Please enter a valid URL (e.g. https://github.com/user/repo).");
      valid = false;
    } else if (!isGitHubUrl(githubUrl.trim())) {
      setGithubError("Please enter a GitHub repository URL (e.g. https://github.com/user/repo).");
      valid = false;
    } else {
      setGithubError("");
    }

    // Validate demo URL (optional)
    if (demoUrl.trim() && !isValidUrl(demoUrl.trim())) {
      setDemoError("Please enter a valid URL (e.g. https://myapp.vercel.app).");
      valid = false;
    } else {
      setDemoError("");
    }

    if (!valid) return;

    onSaveProof({
      githubUrl: githubUrl.trim(),
      demoUrl: demoUrl.trim() || null,
    });
    setProofSaved(true);
  }

  function handleGithubChange(val) {
    setGithubUrl(val);
    if (githubError) setGithubError("");
  }

  function handleDemoChange(val) {
    setDemoUrl(val);
    if (demoError) setDemoError("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 to-indigo-500 px-6 py-5">
        <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
          🛠️ Your SkillProof Challenge
        </p>
        <h2 className="text-xl font-bold text-white">{project.title}</h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {project.description}
        </p>

        {/* Skills demonstrated */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Skills you'll demonstrate
          </p>
          <div className="flex flex-wrap gap-2">
            {project.demonstrates.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100"
              >
                ✨ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Deliverables
          </p>
          <div className="space-y-2">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-slate-200 mt-0.5" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-2.5">
          <span>⏱️</span>
          <span>
            Estimated time: <strong>{project.estimatedTime}</strong>
          </span>
        </div>

        {/* ── Completed state ── */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center py-4 rounded-xl bg-emerald-50 border-2 border-emerald-200">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-lg font-bold text-emerald-700">
                Skill Proven!
              </p>
              <p className="text-sm text-emerald-600 mt-1">
                Your skills have been upgraded to <strong>Demonstrated</strong>
              </p>
            </div>

            {/* Proof links display */}
            {proof && (
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  📎 Project Proof Submitted
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 w-20 flex-shrink-0">
                      Repository:
                    </span>
                    <a
                      href={proof.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2 truncate"
                    >
                      {proof.githubUrl}
                    </a>
                  </div>
                  {proof.demoUrl && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500 w-20 flex-shrink-0">
                        Live Demo:
                      </span>
                      <a
                        href={proof.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2 truncate"
                      >
                        {proof.demoUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {/* ── Proof submission section ── */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5 space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                📎 Submit Project Proof
              </p>

              {/* GitHub URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  GitHub Repository URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => handleGithubChange(e.target.value)}
                  placeholder="https://github.com/yourname/project-name"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition ${
                    githubError
                      ? "border-rose-300 bg-rose-50/50"
                      : "border-slate-200 bg-white"
                  }`}
                />
                <AnimatePresence>
                  {githubError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-600 mt-1.5"
                    >
                      {githubError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Demo URL */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  Live Demo URL <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => handleDemoChange(e.target.value)}
                  placeholder="https://my-project.vercel.app"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition ${
                    demoError
                      ? "border-rose-300 bg-rose-50/50"
                      : "border-slate-200 bg-white"
                  }`}
                />
                <AnimatePresence>
                  {demoError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-600 mt-1.5"
                    >
                      {demoError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Save proof button */}
              {!proofSaved && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={validateAndSave}
                  className="w-full py-3 rounded-xl bg-white border-2 border-brand-200 text-brand-700 font-bold text-sm cursor-pointer hover:bg-brand-50 hover:border-brand-300 transition-all"
                >
                  Save Proof Links
                </motion.button>
              )}

              {proofSaved && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Proof links saved
                </div>
              )}
            </div>

            {/* ── Complete button (only enabled after proof saved) ── */}
            <motion.button
              whileHover={proofSaved ? { scale: 1.02 } : {}}
              whileTap={proofSaved ? { scale: 0.98 } : {}}
              onClick={proofSaved ? onComplete : undefined}
              className={`w-full py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                proofSaved
                  ? "bg-gradient-to-r from-brand-500 to-indigo-500 text-white shadow-lg shadow-brand-200 hover:shadow-xl"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {proofSaved
                ? "✓ Submit & Complete Challenge"
                : "Submit your project proof first ↑"}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
