export type BenefitItem = {
  title: string;
  description: string;
  hue: "indigo" | "teal" | "orange" | "rose" | "sky" | "violet";
};

export const benefits: BenefitItem[] = [
  {
    title: "Lebih kredibel",
    description:
      "Bisnis yang punya website memudahkan calon klien mencari info detail — ini menandakan perusahaan terbuka dan bisa dipercaya.",
    hue: "indigo",
  },
  {
    title: "Hubungan pelanggan lebih tertata",
    description:
      "Data leads dari form konsultasi memudahkan kamu membangun proses follow-up yang lebih rapi dan konsisten.",
    hue: "teal",
  },
  {
    title: "Memudahkan brand awareness",
    description:
      "Website jadi kanal edukasi produk atau jasa kamu ke audiens yang lebih luas, kapan saja diakses.",
    hue: "orange",
  },
  {
    title: "Media pemasaran yang efektif",
    description:
      "Biaya menjangkau klien lebih terjangkau dibanding kanal konvensional, dan hasilnya bisa diukur.",
    hue: "rose",
  },
  {
    title: "Meningkatkan kepercayaan klien",
    description:
      "Tampilan profesional dan informasi yang jelas membuat calon klien lebih yakin untuk melanjutkan ke transaksi.",
    hue: "sky",
  },
  {
    title: "Membuka peluang bisnis baru",
    description:
      "Pengelolaan dan pemasaran digital yang konsisten membuka jalan ke pasar dan kerja sama yang lebih luas.",
    hue: "violet",
  },
];
