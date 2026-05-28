-- ============================================
-- MIGRARE: Colectii -> Grosime (6mm / 12mm)
-- Ruleaza in Supabase SQL Editor > New Query > Run
-- ============================================

-- 1. Adauga coloana thickness pe products
alter table products add column if not exists thickness text default '6mm';

-- 2. Populeaza produsele existente cu o grosime default
--    (toate devin 6mm; le modifici manual din admin dupa)
update products set thickness = '6mm' where thickness is null;

-- 3. (Optional) seteaza cateva produse ca 12mm ca sa vezi filtrul lucrand
--    Poti sterge / modifica liniile astea
update products set thickness = '12mm'
where slug in (
  select slug from products order by created_at limit 8
);

-- 4. Scoatem legatura cu collections (nu mai folosim colectiile)
--    NU stergem coloana collection_id imediat (siguranta), doar o ignoram in cod.
--    Daca vrei sa o stergi de tot dupa ce verifici ca merge:
--    alter table products drop column collection_id;

-- 5. (Optional, dupa ce confirmi ca totul merge) sterge tabelul collections:
--    drop table if exists collections cascade;

-- Verificare: vezi distributia
-- select thickness, count(*) from products group by thickness;
