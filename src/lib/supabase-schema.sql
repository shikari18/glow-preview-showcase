-- Run this once in your Supabase project → SQL Editor → New query

create table if not exists public.examglow_accounts (
  id          text primary key,          -- Google sub (unique user ID)
  name        text not null,
  email       text not null,
  picture     text default '',
  plan        text not null default 'free',
  role        text default '',
  goal        text default '',
  signed_in_at timestamptz not null default now(),
  session_active boolean not null default true
);

-- Allow anyone to insert/update (users registering themselves)
-- and anyone to read (admin panel reads all rows)
-- In production you'd lock this down with RLS + service role key
alter table public.examglow_accounts enable row level security;

create policy "allow_all" on public.examglow_accounts
  for all using (true) with check (true);
