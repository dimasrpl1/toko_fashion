'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'

interface Vibe {
  label: string
  sub: string
  href: string
  img: string
}

const VIBES: Vibe[] = [
  {
    label: 'Vintage',
    sub: 'Klasik & timeless',
    href: '/katalog?kategori=Vintage',
    img: 'https://placehold.co/600x800/D4C4A8/6B5A3E?text=Vintage',
  },
  {
    label: 'Streetwear',
    sub: 'Santai & berkelas',
    href: '/katalog?kategori=Streetwear',
    img: 'https://placehold.co/600x800/3D3B38/A18A6A?text=Streetwear',
  },
  {
    label: 'Feminine',
    sub: 'Lembut & elegan',
    href: '/katalog?kategori=Feminine',
    img: 'https://placehold.co/600x800/F0E4D4/A18A6A?text=Feminine',
  },
]

export function VibeTiles() {
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
            Shop by Vibe
          </h2>
          <p className="mt-1 text-sm text-warm-gray">
            Temukan look yang paling kamu.
          </p>
        </m.div>

        {/* Tiles grid */}
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 md:gap-3">
          {VIBES.map((vibe, i) => (
            <m.div
              key={vibe.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              /* Tile ke-3 full width di mobile */
              className={i === 2 ? 'col-span-2 md:col-span-1' : undefined}
            >
              <Link
                href={vibe.href}
                className="group relative block overflow-hidden rounded-xl"
              >
                {/* Gambar */}
                <div className={i === 2 ? 'aspect-[2/1] md:aspect-3/4' : 'aspect-3/4'}>
                  <Image
                    src={vibe.img}
                    alt={vibe.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-charcoal/25 transition-colors duration-300 group-hover:bg-charcoal/45" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/60">
                    {vibe.sub}
                  </p>
                  <p className="mt-0.5 text-lg font-semibold text-cream md:text-xl">
                    {vibe.label}
                  </p>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  )
}
