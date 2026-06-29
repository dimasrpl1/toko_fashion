'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useCallback } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { m, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'

interface Props {
  categories: string[]
  sizes: string[]
  conditions: string[]
}

const STATUS_OPTIONS = [
  { value: '', label: 'Semua' },
  { value: 'available', label: 'Tersedia' },
  { value: 'sold', label: 'Terjual' },
]

const SORT_OPTIONS = [
  { value: 'terbaru', label: 'Terbaru' },
  { value: 'termurah', label: 'Termurah' },
  { value: 'termahal', label: 'Termahal' },
]

export function KatalogFilters({ categories, sizes, conditions }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sheetOpen, setSheetOpen] = useState(false)

  const currentStatus  = searchParams.get('status') ?? ''
  const currentSort    = searchParams.get('sort') ?? 'terbaru'
  const currentKat     = searchParams.get('kategori')?.split(',').filter(Boolean) ?? []
  const currentUkuran  = searchParams.get('ukuran')?.split(',').filter(Boolean) ?? []
  const currentKondisi = searchParams.get('kondisi')?.split(',').filter(Boolean) ?? []
  const currentMin     = searchParams.get('harga_min') ?? ''
  const currentMax     = searchParams.get('harga_max') ?? ''

  const activeCount = [
    currentStatus,
    currentKat.length,
    currentUkuran.length,
    currentKondisi.length,
    currentMin || currentMax,
  ].filter(Boolean).length

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const p = new URLSearchParams(searchParams.toString())
      if (!value) p.delete(key)
      else p.set(key, value)
      router.push(`/katalog?${p.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const toggleMulti = useCallback(
    (key: string, value: string, current: string[]) => {
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      setParam(key, next.join(',') || null)
    },
    [setParam]
  )

  const clearAll = () => router.push('/katalog', { scroll: false })

  /* ── Reusable chip ─────────────────────────────────────────── */
  const Chip = ({
    active,
    onClick,
    children,
  }: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={cn(
        'rounded-full border px-3 py-1 text-xs transition-colors',
        active
          ? 'border-charcoal bg-charcoal text-cream'
          : 'border-soft-border text-charcoal hover:border-charcoal'
      )}
    >
      {children}
    </button>
  )

  /* ── Filter sections (shared desktop + sheet) ──────────────── */
  const FilterSections = () => (
    <div className="space-y-5">
      {/* Status */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
          Status
        </p>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((opt) => (
            <Chip
              key={opt.value}
              active={currentStatus === opt.value}
              onClick={() => setParam('status', opt.value || null)}
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Kategori */}
      {categories.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
            Kategori
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Chip
                key={cat}
                active={currentKat.includes(cat)}
                onClick={() => toggleMulti('kategori', cat, currentKat)}
              >
                {cat}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Ukuran */}
      {sizes.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
            Ukuran
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((s) => (
              <Chip
                key={s}
                active={currentUkuran.includes(s)}
                onClick={() => toggleMulti('ukuran', s, currentUkuran)}
              >
                {s}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Kondisi */}
      {conditions.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
            Kondisi
          </p>
          <div className="flex flex-wrap gap-2">
            {conditions.map((k) => (
              <Chip
                key={k}
                active={currentKondisi.includes(k)}
                onClick={() => toggleMulti('kondisi', k, currentKondisi)}
              >
                {k}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {/* Harga */}
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
          Rentang Harga (Rp)
        </p>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            defaultValue={currentMin}
            min={0}
            onBlur={(e) => setParam('harga_min', e.target.value || null)}
            className="w-full rounded-lg border border-soft-border bg-warm-white px-3 py-1.5 text-xs text-charcoal placeholder:text-warm-gray focus:border-taupe focus:outline-none"
          />
          <span className="shrink-0 text-warm-gray">—</span>
          <input
            type="number"
            placeholder="Max"
            defaultValue={currentMax}
            min={0}
            onBlur={(e) => setParam('harga_max', e.target.value || null)}
            className="w-full rounded-lg border border-soft-border bg-warm-white px-3 py-1.5 text-xs text-charcoal placeholder:text-warm-gray focus:border-taupe focus:outline-none"
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* ── DESKTOP ──────────────────────────────────────────── */}
      <div className="hidden md:block">
        {/* Sort + reset row */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {activeCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 rounded-full border border-soft-border px-3 py-1 text-xs text-warm-gray hover:border-charcoal hover:text-charcoal"
              >
                <X className="h-3 w-3" />
                Reset filter
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-warm-gray">Urutkan:</span>
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  setParam('sort', opt.value === 'terbaru' ? null : opt.value)
                }
                className={cn(
                  'rounded-full border px-3 py-1 text-xs transition-colors',
                  currentSort === opt.value
                    ? 'border-charcoal bg-charcoal text-cream'
                    : 'border-soft-border text-charcoal hover:border-charcoal'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter panel */}
        <div className="rounded-xl border border-soft-border bg-warm-white p-4">
          <FilterSections />
        </div>
      </div>

      {/* ── MOBILE trigger ───────────────────────────────────── */}
      <div className="flex items-center justify-between md:hidden">
        <button
          onClick={() => setSheetOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-soft-border bg-warm-white px-4 py-2.5 text-sm text-charcoal"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter & Urutkan
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-taupe text-[10px] font-semibold text-cream">
              {activeCount}
            </span>
          )}
        </button>

        {activeCount > 0 && (
          <button onClick={clearAll} className="text-sm text-warm-gray underline underline-offset-2">
            Reset
          </button>
        )}
      </div>

      {/* ── MOBILE bottom sheet ───────────────────────────────── */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            {/* Backdrop */}
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-charcoal/40"
              onClick={() => setSheetOpen(false)}
            />

            {/* Sheet */}
            <m.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[88dvh] overflow-y-auto rounded-t-2xl bg-warm-white px-5 pb-10 pt-4 shadow-2xl"
            >
              {/* Handle */}
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-soft-border" />

              {/* Header */}
              <div className="mb-5 flex items-center justify-between">
                <span className="font-semibold text-charcoal">Filter & Urutkan</span>
                <button
                  onClick={() => setSheetOpen(false)}
                  aria-label="Tutup filter"
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-soft-border"
                >
                  <X className="h-5 w-5 text-warm-gray" />
                </button>
              </div>

              {/* Sort in sheet */}
              <div className="mb-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-warm-gray">
                  Urutkan
                </p>
                <div className="flex flex-wrap gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <Chip
                      key={opt.value}
                      active={currentSort === opt.value}
                      onClick={() =>
                        setParam('sort', opt.value === 'terbaru' ? null : opt.value)
                      }
                    >
                      {opt.label}
                    </Chip>
                  ))}
                </div>
              </div>

              <FilterSections />

              {/* CTA */}
              <div className="mt-6 flex gap-3">
                {activeCount > 0 && (
                  <button
                    onClick={() => {
                      clearAll()
                      setSheetOpen(false)
                    }}
                    className="flex-1 rounded-xl border border-soft-border py-3 text-sm text-charcoal"
                  >
                    Reset
                  </button>
                )}
                <button
                  onClick={() => setSheetOpen(false)}
                  className="flex-1 rounded-xl bg-charcoal py-3 text-sm font-medium text-cream"
                >
                  Tampilkan hasil
                </button>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
