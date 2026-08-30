import { motion } from "framer-motion";

export default function InsightCard({ insight }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-indigo-50 border border-brand-100 p-5"
    >
      <div className="absolute top-3 right-3 text-3xl opacity-20 select-none">
        💡
      </div>
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
          <span className="text-lg">💡</span>
        </div>
        <div>
          <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">
            Insight
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">{insight}</p>
        </div>
      </div>
    </motion.div>
  );
}
