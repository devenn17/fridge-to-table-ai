import { motion } from "framer-motion";
import { AlertTriangle, Trash2 } from "lucide-react";
import { categoryMeta } from "../../utils/categories";

// Helper: derive a display label from a raw name string
function toLabel(name) {
  return String(name || "")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function SpoiledPanel({ spoiled }) {
  if (!spoiled || spoiled.length === 0) return null;

  // Normalize: items can be { name, reason } objects or plain strings
  const normalizedItems = spoiled.map((item) =>
    typeof item === "string"
      ? { name: item, reason: "" }
      : { name: item.name || "", reason: item.reason || item.spoiledReason || "" }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border-2 border-dashed border-[#E8A99B] bg-gradient-to-br from-[#FDF1EE] to-[#FBEAE7] p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-[#C1503D] text-white flex items-center justify-center">
          <AlertTriangle size={16} />
        </div>
        <h3 className="text-sm font-bold text-[#8F3535] uppercase tracking-wide">
          ⚠ Spoiled / Defective Ingredients ({normalizedItems.length})
        </h3>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {normalizedItems.map((item, idx) => {
          const icon = categoryMeta("other").icon;
          return (
            <div
              key={item.name + idx}
              className="flex items-start gap-3 bg-white/70 border border-[#F0C9C2] rounded-xl px-4 py-3"
            >
              <span className="text-2xl mt-0.5">{icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#5A2323] truncate">
                  {toLabel(item.name)}
                </p>
                {item.reason ? (
                  <p className="text-xs text-[#A8432F] mt-0.5 leading-snug">
                    {item.reason}
                  </p>
                ) : (
                  <p className="text-xs text-[#A8432F] mt-0.5">
                    Visual defects detected
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[#8F3535]">
        <Trash2 size={13} />
        Discard these ingredients — they were not added to your pantry.
      </div>
    </motion.div>
  );
}
