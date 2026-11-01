/**
 * Lightweight JSON-file backed data store.
 *
 * This demo app deliberately avoids a real database (MongoDB, etc.) so it
 * runs anywhere with zero external services and no credentials to leak.
 * All reads/writes go through this module so it's a one-file swap if a
 * real database is ever wanted later.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, "db.json");

const DEFAULT_DB = {
  users: [],
  ingredients: [],
  savedRecipes: [],
  cachedRecipes: [],   // per-user AI recipe cache
  cuisineCache: [],    // per-user per-cuisine cache
  seq: { users: 0, ingredients: 0 },
};

function load() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DB, null, 2));
  }
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_DB,
      ...parsed,
      seq: { ...DEFAULT_DB.seq, ...(parsed.seq || {}) },
    };
  } catch {
    return { ...DEFAULT_DB };
  }
}

function persist(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// A simple in-process write queue keeps concurrent async handlers from
// clobbering each other's writes (awaits between read/mutate/write can
// otherwise interleave on the same file).
let queue = Promise.resolve();
export function withDb(mutator) {
  queue = queue.then(async () => {
    const db = load();
    const result = await mutator(db);
    persist(db);
    return result;
  });
  return queue;
}

export function nextId(db, collection) {
  db.seq[collection] = (db.seq[collection] || 0) + 1;
  return String(db.seq[collection]);
}
