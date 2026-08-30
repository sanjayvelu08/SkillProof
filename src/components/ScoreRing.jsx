import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getScoreColor(score) {
  if (score >= 75) return { stroke: "#10b981", text: "text-emerald-600", label: "Strong" };
  if (score >= 50) return { stroke: "#f59e0b", text: "text-amber-600", label: "Growing" };
  if (score >= 25) return { stroke: "#f97316", text: "text-orange-600", label: "Early" };
  return { stroke: "#ef4444", text: "text-rose-500", label: "Just Starting" };
}

export default function ScoreRing({ score, label = "Readiness", animate = true }) {
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
    let start = 0;
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

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 sm:w-36 sm:h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: animate ? 1.2 : 0, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl sm:text-3xl font-extrabold ${text}`}>
            {displayScore}%
          </span>
          <span className="text-xs text-slate-400 font-medium mt-0.5">
            {statusLabel}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}
