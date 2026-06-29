'use server'

import { createClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/lib/auth'

export async function addToWishlist(productId: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Belum login')

  const supabase = await createClient()
  const { error } = await supabase
    .from('wishlists')
    .insert({ user_id: user.id, product_id: productId })

  // 23505 = unique_violation — item sudah ada di wishlist, abaikan
  if (error && error.code !== '23505') throw error
}

export async function removeFromWishlist(productId: string): Promise<void> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Belum login')

  const supabase = await createClient()
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', user.id)
    .eq('product_id', productId)

  if (error) throw error
}
