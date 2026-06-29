import { logout } from '@/lib/auth-actions'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'

interface Props {
  /**
   * default — teks kecil abu-abu (untuk header/nav)
   * danger  — tombol merah penuh (untuk halaman akun)
   */
  variant?: 'default' | 'danger'
}

export function LogoutButton({ variant = 'default' }: Props) {
  if (variant === 'danger') {
    return (
      <form action={logout}>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Keluar dari akun
        </button>
      </form>
    )
  }

  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-warm-gray transition-colors hover:text-charcoal"
      >
        Keluar
      </button>
    </form>
  )
}
