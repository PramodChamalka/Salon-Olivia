-- =====================================================================
-- Fix appointments' primary key + add RLS policies
-- Run in the Supabase SQL Editor.
--
-- appointments.customer_id was created as BOTH the primary key and a
-- foreign key to profiles(id), with its own gen_random_uuid() default.
-- That means a customer could only ever have one appointment, ever --
-- a second insert for the same customer would violate the PK. This
-- swaps in a real surrogate id as the primary key and demotes
-- customer_id to a plain (indexed, required) foreign key, so a
-- customer can have many appointments.
--
-- The id/constraint-drop steps below are guarded (IF NOT EXISTS /
-- IF EXISTS) and safe to re-run; the PRIMARY KEY swap itself is a
-- one-time structural change and is NOT meant to be re-run once applied.
-- =====================================================================

alter table public.appointments
  add column if not exists id uuid not null default gen_random_uuid();

alter table public.appointments
  drop constraint if exists appointments_pkey;

alter table public.appointments
  add primary key (id);

alter table public.appointments
  alter column customer_id drop default;

alter table public.appointments
  alter column customer_id set not null;

create index if not exists appointments_customer_id_idx
  on public.appointments (customer_id);

-- ---------------------------------------------------------------------
-- Row Level Security
-- Reuses public.is_admin(), already defined for the profiles table.
-- ---------------------------------------------------------------------
alter table public.appointments enable row level security;

drop policy if exists "own appointments: select" on public.appointments;
create policy "own appointments: select"
  on public.appointments for select
  using ( auth.uid() = customer_id );

drop policy if exists "own appointments: insert" on public.appointments;
create policy "own appointments: insert"
  on public.appointments for insert
  with check ( auth.uid() = customer_id );

drop policy if exists "admin: select all appointments" on public.appointments;
create policy "admin: select all appointments"
  on public.appointments for select
  using ( public.is_admin() );

drop policy if exists "admin: update all appointments" on public.appointments;
create policy "admin: update all appointments"
  on public.appointments for update
  using ( public.is_admin() )
  with check ( public.is_admin() );
