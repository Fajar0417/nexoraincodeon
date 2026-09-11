-- =========================================
-- Nexora Incodeon — Row Level Security
-- =========================================

alter table public.admin_users enable row level security;
alter table public.portfolios enable row level security;
alter table public.blog_posts enable row level security;
alter table public.pricing_plans enable row level security;
alter table public.consultation_messages enable row level security;

-- Helper: cek apakah user yang login adalah admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$ language sql security definer stable;

-- =========================================
-- admin_users
-- =========================================
-- admin bisa lihat data admin lain (untuk keperluan dashboard)
create policy "admin_users_select_own_or_admin"
  on public.admin_users for select
  using (auth.uid() = id or public.is_admin());

-- hanya super_admin yang bisa ubah data admin (dikelola manual/lewat service role,
-- jadi tidak ada policy insert/update/delete untuk role biasa di sini)

-- =========================================
-- portfolios
-- =========================================
create policy "portfolios_public_read_published"
  on public.portfolios for select
  using (status = 'published');

create policy "portfolios_admin_read_all"
  on public.portfolios for select
  using (public.is_admin());

create policy "portfolios_admin_insert"
  on public.portfolios for insert
  with check (public.is_admin());

create policy "portfolios_admin_update"
  on public.portfolios for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "portfolios_admin_delete"
  on public.portfolios for delete
  using (public.is_admin());

-- =========================================
-- blog_posts
-- =========================================
create policy "blog_posts_public_read_published"
  on public.blog_posts for select
  using (status = 'published');

create policy "blog_posts_admin_read_all"
  on public.blog_posts for select
  using (public.is_admin());

create policy "blog_posts_admin_insert"
  on public.blog_posts for insert
  with check (public.is_admin());

create policy "blog_posts_admin_update"
  on public.blog_posts for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "blog_posts_admin_delete"
  on public.blog_posts for delete
  using (public.is_admin());

-- =========================================
-- pricing_plans
-- =========================================
create policy "pricing_plans_public_read_active"
  on public.pricing_plans for select
  using (is_active = true);

create policy "pricing_plans_admin_read_all"
  on public.pricing_plans for select
  using (public.is_admin());

create policy "pricing_plans_admin_insert"
  on public.pricing_plans for insert
  with check (public.is_admin());

create policy "pricing_plans_admin_update"
  on public.pricing_plans for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "pricing_plans_admin_delete"
  on public.pricing_plans for delete
  using (public.is_admin());

-- =========================================
-- consultation_messages
-- =========================================
-- publik hanya bisa kirim (insert), tidak bisa baca balik
create policy "consultation_messages_public_insert"
  on public.consultation_messages for insert
  with check (true);

create policy "consultation_messages_admin_read"
  on public.consultation_messages for select
  using (public.is_admin());

create policy "consultation_messages_admin_update"
  on public.consultation_messages for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "consultation_messages_admin_delete"
  on public.consultation_messages for delete
  using (public.is_admin());
