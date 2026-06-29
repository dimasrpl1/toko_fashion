import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/format'

export const metadata: Metadata = { title: 'Admin Dashboard' }

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: cAvailable },
    { count: cSold },
    { count: cTotal },
    { data: wishlistRows },
    { data: allProducts },
  ] = await Promise.all([
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)
      .eq('status', 'available'),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'sold'),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('wishlists').select('product_id'),
    supabase.from('products').select('id, title, images, price, status').eq('is_active', true),
  ])

  // Hitung jumlah wishlist per produk
  const countMap: Record<string, number> = {}
  for (const row of wishlistRows ?? []) {
    countMap[row.product_id] = (countMap[row.product_id] ?? 0) + 1
  }

  const productMap = new Map((allProducts ?? []).map((p) => [p.id, p]))
  const topProducts = Object.entries(countMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => {
      const p = productMap.get(id)
      return p ? { ...p, count } : null
    })
    .filter(Boolean) as Array<{
    id: string
    count: number
    title: string
    images: string[]
    price: number
    status: string
  }>

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-charcoal">Dashboard</h1>
          <p className="mt-0.5 text-sm text-warm-gray">Ringkasan toko n1mpo</p>
        </div>
        <Link
          href="/admin/produk/baru"
          className="shrink-0 rounded-xl bg-charcoal px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90"
        >
          + Tambah Produk
        </Link>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Produk Tersedia" value={cAvailable ?? 0} href="/admin/produk" />
        <StatCard label="Produk Terjual"  value={cSold      ?? 0} href="/admin/produk" />
        <StatCard label="Total Produk"    value={cTotal     ?? 0} href="/admin/produk" />
      </div>

      {/* Paling banyak di-wishlist */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-charcoal">
          Paling Banyak di-Wishlist
        </h2>
        {topProducts.length === 0 ? (
          <p className="text-sm text-warm-gray">Belum ada data wishlist.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-soft-border">
            {topProducts.map(({ id, count, title, price, status, images }) => (
              <div
                key={id}
                className="flex items-center gap-4 border-b border-soft-border p-4 last:border-0 hover:bg-warm-white/60 transition-colors"
              >
                <span className="w-8 shrink-0 text-center text-xl font-bold text-taupe">
                  {count}
                </span>
                <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-lg bg-soft-border">
                  {images[0] && (
                    <Image src={images[0]} alt="" fill className="object-cover" sizes="36px" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-charcoal">{title}</p>
                  <p className="text-xs text-warm-gray">
                    {formatPrice(price)} ·{' '}
                    {status === 'sold' ? 'Terjual' : 'Tersedia'}
                  </p>
                </div>
                <Link
                  href={`/admin/produk/${id}`}
                  className="shrink-0 text-xs text-taupe underline underline-offset-2 hover:text-charcoal"
                >
                  Edit →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-soft-border bg-warm-white p-5 transition-colors hover:border-taupe"
    >
      <p className="text-3xl font-bold text-charcoal">{value}</p>
      <p className="mt-1 text-sm text-warm-gray">{label}</p>
    </Link>
  )
}
