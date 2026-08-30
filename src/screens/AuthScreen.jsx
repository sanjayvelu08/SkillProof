import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function AuthScreen() {
  const { signUp, signIn } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      if (mode === "signup") {
        const { error } = await signUp(email, password);
        if (error) throw error;
        setSuccess("Account created! You can now log in.");
        setMode("login");
        setEmail("");
        setPassword("");
      } else {
        const { error } = await signIn(email, password);
        if (error) throw error;
        // Login succeeds → AuthContext updates user → App renders main flow
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode() {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError("");
    setSuccess("");
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
        <p className="text-slate-500 mt-1 text-sm">
          Don't just list your skills — prove them.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg border border-slate-100 p-6"
      >
        {/* Tab toggle */}
        <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setMode(tab);
                setError("");
                setSuccess("");
              }}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-bold cursor-pointer transition-all
                ${
                  mode === tab
                    ? "bg-white text-brand-600 shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }
              `}
            >
              {tab === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Error / Success messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 px-3 py-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-sm"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 px-3 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm shadow-lg shadow-brand-200 cursor-pointer hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting
              ? "Please wait..."
              : mode === "login"
                ? "Log In"
                : "Create Account"}
          </motion.button>
        </form>

        {/* Switch mode */}
        <p className="mt-5 text-center text-sm text-slate-400">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={switchMode}
            className="font-bold text-brand-600 hover:text-brand-700 cursor-pointer transition-colors"
          >
            {mode === "login" ? "Sign Up" : "Log In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
