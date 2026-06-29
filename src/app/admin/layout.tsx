import { redirect } from 'next/navigation'
import { isAdmin } from '@/lib/auth'
import { AdminBottomNav } from '@/components/admin/admin-bottom-nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect('/')

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 p-4 pb-20 sm:p-6 sm:pb-24">{children}</main>
      <AdminBottomNav />
    </div>
  )
}
