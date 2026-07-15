-- Canopy funnel schema: leads (waitlist) + reservations (deposit flow).
-- Run this in the Supabase SQL Editor of the project the app points at
-- (NEXT_PUBLIC_SUPABASE_URL), or via supabase CLI migrations.

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  utm jsonb,
  created_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  email text not null,
  full_name text,
  phone text,
  status text not null default 'started' check (status in ('started','paid','refunded')),
  amount_cents integer,
  stripe_payment_intent_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reservations_email_idx on public.reservations (email);
create index reservations_status_idx on public.reservations (status);

-- Lock down: RLS on. Public (anon/publishable key) traffic is insert-only;
-- reads and status updates require the service-role key from server code.
alter table public.leads enable row level security;
alter table public.reservations enable row level security;

create policy "anon can join waitlist"
  on public.leads for insert to anon with check (true);

create policy "anon can start reservation"
  on public.reservations for insert to anon with check (status = 'started');

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger reservations_set_updated_at
  before update on public.reservations
  for each row execute function public.set_updated_at();
