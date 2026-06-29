'use client'

import { useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
const PLACEHOLDER = 'https://placehold.co/600x800/F4EFE7/8C8478?text=n1mpo'

const SWIPE_THRESHOLD = 50   // px offset minimum
const SWIPE_VELOCITY  = 300  // px/s minimum

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%' }),
}

interface Props {
  images: string[]
  title: string
  isSold: boolean
}

export function FotoGaleri({ images, title, isSold }: Props) {
  const imgs = images.length > 0 ? images : [PLACEHOLDER]
  const [current, setCurrent]     = useState(0)
  const [direction, setDirection] = useState(0)

  function navigate(dir: number) {
    setDirection(dir)
    setCurrent((prev) => (prev + dir + imgs.length) % imgs.length)
  }

  const showArrows = imgs.length > 1

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main image ──────────────────────────────────────────── */}
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-warm-white">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <m.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 320, damping: 30, mass: 0.8 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              const swipedFar   = Math.abs(info.offset.x)   > SWIPE_THRESHOLD
              const swipedFast  = Math.abs(info.velocity.x) > SWIPE_VELOCITY
              if (swipedFar || swipedFast) {
                navigate(info.offset.x > 0 ? -1 : 1)
              }
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'pan-y' }}
          >
            <Image
              src={imgs[current]}
              alt={`${title} — foto ${current + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="pointer-events-none select-none object-cover"
              priority={current === 0}
              draggable={false}
            />
          </m.div>
        </AnimatePresence>

        {/* Sold overlay */}
        {isSold && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-charcoal/75">
            <span className="text-sm font-semibold tracking-[0.25em] text-cream">
              SUDAH TERJUAL
            </span>
          </div>
        )}

        {/* Arrow buttons — desktop hover */}
        {showArrows && (
          <>
            <button
              onClick={() => navigate(-1)}
              aria-label="Foto sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-warm-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 text-charcoal" />
            </button>
            <button
              onClick={() => navigate(1)}
              aria-label="Foto berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-warm-white/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="h-5 w-5 text-charcoal" />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {showArrows && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                aria-label={`Foto ${i + 1}`}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === current ? 'w-5 bg-cream' : 'w-1.5 bg-cream/50'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip — desktop ───────────────────────────── */}
      {imgs.length > 1 && (
        <div className="hidden gap-2 md:flex">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
              className={cn(
                'relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                i === current ? 'border-charcoal' : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
