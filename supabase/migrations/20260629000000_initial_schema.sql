-- =============================================================
-- Migration: initial_schema
-- Project  : nojstudio.id
-- =============================================================

-- =============================================================
-- TABLES
-- =============================================================

-- ── profiles ─────────────────────────────────────────────────
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  phone       text,
  address     jsonb,
  role        text not null default 'user' check (role in ('user', 'admin')),
  created_at  timestamptz not null default now()
);

-- ── products ─────────────────────────────────────────────────
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  description text,
  price       integer not null check (price >= 0),
  size        text,
  condition   text,
  category    text,
  images      jsonb not null default '[]',
  status      text not null default 'available' check (status in ('available', 'sold')),
  is_featured boolean not null default false,
  is_active   boolean not null default true,
  sort_order  integer,
  created_at  timestamptz not null default now()
);

-- ── wishlists ────────────────────────────────────────────────
create table public.wishlists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles (id) on delete cascade,
  product_id  uuid not null references public.products (id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ── messages ─────────────────────────────────────────────────
create table public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  message     text not null,
  created_at  timestamptz not null default now()
);

-- =============================================================
-- INDEXES
-- =============================================================

create index idx_products_slug        on public.products (slug);
create index idx_products_status      on public.products (status);
create index idx_products_is_featured on public.products (is_featured);
create index idx_wishlists_user_id    on public.wishlists (user_id);

-- =============================================================
-- TRIGGER — auto-create profile saat user baru daftar
-- =============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

alter table public.profiles  enable row level security;
alter table public.products   enable row level security;
alter table public.wishlists  enable row level security;
alter table public.messages   enable row level security;

-- ── Helper: cek apakah user adalah admin ─────────────────────
-- Dibuat sebagai function agar policy tidak query profiles dua kali
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ── profiles policies ────────────────────────────────────────
create policy "profiles: user read own"
  on public.profiles for select
  using (id = auth.uid());

create policy "profiles: user update own"
  on public.profiles for update
  using (id = auth.uid());

-- ── products policies ────────────────────────────────────────
-- Semua orang (termasuk tamu) bisa baca produk yang aktif
create policy "products: public read active"
  on public.products for select
  using (is_active = true);

create policy "products: admin insert"
  on public.products for insert
  with check (public.is_admin());

create policy "products: admin update"
  on public.products for update
  using (public.is_admin());

create policy "products: admin delete"
  on public.products for delete
  using (public.is_admin());

-- ── wishlists policies ───────────────────────────────────────
create policy "wishlists: user read own"
  on public.wishlists for select
  using (user_id = auth.uid());

create policy "wishlists: user insert own"
  on public.wishlists for insert
  with check (user_id = auth.uid());

create policy "wishlists: user delete own"
  on public.wishlists for delete
  using (user_id = auth.uid());

-- ── messages policies ────────────────────────────────────────
-- Siapa pun boleh kirim pesan; hanya admin yang bisa baca
create policy "messages: public insert"
  on public.messages for insert
  with check (true);

create policy "messages: admin read"
  on public.messages for select
  using (public.is_admin());
