-- =========================================
-- Pricing plans: kategori per layanan + detail tampilan card
-- =========================================

alter table public.pricing_plans
  add column if not exists service_slug text,
  add column if not exists description text,
  add column if not exists duration_label text default '/tahun',
  add column if not exists extra_note text;

create index if not exists pricing_plans_service_slug_idx on public.pricing_plans (service_slug);
