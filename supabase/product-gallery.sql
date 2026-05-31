-- ============================================
-- Adauga galerie de poze pe produse
-- Ruleaza in Supabase SQL Editor > New Query > Run
-- ============================================

alter table products
  add column if not exists gallery_images jsonb default '[]'::jsonb;

-- Optional: verifica ca s-a adaugat
-- select id, name, image_url, gallery_images from products limit 3;
