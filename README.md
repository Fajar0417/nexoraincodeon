# Nexora Incodeon — Website Software House

Transforming Ideas Into Digital Solutions.

## Tech stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS
- shadcn/ui (belum ada komponen ter-install — lihat catatan di bawah)
- Lucide React (icon)
- Framer Motion (animasi)
- next-intl (multi-bahasa: id/en)
- React Hook Form + Zod (form & validasi)
- Supabase (Postgres, Auth, Storage, RLS)
- Deploy target: Vercel

## Struktur folder
```
src/
  app/
    (public)/
      services/
      portfolio/
      about/
      process/
      pricing/
      contact/
      blog/
    admin/
      login/
      dashboard/
      portfolio/
      blog/
      messages/
      pricing/
  components/
    ui/         -> komponen shadcn/ui akan masuk sini
    layout/     -> navbar, footer, dll
    sections/   -> section-section halaman (hero, services, dll)
  lib/
    supabase/
      client.ts -> Supabase client untuk browser
      server.ts -> Supabase client untuk server component/action
    utils.ts    -> helper `cn()` untuk shadcn/ui
  hooks/
  types/
```

## Setup lokal

1. Install dependencies:
   ```bash
   npm install
   ```

2. Tambahkan komponen shadcn/ui yang dibutuhkan (dijalankan di komputer kamu, karena butuh akses ke ui.shadcn.com yang tidak tersedia di sandbox pembuatan ini):
   ```bash
   npx shadcn@latest add button card input textarea form badge dialog navigation-menu
   ```

3. Salin `.env.local.example` jadi `.env.local` lalu isi kredensial Supabase kamu:
   ```bash
   cp .env.local.example .env.local
   ```
   Isi:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (hanya untuk server-side, jangan expose ke client)

4. Jalankan development server:
   ```bash
   npm run dev
   ```

## Catatan
- Build sudah diverifikasi berhasil (`npm run build`) di lingkungan sandbox.
- Folder `(public)` adalah route group untuk halaman publik; `admin` untuk CMS.
- Skema database Supabase (tabel portfolio, blog, pricing, messages, RLS policy) belum dibuat di tahap ini — lanjut ke tahap berikutnya.

## Database Supabase

File migration ada di `supabase/migrations/`:
1. `0001_init_schema.sql` — tabel `admin_users`, `portfolios`, `blog_posts`, `pricing_plans`, `consultation_messages`
2. `0002_rls_policies.sql` — Row Level Security: publik hanya bisa baca data `published`/`active`, dan hanya insert ke `consultation_messages`; admin (dicek lewat tabel `admin_users`) punya akses penuh

Contoh seed data ada di `supabase/seed.sql`.

### Cara menjalankan migration
Kalau pakai Supabase CLI:
```bash
supabase link --project-ref <project-ref-kamu>
supabase db push
```
Atau bisa juga copy-paste isi tiap file `.sql` langsung ke SQL Editor di dashboard Supabase, dijalankan berurutan (0001 dulu baru 0002), lalu `seed.sql` kalau mau ada contoh data.

### Catatan admin_users
Tabel `admin_users` sengaja tidak punya policy insert/update untuk role biasa — data admin ditambahkan manual lewat SQL Editor atau service role key setelah kamu daftarkan akunnya lewat Supabase Auth, contoh:
```sql
insert into public.admin_users (id, full_name, role)
values ('<uid-dari-auth.users>', 'Nama Admin', 'super_admin');
```

## Auth admin

- `src/proxy.ts` + `src/lib/supabase/proxy.ts` — proteksi route `/admin/*`: kalau belum login, redirect ke `/admin/login`; kalau sudah login dan buka `/admin/login`, redirect ke dashboard.
- `src/app/admin/login/` — halaman login (email + password) yang memverifikasi kredensial lewat Supabase Auth, LALU memastikan user tersebut ada di tabel `admin_users` (kalau tidak, otomatis sign-out dan tolak akses).
- `src/app/admin/layout.tsx` — guard tambahan di level layout + topbar dengan nama admin dan tombol keluar.

### Cara buat akun admin pertama
1. Buka dashboard Supabase > Authentication > Users > Add user, buat akun dengan email & password.
2. Copy UID user yang baru dibuat.
3. Di SQL Editor, jalankan:
   ```sql
   insert into public.admin_users (id, full_name, role)
   values ('<uid-user>', 'Nama Kamu', 'super_admin');
   ```
