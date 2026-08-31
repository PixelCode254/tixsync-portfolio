export default function BlogPostLoading() {
  return (
    <div className="section-container py-20">
      <article className="max-w-3xl mx-auto">
        <div className="h-4 w-32 bg-white/5 rounded mb-6 animate-pulse" />
        <div className="h-10 w-full bg-white/5 rounded mb-3 animate-pulse" />
        <div className="h-4 w-48 bg-white/5 rounded mb-8 animate-pulse" />
        <div className="h-64 w-full bg-white/5 rounded-lg mb-8 animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 bg-white/5 rounded animate-pulse" style={{ width: `${80 + Math.random() * 20}%` }} />
          ))}
        </div>
      </article>
    </div>
  );
}
