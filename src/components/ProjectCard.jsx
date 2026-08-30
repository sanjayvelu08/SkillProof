import { motion } from "framer-motion";

export default function ProjectCard({ project, onComplete, isCompleted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-lg"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-500 to-indigo-500 px-6 py-5">
        <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1">
          🛠️ Your SkillProof Challenge
        </p>
        <h2 className="text-xl font-bold text-white">{project.title}</h2>
      </div>

      <div className="p-6 space-y-5">
        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {project.description}
        </p>

        {/* Skills demonstrated */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Skills you'll demonstrate
          </p>
          <div className="flex flex-wrap gap-2">
            {project.demonstrates.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-100"
              >
                ✨ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Deliverables */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Deliverables
          </p>
          <div className="space-y-2">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-slate-200 mt-0.5" />
                <span className="text-sm text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Time estimate */}
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 rounded-xl px-4 py-2.5">
          <span>⏱️</span>
          <span>
            Estimated time: <strong>{project.estimatedTime}</strong>
          </span>
        </div>

        {/* Completion section */}
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-4 rounded-xl bg-emerald-50 border-2 border-emerald-200"
          >
            <div className="text-4xl mb-2">🎉</div>
            <p className="text-lg font-bold text-emerald-700">
              Project Completed!
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              Your skills have been upgraded to <strong>Demonstrated</strong>
            </p>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-500 to-indigo-500 text-white font-bold text-sm cursor-pointer shadow-lg shadow-brand-200 hover:shadow-xl transition-shadow"
          >
            ✓ I've Completed This Project
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
