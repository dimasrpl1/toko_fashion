# PRD — Website Katalog Fashion "Limited Outfit"

**Versi:** 1.3
**Tanggal:** 27 Juni 2026
**Status:** Draft untuk dikembangkan
**Jenis produk:** Website **katalog/lookbook fashion rumahan** dengan stok terbatas (1 item per produk). Transaksi/pembayaran masuk fase lanjutan.

> **Perubahan v1.1:** Fokus utama digeser jadi **katalog/koleksi yang menarik & bikin senang dilihat** (etalase digital dari postingan Instagram). Pembayaran (Midtrans) **dikesampingkan dulu** ke Fase 2. Ditambahkan **fitur Wishlist**. Produk yang sudah terjual **tetap ditampilkan**. Pembelian di tahap awal dilakukan **manual via WhatsApp**.
>
> **Perubahan v1.2:** Produk `sold` tampil di katalog tapi **selalu diurutkan paling akhir**, dengan **filter status (Tersedia / Terjual)**. Layout katalog = **grid rapi** (bukan masonry). **Tanpa** teaser feed Instagram di beranda. **Wishlist wajib login.**
>
> **Perubahan v1.3:** Palet warna final dipilih = **"Cream & Charcoal"** (lihat Bagian 13.A) — lengkap dengan kode hex & aturan pemakaian.

---

## 1. Ringkasan Produk

Website ini adalah **etalase digital (lookbook)** untuk brand fashion rumahan yang menjual **outfit/paket pakaian one-of-a-kind** — baju bekas (thrift) atau buatan sendiri yang di-styling jadi satu set outfit siap pakai. Karakter utama produk: **setiap produk stoknya hanya 1 (limited / unik)**.

Outfit-nya juga diposting di **Instagram**, jadi website ini berperan sebagai **"rumah" dari koleksi** — tempat orang yang lihat di IG bisa mampir untuk lihat katalog lengkap, detail, dan menyimpan favorit. Karena itu, **prioritas nomor satu adalah pengalaman melihat katalog yang menarik, mulus, dan bikin betah** — bukan dulu soal transaksi.

Target pasar: **anak muda yang mayoritas browsing lewat HP**. Prinsip: cepat, mobile-first, dan visual yang terasa "premium" tapi tetap ringan.

### Peran website ini
- **Lookbook / katalog koleksi** yang cantik dan enak di-scroll.
- **Tujuan link dari Instagram** (di bio/postingan) → orang klik → lihat koleksi lengkap.
- **Tempat menyimpan wishlist** produk favorit.
- **Pintu masuk pembelian** (tahap awal: arahkan ke WhatsApp; tahap lanjut: checkout + Midtrans).

### Yang membedakan dari toko online biasa
- Stok 1 = scarcity → ini daya tarik. UX menonjolkan "✨ Hanya 1", status "TERJUAL".
- Produk unik, tanpa varian. Tiap produk = entitas tunggal: foto, ukuran fix, kondisi (untuk thrift).
- Karena nyambung dengan IG, tampilan **harus cakep saat di-share** (preview link/Open Graph yang menarik).

---

## 2. Tujuan & Sasaran

