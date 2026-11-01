import RECIPES from "../data/recipeCatalog.js";

export const RECIPE_CATEGORIES = [
  { key: "quick", label: "Quick Recipes", subtitle: "Under 15 min", icon: "⚡" },
  { key: "thirty-min", label: "30 Minute Meals", subtitle: "Ready in half an hour", icon: "⏱️" },
  { key: "breakfast", label: "Breakfast", subtitle: "Start the day right", icon: "🍳" },
  { key: "lunch", label: "Lunch", subtitle: "Midday favorites", icon: "🍱" },
  { key: "dinner", label: "Dinner", subtitle: "Evening mains", icon: "🍽️" },
  { key: "snacks", label: "Snacks", subtitle: "Small bites", icon: "🍿" },
  { key: "healthy", label: "Healthy", subtitle: "Light & nourishing", icon: "🥗" },
  { key: "high-protein", label: "High Protein", subtitle: "20g+ protein", icon: "💪" },
  { key: "vegetarian", label: "Vegetarian", subtitle: "Meat-free", icon: "🥦" },
  { key: "non-vegetarian", label: "Non Vegetarian", subtitle: "Chicken & cold cuts", icon: "🍗" },
  { key: "indian", label: "Indian", subtitle: "Spiced & comforting", icon: "🍛" },
  { key: "chinese", label: "Chinese", subtitle: "Wok-fired flavor", icon: "🥢" },
  { key: "french", label: "French", subtitle: "Classic technique", icon: "🥐" },
  { key: "italian", label: "Italian", subtitle: "Simple, fresh, bold", icon: "🍝" },
  { key: "south-indian", label: "South Indian", subtitle: "Coastal & tangy", icon: "🥥" },
  { key: "mexican", label: "Mexican", subtitle: "Bright & bold", icon: "🌮" },
  { key: "desserts", label: "Desserts", subtitle: "Sweet endings", icon: "🍰" },
];

/** Ingredients we never show as "missing" — assumed to always be on hand. */
function isStaple(ingredient) {
  return Boolean(ingredient.staple);
}

function enrichRecipe(recipe, pantryNameSet) {
  const used = [];
  const missing = [];

  for (const ing of recipe.ingredients) {
    if (isStaple(ing)) continue;
    if (pantryNameSet.has(ing.name.toLowerCase())) used.push(ing);
    else missing.push(ing);
  }

  const nonStapleCount = used.length + missing.length;
  const matchScore = nonStapleCount === 0 ? 0 : used.length / nonStapleCount;

  return {
    ...recipe,
    usedIngredients: used,
    missingIngredients: missing,
    matchScore: Math.round(matchScore * 100),
  };
}

/**
 * Builds the categorized recipe feed for a given pantry.
 *
 * With an empty pantry (nothing scanned/saved yet) this returns zero
 * recipes across every category — recipes are only ever generated from
 * ingredients actually on hand. Once the pantry has items, every category
 * is guaranteed at least one recipe (falls back to the catalog's
 * best-matching recipes for that category if nothing currently has
 * pantry overlap, so the UI never shows an empty category while there IS
 * a pantry to cook from).
 */
export function buildRecipeFeed(pantryNames) {
  const pantryNameSet = new Set(pantryNames.map((n) => n.toLowerCase()));
  const hasPantryItems = pantryNameSet.size > 0;
  const enriched = RECIPES.map((r) => enrichRecipe(r, pantryNameSet));

  const byId = new Map(enriched.map((r) => [r.id, r]));

  const categories = RECIPE_CATEGORIES.map((cat) => {
    let list = enriched
      .filter((r) => r.categories.includes(cat.key) && r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating);

    if (list.length === 0 && hasPantryItems) {
      // Fallback so no category is left empty — but only once there's an
      // actual pantry to cook from. An empty pantry should mean 0 recipes.
      list = enriched
        .filter((r) => r.categories.includes(cat.key))
        .sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating);
    }

    return {
      ...cat,
      count: list.length,
      recipes: list,
    };
  });

  return { categories, byId, all: enriched };
}

export function getRecipeById(id, pantryNames) {
  const recipe = RECIPES.find((r) => r.id === id);
  if (!recipe) return null;
  const pantryNameSet = new Set(pantryNames.map((n) => n.toLowerCase()));
  return enrichRecipe(recipe, pantryNameSet);
}
