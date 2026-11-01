import {
  LayoutDashboard,
  ScanLine,
  Refrigerator,
  ChefHat,
  Globe,
  LogOut,
  Leaf,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menus = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={19} /> },
    { name: "Scan Fridge", path: "/scan", icon: <ScanLine size={19} /> },
    { name: "My Pantry", path: "/pantry", icon: <Refrigerator size={19} /> },
    { name: "Recipes", path: "/recipes", icon: <ChefHat size={19} /> },
    { name: "Cuisines", path: "/cuisines", icon: <Globe size={19} /> },
  ];

  return (
    <aside
      className="w-[270px] shrink-0 sticky top-0 h-screen flex flex-col text-[#EDF2EA] hidden md:flex"
      style={{ backgroundColor: "#13211B" }}
    >
      {/* Logo (fixed, never scrolls) */}
      <div className="h-24 shrink-0 border-b border-white/10 flex items-center px-8">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
        >
          <Leaf size={21} />
        </div>
        <div className="ml-4">
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            FridgeAI
          </h1>
          <p className="text-[10px] text-[#8FA398] font-mono uppercase tracking-[0.14em] mt-0.5">
            Kitchen Assistant
          </p>
        </div>
      </div>

      {/* Menu (this is the only part that scrolls) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-8 space-y-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                isActive
                  ? "text-white shadow-md"
                  : "text-[#9FB0A3] hover:bg-white/5 hover:text-white"
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }
                : undefined
            }
          >
            {menu.icon}
            {menu.name}
          </NavLink>
        ))}
      </div>

      {/* Logout (fixed, always visible) */}
      <div className="shrink-0 p-5 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full bg-[#C1503D] hover:bg-[#A8432F] rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-semibold transition duration-200"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
