-- =========================================
-- Nexora Incodeon — Initial Database Schema
-- =========================================

create extension if not exists "pgcrypto";

-- =========================================
-- 1. admin_users (profile untuk auth.users)
-- =========================================
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'editor' check (role in ('super_admin', 'editor')),
  created_at timestamptz not null default now()
);

-- =========================================
-- 2. portfolios
-- =========================================
create table if not exists public.portfolios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  client_name text,
  description text not null,
  cover_image_url text,
  gallery_urls text[] not null default '{}',
  tech_stack text[] not null default '{}',
  project_url text,
  is_featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists portfolios_status_idx on public.portfolios (status);
create index if not exists portfolios_featured_idx on public.portfolios (is_featured);

-- =========================================
-- 3. blog_posts
-- =========================================
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,
  author_id uuid references public.admin_users(id) on delete set null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_idx on public.blog_posts (status);
create index if not exists blog_posts_published_at_idx on public.blog_posts (published_at desc);

-- =========================================
-- 4. pricing_plans
-- =========================================
create table if not exists public.pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric,
  price_label text,
  billing_type text not null default 'one-time' check (billing_type in ('one-time', 'monthly', 'custom')),
  features text[] not null default '{}',
  is_popular boolean not null default false,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists pricing_plans_active_idx on public.pricing_plans (is_active);

-- =========================================
-- 5. consultation_messages
-- =========================================
create table if not exists public.consultation_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company_name text,
  service_interest text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists consultation_messages_status_idx on public.consultation_messages (status);

-- =========================================
-- updated_at auto-update trigger
-- =========================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on public.portfolios
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.blog_posts
  for each row execute function public.set_updated_at();

create trigger set_updated_at before update on public.pricing_plans
  for each row execute function public.set_updated_at();
