import { ProductCardSkeleton } from '@/components/katalog/product-card-skeleton'

export default function KatalogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      {/* Header skeleton */}
      <div className="mb-6 space-y-2">
        <div className="shimmer h-8 w-28 rounded" />
        <div className="shimmer h-4 w-20 rounded" />
      </div>

      {/* Filter skeleton */}
      <div className="shimmer h-12 rounded-xl md:h-[168px]" />

      {/* Grid skeleton */}
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
