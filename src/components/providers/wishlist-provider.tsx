'use client'

import { useEffect } from 'react'
import { useWishlistStore } from '@/store/wishlist-store'

interface Props {
  initialIds: string[]
  isLoggedIn: boolean
  children: React.ReactNode
}

/**
 * Menginisialisasi Zustand wishlist store dari data server.
 * Harus di-render sebelum komponen yang menggunakan useWishlistStore.
 */
export function WishlistProvider({ initialIds, isLoggedIn, children }: Props) {
  const init = useWishlistStore((s) => s.init)

  useEffect(() => {
    init(initialIds, isLoggedIn)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // hanya saat mount — data sudah fresh dari server

  return <>{children}</>
}
