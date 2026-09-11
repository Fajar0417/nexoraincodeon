import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Lightbulb,
  Rocket,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Tentang Kami — Nexora Incodeon",
  description:
    "Nexora Incodeon adalah software house yang membantu bisnis membangun website, aplikasi web, dan sistem digital yang relevan, scalable, dan mudah dikembangkan.",
};

const clients = [
  "UMKM",
  "Startup",
  "Perusahaan",
  "Sekolah & Kampus",
  "Organisasi",
  "Personal & Profesional",
  "Instansi",
];

const principles = [
  {
    tag: "01 / understand",
    title: "Kami memahami sebelum membangun",
    description:
      "Kami memulai project dengan memahami kebutuhan, tujuan, dan alur kerja bisnis. Dengan begitu, solusi yang dibangun benar-benar menjawab masalah, bukan sekadar terlihat bagus.",
  },
  {
    tag: "02 / transparent",
    title: "Proses yang jelas dan terbuka",
    description:
      "Setiap project memiliki tahapan yang jelas. Mulai dari diskusi, perencanaan, desain, development, testing, hingga produk siap digunakan.",
  },
  {
    tag: "03 / scalable",
    title: "Dibangun untuk terus berkembang",
    description:
      "Kami memperhatikan struktur kode, arsitektur, dan teknologi yang digunakan agar produk tetap mudah dirawat dan dikembangkan ketika kebutuhan bisnis bertambah.",
  },
  {
    tag: "04 / long-term",
    title: "Kami tidak berhenti setelah produk live",
    description:
      "Produk digital membutuhkan pemeliharaan dan pengembangan. Karena itu, kami membuka ruang untuk maintenance, improvement, dan pengembangan fitur lanjutan.",
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Development",
    description:
      "Membangun website, aplikasi web, dan sistem digital dengan teknologi modern.",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "Mengubah kebutuhan bisnis menjadi solusi digital yang terstruktur dan mudah digunakan.",
  },
  {
    icon: Target,
    title: "Business Focus",
    description:
      "Setiap fitur dibuat dengan mempertimbangkan tujuan dan kebutuhan nyata bisnis.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "Produk dirancang agar dapat terus dikembangkan seiring pertumbuhan bisnis.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div
          className="blueprint-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
          <p className="font-label text-sm text-accent">tentang kami</p>

          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-ink-fg md:text-6xl">
            Kami membangun solusi digital yang punya tujuan.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-ink-fg-muted">
            Nexora Incodeon adalah software house yang membantu bisnis,
            organisasi, dan individu mengubah ide serta kebutuhan mereka
            menjadi produk digital yang dapat digunakan dan dikembangkan.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <p className="font-label text-xs uppercase tracking-wider text-accent">
              nexora incodeon
            </p>

            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
              Dari ide menjadi sesuatu yang bisa digunakan.
            </h2>

            <div className="mt-6 max-w-2xl space-y-5">
              <p className="text-base leading-8 text-ink-fg-muted">
                Banyak ide bisnis memiliki potensi besar, tetapi tidak selalu mudah
                diterjemahkan menjadi produk digital. Di sinilah Nexora Incodeon
                hadir.
              </p>

              <p className="text-base leading-8 text-ink-fg-muted">
                Kami membantu menerjemahkan kebutuhan tersebut menjadi website,
                aplikasi web, maupun sistem custom yang sesuai dengan cara kerja
                dan tujuan bisnis.
              </p>

              <p className="text-base leading-8 text-ink-fg-muted">
                Kami percaya bahwa teknologi seharusnya menjadi alat untuk
                menyelesaikan masalah dan membuka peluang baru — bukan sekadar
                mengikuti tren.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="group relative overflow-hidden rounded-xl border border-[#1e3a5f] bg-[#0a1628]/70 p-8 md:p-10">
            
              <div
                className="blueprint-grid absolute inset-0 opacity-10"
                aria-hidden="true"
              />

              <div
                className="absolute left-5 top-5 h-5 w-5 border-l border-t border-accent/40"
                aria-hidden="true"
              />

              <div
                className="absolute bottom-5 right-5 h-5 w-5 border-b border-r border-accent/40"
                aria-hidden="true"
              />

              <div className="relative flex min-h-[280px] items-center justify-center md:min-h-[320px]">
                <img
                  src="logo.png"
                  alt="Nexora Incodeon"
                  className="w-full max-w-[240px] object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="relative mt-4 flex items-center justify-between border-t border-ink-line pt-4">
                <span className="font-label text-[10px] uppercase tracking-widest text-ink-fg-muted">
                  nexora / incodeon
                </span>

                <span className="font-label text-[10px] text-accent">
                  software house
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="border-y border-ink-line bg-ink-panel/30">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-4">
              <p className="font-label text-xs uppercase tracking-wider text-ink-fg-muted">
                siapa yang kami bantu
              </p>

              <h2 className="mt-3 font-display text-2xl font-semibold text-ink-fg">
                Solusi untuk berbagai kebutuhan.
              </h2>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-2xl text-sm leading-7 text-ink-fg-muted">
                Kami bekerja dengan berbagai jenis klien, mulai dari bisnis
                yang baru membangun kehadiran digital hingga organisasi yang
                membutuhkan sistem untuk mendukung operasional mereka.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="rounded-md border border-ink-line bg-ink px-4 py-2 text-sm text-ink-fg-muted transition-colors duration-300 hover:border-accent/40 hover:text-ink-fg"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="max-w-xl">
          <p className="font-label text-xs uppercase tracking-wider text-accent">
            cara kami berpikir
          </p>

          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-fg md:text-4xl">
            Bukan hanya tentang membuat website.
          </h2>

          <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
            Kami menggabungkan kemampuan teknis dengan pemahaman terhadap
            kebutuhan bisnis untuk menghasilkan solusi yang lebih tepat.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line md:grid-cols-2">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="bg-ink-panel p-7 md:p-9"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-line bg-ink">
                  <Icon
                    className="h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold text-ink-fg">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-ink-fg-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="blueprint-grid border-y border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-xl">
            <p className="font-label text-xs uppercase tracking-wider text-accent">
              prinsip kami
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-fg md:text-4xl">
              Prinsip yang menjadi dasar setiap project.
            </h2>
          </div>

          <div className="mt-12">
            {principles.map((principle) => (
              <div
                key={principle.tag}
                className="grid grid-cols-1 gap-5 border-t border-ink-line py-10 md:grid-cols-12 md:gap-10"
              >
                <p className="font-label text-xs text-accent md:col-span-3">
                  {principle.tag}
                </p>

                <div className="md:col-span-9">
                  <h3 className="font-display text-xl font-semibold text-ink-fg">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-fg-muted">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <p className="font-label text-xs uppercase tracking-wider text-accent">
              visi
            </p>

            <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-ink-fg md:text-5xl">
              Menjadi partner teknologi yang membantu bisnis tumbuh melalui
              solusi digital yang tepat.
            </h2>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-lg border border-ink-line bg-ink-panel/40 p-7">
              <p className="font-label text-xs text-ink-fg-muted">
                our approach
              </p>

              <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
                Kami tidak mengejar teknologi hanya karena sedang populer.
                Kami memilih teknologi berdasarkan kebutuhan, skala, dan
                tujuan project agar solusi yang dibangun benar-benar memiliki
                nilai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-ink-line">
        <div
          className="blueprint-grid absolute inset-0 opacity-30"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink-line bg-ink-panel">
            <Rocket
              className="h-5 w-5 text-accent"
              aria-hidden="true"
            />
          </div>

          <p className="mt-6 font-label text-xs uppercase tracking-wider text-accent">
            let&apos;s build
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-fg md:text-5xl">
            Punya ide atau kebutuhan digital?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink-fg-muted">
            Ceritakan kebutuhan kamu. Kami akan membantu menemukan solusi
            digital yang paling sesuai untuk project tersebut.
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
          >
            Mulai konsultasi

            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}