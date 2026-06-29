import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ProductForm } from '@/components/admin/product-form'
import type { Product } from '@/lib/types'

export const metadata: Metadata = { title: 'Edit Produk' }

type Props = { params: Promise<{ id: string }> }

export default async function EditProdukPage({ params }: Props) {
  const { id }   = await params
  const supabase = await createClient()

  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  if (!data) notFound()

  const product = data as Product & { id: string }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/produk"
          className="mb-4 inline-flex items-center gap-1 text-sm text-warm-gray transition-colors hover:text-charcoal"
        >
          <ChevronLeft className="h-4 w-4" />
          Kembali ke daftar produk
        </Link>
        <h1 className="text-xl font-semibold text-charcoal">Edit Produk</h1>
        <p className="mt-0.5 text-sm text-warm-gray">{product.slug}</p>
      </div>

      <ProductForm initialData={product} />
    </div>
  )
}
