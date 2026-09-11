-- =========================================
-- Storage bucket untuk gambar portfolio
-- =========================================

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

-- Publik bisa lihat gambar (bucket public)
create policy "portfolio_images_public_read"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

-- Hanya admin yang bisa upload/update/hapus gambar
create policy "portfolio_images_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'portfolio-images' and public.is_admin());

create policy "portfolio_images_admin_update"
  on storage.objects for update
  using (bucket_id = 'portfolio-images' and public.is_admin())
  with check (bucket_id = 'portfolio-images' and public.is_admin());

create policy "portfolio_images_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'portfolio-images' and public.is_admin());