| Tujuan Bisnis | Sasaran Terukur |
|---|---|
| Punya katalog koleksi yang menarik & profesional | Pengunjung betah scroll, lihat banyak produk per sesi |
| Jadi tujuan link dari Instagram | Trafik dari IG mampir & menjelajah katalog |
| Bikin pembeli "jatuh hati" & menyimpan favorit | Banyak produk di-wishlist; wishlist → minat beli |
| Pengalaman mobile mulus untuk anak muda | Core Web Vitals "Good" di mobile (LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Admin gampang kelola produk sendiri | Tambah produk + upload foto < 2 menit, tanpa sentuh kode |
| (Fase 2) Transaksi self-service | Checkout + bayar tanpa chat manual |

---

## 3. Target Pengguna & Persona

**Persona 1 — Pengunjung/Pembeli (anak muda, 17–27 thn)**
Lihat outfit di IG → penasaran → klik link → buka website dari HP. Suka outfit unik yang nggak pasaran. Senang scroll katalog yang cakep, menyimpan yang disuka (wishlist), dan takut keduluan orang lain karena stok 1. Tidak sabar menunggu loading.

**Persona 2 — Admin / Owner (pemilik toko rumahan)**
Bukan orang teknis. Foto produk pakai HP, mau upload sendiri, atur harga & status (tersedia/terjual). Untuk sekarang transaksi & pengiriman diurus **manual**. Butuh dashboard yang super sederhana.

---

## 4. Konteks & Aturan Bisnis

1. **1 produk = 1 stok.** Setelah terjual, produk berstatus `sold`.
2. **Produk `sold` TETAP DITAMPILKAN** di katalog, tapi **selalu diurutkan paling akhir** (setelah semua produk tersedia). Diberi overlay/badge "TERJUAL" — memberi kesan toko aktif, laris, dan menambah FOMO. Katalog juga punya **filter status** sehingga pengunjung bisa memilih lihat "Tersedia" saja, "Terjual" saja, atau semua.
3. **Status produk diatur MANUAL oleh admin** di tahap awal (admin menandai "Terjual" sendiri). Reservasi otomatis menyusul di Fase 2 bersama pembayaran.
4. **Pembelian tahap awal lewat WhatsApp.** Tombol "Beli" / "Tanya Produk" mengarahkan ke chat WA admin dengan pesan otomatis berisi nama produk. Pengiriman diatur manual oleh owner.
5. **Wishlist** butuh login (supaya tersimpan di akun & sinkron antar perangkat).
6. **Atribut produk:** judul, deskripsi/story, harga, ukuran (S/M/L/custom), kondisi (thrift: "Like New", "Good", dll.), kategori/tag, beberapa foto.
7. **Pembayaran (Midtrans) & checkout otomatis = Fase 2.** Sudah diputuskan pakai **Midtrans**, tapi implementasinya ditunda.

---

## 5. Tech Stack (Rekomendasi)

Fondasi yang sudah ditetapkan: **Next.js + Supabase + Vercel**. Berikut stack lengkap, dipilih untuk web yang cepat, mobile-first, dan punya visual/animasi halus.

### Inti (sudah ditetapkan)
| Teknologi | Peran | Catatan |
|---|---|---|
| **Next.js (App Router)** | Framework utama | Server Components → JS ke HP minim → web ngebut. ISR untuk halaman katalog. SEO & Open Graph bagus untuk link yang di-share dari IG. |
| **Supabase** | Database (Postgres) + Auth + Storage + Realtime | Satu platform: DB, login Google, simpan foto, dan wishlist. |
| **Vercel** | Hosting & deploy | CDN global, image optimization bawaan, deploy otomatis tiap push ke Git. |

### Tambahan yang direkomendasikan
| Teknologi | Untuk apa | Kenapa ini |
|---|---|---|
| **Tailwind CSS** | Styling | Mobile-first by default, bundle kecil. |
| **shadcn/ui** | Komponen UI | Siap pakai, aksesibel, bisa di-styling penuh, ringan (kode disalin ke project). |
| **Motion** (dulu Framer Motion) | Animasi | Standar de-facto animasi React/Next.js 2026. Untuk page transition, hover, reveal-on-scroll, animasi wishlist. **Pakai `LazyMotion` + komponen `m`** agar bundle kecil. |
| **next/image** | Optimasi gambar | Auto resize, AVIF/WebP, lazy-load. Krusial karena katalog fashion = foto banyak (penyebab utama web lambat). |
| **Zustand** | State ringan di klien | Untuk state UI (mis. wishlist optimistic, keranjang nanti). |
| **Zod + React Hook Form** | Form & validasi | Form admin & kontak yang aman dan mulus. |
| **Midtrans (Snap)** | Payment gateway — **Fase 2** | Sudah diputuskan. Detail di Bagian 8. |

> **Prinsip performa:** animasi hanya pakai `transform` & `opacity` (di-handle GPU) agar mulus 60fps di HP. Hindari animasi yang memicu layout recalculation.

---

## 6. Struktur Halaman & Arsitektur Informasi

### Halaman Publik (tanpa login)
```
/                     → Beranda (hero, koleksi unggulan, "baru drop", CTA)
/katalog              → Katalog produk (grid cantik, filter, sort, status stok)
/katalog/[slug]       → Detail produk (galeri foto, story, ukuran, kondisi, wishlist, beli via WA)
/kontak               → Kontak (info toko, WhatsApp, sosmed, form pesan)
```

### Halaman Pengguna (perlu login)
```
/akun                 → Profil pengguna
/akun/wishlist        → Daftar produk yang di-wishlist  ⭐ BARU
```

### Halaman Admin (perlu login + role admin)
```
/admin                → Dashboard ringkas (produk aktif, terjual, total wishlist)
/admin/produk         → Kelola produk (list + tambah/edit/hapus + upload foto + tandai terjual)
/admin/produk/baru    → Form tambah produk
/admin/produk/[id]    → Form edit produk
```

### Fase 2 (transaksi) — disiapkan kemudian
```
/keranjang   /checkout   /pesanan/[id]   /admin/pesanan
```

### Catatan navigasi mobile
- **Bottom navigation bar** di mobile: Beranda, Katalog, Wishlist, Akun.
- Filter katalog muncul sebagai **bottom sheet** (geser dari bawah).

---

## 7. Fitur per Halaman (Functional Requirements)

### 7.1 Beranda (`/`) — "Wow" pertama
Tujuan: begitu orang datang dari IG, langsung terkesan.
- **Hero** dengan foto outfit andalan + tagline brand + CTA "Lihat Koleksi".
- Section **"✨ Baru Drop"** — produk terbaru (animasi reveal saat scroll).
- Section **"🔥 Limited / Hampir Habis"** — menonjolkan scarcity.
- Optional: **story brand** (fashion rumahan, thrift sustainable) untuk membangun koneksi emosional.
- Animasi muncul halus saat di-scroll — elegan, tidak berlebihan.

### 7.2 Katalog (`/katalog`) — bintang utama produk ini
- **Grid rapi & responsif:** **2 kolom di HP**, 3–4 di desktop. Rapi dan konsisten (tinggi kartu seragam) supaya katalog terasa bersih dan profesional.
- Tiap kartu: foto utama yang menonjol, judul, harga, **ikon wishlist (hati)**, badge status (`Tersedia` / `TERJUAL`).
- **Hover/tap** menampilkan foto kedua (ganti gambar) → terasa hidup.
- **Filter status:** Tersedia / Terjual / Semua (default: Tersedia di atas).
- Filter lain: kategori/tag, ukuran, rentang harga, kondisi.
- Sort: terbaru, harga termurah/termahal. **Apa pun sort-nya, produk `sold` selalu jatuh ke urutan paling akhir.**
- **Loading** pakai **skeleton shimmer**.

### 7.3 Detail Produk (`/katalog/[slug]`)
- **Galeri foto** besar, swipe di HP, bisa zoom — fokus utama.
- Judul, harga, ukuran, kondisi, **deskripsi/story produk** (cerita outfit-nya — ini yang bikin unik & emosional).
- Indikator scarcity: "⚡ Hanya 1 tersedia".
- **Tombol Wishlist (hati)** dengan animasi saat ditekan.
- **Tombol "Beli via WhatsApp"** → buka chat WA admin, pesan otomatis: *"Halo, saya mau pesan produk [Judul] — [link]"*.
- **Tombol "Bagikan"** → share ke IG story / salin link (preview link harus cakep — lihat Bagian 11 soal Open Graph).
- Section **"Koleksi Lainnya"** / produk serupa di bawah.
- Kalau `sold`: tampilkan "Sudah Terjual" + saran produk lain.

### 7.4 Kontak (`/kontak`)
- Info toko, link **WhatsApp** (klik buka chat), Instagram/TikTok.
- Form pesan sederhana (nama, pesan) → masuk tabel `messages` Supabase.

### 7.5 Wishlist (`/akun/wishlist`) ⭐ BARU
- Grid produk yang sudah disimpan user (mirip kartu katalog).
- Bisa hapus dari wishlist (animasi item keluar halus).
- Klik produk → ke detail.
- **Wishlist wajib login.** Tombol hati di mana pun (katalog/detail) langsung update wishlist secara **optimistic** (UI berubah instan, lalu disimpan ke Supabase). Tersimpan di akun → sinkron antar perangkat.
- Kalau **belum login** & menekan hati → munculkan prompt login Google yang ramah ("Masuk dulu untuk menyimpan favoritmu"). Tidak ada wishlist tamu.
- Tampilkan badge jumlah wishlist di akun/nav.

### 7.6 Akun (`/akun`)
- Profil (nama, no. HP, alamat — alamat berguna untuk Fase 2).
- Pintasan ke **Wishlist**.

### 7.7 Admin — Kelola Produk (`/admin/produk`)
- Tabel produk: foto, judul, harga, status, aksi (edit/hapus).
- **Tombol cepat "Tandai Terjual"** (manual) — langsung ubah status.
- Form tambah/edit: judul, deskripsi/story, harga, ukuran, kondisi, kategori, **upload multi-foto** (ke Supabase Storage, dengan kompres).
- Toggle aktif/nonaktif & atur urutan/unggulan.

### 7.8 Admin — Dashboard (`/admin`)
- Ringkasan: jumlah produk tersedia/terjual, **produk paling banyak di-wishlist** (insight produk mana yang paling diminati → bantu owner memutuskan koleksi berikutnya).

---

## 8. Pembelian & Pembayaran

### 8.A Tahap Awal (sekarang) — Beli via WhatsApp
- Tombol "Beli via WhatsApp" di detail produk membuka chat WA admin dengan pesan otomatis berisi nama + link produk.
- Admin balas, atur pembayaran & pengiriman **manual**, lalu tandai produk "Terjual" di dashboard.
- Sederhana, gratis, cocok untuk memvalidasi koleksi & trafik dulu.

### 8.B Fase 2 — Checkout + Midtrans (disiapkan nanti)
Sudah diputuskan pakai **Midtrans** (rekomendasi: **Midtrans Snap**; pakai **Midtrans GO** bila usaha belum berbadan hukum — mendukung **GoPay/QRIS** yang pas untuk anak muda, dokumentasi Bahasa Indonesia lengkap).

Tantangan inti Fase 2 karena stok 1 = **race condition** (dua orang tak boleh beli barang sama). Solusi yang sudah dirancang:
- **Status produk:** `available → reserved (sementara) → sold`.
- Saat checkout, kunci baris produk di **transaksi database atomik** di server (lewat Postgres function/RPC Supabase), set `reserved_until`. Kalau bayar gagal/timeout → balik `available`.
- **Webhook Midtrans** (bukan redirect browser) = sumber kebenaran status bayar → yang menetapkan `sold`.
- **Durasi reservasi: disesuaikan dengan perilaku pembeli.** Mulai dari nilai wajar (mis. 10–15 menit), lalu **pantau & tuning** dari data nyata: kalau pembeli biasanya cepat bayar pakai QRIS/e-wallet, durasi bisa dipendekkan agar produk tak lama "terkunci"; kalau banyak yang bayar via VA/transfer, beri lebih longgar. Sediakan agar nilai ini **mudah diubah** (config), bukan di-hardcode.

### 8.C Pengiriman
- **Sekarang:** manual oleh owner (ekspedisi pilihan), ongkir diinfokan via WA.
- **Fase lanjut:** integrasi ongkir otomatis (Biteship / Komerce-RajaOngkir) di checkout.

---

## 9. Sistem Autentikasi & Role

- **Login: Google OAuth via Supabase Auth.** Satu klik, tanpa password — pas untuk anak muda.
- Login dibutuhkan untuk **wishlist** (dan transaksi di Fase 2). **Browsing katalog bebas tanpa login.**
- Saat login pertama, buat record `profiles` dengan `role` default `user`.
- **Role admin** di-set manual di DB untuk akun owner. Halaman `/admin/*` dicek di server — non-admin di-redirect.
- **Row Level Security (RLS) Supabase wajib aktif:**
  - User hanya bisa baca/ubah wishlist & profilnya sendiri.
  - Hanya admin yang bisa insert/update/delete produk.
  - Produk bisa dibaca publik (katalog).

---

## 10. Skema Database (Awal)

```sql
profiles (
  id          uuid PK (ref auth.users),
  full_name   text,
  phone       text,
  address     jsonb,                 -- untuk Fase 2
  role        text default 'user',   -- 'user' | 'admin'
  created_at  timestamptz
)

products (
  id             uuid PK,
  slug           text unique,
  title          text,
  description    text,                -- story produk
  price          integer,             -- Rupiah
  size           text,
  condition      text,                -- untuk thrift
  category       text,
  images         jsonb,               -- array URL Supabase Storage
  status         text default 'available', -- 'available' | 'sold' (reserved menyusul Fase 2)
  is_featured    boolean default false,
  is_active      boolean default true,
  sort_order     integer,
  created_at     timestamptz
)

-- ⭐ Wishlist
wishlists (
  id          uuid PK,
  user_id     uuid,
  product_id  uuid,
  created_at  timestamptz,
  unique(user_id, product_id)
)

messages (
  id, name, message, created_at
)

-- Fase 2 (disiapkan nanti): orders, order_items, cart_items,
-- + kolom products.reserved_until, products.reserved_by, status 'reserved'
```

> **Index penting:** `products.slug`, `products.status`, `products.is_featured`, `wishlists.user_id`.
> Untuk "produk paling banyak di-wishlist": query `count` pada `wishlists` di-group per `product_id`.

---

## 11. Strategi Performa & "Cakep Saat Di-Share"

1. **Server Components dulu** → render katalog & beranda di server, JS klien minim.
2. **ISR** untuk katalog & detail → cepat & di-cache, regenerate saat produk berubah.
3. **next/image** untuk semua foto: ukuran responsif, AVIF/WebP, lazy-load, blur placeholder.
4. **Kompres foto saat upload** di admin (resize maksimal & convert) sebelum masuk Storage.
5. **Open Graph / preview link yang menarik** — saat link produk dibagikan ke IG story/DM/WA, preview-nya harus menampilkan foto produk + judul + harga. Penting karena trafik datang dari IG.
6. **Code splitting & dynamic import** untuk komponen berat (galeri zoom).
7. **Motion + `LazyMotion`** agar bundle animasi kecil.
8. **Skeleton loader** → kesan cepat, CLS rendah.
9. **Vercel Analytics** untuk pantau Core Web Vitals. Target mobile: LCP < 2.5s, INP < 200ms, CLS < 0.1.

---

## 12. Strategi Mobile & Responsif (Prioritas Utama)

Desain **mobile-first**, baru di-scale ke desktop.
- **Bottom navigation:** Beranda, Katalog, Wishlist, Akun.
- Tombol/area klik minimal **44×44px** (jempol-friendly).
- Katalog **2 kolom** di HP, **grid rapi** dengan tinggi kartu seragam.
- Galeri foto: **swipe gesture** + zoom.
- Filter: **bottom sheet**.
- Font besar & kontras (terbaca di terik).
- Test di layar kecil nyata.
- *(Opsional)* **PWA** → bisa "install" ke home screen.

---

## 13. Animasi & UI/UX — Bikin Senang Lihat Katalog

Tujuan: katalog terasa **premium & menyenangkan**, bukan toko generik. Pakai **Motion**, secukupnya.

- **Page transition** halus antar halaman.
- **Kartu produk**: hover/tap ganti ke foto kedua + sedikit scale → terasa hidup.
- **Wishlist (hati)**: animasi "pop"/burst saat ditekan + isi warna → memuaskan secara visual.
- **Reveal on scroll** di beranda & katalog (fade/slide-up bertahap).
- **Galeri detail**: transisi geser foto yang mulus.
- **Skeleton shimmer** saat loading.
- Badge "TERJUAL" dengan micro-interaction halus.
- Hormati `prefers-reduced-motion`.

**Arah visual yang disarankan:** bersih, banyak whitespace, **foto produk jadi bintang utama** (editorial/lookbook feel), aksen warna dipakai hemat, tipografi modern dengan hierarki jelas. Konsisten dengan estetika feed Instagram-mu agar terasa satu identitas.

### 13.A Palet Warna — "Cream & Charcoal" (FINAL)

Arah palet: *quiet luxury* hangat yang cocok untuk brand thrift/handmade. **Prinsip: hindari putih murni & hitam murni** (terasa kaku) — pakai off-white hangat & charcoal yang dilembutkan. Warna aksen (taupe) dipakai **hemat**, hanya untuk detail kecil.

| Peran | Nama | Hex | Dipakai untuk |
|---|---|---|---|
| **Latar utama** | Cream | `#F4EFE7` | Background halaman |
| **Surface / kartu** | Warm White | `#FBF8F2` | Kartu produk, panel, modal |
| **Teks utama** | Charcoal | `#211F1C` | Judul, harga, teks utama (bukan hitam murni) |
| **Teks sekunder** | Warm Gray | `#8C8478` | Deskripsi, caption, label muted |
| **Aksen** | Taupe / Sand | `#A18A6A` | Ikon wishlist aktif, badge, tombol, garis aktif |
| **Aksen gelap** | Deep Taupe | `#6B5A3E` | Teks di atas latar aksen muda, hover |
| **Garis / hairline** | Soft Border | `#E4DBCB` | Border kartu, pemisah |

**Aturan pemakaian warna:**
- **Tombol utama (CTA)** mis. "Beli via WhatsApp": latar Charcoal `#211F1C` + teks Cream — atau versi aksen Taupe untuk variasi. Cukup satu gaya tombol utama yang konsisten.
- **Ikon wishlist (hati):** non-aktif = outline Warm Gray; aktif = terisi Taupe `#A18A6A`.
- **Badge "Limited / Hanya 1":** latar taupe muda (`#EFE6D8`) + teks Deep Taupe `#6B5A3E`.
- **Badge / overlay "TERJUAL":** Charcoal `#211F1C` dengan opacity ~80% di atas foto + teks Cream → produk sold terlihat jelas tapi tetap elegan.
- **Status "Tersedia":** boleh tanpa badge mencolok (default), agar fokus tetap di foto.
- Pertahankan **kontras teks** yang cukup (teks Charcoal di atas Cream sudah aman dibaca).

> **Catatan dark mode:** karena ini brand fashion dengan identitas warna spesifik, situs bisa dibuat **light-mode saja** (paksa palet ini) agar konsisten dengan feed Instagram — tidak wajib menyediakan dark mode. Kalau nanti mau dark mode, siapkan versi gelap terpisah (mis. latar `#1B1A17`, surface `#262420`, teks cream).

---

## 14. Keamanan & Hal Non-Fungsional

- **RLS Supabase aktif** di semua tabel sensitif.
- Validasi input (Zod) di server.
- Logika harga & status produk **hanya di server**.
- Secret/API key di environment variable Vercel.
- Patuhi **UU PDP**: simpan data pelanggan seperlunya.
- (Fase 2) Verifikasi **signature webhook Midtrans**.

---

## 15. Fase Pengembangan (Roadmap)

**Fase 1 — MVP Katalog/Lookbook + Wishlist (FOKUS SEKARANG)**
Beranda menarik, katalog cantik (filter/sort, sold tetap tampil), detail produk dengan galeri & story, login Google, **wishlist + halaman wishlist**, "Beli via WhatsApp", halaman kontak, **admin kelola produk + upload foto + tandai terjual manual**, dashboard ringkas (termasuk produk paling di-wishlist). Animasi & micro-interaction. SEO/Open Graph agar cakep saat di-share dari IG. Mobile-first & performa optimal.

**Fase 2 — Transaksi**
Keranjang, checkout, **Midtrans Snap**, sistem reservasi stok 1 + webhook, durasi reservasi yang bisa di-tuning, halaman pesanan & status, admin kelola pesanan + input resi, ongkir (manual → otomatis).

**Fase 3 — Otomasi & Pertumbuhan**
Ongkir otomatis (Biteship/RajaOngkir), notifikasi (email/WA saat status berubah), PWA, "notify me" produk serupa, fitur "drop" terjadwal, analytics lanjutan.

---

## 16. Metrik Sukses

**Fase 1 (katalog):**
- Core Web Vitals "Good" di mobile.
- Pengunjung dari IG yang menjelajah banyak produk per sesi.
- Jumlah produk di-wishlist (indikator minat).
- Waktu admin menambah 1 produk (target < 2 menit).

**Fase 2 (transaksi):**
- Rasio checkout dimulai → pembayaran selesai.
- 0 kasus dua orang beli barang yang sama.

---

## 17. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Web lambat karena foto besar | next/image + kompres saat upload + ISR |
| Preview link jelek saat di-share dari IG | Open Graph image dinamis per produk |
| Owner kesulitan pakai dashboard | Form admin sesederhana mungkin, upload foto dari HP, tombol "Tandai Terjual" 1 klik |
| Wishlist hilang/ tidak sinkron | Disimpan di akun (Supabase), bukan hanya lokal |
| (Fase 2) Dua orang beli produk sama | Reservasi + transaksi DB atomik di server + webhook |
| Midtrans butuh badan usaha | Midtrans GO untuk usaha belum berbadan hukum |

---

## 18. Keputusan yang Sudah Final (v1.2)

- ✅ Produk `sold` **tetap ditampilkan di katalog**, tapi **selalu di urutan paling akhir** + ada **filter status (Tersedia / Terjual / Semua)**.
- ✅ Layout katalog = **grid rapi** (tinggi kartu seragam), bukan masonry.
- ✅ **Tidak ada** teaser feed Instagram di beranda.
- ✅ **Wishlist wajib login** (tidak ada wishlist tamu) — disimpan di akun Supabase, sinkron antar perangkat.
- ✅ Status terjual **diatur manual** oleh admin di tahap awal.
- ✅ Payment gateway = **Midtrans** (implementasi di Fase 2).
- ✅ **Pembayaran dikesampingkan dulu** — fokus Fase 1 = katalog/lookbook + wishlist. Pembelian awal via **WhatsApp**.
- ✅ Ada fitur **Wishlist** (tombol hati + halaman wishlist di akun).
- ✅ Durasi reservasi **disesuaikan dengan perilaku pembeli** (Fase 2, dibuat mudah di-tuning).
- ✅ Tujuan utama: website jadi **katalog menarik** & tujuan link dari Instagram.
- ✅ Palet warna = **"Cream & Charcoal"** (Cream `#F4EFE7` + Charcoal `#211F1C` + aksen Taupe `#A18A6A`) — detail di Bagian 13.A.

Semua pertanyaan terbuka dari versi sebelumnya sudah terjawab. Spesifikasi siap dipecah jadi technical spec saat implementasi.

---

*Dokumen ini draft untuk memulai pengembangan. Saat masuk implementasi, sebaiknya dipecah jadi technical spec terpisah (struktur folder, komponen, query, dan alur RPC reservasi untuk Fase 2).*
