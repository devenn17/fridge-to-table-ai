import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Flame,
  Users,
  BarChart3,
  Star,
  Bookmark,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import { SkeletonBlock } from "../components/common/Skeleton";
import EmptyState from "../components/common/EmptyState";
import Button from "../components/common/Button";
import { artFor } from "../utils/cuisineArt";
import API from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await API.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (err) {
        if (err.response?.status === 404) setNotFound(true);
        else toast.error("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const toggleSave = async () => {
    if (!recipe) return;
    try {
      if (recipe.isSaved) {
        await API.delete(`/recipes/${recipe.id}/save`);
        toast.success("Removed from saved recipes");
      } else {
        await API.post(`/recipes/${recipe.id}/save`);
        toast.success("Saved recipe");
      }
      setRecipe((r) => ({ ...r, isSaved: !r.isSaved }));
    } catch {
      toast.error("Something went wrong");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <SkeletonBlock className="h-64 w-full mb-6" />
        <SkeletonBlock className="h-8 w-1/2 mb-3" />
        <SkeletonBlock className="h-4 w-1/3" />
      </DashboardLayout>
    );
  }

  if (notFound || !recipe) {
    return (
      <DashboardLayout>
        <EmptyState
          icon="🍽️"
          title="Recipe not found"
          description="This recipe may have been removed."
          action={<Button onClick={() => navigate("/recipes")}>Back to Recipes</Button>}
        />
      </DashboardLayout>
    );
  }

  const art = artFor(recipe);

  return (
    <DashboardLayout>
      <Link
        to="/recipes"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5B6B60] hover:text-[#1C2620] mb-5 transition"
      >
        <ArrowLeft size={15} /> Back to Recipes
      </Link>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden h-64 flex items-end p-8"
        style={{ background: art.gradient }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <span className="absolute top-6 right-6 text-8xl opacity-30">{art.emoji}</span>
        <div className="relative z-10 text-white">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {recipe.cuisine}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
            {recipe.title}
          </h1>
          <p className="mt-2 text-white/85 text-sm max-w-xl">{recipe.description}</p>
        </div>
        <button
          onClick={toggleSave}
          aria-label="Save recipe"
          className={`absolute top-6 left-6 w-11 h-11 rounded-full flex items-center justify-center transition z-10 ${
            recipe.isSaved ? "bg-white text-emerald-600" : "bg-black/25 text-white hover:bg-black/40"
          }`}
        >
          <Bookmark size={18} fill={recipe.isSaved ? "currentColor" : "none"} />
        </button>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
        {[
          { icon: Clock, label: "Cook Time", value: `${recipe.cookTimeMinutes} min` },
          { icon: BarChart3, label: "Difficulty", value: recipe.difficulty },
          { icon: Flame, label: "Calories", value: `${recipe.calories} kcal` },
          { icon: Users, label: "Servings", value: recipe.servings },
          { icon: Star, label: "Rating", value: recipe.rating },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-white border border-[#E4E9E0] p-4 text-center">
            <Icon size={16} className="mx-auto text-[#3F7D58] mb-1.5" />
            <p className="text-[10px] uppercase tracking-wide text-[#8A968C] font-semibold">{label}</p>
            <p className="text-sm font-bold text-[#1C2620] mt-0.5">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Ingredients */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl bg-white border border-[#E4E9E0] p-6">
            <h3 className="text-sm font-bold text-[#1C2620] mb-4 uppercase tracking-wide">
              Ingredients
            </h3>

            {recipe.usedIngredients.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-emerald-700 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={13} /> From your pantry
                </p>
                <ul className="space-y-1.5">
                  {recipe.usedIngredients.map((ing) => (
                    <li key={ing.name} className="flex items-center justify-between text-sm bg-[#E7F3EA] rounded-lg px-3 py-2">
                      <span className="capitalize text-[#1C2620]">{ing.name}</span>
                      <span className="text-xs text-[#5B6B60]">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {recipe.missingIngredients.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#8A6516] mb-2 flex items-center gap-1.5">
                  <XCircle size={13} /> Missing Ingredients
                </p>
                <ul className="space-y-1.5">
                  {recipe.missingIngredients.map((ing) => (
                    <li key={ing.name} className="flex items-center justify-between text-sm bg-[#FDF6E3] rounded-lg px-3 py-2">
                      <span className="capitalize text-[#1C2620]">{ing.name}</span>
                      <span className="text-xs text-[#5B6B60]">{ing.amount}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-[#8A968C] mb-2">Pantry Staples Used</p>
              <div className="flex flex-wrap gap-1.5">
                {recipe.ingredients
                  .filter((i) => i.staple)
                  .map((ing) => (
                    <span key={ing.name} className="text-[11px] bg-[#F3F6F1] text-[#5B6B60] px-2.5 py-1 rounded-full capitalize">
                      {ing.name}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Nutrition */}
          <div className="rounded-2xl bg-white border border-[#E4E9E0] p-6">
            <h3 className="text-sm font-bold text-[#1C2620] mb-4 uppercase tracking-wide">
              Nutrition (per serving)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <NutriStat label="Calories" value={`${recipe.calories}`} suffix="kcal" />
              <NutriStat label="Protein" value={`${recipe.protein}`} suffix="g" />
              <NutriStat label="Carbs" value={`${recipe.carbs}`} suffix="g" />
              <NutriStat label="Fat" value={`${recipe.fat}`} suffix="g" />
            </div>
          </div>
        </div>

        {/* Instructions + tips */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl bg-white border border-[#E4E9E0] p-6">
            <h3 className="text-sm font-bold text-[#1C2620] mb-5 uppercase tracking-wide">
              Step-by-Step Instructions
            </h3>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span
                    className="shrink-0 w-8 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm text-[#1C2620] leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.tips?.length > 0 && (
            <div className="rounded-2xl bg-gradient-to-br from-[#FDF6E3] to-[#FBF0D0] border border-[#F0E0A0] p-6">
              <h3 className="text-sm font-bold text-[#8A6516] mb-3 uppercase tracking-wide flex items-center gap-2">
                <Lightbulb size={15} /> Cooking Tips
              </h3>
              <ul className="space-y-2">
                {recipe.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-[#6B5024] flex gap-2">
                    <span>💡</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function NutriStat({ label, value, suffix }) {
  return (
    <div className="rounded-xl bg-[#F3F6F1] p-3 text-center">
      <p className="text-lg font-bold text-[#1C2620] font-mono">
        {value}
        <span className="text-xs font-normal text-[#8A968C] ml-0.5">{suffix}</span>
      </p>
      <p className="text-[10px] uppercase tracking-wide text-[#8A968C] font-semibold mt-0.5">{label}</p>
    </div>
  );
}
