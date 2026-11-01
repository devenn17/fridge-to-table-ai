import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signIn(form);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6F2]">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0C1F16] p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600">
            <span className="text-xl">🌿</span>
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold text-white">FridgeAI</h1>
            <p className="text-[10px] font-medium tracking-[0.15em] text-emerald-400/80">
              KITCHEN ASSISTANT
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-4xl font-bold leading-tight text-white">
            Know what's in your
            <br />
            fridge, always.
          </h2>
          <p className="max-w-sm text-sm text-emerald-100/60">
            Scan your shelves, track your pantry, and get recipe ideas tailored to what you
            already have.
          </p>
        </div>

        <p className="text-xs text-emerald-100/40">
          © {new Date().getFullYear()} FridgeAI. All rights reserved.
        </p>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-600/20 blur-3xl" />
      </div>

      {/* Form panel */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="mb-1 font-serif text-3xl font-bold text-[#0C1F16]">Welcome back</h1>
          <p className="mb-8 text-sm text-gray-500">Log in to your FridgeAI account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="relative">
              <Lock size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in…" : "Login"}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-emerald-700 hover:text-emerald-800">
              Create Account
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-gray-400">
            Demo tip: register any email/password — this app runs on a local demo
            database, no real email is sent.
          </p>
        </div>
      </div>
    </div>
  );
}
