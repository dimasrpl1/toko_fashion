'use server'

import { revalidatePath } from 'next/cache'
import { ZodError } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/auth'
import { productSchema, type ProductInput } from '@/lib/product-schema'

export type ActionResult = { success: true } | { success: false; error: string }
export type CreateResult = { success: true; id: string } | { success: false; error: string }

function toSlug(title: string): string {
  return (
    title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-') +
    '-' +
    Date.now().toString(36)
  )
}

function clean(input: ProductInput) {
  return {
    ...input,
    description: input.description || null,
    size:        input.size        || null,
    condition:   input.condition   || null,
    category:    input.category    || null,
  }
}

function revalidateAll() {
  revalidatePath('/katalog', 'layout')
  revalidatePath('/admin',   'layout')
}

export async function createProduct(input: ProductInput): Promise<CreateResult> {
  if (!(await isAdmin())) return { success: false, error: 'Tidak punya akses' }

  try {
    const parsed   = productSchema.parse(input)
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .insert({ ...clean(parsed), slug: toSlug(parsed.title) })
      .select('id')
      .single()

    if (error) return { success: false, error: error.message }

    revalidateAll()
    return { success: true, id: data.id }
  } catch (e) {
    if (e instanceof ZodError) return { success: false, error: e.issues[0]?.message ?? 'Data tidak valid' }
    return { success: false, error: 'Terjadi kesalahan, coba lagi' }
  }
}

export async function updateProduct(id: string, input: ProductInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { success: false, error: 'Tidak punya akses' }

  try {
    const parsed   = productSchema.parse(input)
    const supabase = await createClient()

    const { error } = await supabase
      .from('products')
      .update(clean(parsed))
      .eq('id', id)

    if (error) return { success: false, error: error.message }

    revalidateAll()
    return { success: true }
  } catch (e) {
    if (e instanceof ZodError) return { success: false, error: e.issues[0]?.message ?? 'Data tidak valid' }
    return { success: false, error: 'Terjadi kesalahan, coba lagi' }
  }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { success: false, error: 'Tidak punya akses' }

  const supabase    = await createClient()
  const { error }   = await supabase.from('products').delete().eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidateAll()
  return { success: true }
}

export async function quickToggleStatus(
  id: string,
  status: 'available' | 'sold',
): Promise<ActionResult> {
  if (!(await isAdmin())) return { success: false, error: 'Tidak punya akses' }

  const supabase  = await createClient()
  const { error } = await supabase.from('products').update({ status }).eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidateAll()
  return { success: true }
}

export async function quickToggleActive(id: string, is_active: boolean): Promise<ActionResult> {
  if (!(await isAdmin())) return { success: false, error: 'Tidak punya akses' }

  const supabase  = await createClient()
  const { error } = await supabase.from('products').update({ is_active }).eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidateAll()
  return { success: true }
}
