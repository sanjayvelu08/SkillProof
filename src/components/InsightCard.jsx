import { motion } from "framer-motion";

export default function InsightCard({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50/80 via-indigo-50/40 to-violet-50/30 p-5 sm:p-6"
    >
      {/* Decorative dot */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-400/30" />

      <div className="flex gap-3.5">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-100/60 flex items-center justify-center">
          <svg className="w-4.5 h-4.5 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-brand-500 uppercase tracking-widest mb-1.5">
            AI Insight
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
}
