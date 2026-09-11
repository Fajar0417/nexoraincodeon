"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Building2,
  ShoppingCart,
  AppWindow,
  Settings2,
  Palette,
  Wrench,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

import { services, type Service } from "@/lib/data/services";
import { ServiceMockup } from "@/components/sections/service-mockup";
import { ServiceImage } from "@/components/sections/service-image";
import Link from "next/link";

const iconMap: Record<Service["icon"], typeof Code2> = {
  code: Code2,
  building: Building2,
  cart: ShoppingCart,
  "app-window": AppWindow,
  settings: Settings2,
  palette: Palette,
  wrench: Wrench,
  "message-circle": MessageCircle,
};

export function ServicesContent() {
  return (
    <>
      {/* Section Header */}
      <section className="blueprint-grid border-b border-ink-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="font-label text-sm text-accent">layanan</p>

            <h2 className="mt-3 max-w-lg font-display text-3xl font-semibold leading-tight text-ink-fg md:text-4xl">
              Delapan cara kami membantu bisnis kamu bergerak digital.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-ink-fg-muted">
              Dari company profile sederhana sampai sistem custom untuk
              operasional internal — kami sesuaikan dengan kebutuhan dan skala
              bisnis kamu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-16">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            const reversed = index % 2 === 1;

            return (
              <motion.div
                key={service.slug}
                initial={{
                  opacity: 0,
                  y: 40,
                  x: reversed ? 20 : -20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  group relative grid grid-cols-1 items-center
                  gap-10 overflow-hidden rounded-xl
                  border border-ink-line
                  bg-ink-panel/40
                  p-8
                  transition-colors duration-500
                  hover:border-accent/30
                  md:grid-cols-2
                "
              >
                {/* Ambient glow */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    -right-32 -top-32
                    h-72 w-72 rounded-full
                    bg-accent/5 blur-3xl
                    opacity-0
                    transition-opacity duration-700
                    group-hover:opacity-100
                  "
                />

                {/* Small corner accent */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute
                    bottom-0 left-0
                    h-px w-0
                    bg-accent
                    transition-all duration-700
                    group-hover:w-32
                  "
                />

                {/* Content */}
                <div
                  className={`relative z-10 ${
                    reversed ? "md:order-2" : ""
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className="
                      inline-flex h-12 w-12
                      items-center justify-center
                      rounded-md
                      border border-ink-line
                      bg-ink
                      transition-colors duration-300
                      group-hover:border-accent/40
                    "
                  >
                    <Icon
                      className="h-5 w-5 text-accent"
                      aria-hidden="true"
                    />
                  </motion.div>

                  {/* Number / Tag */}
                  <p className="font-label mt-4 text-xs text-ink-fg-muted">
                    {String(index + 1).padStart(2, "0")}{" "}
                    <span className="text-ink-line">/</span>{" "}
                    {service.tag}
                  </p>

                  {/* Title */}
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink-fg">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 max-w-md text-sm leading-6 text-ink-fg-muted">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-5 flex max-w-lg flex-wrap gap-x-6 gap-y-2">
                    {service.highlights.map((point) => (
                      <li
                        key={point}
                        className="
                          text-xs text-ink-fg-muted
                          before:mr-2
                          before:text-accent
                          before:content-['—']
                        "
                      >
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom label */}
                  <Link
  href={`/services/${service.slug}`}
  className="
    mt-7 inline-flex items-center gap-2
    text-xs font-medium
    text-ink-fg-muted
    transition-colors duration-300
    group-hover:text-accent
  "
>
  <span>Lihat solusi</span>

  <ArrowUpRight
    className="
      h-3.5 w-3.5
      transition-transform duration-300
      group-hover:-translate-y-0.5
      group-hover:translate-x-0.5
    "
    aria-hidden="true"
  />
</Link>
                </div>

                {/* Visual */}
                <div
                  className={`relative z-10 ${
                    reversed ? "md:order-1" : ""
                  }`}
                >
                  {service.image ? (
                    <ServiceImage
                      src={service.image}
                      alt={service.title}
                    />
                  ) : (
                    <ServiceMockup hue={service.hue} />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}