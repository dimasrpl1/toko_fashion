import type { Metadata } from 'next'
import Link from 'next/link'
import { LoginButton } from '@/components/auth/login-button'

export const metadata: Metadata = { title: 'Masuk' }

type Props = { searchParams: Promise<{ next?: string }> }

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-lg font-semibold tracking-wide text-charcoal">
            nojstudio.id
          </Link>
          <p className="mt-2 text-sm text-warm-gray">
            Masuk untuk menyimpan outfit favoritmu ke wishlist
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-soft-border bg-warm-white p-6 shadow-sm">
          <LoginButton next={next} />
          <p className="mt-4 text-center text-xs text-warm-gray">
            Dengan masuk, kamu setuju dengan kebijakan privasi nojstudio.id.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link href="/katalog" className="text-sm text-warm-gray hover:text-charcoal transition-colors">
            Lanjutkan menjelajah tanpa masuk →
          </Link>
        </div>
      </div>
    </div>
  )
}
