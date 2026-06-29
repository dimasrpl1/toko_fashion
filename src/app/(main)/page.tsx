import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { HeroFull } from '@/components/beranda/hero-full'
import { Marquee } from '@/components/beranda/marquee'
import { ProductRail } from '@/components/beranda/product-rail'
import { EditorialBlock } from '@/components/beranda/editorial-block'
import { VibeTiles } from '@/components/beranda/vibe-tiles'
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

  const [{ data: baruDrop }, { data: filterData }] = await Promise.all([
    /* 8 produk terbaru tersedia: untuk rail "Baru Drop" */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_active', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(8),

    /* Ambil kategori yang ada — sama persis seperti filter katalog */
    supabase
      .from('products')
      .select('category')
      .eq('is_active', true),
  ])

  const baruDropProducts = (baruDrop ?? []) as unknown as CardProduct[]

  const categories = [
    ...new Set(
      (filterData ?? []).map((p) => p.category).filter(Boolean) as string[],
    ),
  ]

  return (
    <>
      <HeroFull />
      <Marquee />
      <ProductRail products={baruDropProducts} />
      <EditorialBlock />
      <VibeTiles categories={categories} />
      <BrandStory />
      <BerandaFooter />
    </>
  )
}
