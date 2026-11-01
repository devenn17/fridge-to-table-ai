/**
 * Per-user, per-cuisine AI recipe cache.
 * Keeps Gemini API calls to a minimum by caching the generated dishes for
 * each cuisine separately. Cache is invalidated when pantry size changes >20%
 * or after 24 hours, matching the behaviour of RecipeCache.
 */
import { withDb } from "../data/store.js";

/** Returns the cached cuisine entry for a user+cuisine pair, or null. */
export function getCache(userId, cuisine) {
  return withDb((db) => {
    db.cuisineCache = db.cuisineCache || [];
    return (
      db.cuisineCache.find(
        (c) => c.userId === String(userId) && c.cuisine === cuisine
      ) || null
    );
  });
}

/**
 * Saves a generated dish set for a user+cuisine.
 * @param {string}   userId
 * @param {string}   cuisine    - e.g. "Italian"
 * @param {object[]} recipes    - Array of recipe objects from Gemini
 * @param {number}   pantrySize - Number of pantry items at time of generation
 */
export function setCache(userId, cuisine, recipes, pantrySize) {
  return withDb((db) => {
    db.cuisineCache = db.cuisineCache || [];
    const idx = db.cuisineCache.findIndex(
      (c) => c.userId === String(userId) && c.cuisine === cuisine
    );
    const entry = {
      userId: String(userId),
      cuisine,
      recipes,
      pantrySize,
      generatedAt: new Date().toISOString(),
    };
    if (idx >= 0) {
      db.cuisineCache[idx] = entry;
    } else {
      db.cuisineCache.push(entry);
    }
    return entry;
  });
}

/** Clears the cache for a specific user+cuisine. */
export function clearCache(userId, cuisine) {
  return withDb((db) => {
    db.cuisineCache = (db.cuisineCache || []).filter(
      (c) => !(c.userId === String(userId) && c.cuisine === cuisine)
    );
    return true;
  });
}

/** Clears ALL cuisine caches for a user (e.g. after significant pantry change). */
export function clearAllForUser(userId) {
  return withDb((db) => {
    db.cuisineCache = (db.cuisineCache || []).filter(
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
  if (ageMs / (1000 * 60 * 60) > 24) return true;
  const prev = cached.pantrySize || 0;
  if (prev === 0 && currentPantrySize > 0) return true;
  if (currentPantrySize === 0) return false;
  return Math.abs(currentPantrySize - prev) / prev > 0.2;
}
