'use client'

import { useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'
import { quickToggleStatus, quickToggleActive, deleteProduct } from '@/app/admin/actions'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

export function ProductTable({ products }: { products: Product[] }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus produk "${title}"?\n\nTindakan ini tidak dapat dibatalkan.`)) return
    startTransition(async () => {
      const res = await deleteProduct(id)
      if (!res.success) alert(`Gagal hapus: ${res.error}`)
    })
  }

  function handleStatus(id: string, current: 'available' | 'sold') {
    startTransition(async () => {
      await quickToggleStatus(id, current === 'available' ? 'sold' : 'available')
    })
  }

  function handleActive(id: string, current: boolean) {
    startTransition(async () => {
      await quickToggleActive(id, !current)
    })
  }

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-soft-border py-16 text-center">
        <p className="text-sm text-warm-gray">
          Belum ada produk.{' '}
          <Link href="/admin/produk/baru" className="text-taupe underline underline-offset-2">
            Tambah sekarang
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-x-auto rounded-xl border border-soft-border transition-opacity',
        isPending && 'pointer-events-none opacity-50',
      )}
    >
      <table className="w-full min-w-[680px]">
        <thead className="border-b border-soft-border bg-warm-white">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Produk
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Harga
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Status
            </th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Aktif
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-warm-gray">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-soft-border bg-background">
          {products.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-warm-white/60">
              {/* Produk */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-9 shrink-0 overflow-hidden rounded-lg bg-warm-white">
                    {p.images[0] ? (
                      <Image src={p.images[0]} alt="" fill className="object-cover" sizes="36px" />
                    ) : (
                      <div className="absolute inset-0 bg-soft-border" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="max-w-[220px] truncate text-sm font-medium text-charcoal">{p.title}</p>
                    <p className="truncate text-xs text-warm-gray">{p.slug}</p>
                    {p.is_featured && (
                      <span className="text-[10px] font-medium text-taupe">★ Unggulan</span>
                    )}
                  </div>
                </div>
              </td>

              {/* Harga */}
              <td className="px-4 py-3 text-right text-sm text-charcoal">
                {formatPrice(p.price)}
              </td>

              {/* Status */}
              <td className="px-4 py-3 text-center">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
                      p.status === 'available'
                        ? 'bg-green-50 text-green-700'
                        : 'bg-soft-border/60 text-warm-gray line-through',
                    )}
                  >
                    {p.status === 'available' ? 'Tersedia' : 'Terjual'}
                  </span>
                  <button
                    onClick={() => handleStatus(p.id, p.status)}
                    className="text-[10px] text-warm-gray underline underline-offset-2 transition-colors hover:text-charcoal"
                  >
                    {p.status === 'available' ? 'Tandai terjual' : 'Tandai tersedia'}
                  </button>
                </div>
              </td>

              {/* Aktif */}
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleActive(p.id, p.is_active)}
                  className="inline-flex items-center gap-1 text-xs text-warm-gray transition-colors hover:text-charcoal"
                >
                  {p.is_active ? (
                    <ToggleRight className="h-5 w-5 text-taupe" />
                  ) : (
                    <ToggleLeft className="h-5 w-5 text-soft-border" />
                  )}
                  <span>{p.is_active ? 'Aktif' : 'Nonaktif'}</span>
                </button>
              </td>

              {/* Aksi */}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={`/admin/produk/${p.id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-soft-border text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
                    title="Edit produk"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-soft-border text-warm-gray transition-colors hover:border-red-300 hover:text-red-500"
                    title="Hapus produk"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
