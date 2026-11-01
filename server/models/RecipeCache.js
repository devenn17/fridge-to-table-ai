/**
 * Per-user AI recipe cache.
 *
 * Recipes are expensive (Gemini API call + rate-limited). We cache the last
 * generated set per user and only regenerate when the user explicitly asks
 * or when the pantry changes significantly (ingredient count changes by > 20%).
 */
import { withDb } from "../data/store.js";

/** Returns the cached recipe entry for a user, or null if none. */
export function getCache(userId) {
  return withDb((db) => {
    db.cachedRecipes = db.cachedRecipes || [];
    return db.cachedRecipes.find((c) => c.userId === String(userId)) || null;
  });
}

/**
 * Saves a generated recipe set for a user.
 * @param {string} userId
 * @param {object[]} recipes   - Array of recipe objects from Gemini
 * @param {number}  pantrySize - Number of pantry items at time of generation
 */
export function setCache(userId, recipes, pantrySize) {
  return withDb((db) => {
    db.cachedRecipes = db.cachedRecipes || [];
    const idx = db.cachedRecipes.findIndex((c) => c.userId === String(userId));
    const entry = {
      userId: String(userId),
      recipes,
      pantrySize,
      generatedAt: new Date().toISOString(),
    };
    if (idx >= 0) {
      db.cachedRecipes[idx] = entry;
    } else {
      db.cachedRecipes.push(entry);
    }
    return entry;
  });
}

/** Clears the cache for a user (call when user explicitly regenerates). */
export function clearCache(userId) {
  return withDb((db) => {
    db.cachedRecipes = (db.cachedRecipes || []).filter(
      (c) => c.userId !== String(userId)
    );
    return true;
  });
}

/**
 * Returns true if the cache should be regenerated:
 * - No cache exists yet
 * - Pantry size changed by more than 20% since last generation
 * - Cache is older than 24 hours
 */
export function shouldRegenerate(cached, currentPantrySize) {
  if (!cached) return true;

  const ageMs = Date.now() - new Date(cached.generatedAt).getTime();
  const ageHours = ageMs / (1000 * 60 * 60);
  if (ageHours > 24) return true;

  const prev = cached.pantrySize || 0;
  if (prev === 0 && currentPantrySize > 0) return true;
  if (currentPantrySize === 0) return false;

  const changePct = Math.abs(currentPantrySize - prev) / prev;
  return changePct > 0.20; // regenerate if pantry grew/shrank by >20%
}
