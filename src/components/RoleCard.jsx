import { motion } from "framer-motion";

export default function RoleCard({ role, isSelected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative w-full text-left rounded-2xl p-6 border-2 transition-colors duration-200 cursor-pointer
        ${
          isSelected
            ? "border-brand-500 bg-white shadow-lg shadow-brand-100"
            : "border-slate-200 bg-white/70 hover:border-brand-200 hover:bg-white hover:shadow-md"
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      )}
      <span className="text-4xl mb-3 block">{role.icon}</span>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{role.title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {role.description}
      </p>
      <div className="mt-3 text-xs font-medium text-brand-600">
        {role.skills.length} skills required
      </div>
    </motion.button>
  );
}
