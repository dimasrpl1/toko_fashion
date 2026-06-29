'use client'

import Link from 'next/link'
import { m, AnimatePresence } from 'motion/react'
import { MessageCircle, MapPin, Clock, ChevronDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

/* ── Config ─────────────────────────────────────────────────────── */
const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '6283875528144'
const WA_MSG    = encodeURIComponent('Halo, saya ingin bertanya tentang produk n1mpo 🙏')
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`

// TODO: isi dengan username Instagram & TikTok aktual, atau tambah ke .env.local
// NEXT_PUBLIC_IG_USERNAME=nama_akun_ig
// NEXT_PUBLIC_TIKTOK_USERNAME=nama_akun_tiktok
const IG_USERNAME    = process.env.NEXT_PUBLIC_IG_USERNAME    ?? 'n1mpo'
const TIKTOK_USERNAME = process.env.NEXT_PUBLIC_TIKTOK_USERNAME ?? 'n1mpo'
const IG_URL    = `https://instagram.com/${IG_USERNAME}`
const TIKTOK_URL = `https://tiktok.com/@${TIKTOK_USERNAME}`

/* ── Icons ───────────────────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
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

/* ── FAQ data ────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'Bagaimana cara memesan produk?',
    a: 'Kamu bisa langsung hubungi kami lewat WhatsApp. Sebutkan nama produk yang kamu minati, kami akan balas dan bantu proses pemesanan secara manual. Mudah, cepat, tanpa ribet.',
  },
  {
    q: 'Bagaimana proses pengiriman?',
    a: 'Pengiriman saat ini diatur manual via ekspedisi pilihan (JNE, J&T, SiCepat, dll.). Ongkir akan dikonfirmasi lewat WhatsApp setelah kamu memesan. Kami beroperasi dari Jakarta, Indonesia.',
  },
  {
    q: 'Apa itu kondisi "thrift" atau "like new"?',
    a: 'Barang thrift adalah barang bekas yang dipilih secara selektif — dalam kondisi baik, sudah dicuci bersih, dan dicek sebelum dijual. Setiap kekurangan kecil (jika ada) akan dicantumkan jujur di deskripsi produk.',
  },
  {
    q: 'Apakah produk bisa dikembalikan (retur)?',
    a: 'Karena setiap produk stoknya hanya 1 (one-of-a-kind) dan kondisi thrift, kami tidak menerima retur. Oleh karena itu kami sangat memastikan foto dan deskripsi akurat. Jika ada pertanyaan sebelum membeli, tanya dulu via WhatsApp — kami dengan senang hati menjawab.',
  },
]

const REVEAL = {
  hidden: { opacity: 0, y: 20 },
  show:   (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

/* ── FAQ item ────────────────────────────────────────────────────── */
function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false)

  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="border-b border-soft-border"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-charcoal md:text-base">{q}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-warm-gray transition-transform duration-300',
            open && 'rotate-180',
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-warm-gray">{a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )
}

