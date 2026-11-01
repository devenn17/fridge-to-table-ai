import { withDb, nextId } from "../data/store.js";

/** Find a user by email (case-insensitive). */
export function findByEmail(email) {
  return withDb(
    (db) =>
      db.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase()) ||
      null
  );
}

export function findById(id) {
  return withDb((db) => db.users.find((u) => u.id === String(id)) || null);
}

export function create({ name, email, password }) {
  return withDb((db) => {
    const user = {
      id: nextId(db, "users"),
      name,
      email,
      password, // already hashed by the caller
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return user;
  });
}

export default { findByEmail, findById, create };
