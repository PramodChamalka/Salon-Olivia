-- =====================================================================
-- Admin write access for services and gallery
-- Run in the Supabase SQL Editor. Safe to re-run.
--
-- 0001/0003 opened public SELECT on category/gallery/services, but never
-- added a write policy for either -- an admin session could read them
-- but not insert/update/delete, since RLS denies by default with no
-- matching policy. This adds admin-only write access, same is_admin()
-- pattern as profiles/appointments.
-- =====================================================================

drop policy if exists "admin: insert services" on public.services;
create policy "admin: insert services"
  on public.services for insert
  to authenticated
  with check ( public.is_admin() );

drop policy if exists "admin: update services" on public.services;
create policy "admin: update services"
  on public.services for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

drop policy if exists "admin: delete services" on public.services;
create policy "admin: delete services"
  on public.services for delete
  to authenticated
  using ( public.is_admin() );

drop policy if exists "admin: insert gallery" on public.gallery;
create policy "admin: insert gallery"
  on public.gallery for insert
  to authenticated
  with check ( public.is_admin() );

drop policy if exists "admin: update gallery" on public.gallery;
create policy "admin: update gallery"
  on public.gallery for update
  to authenticated
  using ( public.is_admin() )
  with check ( public.is_admin() );

drop policy if exists "admin: delete gallery" on public.gallery;
create policy "admin: delete gallery"
  on public.gallery for delete
  to authenticated
  using ( public.is_admin() );
