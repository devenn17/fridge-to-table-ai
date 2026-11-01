import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Search, RefreshCw, Sparkles, Clock, Flame, Beef, ChefHat, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import API from "../services/api";

// Category filter options derived from Gemini recipe categories
const CATEGORY_OPTIONS = [
  "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Drink",
];

// Gradient palettes for recipe cards
const CARD_GRADIENTS = [
  "linear-gradient(135deg,#d4f5e9,#a7f3d0)",
  "linear-gradient(135deg,#fde68a,#fbbf24)",
  "linear-gradient(135deg,#fecaca,#fca5a5)",
  "linear-gradient(135deg,#bfdbfe,#93c5fd)",
  "linear-gradient(135deg,#e9d5ff,#c4b5fd)",
  "linear-gradient(135deg,#fed7aa,#fb923c)",
  "linear-gradient(135deg,#ccfbf1,#5eead4)",
  "linear-gradient(135deg,#fce7f3,#f9a8d4)",
];

const EMOJI_MAP = {
  Breakfast: "🍳", Lunch: "🍱", Dinner: "🍽️",
  Snack: "🍿", Dessert: "🍰", Drink: "🥤",
};

function getDifficultyColor(difficulty) {
  if (difficulty === "Easy") return { bg: "#E7F3EA", text: "#2E5C41" };
  if (difficulty === "Hard") return { bg: "#FAE7E7", text: "#8F3535" };
  return { bg: "#FBF3E1", text: "#8A6516" };
}

