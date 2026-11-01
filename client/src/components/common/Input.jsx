export default function Input({ icon = null, className = "", ...props }) {
  if (!icon) {
    return (
      <input
        {...props}
        className={`w-full border border-gray-200 rounded-xl px-4 py-3 outline-none text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition ${className}`}
      />
    );
  }

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        className={`w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition ${className}`}
      />
    </div>
  );
}
