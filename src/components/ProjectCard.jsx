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

export default function ProjectCard({ project, onComplete, isCompleted, proof, onSaveProof }) {
  const [githubUrl, setGithubUrl] = useState(proof?.githubUrl || "");
  const [demoUrl, setDemoUrl] = useState(proof?.demoUrl || "");
  const [githubError, setGithubError] = useState("");
  const [demoError, setDemoError] = useState("");
  const [proofSaved, setProofSaved] = useState(!!proof);

  function validateAndSave() {
    let valid = true;

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

    if (demoUrl.trim() && !isValidUrl(demoUrl.trim())) {
      setDemoError("Please enter a valid URL (e.g. https://myapp.vercel.app).");
      valid = false;
    } else {
      setDemoError("");
    }

    if (!valid) return;

    onSaveProof({ githubUrl: githubUrl.trim(), demoUrl: demoUrl.trim() || null });
    setProofSaved(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm overflow-hidden"
    >
      {/* ─── Header ─────────────────────────────────── */}
      <div className="relative bg-gradient-to-r from-brand-600 via-brand-700 to-indigo-800 px-6 py-7 sm:py-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl" />
        </div>
        <div className="relative z-10">
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-2">
            Your SkillProof Challenge
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h2>
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>

        {/* Skills to demonstrate */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2.5">
            Skills you'll demonstrate
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.demonstrates.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-50 text-brand-600"
              >
                ✦ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2.5">
            Deliverables
          </p>
          <div className="space-y-2">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-sm text-slate-500 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center gap-2.5 text-sm text-slate-400 bg-slate-50 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Estimated time: <strong className="text-slate-600">{project.estimatedTime}</strong>
          </span>
        </div>

        {/* ─── Completed State ──────────────────────── */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center py-6 rounded-2xl bg-gradient-to-b from-emerald-50/80 to-emerald-50/40">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-lg font-bold text-emerald-700">Skill Proven!</p>
              <p className="text-sm text-emerald-600/80 mt-1">
                Your skills have been upgraded to <strong>Demonstrated</strong>
              </p>
            </div>

            {proof && (
              <div className="rounded-xl bg-slate-50 p-4 space-y-2">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  Project Proof Submitted
                </p>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <a
                    href={proof.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2 decoration-brand-200 truncate"
                  >
                    {proof.githubUrl}
                  </a>
                </div>
                {proof.demoUrl && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a
                      href={proof.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 font-medium underline underline-offset-2 decoration-brand-200 truncate"
                    >
                      {proof.demoUrl}
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <>
            {/* ─── Proof Submission ──────────────────── */}
            <div className="rounded-2xl bg-slate-50/80 p-4 sm:p-5 space-y-4">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Submit Project Proof
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  GitHub Repository URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => { setGithubUrl(e.target.value); if (githubError) setGithubError(""); }}
                  placeholder="https://github.com/yourname/project-name"
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all ${
                    githubError ? "border-rose-300" : "border-slate-200"
                  }`}
                />
                <AnimatePresence>
                  {githubError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-500 mt-1.5 font-medium"
                    >
                      {githubError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Live Demo URL <span className="text-slate-300">(optional)</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => { setDemoUrl(e.target.value); if (demoError) setDemoError(""); }}
                  placeholder="https://my-project.vercel.app"
                  className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all ${
                    demoError ? "border-rose-300" : "border-slate-200"
                  }`}
                />
                <AnimatePresence>
                  {demoError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-xs text-rose-500 mt-1.5 font-medium"
                    >
                      {demoError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {!proofSaved ? (
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={validateAndSave}
                  className="w-full py-3 rounded-xl bg-white border border-slate-200 text-brand-600 font-semibold text-sm cursor-pointer hover:bg-brand-50 hover:border-brand-200 transition-all"
                >
                  Save Proof Links
                </motion.button>
              ) : (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Proof links saved
                </div>
              )}
            </div>

            {/* ─── Complete Button ───────────────────── */}
            <motion.button
              whileHover={proofSaved ? { scale: 1.01 } : {}}
              whileTap={proofSaved ? { scale: 0.99 } : {}}
              onClick={proofSaved ? onComplete : undefined}
              className={`w-full py-4 rounded-xl font-semibold text-sm transition-all ${
                proofSaved
                  ? "bg-brand-600 hover:bg-brand-700 text-white cursor-pointer shadow-lg shadow-brand-200/40 hover:shadow-xl hover:shadow-brand-300/40"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {proofSaved ? "✓ Submit & Complete Challenge" : "Submit your project proof first ↑"}
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
