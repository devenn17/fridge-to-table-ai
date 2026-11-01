import express from "express";
import * as Ingredient from "../models/Ingredient.js";
import * as SavedRecipe from "../models/SavedRecipe.js";
import * as RecipeCache from "../models/RecipeCache.js";
import * as CuisineCache from "../models/CuisineCache.js";
import { buildRecipeFeed, getRecipeById } from "../utils/recipeEngine.js";
import { generateRecipes, generateCuisineRecipes } from "../services/geminiService.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Starter ingredients for any user whose pantry is empty
const STARTER_INGREDIENTS = [
  { name: "milk", label: "Milk", category: "dairy", icon: "🥛", quantity: 2, unit: "bottles", shelfLifeDays: 7, expiresAt: new Date(Date.now() + 7 * 86400000).toISOString() },
  { name: "paneer", label: "Paneer", category: "dairy", icon: "🧈", quantity: 1, unit: "block", shelfLifeDays: 8, expiresAt: new Date(Date.now() + 8 * 86400000).toISOString() },
  { name: "eggs", label: "Eggs", category: "egg", icon: "🥚", quantity: 6, unit: "eggs", shelfLifeDays: 13, expiresAt: new Date(Date.now() + 13 * 86400000).toISOString() },
  { name: "spinach", label: "Spinach", category: "vegetable", icon: "🥬", quantity: 1, unit: "bunch", shelfLifeDays: 4, expiresAt: new Date(Date.now() + 4 * 86400000).toISOString() },
  { name: "cherry tomatoes", label: "Cherry Tomatoes", category: "vegetable", icon: "🍅", quantity: 12, unit: "pieces", shelfLifeDays: 6, expiresAt: new Date(Date.now() + 6 * 86400000).toISOString() },
  { name: "carrots", label: "Carrots", category: "vegetable", icon: "🥕", quantity: 6, unit: "pieces", shelfLifeDays: 18, expiresAt: new Date(Date.now() + 18 * 86400000).toISOString() },
];

async function pantryItemsFor(userId) {
  let items = await Ingredient.findByUser(userId);
  if (!items || items.length === 0) {
    console.log(`[pantryItemsFor] Seeding starter pantry items for user ${userId}...`);
    await Ingredient.upsertMany(userId, STARTER_INGREDIENTS);
    items = await Ingredient.findByUser(userId);
  }
  return items;
}

// ── GET /api/recipes ──────────────────────────────────────────────────────────
// Automatically serves AI recipes generated from pantry ingredients + caches result.
// Falls back to local catalog if AI provider is temporarily unreachable.
router.get("/", requireAuth, async (req, res) => {
  try {
    const pantryItems = await pantryItemsFor(req.userId);
    const pantryNames = pantryItems.map((i) => i.name);
    const savedIds = await SavedRecipe.findByUser(req.userId);

    // Build local catalog fallback feed
    const { categories } = buildRecipeFeed(pantryNames);
    const localCategories = categories.map((cat) => ({
      ...cat,
      recipes: cat.recipes.map((r) => ({ ...r, isSaved: savedIds.includes(r.id) })),
    }));

    // Check for cached AI recipes
    const cached = await RecipeCache.getCache(req.userId);
    if (cached?.recipes?.length > 0) {
      return res.json({
        pantryCount: pantryNames.length,
        aiRecipes: cached.recipes,
        categories: localCategories,
        isAI: true,
        cached: true,
        generatedAt: cached.generatedAt,
      });
    }

    // No cache — generate fresh AI recipes using pantry ingredients
    try {
      const aiRecipes = await generateRecipes(pantryNames);
      if (aiRecipes && aiRecipes.length > 0) {
        await RecipeCache.setCache(req.userId, aiRecipes, pantryNames.length);

        return res.json({
          pantryCount: pantryNames.length,
          aiRecipes,
          categories: localCategories,
          isAI: true,
          cached: false,
        });
      }
    } catch (aiErr) {
      console.warn("[recipes] AI generation failed, using local catalog fallback:", aiErr.message);
    }

    // Fallback: convert catalog recipes matched to pantry into rich recipe feed
    const catalogRecipes = categories.flatMap((c) => c.recipes).map((r) => ({
      ...r,
      category: r.category || "Lunch",
      cuisine: r.cuisine || "Continental",
      cookTimeMinutes: r.cookTimeMinutes || 20,
      time: r.time || "20 min",
      difficulty: r.difficulty || "Easy",
      servings: r.servings || "2",
      calories: r.calories || "350 kcal",
      protein: r.protein || "15g",
      usedIngredients: (r.usedIngredients || []).map((i) => typeof i === "string" ? i : i.name),
      missingIngredients: (r.missingIngredients || []).map((i) => typeof i === "string" ? i : i.name),
      matchPercentage: r.matchScore || 85,
    }));

    // Deduplicate by title
    const uniqueCatalog = [];
    const seen = new Set();
    for (const r of catalogRecipes) {
      if (!seen.has(r.title)) {
        seen.add(r.title);
        uniqueCatalog.push(r);
      }
    }

    return res.json({
      pantryCount: pantryNames.length,
      aiRecipes: uniqueCatalog,
      categories: localCategories,
      isAI: true,
      cached: false,
      warning: "Showing instant recipes for your pantry ingredients.",
    });
  } catch (err) {
    console.error("Recipe feed error:", err);
    res.status(500).json({ message: "Failed to load recipes" });
  }
});

