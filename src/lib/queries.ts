import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'

/**
 * Fetch produk berdasarkan slug.
 * Menggunakan React cache() agar generateMetadata dan Page component
 * tidak membuat dua request terpisah ke Supabase.
 */
export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  return (data as Product | null)
})

/**
 * Fetch produk lain yang masih tersedia (untuk section "Koleksi Lainnya").
 */
export const getKoleksiLainnya = cache(async (excludeSlug: string, limit = 4): Promise<Product[]> => {
  const supabase = await createClient()
  const { data } = await supabase
    .from('products')
    .select('id, slug, title, price, images, status')
    .eq('is_active', true)
    .eq('status', 'available')
    .neq('slug', excludeSlug)
    .order('created_at', { ascending: false })
    .limit(limit)
  return (data as Product[]) ?? []
})
