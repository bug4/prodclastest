-- ============================================
-- LUCRARI (Works) - Adauga in Supabase SQL Editor > New Query > Run
-- ============================================

create table if not exists works (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,                  -- "lavoare" sau "blaturi"
  subtitle text,                            -- numele designerului / studio
  description text,                         -- text mai lung
  cover_image_url text,                     -- poza grid
  gallery_images jsonb default '[]'::jsonb, -- array URL-uri ["url1", "url2"]
  info jsonb default '{}'::jsonb,           -- {suprafata: "120mp", locatie: "Chisinau", ...}
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_works_category on works(category);
create index if not exists idx_works_published on works(is_published);

-- Trigger updated_at
drop trigger if exists works_updated_at on works;
create trigger works_updated_at before update on works
  for each row execute function set_updated_at();

-- RLS
alter table works enable row level security;

drop policy if exists "public read published works" on works;
create policy "public read published works" on works for select
  using (is_published = true);

drop policy if exists "admin full works" on works;
create policy "admin full works" on works for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed 2 lucrari demo
insert into works (slug, title, category, subtitle, description, info, sort_order) values
  (
    'lavoar-demo-marble',
    'Lavoar baie · Marble Edition',
    'lavoare',
    'Studio Demo',
    'Lavoar realizat manual din marmură Calacatta Gold, finisaj lucios. Lucrare-pilot pentru showcase. Înlocuiește această descriere cu detalii reale după ce încarci pozele tale.',
    '{"suprafata": "—", "locatie": "Chișinău", "an": "2025", "designer": "Studio Demo"}'::jsonb,
    1
  ),
  (
    'blat-demo-bucatarie',
    'Blat bucătărie · Nero Marquina',
    'blaturi',
    'Studio Demo',
    'Blat de bucătărie realizat din placă format mare 120×280, finisaj lucios. Lucrare-pilot pentru showcase. Înlocuiește această descriere cu detalii reale după ce încarci pozele tale.',
    '{"suprafata": "3.2 m liniari", "locatie": "Chișinău", "an": "2025", "designer": "Studio Demo"}'::jsonb,
    2
  )
on conflict (slug) do nothing;
