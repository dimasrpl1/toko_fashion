import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kelola Produk' }

export default function AdminProdukPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-charcoal">Kelola Produk</h1>
      <p className="mt-1 text-warm-gray">Tabel produk — segera hadir</p>
    </div>
  )
}
