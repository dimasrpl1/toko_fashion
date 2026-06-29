import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { WishlistProvider } from '@/components/providers/wishlist-provider'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch wishlist IDs agar tombol hati langsung render dengan state yang benar
  let wishlistIds: string[] = []
  if (user) {
    const { data } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', user.id)
    wishlistIds = data?.map((w) => w.product_id as string) ?? []
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <WishlistProvider initialIds={wishlistIds} isLoggedIn={!!user}>
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
      </WishlistProvider>
      <BottomNav />
    </div>
  )
}
