import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { AdminNav } from '@/components/admin/admin-bottom-nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/')

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* AdminNav: renders sticky header on desktop, fixed bottom nav on mobile */}
      <AdminNav />
      {/* pb-20 hanya untuk mobile (agar konten tidak tertutup bottom nav) */}
      <main className="flex-1 p-4 pb-20 md:p-6 md:pb-6">{children}</main>
    </div>
  )
}
