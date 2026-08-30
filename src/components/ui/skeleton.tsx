export function SkeletonCard() {
  return (
    <div className="card-glow p-6 animate-pulse">
      <div className="h-52 rounded-t-xl bg-white/5 mb-4" />
      <div className="h-5 w-3/4 rounded bg-white/5 mb-3" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-5/6 rounded bg-white/5" />
      </div>
      <div className="flex gap-1.5 mt-4">
        <div className="h-6 w-16 rounded bg-white/5" />
        <div className="h-6 w-14 rounded bg-white/5" />
        <div className="h-6 w-20 rounded bg-white/5" />
      </div>
    </div>
  );
}

export function SkeletonAbout() {
  return (
    <div className="animate-pulse space-y-6 py-24">
      <div className="h-4 w-24 rounded bg-white/5" />
      <div className="h-10 w-64 rounded bg-white/5" />
      <div className="h-4 w-96 rounded bg-white/5" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-glow p-8">
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-3">
                <div className="h-5 w-32 rounded bg-white/5" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-3/4 rounded bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonContact() {
  return (
    <div className="animate-pulse py-24">
      <div className="h-4 w-20 rounded bg-white/5 mb-4" />
      <div className="h-10 w-80 rounded bg-white/5 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-white/5" />
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-white/5" />
                <div className="h-4 w-40 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-12 rounded-lg bg-white/5" />
            <div className="h-12 rounded-lg bg-white/5" />
          </div>
          <div className="h-12 rounded-lg bg-white/5" />
          <div className="h-32 rounded-lg bg-white/5" />
          <div className="h-12 w-36 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}
