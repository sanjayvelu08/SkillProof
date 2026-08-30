import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      color: ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 5 + 3,
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "100vh", opacity: 0, rotate: p.rotation + 720 }}
          transition={{ duration: 2 + Math.random(), delay: p.delay, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessOverlay({ oldScore, newScore, upgradedSkills, onDismiss }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
    >
      <Confetti />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative bg-white rounded-3xl p-7 sm:p-8 max-w-sm w-full shadow-2xl text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg shadow-emerald-200/50"
        >
          <span className="text-3xl">🚀</span>
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-1.5 tracking-tight">
          Skill Proved!
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          You upgraded {upgradedSkills.length} skill
          {upgradedSkills.length > 1 ? "s" : ""} to demonstrated
        </p>

        {/* Score transition */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div>
            <div className="text-2xl font-bold text-slate-300 tabular-nums">{oldScore}%</div>
            <div className="text-[11px] text-slate-400 font-medium">Before</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-px bg-slate-200" />
            <span className="text-sm text-slate-300">→</span>
            <div className="w-6 h-px bg-emerald-300" />
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-3xl font-extrabold text-emerald-500 tabular-nums"
            >
              {newScore}%
            </motion.div>
            <div className="text-[11px] text-emerald-500 font-semibold">After</div>
          </div>
        </div>

        {/* Upgraded skills */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-6">
          {upgradedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600"
            >
              🟢 {skill}
            </span>
          ))}
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm cursor-pointer transition-all shadow-lg shadow-brand-200/40 hover:shadow-xl hover:shadow-brand-300/40"
        >
          View My Updated Score
        </button>
      </motion.div>
    </motion.div>
  );
}
