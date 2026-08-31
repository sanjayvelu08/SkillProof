import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function OnboardingScreen() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateName } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name");
      return;
    }
    setLoading(true);
    updateName(trimmed);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        {/* Brand mark */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl p-8 card-shadow card-border text-center">
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight mb-2">
            Welcome to SkillProof
          </h1>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            Let's personalize your experience. What should we call you?
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Enter your name"
                autoFocus
                className="w-full text-center text-base px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors font-medium"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-rose-500 text-sm font-medium mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Setting up..." : "Let's Get Started →"}
            </button>
          </form>

          <p className="text-[11px] text-zinc-400 mt-6 font-medium">
            You can always change this later
          </p>
        </div>
      </motion.div>
    </div>
  );
}
