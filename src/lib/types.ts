export type ProductStatus = 'available' | 'sold'

export interface Product {
  id: string
  slug: string
  title: string
  description: string | null
  price: number
  size: string | null
  condition: string | null
  category: string | null
  images: string[]
  status: ProductStatus
  is_featured: boolean
  is_active: boolean
  sort_order: number | null
  created_at: string
}
