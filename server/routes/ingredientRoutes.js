import express from "express";
import * as Ingredient from "../models/Ingredient.js";
import * as RecipeCache from "../models/RecipeCache.js";
import * as CuisineCache from "../models/CuisineCache.js";
import { withComputedStatus } from "../utils/shelfLife.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /api/ingredients — current user's pantry, with computed status/expiry label.
router.get("/", requireAuth, async (req, res) => {
  try {
    const items = await Ingredient.findByUser(req.userId);
    res.json(items.map(withComputedStatus));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch pantry" });
  }
});

// DELETE /api/ingredients/:id — remove a single pantry item (only if it belongs to the caller).
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const items = await Ingredient.findByUser(req.userId);
    const owns = items.some((i) => i.id === req.params.id);
    if (!owns) {
      return res.status(404).json({ message: "Item not found" });
    }
    await Ingredient.remove(req.params.id);

    // Invalidate the recipe cache if the pantry size changed significantly
    // (reuses the same 20% threshold / zero-pantry logic from RecipeCache).
    const newPantrySize = items.length - 1; // items is pre-delete snapshot
    const cached = await RecipeCache.getCache(req.userId);
    if (RecipeCache.shouldRegenerate(cached, newPantrySize)) {
      await RecipeCache.clearCache(req.userId);
      // Also clear all per-cuisine caches since pantry changed significantly
      await CuisineCache.clearAllForUser(req.userId);
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
