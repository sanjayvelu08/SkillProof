import { motion } from "framer-motion";

export default function RoleCard({ role, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full text-left rounded-xl p-5 transition-all duration-200 cursor-pointer group card-border
        ${
          isSelected
            ? "bg-white ring-2 ring-brand-500 shadow-sm"
            : "bg-white hover:bg-zinc-50 hover:shadow-sm"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center text-white">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4 transition-colors ${
        isSelected ? "bg-brand-50 text-brand-600" : "bg-zinc-100 text-zinc-600 group-hover:bg-zinc-200"
      }`}>
        {role.icon}
      </div>

      <h3 className="text-base font-bold text-zinc-900 mb-1">{role.title}</h3>
      <p className="text-xs text-zinc-500 leading-relaxed mb-4">
        {role.description}
      </p>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-1">
          {role.skills.slice(0, 4).map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-zinc-200 border border-white flex items-center justify-center" />
          ))}
          {role.skills.length > 4 && (
            <div className="w-4 h-4 rounded-full bg-zinc-100 border border-white flex items-center justify-center text-[7px] font-bold text-zinc-400">
              +
            </div>
          )}
        </div>
        <span className="text-[11px] font-medium text-zinc-400">
          {role.skills.length} skills required
        </span>
      </div>
    </motion.button>
  );
}
