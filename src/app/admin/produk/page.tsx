import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ProductTable } from '@/components/admin/product-table'
import type { Product } from '@/lib/types'

export const metadata: Metadata = { title: 'Kelola Produk' }

export default async function AdminProdukPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('products')
    .select('id, slug, title, price, status, is_active, is_featured, images, sort_order, created_at, description, size, condition, category')
    .order('created_at', { ascending: false })

  const products = (data ?? []) as Product[]

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-charcoal">Kelola Produk</h1>
          <p className="mt-0.5 text-sm text-warm-gray">{products.length} produk</p>
        </div>
        <Link
          href="/admin/produk/baru"
          className="rounded-xl bg-charcoal px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90"
        >
          + Tambah Produk
        </Link>
      </div>

      <ProductTable products={products} />
    </div>
  )
}
