export default function DetailProdukLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <div className="gap-10 md:grid md:grid-cols-2 lg:gap-14">
        {/* Galeri skeleton */}
        <div className="shimmer aspect-3/4 rounded-2xl" />

        {/* Info skeleton */}
        <div className="mt-6 space-y-4 md:mt-0">
          <div className="shimmer h-8 w-3/4 rounded-lg" />
          <div className="shimmer h-6 w-1/3 rounded-lg" />
          <div className="shimmer h-4 w-1/4 rounded-full" />
          <div className="flex gap-2">
            <div className="shimmer h-7 w-20 rounded-full" />
            <div className="shimmer h-7 w-24 rounded-full" />
          </div>
          <div className="shimmer h-px w-full" />
          <div className="space-y-2">
            <div className="shimmer h-4 w-full rounded" />
            <div className="shimmer h-4 w-5/6 rounded" />
            <div className="shimmer h-4 w-4/6 rounded" />
          </div>
          <div className="space-y-3 pt-2">
            <div className="shimmer h-12 rounded-xl" />
            <div className="shimmer h-14 rounded-xl" />
            <div className="shimmer h-12 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
