import { LayoutDashboard, ScanLine, Refrigerator, ChefHat, Globe } from "lucide-react";
import { NavLink } from "react-router-dom";

const menus = [
  { name: "Home", path: "/dashboard", icon: LayoutDashboard },
  { name: "Scan", path: "/scan", icon: ScanLine },
  { name: "Pantry", path: "/pantry", icon: Refrigerator },
  { name: "Recipes", path: "/recipes", icon: ChefHat },
  { name: "Cuisines", path: "/cuisines", icon: Globe },
];

export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#13211B] border-t border-white/10 flex items-stretch px-2 py-1.5 safe-bottom">
      {menus.map(({ name, path, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[11px] font-medium transition ${
              isActive ? "text-white bg-white/10" : "text-[#9FB0A3]"
            }`
          }
        >
          <Icon size={19} />
          {name}
        </NavLink>
      ))}
    </nav>
  );
}
