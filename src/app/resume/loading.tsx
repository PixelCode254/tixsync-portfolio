export default function ResumeLoading() {
  return (
    <div className="section-container py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-64 bg-white/5 rounded mb-2 animate-pulse" />
            <div className="h-5 w-48 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
