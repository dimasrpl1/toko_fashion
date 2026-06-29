'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

/** Baca origin dari request headers — otomatis benar di localhost maupun Vercel. */
async function getOrigin(): Promise<string> {
  const h     = await headers()
  const host  = h.get('host') ?? 'localhost:3000'
  const proto = h.get('x-forwarded-proto') ?? 'http'
  return `${proto}://${host}`
}

/**
 * Mulai flow Google OAuth.
 * `next` = path tujuan setelah login berhasil (opsional).
 * `_formData` agar kompatibel saat dipanggil via `.bind()` di form action.
 */
export async function loginWithGoogle(next?: string, _formData?: FormData): Promise<void> {
  const supabase    = await createClient()
  const origin      = await getOrigin()
  const callbackUrl = `${origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ''}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: callbackUrl },
  })

  if (error) redirect('/auth/error')
  if (data.url) redirect(data.url)
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
