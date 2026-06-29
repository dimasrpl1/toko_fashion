-- =============================================================
-- Seed: produk fashion dummy untuk nojstudio.id
-- Jalankan: npx supabase db push  (sudah di-push otomatis jika ada)
--      atau: npx supabase db reset (reset lokal + seed)
--      atau: salin & jalankan manual di Supabase Dashboard > SQL Editor
-- =============================================================

-- Bersihkan data lama agar seed bisa diulang
truncate public.wishlists, public.products restart identity cascade;

insert into public.products
  (slug, title, description, price, size, condition, category, images, status, is_featured, sort_order)
values

-- ── 1 ─────────────────────────────────────────────────────────
(
  'coord-set-linen-coklat-susu',
  'Coord Set Linen Coklat Susu',
  'Satu set yang bikin pagi-pagi langsung terlihat put-together. Linen tipis dengan warna coklat susu hangat — adem di badan, enak di mata. Atasan cropped berkerah V dipadu rok A-line midi yang jatuhnya sempurna. Kondisi like new, hampir nggak kelihatan bekas pakainya.',
  215000, 'M', 'Like New', 'Coord Set',
  '[
    "https://placehold.co/600x800/F4EFE7/8C8478?text=coord+set+1",
    "https://placehold.co/600x800/EFE6D8/6B5A3E?text=coord+set+2"
  ]'::jsonb,
  'available', true, 1
),

-- ── 2 ─────────────────────────────────────────────────────────
(
  'dress-mini-floral-retro',
  'Dress Mini Floral Retro',
  'Dress thrift dengan motif bunga-bunga kecil yang nggak pasaran — warna dasarnya krem susu, bunganya dusty rose dan sage. Potongan A-line dengan kancing besar di depan, terasa vintage 70s tapi tetap fresh dipakai sekarang. Beli dari thrift store luar, kondisi sangat bagus.',
  145000, 'S', 'Very Good', 'Dress',
  '[
    "https://placehold.co/600x800/F4EFE7/A18A6A?text=dress+floral+1",
    "https://placehold.co/600x800/EFE6D8/8C8478?text=dress+floral+2",
    "https://placehold.co/600x800/FBF8F2/6B5A3E?text=dress+floral+3"
  ]'::jsonb,
  'available', true, 2
),

-- ── 3 ─────────────────────────────────────────────────────────
(
  'outer-denim-vintage-wash',
  'Outer Denim Vintage Wash',
  'Denim jacket thrift dengan efek wash alami — warna biru pudar yang terbentuk dari pemakaian, bukan proses pabrik. Oversize di badan tapi bahu pas. Saku dada kanan kiri, jahitan oranye khas denim 90s. Throw over dress atau basic tee, langsung ada vibenya.',
  135000, 'L', 'Good', 'Outer',
  '[
    "https://placehold.co/600x800/8C8478/FBF8F2?text=denim+outer+1",
    "https://placehold.co/600x800/6B5A3E/F4EFE7?text=denim+outer+2"
  ]'::jsonb,
  'available', false, 3
),

-- ── 4 ─────────────────────────────────────────────────────────
(
  'blouse-balon-vintage-krem',
  'Blouse Balon Vintage Krem',
  'Lengan balon besar yang dramatis tapi tetap anggun — bahan satin tipis berwarna krem gading dengan detail kancing mutiara palsu di manset. Dipakai tucked in ke rok atau celana apapun langsung terasa editorial. Kondisi like new, nggak ada noda atau kerusakan.',
  118000, 'M', 'Like New', 'Blouse',
  '[
    "https://placehold.co/600x800/FBF8F2/A18A6A?text=blouse+balon+1",
    "https://placehold.co/600x800/F4EFE7/211F1C?text=blouse+balon+2"
  ]'::jsonb,
  'available', false, 4
),

-- ── 5 ─────────────────────────────────────────────────────────
(
  'celana-kulot-linen-oat',
  'Celana Kulot Linen Oat',
  'Kulot linen high-waist dengan warna oat yang serbaguna — enak dipadupadankan dengan hampir apapun. Kaki lebar, jatuhnya fluid dan elegan. Dua saku samping fungsional. Cocok untuk daily wear maupun acara semi-formal. Kondisi good, bahan sedikit melunak karena beberapa kali pakai — justru makin nyaman.',
  98000, 'M', 'Good', 'Celana',
  '[
    "https://placehold.co/600x800/EFE6D8/8C8478?text=kulot+linen+1",
    "https://placehold.co/600x800/F4EFE7/6B5A3E?text=kulot+linen+2"
  ]'::jsonb,
  'available', false, 5
),

