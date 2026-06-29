import { z } from 'zod'

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Nama minimal 2 karakter')
    .max(100, 'Nama maksimal 100 karakter')
    .trim(),
  phone: z
    .string()
    .max(20)
    .regex(/^(0|\+?62)[0-9]{7,13}$/, 'Format nomor HP tidak valid')
    .optional()
    .or(z.literal('')),
  address: z.string().max(500, 'Alamat maksimal 500 karakter').optional().or(z.literal('')),
})

export type ProfileInput = z.infer<typeof profileSchema>
