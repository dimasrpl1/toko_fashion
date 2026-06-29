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

export function AdminNav() {
  const pathname = usePathname()

  function active(href: string) {
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  return (
    <>
      {/* ── Desktop: sticky top header ─────────────────────────── */}
      <header className="sticky top-0 z-40 hidden border-b border-soft-border bg-warm-white/90 backdrop-blur-sm md:block">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-warm-gray">
            Admin Panel
          </span>

          <nav className="flex items-center gap-6">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm transition-colors',
                  active(href)
                    ? 'font-semibold text-charcoal'
                    : 'text-warm-gray hover:text-charcoal',
                )}
              >
                {label}
              </Link>
            ))}

            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-warm-gray transition-colors hover:text-charcoal"
              >
                Keluar
              </button>
            </form>

            <Link
              href="/"
              className="rounded-lg border border-soft-border px-3 py-1.5 text-xs font-medium text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
            >
              ← Ke Toko
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Mobile: fixed bottom nav ───────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-soft-border bg-warm-white/95 backdrop-blur-sm md:hidden">
        <div className="flex h-16 items-center">
          {NAV_ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors',
                active(href) ? 'text-taupe' : 'text-warm-gray',
              )}
            >
              <Icon
                className={cn('h-5 w-5', active(href) && 'fill-taupe stroke-taupe')}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          ))}

          <form action={logout} className="flex flex-1 flex-col items-center">
            <button
              type="submit"
              className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-warm-gray transition-colors hover:text-charcoal"
            >
              <LogOut className="h-5 w-5" aria-hidden />
              <span>Keluar</span>
            </button>
          </form>

          <Link
            href="/"
            className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs text-warm-gray transition-colors hover:text-charcoal"
          >
            <Store className="h-5 w-5" aria-hidden />
            <span>Ke Toko</span>
          </Link>
        </div>
      </nav>
    </>
  )
}
