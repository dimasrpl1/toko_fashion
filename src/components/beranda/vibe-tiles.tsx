'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'

interface Props {
  categories: string[]
}

/*
 * Foto tile berputar (Unsplash, sementara) — kategori datang dinamis dari DB
 * jadi tidak bisa dipetakan 1:1, foto dirotasi agar tetap terasa editorial.
 * Ganti dengan foto brand asli per kategori kapan saja.
 */
const TILE_IMAGES = [
  'https://images.unsplash.com/photo-1505846951821-e25bacf2eccd?w=1000&h=1300&fit=crop&q=80&auto=format',
  'https://images.unsplash.com/photo-1557433841-e964bdf8c263?w=1000&h=1300&fit=crop&q=80&auto=format',
  'https://images.unsplash.com/photo-1581015053883-df23bd1338b0?w=1000&h=1300&fit=crop&q=80&auto=format',
  'https://images.unsplash.com/photo-1617690032703-f991ed0e0ee6?w=1000&h=1300&fit=crop&q=80&auto=format',
]

export function VibeTiles({ categories }: Props) {
  if (categories.length === 0) return null

  /* Maksimal 4 kategori agar grid tidak terlalu ramai */
  const displayed = categories.slice(0, 4)
  const isOdd = displayed.length % 2 !== 0

  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7"
        >
          <h2 className="text-xl font-semibold text-charcoal md:text-2xl">
            Shop by Category
          </h2>
          <p className="mt-1 text-sm text-warm-gray">
            Temukan look yang paling kamu.
          </p>
        </m.div>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-2.5 md:gap-3">
          {displayed.map((cat, i) => {
            /* Tile terakhir full-width di mobile jika hitungan ganjil */
            const isLast    = i === displayed.length - 1
            const colSpan   = isLast && isOdd ? 'col-span-2 md:col-span-1' : undefined
            const tileImage = TILE_IMAGES[i % TILE_IMAGES.length]

            return (
              <m.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={colSpan}
              >
                <Link
                  href={`/katalog?kategori=${encodeURIComponent(cat)}`}
                  className="group relative block overflow-hidden rounded-xl"
                >
                  <div
                    className={
                      isLast && isOdd ? 'aspect-2/1 md:aspect-3/4' : 'aspect-3/4'
                    }
                  >
                    <Image
                      src={tileImage}
                      alt={cat}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-charcoal/20 transition-colors duration-300 group-hover:bg-charcoal/40" />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/60">
                      Koleksi
                    </p>
                    <p className="mt-0.5 text-lg font-semibold text-cream md:text-xl">
                      {cat}
                    </p>
                  </div>
                </Link>
              </m.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