function AIRecipeCard({ recipe, index }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const diffColor = getDifficultyColor(recipe.difficulty);
  const emoji = EMOJI_MAP[recipe.category] || "🍽️";

  const caloriesNum = String(recipe.calories || "").replace(/\D/g, "") || "—";
  const proteinNum = String(recipe.protein || "").replace(/\D/g, "") || "—";

  const matchPct = recipe.matchPercentage || 100;
  const matchColor =
    matchPct >= 95
      ? { bg: "#10B981", text: "#FFFFFF" }
      : matchPct >= 80
      ? { bg: "#D1FAE5", text: "#065F46" }
      : { bg: "#FEF3C7", text: "#92400E" };

  const usedList = Array.isArray(recipe.usedIngredients) && recipe.usedIngredients.length > 0
    ? recipe.usedIngredients
    : Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

  const missingList = Array.isArray(recipe.missingIngredients) ? recipe.missingIngredients : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="rounded-2xl bg-white border border-[#E4E9E0] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Card header */}
      <div
        className="h-36 flex items-center justify-center text-5xl relative"
        style={{ background: gradient }}
      >
        <span>{emoji}</span>
        {/* Match percentage badge */}
        <span
          className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1"
          style={{ backgroundColor: matchColor.bg, color: matchColor.text }}
        >
          ⚡ {matchPct}% Match
        </span>

        {/* Category badge */}
        <span className="absolute bottom-3 left-3 bg-white/90 text-[#1C2620] text-[11px] font-semibold px-2.5 py-1 rounded-full">
          {recipe.category}
        </span>

        {/* Cuisine badge */}
        {recipe.cuisine && (
          <span className="absolute bottom-3 right-3 bg-[#1C2620]/85 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
            {recipe.cuisine}
          </span>
        )}

        {/* Difficulty badge */}
        <span
          className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 rounded-full"
          style={{ backgroundColor: diffColor.bg, color: diffColor.text }}
        >
          {recipe.difficulty}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-bold text-[#1C2620] leading-snug">
          {recipe.title}
        </h3>
        <p className="text-xs text-[#5B6B60] mt-1.5 line-clamp-2 leading-relaxed">
          {recipe.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Clock size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">
              {recipe.cookTimeMinutes || recipe.time || "—"}m
            </p>
          </div>
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Flame size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">
              {caloriesNum} kcal
            </p>
          </div>
          <div className="rounded-lg bg-[#F3F6F1] p-2 text-center">
            <Beef size={13} className="mx-auto text-[#5B6B60]" />
            <p className="text-[11px] font-semibold text-[#1C2620] mt-1">
              {proteinNum}g
            </p>
          </div>
        </div>

        {/* Available & Missing Ingredients */}
        <div className="mt-3 space-y-1 text-[11px]">
          {usedList.length > 0 && (
            <p className="text-emerald-700 font-medium line-clamp-2">
              <span className="font-bold">✓ Pantry:</span> {usedList.join(", ")}
            </p>
          )}
          {missingList.length > 0 ? (
            <p className="text-amber-700 font-medium line-clamp-1">
              <span className="font-bold">⚠️ Missing:</span> {missingList.join(", ")}
            </p>
          ) : (
            <p className="text-emerald-800 font-medium text-[10px]">
              💯 All ingredients in pantry!
            </p>
          )}
        </div>

        {/* Chef tip */}
        {recipe.chefTip && (
          <p className="text-[11px] text-[#8A6516] mt-1.5 italic line-clamp-1">
            💡 {recipe.chefTip}
          </p>
        )}

        {/* Cook button */}
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}>
            <ChefHat size={13} />
            <span className="flex-1">Serves {recipe.servings || "2"}</span>
            <span>{recipe.time || `${recipe.cookTimeMinutes}min`}</span>
          </div>
          {/* Instructions preview */}
          {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 && (
            <details className="mt-2 text-xs text-[#5B6B60]">
              <summary className="cursor-pointer font-semibold text-[#3F7D58] select-none">
                View Steps ({recipe.instructions.length})
              </summary>
              <ol className="mt-2 space-y-1.5 list-decimal list-inside leading-snug max-h-48 overflow-y-auto pr-1">
                {recipe.instructions.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </details>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Recipes() {
  const navigate = useNavigate();
  const [aiRecipes, setAiRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [isAI, setIsAI] = useState(false);
  const [isCached, setIsCached] = useState(false);
  const [isStale, setIsStale] = useState(false);
  const [warning, setWarning] = useState("");
  const [generatedAt, setGeneratedAt] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [pantryCount, setPantryCount] = useState(0);
  const [emptyMessage, setEmptyMessage] = useState("");

  const load = async (forceAI = false) => {
    try {
      forceAI ? setRegenerating(true) : setLoading(true);
      const endpoint = forceAI ? "/recipes/ai" : "/recipes";
      const res = await API.get(endpoint);
      const data = res.data;

      setPantryCount(data.pantryCount || 0);

      if (data.warning) setWarning(data.warning);
      else setWarning("");

      if (data.generatedAt) setGeneratedAt(data.generatedAt);
      setIsCached(Boolean(data.cached));
      setIsStale(Boolean(data.stale));

      if (data.message && (!data.aiRecipes || data.aiRecipes.length === 0)) {
        setEmptyMessage(data.message);
        setAiRecipes([]);
        setCategories([]);
        return;
      }

      if (data.isAI || data.aiRecipes?.length > 0) {
        setIsAI(true);
        setAiRecipes(data.aiRecipes || []);
        setCategories([]);
      } else {
        setIsAI(false);
        setCategories(data.categories || []);
        setAiRecipes([]);
      }
    } catch (err) {
      console.error("[Recipes load error]", err);
      const msg = err.response?.data?.message || err.message || "Failed to load recipes";
      if (err.response?.status === 429) {
        toast.error("Rate limit reached — showing cached recipes. Try regenerating later.");
      } else {
        toast.error(msg);
      }
      setCategories([]);
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  };

  useEffect(() => { load(); }, []);

  // All recipes (deduplicated for catalog mode)
  const allCatalogRecipes = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => c.recipes.forEach((r) => map.set(r.id, r)));
    return [...map.values()];
  }, [categories]);

  // Filtered AI recipes
  const filteredAIRecipes = useMemo(() => {
    let list = [...aiRecipes];
    if (activeCategory !== "all") {
      list = list.filter((r) =>
        String(r.category).toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.ingredients?.some((i) => String(i).toLowerCase().includes(q))
      );
    }
    return list;
  }, [aiRecipes, activeCategory, query]);

  // Filtered catalog recipes
  const filteredCatalogRecipes = useMemo(() => {
    const source =
      activeCategory === "all"
        ? allCatalogRecipes
        : categories.find((c) => c.key === activeCategory)?.recipes || [];
    if (!query.trim()) return source;
    const q = query.trim().toLowerCase();
    return source.filter(
      (r) => r.title.toLowerCase().includes(q) || r.cuisine?.toLowerCase().includes(q)
    );
  }, [activeCategory, categories, allCatalogRecipes, query]);

  const displayRecipes = isAI ? filteredAIRecipes : filteredCatalogRecipes;
  const totalCount = isAI ? aiRecipes.length : allCatalogRecipes.length;

  return (
    <DashboardLayout
      title="AI Recipes"
      subtitle={
        pantryCount > 0
          ? `${isAI ? "🤖 AI-generated" : "📚 Catalog"} recipes from ${pantryCount} pantry ingredients`
          : "Scan your fridge to unlock personalized recipes"
      }
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <ClipLoader color="#3F7D58" size={64} />
          <h2 className="mt-6 text-xl font-bold text-[#1C2620]">
            🤖 Generating AI Recipes…
          </h2>
          <p className="mt-2 text-sm text-[#5B6B60]">
            Gemini is creating personalized recipes from your pantry
          </p>
        </div>
      ) : totalCount === 0 ? (
        <EmptyState
          icon="🍳"
          title={pantryCount > 0 ? "Generate Your AI Recipes" : (emptyMessage ? "No recipes yet" : "Pantry is empty")}
          description={
            pantryCount > 0
              ? `You have ${pantryCount} ingredient(s) in your pantry! Click below to let Gemini generate personalized recipes.`
              : (emptyMessage || "Scan your fridge photo to detect ingredients — then AI will generate recipes just for you.")
          }
          action={
            pantryCount > 0 ? (
              <Button onClick={() => load(true)}>✨ Generate AI Recipes Now</Button>
            ) : (
              <Button onClick={() => navigate("/scan")}>Scan Your Fridge</Button>
            )
          }
        />
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A968C]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes or ingredients…"
                className="w-full rounded-xl border border-[#E4E9E0] bg-[#FAFBF9] pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
              />
            </div>
            <button
              onClick={() => load(true)}
              disabled={regenerating}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-sm font-semibold transition disabled:opacity-60"
            >
              {regenerating ? (
                <ClipLoader color="#fff" size={14} />
              ) : (
                <Sparkles size={15} />
              )}
              {regenerating ? "Generating…" : "Regenerate AI Recipes"}
            </button>
          </div>

          {/* Category filter tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                activeCategory === "all"
                  ? "bg-[#1C2620] text-white"
                  : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-[#E9EFE6]"
              }`}
            >
              🍽️ All ({totalCount})
            </button>
            {(isAI ? CATEGORY_OPTIONS : categories.map((c) => c.label)).map((cat) => {
              const key = isAI ? cat : categories.find((c) => c.label === cat)?.key || cat;
              const count = isAI
                ? aiRecipes.filter((r) => String(r.category).toLowerCase() === cat.toLowerCase()).length
                : categories.find((c) => c.key === key)?.count || 0;
              if (count === 0) return null;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(isAI ? cat : key)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    activeCategory === (isAI ? cat : key)
                      ? "bg-[#1C2620] text-white"
                      : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-[#E9EFE6]"
                  }`}
                >
                  {isAI ? (EMOJI_MAP[cat] || "🍽️") : ""} {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Warning banner for stale/rate-limited cache */}
          {isStale && warning && (
            <div className="flex items-center gap-2 mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800 font-medium">
              <AlertTriangle size={14} className="shrink-0" />
              {warning}
            </div>
          )}

          {/* AI badge */}
          {isAI && (
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-emerald-700">
              <Sparkles size={13} />
              {isCached
                ? `Cached AI recipes · generated ${generatedAt ? new Date(generatedAt).toLocaleString() : "earlier"}`
                : "Just generated by Gemini AI · personalized for your pantry"}
              <RefreshCw
                size={13}
                className="ml-auto cursor-pointer hover:text-emerald-900 transition"
                onClick={() => load(true)}
              />
            </div>
          )}

          {/* Recipe grid */}
          {displayRecipes.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No recipes match"
              description="Try a different category or search term."
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {isAI
                ? displayRecipes.map((recipe, i) => (
                    <AIRecipeCard key={recipe.title + i} recipe={recipe} index={i} />
                  ))
                : displayRecipes.map((recipe) => (
                    // Fallback catalog card (uses existing RecipeCard)
                    <div key={recipe.id} className="rounded-2xl bg-white border border-[#E4E9E0] p-5 hover:shadow-md transition">
                      <h3 className="font-bold text-[#1C2620]">{recipe.title}</h3>
                      <p className="text-xs text-[#5B6B60] mt-1 line-clamp-2">{recipe.description}</p>
                      <p className="text-xs text-emerald-700 mt-2 font-medium">
                        ✓ {recipe.usedIngredients?.length || 0} pantry items · {recipe.cookTimeMinutes}min
                      </p>
                    </div>
                  ))}
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
