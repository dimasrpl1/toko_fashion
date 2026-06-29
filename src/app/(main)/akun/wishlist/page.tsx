import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { WishlistGrid } from '@/components/wishlist/wishlist-grid'
import type { Product } from '@/lib/types'

export const metadata: Metadata = { title: 'Wishlist' }

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

export default async function WishlistPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Proxy sudah redirect unauthenticated user ke /auth/login
  // Jika sampai sini, user pasti terautentikasi
  if (!user) return null

  const { data } = await supabase
    .from('wishlists')
    .select('product_id, created_at, products(id, slug, title, price, images, status, is_active)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const products: CardProduct[] = (data ?? [])
    .map((row) => row.products as unknown as (Product & { is_active: boolean }) | null)
    .filter((p): p is Product & { is_active: boolean } => p !== null && p.is_active)
    .map(({ id, slug, title, price, images, status }) => ({
      id, slug, title, price, images, status,
    }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <div className="mb-6 flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-charcoal">Wishlist</h1>
        {products.length > 0 && (
          <span className="text-sm text-warm-gray">{products.length} item</span>
        )}
      </div>

      <WishlistGrid products={products} />
    </div>
  )
}
