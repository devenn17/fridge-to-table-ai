import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Flame, Beef, Star, Bookmark, ChefHat } from "lucide-react";
import { artFor } from "../../utils/cuisineArt";

export default function RecipeCard({ recipe, onToggleSave, onCook }) {
  const art = artFor(recipe);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-[#E4E9E0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <Link to={`/recipes/${recipe.id}`} className="block">
        <div
          className="h-36 flex items-center justify-center text-5xl relative"
          style={{ background: art.gradient }}
        >
          {art.emoji}
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggleSave(recipe);
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition ${
              recipe.isSaved ? "bg-white text-emerald-600" : "bg-black/25 text-white hover:bg-black/40"
            }`}
            aria-label="Save recipe"
          >
            <Bookmark size={15} fill={recipe.isSaved ? "currentColor" : "none"} />
          </button>
          <span className="absolute bottom-3 left-3 bg-white/90 text-[#1C2620] text-[11px] font-semibold px-2.5 py-1 rounded-full">
            {recipe.cuisine}
          </span>
        </div>
      </Link>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/recipes/${recipe.id}`}>
            <h3 className="text-base font-bold text-[#1C2620] leading-snug hover:text-emerald-700 transition">
              {recipe.title}
            </h3>
          </Link>
          <span className="flex items-center gap-1 text-xs font-semibold text-[#C79A1F] shrink-0">
            <Star size={12} fill="currentColor" />
            {recipe.rating}
          </span>
        </div>

        <p className="text-xs text-[#5B6B60] mt-1.5 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Clock size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">{recipe.cookTimeMinutes}m</p>
          </div>
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Flame size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">{recipe.calories} kcal</p>
          </div>
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Beef size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">{recipe.protein}g</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[11px]">
          <span className="text-emerald-700 font-medium">
            ✓ {recipe.usedIngredients.length} pantry item{recipe.usedIngredients.length === 1 ? "" : "s"} used
          </span>
          {recipe.missingIngredients.length > 0 && (
            <span className="text-[#8A6516] font-medium">
              +{recipe.missingIngredients.length} missing
            </span>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-[#EEF1EC] flex items-center gap-2">
          <button
            onClick={() => onCook(recipe)}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
          >
            <ChefHat size={13} />
            Cook This
          </button>
          <span className="text-[10px] font-semibold px-2.5 py-2.5 rounded-xl bg-[#F3F6F1] text-[#5B6B60]">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
