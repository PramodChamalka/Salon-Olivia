-- =====================================================================
-- Fix: services.category_id was never given a foreign key constraint
-- (unlike gallery.category_id, which has one). PostgREST needs a real
-- FK to resolve embedded-select syntax like `category(category_name)`,
-- which is why the admin Services page was failing with:
--   PGRST200 "Could not find a relationship between 'services' and
--   'category' in the schema cache"
-- Run in the Supabase SQL Editor. Safe to re-run.
--
-- Note: Supabase/PostgREST usually picks up new constraints within a
-- few seconds via its schema-cache reload listener. If the admin
-- Services page still 400s right after running this, wait a moment and
-- retry, or use Dashboard -> Database -> "Reload schema" if that
-- doesn't help.
-- =====================================================================

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'services_category_id_fkey'
  ) then
    alter table public.services
      add constraint services_category_id_fkey
      foreign key (category_id) references public.category(category_id)
      on delete set null;
  end if;
end $$;

create index if not exists services_category_id_idx
  on public.services (category_id);
