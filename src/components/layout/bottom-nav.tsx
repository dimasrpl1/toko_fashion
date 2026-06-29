'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { WishlistBadge } from '@/components/wishlist/wishlist-badge'

const navItems = [
  { href: '/',             label: 'Beranda',  Icon: Home,        badge: false },
  { href: '/katalog',      label: 'Katalog',  Icon: LayoutGrid,  badge: false },
  { href: '/akun/wishlist',label: 'Wishlist', Icon: Heart,       badge: true  },
  { href: '/akun',         label: 'Akun',     Icon: User,        badge: false },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-soft-border bg-warm-white/95 backdrop-blur-sm">
      <div className="flex h-16 items-center">
        {navItems.map(({ href, label, Icon, badge }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors',
                isActive ? 'text-taupe' : 'text-warm-gray'
              )}
            >
              <span className="relative">
                <Icon
                  className={cn('h-5 w-5', isActive && 'fill-taupe stroke-taupe')}
                  aria-hidden
                />
                {badge && <WishlistBadge />}
              </span>
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
