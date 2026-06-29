import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth'
import { LoginButton } from '@/components/auth/login-button'
import { LogoutButton } from '@/components/auth/logout-button'
import { WishlistBadge } from '@/components/wishlist/wishlist-badge'

export async function UserNav() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/akun/wishlist"
          aria-label="Wishlist"
          className="relative flex h-9 w-9 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
        >
          <Heart className="h-5 w-5" />
          <WishlistBadge />
        </Link>
        <LoginButton variant="compact" next="/akun" />
      </div>
    )
  }

  const name      = (user.user_metadata?.full_name ?? user.user_metadata?.name ?? '') as string
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const initial   = name[0]?.toUpperCase() ?? '?'
  const admin     = await isAdmin()

  return (
    <div className="flex items-center gap-3">
      {/* Link admin — hanya muncul untuk role admin */}
      {admin && (
        <Link
          href="/admin"
          className="rounded-lg border border-soft-border px-2.5 py-1 text-xs font-medium text-warm-gray transition-colors hover:border-taupe hover:text-taupe"
        >
          Admin
        </Link>
      )}

      <Link
        href="/akun/wishlist"
        aria-label="Wishlist"
        className="relative flex h-9 w-9 items-center justify-center text-warm-gray transition-colors hover:text-charcoal"
      >
        <Heart className="h-5 w-5" />
        <WishlistBadge />
      </Link>

      <Link href="/akun" className="group flex items-center gap-2">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={name}
            width={32}
            height={32}
            className="rounded-full ring-2 ring-transparent transition-all group-hover:ring-soft-border"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-taupe text-xs font-semibold text-cream">
            {initial}
          </div>
        )}
        <span className="hidden text-sm text-charcoal lg:block">
          {name.split(' ')[0] || 'Akun'}
        </span>
      </Link>

      <LogoutButton />
    </div>
  )
}
