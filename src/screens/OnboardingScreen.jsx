import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function OnboardingScreen() {
  const { user, updateName } = useAuth();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Please enter your name.");
      return;
    }
    updateName(trimmed);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="text-5xl mb-3">🛡️</div>
        <h1 className="text-3xl font-extrabold text-slate-800">
          Skill<span className="text-brand-600">Proof</span>
        </h1>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-extrabold text-slate-800">
            👋 Welcome to SkillProof!
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            What should we call you?
          </p>
        </div>

        {error && (
          <div className="mb-4 px-3 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              autoFocus
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Alex"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-200 cursor-pointer hover:shadow-xl transition-shadow"
          >
            Let's Get Started →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
