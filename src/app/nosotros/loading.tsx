export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        <div className="h-4 w-28 bg-rule/30 animate-pulse rounded mb-4" />
        <div className="h-14 w-[640px] max-w-full bg-rule/30 animate-pulse rounded mb-6" />
        <div className="h-5 w-[560px] max-w-full bg-rule/20 animate-pulse rounded" />
      </div>
    </div>
  );
}
