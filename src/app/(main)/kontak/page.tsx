import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Kontak' }

export default function KontakPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-charcoal">Kontak</h1>
        <p className="mt-2 text-warm-gray">Info & form pesan — segera hadir</p>
      </div>
    </div>
  )
}
