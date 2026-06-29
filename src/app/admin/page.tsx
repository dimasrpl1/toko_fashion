import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-charcoal">Dashboard</h1>
      <p className="mt-1 text-warm-gray">Ringkasan produk & wishlist — segera hadir</p>
    </div>
  )
}
