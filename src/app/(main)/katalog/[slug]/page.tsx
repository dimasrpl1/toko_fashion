import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Zap } from 'lucide-react'
import { getProductBySlug, getKoleksiLainnya } from '@/lib/queries'
import { formatPrice } from '@/lib/format'
import { FotoGaleri } from '@/components/produk/foto-galeri'
import { AksiProduk } from '@/components/produk/aksi-produk'
import { ProductCard } from '@/components/katalog/product-card'

type Props = { params: Promise<{ slug: string }> }

/* ── Open Graph dinamis per produk ─────────────────────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product  = await getProductBySlug(slug)

  if (!product) return { title: 'Produk tidak ditemukan' }

  const price     = formatPrice(product.price)
  const desc      = product.description
    ? `${product.description.slice(0, 120)}…`
    : `${price}${product.size ? ` · Ukuran ${product.size}` : ''} · nojstudio.id`
  const ogImage   = product.images[0]
    ? [{ url: product.images[0], width: 600, height: 800, alt: product.title }]
    : []

  return {
    title: product.title,
    description: desc,
    openGraph: {
      title:       product.title,
      description: `${price}${product.size ? ` · Ukuran ${product.size}` : ''} · nojstudio.id`,
      images:      ogImage,
      type:        'website',
    },
    twitter: {
      card:        'summary_large_image',
      title:       product.title,
      description: desc,
      images:      product.images[0] ? [product.images[0]] : [],
    },
  }
}

/* ── Page ───────────────────────────────────────────────────── */
export default async function DetailProdukPage({ params }: Props) {
  const { slug }   = await params
  const product    = await getProductBySlug(slug)

  if (!product) notFound()

  const isSold     = product.status === 'sold'
  const lainnya    = await getKoleksiLainnya(slug, 4)

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">

      {/* ── Layout utama ──────────────────────────────────────── */}
      <div className="gap-10 md:grid md:grid-cols-2 lg:gap-14">

        {/* Galeri — sticky di desktop */}
        <div className="md:sticky md:top-24 md:self-start">
          <FotoGaleri
            images={product.images}
            title={product.title}
            isSold={isSold}
          />
        </div>

        {/* Info produk */}
        <div className="mt-6 flex flex-col gap-5 md:mt-0">

          {/* Status sold */}
          {isSold && (
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-charcoal px-3 py-1 text-xs font-semibold tracking-wide text-cream">
              Sudah Terjual
            </div>
          )}

          {/* Judul + harga */}
          <div>
            <h1 className="text-2xl font-semibold leading-snug text-charcoal md:text-3xl">
              {product.title}
            </h1>
            <p className="mt-2 text-xl font-bold text-taupe">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Scarcity — hanya jika tersedia */}
          {!isSold && (
            <div className="flex items-center gap-1.5 text-sm font-medium text-deep-taupe">
              <Zap className="h-4 w-4 fill-taupe stroke-taupe" />
              Hanya 1 tersedia
            </div>
          )}

          {/* Chips: ukuran + kondisi */}
          {(product.size || product.condition) && (
            <div className="flex flex-wrap gap-2">
              {product.size && (
                <span className="rounded-full border border-soft-border px-3 py-1 text-xs text-charcoal">
                  Ukuran {product.size}
                </span>
              )}
              {product.condition && (
                <span className="rounded-full border border-soft-border px-3 py-1 text-xs text-charcoal">
                  {product.condition}
                </span>
              )}
              {product.category && (
                <span className="rounded-full border border-soft-border px-3 py-1 text-xs text-warm-gray">
                  {product.category}
                </span>
              )}
            </div>
          )}

          {/* Story / deskripsi */}
          {product.description && (
            <div>
              <hr className="border-soft-border" />
              <p className="mt-4 text-sm leading-relaxed text-warm-gray whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Tombol aksi */}
          <div className="mt-1">
            <AksiProduk
              productId={product.id}
              title={product.title}
              slug={product.slug}
              isSold={isSold}
            />
          </div>

          {/* Info sold */}
          {isSold && (
            <p className="text-sm text-warm-gray">
              Outfit ini sudah menemukan pemiliknya. Yuk lihat koleksi lainnya di bawah!
            </p>
          )}
        </div>
      </div>

      {/* ── Koleksi Lainnya ────────────────────────────────────── */}
      {lainnya.length > 0 && (
        <section className="mt-16 md:mt-20">
          <h2 className="mb-5 text-lg font-semibold text-charcoal">Koleksi Lainnya</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {lainnya.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
