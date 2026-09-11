export type FeatureItem = {
  title: string;
  description: string;
  hue: "teal" | "orange" | "indigo" | "rose" | "sky" | "violet";
  icon: "shield" | "gauge" | "layers" | "plug" | "search" | "chart" | "palette" | "cms" | "devices";
};

export const whyChooseUs: FeatureItem[] = [
  {
    title: "Keamanan berlapis",
    description: "SSL, hardening server, dan backup rutin untuk melindungi data bisnis kamu.",
    hue: "teal",
    icon: "shield",
  },
  {
    title: "Performa cepat",
    description: "Dibangun di atas Next.js supaya skor loading dan Core Web Vitals tetap tinggi.",
    hue: "orange",
    icon: "gauge",
  },
  {
    title: "Skalabel",
    description: "Arsitektur yang siap tumbuh mengikuti kebutuhan dan skala bisnis kamu.",
    hue: "indigo",
    icon: "layers",
  },
  {
    title: "Integrasi fleksibel",
    description: "Terhubung dengan sistem, API, dan payment gateway yang kamu butuhkan.",
    hue: "indigo",
    icon: "plug",
  },
  {
    title: "SEO-ready",
    description: "Struktur teknis, meta data, dan markup yang mendukung ranking di mesin pencari.",
    hue: "rose",
    icon: "search",
  },
  {
    title: "Analitik & reporting",
    description: "Integrasi Google Analytics untuk pantau performa dan pengunjung website.",
    hue: "orange",
    icon: "chart",
  },
  {
    title: "Desain custom",
    description: "Tampilan unik sesuai identitas brand kamu, bukan template pasaran.",
    hue: "orange",
    icon: "palette",
  },
  {
    title: "Kelola konten mandiri",
    description: "Update portfolio, artikel, dan harga sendiri lewat dashboard admin, tanpa perlu developer.",
    hue: "teal",
    icon: "cms",
  },
  {
    title: "Responsive multi-device",
    description: "Tampil optimal dan konsisten di semua ukuran layar, dari HP sampai desktop.",
    hue: "indigo",
    icon: "devices",
  },
];
