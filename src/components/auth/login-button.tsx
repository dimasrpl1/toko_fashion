import { loginWithGoogle } from '@/lib/auth-actions'
import { GoogleIcon } from './google-icon'

interface Props {
  /** Path tujuan setelah login — diteruskan ke callback. */
  next?: string
  /** Variant tampilan: 'full' = lebar penuh dengan teks, 'compact' = teks pendek */
  variant?: 'full' | 'compact'
}

export function LoginButton({ next, variant = 'full' }: Props) {
  const action = loginWithGoogle.bind(null, next)

  if (variant === 'compact') {
    return (
      <form action={action}>
        <button
          type="submit"
          className="text-sm font-medium text-warm-gray transition-colors hover:text-charcoal"
        >
          Masuk
        </button>
      </form>
    )
  }

  return (
    <form action={action}>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-soft-border bg-warm-white px-5 py-3.5 text-sm font-medium text-charcoal shadow-sm transition-colors hover:bg-soft-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <GoogleIcon />
        Masuk dengan Google
      </button>
    </form>
  )
}
