import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F6F2] text-center px-6">
      <p className="text-6xl mb-4">🧭</p>
      <h1 className="text-2xl font-bold text-[#0C1F16]">Page not found</h1>
      <p className="text-sm text-gray-500 mt-2 max-w-sm">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition"
      >
        Back to Login
      </Link>
    </div>
  );
}
