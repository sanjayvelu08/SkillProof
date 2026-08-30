import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getScoreColor(score) {
  if (score >= 75) return { stroke: "#10b981", text: "text-emerald-500", label: "Strong" };
  if (score >= 50) return { stroke: "#f59e0b", text: "text-amber-500", label: "Growing" };
  if (score >= 25) return { stroke: "#f97316", text: "text-orange-500", label: "Early" };
  return { stroke: "#ef4444", text: "text-rose-400", label: "Just Starting" };
}

export default function ScoreRing({ score, label = "Readiness", animate = true, size = "default" }) {
  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const { stroke, text, label: statusLabel } = getScoreColor(score);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [score, animate]);

  const sizeClass = size === "large" ? "w-40 h-40 sm:w-44 sm:h-44" : "w-32 h-32 sm:w-36 sm:h-36";
  const fontSize = size === "large" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClass}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="7" />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: animate ? 1.2 : 0, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-extrabold tabular-nums ${text}`}>
            {displayScore}%
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5">
            {statusLabel}
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
  );
}
