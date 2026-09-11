"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Layers3,
  Rocket,
} from "lucide-react";

import type { Service } from "@/lib/data/services";
import { ServiceMockup } from "@/components/sections/service-mockup";
import { ServiceImage } from "@/components/sections/service-image";

type Props = {
  service: Service;
};

export function ServiceDetail({ service }: Props) {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-line">
        <div
          className="blueprint-grid absolute inset-0 opacity-40"
          aria-hidden="true"
        />

       <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs text-ink-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Kembali ke layanan
          </Link>

        <div className="mt-8 grid items-start gap-12 md:mt-10 md:grid-cols-2">
            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <span className="font-label text-xs text-accent">
                  {service.tag}
                </span>

                <span className="h-px w-8 bg-ink-line" />

                <span className="font-label text-xs uppercase tracking-wider text-ink-fg-muted">
                  Nexora Incodeon
                </span>
              </div>

              <h1 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink-fg md:text-6xl">
                {service.title}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-ink-fg-muted">
                {service.intro}
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
              >
                Konsultasi project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            {/* VISUAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: "easeOut",
              }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-xl border border-ink-line bg-ink-panel/40 p-6 md:p-8">
                <div className="absolute inset-0 blueprint-grid opacity-20" />

                <div className="relative">
                  {service.image ? (
                    <ServiceImage
                      src={service.image}
                      alt={service.title}
                    />
                  ) : (
                    <ServiceMockup hue={service.hue} />
                  )}
                </div>

                <div className="absolute right-5 top-5 h-6 w-6 border-r border-t border-accent/40" />

                <div className="absolute bottom-5 left-5 font-label text-[9px] uppercase tracking-widest text-ink-fg-muted">
                  nexora / {service.tag}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="font-label text-xs uppercase tracking-wider text-accent">
              overview
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold text-ink-fg">
              Solusi yang dibuat berdasarkan kebutuhan.
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-ink-fg-muted">
              {service.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-3 rounded-md border border-ink-line bg-ink-panel/30 p-4"
                >
                  <Check className="h-4 w-4 shrink-0 text-accent" />

                  <span className="text-sm text-ink-fg">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE & SOLUTION */}
      <section className="border-y border-ink-line bg-ink-panel/20">
        <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="border-b border-ink-line p-8 md:border-b-0 md:border-r md:p-12"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-line">
                <Layers3 className="h-4 w-4 text-accent" />
              </span>

              <span className="font-label text-xs uppercase tracking-wider text-ink-fg-muted">
                challenge
              </span>
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold text-ink-fg">
              Masalah yang ingin kami bantu selesaikan.
            </h2>

            <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
              {service.challenge}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/30 bg-accent/5">
                <Rocket className="h-4 w-4 text-accent" />
              </span>

              <span className="font-label text-xs uppercase tracking-wider text-ink-fg-muted">
                solution
              </span>
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold text-ink-fg">
              Solusi yang kami tawarkan.
            </h2>

            <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
              {service.solution}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="font-label text-xs uppercase tracking-wider text-accent">
            features
          </p>

          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-fg md:text-4xl">
            Apa yang kamu dapatkan.
          </h2>

          <p className="mt-4 text-sm leading-7 text-ink-fg-muted">
            Fitur disesuaikan dengan kebutuhan project, bukan sekadar
            menggunakan template yang sama untuk semua bisnis.
          </p>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-ink-line bg-ink-line sm:grid-cols-2 lg:grid-cols-3">
          {service.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
              }}
              className="group bg-ink-panel/60 p-6 transition-colors hover:bg-ink-panel"
            >
              <div className="flex items-center justify-between">
                <span className="font-label text-[10px] text-ink-fg-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <Code2 className="h-4 w-4 text-ink-line transition-colors group-hover:text-accent" />
              </div>

              <h3 className="mt-8 text-sm font-medium text-ink-fg">
                {feature}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="border-y border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-label text-xs uppercase tracking-wider text-accent">
                technology
              </p>

              <h2 className="mt-3 font-display text-2xl font-semibold text-ink-fg">
                Teknologi yang digunakan.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 md:max-w-xl md:justify-end">
              {service.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-md border border-ink-line bg-ink-panel/40 px-4 py-2 text-xs text-ink-fg-muted transition-colors hover:border-accent/30 hover:text-ink-fg"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="font-label text-xs uppercase tracking-wider text-accent">
            process
          </p>

          <h2 className="mt-3 font-display text-3xl font-semibold text-ink-fg md:text-4xl">
            Dari ide sampai produk berjalan.
          </h2>
        </div>

        <div className="mt-12">
          {service.process.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group grid gap-5 border-t border-ink-line py-7 md:grid-cols-[80px_220px_1fr] md:items-center"
            >
              <span className="font-label text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="font-display text-lg font-semibold text-ink-fg">
                {step.title}
              </h3>

              <p className="max-w-xl text-sm leading-6 text-ink-fg-muted">
                {step.description}
              </p>
            </motion.div>
          ))}

          <div className="border-t border-ink-line" />
        </div>
      </section>

      {/* CTA */}
     {/* CTA */}
<section className="relative overflow-hidden border-t border-ink-line">
  <div
    className="blueprint-grid absolute inset-0 opacity-30"
    aria-hidden="true"
  />

  <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Rocket */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink-line bg-ink-panel"
      >
        <Rocket
          className="h-5 w-5 text-accent"
          aria-hidden="true"
        />
      </motion.div>

      {/* Label */}
      <p className="mt-6 font-label text-xs uppercase tracking-wider text-accent">
        ready to build?
      </p>

      {/* Title */}
      <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink-fg md:text-5xl">
        {service.ctaTitle}
      </h2>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ink-fg-muted">
        {service.ctaDescription}
      </p>

      {/* Button */}
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
    </motion.div>
  </div>
</section>
    </main>
  );
}