// Shared category metadata so Scan / Pantry / Dashboard all render
// ingredient categories consistently.
export const CATEGORY_META = {
  dairy: { label: "Dairy", icon: "🥛", color: "#5B7FA6", bg: "#EAF1FA", text: "#2F5580" },
  egg: { label: "Eggs", icon: "🥚", color: "#C79A3B", bg: "#FBF3E1", text: "#8A6516" },
  vegetable: { label: "Vegetable", icon: "🥬", color: "#3F7D58", bg: "#E7F3EA", text: "#2E5C41" },
  fruit: { label: "Fruit", icon: "🍎", color: "#D9714E", bg: "#FBEAE3", text: "#B5502F" },
  meat: { label: "Meat", icon: "🥩", color: "#B24C4C", bg: "#FAE7E7", text: "#8F3535" },
  seafood: { label: "Seafood", icon: "🦐", color: "#2E7B8A", bg: "#E3F3F7", text: "#1C5E6E" },
  drink: { label: "Drink", icon: "🥤", color: "#5B5FA6", bg: "#ECEDFA", text: "#3F4380" },
  bakery: { label: "Bakery", icon: "🍞", color: "#A0783A", bg: "#F7EFE0", text: "#7A5820" },
  frozen: { label: "Frozen", icon: "🧊", color: "#4A7FA8", bg: "#E0EEF7", text: "#2A5F8A" },
  condiment: { label: "Condiment", icon: "🧂", color: "#8A6D3B", bg: "#F5EEE0", text: "#6B5024" },
  sauce: { label: "Sauce", icon: "🧂", color: "#8A6D3B", bg: "#F5EEE0", text: "#6B5024" },
  other: { label: "Other", icon: "🍽️", color: "#6B7280", bg: "#F1F2F4", text: "#4B5563" },
};

export function categoryMeta(category) {
  return CATEGORY_META[category] || CATEGORY_META.other;
}

export const STATUS_META = {
  fresh: { label: "Fresh", icon: "🟢", color: "#2E7D4F", bg: "#E7F5EC", text: "#1E6B3D" },
  expiring: { label: "Expiring Soon", icon: "🟡", color: "#C79A1F", bg: "#FDF6E3", text: "#8A6A0F" },
  expired: { label: "Expired", icon: "🔴", color: "#C1503D", bg: "#FBEAE7", text: "#A8432F" },
};

export function statusMeta(status) {
  return STATUS_META[status] || STATUS_META.fresh;
}
