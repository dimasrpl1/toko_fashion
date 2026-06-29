import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Edit Produk' }

export default function EditProdukPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-charcoal">Edit Produk</h1>
      <p className="mt-1 text-warm-gray">Form edit produk — segera hadir</p>
    </div>
  )
}
