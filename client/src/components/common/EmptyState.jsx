export default function EmptyState({ icon = "🗒️", title, description, action = null }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 animate-fade-in-up">
      <div className="w-20 h-20 rounded-2xl bg-[#F3F6F1] border border-[#E4E9E0] flex items-center justify-center text-4xl mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#1C2620] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#5B6B60] max-w-sm mb-6 leading-relaxed">{description}</p>
      )}
      {action}
    </div>
  );
}
