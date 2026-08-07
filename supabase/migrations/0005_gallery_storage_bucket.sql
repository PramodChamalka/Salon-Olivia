-- =====================================================================
-- Storage bucket for admin-uploaded gallery photos
-- Run in the Supabase SQL Editor. Safe to re-run.
--
-- gallery.image_url has been a plain text URL so far (seeded with
-- external Unsplash links). This adds a public bucket so the admin
-- gallery UI can upload real files instead of requiring a URL. RLS on
-- storage.objects mirrors the table policies elsewhere in this project:
-- anyone can read, only an admin (via the existing is_admin() helper)
-- can write.
-- =====================================================================

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery bucket: public read" on storage.objects;
create policy "gallery bucket: public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "gallery bucket: admin insert" on storage.objects;
create policy "gallery bucket: admin insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery bucket: admin update" on storage.objects;
create policy "gallery bucket: admin update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'gallery' and public.is_admin())
  with check (bucket_id = 'gallery' and public.is_admin());

drop policy if exists "gallery bucket: admin delete" on storage.objects;
create policy "gallery bucket: admin delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'gallery' and public.is_admin());
