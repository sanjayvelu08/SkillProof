import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      color: ["#5c7cfa", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"][
        Math.floor(Math.random() * 6)
      ],
      size: Math.random() * 8 + 4,
      rotation: Math.random() * 360,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{
            y: "100vh",
            opacity: 0,
            rotate: p.rotation + 720,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: p.delay,
            ease: "easeOut",
          }}
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
    const timer = setTimeout(() => setShow(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <Confetti />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center"
      >          <div className="text-5xl sm:text-6xl mb-4">🚀</div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 mb-2">
          Skill Proved!
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          You just upgraded {upgradedSkills.length} skill
          {upgradedSkills.length > 1 ? "s" : ""} from claimed to demonstrated
        </p>

        <div className="flex items-center justify-center gap-6 mb-6">
          <div>
            <div className="text-2xl font-bold text-slate-400">{oldScore}%</div>
            <div className="text-xs text-slate-400">Before</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-slate-300" />
            <span className="text-lg">→</span>
            <div className="w-8 h-px bg-emerald-300" />
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-3xl font-extrabold text-emerald-600"
            >
              {newScore}%
            </motion.div>
            <div className="text-xs text-emerald-600 font-medium">After</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {upgradedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-emerald-100 text-emerald-700"
            >
              🟢 {skill}
            </span>
          ))}
        </div>

        <button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl bg-brand-500 text-white font-bold text-sm cursor-pointer hover:bg-brand-600 transition-colors"
        >
          View My Updated Score
        </button>
      </motion.div>
    </motion.div>
  );
}
