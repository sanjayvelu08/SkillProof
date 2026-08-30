import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();

  function resetForm() {
    setEmail("");
    setPassword("");
    setName("");
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = isLogin
      ? await signIn(email, password)
      : await signUp(email, password, name.trim() || undefined);

    setLoading(false);

    if (result.error) {
      setError(result.error);
    }
  }

  function switchMode() {
    setIsLogin((v) => !v);
    resetForm();
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ─── Left: Brand Panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-400/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">SkillProof</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-bold leading-tight tracking-tight mb-4">
              Don't just list your skills.
              <br />
              <span className="text-brand-200">Prove them.</span>
            </h1>
            <p className="text-brand-200/80 text-base leading-relaxed max-w-md">
              Discover your career readiness, identify skill gaps, and build real projects 
              that demonstrate your abilities to employers.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "📊", text: "Evidence-based skill assessment" },
              { icon: "🎯", text: "Personalized career readiness score" },
              { icon: "🛠️", text: "Real projects to prove your skills" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.12 }}
                className="flex items-center gap-3 text-sm text-white/80"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Right: Form Panel ─────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16 lg:py-0 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile brand */}
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-md shadow-brand-200/50">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-800 tracking-tight">SkillProof</span>
            </div>
            <p className="text-sm text-slate-400">Don't just list your skills — prove them.</p>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-1.5">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-slate-400">
              {isLogin
                ? "Sign in to continue your skill journey"
                : "Start proving your skills today"}
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 mb-6">
            {["Log In", "Sign Up"].map((label, i) => {
              const active = i === 0 ? isLogin : !isLogin;
              return (
                <button
                  key={label}
                  onClick={() => { if (!active) switchMode(); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 ${
                    active
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 transition-all"
              />
              {!isLogin && (
                <p className="mt-1.5 text-[11px] text-slate-300">Minimum 6 characters</p>
              )}
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="bg-rose-50 text-rose-600 text-sm font-medium px-4 py-3 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-200/40 hover:shadow-xl hover:shadow-brand-300/40 transition-all"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {isLogin ? "Signing in..." : "Creating account..."}
                </span>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 mt-6">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchMode}
              className="text-brand-600 font-semibold hover:text-brand-700 cursor-pointer"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