4. Login di `/admin/login` pakai email & password tadi.

## Layout publik (Navbar & Footer)

- `src/components/layout/navbar.tsx` — sticky navbar, link ke semua halaman publik, tombol "Konsultasi gratis", mobile menu (hamburger toggle) untuk layar kecil.
- `src/components/layout/footer.tsx` — kolom layanan, perusahaan, kontak, dan copyright dinamis.
- `src/app/(public)/layout.tsx` — membungkus semua halaman di dalam route group `(public)` dengan Navbar + Footer. Halaman `admin` TIDAK memakai layout ini (punya topbar sendiri).
- Homepage sekarang berada di `src/app/(public)/page.tsx` (dipindah dari `src/app/page.tsx`).
- Halaman `services`, `portfolio`, `about`, `process`, `pricing`, `contact`, `blog` masing-masing sudah punya `page.tsx` placeholder supaya link navbar tidak 404 — kontennya akan diisi di tahap berikutnya.

## Halaman Services

- `src/lib/data/services.ts` — data 8 layanan (website development, company profile, e-commerce, web application, custom system, UI/UX development, maintenance & support, digital consultation) sebagai source of truth.
- `src/app/(public)/services/page.tsx` — render layanan dalam layout list bernomor (bukan card seragam), tiap baris punya ikon, tag, deskripsi, dan poin fitur, ditutup CTA konsultasi.

## Halaman About & Pricing

- `src/app/(public)/about/page.tsx` — profil singkat, daftar target klien, dan 3 prinsip kerja (pahami dulu, transparan, dibangun untuk dirawat).
- `src/app/(public)/pricing/page.tsx` — server component yang mengambil data dari tabel `pricing_plans` (hanya yang `is_active = true`, diurutkan berdasarkan `sort_order`). Kalau tabel masih kosong (belum di-push/seed), halaman tetap tampil dengan pesan fallback, tidak error.

## Halaman Portfolio

- `src/app/(public)/portfolio/page.tsx` — grid project dari tabel `portfolios` (status `published`, featured tampil duluan). Kalau belum ada gambar cover, tampil placeholder blueprint dengan nama kategori.
- `src/app/(public)/portfolio/[slug]/page.tsx` — halaman detail per project: cover image, deskripsi, tech stack, galeri, dan link live site (kalau ada). Slug tidak ditemukan/belum published → otomatis 404.

## CMS Portfolio (admin)

- `supabase/migrations/0003_storage_portfolio.sql` — bucket Storage `portfolio-images` (public read, admin-only write). Jalankan ini juga lewat `supabase db push` atau SQL Editor.
- `src/app/admin/portfolio/page.tsx` — daftar semua portfolio (termasuk draft), dengan tombol hapus.
- `src/app/admin/portfolio/new/page.tsx` + `portfolio-form.tsx` — form tambah portfolio: judul, slug (auto-generate dari judul, bisa diedit manual), kategori, nama klien, deskripsi, **upload gambar cover langsung dari form** (tersimpan ke bucket `portfolio-images`), tech stack (pisahkan koma), link live site, checkbox unggulan, dan pilihan status draft/published.
- `src/app/admin/portfolio/actions.ts` — server action `createPortfolio` (validasi Zod + cek admin) dan `deletePortfolio`.

Jangan lupa jalankan migration `0003_storage_portfolio.sql` di Supabase (lewat CLI `supabase db push` atau copy-paste ke SQL Editor) sebelum upload gambar dicoba, karena bucket-nya harus ada dulu.

## Edit & Hapus Portfolio

- `src/app/admin/portfolio/portfolio-form.tsx` — form yang sama dipakai untuk tambah dan edit (`defaultValues` opsional, `action` bisa `createPortfolio` atau `updatePortfolio`).
- `src/app/admin/portfolio/[id]/edit/page.tsx` — halaman edit, form terisi otomatis dengan data yang ada.
- `updatePortfolio` di `actions.ts` — server action update, validasi Zod yang sama dengan create.
- Tombol "Hapus" di listing sekarang minta konfirmasi dulu (`delete-button.tsx`) sebelum benar-benar menghapus data.

## Blog (publik + CMS admin)

