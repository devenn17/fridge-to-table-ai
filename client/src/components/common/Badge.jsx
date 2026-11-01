export default function Badge({ icon, label, bg, text, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${className}`}
      style={{ backgroundColor: bg, color: text }}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}