// ── GET /api/recipes/ai ───────────────────────────────────────────────────────
// Force-regenerates fresh AI recipes from pantry ingredients
router.get("/ai", requireAuth, async (req, res) => {
  try {
    const pantryItems = await pantryItemsFor(req.userId);
    const pantryNames = pantryItems.map((i) => i.name);

    await RecipeCache.clearCache(req.userId);
    const aiRecipes = await generateRecipes(pantryNames);
    await RecipeCache.setCache(req.userId, aiRecipes, pantryNames.length);

    res.json({
      pantryCount: pantryNames.length,
      aiRecipes,
      isAI: true,
      cached: false,
    });
  } catch (err) {
    console.error("[recipes/ai] error:", err.message);

    // Return stale cache if available
    const cached = await RecipeCache.getCache(req.userId);
    if (cached?.recipes?.length > 0) {
      return res.json({
        pantryCount: cached.recipes.length,
        aiRecipes: cached.recipes,
        isAI: true,
        cached: true,
        stale: true,
        generatedAt: cached.generatedAt,
        warning: "Showing last generated recipes.",
      });
    }

    res.status(500).json({ message: "AI recipe generation failed: " + err.message });
  }
});

// ── GET /api/recipes/saved ────────────────────────────────────────────────────
router.get("/saved", requireAuth, async (req, res) => {
  try {
    const pantryNames = (await pantryItemsFor(req.userId)).map((i) => i.name);
    const savedIds = await SavedRecipe.findByUser(req.userId);
    const recipes = savedIds
      .map((id) => getRecipeById(id, pantryNames))
      .filter(Boolean)
      .map((r) => ({ ...r, isSaved: true }));
    res.json({ recipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch saved recipes" });
  }
});

// ── GET /api/recipes/cuisines ─────────────────────────────────────────────────
// Derives all cuisines and recipe counts directly from the master AI generated recipe list
router.get("/cuisines", requireAuth, async (req, res) => {
  try {
    const pantryItems = await pantryItemsFor(req.userId);
    const pantryNames = pantryItems.map((i) => i.name);

    let aiRecipes = [];
    let isCached = false;
    let generatedAt = null;

    const cached = await RecipeCache.getCache(req.userId);
    if (cached?.recipes?.length > 0) {
      aiRecipes = cached.recipes;
      isCached = true;
      generatedAt = cached.generatedAt;
    } else {
      aiRecipes = await generateRecipes(pantryNames);
      await RecipeCache.setCache(req.userId, aiRecipes, pantryNames.length);
      generatedAt = new Date().toISOString();
    }

    // Group recipes by cuisine and count them
    const cuisineMap = {};
    for (const r of aiRecipes) {
      const c = r.cuisine || "Continental";
      if (!cuisineMap[c]) cuisineMap[c] = [];
      cuisineMap[c].push(r);
    }

    const cuisines = Object.keys(cuisineMap).map((c) => ({
      name: c,
      count: cuisineMap[c].length,
      recipes: cuisineMap[c],
    }));

    const selectedCuisine = req.query.cuisine || (cuisines[0]?.name || "Indian");
    const selectedRecipes = cuisineMap[selectedCuisine] || (req.query.cuisine ? [] : aiRecipes);

    res.json({
      cuisine: selectedCuisine,
      cuisines,
      pantryCount: pantryNames.length,
      recipes: selectedRecipes,
      allRecipes: aiRecipes,
      cached: isCached,
      generatedAt,
    });
  } catch (err) {
    console.error(`[recipes/cuisines] error:`, err.message);
    res.status(500).json({ message: "Failed to derive cuisine dishes: " + err.message });
  }
});

// ── GET /api/recipes/cuisines/generate ───────────────────────────────────────
// Force-regenerate master AI recipes and update cuisine breakdown
router.get("/cuisines/generate", requireAuth, async (req, res) => {
  try {
    const pantryItems = await pantryItemsFor(req.userId);
    const pantryNames = pantryItems.map((i) => i.name);

    await RecipeCache.clearCache(req.userId);
    await CuisineCache.clearAllForUser(req.userId);

    const aiRecipes = await generateRecipes(pantryNames);
    await RecipeCache.setCache(req.userId, aiRecipes, pantryNames.length);

    const cuisineMap = {};
    for (const r of aiRecipes) {
      const c = r.cuisine || "Continental";
      if (!cuisineMap[c]) cuisineMap[c] = [];
      cuisineMap[c].push(r);
    }

    const cuisines = Object.keys(cuisineMap).map((c) => ({
      name: c,
      count: cuisineMap[c].length,
      recipes: cuisineMap[c],
    }));

    const selectedCuisine = req.query.cuisine || (cuisines[0]?.name || "Indian");
    const selectedRecipes = cuisineMap[selectedCuisine] || aiRecipes;

    res.json({
      cuisine: selectedCuisine,
      cuisines,
      pantryCount: pantryNames.length,
      recipes: selectedRecipes,
      allRecipes: aiRecipes,
      cached: false,
    });
  } catch (err) {
    console.error("[cuisines/generate] error:", err.message);
    res.status(500).json({ message: "Failed to regenerate cuisine dishes: " + err.message });
  }
});

export default router;
