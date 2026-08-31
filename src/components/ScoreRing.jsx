import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function getScoreColor(score) {
  if (score >= 75) return { stroke: "#34d399", text: "text-emerald-400", label: "Strong" };
  if (score >= 50) return { stroke: "#fbbf24", text: "text-amber-400", label: "Growing" };
  if (score >= 25) return { stroke: "#f97316", text: "text-orange-400", label: "Early" };
  return { stroke: "#f87171", text: "text-rose-400", label: "Just Starting" };
}

export default function ScoreRing({ score, label = "Readiness", animate = true, size = "default", theme = "dark" }) {
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

  const sizeClass = size === "large" ? "w-40 h-40 sm:w-48 sm:h-48" : "w-32 h-32 sm:w-36 sm:h-36";
  const fontSize = size === "large" ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl";
  const bgStroke = theme === "dark" ? "rgba(255,255,255,0.1)" : "#f4f4f5";
  const textColor = theme === "dark" ? "text-white" : "text-zinc-900";
  const labelColor = theme === "dark" ? "text-zinc-400" : "text-zinc-500";

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClass}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r={radius} fill="none" stroke={bgStroke} strokeWidth="6" />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: animate ? 1.2 : 0, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`${fontSize} font-mono font-bold tabular-nums ${textColor}`}>
            {displayScore}%
          </span>
          <span className={`text-[11px] font-semibold mt-1 uppercase tracking-widest ${labelColor}`}>
            {statusLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
