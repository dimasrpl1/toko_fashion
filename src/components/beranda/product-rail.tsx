'use client'

import Link from 'next/link'
import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/katalog/product-card'
import type { Product } from '@/lib/types'

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

interface Props {
  products: CardProduct[]
}

export function ProductRail({ products }: Props) {
  if (products.length === 0) return null

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between px-4 md:px-0">
          <m.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl font-semibold text-charcoal md:text-2xl"
          >
            Baru Drop
          </m.h2>

          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <Link
              href="/katalog"
              className="flex items-center gap-1 text-sm text-warm-gray transition-colors hover:text-charcoal"
            >
              Lihat Semua
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </m.div>
        </div>

        {/* Rail — horizontal scroll */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="scrollbar-hide overflow-x-auto px-4 md:px-0"
        >
          <div className="flex gap-3 md:gap-4" style={{ width: 'max-content' }}>
            {products.map((p) => (
              <div key={p.id} className="w-[43vw] max-w-[200px] shrink-0 md:w-52">
                <ProductCard product={p} />
              </div>
            ))}
            {/* Link ke katalog di ujung rail */}
            <div className="flex w-[43vw] max-w-[200px] shrink-0 items-center justify-center md:w-52">
              <Link
                href="/katalog"
                className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-soft-border text-center text-sm text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
                style={{ minHeight: '260px' }}
              >
                <ArrowRight className="h-5 w-5" />
                <span>Lihat<br />Semua</span>
              </Link>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
