'use client'

import Image from 'next/image'
import Link from 'next/link'
import { m } from 'motion/react'
import { ArrowRight } from 'lucide-react'

interface Props {
  heroImage: string | null
  heroAlt: string
}

const VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function BerundaHero({ heroImage, heroAlt }: Props) {
  const img = heroImage ?? 'https://placehold.co/800x1000/E8DFD5/8C8478?text=n1mpo'

  return (
    <section className="flex min-h-[88dvh] flex-col overflow-hidden md:min-h-screen md:flex-row">
      {/* Gambar — atas di mobile, kanan di desktop */}
      <div className="relative aspect-3/4 w-full shrink-0 overflow-hidden md:order-last md:aspect-auto md:w-[55%]">
        <Image
          src={img}
          alt={heroAlt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Teks */}
      <div className="flex flex-col justify-center bg-background px-8 py-10 md:order-first md:w-[45%] md:px-12 lg:px-20">
        <m.p
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          custom={0}
          className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-taupe"
        >
          {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
          n1mpo
        </m.p>

        <m.h1
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="text-[2.6rem] font-semibold leading-[1.1] tracking-tight text-charcoal md:text-5xl lg:text-[3.5rem]"
        >
          Outfit unik,<br />
          styled<br />
          untukmu.
        </m.h1>

        <m.p
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          custom={0.22}
          className="mt-5 max-w-[28ch] text-base leading-relaxed text-warm-gray"
        >
          One-of-a-kind pieces — thrifted & styled dengan cinta.
          Satu outfit, satu pemilik.
        </m.p>

        <m.div
          variants={VARIANTS}
          initial="hidden"
          animate="show"
          custom={0.34}
          className="mt-8"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 rounded-xl bg-charcoal px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90"
          >
            Lihat Koleksi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </m.div>
      </div>
    </section>
  )
}
