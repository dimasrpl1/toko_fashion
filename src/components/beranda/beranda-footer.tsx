import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.78 1.52V7.01a4.85 4.85 0 0 1-1.01-.32z" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Beranda',  href: '/'             },
  { label: 'Katalog',  href: '/katalog'       },
  { label: 'Kontak',   href: '/kontak'        },
]

const AKUN_LINKS = [
  { label: 'Profil',   href: '/akun'          },
  { label: 'Wishlist', href: '/akun/wishlist' },
]

export function BerandaFooter() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* judul asli nya nojstudioid cuman untuk sementara n1mpo dulu */}
            <p className="text-lg font-semibold tracking-wide">n1mpo</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/50">
              Outfit unik, satu-satunya.
              <br />
              Thrifted & styled dengan cinta.
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3">
              {/* TODO: ganti dengan link Instagram aktual */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-cream/40 hover:text-cream"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              {/* TODO: ganti dengan link TikTok aktual */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-cream/40 hover:text-cream"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              {/* TODO: ganti dengan nomor WhatsApp aktual */}
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/15 text-cream/50 transition-colors hover:border-cream/40 hover:text-cream"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/35">
              Menu
            </p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-cream/55 transition-colors hover:text-cream"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Akun */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/35">
              Akun
            </p>
            <ul className="space-y-2.5">
              {AKUN_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-cream/55 transition-colors hover:text-cream"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/35">
              Kontak
            </p>
            <ul className="space-y-2.5">
              <li>
                {/* TODO: ganti dengan nomor WhatsApp aktual */}
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                {/* TODO: ganti dengan link Instagram aktual */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="text-sm text-cream/55 transition-colors hover:text-cream"
                >
                  Kirim pesan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-cream/10 pt-6">
          <p className="text-xs text-cream/30">© 2026 n1mpo</p>
          <p className="text-xs text-cream/30">Made with ♥ in Indonesia</p>
        </div>
      </div>
    </footer>
  )
}
