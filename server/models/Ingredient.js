import { withDb, nextId } from "../data/store.js";

/**
 * Pantry ingredient "model". Fields:
 *  id, userId, name, category, icon, quantity, unit,
 *  shelfLifeDays, expiresAt (ISO string), addedAt (ISO string)
 *
 * Spoiled items are never written here — the scan flow filters them out
 * before anything reaches this store (see routes/scanRoutes.js).
 */

export function findByUser(userId) {
  return withDb((db) =>
    db.ingredients
      .filter((i) => i.userId === String(userId))
      .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt))
  );
}

export function findOne(userId, name) {
  return withDb(
    (db) =>
      db.ingredients.find(
        (i) => i.userId === String(userId) && i.name.toLowerCase() === name.toLowerCase()
      ) || null
  );
}

export function upsertMany(userId, items) {
  return withDb((db) => {
    const saved = [];
    for (const item of items) {
      const existing = db.ingredients.find(
        (i) => i.userId === String(userId) && i.name.toLowerCase() === item.name.toLowerCase()
      );
      if (existing) {
        existing.quantity = item.quantity ?? existing.quantity;
        existing.expiresAt = item.expiresAt;
        existing.shelfLifeDays = item.shelfLifeDays;
        existing.category = item.category;
        existing.icon = item.icon;
        existing.unit = item.unit;
        saved.push(existing);
      } else {
        const record = {
          id: nextId(db, "ingredients"),
          userId: String(userId),
          addedAt: new Date().toISOString(),
          ...item,
        };
        db.ingredients.push(record);
        saved.push(record);
      }
    }
    return saved;
  });
}

export function remove(id) {
  return withDb((db) => {
    const idx = db.ingredients.findIndex((i) => i.id === String(id));
    if (idx === -1) return false;
    db.ingredients.splice(idx, 1);
    return true;
  });
}

export function removeAllForUser(userId) {
  return withDb((db) => {
    db.ingredients = db.ingredients.filter((i) => i.userId !== String(userId));
    return true;
  });
}

export default { findByUser, findOne, upsertMany, remove, removeAllForUser };
