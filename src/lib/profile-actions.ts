'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'
import { profileSchema, type ProfileInput } from '@/lib/profile-schema'
import { ZodError } from 'zod'

export type UpdateProfileResult = { success: true } | { success: false; error: string }

export async function updateProfile(input: ProfileInput): Promise<UpdateProfileResult> {
  try {
    const user = await getCurrentUser()
    if (!user) return { success: false, error: 'Belum login' }

    const parsed = profileSchema.parse(input)
    const supabase = await createClient()

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: parsed.full_name,
        phone: parsed.phone || null,
        // address di-simpan sebagai { text: "..." } untuk siap Fase 2
        address: parsed.address ? { text: parsed.address } : null,
      })
      .eq('id', user.id)

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (e) {
    if (e instanceof ZodError) {
      return { success: false, error: e.issues[0]?.message ?? 'Data tidak valid' }
    }
    return { success: false, error: 'Terjadi kesalahan, coba lagi' }
  }
}
