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

export function LimitedSection({ products }: Props) {
  if (products.length === 0) return null

  return (
    <section className="bg-warm-white py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe">
            ⚡ Limited Drop
          </p>
          <h2 className="mt-2 text-xl font-semibold text-charcoal md:text-2xl">
            🔥 Hampir Habis
          </h2>
          <p className="mt-1 text-sm text-warm-gray">
            Stok hanya 1. Kalau kamu mau, ambil sekarang sebelum hilang.
          </p>
        </m.div>

        {/* Grid produk */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {products.slice(0, 4).map((p, i) => (
            <m.div
              key={p.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.5,
                delay: Math.min(i * 0.08, 0.32),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              {/* FOMO badge */}
              <div className="absolute left-2 top-2 z-10 rounded-full bg-taupe/90 px-2.5 py-0.5 text-[10px] font-semibold leading-snug text-cream backdrop-blur-sm">
                ⚡ Hanya 1
              </div>
              <ProductCard product={p} />
            </m.div>
          ))}
        </div>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal px-7 py-3 text-sm font-semibold text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-cream"
          >
            Lihat Semua Koleksi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  )
}
