'use client'

import { m } from 'motion/react'
import Link from 'next/link'

export function BrandBlurb() {
  return (
    <m.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-y border-soft-border bg-warm-white py-14 md:py-20"
    >
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
          Tentang n1mpo {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
        </p>
        <p className="mt-5 text-xl leading-relaxed text-charcoal md:text-2xl">
          Setiap outfit di sini hanya ada satu.
          <br className="hidden md:block" />
          Dipilih & distyling dengan penuh hati
          <br className="hidden md:block" />
          untuk kamu yang suka tampil beda.
        </p>
        <Link
          href="/katalog"
          className="mt-8 inline-block text-sm font-medium text-taupe underline underline-offset-4 transition-colors hover:text-charcoal"
        >
          Jelajahi semua koleksi →
        </Link>
      </div>
    </m.section>
  )
}
