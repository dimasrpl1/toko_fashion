'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'motion/react'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWishlistStore } from '@/store/wishlist-store'
import { addToWishlist, removeFromWishlist } from '@/lib/wishlist-actions'
import { LoginPrompt } from './login-prompt'

interface Props {
  productId: string
  /**
   * sm  — kartu katalog: kecil, diposisikan dari luar lewat className
   * md  — halaman detail: tombol penuh lebar dengan teks
   */
  size?: 'sm' | 'md'
  className?: string
}

export function WishlistButton({ productId, size = 'sm', className }: Props) {
  const { isLoggedIn, has, add, remove } = useWishlistStore()
  const isActive = has(productId)

  const [showPrompt, setShowPrompt]   = useState(false)
  const [isPending, setIsPending]     = useState(false)
  const [mounted, setMounted]         = useState(false)

  useEffect(() => setMounted(true), [])

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    if (!isLoggedIn) {
      setShowPrompt(true)
      return
    }
    if (isPending) return

    const wasActive = isActive
    // Optimistic update
    wasActive ? remove(productId) : add(productId)

    setIsPending(true)
    try {
      wasActive
        ? await removeFromWishlist(productId)
        : await addToWishlist(productId)
    } catch {
      // Revert on error
      wasActive ? add(productId) : remove(productId)
    } finally {
      setIsPending(false)
    }
  }

  const heartIcon = (
    <AnimatePresence mode="wait" initial={false}>
      <m.span
        key={String(isActive)}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.4, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        className="flex items-center justify-center"
      >
        <Heart
          className={cn(
            'transition-colors',
            size === 'sm' ? 'h-4 w-4' : 'h-4 w-4',
            isActive ? 'fill-taupe stroke-taupe' : 'fill-none stroke-current'
          )}
        />
      </m.span>
    </AnimatePresence>
  )

  const portal = mounted
    ? createPortal(
        <AnimatePresence>
          {showPrompt && <LoginPrompt onClose={() => setShowPrompt(false)} />}
        </AnimatePresence>,
        document.body
      )
    : null

  /* ── Small (kartu katalog) ──────────────────────────────── */
  if (size === 'sm') {
    return (
      <>
        <m.button
          onClick={handleClick}
          whileTap={{ scale: 0.82 }}
          aria-label={isActive ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full bg-warm-white/80 backdrop-blur-sm',
            className
          )}
        >
          {heartIcon}
        </m.button>
        {portal}
      </>
    )
  }

  /* ── Medium (halaman detail) ────────────────────────────── */
  return (
    <>
      <m.button
        onClick={handleClick}
        whileTap={{ scale: 0.96 }}
        aria-label={isActive ? 'Hapus dari wishlist' : 'Simpan ke wishlist'}
        className={cn(
          'flex h-12 w-full items-center justify-center gap-2 rounded-xl border text-sm font-medium transition-colors',
          isActive
            ? 'border-taupe bg-taupe/5 text-taupe hover:bg-taupe/10'
            : 'border-soft-border text-charcoal hover:border-taupe hover:text-taupe',
          className
        )}
      >
        {heartIcon}
        {isActive ? 'Tersimpan di Wishlist' : 'Simpan ke Wishlist'}
      </m.button>
      {portal}
    </>
  )
}
