import { motion } from "framer-motion";
import { Trash2, Clock } from "lucide-react";
import Badge from "../common/Badge";
import { categoryMeta, statusMeta } from "../../utils/categories";

export default function PantryCard({ item, onDelete }) {
  const cat = categoryMeta(item.category);
  const status = statusMeta(item.status);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.22 }}
      className="group relative rounded-2xl bg-white border border-[#E4E9E0] p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: cat.bg }}
        >
          {item.icon || cat.icon}
        </div>
        <button
          onClick={() => onDelete(item)}
          className="opacity-0 group-hover:opacity-100 flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
          aria-label={`Delete ${item.label || item.name}`}
        >
          <Trash2 size={14} />
        </button>
      </div>

      <h3 className="mt-3 text-base font-semibold text-[#1C2620] capitalize leading-tight">
        {item.label || item.name}
      </h3>
      <p className="text-xs text-[#8A968C] mt-0.5">
        Qty: {item.quantity} {item.unit}
      </p>

      <div className="flex items-center gap-2 mt-3">
        <Badge icon={cat.icon} label={cat.label} bg={cat.bg} text={cat.text} />
      </div>

      <div
        className="mt-3 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium"
        style={{ backgroundColor: status.bg, color: status.text }}
      >
        <Clock size={12} />
        {item.expiryLabel}
        <span className="ml-auto">{status.icon}</span>
      </div>
    </motion.div>
  );
}
