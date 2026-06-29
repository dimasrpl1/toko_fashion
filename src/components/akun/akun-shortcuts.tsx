'use client'

import Link from 'next/link'
import { Heart, ChevronRight } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'

export function AkunShortcuts() {
  const count    = useWishlistStore((s) => s.ids.size)
  const isLoaded = useWishlistStore((s) => s.isLoaded)

  return (
    <div className="rounded-2xl border border-soft-border bg-warm-white">
      <Link
        href="/akun/wishlist"
        className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-soft-border/40"
      >
        <Heart className="h-5 w-5 shrink-0 text-taupe" />
        <span className="flex-1 text-sm font-medium text-charcoal">Wishlist</span>
        {isLoaded && count > 0 && (
          <span className="rounded-full bg-taupe/10 px-2.5 py-0.5 text-xs font-semibold text-taupe">
            {count} item
          </span>
        )}
        <ChevronRight className="h-4 w-4 text-warm-gray" />
      </Link>
    </div>
  )
}