- `supabase/migrations/0004_storage_blog.sql` — bucket Storage `blog-images` (public read, admin-only write). Jalankan seperti migration lainnya.
- `src/app/(public)/blog/page.tsx` — grid artikel `published`, diurutkan dari yang terbaru.
- `src/app/(public)/blog/[slug]/page.tsx` — halaman detail artikel. Catatan: konten ditampilkan sebagai teks biasa (whitespace-pre-wrap), belum ada parser Markdown — bisa ditambahkan nanti (misal pakai `react-markdown`) kalau kamu mau format tebal/miring/heading beneran dirender.
- `src/app/admin/blog/` — CMS lengkap: listing (`page.tsx`), tambah (`new/page.tsx`), edit (`[id]/edit/page.tsx`), semuanya pakai form reusable `blog-form.tsx` dengan upload gambar cover.
- `src/components/admin/delete-button.tsx` — tombol hapus dengan konfirmasi, dipakai bareng oleh modul Portfolio dan Blog.

## Markdown rendering & CMS Pricing

- Konten blog sekarang di-render pakai `react-markdown` + `remark-gfm` (mendukung tabel, bold, list, dll), distyle lewat class `.markdown-body` di `globals.css` — bukan lagi teks polos.
- `src/app/admin/pricing/` — CMS lengkap untuk paket harga: listing, tambah, edit, hapus. Fitur ditulis satu baris per fitur di textarea. Ada checkbox "Tandai populer" dan "Aktif" (kalau nonaktif, otomatis hilang dari halaman `/pricing` publik).

## Contact form & Pesan konsultasi

- `src/app/(public)/contact/page.tsx` — form konsultasi (nama, email, no HP, perusahaan, layanan yang diminati, pesan) yang submit ke tabel `consultation_messages`. Setelah sukses kirim, form berubah jadi pesan konfirmasi (bukan redirect).
- `src/app/admin/messages/page.tsx` — daftar semua pesan masuk, bisa ubah status (Baru/Sudah dihubungi/Selesai) langsung dari dropdown, dan hapus pesan.
- Dashboard admin (`/admin/dashboard`) sekarang menampilkan ringkasan jumlah portfolio, artikel blog, dan pesan baru yang belum ditindaklanjuti — masing-masing bisa diklik langsung ke halamannya.

Dengan ini, semua modul dari rencana awal (Portfolio, Blog, Pricing, Contact/Messages) sudah punya CMS admin lengkap (create, read, update, delete).

## Sidebar admin

- `src/components/admin/sidebar.tsx` — sidebar navigasi (Dashboard, Portfolio, Blog, Pricing, Pesan) dengan highlight active-state, tampil di layar medium ke atas.
- `src/components/admin/mobile-nav.tsx` — dropdown menu hamburger untuk navigasi yang sama di layar kecil (sidebar disembunyikan di mobile).
- `src/app/admin/layout.tsx` — sekarang membungkus konten dengan struktur sidebar + main content di sebelahnya.

## Halaman Process

- `src/app/(public)/process/page.tsx` — 6 tahapan kerja (Konsultasi & analisis, Desain UI/UX, Development, Testing & revisi, Rilis, Maintenance & support), layout bernomor konsisten dengan halaman Services & About, ditutup CTA konsultasi.

Dengan ini, semua halaman publik dari rencana awal (Home, Services, Portfolio, About, Process, Pricing, Contact, Blog) sudah terisi kontennya.

## Retheme: tema terang & 3 section baru homepage

- **Retheme total ke warna terang/putih** — token warna di `globals.css` diganti dari dark navy ke putih/abu terang, teks jadi gelap, aksen tetap warna emas tapi digelapkan (`#B45309`) supaya kontrasnya cukup di atas putih. Nama variabel CSS (`--ink-900`, `text-ink-fg`, dll) sengaja dipertahankan supaya tidak perlu ubah ratusan class di semua file — cuma nilai warnanya yang berubah.
- Semua teks putih di atas tombol aksen (`text-ink-900` → `text-white`) dan warna error (`text-red-400` → `text-red-600`) disesuaikan supaya tetap kontras di tema baru.
- **3 section baru di homepage** (`src/app/(public)/page.tsx`), tampil setelah Hero:
  1. `src/components/sections/why-choose-us.tsx` — grid 9 fitur unggulan (keamanan, performa, skalabilitas, dll), data di `src/lib/data/why-choose-us.ts`.
  2. `src/components/sections/tech-stack.tsx` — showcase teknologi asli yang dipakai (Next.js, Supabase, TypeScript, Tailwind — bukan WordPress/Laravel seperti referensi, disesuaikan dengan stack project ini).
  3. `src/components/sections/benefits.tsx` — grid 6 dampak positif website untuk bisnis, data di `src/lib/data/benefits.ts`.
