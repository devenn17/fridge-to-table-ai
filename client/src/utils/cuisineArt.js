// Recipe "photos" are rendered as premium CSS gradients + emoji instead of
// hot-linked stock photos, so the app never depends on network image
// requests (no broken-image states, no rate limits, instant load).
const CUISINE_ART = {
  Indian: { gradient: "linear-gradient(135deg,#F4A24B,#C1503D)", emoji: "🍛" },
  Chinese: { gradient: "linear-gradient(135deg,#D9483F,#7A1F1F)", emoji: "🥢" },
  French: { gradient: "linear-gradient(135deg,#5B7FA6,#2F4A6B)", emoji: "🥐" },
  Italian: { gradient: "linear-gradient(135deg,#5FA35E,#C1503D)", emoji: "🍝" },
  "South Indian": { gradient: "linear-gradient(135deg,#3F7D58,#1F4A2E)", emoji: "🥥" },
  Mexican: { gradient: "linear-gradient(135deg,#E08E2E,#B24C4C)", emoji: "🌮" },
  American: { gradient: "linear-gradient(135deg,#5B5FA6,#2F3266)", emoji: "🍔" },
  Continental: { gradient: "linear-gradient(135deg,#6B7280,#374151)", emoji: "🍽️" },
  Fusion: { gradient: "linear-gradient(135deg,#8A6D3B,#3F7D58)", emoji: "🍲" },
};

const CATEGORY_FALLBACK = {
  desserts: { gradient: "linear-gradient(135deg,#E88AAE,#8A5FA6)", emoji: "🍰" },
  breakfast: { gradient: "linear-gradient(135deg,#F4C24B,#E08E2E)", emoji: "🍳" },
  snacks: { gradient: "linear-gradient(135deg,#E0B24E,#C1503D)", emoji: "🍿" },
};

export function artFor(recipe) {
  if (recipe?.categories?.includes("desserts")) return CATEGORY_FALLBACK.desserts;
  if (recipe?.cuisine && CUISINE_ART[recipe.cuisine]) return CUISINE_ART[recipe.cuisine];
  if (recipe?.categories?.includes("breakfast")) return CATEGORY_FALLBACK.breakfast;
  if (recipe?.categories?.includes("snacks")) return CATEGORY_FALLBACK.snacks;
  return CUISINE_ART.Continental;
}
