import { redirect } from 'next/navigation'
import Link from 'next/link'
import { isAdmin } from '@/lib/auth'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/')

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-soft-border bg-warm-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
          <Link href="/admin" className="text-sm font-semibold text-charcoal">
            n1mpo — Admin
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="text-sm text-warm-gray transition-colors hover:text-charcoal">
              Dashboard
            </Link>
            <Link href="/admin/produk" className="text-sm text-warm-gray transition-colors hover:text-charcoal">
              Produk
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
