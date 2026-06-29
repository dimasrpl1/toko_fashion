'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { productSchema, type ProductInput } from '@/lib/product-schema'
import { createProduct, updateProduct } from '@/app/admin/actions'
import { PhotoUpload } from './photo-upload'
import type { Product } from '@/lib/types'

const CONDITIONS = ['', 'Baru', 'Bekas — seperti baru', 'Bekas — baik', 'Bekas — cukup']

interface Props {
  initialData?: Product & { id: string }
}

function Field({
  label,
  error,
  children,
  required,
}: {
  label: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-charcoal">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls =
  'w-full rounded-xl border border-soft-border bg-background px-4 py-2.5 text-sm text-charcoal placeholder:text-warm-gray/60 outline-none transition-colors focus:border-taupe'

export function ProductForm({ initialData }: Props) {
  const router    = useRouter()
  const isEdit    = !!initialData
  const [err, setErr] = useState<string | null>(null)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: isEdit
      ? {
          title:       initialData.title,
          description: initialData.description ?? '',
          price:       initialData.price,
          size:        initialData.size        ?? '',
          condition:   initialData.condition   ?? '',
          category:    initialData.category    ?? '',
          status:      initialData.status,
          is_featured: initialData.is_featured,
          is_active:   initialData.is_active,
          sort_order:  initialData.sort_order,
          images:      initialData.images as string[],
        }
      : {
          status:      'available',
          is_featured: false,
          is_active:   true,
          sort_order:  null,
          images:      [],
        },
  })

  async function onSubmit(data: ProductInput) {
    setErr(null)
    const res = isEdit
      ? await updateProduct(initialData.id, data)
      : await createProduct(data)

    if (!res.success) { setErr(res.error); return }
    router.push('/admin/produk')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ── Foto ──────────────────────────────────────────────────── */}
      <section className="space-y-4 rounded-2xl border border-soft-border bg-warm-white p-5">
        <h2 className="text-sm font-semibold text-charcoal">Foto Produk</h2>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <PhotoUpload value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.images && (
          <p className="text-xs text-red-500">{errors.images.message}</p>
        )}
      </section>

      {/* ── Info dasar ────────────────────────────────────────────── */}
      <section className="space-y-4 rounded-2xl border border-soft-border bg-warm-white p-5">
        <h2 className="text-sm font-semibold text-charcoal">Info Dasar</h2>

        <Field label="Judul" error={errors.title?.message} required>
          <input
            {...register('title')}
            placeholder="Contoh: Kemeja Linen Krem Oversized"
            className={inputCls}
          />
        </Field>

        <Field label="Harga (Rp)" error={errors.price?.message} required>
          <input
            type="number"
            min="0"
            step="1000"
            placeholder="150000"
            {...register('price', { valueAsNumber: true })}
            className={inputCls}
          />
        </Field>

        <Field label="Deskripsi" error={errors.description?.message}>
          <textarea
            {...register('description')}
            placeholder="Ceritakan detail bahan, potongan, atau kondisi produk..."
            rows={4}
            className={cn(inputCls, 'resize-none')}
          />
        </Field>
      </section>

      {/* ── Spesifikasi ───────────────────────────────────────────── */}
      <section className="space-y-4 rounded-2xl border border-soft-border bg-warm-white p-5">
        <h2 className="text-sm font-semibold text-charcoal">Spesifikasi</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Ukuran" error={errors.size?.message}>
            <input
              {...register('size')}
              placeholder="S / M / L / Free Size"
              className={inputCls}
            />
          </Field>

          <Field label="Kondisi" error={errors.condition?.message}>
            <select {...register('condition')} className={inputCls}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {c || '— pilih —'}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Kategori" error={errors.category?.message}>
          <input
            {...register('category')}
            placeholder="Atasan / Bawahan / Dress / Set / Outer"
            className={inputCls}
          />
        </Field>
      </section>

      {/* ── Status & Pengaturan ───────────────────────────────────── */}
      <section className="space-y-4 rounded-2xl border border-soft-border bg-warm-white p-5">
        <h2 className="text-sm font-semibold text-charcoal">Status & Pengaturan</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Status" error={errors.status?.message} required>
            <select {...register('status')} className={inputCls}>
              <option value="available">Tersedia</option>
              <option value="sold">Terjual</option>
            </select>
          </Field>

          <Field label="Urutan (sort_order)" error={errors.sort_order?.message}>
            <Controller
              name="sort_order"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0 = paling atas"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? null : parseInt(e.target.value, 10))
                  }
                  className={inputCls}
                />
              )}
            />
          </Field>
        </div>

        <div className="flex flex-col gap-3 pt-1">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              {...register('is_active')}
              className="h-4 w-4 rounded accent-taupe"
            />
            <span className="text-sm text-charcoal">
              Produk aktif <span className="text-warm-gray">(tampil di katalog publik)</span>
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              {...register('is_featured')}
              className="h-4 w-4 rounded accent-taupe"
            />
            <span className="text-sm text-charcoal">
              Produk unggulan <span className="text-warm-gray">(muncul di halaman utama)</span>
            </span>
          </label>
        </div>
      </section>

      {/* ── Error & tombol submit ─────────────────────────────────── */}
      {err && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {err}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 items-center gap-2 rounded-xl bg-charcoal px-6 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90 disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isEdit ? 'Simpan perubahan' : 'Tambah produk'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/produk')}
          className="h-11 rounded-xl border border-soft-border px-6 text-sm text-warm-gray transition-colors hover:border-charcoal hover:text-charcoal"
        >
          Batal
        </button>
      </div>
    </form>
  )
}
