import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Gagal masuk' }

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-xl font-semibold text-charcoal">Gagal masuk</h1>
        <p className="text-sm text-warm-gray">
          Terjadi kesalahan saat proses login. Silakan coba lagi.
        </p>
        <Link
          href="/auth/login"
          className="inline-block rounded-xl bg-charcoal px-6 py-3 text-sm font-medium text-cream hover:bg-charcoal/90"
        >
          Coba lagi
        </Link>
      </div>
    </div>
  )
}
