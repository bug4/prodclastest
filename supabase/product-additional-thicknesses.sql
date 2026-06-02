-- ============================================
-- Adauga additional_thicknesses pe products
-- Ruleaza in Supabase SQL Editor > New Query > Run
-- ============================================

alter table products
  add column if not exists additional_thicknesses jsonb default '[]'::jsonb;

-- Verificare:
-- select id, name, thickness, additional_thicknesses from products limit 5;
