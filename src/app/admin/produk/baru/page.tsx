import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Tambah Produk' }

export default function TambahProdukPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-charcoal">Tambah Produk</h1>
      <p className="mt-1 text-warm-gray">Form tambah produk — segera hadir</p>
    </div>
  )
}
