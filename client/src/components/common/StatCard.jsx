const ACCENTS = {
  basil: "#3F7D58",
  citrus: "#E08E2E",
  blueberry: "#5B5FA6",
  tomato: "#C1503D",
};

export default function StatCard({ title, value, icon, accent = "basil", suffix }) {
  const color = ACCENTS[accent] ?? ACCENTS.basil;

  return (
    <div className="relative bg-white rounded-2xl border border-[#E4E9E0] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 pt-8 pb-6 px-6">
      {/* pantry-label tab */}
      <div
        className="absolute -top-4 left-6 h-9 w-9 rounded-lg flex items-center justify-center text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-[#5B6B60] font-mono">
        {title}
      </p>

      <div className="mt-2 flex items-baseline gap-1.5">
        <h2 className="text-4xl font-bold text-[#1C2620] font-mono tabular-nums">
          {value}
        </h2>
        {suffix && (
          <span className="text-sm text-[#5B6B60] font-mono">{suffix}</span>
        )}
      </div>

      <div
        className="mt-4 h-[2px] w-10 rounded-full opacity-50"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}