- Konten ketiga section ini ditulis ulang dengan bahasa dan penekanan milik Nexora Incodeon sendiri (bukan copy-paste dari referensi kompetitor).

## Mockup ilustrasi di halaman Services

- `src/components/sections/service-mockup.tsx` — ilustrasi SVG laptop+HP (gaya line-art konsisten dengan Hero, bukan screenshot asli karena belum ada foto produk beneran), warnanya berubah sesuai `hue` tiap layanan.
- `src/lib/data/services.ts` — tiap service sekarang punya field `hue` (teal/orange/indigo/rose/sky/violet/amber/pink) untuk warna aksen mockup-nya.
- `src/app/(public)/services/page.tsx` — layout diubah dari list tipis jadi card besar per layanan, teks di satu sisi + mockup di sisi lain, posisinya selang-seling kiri-kanan tiap baris biar tidak monoton.

## Update halaman Process: 8 langkah

- `src/app/(public)/process/page.tsx` — diperluas dari 6 jadi 8 langkah (Konsultasi, Penawaran Harga, Persetujuan Kerja Sama, Desain & Pengembangan, Uji Coba & Peluncuran, Pelatihan & Serah Terima, Dukungan Teknis, Perpanjangan Layanan opsional).
- Layout diubah jadi grid 2 kolom dengan badge centang bulat berwarna aksen di tiap langkah, terinspirasi referensi yang dikasih user tapi disesuaikan ke bahasa dan alur kerja Nexora Incodeon sendiri.

## Gambar asli untuk 5 layanan

- `src/lib/data/services.ts` — tiap service sekarang punya field `image` opsional (path ke `public/`).
- Sudah dipasang: `website-development` → `/1.png`, `e-commerce` → `/2.png`, `company-profile` → `/3.png`, `web-application` → `/4.png`, `custom-system` → `/5.png`.
- `src/app/(public)/services/page.tsx` — kalau `service.image` ada, tampilkan gambar asli itu; kalau belum ada (3 layanan sisanya: UI/UX development, Maintenance & support, Digital consultation), fallback otomatis ke ilustrasi SVG `ServiceMockup`.
- **Penting:** pastikan file `1.png` sampai `5.png` ada langsung di folder `public/` (root project, sejajar `src/`), bukan di `public/images/` atau subfolder lain — karena path yang dipakai adalah `/1.png` dst.

## Gambar service tanpa border + animasi

- `src/components/sections/service-image.tsx` — komponen client baru untuk gambar service asli: tanpa border/background, fade-in + geser naik saat scroll masuk viewport, dan sedikit "mengambang" (translate ke atas) saat di-hover.
- `src/app/(public)/services/page.tsx` — pakai `ServiceImage` menggantikan `<img>` polos untuk 5 layanan yang sudah punya gambar asli.

## Redesign Pricing: tab per layanan + 3 tingkat paket

- `supabase/migrations/0005_pricing_categories.sql` — tambah kolom `service_slug`, `description`, `duration_label`, `extra_note` di tabel `pricing_plans`. **Jalankan migration ini** (via `supabase db push` atau SQL Editor) sebelum fitur ini berfungsi.
- `src/app/admin/pricing/` — form tambah/edit paket sekarang ada dropdown "Layanan" (wajib pilih salah satu dari 8 layanan), field deskripsi singkat, label durasi (misal `/tahun`), dan catatan tambahan (misal "Tambah Halaman Rp150.000/halaman"). Listing admin juga menampilkan kolom layanan.
- `src/app/(public)/pricing/pricing-tabs.tsx` — komponen client baru: tombol tab untuk tiap layanan yang **punya paket aktif** (layanan tanpa paket tidak akan muncul tab-nya), di bawahnya tampil 3 card (atau berapa pun jumlah paket layanan itu) dengan ikon (otomatis dipilih dari kata "pelajar"/"bisnis"/"umkm" di nama paket), badge "PALING LARIS" untuk paket populer, harga, daftar fitur bercentang, tombol "Hubungi Kami", dan catatan tambahan.
- `supabase/seed.sql` — diperbarui dengan contoh nyata: 3 paket (Pelajar, Bisnis, UMKM) untuk layanan Company Profile, sesuai referensi yang diberikan user.
- **Untuk layanan lain punya paket harga sendiri**, tinggal tambah lewat `/admin/pricing/new` dan pilih layanannya di dropdown — tab baru otomatis muncul di halaman publik.

