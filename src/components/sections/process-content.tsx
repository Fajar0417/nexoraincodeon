"use client";

import { motion } from "framer-motion";
import {
  Search,
  Palette,
  Code2,
  TestTube2,
  Rocket,
} from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "Kami memahami kebutuhan, tujuan, dan masalah bisnis kamu sebelum menentukan solusi digital yang tepat.",
    icon: Search,
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Kami menyusun struktur, alur, dan tampilan antarmuka agar produk mudah digunakan dan memiliki pengalaman yang konsisten.",
    icon: Palette,
  },
  {
    number: "03",
    title: "Development",
    description:
      "Desain kemudian dikembangkan menjadi website atau aplikasi menggunakan teknologi yang sesuai dengan kebutuhan project.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Testing",
    description:
      "Kami melakukan pengujian untuk memastikan fitur, responsivitas, performa, dan fungsi sistem berjalan dengan baik.",
    icon: TestTube2,
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Setelah semuanya siap, produk dideploy dan dipersiapkan agar dapat digunakan oleh pengguna secara nyata.",
    icon: Rocket,
  },
];

export function ProcessContent() {
  return (
    <section className="border-b border-ink-line">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="font-label text-sm text-accent">
            proses kerja
          </p>

          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
            Dari ide hingga produk siap digunakan.
          </h2>

          <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
            Kami menggunakan proses yang terstruktur agar setiap project
            memiliki arah yang jelas, komunikasi yang baik, dan hasil yang
            sesuai dengan kebutuhan bisnis kamu.
          </p>
        </motion.div>

        {/* Process List */}
        <div className="mt-14">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="group grid gap-5 border-t border-ink-line py-7 transition-colors duration-300 hover:bg-ink-panel/30 md:grid-cols-[80px_220px_1fr] md:items-center"
              >
                {/* Number */}
                <span className="font-label text-xs text-accent">
                  {step.number}
                </span>

                {/* Title */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-ink-line bg-ink-panel transition-colors duration-300 group-hover:border-accent/40">
                    <Icon
                      className="h-4 w-4 text-accent"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-display text-base font-semibold text-ink-fg">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="max-w-xl text-sm leading-6 text-ink-fg-muted">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}