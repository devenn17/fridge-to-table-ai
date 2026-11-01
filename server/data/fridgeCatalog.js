/**
 * The FIXED detection catalog for the single demo refrigerator photo.
 *
 * This app intentionally does NOT run real computer vision. Every "scan"
 * of the one reference fridge image detects this exact predefined set of
 * ingredients — that's the whole point of the demo (see project brief).
 *
 * shelfLifeRange / confidenceRange are used to add a touch of realistic
 * randomness (expiry dates, confidence %) on every scan, without ever
 * changing WHICH ingredients are detected.
 */

export const CATEGORIES = [
  { key: "dairy", label: "Dairy", icon: "🥛" },
  { key: "egg", label: "Eggs", icon: "🥚" },
  { key: "vegetable", label: "Vegetables", icon: "🥬" },
  { key: "fruit", label: "Fruits", icon: "🍎" },
  { key: "meat", label: "Meat", icon: "🥩" },
  { key: "drink", label: "Drinks", icon: "🥤" },
  { key: "sauce", label: "Sauces", icon: "🧂" },
];

export const FRIDGE_CATALOG = [
  // Dairy
  { name: "milk", label: "Milk", category: "dairy", icon: "🥛", quantity: 2, unit: "bottles", shelfLifeRange: [4, 7] },
  { name: "paneer", label: "Paneer", category: "dairy", icon: "🧈", quantity: 1, unit: "block (200g)", shelfLifeRange: [5, 8] },
  { name: "cheese", label: "Cheese", category: "dairy", icon: "🧀", quantity: 8, unit: "cubes", shelfLifeRange: [10, 20] },

  // Eggs
  { name: "eggs", label: "Eggs", category: "egg", icon: "🥚", quantity: 6, unit: "eggs", shelfLifeRange: [12, 24] },

  // Vegetables
  { name: "spinach", label: "Spinach", category: "vegetable", icon: "🥬", quantity: 1, unit: "bunch", shelfLifeRange: [3, 6] },
  { name: "cherry tomatoes", label: "Cherry Tomatoes", category: "vegetable", icon: "🍅", quantity: 12, unit: "pieces", shelfLifeRange: [5, 9] },
  { name: "carrots", label: "Carrots", category: "vegetable", icon: "🥕", quantity: 6, unit: "pieces", shelfLifeRange: [10, 18] },
  { name: "cucumber", label: "Cucumber", category: "vegetable", icon: "🥒", quantity: 2, unit: "pieces", shelfLifeRange: [5, 9] },
  { name: "broccoli", label: "Broccoli", category: "vegetable", icon: "🥦", quantity: 1, unit: "head", shelfLifeRange: [5, 8] },
  { name: "red bell pepper", label: "Red Bell Pepper", category: "vegetable", icon: "🫑", quantity: 1, unit: "piece", shelfLifeRange: [7, 12] },
  { name: "yellow bell pepper", label: "Yellow Bell Pepper", category: "vegetable", icon: "🫑", quantity: 1, unit: "piece", shelfLifeRange: [7, 12] },
  { name: "orange bell pepper", label: "Orange Bell Pepper", category: "vegetable", icon: "🫑", quantity: 1, unit: "piece", shelfLifeRange: [7, 12] },

  // Fruits
  { name: "strawberries", label: "Strawberries", category: "fruit", icon: "🍓", quantity: 10, unit: "pieces", shelfLifeRange: [3, 6] },
  { name: "blueberries", label: "Blueberries", category: "fruit", icon: "🫐", quantity: 1, unit: "cup", shelfLifeRange: [5, 9] },
  { name: "red grapes", label: "Red Grapes", category: "fruit", icon: "🍇", quantity: 1, unit: "bunch", shelfLifeRange: [5, 9] },
  { name: "lemon", label: "Lemon", category: "fruit", icon: "🍋", quantity: 2, unit: "pieces", shelfLifeRange: [10, 18] },
  { name: "watermelon", label: "Watermelon", category: "fruit", icon: "🍉", quantity: 1, unit: "container (cubed)", shelfLifeRange: [3, 6] },
  { name: "orange", label: "Orange", category: "fruit", icon: "🍊", quantity: 3, unit: "pieces", shelfLifeRange: [10, 18] },

  // Meat
  { name: "sliced chicken breast", label: "Sliced Chicken Breast", category: "meat", icon: "🍗", quantity: 1, unit: "pack (200g)", shelfLifeRange: [1, 3] },
  { name: "rolled ham", label: "Rolled Ham / Cold Cuts", category: "meat", icon: "🥓", quantity: 6, unit: "slices", shelfLifeRange: [4, 7] },

  // Drinks
  { name: "orange juice", label: "Orange Juice", category: "drink", icon: "🧃", quantity: 1, unit: "bottle", shelfLifeRange: [5, 10] },
  { name: "green juice", label: "Green Juice", category: "drink", icon: "🧃", quantity: 1, unit: "bottle", shelfLifeRange: [3, 6] },
  { name: "sparkling water", label: "Sparkling Water", category: "drink", icon: "🍾", quantity: 2, unit: "bottles", shelfLifeRange: [60, 180] },
  { name: "soft drink cans", label: "Soft Drink Cans", category: "drink", icon: "🥤", quantity: 8, unit: "cans", shelfLifeRange: [90, 270] },

  // Sauces
  { name: "soy sauce", label: "Soy Sauce", category: "sauce", icon: "🍶", quantity: 1, unit: "bottle", shelfLifeRange: [120, 365] },
  { name: "orange sauce", label: "Orange Sauce", category: "sauce", icon: "🍯", quantity: 1, unit: "bottle", shelfLifeRange: [60, 180] },
  { name: "brown sauce", label: "Brown Sauce", category: "sauce", icon: "🍯", quantity: 1, unit: "bottle", shelfLifeRange: [60, 180] },
];

// Only these four items are ever eligible to come back spoiled — matches
// the project brief exactly. Everything else in the catalog is always fresh.
export const SPOILED_CANDIDATES = [
  { name: "cherry tomatoes", reasons: ["Mold", "Rotten"] },
  { name: "lemon", reasons: ["Mold"] },
  { name: "broccoli", reasons: ["Rotten", "Mold"] },
  { name: "watermelon", reasons: ["Rotten", "Mold"] },
];

export function findCatalogItem(name) {
  return FRIDGE_CATALOG.find((i) => i.name === name.toLowerCase());
}
