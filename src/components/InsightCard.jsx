import { motion } from "framer-motion";

export default function InsightCard({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl bg-brand-50 border border-brand-200 p-5 sm:p-6"
    >
      {/* Decorative dot */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-400" />

      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white border border-brand-200 flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold text-brand-700 uppercase tracking-widest mb-1">
            Skill Analysis Insight
          </p>
          <p className="text-sm text-zinc-700 leading-relaxed font-medium">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
}
