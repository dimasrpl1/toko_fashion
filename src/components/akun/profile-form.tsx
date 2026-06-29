'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { m, AnimatePresence } from 'motion/react'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { profileSchema, type ProfileInput } from '@/lib/profile-schema'
import { updateProfile } from '@/lib/profile-actions'

interface Props {
  defaultValues: ProfileInput
}

export function ProfileForm({ defaultValues }: Props) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileInput) {
    setStatus('idle')
    const result = await updateProfile(data)
    if (result.success) {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 3500)
    } else {
      setErrorMsg(result.error)
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Nama */}
      <Field label="Nama Lengkap" error={errors.full_name?.message}>
        <input
          {...register('full_name')}
          type="text"
          placeholder="Nama kamu"
          autoComplete="name"
          className={inputCn(!!errors.full_name)}
        />
      </Field>

      {/* Nomor HP */}
      <Field label="Nomor HP" error={errors.phone?.message} hint="Contoh: 081234567890">
        <input
          {...register('phone')}
          type="tel"
          placeholder="08xxxxxxxxxx"
          autoComplete="tel"
          className={inputCn(!!errors.phone)}
        />
      </Field>

      {/* Alamat */}
      <Field
        label="Alamat Pengiriman"
        error={errors.address?.message}
        hint="Akan digunakan saat checkout (Fase 2)"
      >
        <textarea
          {...register('address')}
          rows={3}
          placeholder="Jl. ..., Kota, Provinsi, Kode Pos"
          autoComplete="street-address"
          className={cn(inputCn(!!errors.address), 'resize-none leading-relaxed')}
        />
      </Field>

      {/* Tombol simpan */}
      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-charcoal py-3 text-sm font-semibold text-cream transition-all hover:bg-charcoal/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
      </button>

      {/* Feedback */}
      <AnimatePresence>
        {status === 'success' && (
          <m.p
            key="success"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-1.5 text-sm text-taupe"
          >
            <Check className="h-4 w-4" />
            Profil berhasil diperbarui
          </m.p>
        )}
        {status === 'error' && (
          <m.p
            key="error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-1.5 text-sm text-red-600"
          >
            <AlertCircle className="h-4 w-4" />
            {errorMsg}
          </m.p>
        )}
      </AnimatePresence>
    </form>
  )
}

/* ── helpers ─────────────────────────────────────────────────── */

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      {hint && <span className="ml-2 text-xs text-warm-gray">{hint}</span>}
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  )
}

function inputCn(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-warm-white px-4 py-3 text-sm text-charcoal placeholder:text-warm-gray/70 outline-none transition',
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-200'
      : 'border-soft-border focus:border-taupe focus:ring-2 focus:ring-taupe/20'
  )
}
