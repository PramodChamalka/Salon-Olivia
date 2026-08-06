-- =====================================================================
-- Salon Olivia — Database Schema
-- Project SLO-2026  |  Authentication & Role-Based Access Control
-- Covers: FR1.1 (registration), FR1.2 (login lockout), FR1.3 (RBAC)
-- Run this in the Supabase SQL Editor to rebuild the database.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Clean slate (safe to re-run)
-- ---------------------------------------------------------------------
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.guard_profile_fields();
drop function if exists public.set_updated_at();
drop function if exists public.is_admin();
drop table if exists public.profiles cascade;
drop table if exists public.login_attempts cascade;
drop type if exists public.user_role;

-- ---------------------------------------------------------------------
-- profiles  (extends Supabase auth.users)
-- ---------------------------------------------------------------------
create type public.user_role as enum ('customer', 'admin');

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  first_name  text,
  last_name   text,
  full_name   text generated always as (
                trim(coalesce(first_name,'') || ' ' || coalesce(last_name,''))
              ) stored,
  phone       text,
  birthday    date,
  address     text,
  avatar_url  text,
  role        public.user_role not null default 'customer',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- ---------------------------------------------------------------------
-- Keep updated_at current
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------
-- Admin check helper.
-- SECURITY DEFINER is required: without it the admin policy below
-- queries profiles, which re-triggers the policy, causing
-- "infinite recursion detected in policy for relation profiles".
-- ---------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------
-- Row Level Security policies  (FR1.3)
-- ---------------------------------------------------------------------
create policy "own profile: select"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "own profile: update"
  on public.profiles for update
  using ( auth.uid() = id )
  with check ( auth.uid() = id );

create policy "admin: select all"
  on public.profiles for select
  using ( public.is_admin() );

create policy "admin: update all"
  on public.profiles for update
  using ( public.is_admin() )
  with check ( public.is_admin() );

-- ---------------------------------------------------------------------
-- Prevent privilege escalation.
-- RLS allows a user to update their own row, which would include the
-- role column. This trigger resets role and is_active unless the
-- caller is an admin. auth.uid() is null for direct SQL Editor and
-- service_role access, which is permitted for administration.
-- ---------------------------------------------------------------------
create or replace function public.guard_profile_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null or public.is_admin() then
    return new;
  end if;
  new.role := old.role;
  new.is_active := old.is_active;
  return new;
end;
$$;

create trigger profiles_guard_fields
  before update on public.profiles
  for each row execute function public.guard_profile_fields();

-- ---------------------------------------------------------------------
-- Create a profile automatically on signup  (FR1.1)
-- Reads the metadata passed from registerAction in
-- src/app/auth/actions.ts for email/password signups, and falls back
-- to the Google OAuth claims (full_name/name/avatar_url/picture) that
-- Supabase populates automatically for "Sign in with Google".
-- ---------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  full_name  text;
  name_parts text[];
begin
  full_name := nullif(trim(coalesce(
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'name',
    ''
  )), '');
  name_parts := case when full_name is not null
    then regexp_split_to_array(full_name, '\s+')
    else null
  end;

  insert into public.profiles (id, first_name, last_name, phone, birthday, address, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', name_parts[1]),
    coalesce(
      new.raw_user_meta_data ->> 'last_name',
      case when array_length(name_parts, 1) > 1
        then array_to_string(name_parts[2:array_length(name_parts, 1)], ' ')
        else null
      end
    ),
    new.raw_user_meta_data ->> 'phone',
    nullif(new.raw_user_meta_data ->> 'birthday', '')::date,
    new.raw_user_meta_data ->> 'address',
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------
-- Failed login lockout  (FR1.2)
-- RLS enabled with NO policies: unreachable by any client.
-- Written only by the server using the service_role key.
-- ---------------------------------------------------------------------
create table public.login_attempts (
  email         text primary key,
  fail_count    int not null default 0,
  locked_until  timestamptz
);

alter table public.login_attempts enable row level security;

-- ---------------------------------------------------------------------
-- Post-install: enable Google as a sign-in provider.
--
-- This is dashboard configuration, not SQL, and cannot be scripted here:
--   1. Supabase Dashboard -> Authentication -> Sign In / Up -> Auth
--      Providers -> Google -> toggle "Enable Sign in with Google".
--   2. Create an OAuth 2.0 Client ID (type: Web application) in the
--      Google Cloud Console, and add the Supabase callback URL shown
--      on that provider page (https://<project-ref>.supabase.co/auth/v1/callback)
--      as an authorized redirect URI.
--   3. Paste the resulting Client ID and Client Secret into the
--      Supabase provider page and save.
--   4. Under Authentication -> URL Configuration, add this app's
--      /auth/callback URL (e.g. https://yourdomain.com/auth/callback,
--      plus http://localhost:3000/auth/callback for local dev) to the
--      Redirect URLs allow list.
-- ---------------------------------------------------------------------

-- ---------------------------------------------------------------------
-- Post-install: promote the first admin manually.
--
--   update public.profiles
--   set role = 'admin'
--   where id = (select id from auth.users where email = 'ADMIN@EXAMPLE.COM');
--
-- Role assignment is administrative, not self-service. There is no
-- "register as admin" path by design.
-- ---------------------------------------------------------------------
