-- ============================================
-- PRODCLAS — Supabase Schema
-- Ruleaza acest fisier in: Supabase Dashboard > SQL Editor > New Query
-- ============================================

-- =============== EXTENSIONS ===============
create extension if not exists "pgcrypto";

-- =============== TABLES ===============

-- Colectii (Marble, Stone, Stormy, Natural, Mineral, Exotic, Terrazzo)
create table if not exists collections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Produsele (placile)
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  collection_id uuid references collections(id) on delete set null,
  price_mdl int not null,
  origin text,                          -- Italia, Spania, Brazilia etc
  size text,                            -- "60×120", "120×280"
  finish text,                          -- Lucios, Mat
  description text,
  image_url text,                       -- URL public Supabase Storage
  in_stock boolean default true,
  is_featured boolean default false,    -- pentru "Colectie noua" pe homepage
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Promotii
create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  tag text,                             -- "Promotie de toamna", "Pachet arhitecti"
  discount_label text,                  -- "-20%", "Pe comanda", "Acces dedicat"
  description text,
  valid_until text,                     -- "Pana la 15 ianuarie", "Permanent"
  image_url text,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Articole (pentru blog viitor, ghiduri arhitecti, etc)
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,                         -- markdown / html
  cover_url text,
  category text,                        -- "Ghid", "Inspiratie", "Stiri"
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Submisii formular contact (sa nu se piarda nimic)
create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  source text,                          -- "contact", "architect", "newsletter"
  first_name text,
  last_name text,
  email text,
  phone text,
  subject text,
  message text,
  metadata jsonb,                       -- pentru date extra (ex: nume studio)
  is_read boolean default false,
  created_at timestamptz default now()
);

-- =============== INDEXES ===============
create index if not exists idx_products_collection on products(collection_id);
create index if not exists idx_products_featured on products(is_featured) where is_featured = true;
create index if not exists idx_promotions_active on promotions(is_active) where is_active = true;
create index if not exists idx_articles_published on articles(is_published, published_at desc);
create index if not exists idx_contact_unread on contact_submissions(is_read, created_at desc);

-- =============== TRIGGERS pentru updated_at ===============
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

drop trigger if exists promotions_updated_at on promotions;
create trigger promotions_updated_at before update on promotions
  for each row execute function set_updated_at();

drop trigger if exists articles_updated_at on articles;
create trigger articles_updated_at before update on articles
  for each row execute function set_updated_at();

-- =============== ROW LEVEL SECURITY ===============
alter table collections enable row level security;
alter table products enable row level security;
alter table promotions enable row level security;
alter table articles enable row level security;
alter table contact_submissions enable row level security;

-- Public READ access pentru continut afisat pe site
drop policy if exists "public read collections" on collections;
create policy "public read collections" on collections for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read active promotions" on promotions;
create policy "public read active promotions" on promotions for select using (is_active = true);

drop policy if exists "public read published articles" on articles;
create policy "public read published articles" on articles for select using (is_published = true);

-- Oricine poate insera contact submissions (formular contact)
drop policy if exists "anyone can submit contact" on contact_submissions;
create policy "anyone can submit contact" on contact_submissions for insert with check (true);

-- Admin (autentificati) au acces complet
drop policy if exists "admin full collections" on collections;
create policy "admin full collections" on collections for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full products" on products;
create policy "admin full products" on products for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full promotions" on promotions;
create policy "admin full promotions" on promotions for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin full articles" on articles;
create policy "admin full articles" on articles for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "admin read contacts" on contact_submissions;
create policy "admin read contacts" on contact_submissions for select
  using (auth.role() = 'authenticated');

drop policy if exists "admin update contacts" on contact_submissions;
create policy "admin update contacts" on contact_submissions for update
  using (auth.role() = 'authenticated');

-- =============== STORAGE BUCKET ===============
-- Creeaza bucket public pentru poze produse
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Policies pe storage
drop policy if exists "public read product images" on storage.objects;
create policy "public read product images" on storage.objects for select
  using (bucket_id = 'product-images');

drop policy if exists "admin upload product images" on storage.objects;
create policy "admin upload product images" on storage.objects for insert
  with check (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "admin update product images" on storage.objects;
create policy "admin update product images" on storage.objects for update
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

drop policy if exists "admin delete product images" on storage.objects;
create policy "admin delete product images" on storage.objects for delete
  using (bucket_id = 'product-images' and auth.role() = 'authenticated');

-- ============================================
-- DUPA RULAREA ACESTUI SQL:
-- 1. Creeaza un user admin: Dashboard > Authentication > Users > Add User
--    (cu email + parola, confirm auto)
-- 2. Ruleaza scripts/seed.mjs pentru a popula tabelele cu produsele initiale
-- ============================================
