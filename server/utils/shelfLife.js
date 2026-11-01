/**
 * Shared expiry/status helpers used by the pantry API responses.
 * "Fresh" / "Expiring Soon" thresholds follow the project brief; "Expired"
 * is an extra tier so the UI still looks correct if a pantry item is left
 * long enough to lapse.
 */

export function daysUntil(expiresAt) {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffMs = expiry.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function statusFor(expiresAt) {
  const days = daysUntil(expiresAt);
  if (days <= 0) return "expired";
  if (days <= 3) return "expiring";
  return "fresh";
}

export function formatExpiryLabel(expiresAt) {
  const days = daysUntil(expiresAt);
  if (days <= 0) return days === 0 ? "Expires today" : `Expired ${Math.abs(days)} day(s) ago`;
  if (days === 1) return "Expires in 1 day";
  if (days <= 30) return `Expires in ${days} days`;
  const weeks = Math.round(days / 7);
  return weeks === 1 ? "Expires in 1 week" : `Expires in ${weeks} weeks`;
}

export function withComputedStatus(ingredient) {
  return {
    ...ingredient,
    daysUntilExpiry: daysUntil(ingredient.expiresAt),
    status: statusFor(ingredient.expiresAt),
    expiryLabel: formatExpiryLabel(ingredient.expiresAt),
  };
}

// Default shelf life in days per category, used as a fallback when the
// AI does not return a shelfLifeDays value for a detected item.
const CATEGORY_SHELF_LIFE = {
  vegetable: 7,
  fruit: 7,
  dairy: 10,
  egg: 21,
  drink: 180,
  meat: 3,
  seafood: 2,
  bakery: 5,
  frozen: 90,
  condiment: 180,
  other: 7,
};

/**
 * Returns the shelf life in days for a given food item.
 * Uses the AI-provided value if available and positive; otherwise falls
 * back to a per-category default.
 *
 * @param {string}      name     - The food name (reserved for future item-specific lookups)
 * @param {string}      category - One of the known food categories
 * @param {number|null} aiDays   - The value the AI returned (may be null/undefined)
 * @returns {number}
 */
export function getShelfLifeDays(name, category, aiDays) {
  if (aiDays != null && aiDays > 0) return aiDays;
  const cat = String(category || "other").toLowerCase();
  return CATEGORY_SHELF_LIFE[cat] ?? 7;
}
