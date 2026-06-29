import { z } from 'zod'

export const productSchema = z.object({
  title:       z.string().min(3, 'Judul minimal 3 karakter').max(200).trim(),
  description: z.string().max(2000).trim().optional().or(z.literal('')),
  // Gunakan z.number() (bukan coerce) — RHF mengurus konversi via valueAsNumber
  price:       z.number().min(1000, 'Harga minimal Rp 1.000'),
  size:        z.string().max(50).trim().optional().or(z.literal('')),
  condition:   z.string().max(100).optional().or(z.literal('')),
  category:    z.string().max(100).trim().optional().or(z.literal('')),
  status:      z.enum(['available', 'sold']),
  is_featured: z.boolean(),
  is_active:   z.boolean(),
  sort_order:  z.number().min(0).nullable(),
  images:      z.array(z.string()),
})

export type ProductInput = z.infer<typeof productSchema>
