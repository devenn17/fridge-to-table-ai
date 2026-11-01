const VARIANTS = {
  primary:
    "text-white shadow-sm hover:shadow-md hover:-translate-y-0.5",
  secondary:
    "bg-white text-[#1C2620] border border-[#E4E9E0] hover:bg-[#F3F6F1]",
  danger:
    "bg-[#C1503D] text-white hover:bg-[#A8432F]",
  ghost:
    "bg-transparent text-[#5B6B60] hover:bg-[#F3F6F1]",
};

const SIZES = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-5 py-3 text-sm gap-2",
  lg: "px-7 py-3.5 text-sm gap-2.5",
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  icon = null,
}) {
  const primaryStyle =
    variant === "primary"
      ? { background: "linear-gradient(135deg, #3F7D58, #2E5C41)" }
      : undefined;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={primaryStyle}
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}
