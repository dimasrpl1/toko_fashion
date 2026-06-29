'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, LogOut, Store } from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/lib/auth-actions'

const NAV_ITEMS = [
  { href: '/admin',        label: 'Dashboard', Icon: LayoutDashboard },
  { href: '/admin/produk', label: 'Produk',    Icon: Package         },
]

export function AdminBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-soft-border bg-warm-white/95 backdrop-blur-sm">
      <div className="flex h-16 items-center">
        {/* Nav items kiri */}
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive =
            href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors',
                isActive ? 'text-taupe' : 'text-warm-gray',
              )}
            >
              <Icon
                className={cn('h-5 w-5', isActive && 'fill-taupe stroke-taupe')}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          )
        })}

        {/* Keluar */}
        <form action={logout} className="flex flex-1 flex-col items-center">
          <button
            type="submit"
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-warm-gray transition-colors hover:text-charcoal"
          >
            <LogOut className="h-5 w-5" aria-hidden />
            <span>Keluar</span>
          </button>
        </form>

        {/* Ke Toko — paling kanan */}
        <Link
          href="/"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-warm-gray transition-colors hover:text-charcoal"
        >
          <Store className="h-5 w-5" aria-hidden />
          <span>Ke Toko</span>
        </Link>
      </div>
    </nav>
  )
}
