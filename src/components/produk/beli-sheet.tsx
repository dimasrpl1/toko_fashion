'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { m, AnimatePresence, useDragControls } from 'motion/react'
import { MessageCircle, ShoppingBag, X, ChevronLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? ''

export interface UserProfile {
  fullName: string
  phone: string
  address: string
}

interface Props {
  isOpen: boolean
  onClose: () => void
  productTitle: string
  productSlug: string
  userProfile: UserProfile | null
}

type Step = 'pilihan' | 'pesan'

function openWA(message: string) {
  window.open(
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  )
}

/* ── Root sheet ───────────────────────────────────────────────── */
export function BeliSheet({ isOpen, onClose, productTitle, productSlug, userProfile }: Props) {
  const [step, setStep] = useState<Step>('pilihan')
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const dragControls = useDragControls()

  // Reset step setiap kali sheet dibuka
  useEffect(() => {
    if (isOpen) setStep('pilihan')
  }, [isOpen])

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  function handleTanya() {
    const url = `${window.location.origin}/katalog/${productSlug}`
    const msg = `Halo kak, saya ingin menanyakan tentang outfit ini : ${productTitle} ${url}`
    openWA(msg)
    onClose()
  }

  function handleKirim(name: string, phone: string, address: string) {
    const url = `${window.location.origin}/katalog/${productSlug}`
    const msg =
      `Nama Lengkap : ${name}\n` +
      `No Telepon: ${phone}\n` +
      `Alamat Lengkap : ${address}\n\n` +
      `Halo kak, saya ingin pesan outfit ini:\n\n` +
      `${productTitle}\n${url}`
    openWA(msg)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-charcoal/50 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Sheet panel */}
          <m.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 400) onClose()
            }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-background shadow-2xl"
          >
            {/* Handle */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              style={{ touchAction: 'none' }}
              className="flex cursor-grab justify-center pb-3 pt-4 active:cursor-grabbing"
            >
              <div className="h-1 w-10 rounded-full bg-soft-border" />
            </div>

            {/* Scrollable content */}
            <div className="max-h-[82vh] overflow-y-auto px-5 pb-10 pt-1">
              <AnimatePresence mode="wait" initial={false}>
                {step === 'pilihan' ? (
                  <m.div
                    key="pilihan"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PilihanStep
                      onTanya={handleTanya}
                      onPesan={() => setStep('pesan')}
                      onClose={onClose}
                    />
                  </m.div>
                ) : (
                  <m.div
                    key="pesan"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <PesanStep
                      userProfile={userProfile}
                      form={form}
                      setForm={setForm}
                      onBack={() => setStep('pilihan')}
                      onKirim={handleKirim}
                    />
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ── Step 1: Pilihan ──────────────────────────────────────────── */
function PilihanStep({
  onTanya,
  onPesan,
  onClose,
}: {
  onTanya: () => void
  onPesan: () => void
  onClose: () => void
}) {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold text-charcoal">Pilih cara hubungi</h2>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 text-warm-gray transition-colors hover:text-charcoal"
          aria-label="Tutup"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {/* Tanya */}
        <button
          onClick={onTanya}
          className="flex items-start gap-4 rounded-2xl border border-soft-border bg-warm-white p-4 text-left transition-colors hover:border-charcoal"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-border">
            <MessageCircle className="h-5 w-5 text-warm-gray" />
          </div>
          <div>
            <p className="font-semibold text-charcoal">Tanya tentang produk</p>
            <p className="mt-0.5 text-sm leading-snug text-warm-gray">
              Ingin tahu soal ukuran, kondisi, atau detail lainnya
            </p>
          </div>
        </button>

        {/* Pesan */}
        <button
          onClick={onPesan}
          className="flex items-start gap-4 rounded-2xl bg-charcoal p-4 text-left"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10">
            <ShoppingBag className="h-5 w-5 text-cream" />
          </div>
          <div>
            <p className="font-semibold text-cream">Pesan produk ini</p>
            <p className="mt-0.5 text-sm leading-snug text-cream/55">
              Langsung proses pemesanan lewat WhatsApp
            </p>
          </div>
        </button>
      </div>

      <button
        onClick={onClose}
        className="mt-4 w-full py-2.5 text-sm text-warm-gray transition-colors hover:text-charcoal"
      >
        Batal
      </button>
    </div>
  )
}

/* ── Step 2: Pesan ────────────────────────────────────────────── */
function PesanStep({
  userProfile,
  form,
  setForm,
  onBack,
  onKirim,
}: {
  userProfile: UserProfile | null
  form: { name: string; phone: string; address: string }
  setForm: (f: { name: string; phone: string; address: string }) => void
  onBack: () => void
  onKirim: (name: string, phone: string, address: string) => void
}) {
  const backBtn = (
    <button
      onClick={onBack}
      className="mb-4 flex items-center gap-1.5 text-sm text-warm-gray transition-colors hover:text-charcoal"
    >
      <ChevronLeft className="h-4 w-4" />
      Kembali
    </button>
  )

  /* ── Logged-in: tampilkan data profil ── */
  if (userProfile !== null) {
    const hasAllData = !!(userProfile.fullName && userProfile.phone && userProfile.address)

    return (
      <div>
        {backBtn}
        <h2 className="mb-4 text-base font-semibold text-charcoal">
          Konfirmasi data pengiriman
        </h2>

        <div className="rounded-2xl border border-soft-border bg-warm-white">
          <ProfileRow label="Nama Lengkap" value={userProfile.fullName} />
          <ProfileRow label="No Telepon" value={userProfile.phone} />
          <ProfileRow label="Alamat Lengkap" value={userProfile.address} isLast />
        </div>

        {!hasAllData && (
          <p className="mt-2.5 text-xs leading-relaxed text-warm-gray">
            Ada data yang belum terisi — lengkapi profil agar admin bisa menghubungimu.
          </p>
        )}

        <Link
          href="/akun"
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-taupe transition-colors hover:text-charcoal"
        >
          Edit profil
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>

        <button
          onClick={() => onKirim(userProfile.fullName, userProfile.phone, userProfile.address)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal/90 active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4" />
          Kirim via WhatsApp
        </button>
      </div>
    )
  }

  /* ── Guest: form isi data ── */
  const canSubmit = form.name.trim() && form.phone.trim() && form.address.trim()

  return (
    <div>
      {backBtn}
      <h2 className="mb-4 text-base font-semibold text-charcoal">Data pengiriman</h2>

      <div className="flex flex-col gap-3">
        <FormField label="Nama Lengkap">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-xl border border-soft-border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 focus:border-charcoal focus:outline-none"
          />
        </FormField>

        <FormField label="No Telepon">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="08xx-xxxx-xxxx"
            className="w-full rounded-xl border border-soft-border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 focus:border-charcoal focus:outline-none"
          />
        </FormField>

        <FormField label="Alamat Lengkap">
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Nama jalan, kelurahan, kecamatan, kota, kode pos"
            rows={3}
            className="w-full resize-none rounded-xl border border-soft-border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/50 focus:border-charcoal focus:outline-none"
          />
        </FormField>
      </div>

      <button
        onClick={() => onKirim(form.name, form.phone, form.address)}
        disabled={!canSubmit}
        className={cn(
          'mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-cream transition-all',
          canSubmit
            ? 'bg-charcoal hover:bg-charcoal/90 active:scale-[0.98]'
            : 'cursor-not-allowed bg-charcoal/30',
        )}
      >
        <MessageCircle className="h-4 w-4" />
        Kirim via WhatsApp
      </button>
    </div>
  )
}

/* ── Helpers ──────────────────────────────────────────────────── */
function ProfileRow({
  label,
  value,
  isLast = false,
}: {
  label: string
  value: string
  isLast?: boolean
}) {
  return (
    <div className={cn('px-4 py-3', !isLast && 'border-b border-soft-border')}>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-warm-gray">{label}</p>
      <p className={cn('mt-0.5 text-sm', value ? 'text-charcoal' : 'text-warm-gray/40')}>
        {value || '—'}
      </p>
    </div>
  )
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-semibold text-warm-gray">{label}</span>
      {children}
    </label>
  )
}
