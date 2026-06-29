'use client'

import { useState } from 'react'
import { MessageCircle, Share2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WishlistButton } from '@/components/wishlist/wishlist-button'

interface Props {
  productId: string
  title: string
  slug: string
  isSold: boolean
}

export function AksiProduk({ productId, title, slug, isSold }: Props) {
  const [copied, setCopied] = useState(false)

  function handleBeli() {
    const url   = `${window.location.origin}/katalog/${slug}`
    const text  = `Halo, saya mau pesan outfit ini:\n\n*${title}*\n${url}`
    const waNum = process.env.NEXT_PUBLIC_WA_NUMBER ?? ''
    window.open(`https://wa.me/${waNum}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
  }

  async function handleShare() {
    const url = window.location.href
    if (navigator.share) {
      try { await navigator.share({ title, url }) } catch { /* dibatalkan user */ }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch { /* clipboard tidak tersedia */ }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Wishlist */}
      <WishlistButton productId={productId} size="md" />

      {/* Beli via WA — disembunyikan jika terjual */}
      {!isSold && (
        <button
          onClick={handleBeli}
          className="flex h-14 items-center justify-center gap-2 rounded-xl bg-charcoal py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90 active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Beli via WhatsApp
        </button>
      )}

      {/* Bagikan */}
      <button
        onClick={handleShare}
        className={cn(
          'flex h-12 items-center justify-center gap-2 rounded-xl border border-soft-border text-sm transition-colors',
          copied ? 'border-taupe text-taupe' : 'text-warm-gray hover:border-charcoal hover:text-charcoal'
        )}
      >
        {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        {copied ? 'Link berhasil disalin!' : 'Bagikan'}
      </button>
    </div>
  )
}
