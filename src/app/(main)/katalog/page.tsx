import { Suspense } from 'react'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { ProductCard } from '@/components/katalog/product-card'
import { KatalogFilters } from '@/components/katalog/katalog-filters'

export const metadata: Metadata = { title: 'Katalog' }

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

function getString(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : (val ?? '')
}

export default async function KatalogPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams

  const status   = getString(sp.status)
  const kategori = getString(sp.kategori)
  const ukuran   = getString(sp.ukuran)
  const kondisi  = getString(sp.kondisi)
  const hargaMin = getString(sp.harga_min)
  const hargaMax = getString(sp.harga_max)
  const sort     = getString(sp.sort) || 'terbaru'

  const supabase = await createClient()

  /* ── Fetch produk dengan filter ─────────────────────────── */
  let query = supabase
    .from('products')
    .select('id, slug, title, price, size, condition, category, images, status, created_at')
    .eq('is_active', true)

  if (status === 'available' || status === 'sold') {
    query = query.eq('status', status)
  }
  if (kategori) query = query.in('category', kategori.split(','))
  if (ukuran)   query = query.in('size', ukuran.split(','))
  if (kondisi)  query = query.in('condition', kondisi.split(','))
  if (hargaMin) query = query.gte('price', parseInt(hargaMin))
  if (hargaMax) query = query.lte('price', parseInt(hargaMax))

  const { data: rawProducts } = await query
  const products = (rawProducts ?? []) as unknown as Product[]

  /* ── Sort: sold selalu paling akhir ─────────────────────── */
  const sorted = [...products].sort((a, b) => {
    if (a.status === 'sold' && b.status !== 'sold') return 1
    if (b.status === 'sold' && a.status !== 'sold') return -1
    if (sort === 'termurah') return a.price - b.price
    if (sort === 'termahal') return b.price - a.price
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  /* ── Ambil opsi filter dari semua produk aktif ──────────── */
  const { data: filterData } = await supabase
    .from('products')
    .select('category, size, condition')
    .eq('is_active', true)

  const fd = filterData ?? []
  const categories = [...new Set(fd.map((p) => p.category).filter(Boolean))] as string[]
  const sizes      = [...new Set(fd.map((p) => p.size).filter(Boolean))] as string[]
  const conds      = [...new Set(fd.map((p) => p.condition).filter(Boolean))] as string[]

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-charcoal">Katalog</h1>
        <p className="mt-1 text-sm text-warm-gray">
          {sorted.length} item ditemukan
        </p>
      </div>

      {/* Filter — Suspense required for useSearchParams dalam Client Component */}
      <Suspense fallback={<div className="h-12 animate-pulse rounded-xl bg-soft-border md:h-[160px]" />}>
        <KatalogFilters
          categories={categories}
          sizes={sizes}
          conditions={conds}
        />
      </Suspense>

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center">
          <p className="text-center text-warm-gray">
            Tidak ada produk yang sesuai filter.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
