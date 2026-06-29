import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { HeroFull } from '@/components/beranda/hero-full'
import { Marquee } from '@/components/beranda/marquee'
import { ProductRail } from '@/components/beranda/product-rail'
import { EditorialBlock } from '@/components/beranda/editorial-block'
import { VibeTiles } from '@/components/beranda/vibe-tiles'
import { LimitedSection } from '@/components/beranda/limited-section'
import { BrandStory } from '@/components/beranda/brand-story'
import { BerandaFooter } from '@/components/beranda/beranda-footer'

export const metadata: Metadata = {
  // judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
  title: { absolute: 'n1mpo' },
  description:
    'Outfit unik, thrifted & styled dengan cinta. Satu outfit, satu pemilik — dan itu bisa jadi milikmu.',
}

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

export default async function BerandaPage() {
  const supabase = await createClient()

  const [{ data: featured }, { data: baruDrop }] = await Promise.all([
    /* Produk featured: untuk section "Limited / Hampir Habis" */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_featured', true)
      .eq('is_active', true)
      .eq('status', 'available')
      .order('sort_order', { ascending: true })
      .limit(4),

    /* 8 produk terbaru tersedia: untuk rail "Baru Drop" */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_active', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  const baruDropProducts = (baruDrop ?? []) as unknown as CardProduct[]
  const limitedProducts  = (featured ?? []) as unknown as CardProduct[]

  return (
    <>
      <HeroFull />
      <Marquee />
      <ProductRail products={baruDropProducts} />
      <EditorialBlock />
      <VibeTiles />
      <LimitedSection products={limitedProducts} />
      <BrandStory />
      <BerandaFooter />
    </>
  )
}
