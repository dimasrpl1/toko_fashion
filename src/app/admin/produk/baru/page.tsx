import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ProductForm } from '@/components/admin/product-form'

export const metadata: Metadata = { title: 'Tambah Produk' }

export default function TambahProdukPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/produk"
          className="mb-4 inline-flex items-center gap-1 text-sm text-warm-gray transition-colors hover:text-charcoal"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke daftar produk
        </Link>
        <h1 className="text-xl font-semibold text-charcoal">Tambah Produk</h1>
      </div>

      <ProductForm />
    </div>
  )
}