/* ── Main component ──────────────────────────────────────────────── */
export function KontakContent() {
  return (
    <>
      {/* ── 1. Hero editorial ──────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-16 pt-20 md:pb-24 md:pt-28">
        {/* Ghost text dekoratif */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-4 left-0 select-none text-[8rem] font-bold leading-none text-soft-border/50 md:-top-8 md:text-[14rem]"
        >
          HALO
        </span>

        <div className="relative mx-auto max-w-4xl">
          <m.p
            variants={REVEAL}
            initial="hidden"
            animate="show"
            custom={0}
            className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe"
          >
            Hubungi Kami
          </m.p>

          <m.h1
            variants={REVEAL}
            initial="hidden"
            animate="show"
            custom={0.1}
            className="mt-4 text-5xl font-semibold leading-[1.06] tracking-tight text-charcoal md:text-7xl"
          >
            Mari<br />terhubung.
          </m.h1>

          <m.p
            variants={REVEAL}
            initial="hidden"
            animate="show"
            custom={0.22}
            className="mt-6 max-w-md text-base leading-relaxed text-warm-gray md:text-lg"
          >
            Punya pertanyaan soal produk, pengiriman, atau sekadar ingin tahu
            lebih? Kami senang bantu — reach out lewat channel pilihanmu.
          </m.p>
        </div>
      </section>

      {/* ── 2. Channel tiles ───────────────────────────────────── */}
      <section className="px-4 pb-16 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* WhatsApp — paling menonjol */}
            <m.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl bg-charcoal p-7 md:col-span-1"
            >
              <WhatsAppIcon className="h-8 w-8 text-cream/80" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream/40">
                Channel Utama
              </p>
              <p className="mt-1.5 text-xl font-semibold text-cream">WhatsApp</p>
              <p className="mt-2 text-sm leading-relaxed text-cream/55">
                Chat langsung dengan admin. Paling cepat dibalas.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-taupe">
                Mulai Chat
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </m.a>

            {/* Instagram */}
            <m.a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-soft-border bg-warm-white p-7 transition-colors hover:border-charcoal"
            >
              <InstagramIcon className="h-8 w-8 text-charcoal/70" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-gray">
                Sosial Media
              </p>
              <p className="mt-1.5 text-xl font-semibold text-charcoal">Instagram</p>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                Lihat koleksi terbaru & behind-the-scenes.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-charcoal">
                @{IG_USERNAME}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </m.a>

            {/* TikTok */}
            <m.a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-col rounded-2xl border border-soft-border bg-warm-white p-7 transition-colors hover:border-charcoal"
            >
              <TikTokIcon className="h-8 w-8 text-charcoal/70" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-gray">
                Sosial Media
              </p>
              <p className="mt-1.5 text-xl font-semibold text-charcoal">TikTok</p>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                Video styling & konten behind-the-scenes.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-charcoal">
                @{TIKTOK_USERNAME}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </m.a>
          </div>
        </div>
      </section>

      {/* ── 3. Info strip ──────────────────────────────────────── */}
      <m.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="border-y border-soft-border bg-warm-white px-4 py-10"
      >
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-border">
              <Clock className="h-5 w-5 text-warm-gray" />
            </div>
            <div>
              <p className="font-semibold text-charcoal">Waktu Respons</p>
              <p className="mt-1 text-sm leading-relaxed text-warm-gray">
                Biasanya dibalas dalam beberapa jam. Respon paling cepat
                pukul 08.00–21.00 WIB.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-border">
              <MapPin className="h-5 w-5 text-warm-gray" />
            </div>
            <div>
              <p className="font-semibold text-charcoal">Lokasi</p>
              <p className="mt-1 text-sm leading-relaxed text-warm-gray">
                Beroperasi dari Jakarta, Indonesia.
                Pengiriman ke seluruh wilayah Indonesia.
              </p>
            </div>
          </div>
        </div>
      </m.section>

      {/* ── 4. FAQ ─────────────────────────────────────────────── */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <m.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe">
              FAQ
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-charcoal md:text-3xl">
              Pertanyaan umum
            </h2>
          </m.div>

          <div className="border-t border-soft-border">
            {FAQS.map((faq, i) => (
              <FaqItem key={i} idx={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA penutup — follow Instagram ──────────────────── */}
      <section className="bg-charcoal px-4 py-20 md:py-24">
        <m.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-taupe">
            Jangan ketinggalan
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-cream md:text-4xl">
            Follow di Instagram
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/55">
            Setiap drop baru diumumkan pertama kali lewat Instagram.
            Follow supaya kamu yang pertama tahu — sebelum kehabisan.
          </p>

          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-cream/25 px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream hover:text-charcoal"
          >
            <InstagramIcon className="h-4 w-4" />
            @{IG_USERNAME}
          </a>

          <p className="mt-6 text-xs text-cream/30">
            Atau langsung{' '}
            <Link href="/katalog" className="underline underline-offset-2 hover:text-cream/60">
              jelajahi koleksi
            </Link>{' '}
            sekarang.
          </p>
        </m.div>
      </section>
    </>
  )
}
