-- =====================================================================
-- 0008 — Newsletter subscribers
-- =====================================================================
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text unique not null,
  created_at  timestamptz not null default now()
);

alter table public.subscribers enable row level security;

drop policy if exists "anyone can subscribe" on public.subscribers;
create policy "anyone can subscribe"
  on public.subscribers for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admin reads subscribers" on public.subscribers;
create policy "admin reads subscribers"
  on public.subscribers for select
  using ( public.is_admin() );
