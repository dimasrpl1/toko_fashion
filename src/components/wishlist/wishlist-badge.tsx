'use client'

import { useWishlistStore } from '@/store/wishlist-store'

/** Badge jumlah item wishlist — hanya render jika count > 0 dan store sudah loaded. */
export function WishlistBadge() {
  const count    = useWishlistStore((s) => s.ids.size)
  const isLoaded = useWishlistStore((s) => s.isLoaded)

  if (!isLoaded || count === 0) return null

  return (
    <span
      aria-label={`${count} item di wishlist`}
      className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-taupe px-1 text-[10px] font-bold leading-none text-cream"
    >
      {count > 9 ? '9+' : count}
    </span>
  )
}
