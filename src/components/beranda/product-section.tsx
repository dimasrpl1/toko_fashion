'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/katalog/product-card'
import type { Product } from '@/lib/types'

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

interface Props {
  title: string
  products: CardProduct[]
  linkHref: string
  linkLabel?: string
  showLimitedBadge?: boolean
  tinted?: boolean
}

export function ProductSection({
  title,
  products,
  linkHref,
  linkLabel = 'Lihat Semua',
  showLimitedBadge = false,
  tinted = false,
}: Props) {
  if (products.length === 0) return null

  return (
    <section className={tinted ? 'bg-warm-white' : undefined}>
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Header */}
        <div className="mb-7 flex items-center justify-between">
          <m.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-semibold text-charcoal md:text-2xl"
          >
            {title}
          </m.h2>

          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Link
              href={linkHref}
              className="flex items-center gap-1 text-sm text-warm-gray transition-colors hover:text-charcoal"
            >
              {linkLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </m.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
          {products.map((p, i) => (
            <m.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.07, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {showLimitedBadge && (
                <div className="absolute left-2 top-2 z-10 rounded-full bg-taupe/90 px-2.5 py-0.5 text-[10px] font-semibold leading-snug text-cream backdrop-blur-sm">
                  ⚡ Hanya 1
                </div>
              )}
              <ProductCard product={p} />
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
