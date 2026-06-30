'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, AnimatePresence } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface HeroSlide {
  image: string
  alt: string
}

/*
 * Foto brand sementara dari Unsplash (lisensi bebas) — ganti dengan foto
 * brand asli kapan saja. fill + object-cover menyesuaikan crop otomatis
 * antara mobile (portrait) dan desktop (landscape) dari container yang sama.
 */
const SLIDES: HeroSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1617391834151-3a12f8495ca3?w=1200&h=1800&fit=crop&q=80&auto=format',
    alt: 'Outfit floral retro — koleksi n1mpo',
  },
  {
    image: 'https://images.unsplash.com/photo-1578476719994-464aef88d2da?w=1200&h=1800&fit=crop&q=80&auto=format',
    alt: 'Outfit blazer editorial — koleksi n1mpo',
  },
  {
    image: 'https://images.unsplash.com/photo-1579460363654-292b70bae55f?w=1200&h=1800&fit=crop&q=80&auto=format',
    alt: 'Outfit cardigan earth tone — koleksi n1mpo',
  },
]

export function HeroFull() {
  const all = SLIDES
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (all.length <= 1) return
    const id = setInterval(() => setCurrent((c) => (c + 1) % all.length), 4500)
    return () => clearInterval(id)
  }, [all.length])

  return (
    <section className="relative h-dvh w-full overflow-hidden bg-charcoal">
      {/* Background image — crossfade */}
      <AnimatePresence initial={false}>
        <m.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={all[current].image}
            alt={all[current].alt}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority={current === 0}
          />
        </m.div>
      </AnimatePresence>

      {/* Gradient — lebih tebal di bawah untuk teks */}
      <div className="absolute inset-0 bg-linear-to-t from-charcoal/95 via-charcoal/25 to-charcoal/10" />

      {/* Konten */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-28 md:px-12 md:pb-20 lg:px-20">
        {/* Label brand */}
        <m.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-taupe"
        >
          {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
          n1mpo
        </m.p>

        {/* Headline */}
        <m.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-4xl font-semibold leading-[1.06] tracking-tight text-cream md:text-6xl lg:text-7xl"
        >
          Satu-satunya.
          <br />
          <span className="text-cream/75">Sekali habis,</span>
          <br />
          <span className="text-cream/50">hilang selamanya.</span>
        </m.h1>

        {/* CTA */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center rounded-full border border-cream/70 px-7 py-3 text-sm font-semibold text-cream backdrop-blur-sm transition-all duration-300 hover:bg-cream hover:text-charcoal"
          >
            Belanja Koleksi
          </Link>
        </m.div>

        {/* Dots + scroll hint */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-end justify-between"
        >
          {/* Slide dots */}
          <div className="flex items-center gap-1.5">
            {all.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  'h-0.5 rounded-full transition-all duration-400',
                  i === current ? 'w-7 bg-cream' : 'w-2.5 bg-cream/30',
                )}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <m.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-cream/40">
              Scroll
            </span>
            <ChevronDown className="h-3.5 w-3.5 text-cream/40" />
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
