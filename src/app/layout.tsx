import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { MotionProvider } from '@/components/providers/motion-provider'

const geist = Geist({
  variable: '--font-geist',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL          // override eksplisit jika ada
    ?? (process.env.VERCEL_URL               // otomatis di-set oleh Vercel
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000')
  ),
  // judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
  title: {
    default: 'n1mpo',
    template: '%s | n1mpo',
  },
  description: 'Katalog outfit unik & terbatas — fashion rumahan yang bikin tampil beda.',
  icons: { icon: '/nojstudioid.jpg' },
  openGraph: {
    // judul asli nya nojstudioid cuman untuk sementara n1mpo dulu
    siteName: 'n1mpo',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={geist.variable} style={{ colorScheme: 'light' }}>
      <body className="bg-background text-foreground antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  )
}
