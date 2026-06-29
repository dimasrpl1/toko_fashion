import { Suspense } from 'react'
import Link from 'next/link'
import { UserNav } from './user-nav'

function UserNavSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-5 w-5 rounded-full bg-soft-border animate-pulse" />
      <div className="h-8 w-8 rounded-full bg-soft-border animate-pulse" />
    </div>
  )
}

export function Header() {
  return (
    <header className="hidden md:flex sticky top-0 z-40 w-full border-b border-soft-border bg-warm-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
        <Link href="/" className="text-base font-semibold tracking-wide text-charcoal">
          n1mpo
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/" className="text-sm text-warm-gray transition-colors hover:text-charcoal">
            Beranda
          </Link>
          <Link href="/katalog" className="text-sm text-warm-gray transition-colors hover:text-charcoal">
            Katalog
          </Link>
          <Link href="/kontak" className="text-sm text-warm-gray transition-colors hover:text-charcoal">
            Kontak
          </Link>
        </nav>

        {/* Auth state — streamed agar tidak blokir render header */}
        <Suspense fallback={<UserNavSkeleton />}>
          <UserNav />
        </Suspense>
      </div>
    </header>
  )
}
