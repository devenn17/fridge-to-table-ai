import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Search, ArrowDownUp } from "lucide-react";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import PantryCard from "../components/pantry/PantryCard";
import EmptyState from "../components/common/EmptyState";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Button from "../components/common/Button";
import { SkeletonGrid } from "../components/common/Skeleton";
import { CATEGORY_META } from "../utils/categories";
import API from "../services/api";

const SORT_OPTIONS = [
  { value: "expiry", label: "Expiry (soonest first)" },
  { value: "name", label: "Name (A-Z)" },
  { value: "category", label: "Category" },
  { value: "recent", label: "Recently added" },
];

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "fresh", label: "🟢 Fresh" },
  { value: "expiring", label: "🟡 Expiring Soon" },
];

export default function Pantry() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("expiry");
  const [pendingDelete, setPendingDelete] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await API.get("/ingredients");
      setIngredients(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load pantry");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDeleteConfirmed = async () => {
    if (!pendingDelete) return;
    try {
      await API.delete(`/ingredients/${pendingDelete.id}`);
      setIngredients((prev) => prev.filter((i) => i.id !== pendingDelete.id));
      toast.success(`${pendingDelete.label || pendingDelete.name} removed`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item");
    } finally {
      setPendingDelete(null);
    }
  };

  const categories = useMemo(
    () => ["all", ...new Set(ingredients.map((i) => i.category).filter(Boolean))],
    [ingredients]
  );

  const filtered = useMemo(() => {
    let list = [...ingredients];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((i) => (i.label || i.name).toLowerCase().includes(q));
    }
    if (categoryFilter !== "all") {
      list = list.filter((i) => i.category === categoryFilter);
    }
    if (statusFilter !== "all") {
      list = list.filter((i) => i.status === statusFilter);
    }

    list.sort((a, b) => {
      if (sortBy === "name") return (a.label || a.name).localeCompare(b.label || b.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      if (sortBy === "recent") return new Date(b.addedAt) - new Date(a.addedAt);
      return new Date(a.expiresAt) - new Date(b.expiresAt); // expiry (default)
    });

    return list;
  }, [ingredients, query, categoryFilter, statusFilter, sortBy]);

  return (
    <DashboardLayout
      title="My Pantry"
      subtitle={`${ingredients.length} ingredient${ingredients.length === 1 ? "" : "s"} on hand`}
    >
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A968C]" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
            }}
            placeholder="Search your pantry..."
            className="w-full rounded-xl border border-[#E4E9E0] bg-[#FAFBF9] pl-11 pr-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
          />
        </div>

        <div className="relative">
          <ArrowDownUp size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A968C] pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-xl border border-[#E4E9E0] bg-[#FAFBF9] pl-9 pr-4 py-3 text-sm outline-none focus:border-emerald-500 cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-colors flex items-center gap-1.5 ${
                categoryFilter === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-emerald-50"
              }`}
            >
              {cat !== "all" && <span>{CATEGORY_META[cat]?.icon}</span>}
              {cat === "all" ? "All Categories" : CATEGORY_META[cat]?.label || cat}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === s.value
                  ? "bg-[#1C2620] text-white"
                  : "bg-[#F3F6F1] text-[#5B6B60] hover:bg-[#E9EFE6]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={8} className="sm:grid-cols-2 lg:grid-cols-4" />
      ) : ingredients.length === 0 ? (
        <EmptyState
          icon="📭"
          title="Your pantry is empty"
          description="Scan your fridge to automatically detect and save healthy ingredients here."
          action={
            <Button onClick={() => (window.location.href = "/scan")}>Scan Your Fridge</Button>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching ingredients"
          description="Try adjusting your search, category, or status filters."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <PantryCard key={item.id} item={item} onDelete={setPendingDelete} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove this ingredient?"
        description={`"${pendingDelete?.label || pendingDelete?.name}" will be permanently removed from your pantry.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setPendingDelete(null)}
      />
    </DashboardLayout>
  );
}
