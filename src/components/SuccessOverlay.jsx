import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      color: ["#10b981", "#059669", "#34d399", "#14b8a6", "#18181b", "#e4e4e7"][
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4"
    >
      <Confetti />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative bg-white rounded-2xl p-8 max-w-sm w-full card-border shadow-2xl text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-14 h-14 mx-auto mb-5 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center"
        >
          <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2 tracking-tight">
          Project Verified
        </h2>
        <p className="text-zinc-500 text-sm mb-6">
          You upgraded {upgradedSkills.length} skill
          {upgradedSkills.length > 1 ? "s" : ""} to demonstrated.
        </p>

        {/* Score transition */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div>
            <div className="text-2xl font-mono font-bold text-zinc-300 tabular-nums">{oldScore}%</div>
            <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-widest mt-1">Before</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-zinc-200" />
            <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="text-3xl font-mono font-bold text-emerald-600 tabular-nums"
            >
              {newScore}%
            </motion.div>
            <div className="text-[11px] text-emerald-600 font-semibold uppercase tracking-widest mt-1">After</div>
          </div>
        </div>

        {/* Upgraded skills */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {upgradedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {skill}
            </span>
          ))}
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm cursor-pointer transition-colors"
        >
          View Updated Score
        </button>
      </motion.div>
    </motion.div>
  );
}
