-- =============================================================
-- Seed: produk fashion dummy untuk nojstudio.id
-- Jalankan: npx supabase db push  (sudah di-push otomatis jika ada)
--      atau: npx supabase db reset (reset lokal + seed)
--      atau: salin & jalankan manual di Supabase Dashboard > SQL Editor
--
-- Foto produk memakai foto stok gratis (Unsplash) sebagai placeholder
-- visual sementara — ganti dengan foto asli produk via dashboard admin.
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
    "https://images.unsplash.com/photo-1777367881209-c5d755951d14?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1777367881243-3bca413f0aa3?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1617391834151-3a12f8495ca3?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1600102427329-d5b2cde7e162?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1768982597225-9dadb37f3db7?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1614699745279-2c61bd9d46b5?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1607529450995-5bb09b93c99a?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1609493259716-612a700a8d16?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1768289222386-93b3e854cf31?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1687825520449-e7fc1a144cb2?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1782226728289-f81457b760f5?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1614173392817-cb83a0a7c84c?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1528674452993-a59496256bdf?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1768982596726-c01dd8a8af32?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1781674432604-caf41c64faed?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1753874383964-b9b77a9ebc08?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1760124128924-36b83caa2d93?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1771757018593-ab138c0ec983?w=900&h=1200&fit=crop&q=80&auto=format"
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
    "https://images.unsplash.com/photo-1764298493197-a1c1cce57800?w=900&h=1200&fit=crop&q=80&auto=format",
    "https://images.unsplash.com/photo-1616186935836-f2d3bddcfcc4?w=900&h=1200&fit=crop&q=80&auto=format"
  ]'::jsonb,
  'sold', false, 103
);
