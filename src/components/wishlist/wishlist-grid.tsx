'use client'

import { m, AnimatePresence } from 'motion/react'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist-store'
import { ProductCard } from '@/components/katalog/product-card'
import type { Product } from '@/lib/types'

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

interface Props {
  products: CardProduct[]
}

export function WishlistGrid({ products }: Props) {
  const ids      = useWishlistStore((s) => s.ids)
  const isLoaded = useWishlistStore((s) => s.isLoaded)

  // Sebelum store terload, tampilkan semua produk server-rendered (tidak ada flash).
  // Setelah terload, filter hanya yang masih di wishlist (tangani optimistic remove).
  const visible = isLoaded
    ? products.filter((p) => ids.has(p.id))
    : products

  if (visible.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-soft-border">
          <Heart className="h-8 w-8 text-warm-gray" />
        </div>
        <h2 className="text-base font-medium text-charcoal">Wishlist masih kosong</h2>
        <p className="mt-1 text-sm text-warm-gray">
          Tekan ikon hati di katalog untuk menyimpan outfit favorit.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
      <AnimatePresence mode="popLayout">
        {visible.map((product) => (
          <m.div
            key={product.id}
            layout
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ProductCard product={product} />
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
