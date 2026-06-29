import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { BerundaHero } from '@/components/beranda/beranda-hero'
import { ProductSection } from '@/components/beranda/product-section'
import { BrandBlurb } from '@/components/beranda/brand-blurb'

export const metadata: Metadata = {
  // judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
  title: { absolute: 'n1mpo' },
  description: 'Outfit unik, thrifted & styled dengan cinta. Satu outfit, satu pemilik — dan itu bisa jadi milikmu.',
}

type CardProduct = Pick<Product, 'id' | 'slug' | 'title' | 'price' | 'images' | 'status'>

export default async function BerandaPage() {
  const supabase = await createClient()

  const [
    { data: heroData },
    { data: baruDrop },
    { data: featured },
  ] = await Promise.all([
    /* Hero image: ambil dari produk featured pertama */
    supabase
      .from('products')
      .select('images, title')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(1),

    /* Baru Drop: 8 produk terbaru yang tersedia */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_active', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(8),

    /* Limited: produk yang di-unggulan admin */
    supabase
      .from('products')
      .select('id, slug, title, price, images, status')
      .eq('is_featured', true)
      .eq('is_active', true)
      .eq('status', 'available')
      .order('sort_order', { ascending: true })
      .limit(8),
  ])

  /* Hero image: featured → fallback ke baru drop pertama */
  const heroProduct = heroData?.[0] ?? null
  const heroImage   = heroProduct?.images?.[0] ?? (baruDrop?.[0]?.images as string[] | undefined)?.[0] ?? null
  const heroAlt     = heroProduct?.title ?? 'n1mpo — outfit unik thrifted'

  const baruDropProducts = (baruDrop  ?? []) as unknown as CardProduct[]
  const featuredProducts = (featured  ?? []) as unknown as CardProduct[]

  return (
    <>
      <BerundaHero heroImage={heroImage} heroAlt={heroAlt} />

      <ProductSection
        title="✨ Baru Drop"
        products={baruDropProducts}
        linkHref="/katalog"
        linkLabel="Lihat Semua"
      />

      <BrandBlurb />

      {featuredProducts.length > 0 && (
        <ProductSection
          title="🔥 Limited — Hanya 1 Tersisa"
          products={featuredProducts}
          linkHref="/katalog"
          linkLabel="Lihat Koleksi"
          showLimitedBadge
          tinted
        />
      )}
    </>
  )
}
