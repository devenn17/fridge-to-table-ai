import { useState } from "react";
import { Bell, Search, UserCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/pantry?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="h-24 bg-white border-b border-[#E4E9E0] flex items-center justify-between px-5 md:px-10">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="text-xl md:text-2xl font-semibold text-[#1C2620] tracking-tight truncate">
          Welcome back
        </h1>
        <p className="text-[#5B6B60] mt-1 text-sm truncate">
          Have a healthy day,{" "}
          <span className="font-semibold italic" style={{ fontFamily: "'Fraunces', serif", color: "#3F7D58" }}>
            {user?.name}
          </span>
        </p>
      </div>

      {/* Center */}
      <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-[#F3F6F1] border border-[#E4E9E0] rounded-xl px-5 py-3 w-[420px]">
        <Search size={18} className="text-[#5B6B60]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pantry ingredients..."
          className="bg-transparent ml-3 outline-none w-full text-sm text-[#1C2620] placeholder:text-[#8A968C]"
        />
      </form>

      {/* Right */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <button className="hidden sm:flex relative w-11 h-11 rounded-xl bg-[#F3F6F1] hover:bg-[#E9EFE6] transition items-center justify-center border border-[#E4E9E0]">
          <Bell size={19} className="text-[#1C2620]" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-[#C1503D]" />
        </button>

        <button
          onClick={() => navigate("/scan")}
          className="hidden sm:flex w-11 h-11 rounded-xl text-white items-center justify-center shadow-sm"
          style={{ background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }}
          title="Scan Fridge"
        >
          <Sparkles size={19} />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-[#E4E9E0]">
          <UserCircle2 size={40} className="text-[#1C2620]" strokeWidth={1.5} />
          <div className="hidden sm:block">
            <h3 className="font-semibold text-sm text-[#1C2620]">{user?.name}</h3>
            <p className="text-[10px] text-[#5B6B60] font-mono uppercase tracking-wide">
              Demo User
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
