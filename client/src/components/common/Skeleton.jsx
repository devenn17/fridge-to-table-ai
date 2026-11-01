export function SkeletonBlock({ className = "" }) {
  return <div className={`skeleton rounded-xl ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#E4E9E0] p-5 space-y-3">
      <SkeletonBlock className="h-28 w-full" />
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-3 w-1/2" />
      <div className="flex gap-2 pt-1">
        <SkeletonBlock className="h-6 w-16" />
        <SkeletonBlock className="h-6 w-16" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, className = "" }) {
  return (
    <div className={`grid gap-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
