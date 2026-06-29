'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/format'
import type { Product } from '@/lib/types'
import { WishlistButton } from '@/components/wishlist/wishlist-button'

// judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
const PLACEHOLDER = 'https://placehold.co/600x800/F4EFE7/8C8478?text=n1mpo'

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

export function ProductCard({ product }: { product: CardProduct }) {
  const img1   = product.images[0] ?? PLACEHOLDER
  const img2   = product.images[1] ?? null
  const isSold = product.status === 'sold'

  return (
    <article className="group overflow-hidden rounded-xl border border-soft-border bg-warm-white">
      <Link href={`/katalog/${product.slug}`} className="relative block aspect-3/4 overflow-hidden">
        <Image
          src={img1}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={cn('object-cover transition-opacity duration-300', img2 ? 'group-hover:opacity-0' : '')}
        />

        {img2 && (
          <Image
            src={img2}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80">
            <span className="text-xs font-semibold tracking-[0.2em] text-cream">TERJUAL</span>
          </div>
        )}

        {/* Wishlist button — muncul saat hover, selalu terlihat jika aktif */}
        <WishlistButton
          productId={product.id}
          size="sm"
          className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
        />
      </Link>

      <Link href={`/katalog/${product.slug}`} className="block p-3">
        <h3 className={cn('line-clamp-1 text-sm font-medium', isSold ? 'text-warm-gray' : 'text-charcoal')}>
          {product.title}
        </h3>
        <p className={cn('mt-1 text-sm font-semibold', isSold ? 'text-warm-gray line-through' : 'text-taupe')}>
          {formatPrice(product.price)}
        </p>
      </Link>
    </article>
  )
}
