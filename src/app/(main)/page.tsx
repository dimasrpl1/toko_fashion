import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { HeroFull, type HeroSlide } from '@/components/beranda/hero-full'
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
    /* Produk featured: dipakai untuk hero slides + limited section */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_featured', true)
      .eq('is_active', true)
      .eq('status', 'available')
      .order('sort_order', { ascending: true })
      .limit(6),

    /* 8 produk terbaru tersedia */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_active', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(8),
  ])

  /* Hero slides: pakai gambar pertama tiap featured product */
  const heroSlides: HeroSlide[] = (featured ?? [])
    .filter((p) => (p.images as string[]).length > 0)
    .slice(0, 5)
    .map((p) => ({ image: (p.images as string[])[0], alt: p.title as string }))

  /* Editorial: gambar dari featured[0], fallback ke baruDrop[0] */
  const editorialImg =
    (featured?.[0]?.images as string[] | undefined)?.[0] ??
    (baruDrop?.[0]?.images as string[] | undefined)?.[0] ??
    null
  const editorialSlug =
    (featured?.[0]?.slug as string | undefined) ??
    (baruDrop?.[0]?.slug as string | undefined) ??
    null

  /* Brand story: gambar dari featured[1] atau baruDrop[2] */
  const storyImg =
    (featured?.[1]?.images as string[] | undefined)?.[0] ??
    (baruDrop?.[2]?.images as string[] | undefined)?.[0] ??
    null

  const baruDropProducts = (baruDrop ?? []) as unknown as CardProduct[]
  const limitedProducts  = (featured ?? []) as unknown as CardProduct[]

  return (
    <>
      <HeroFull slides={heroSlides} />
      <Marquee />
      <ProductRail products={baruDropProducts} />
      <EditorialBlock image={editorialImg} slug={editorialSlug} />
      <VibeTiles />
      <LimitedSection products={limitedProducts} />
      <BrandStory image={storyImg} />
      <BerandaFooter />
    </>
  )
}
