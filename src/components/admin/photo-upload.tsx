'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { X, Upload, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

interface Photo {
  id: string
  url: string
  preview?: string   // blob URL saat upload berlangsung
  uploading?: boolean
}

interface Props {
  value: string[]
  onChange: (urls: string[]) => void
  maxPhotos?: number
}

async function compressImage(file: File, maxDim = 1200, quality = 0.85): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const blobUrl = URL.createObjectURL(file)
    const img     = new globalThis.Image()
    img.onload = () => {
      URL.revokeObjectURL(blobUrl)
      const ratio  = Math.min(1, maxDim / img.width, maxDim / img.height)
      const canvas = document.createElement('canvas')
      canvas.width  = Math.round(img.width  * ratio)
      canvas.height = Math.round(img.height * ratio)
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('Canvas tidak tersedia')); return }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Kompresi gagal'))),
        'image/jpeg',
        quality,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(blobUrl); reject(new Error('Gagal memuat gambar')) }
    img.src = blobUrl
  })
}

export function PhotoUpload({ value, onChange, maxPhotos = 8 }: Props) {
  const [photos, setPhotos] = useState<Photo[]>(() =>
    value.map((url) => ({ id: crypto.randomUUID(), url })),
  )
  const inputRef     = useRef<HTMLInputElement>(null)
  const onChangeRef  = useRef(onChange)

  useEffect(() => { onChangeRef.current = onChange })

  // Sync ke RHF setiap kali photos berubah
  useEffect(() => {
    const urls = photos.filter((p) => p.url && !p.uploading).map((p) => p.url)
    onChangeRef.current(urls)
  }, [photos])

  async function handleFiles(files: FileList) {
    const supabase = createClient()
    const slots    = maxPhotos - photos.filter((p) => !p.uploading).length
    const toUpload = Array.from(files).slice(0, slots)

    for (const file of toUpload) {
      const tempId  = crypto.randomUUID()
      const preview = URL.createObjectURL(file)

      setPhotos((prev) => [...prev, { id: tempId, url: '', preview, uploading: true }])

      try {
        const compressed = await compressImage(file)
        const filename   = `${Date.now()}-${tempId.slice(0, 8)}.jpg`

        const { data, error } = await supabase.storage
          .from('products')
          .upload(filename, compressed, { contentType: 'image/jpeg', cacheControl: '31536000' })

        URL.revokeObjectURL(preview)
        if (error) throw error

        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(data.path)

        setPhotos((prev) =>
          prev.map((p) => (p.id === tempId ? { id: tempId, url: publicUrl } : p)),
        )
      } catch (err) {
        URL.revokeObjectURL(preview)
        setPhotos((prev) => prev.filter((p) => p.id !== tempId))
        console.error('Upload gagal:', err)
      }
    }
  }

  function remove(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
  }

  function move(id: string, dir: -1 | 1) {
    setPhotos((prev) => {
      const idx    = prev.findIndex((p) => p.id === id)
      const newIdx = idx + dir
      if (idx < 0 || newIdx < 0 || newIdx >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[newIdx]] = [next[newIdx], next[idx]]
      return next
    })
  }

  const canAdd = photos.length < maxPhotos

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="relative aspect-3/4 overflow-hidden rounded-xl border border-soft-border bg-warm-white"
          >
            {/* Preview blob URL saat upload */}
            {photo.preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo.preview}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* URL Supabase setelah upload selesai */}
            {!photo.preview && photo.url && (
              <Image
                src={photo.url}
                alt={`Foto ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, 25vw"
              />
            )}

            {/* Spinner saat upload */}
            {photo.uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
                <Loader2 className="h-6 w-6 animate-spin text-cream" />
              </div>
            )}

            {!photo.uploading && (
              <>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 rounded bg-charcoal/70 px-1.5 py-0.5 text-[10px] leading-tight text-cream">
                    Cover
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => remove(photo.id)}
                  className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-charcoal/70 text-cream hover:bg-charcoal"
                >
                  <X className="h-3 w-3" />
                </button>

                {photos.length > 1 && (
                  <div className="absolute bottom-1.5 right-1.5 flex gap-0.5">
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => move(photo.id, -1)}
                        className="flex h-5 w-5 items-center justify-center rounded bg-charcoal/70 text-cream hover:bg-charcoal"
                      >
                        <ChevronLeft className="h-3 w-3" />
                      </button>
                    )}
                    {idx < photos.length - 1 && (
                      <button
                        type="button"
                        onClick={() => move(photo.id, 1)}
                        className="flex h-5 w-5 items-center justify-center rounded bg-charcoal/70 text-cream hover:bg-charcoal"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="aspect-3/4 flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-soft-border text-warm-gray transition-colors hover:border-taupe hover:text-taupe"
          >
            <Upload className="h-5 w-5" />
            <span className="text-xs">Tambah foto</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => { if (e.target.files?.length) { handleFiles(e.target.files); e.target.value = '' } }}
      />

      <p className="text-xs text-warm-gray">
        Foto pertama jadi cover. Dikompres otomatis ke JPG. Maks {maxPhotos} foto.
      </p>
    </div>
  )
}
