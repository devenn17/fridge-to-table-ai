import { useEffect, useMemo, useState, useCallback } from "react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import {
  Search, RefreshCw, Sparkles, Clock, Flame, Beef, ChefHat, AlertTriangle, Globe,
} from "lucide-react";
import { motion } from "framer-motion";
import DashboardLayout from "../layouts/DashboardLayout";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import API from "../services/api";

// ── Cuisine flag map ──────────────────────────────────────────────────────────
const CUISINE_FLAGS = {
  Italian: "🇮🇹", Mexican: "🇲🇽", Indian: "🇮🇳", Chinese: "🇨🇳",
  French: "🇫🇷", Japanese: "🇯🇵", Mediterranean: "🌊", Thai: "🇹🇭",
  Greek: "🇬🇷", Brazilian: "🇧🇷", American: "🇺🇸", Continental: "🌍",
  Spanish: "🇪🇸", Korean: "🇰🇷", Vietnamese: "🇻🇳", Turkish: "🇹🇷",
};

// ── Card gradients (mirrors Recipes.jsx) ────────────────────────────────────
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

// ── Cuisine card (same structure as AIRecipeCard in Recipes.jsx) ─────────────
function CuisineCard({ recipe, index }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const diffColor = getDifficultyColor(recipe.difficulty);
  const emoji = EMOJI_MAP[recipe.category] || "🍽️";
  const caloriesNum = String(recipe.calories || "").replace(/\D/g, "") || "—";
  const proteinNum  = String(recipe.protein  || "").replace(/\D/g, "") || "—";

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

        <span className="absolute bottom-3 left-3 bg-white/90 text-[#1C2620] text-[11px] font-semibold px-2.5 py-1 rounded-full">
          {recipe.category}
        </span>
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

        {/* Footer bar */}
        <div className="mt-auto pt-4">
          <div
            className="flex items-center gap-2 rounded-xl py-2.5 px-3 text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
          >
            <ChefHat size={13} />
            <span className="flex-1">Serves {recipe.servings || "2"}</span>
            <span>{recipe.time || `${recipe.cookTimeMinutes}min`}</span>
          </div>
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

// ── Main page ────────────────────────────────────────────────────────────────
export default function Cuisines() {
  const [activeCuisine, setActiveCuisine] = useState("all");
  const [cuisinesList, setCuisinesList] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [pantryCount, setPantryCount] = useState(0);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [query, setQuery] = useState("");
  const [meta, setMeta] = useState({});

  // ── Load derived cuisines & recipes ─────────────────────────────────────────
  const load = useCallback(async (force = false) => {
    try {
      force ? setRegenerating(true) : setLoading(true);

      const endpoint = force ? "/recipes/cuisines/generate" : "/recipes/cuisines";
      const res = await API.get(endpoint);
      const data = res.data;

      setPantryCount(data.pantryCount || 0);
      setAllRecipes(data.allRecipes || []);
      setCuisinesList(data.cuisines || []);

      setMeta({
        cached: Boolean(data.cached),
        generatedAt: data.generatedAt || null,
      });

      if ((!data.allRecipes || data.allRecipes.length === 0) && data.message) {
        setEmptyMessage(data.message);
      } else {
        setEmptyMessage("");
      }
    } catch (err) {
      console.error("[Cuisines load error]", err);
      const msg = err.response?.data?.message || err.message || "Failed to load cuisine dishes";
      if (err.response?.status === 429) {
        toast.error("Rate limit reached — try again later.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
      setRegenerating(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // ── Filter recipes by selected cuisine & search query ──────────────────────
  const displayRecipes = useMemo(() => {
    let list = allRecipes;
    if (activeCuisine !== "all") {
      list = list.filter(
        (r) => String(r.cuisine).toLowerCase() === activeCuisine.toLowerCase()
      );
    }
    if (!query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter(
      (r) =>
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.ingredients?.some((i) => String(i).toLowerCase().includes(q))
    );
  }, [allRecipes, activeCuisine, query]);

  return (
    <DashboardLayout
      title="World Cuisines"
      subtitle={
        pantryCount > 0
          ? `${cuisinesList.length} cuisines derived from ${pantryCount} pantry ingredients (${allRecipes.length} total recipes)`
          : "Scan your fridge to unlock personalized cuisine dishes"
      }
    >
      {/* ── Cuisine pill tabs with recipe counts ───────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-5 -mx-1 px-1 scrollbar-none">
        <button
          onClick={() => {
            setActiveCuisine("all");
            setQuery("");
          }}
          className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
            activeCuisine === "all"
              ? "bg-[#1C2620] text-white shadow-md"
              : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-[#E9EFE6]"
          }`}
        >
          🌍 All Cuisines ({allRecipes.length})
        </button>
        {cuisinesList.map((c) => {
          const flag = CUISINE_FLAGS[c.name] || "🍽️";
          const isActive = activeCuisine.toLowerCase() === c.name.toLowerCase();
          return (
            <button
              key={c.name}
              onClick={() => {
                setActiveCuisine(c.name);
                setQuery("");
              }}
              className={`shrink-0 flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "text-white shadow-md"
                  : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-[#E9EFE6]"
              }`}
              style={
                isActive
                  ? { background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }
                  : undefined
              }
            >
              <span className="text-base leading-none">{flag}</span>
              {c.name} ({c.count})
            </button>
          );
        })}
      </div>

      {/* ── Toolbar: search + regenerate ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A968C]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cuisine dishes or ingredients…"
            className="w-full rounded-xl border border-[#E4E9E0] bg-[#FAFBF9] pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
          />
        </div>
        <button
          onClick={() => load(true)}
          disabled={regenerating || loading}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-sm font-semibold transition disabled:opacity-60"
        >
          {regenerating ? <ClipLoader color="#fff" size={14} /> : <Sparkles size={15} />}
          {regenerating ? "Generating…" : "Regenerate Cuisines"}
        </button>
      </div>

      {/* ── AI badge ─────────────────────────────────────────────────────── */}
      {allRecipes.length > 0 && (
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-emerald-700">
          <Globe size={13} />
          {meta.cached
            ? `Cached cuisine breakdown · generated ${meta.generatedAt ? new Date(meta.generatedAt).toLocaleString() : "earlier"}`
            : "Derived directly from your master AI recipe pool"}
          <RefreshCw
            size={13}
            className="ml-auto cursor-pointer hover:text-emerald-900 transition"
            onClick={() => load(true)}
          />
        </div>
      )}

      {/* ── Content ──────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <ClipLoader color="#3F7D58" size={64} />
          <h2 className="mt-6 text-xl font-bold text-[#1C2620]">
            🌍 Deriving World Cuisines…
          </h2>
          <p className="mt-2 text-sm text-[#5B6B60]">
            Gemini is categorizing recipes from your pantry across global cuisines
          </p>
        </div>
      ) : pantryCount === 0 && allRecipes.length === 0 ? (
        <EmptyState
          icon="🌍"
          title={emptyMessage ? "No dishes yet" : "Pantry is empty"}
          description={
            emptyMessage ||
            "Scan your fridge photo to detect ingredients — then AI will derive all applicable cuisines just for you."
          }
          action={<Button onClick={() => (window.location.href = "/scan")}>Scan Your Fridge</Button>}
        />
      ) : displayRecipes.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No dishes match"
          description="Try a different search term or select another cuisine."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayRecipes.map((recipe, i) => (
            <CuisineCard
              key={recipe.title + i}
              recipe={recipe}
              index={i}
            />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
