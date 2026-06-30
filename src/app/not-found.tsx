import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, Home } from 'lucide-react'

export const metadata: Metadata = { title: 'Halaman Tidak Ditemukan' }

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe">
        404
      </p>

      <h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight text-charcoal md:text-7xl">
        Outfit ini
        <br />
        sudah hilang.
      </h1>

      <p className="mt-5 max-w-sm text-base leading-relaxed text-warm-gray">
        Halaman yang kamu cari tidak ditemukan — mungkin sudah dipindah,
        atau link-nya keliru.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-full bg-charcoal px-7 py-3 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90"
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
        <Link
          href="/katalog"
          className="flex items-center justify-center gap-2 rounded-full border border-soft-border px-7 py-3 text-sm font-semibold text-charcoal transition-colors hover:border-charcoal"
        >
          Lihat Koleksi
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