-- ── 6 ─────────────────────────────────────────────────────────
(
  'kemeja-oversized-plaid-earth',
  'Kemeja Oversized Plaid Earth Tone',
  'Plaid klasik tapi dalam palet earth tone yang nggak klise — coklat, oranye burnt, dan krem. Potongan oversized yang nyaman, bisa dipakai sebagai outer atau diselip sebagai inner. Saku dada satu, kancing kayu. Thrift dari pasar baju bekas lokal, kondisi very good.',
  105000, 'L', 'Very Good', 'Kemeja',
  '[
    "https://placehold.co/600x800/A18A6A/FBF8F2?text=kemeja+plaid+1",
    "https://placehold.co/600x800/6B5A3E/F4EFE7?text=kemeja+plaid+2",
    "https://placehold.co/600x800/EFE6D8/211F1C?text=kemeja+plaid+3"
  ]'::jsonb,
  'available', false, 6
),

-- ── 7 ─────────────────────────────────────────────────────────
(
  'jumpsuit-sage-polos',
  'Jumpsuit Polos Sage Green',
  'Warna sage yang tenang dan dewasa — pas banget untuk yang lagi capek sama warna-warna mencolok. Potongan wide-leg dengan pinggang elastis dan tali yang bisa diikat di depan atau belakang. Bahan katun ripstop, nggak panas, nggak gampang kusut. Cocok untuk weekend atau nongkrong sore.',
  178000, 'M', 'Like New', 'Jumpsuit',
  '[
    "https://placehold.co/600x800/8C8478/FBF8F2?text=jumpsuit+sage+1",
    "https://placehold.co/600x800/6B5A3E/EFE6D8?text=jumpsuit+sage+2"
  ]'::jsonb,
  'available', true, 7
),

-- ── 8 — SOLD ──────────────────────────────────────────────────
(
  'set-rajut-crop-rok-mini',
  'Set Rajut Crop & Rok Mini Krem',
  'Set rajutan tipis dengan warna krem natural — crop top dengan tali spaghetti dan rok mini flare yang lucu. Bahan crochet handmade, ringan dan adem. Ini salah satu favorit pribadi yang akhirnya dilepas juga. Sayang banget tapi semoga nemuin pemilik baru yang lebih sering pakainya.',
  225000, 'S', 'Very Good', 'Coord Set',
  '[
    "https://placehold.co/600x800/F4EFE7/A18A6A?text=set+rajut+1",
    "https://placehold.co/600x800/EFE6D8/8C8478?text=set+rajut+2"
  ]'::jsonb,
  'sold', true, 101
),

-- ── 9 — SOLD ──────────────────────────────────────────────────
(
  'kemeja-flanel-oversized-coklat',
  'Kemeja Flanel Oversized Coklat Tua',
  'Flanel kotak-kotak besar dengan dominasi coklat tua dan hitam. Tebal, hangat, dan punya berat yang enak kalau dipakai — beda sama flanel tipis yang banyak di pasaran. Dipakai open button-up di atas tank top langsung punya karakter. Thrift Amerika, tag lama masih ada.',
  89000, 'XL', 'Good', 'Kemeja',
  '[
    "https://placehold.co/600x800/211F1C/F4EFE7?text=flanel+coklat+1",
    "https://placehold.co/600x800/6B5A3E/FBF8F2?text=flanel+coklat+2"
  ]'::jsonb,
  'sold', false, 102
),

-- ── 10 — SOLD ─────────────────────────────────────────────────
(
  'dress-midi-batik-modern',
  'Dress Midi Batik Cap Modern',
  'Batik cap dengan motif abstrak modern — jauh dari kesan formal atau tradisional yang kaku. Warna dasar putih gading dengan motif biru indigo dan titik-titik coklat. Potongan midi wrap dress yang flattering di semua bentuk tubuh. Dibuat sendiri dari kain batik cap Pekalongan, pakai teknik wrap simpul yang bisa diatur kekencangannya.',
  195000, 'Free Size', 'Like New', 'Dress',
  '[
    "https://placehold.co/600x800/FBF8F2/211F1C?text=dress+batik+1",
    "https://placehold.co/600x800/F4EFE7/6B5A3E?text=dress+batik+2",
    "https://placehold.co/600x800/EFE6D8/A18A6A?text=dress+batik+3"
  ]'::jsonb,
  'sold', false, 103
);
