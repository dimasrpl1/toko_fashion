'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'

/*
 * Foto brand story sementara dari Unsplash (flat lay hangat) — ganti dengan
 * foto brand asli kapan saja.
 */
const STORY_IMG =
  'https://images.unsplash.com/photo-1584061516874-ed56f46d8e13?w=900&h=1200&fit=crop&q=80&auto=format'

export function BrandStory() {
  const img = STORY_IMG

  return (
    <section className="border-y border-soft-border bg-background py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Gambar */}
          <m.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-3/4 overflow-hidden rounded-2xl"
          >
            <Image
              src={img}
              alt="n1mpo brand story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </m.div>

          {/* Teks */}
          <div>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe"
            >
              {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
              Tentang n1mpo
            </m.p>

            <m.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-3xl font-semibold leading-tight text-charcoal md:text-4xl"
            >
              Fashion rumahan,
              <br />
              hati yang niat.
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base leading-relaxed text-warm-gray"
            >
              Setiap piece yang kamu lihat di sini dipilih dan di-styling dengan
              tangan sendiri. Kami percaya fashion nggak harus fast — makanya setiap
              koleksi kami limited & thrifted, bukan repro, bukan massal.
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-base leading-relaxed text-warm-gray"
            >
              Sustainable, unik, dan hanya ada satu. Persis seperti kamu.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link
                href="/kontak"
                className="text-sm font-medium text-taupe underline underline-offset-4 transition-colors hover:text-charcoal"
              >
                Kenali kami lebih dekat →
              </Link>
              <Link
                href="/katalog"
                className="text-sm font-medium text-warm-gray underline underline-offset-4 transition-colors hover:text-charcoal"
              >
                Lihat semua koleksi →
              </Link>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}
