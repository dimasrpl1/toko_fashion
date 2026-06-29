-- =============================================================
-- Migration: admin_helpers
-- Storage bucket foto produk + kebijakan RLS admin
-- =============================================================

-- ── Storage bucket produk (public) ───────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'products',
  'products',
  true,
  5242880,   -- 5 MB per file
  array['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- Siapa pun bisa lihat foto (bucket public)
create policy "products storage: public select"
  on storage.objects for select
  using (bucket_id = 'products');

-- Hanya admin yang bisa upload
create policy "products storage: admin insert"
  on storage.objects for insert
  with check (bucket_id = 'products' and public.is_admin());

-- Hanya admin yang bisa update
create policy "products storage: admin update"
  on storage.objects for update
  using (bucket_id = 'products' and public.is_admin());

-- Hanya admin yang bisa hapus file
create policy "products storage: admin delete"
  on storage.objects for delete
  using (bucket_id = 'products' and public.is_admin());

-- ── Admin bisa baca semua produk (termasuk yang non-aktif) ────
-- RLS OR-kan antar policy: public baca is_active=true, admin baca semua
create policy "products: admin read all"
  on public.products for select
  using (public.is_admin());
