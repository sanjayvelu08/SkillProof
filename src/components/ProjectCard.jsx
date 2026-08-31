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
      className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden"
    >
      {/* ─── Header ─────────────────────────────────── */}
      <div className="bg-zinc-900 px-6 py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
            SkillProof Challenge
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{project.title}</h2>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Description */}
        <p className="text-sm text-zinc-600 leading-relaxed font-medium">{project.description}</p>

        {/* Skills to demonstrate */}
        <div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Skills to Prove
          </p>
          <div className="flex flex-wrap gap-2">
            {project.demonstrates.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded bg-zinc-100 text-zinc-600 border border-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">
            Requirements
          </p>
          <div className="space-y-2">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5" />
                <span className="text-sm text-zinc-600 leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center gap-2.5 text-xs text-zinc-500 bg-zinc-50 rounded-lg px-4 py-3 border border-zinc-100">
          <svg className="w-4 h-4 flex-shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">
            Estimated completion: <strong className="text-zinc-700">{project.estimatedTime}</strong>
          </span>
        </div>

        {/* ─── Completed State ──────────────────────── */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4 pt-4 border-t border-zinc-100"
          >
            <div className="text-center py-6 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-base font-bold text-emerald-700">Project Completed</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">
                Skills upgraded to <strong className="font-bold">Demonstrated</strong>
              </p>
            </div>

            {proof && (
              <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-4 space-y-3">
                <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                  Submitted Proof
                </p>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <a
                    href={proof.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-2 truncate"
                  >
                    {proof.githubUrl}
                  </a>
                </div>
                {proof.demoUrl && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <a
                      href={proof.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-600 hover:text-brand-700 font-semibold underline underline-offset-2 truncate"
                    >
                      {proof.demoUrl}
                    </a>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <div className="pt-4 border-t border-zinc-100">
            {/* ─── Proof Submission ──────────────────── */}
            <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-5 space-y-4">
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                Submit Project Proof
              </p>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 mb-2">
                  GitHub Repository URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => { setGithubUrl(e.target.value); if (githubError) setGithubError(""); }}
                  placeholder="https://github.com/yourname/project-name"
                  className={`w-full px-4 py-2.5 rounded-lg bg-white border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors ${
                    githubError ? "border-rose-300" : "border-zinc-200"
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
                <label className="block text-xs font-semibold text-zinc-600 mb-2">
                  Live Demo URL <span className="text-zinc-400 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => { setDemoUrl(e.target.value); if (demoError) setDemoError(""); }}
                  placeholder="https://my-project.vercel.app"
                  className={`w-full px-4 py-2.5 rounded-lg bg-white border text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors ${
                    demoError ? "border-rose-300" : "border-zinc-200"
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
                <button
                  onClick={validateAndSave}
                  className="w-full py-2.5 rounded-lg bg-white border border-zinc-200 text-zinc-700 font-semibold text-sm cursor-pointer hover:bg-zinc-50 hover:border-zinc-300 transition-colors"
                >
                  Save Proof Links
                </button>
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
            <button
              onClick={proofSaved ? onComplete : undefined}
              disabled={!proofSaved}
              className={`w-full py-3.5 mt-4 rounded-lg font-semibold text-sm transition-colors ${
                proofSaved
                  ? "bg-zinc-900 hover:bg-zinc-800 text-white cursor-pointer shadow-sm"
                  : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
              }`}
            >
              {proofSaved ? "Submit Project →" : "Save proof links to continue"}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
