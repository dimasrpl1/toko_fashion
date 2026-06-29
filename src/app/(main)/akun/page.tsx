import Image from 'next/image'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from '@/components/akun/profile-form'
import { AkunShortcuts } from '@/components/akun/akun-shortcuts'
import { LogoutButton } from '@/components/auth/logout-button'
import type { ProfileInput } from '@/lib/profile-schema'

export const metadata: Metadata = { title: 'Akun Saya' }

/** Ekstrak teks alamat dari kolom JSONB address. */
function parseAddress(jsonb: unknown): string {
  if (!jsonb) return ''
  if (typeof jsonb === 'string') return jsonb
  if (typeof jsonb === 'object' && jsonb !== null && 'text' in jsonb) {
    return String((jsonb as { text: unknown }).text ?? '')
  }
  return ''
}

export default async function AkunPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Proxy sudah redirect unauthenticated user ke /auth/login
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, phone, address')
    .eq('id', user.id)
    .single()

  const oauthName   = (user.user_metadata?.full_name ?? user.user_metadata?.name ?? '') as string
  const displayName = profile?.full_name ?? oauthName
  const email       = user.email ?? ''
  const avatarUrl   = user.user_metadata?.avatar_url as string | undefined
  const initial     = displayName[0]?.toUpperCase() ?? '?'

  const defaultValues: ProfileInput = {
    full_name: profile?.full_name ?? oauthName,
    phone:     profile?.phone    ?? '',
    address:   parseAddress(profile?.address),
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8 md:py-12">

      {/* ── Avatar + identitas ──────────────────────────────── */}
      <div className="mb-8 flex items-center gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={displayName}
            width={64}
            height={64}
            className="rounded-full ring-2 ring-soft-border"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-taupe text-2xl font-semibold text-cream">
            {initial}
          </div>
        )}
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-charcoal">
            {displayName || 'Pengguna'}
          </h1>
          <p className="truncate text-sm text-warm-gray">{email}</p>
        </div>
      </div>

      {/* ── Profil ──────────────────────────────────────────── */}
      <section>
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-warm-gray">
          Profil
        </h2>
        <div className="rounded-2xl border border-soft-border bg-warm-white p-5">
          <ProfileForm defaultValues={defaultValues} />
        </div>
      </section>

      {/* ── Pintasan ────────────────────────────────────────── */}
      <section className="mt-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-warm-gray">
          Menu
        </h2>
        <AkunShortcuts />
      </section>

      {/* ── Logout ──────────────────────────────────────────── */}
      <div className="mt-8 border-t border-soft-border pt-6">
        <LogoutButton variant="danger" />
      </div>

    </div>
  )
}
