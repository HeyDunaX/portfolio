-- Supabase schema for the portfolio content feed.
-- Public visitors can read published posts.
-- Private edits should be performed by authenticated admins.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.portfolio_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  post_type text not null check (post_type in ('publication', 'blog')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  year text not null,
  venue text not null default '',
  title text not null,
  authors text not null default '',
  summary text not null default '',
  content text not null default '',
  tags text[] not null default '{}',
  cover_image text not null default '',
  external_url text not null default '',
  reading_minutes integer not null default 1 check (reading_minutes > 0),
  published_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.portfolio_admins admins
    where admins.user_id = auth.uid()
      and admins.is_active = true
  );
$$;

alter table public.portfolio_admins enable row level security;
alter table public.portfolio_posts enable row level security;

drop policy if exists "Admins can manage admin list" on public.portfolio_admins;
create policy "Admins can manage admin list"
on public.portfolio_admins
for all
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin());

drop policy if exists "Published posts are readable by everyone" on public.portfolio_posts;
create policy "Published posts are readable by everyone"
on public.portfolio_posts
for select
using (status = 'published');

drop policy if exists "Admins can read all posts" on public.portfolio_posts;
create policy "Admins can read all posts"
on public.portfolio_posts
for select
using (public.is_portfolio_admin());

drop policy if exists "Admins can insert posts" on public.portfolio_posts;
create policy "Admins can insert posts"
on public.portfolio_posts
for insert
with check (public.is_portfolio_admin());

drop policy if exists "Admins can update posts" on public.portfolio_posts;
create policy "Admins can update posts"
on public.portfolio_posts
for update
using (public.is_portfolio_admin())
with check (public.is_portfolio_admin());

drop policy if exists "Admins can delete posts" on public.portfolio_posts;
create policy "Admins can delete posts"
on public.portfolio_posts
for delete
using (public.is_portfolio_admin());

create index if not exists portfolio_posts_status_idx on public.portfolio_posts (status, post_type, year desc);
create index if not exists portfolio_posts_featured_idx on public.portfolio_posts (featured, status);