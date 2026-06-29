import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { isAdmin } from '@/lib/auth'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/')

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-40 border-b border-soft-border bg-warm-white/90 backdrop-blur-sm">
        <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2 sm:px-6">
          {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
          <Link href="/admin" className="shrink-0 text-sm font-semibold text-charcoal">
            n1mpo — Admin
          </Link>

          <nav className="flex flex-wrap items-center gap-3 sm:gap-5">
            {/* Tombol kembali ke halaman pengguna */}
            <Link
              href="/"
              className="flex items-center gap-1 rounded-lg border border-soft-border px-2.5 py-1 text-xs font-medium text-warm-gray transition-colors hover:border-taupe hover:text-taupe"
            >
              <ArrowLeft className="h-3 w-3" />
              Ke Toko
            </Link>

            <Link
              href="/admin"
              className="text-sm text-warm-gray transition-colors hover:text-charcoal"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/produk"
              className="text-sm text-warm-gray transition-colors hover:text-charcoal"
            >
              Produk
            </Link>
            <LogoutButton />
          </nav>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6">{children}</main>
    </div>
  )
}
