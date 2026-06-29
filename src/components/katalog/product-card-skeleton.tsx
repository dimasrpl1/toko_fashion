export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-soft-border bg-warm-white">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-soft-border">
        <div className="shimmer absolute inset-0" />
      </div>
      {/* Info */}
      <div className="space-y-2 p-3">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-4 w-1/2 rounded" />
      </div>
    </div>
  )
}
