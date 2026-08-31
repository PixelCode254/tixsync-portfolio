export default function PortfolioLoading() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <div className="h-4 w-32 bg-white/5 rounded mb-6 animate-pulse" />
        <div className="h-10 w-3/4 bg-white/5 rounded mb-4 animate-pulse" />
        <div className="h-4 w-64 bg-white/5 rounded mb-8 animate-pulse" />
        <div className="h-80 w-full bg-white/5 rounded-lg mb-8 animate-pulse" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${75 + Math.random() * 25}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
