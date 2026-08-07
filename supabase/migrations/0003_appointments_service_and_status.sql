-- =====================================================================
-- Add service_id + status to appointments, and open services for
-- public read (needed so the booking form can list real services).
-- Run in the Supabase SQL Editor. Safe to re-run.
-- =====================================================================

do $$
begin
  if not exists (select 1 from pg_type where typname = 'appointment_status') then
    create type public.appointment_status as enum (
      'pending', 'confirmed', 'completed', 'cancelled'
    );
  end if;
end $$;

alter table public.appointments
  add column if not exists service_id uuid references public.services(service_id) on delete set null;

alter table public.appointments
  add column if not exists status public.appointment_status not null default 'pending';

create index if not exists appointments_service_id_idx
  on public.appointments (service_id);

create index if not exists appointments_status_idx
  on public.appointments (status);

-- ---------------------------------------------------------------------
-- services: same public-read, admin-write pattern as gallery/category.
-- ---------------------------------------------------------------------
drop policy if exists "public read access" on public.services;
create policy "public read access"
  on public.services for select
  to anon, authenticated
  using (true);
