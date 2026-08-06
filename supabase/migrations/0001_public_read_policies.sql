-- =====================================================================
-- Public read access for marketing content
-- Run in the Supabase SQL Editor. Safe to re-run.
--
-- category/gallery already have RLS enabled with zero policies, which
-- means every query against them currently returns an empty array for
-- every client (anon, authenticated, and this app's FastAPI backend,
-- which connects with the anon key). This just opens read access; there
-- is no insert/update/delete policy, so writes stay admin-only via the
-- service_role key.
-- =====================================================================

drop policy if exists "public read access" on public.category;
create policy "public read access"
  on public.category for select
  to anon, authenticated
  using (true);

drop policy if exists "public read access" on public.gallery;
create policy "public read access"
  on public.gallery for select
  to anon, authenticated
  using (true);
