'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'

interface Props {
  image: string | null
  slug: string | null
}

// judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
const PLACEHOLDER = 'https://placehold.co/800x1000/211F1C/A18A6A?text=n1mpo'

export function EditorialBlock({ image, slug }: Props) {
  const img  = image ?? PLACEHOLDER
  const href = slug ? `/katalog/${slug}` : '/katalog'

  return (
    <section className="overflow-hidden bg-charcoal">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Gambar — kiri di desktop, atas di mobile */}
        <m.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-3/4 overflow-hidden md:aspect-auto md:min-h-[600px]"
        >
          <Image
            src={img}
            alt="Editorial"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        </m.div>

        {/* Teks — kanan di desktop */}
        <div className="flex flex-col justify-center px-8 py-14 md:px-14 lg:px-20">
          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe"
          >
            Koleksi Terkini
          </m.p>

          <m.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-cream md:text-5xl"
          >
            Setiap outfit
            <br />
            punya satu
            <br />
            <span className="text-cream/60">pemilik.</span>
          </m.h2>

          <m.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-[30ch] text-base leading-relaxed text-cream/50"
          >
            Dipilih satu per satu, distyling dengan penuh niat.
            Bukan dari pabrik, bukan untuk semua orang.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <Link
              href={href}
              className="inline-flex items-center rounded-full border border-taupe/60 px-7 py-3 text-sm font-semibold text-taupe transition-all duration-300 hover:border-cream hover:text-cream"
            >
              Jelajahi Koleksi →
            </Link>
          </m.div>
        </div>
      </div>
    </section>
  )
}
