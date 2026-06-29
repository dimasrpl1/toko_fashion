import type { Metadata } from 'next'
import { KontakContent } from '@/components/kontak/kontak-content'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi n1mpo lewat WhatsApp, Instagram, atau TikTok.',
}

export default function KontakPage() {
  return <KontakContent />
}
