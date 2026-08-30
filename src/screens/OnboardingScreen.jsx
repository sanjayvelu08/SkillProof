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
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-100/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/15 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Brand mark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-brand-200/50">
            <span className="text-3xl">👋</span>
          </div>
        </motion.div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/40 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-2">
              Welcome to SkillProof!
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mb-8 max-w-xs mx-auto leading-relaxed">
              Let's personalize your experience. What should we call you?
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Enter your name"
                autoFocus
                className="w-full text-center text-lg px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all font-medium"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-rose-500 text-sm font-medium mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-brand-200/40 hover:shadow-xl hover:shadow-brand-300/40 transition-all"
            >
              {loading ? "Setting up..." : "Let's Get Started →"}
            </motion.button>
          </form>

          <p className="text-[11px] text-slate-300 mt-6">
            You can always change this later
          </p>
        </div>
      </motion.div>
    </div>
  );
}
