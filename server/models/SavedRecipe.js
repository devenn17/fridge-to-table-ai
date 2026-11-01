import { withDb } from "../data/store.js";

export function findByUser(userId) {
  return withDb((db) =>
    db.savedRecipes.filter((s) => s.userId === String(userId)).map((s) => s.recipeId)
  );
}

export function save(userId, recipeId) {
  return withDb((db) => {
    const exists = db.savedRecipes.some(
      (s) => s.userId === String(userId) && s.recipeId === recipeId
    );
    if (!exists) {
      db.savedRecipes.push({ userId: String(userId), recipeId, savedAt: new Date().toISOString() });
    }
    return true;
  });
}

export function unsave(userId, recipeId) {
  return withDb((db) => {
    db.savedRecipes = db.savedRecipes.filter(
      (s) => !(s.userId === String(userId) && s.recipeId === recipeId)
    );
    return true;
  });
}

export default { findByUser, save, unsave };
