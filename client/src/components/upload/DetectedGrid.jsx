import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { categoryMeta, CATEGORY_META } from "../../utils/categories";

// Map of category key → emoji icon (covers all categories from server)
const CATEGORY_ICONS = {
  vegetable: "🥬",
  fruit: "🍎",
  dairy: "🥛",
  egg: "🥚",
  drink: "🥤",
  meat: "🥩",
  seafood: "🦐",
  bakery: "🍞",
  frozen: "🧊",
  condiment: "🧂",
  other: "🍽️",
};

function toLabel(name) {
  return String(name || "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getIcon(item) {
  const cat = String(item.category || "other").toLowerCase();
  return CATEGORY_ICONS[cat] || "🍽️";
}

export default function DetectedGrid({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-[#8A968C] text-center py-6">
        No ingredients detected.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item, i) => {
        const cat = String(item.category || "other").toLowerCase();
        const meta = categoryMeta(cat);
        const icon = getIcon(item);
        const label = toLabel(item.name);
        const isSpoiled = Boolean(item.isSpoiled);
        // Confidence can be 0-1 (YOLO) or not present (Gemini)
        const confDisplay =
          item.confidence != null
            ? item.confidence > 1
              ? `${Math.round(item.confidence)}%`
              : `${Math.round(item.confidence * 100)}%`
            : null;

        return (
          <motion.div
            key={item.name + i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.6), duration: 0.25 }}
            className={`relative rounded-xl border p-3.5 ${
              isSpoiled
                ? "border-[#F0C9C2] bg-[#FBEAE7]"
                : "border-[#E4E9E0] bg-[#FAFBF9] hover:bg-white hover:shadow-sm"
            } transition-all`}
          >
            {isSpoiled && (
              <span className="absolute top-2 right-2 text-[#C1503D]">
                <AlertTriangle size={14} />
              </span>
            )}
            <div className="text-2xl mb-1.5">{icon}</div>
            <p className="text-sm font-semibold text-[#1C2620] leading-tight">
              {label}
            </p>
            {isSpoiled && item.spoiledReason && (
              <p className="text-[10px] text-[#A8432F] mt-1 leading-snug">
                {item.spoiledReason}
              </p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span
                className="text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ backgroundColor: meta.bg, color: meta.text }}
              >
                {meta.label}
              </span>
              {!isSpoiled && confDisplay && (
                <span className="text-[11px] font-mono text-[#5B6B60]">
                  {confDisplay}
                </span>
              )}
              {isSpoiled && (
                <span className="text-[10px] font-semibold text-[#C1503D]">
                  Spoiled
                </span>
              )}
            </div>
            {item.shelfLifeDays != null && !isSpoiled && (
              <p className="text-[11px] text-[#8A968C] mt-1.5">
                ~{item.shelfLifeDays}d shelf life
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
