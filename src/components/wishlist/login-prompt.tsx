'use client'

import { m } from 'motion/react'
import { X, Heart } from 'lucide-react'
import { LoginButton } from '@/components/auth/login-button'

interface Props {
  onClose: () => void
}

export function LoginPrompt({ onClose }: Props) {
  return (
    <>
      {/* Backdrop */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <m.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 8 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-xs -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-warm-white p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-warm-gray transition-colors hover:bg-soft-border hover:text-charcoal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon + teks */}
        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-taupe/10">
            <Heart className="h-7 w-7 fill-taupe stroke-taupe" />
          </div>
          <div>
            <h3 className="font-semibold text-charcoal">Simpan outfit favoritmu</h3>
            <p className="mt-1 text-sm leading-relaxed text-warm-gray">
              Masuk dulu untuk menyimpan ke wishlist — satu klik, tanpa password.
            </p>
          </div>
        </div>

        <LoginButton />

        <button
          onClick={onClose}
          className="mt-3 w-full py-1 text-center text-sm text-warm-gray transition-colors hover:text-charcoal"
        >
          Nanti saja
        </button>
      </m.div>
    </>
  )
}
