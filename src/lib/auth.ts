import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import type { User } from '@supabase/supabase-js'

/** Mengembalikan user yang sedang login, atau null jika belum login. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

/**
 * Mengecek apakah user yang sedang login adalah admin.
 * Di-cache per request — aman dipanggil dari beberapa tempat
 * (layout, UserNav, dll.) tanpa DB query ganda.
 */
export const isAdmin = cache(async (): Promise<boolean> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return false

  const { data } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return data?.role === 'admin'
})
