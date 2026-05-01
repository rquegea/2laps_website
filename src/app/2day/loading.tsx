export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 sm:pt-8 pb-3">
        <div className="h-12 w-24 bg-rule/30 animate-pulse rounded" />
        <div className="mt-4 h-px bg-rule/60" />
      </div>
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-8">
            <div className="h-[380px] bg-rule/20 animate-pulse rounded-lg" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-48 bg-rule/20 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            <div className="h-48 bg-rule/20 animate-pulse rounded-lg" />
            <div className="h-48 bg-rule/20 animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