## Tombol WhatsApp & warna aksen biru

- `src/lib/constants.ts` — nomor WhatsApp (`085722478724` → format internasional `6285722478724`) dan pesan default, digabung jadi `WHATSAPP_URL`.
- Semua tombol "Mulai konsultasi" (Hero, Footer, Services, Process, Pricing) sekarang membuka WhatsApp di tab baru, bukan ke halaman `/contact`. Halaman `/contact` dengan form tetap ada dan masih bisa diakses (link navbar "Konsultasi gratis" masih ke situ) — cuma tombol "Mulai konsultasi" spesifiknya yang diarahkan ke WhatsApp.
- Warna aksen di `globals.css` diganti dari coklat/emas (`#B45309`) jadi **biru** (`#2563EB`, hover `#1D4ED8`). Karena semua tempat pakai variabel CSS (`text-accent`, `bg-accent`, dll), perubahan ini otomatis berlaku ke semua halaman tanpa perlu edit satu-satu.

Kalau nomor WhatsApp atau pesan default mau diganti, cukup edit `src/lib/constants.ts`.

## Konten semua halaman digabung ke homepage (kecuali About & Portfolio)

Konten inti tiap halaman diekstrak jadi komponen reusable di `src/components/sections/`, dipakai bareng oleh halaman aslinya (yang masih tetap ada, lengkap dengan CTA penutup masing-masing) DAN oleh homepage (tanpa CTA penutup, biar tidak ada banyak tombol serupa menumpuk):

- `services-content.tsx` — dipakai di `/services` dan homepage
- `process-content.tsx` — dipakai di `/process` dan homepage
- `pricing-content.tsx` — dipakai di `/pricing` dan homepage (fetch data sendiri dari Supabase)
- `blog-content.tsx` — dipakai di `/blog` dan homepage
- `contact-content.tsx` — dipakai di `/contact` dan homepage (form tetap ada tombol submit-nya karena itu fungsi form, bukan CTA marketing)

Urutan section di homepage sekarang: Hero → Why Choose Us → Tech Stack → Benefits → Services → Process → Pricing → Blog → Contact. About dan Portfolio TIDAK ditambahkan ke homepage sesuai permintaan — keduanya tetap hanya bisa diakses lewat halaman terpisah (`/about`, `/portfolio`) via navbar.

Halaman `/services`, `/process`, `/pricing`, `/blog`, `/contact` sendiri tidak berubah secara konten — cuma dipecah jadi komponen yang dipakai ulang, jadi tidak ada duplikasi kode.

## Semua halaman digabung ke homepage (kecuali About & Portfolio)

- Konten Services, Process, Pricing, Blog, dan Contact masing-masing diekstrak jadi komponen `*Content` (`services-content.tsx`, `process-content.tsx`, `pricing-content.tsx`, `blog-content.tsx`, `contact-content.tsx`) di `src/components/sections/`, dipakai bareng oleh halaman aslinya (`/services`, `/process`, dst — tetap ada, isinya sama) DAN homepage.
- `src/app/(public)/page.tsx` sekarang merender semuanya berurutan: Hero → Why Choose Us → Tech Stack → Benefits → Services → Process → Pricing → Blog → Contact.
- **About dan Portfolio sengaja tidak ditambahkan** ke homepage sesuai permintaan — keduanya tetap cuma ada di halaman terpisah (`/about`, `/portfolio`).
- Karena homepage sekarang include Pricing dan Blog yang fetch data dari Supabase, homepage jadi server-rendered dinamis (bukan static) — ini normal dan tidak masalah untuk performa pada skala project ini.
#   n e x o r a i n c o d e o n  
 