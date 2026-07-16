-- Lightweight first-party visit tracking (one row per session-page).
create table public.page_views (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  referrer text,
  created_at timestamptz not null default now()
);

create index page_views_path_created_idx on public.page_views (path, created_at);

alter table public.page_views enable row level security;

create policy "anon can record page views"
  on public.page_views for insert to anon with check (true);
