import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Refrigerator, ChefHat, ScanLine, Clock3 } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/common/StatCard";
import { SkeletonBlock } from "../components/common/Skeleton";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { categoryMeta } from "../utils/categories";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pantry, setPantry] = useState([]);
  const [recipeCategoryCount, setRecipeCategoryCount] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [pantryRes, recipesRes] = await Promise.all([
          API.get("/ingredients"),
          API.get("/recipes"),
        ]);
        setPantry(pantryRes.data);
        // Only count categories that actually have a recipe in them right
        // now — with an empty pantry this is 0, and it grows as the pantry
        // fills up, instead of always showing all 17 category definitions.
        const nonEmptyCategories = recipesRes.data.categories?.filter(
          (c) => c.recipes.length > 0
        );
        setRecipeCategoryCount(nonEmptyCategories?.length || 0);
        const unique = new Set();
        recipesRes.data.categories?.forEach((c) => c.recipes.forEach((r) => unique.add(r.id)));
        setTotalRecipes(unique.size);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const expiringSoon = pantry.filter((i) => i.status === "expiring" || i.status === "expired").length;
  const recentActivity = [...pantry]
    .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    .slice(0, 4);

  return (
    <DashboardLayout>
      <div className="mb-10">
        <h3 className="text-2xl font-semibold text-[#1C2620] tracking-tight">
          Hello,{" "}
          <span className="italic" style={{ color: "#3F7D58" }}>
            {user?.name}
          </span>
        </h3>
        <p className="text-[#5B6B60] mt-2">Here's what's fresh in your kitchen today.</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonBlock key={i} className="h-32" />)
        ) : (
          <>
            <StatCard title="Pantry Items" value={pantry.length} icon={<Refrigerator size={16} />} accent="basil" />
            <StatCard title="Recipe Categories" value={recipeCategoryCount} suffix={`· ${totalRecipes} recipes`} icon={<ChefHat size={16} />} accent="citrus" />
            <StatCard title="Fresh Items" value={pantry.filter((i) => i.status === "fresh").length} icon={<ScanLine size={16} />} accent="blueberry" />
            <StatCard title="Expiring Soon" value={expiringSoon} icon={<Clock3 size={16} />} accent="tomato" />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div
          className="rounded-2xl p-8 text-white shadow-md relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-white/70 mb-2">
            Fridge Scanner
          </p>
          <h2 className="text-2xl font-semibold" style={{ fontFamily: "'Fraunces', serif" }}>
            Scan your fridge, meet your ingredients
          </h2>
          <p className="mt-3 text-white/85 text-sm leading-relaxed max-w-sm">
            Run a scan on your reference fridge photo and let the app catalog what's inside —
            no typing required.
          </p>
          <button
            onClick={() => navigate("/scan")}
            className="mt-6 bg-white text-[#2E5C41] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/90 transition"
          >
            Scan now
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E4E9E0] p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#5B6B60] mb-5">
            Recent Activity
          </p>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonBlock key={i} className="h-12" />
              ))}
            </div>
          ) : recentActivity.length === 0 ? (
            <p className="text-sm text-[#8A968C]">
              No activity yet — scan your fridge to get started.
            </p>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#E4E9E0] bg-[#FAFBF9]"
                >
                  <span className="text-lg">{categoryMeta(item.category).icon}</span>
                  <span className="text-sm text-[#1C2620] font-medium capitalize">
                    {item.label || item.name} added to pantry
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
