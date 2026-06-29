-- =============================================================
-- Migration: wishlist_admin_policy
-- Admin bisa membaca semua wishlist untuk statistik dashboard
-- =============================================================

create policy "wishlists: admin read all"
  on public.wishlists for select
  using (public.is_admin());
