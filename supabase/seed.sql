-- Contoh data pricing plans: 3 paket untuk layanan "company-profile"
insert into public.pricing_plans
  (name, service_slug, description, price, duration_label, billing_type, features, extra_note, is_popular, sort_order)
values
(
  'Paket Pelajar',
  'company-profile',
  'Cocok untuk usaha kecil dan pemula yang ingin tampil online secara profesional.',
  700000,
  '/tahun',
  'one-time',
  array['Desain responsive (mobile friendly)', '1 halaman (landing page)', 'Formulir kontak sederhana', 'Integrasi Google Maps', 'Gratis domain .my.id & hosting 1 tahun', 'Waktu pengerjaan: ±5 hari kerja', '2x revisi desain'],
  'Tambah Halaman Rp150.000/halaman',
  false,
  1
),
(
  'Paket Bisnis',
  'company-profile',
  'Untuk perusahaan yang ingin tampil maksimal dan siap ekspansi digital.',
  null,
  '/tahun',
  'custom',
  array['Semua fitur Paket UMKM', 'Jumlah halaman fleksibel', 'Blog / berita perusahaan', 'Multi bahasa (opsional)', 'Integrasi live chat (opsional)', 'Desain dan visual lebih modern', 'Optimasi kecepatan & keamanan website', 'Training penggunaan (online)', 'Support & maintenance lifetime', 'Waktu pengerjaan: ±14 hari kerja', '10x revisi desain'],
  'Tambah Halaman Rp150.000/halaman',
  true,
  2
),
(
  'Paket UMKM',
  'company-profile',
  'Ideal untuk bisnis yang ingin tampil lebih kredibel dan informatif.',
  null,
  '/tahun',
  'custom',
  array['Semua fitur Paket Pelajar', 'Hingga 8 halaman (termasuk Galeri, Testimoni, Portofolio)', 'Desain custom sesuai brand', 'Formulir kontak dengan notifikasi email', 'Integrasi WhatsApp & media sosial', 'SEO dasar (title, meta, sitemap)', 'Slider banner interaktif', 'Waktu pengerjaan: ±7-10 hari kerja', '5x revisi desain'],
  'Tambah Halaman Rp150.000/halaman',
  false,
  3
)
on conflict do nothing;
