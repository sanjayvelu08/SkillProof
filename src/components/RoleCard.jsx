import { motion } from "framer-motion";

export default function RoleCard({ role, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-200 cursor-pointer group
        ${
          isSelected
            ? "bg-white shadow-lg shadow-brand-100/60 ring-2 ring-brand-500"
            : "bg-white/70 hover:bg-white hover:shadow-md hover:shadow-slate-200/60"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shadow-sm shadow-brand-200">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-colors ${
        isSelected ? "bg-brand-50" : "bg-slate-50 group-hover:bg-brand-50/50"
      }`}>
        {role.icon}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">{role.title}</h3>
      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">
        {role.description}
      </p>

      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          {role.skills.slice(0, 4).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </div>
          ))}
          {role.skills.length > 4 && (
            <div className="w-5 h-5 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
              +
            </div>
          )}
        </div>
        <span className="text-xs font-medium text-slate-400">
          {role.skills.length} skills
        </span>
      </div>
    </motion.button>
  );
}
