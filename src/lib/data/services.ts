export type Service = {
  slug: string;
  tag: string;
  icon:
    | "code"
    | "building"
    | "cart"
    | "app-window"
    | "settings"
    | "palette"
    | "wrench"
    | "message-circle";

  title: string;
  shortTitle: string;

  description: string;
  intro: string;

  highlights: string[];

  challenge: string;
  solution: string;

  features: string[];

  technologies: string[];

  process: {
    title: string;
    description: string;
  }[];

  ctaTitle: string;
  ctaDescription: string;

  hue:
    | "teal"
    | "orange"
    | "indigo"
    | "rose"
    | "sky"
    | "violet"
    | "amber"
    | "pink";

  image?: string;
};

export const services: Service[] = [
  {
    slug: "website-development",
    tag: "web",
    icon: "code",

    title: "Website Development",
    shortTitle: "Website Development",

    description:
      "Website profesional, cepat, responsif, dan dirancang untuk membantu bisnis tampil lebih terpercaya di dunia digital.",

    intro:
      "Kami membangun website modern yang tidak hanya terlihat menarik, tetapi juga memiliki struktur yang baik, performa optimal, dan mudah dikembangkan sesuai kebutuhan bisnis.",

    highlights: [
      "Responsive di semua perangkat",
      "SEO-friendly",
      "Performa cepat",
      "Struktur mudah dikembangkan",
    ],

    challenge:
      "Banyak bisnis sudah memiliki produk atau layanan yang baik, tetapi belum memiliki website yang mampu menyampaikan nilai bisnis secara profesional dan meyakinkan.",

    solution:
      "Kami merancang dan mengembangkan website berdasarkan kebutuhan bisnis, mulai dari struktur halaman, desain antarmuka, pengembangan hingga deployment.",

    features: [
      "Landing page",
      "Website multi-halaman",
      "Responsive design",
      "SEO on-page",
      "Contact form",
      "CMS dan pengelolaan konten",
      "Analytics integration",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],

    process: [
      {
        title: "Analisis kebutuhan",
        description:
          "Memahami tujuan website, target pengguna, konten, dan kebutuhan bisnis.",
      },
      {
        title: "UI/UX Design",
        description:
          "Menyusun struktur halaman dan tampilan visual sebelum masuk tahap development.",
      },
      {
        title: "Development",
        description:
          "Mengembangkan website menggunakan teknologi yang sesuai dengan kebutuhan project.",
      },
      {
        title: "Testing",
        description:
          "Memastikan tampilan, fungsi, responsivitas, dan performa berjalan dengan baik.",
      },
      {
        title: "Deployment",
        description:
          "Menyiapkan website agar dapat diakses secara online dan siap digunakan.",
      },
    ],

    ctaTitle: "Siap membangun website untuk bisnis kamu?",
    ctaDescription:
      "Ceritakan kebutuhan website kamu dan kami bantu menentukan solusi yang paling sesuai.",

    hue: "indigo",
    image: "/1.png",
  },

  {
    slug: "company-profile",
    tag: "profile",
    icon: "building",

    title: "Company Profile",
    shortTitle: "Company Profile",

    description:
      "Website company profile profesional untuk memperkenalkan bisnis, membangun kredibilitas, dan meningkatkan kepercayaan calon pelanggan.",

    intro:
      "Company profile menjadi representasi digital bisnis kamu. Kami membuat website yang menyampaikan informasi perusahaan secara jelas, profesional, dan mudah dipercaya.",

    highlights: [
      "Profil bisnis profesional",
      "Struktur informasi jelas",
      "Galeri dan portofolio",
      "Form kontak",
    ],

    challenge:
      "Calon pelanggan sering mencari informasi bisnis melalui internet sebelum menghubungi atau melakukan kerja sama.",

    solution:
      "Kami membuat company profile yang menampilkan identitas, layanan, pengalaman, portofolio, dan informasi kontak bisnis dalam satu website yang profesional.",

    features: [
      "Tentang perusahaan",
      "Layanan",
      "Portfolio",
      "Galeri",
      "Team section",
      "Testimonial",
      "Contact form",
      "Google Maps integration",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],

    process: [
      {
        title: "Business discovery",
        description:
          "Mempelajari profil, layanan, karakter, dan tujuan bisnis.",
      },
      {
        title: "Content structure",
        description:
          "Menyusun informasi perusahaan agar mudah dipahami pengunjung.",
      },
      {
        title: "Visual design",
        description:
          "Membuat tampilan yang sesuai dengan identitas dan karakter bisnis.",
      },
      {
        title: "Development",
        description:
          "Mengembangkan website yang responsif dan optimal.",
      },
      {
        title: "Launch",
        description:
          "Melakukan deployment dan memastikan website siap digunakan.",
      },
    ],

    ctaTitle: "Bangun citra profesional bisnis kamu.",
    ctaDescription:
      "Miliki company profile yang mampu memperkenalkan bisnis kamu dengan lebih profesional.",

    hue: "violet",
    image: "/3.png",
  },

  {
    slug: "e-commerce",
    tag: "shop",
    icon: "cart",

    title: "E-Commerce",
    shortTitle: "Online Store",

    description:
      "Toko online untuk membantu bisnis menjual produk secara digital dengan katalog, keranjang, checkout, dan pengelolaan pesanan.",

    intro:
      "Kami membangun sistem e-commerce yang disesuaikan dengan kebutuhan bisnis agar proses penjualan online menjadi lebih terstruktur dan mudah dikelola.",

    highlights: [
      "Katalog produk",
      "Keranjang belanja",
      "Checkout",
      "Manajemen pesanan",
    ],

    challenge:
      "Mengelola penjualan secara manual dapat menyulitkan bisnis ketika jumlah produk, pelanggan, dan transaksi mulai meningkat.",

    solution:
      "Kami menyediakan platform toko online yang membantu bisnis mengelola produk, stok, pelanggan, transaksi, dan pesanan secara terpusat.",

    features: [
      "Product catalog",
      "Product detail",
      "Shopping cart",
      "Checkout",
      "Payment gateway",
      "Order management",
      "Stock management",
      "Customer management",
      "Sales dashboard",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],

    process: [
      {
        title: "Business analysis",
        description:
          "Memahami model penjualan dan alur transaksi bisnis.",
      },
      {
        title: "Store architecture",
        description:
          "Menentukan struktur katalog, checkout, dan sistem pengelolaan pesanan.",
      },
      {
        title: "Development",
        description:
          "Mengembangkan toko online beserta fitur transaksi.",
      },
      {
        title: "Payment integration",
        description:
          "Mengintegrasikan metode pembayaran yang sesuai.",
      },
      {
        title: "Launch",
        description:
          "Melakukan testing akhir dan deployment toko online.",
      },
    ],

    ctaTitle: "Mulai jualan secara digital.",
    ctaDescription:
      "Bangun toko online yang lebih terstruktur dan siap berkembang bersama bisnis kamu.",

    hue: "orange",
    image: "/2.png",
  },

  {
    slug: "web-application",
    tag: "app",
    icon: "app-window",

    title: "Web Application",
    shortTitle: "Web Application",

    description:
      "Aplikasi berbasis web untuk membantu bisnis mengelola data, pengguna, proses operasional, dan kebutuhan internal.",

    intro:
      "Kami mengembangkan aplikasi web yang dapat digunakan untuk berbagai kebutuhan, mulai dari dashboard internal hingga sistem operasional yang kompleks.",

    highlights: [
      "Dashboard interaktif",
      "Authentication",
      "Role & permission",
      "Integrasi API",
    ],

    challenge:
      "Proses bisnis yang masih bergantung pada spreadsheet atau pekerjaan manual dapat memakan waktu dan meningkatkan risiko kesalahan.",

    solution:
      "Kami mengubah proses tersebut menjadi aplikasi web terpusat yang membantu tim bekerja lebih cepat, terstruktur, dan efisien.",

    features: [
      "Authentication",
      "Role & permission",
      "Dashboard",
      "Data management",
      "Search & filtering",
      "Reports",
      "API integration",
      "Notification system",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
    ],

    process: [
      {
        title: "Requirement analysis",
        description:
          "Memetakan kebutuhan pengguna dan alur kerja sistem.",
      },
      {
        title: "System planning",
        description:
          "Menyusun struktur database, fitur, role, dan arsitektur aplikasi.",
      },
      {
        title: "UI/UX",
        description:
          "Merancang interface yang mudah digunakan oleh pengguna.",
      },
      {
        title: "Development",
        description:
          "Mengembangkan fitur dan integrasi sistem.",
      },
      {
        title: "Testing & launch",
        description:
          "Melakukan pengujian dan deployment aplikasi.",
      },
    ],

    ctaTitle: "Punya proses bisnis yang ingin dibuat lebih efisien?",
    ctaDescription:
      "Kami dapat membantu mengubah proses manual menjadi aplikasi web yang terstruktur.",

    hue: "sky",
    image: "/4.png",
  },

  {
    slug: "custom-system",
    tag: "system",
    icon: "settings",

    title: "Custom System",
    shortTitle: "Custom System",

    description:
      "Sistem digital yang dirancang khusus mengikuti alur kerja, kebutuhan, dan karakteristik bisnis kamu.",

    intro:
      "Tidak semua kebutuhan bisnis dapat diselesaikan dengan software siap pakai. Kami membangun sistem dari awal agar benar-benar sesuai dengan proses kerja organisasi.",

    highlights: [
      "Dibuat sesuai kebutuhan",
      "Workflow fleksibel",
      "Scalable architecture",
      "Integrasi sistem",
    ],

    challenge:
      "Software siap pakai terkadang memiliki fitur yang tidak dibutuhkan atau justru tidak mendukung proses bisnis tertentu.",

    solution:
      "Kami menganalisis proses kerja kemudian membangun sistem yang benar-benar mengikuti kebutuhan organisasi.",

    features: [
      "Custom dashboard",
      "Custom workflow",
      "User management",
      "Role & permission",
      "Database management",
      "Report system",
      "API integration",
      "Automation",
    ],

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "REST API",
    ],

    process: [
      {
        title: "Business analysis",
        description:
          "Memahami proses kerja dan masalah yang ingin diselesaikan.",
      },
      {
        title: "System architecture",
        description:
          "Merancang database, workflow, role, dan struktur aplikasi.",
      },
      {
        title: "Prototype",
        description:
          "Membuat rancangan awal untuk memastikan sistem sesuai kebutuhan.",
      },
      {
        title: "Development",
        description:
          "Mengembangkan sistem berdasarkan rancangan yang telah disepakati.",
      },
      {
        title: "Implementation",
        description:
          "Melakukan testing, deployment, dan membantu proses implementasi.", 
      },
    ],

    ctaTitle: "Butuh sistem yang benar-benar sesuai bisnis?",
    ctaDescription:
      "Mari diskusikan kebutuhan sistem kamu dan cari solusi yang paling tepat.",

    hue: "teal",
    image: "/5.png",
  },

  {
    slug: "ui-ux-development",
    tag: "design",
    icon: "palette",

    title: "UI/UX Development",
    shortTitle: "UI/UX Design",

    description:
      "Perancangan UI/UX yang berfokus pada pengalaman pengguna, struktur informasi, dan tampilan visual yang konsisten.",

    intro:
      "Produk digital yang baik tidak hanya harus berfungsi, tetapi juga harus mudah dipahami dan nyaman digunakan oleh penggunanya.",

    highlights: [
      "User-centered design",
      "Wireframe",
      "Interactive prototype",
      "Design system",
    ],

    challenge:
      "Interface yang membingungkan dapat membuat pengguna kesulitan menyelesaikan tugas dan meninggalkan produk lebih cepat.",

    solution:
      "Kami merancang pengalaman pengguna melalui struktur informasi, wireframe, prototype, dan visual interface yang konsisten.",

    features: [
      "User flow",
      "Wireframe",
      "UI design",
      "Interactive prototype",
      "Design system",
      "Responsive design",
      "Usability review",
    ],

    technologies: [
      "Figma",
      "Next.js",
      "React",
      "Tailwind CSS",
    ],

    process: [
      {
        title: "Research",
        description:
          "Memahami pengguna, kebutuhan, dan tujuan produk.",
      },
      {
        title: "User flow",
        description:
          "Menyusun alur pengguna agar proses dalam aplikasi lebih sederhana.",
      },
      {
        title: "Wireframe",
        description:
          "Membuat struktur dasar halaman sebelum visual design.",
      },
      {
        title: "UI Design",
        description:
          "Membangun tampilan visual dan design system.",
      },
      {
        title: "Prototype",
        description:
          "Membuat prototype interaktif untuk mengevaluasi pengalaman pengguna.",
      },
    ],

    ctaTitle: "Buat produk yang nyaman digunakan.",
    ctaDescription:
      "Kami membantu menerjemahkan ide menjadi interface yang jelas, modern, dan mudah digunakan.",

    hue: "pink",
  },

  {
    slug: "maintenance-support",
    tag: "care",
    icon: "wrench",

    title: "Maintenance & Support",
    shortTitle: "Maintenance",

    description:
      "Layanan pemeliharaan dan dukungan teknis untuk menjaga website atau aplikasi tetap aman, stabil, dan berjalan optimal.",

    intro:
      "Project tidak berhenti setelah website atau aplikasi selesai dibuat. Maintenance membantu memastikan sistem tetap berjalan dengan baik seiring waktu.",

    highlights: [
      "Bug fixing",
      "Security updates",
      "Performance monitoring",
      "Technical support",
    ],

    challenge:
      "Website dan aplikasi membutuhkan pemeliharaan agar tetap kompatibel, aman, dan memiliki performa yang baik.",

    solution:
      "Kami membantu menangani maintenance teknis sehingga kamu dapat fokus menjalankan bisnis tanpa harus mengurus masalah teknis sendiri.",

    features: [
      "Bug fixing",
      "Security updates",
      "Performance optimization",
      "Backup",
      "Monitoring",
      "Content updates",
      "Technical support",
    ],

    technologies: [
      "Next.js",
      "React",
      "Supabase",
      "Vercel",
      "GitHub",
    ],

    process: [
      {
        title: "System audit",
        description:
          "Memeriksa kondisi website atau aplikasi saat ini.",
      },
      {
        title: "Issue identification",
        description:
          "Mengidentifikasi bug, masalah performa, dan kebutuhan update.",
      },
      {
        title: "Maintenance",
        description:
          "Melakukan perbaikan dan pembaruan sistem.",
      },
      {
        title: "Testing",
        description:
          "Memastikan perubahan tidak mengganggu fitur yang sudah berjalan.",
      },
      {
        title: "Monitoring",
        description:
          "Memantau sistem setelah maintenance selesai.",
      },
    ],

    ctaTitle: "Website kamu butuh perawatan?",
    ctaDescription:
      "Serahkan maintenance teknis kepada kami agar sistem tetap berjalan dengan baik.",

    hue: "rose",
  },

  {
    slug: "digital-consultation",
    tag: "advice",
    icon: "message-circle",

    title: "Digital Consultation",
    shortTitle: "Consultation",

    description:
      "Konsultasi untuk membantu menentukan strategi, teknologi, dan solusi digital yang sesuai dengan kebutuhan bisnis.",

    intro:
      "Tidak semua project harus langsung masuk tahap development. Konsultasi membantu menentukan apa yang benar-benar dibutuhkan sebelum mengeluarkan waktu dan biaya.",

    highlights: [
      "Analisis kebutuhan",
      "Rekomendasi teknologi",
      "Perencanaan fitur",
      "Estimasi project",
    ],

    challenge:
      "Memulai project tanpa perencanaan yang jelas dapat menyebabkan scope berubah, biaya meningkat, dan proses development menjadi tidak terarah.",

    solution:
      "Kami membantu memetakan kebutuhan bisnis, menentukan prioritas fitur, memilih teknologi, dan menyusun gambaran project sebelum development dimulai.",

    features: [
      "Business requirement analysis",
      "Feature planning",
      "Technology recommendation",
      "Project estimation",
      "Technical consultation",
      "System planning",
    ],

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "Laravel",
    ],

    process: [
      {
        title: "Diskusi",
        description:
          "Memahami ide, masalah, dan tujuan bisnis kamu.",
      },
      {
        title: "Analisis",
        description:
          "Menganalisis kebutuhan dan menentukan prioritas.",
      },
      {
        title: "Solution planning",
        description:
          "Menyusun solusi dan fitur yang diperlukan.",
      },
      {
        title: "Technology selection",
        description:
          "Menentukan teknologi yang sesuai dengan kebutuhan project.",
      },
      {
        title: "Project roadmap",
        description:
          "Menyusun gambaran tahapan dan estimasi pengembangan.",
      },
    ],

    ctaTitle: "Masih bingung mulai dari mana?",
    ctaDescription:
      "Ceritakan ide atau masalah bisnis kamu. Kita diskusikan solusi digital yang paling masuk akal.",

    hue: "amber",
  },
];