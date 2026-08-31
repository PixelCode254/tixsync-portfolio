export default function BlogLoading() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <div className="h-8 w-32 bg-white/5 rounded mb-6 animate-pulse" />
        <div className="h-10 w-3/4 bg-white/5 rounded mb-4 animate-pulse" />
        <div className="h-4 w-48 bg-white/5 rounded mb-8 animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
