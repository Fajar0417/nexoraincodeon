"use client";

import { motion } from "framer-motion";
import { WHATSAPP_URL } from "@/lib/constants";

const DRAW_DURATION = 1.1;
const MORPH_DELAY = DRAW_DURATION + 0.15;

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink-line">
      <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-5 md:py-32">
        <div className="md:col-span-3">
          <p className="font-label text-sm text-accent">
            nexora-incodeon / software house
          </p>
          <h1 className="mt-6 max-w-md font-display text-4xl font-semibold leading-[1.15] text-ink-fg md:text-5xl">
            Mengubah ide menjadi solusi digital yang nyata.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-ink-fg-muted">
            Kami merancang dan membangun website, aplikasi web, dan sistem
            custom untuk UMKM, startup, hingga instansi — dari sketsa awal
            sampai produk yang berjalan.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
            >
              Mulai konsultasi
            </a>
            <a
              href="/portfolio"
              className="rounded-md border border-ink-line px-6 py-3 text-sm font-medium text-ink-fg transition-colors hover:border-ink-fg-muted"
            >
              Lihat portfolio
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <BlueprintIllustration />
        </div>
      </div>
    </section>
  );
}

function BlueprintIllustration() {
  const cycleDuration = 4.5;

  return (
    <div className="relative rounded-lg border border-ink-line bg-ink-panel/60 p-6">
      <svg
        viewBox="0 0 280 220"
        className="h-auto w-full"
        role="img"
        aria-label="Ilustrasi sketsa layout website yang bertransformasi menjadi tampilan jadi"
      >
        <title>Dari sketsa ke produk jadi</title>

        {/* Wireframe */}
        <motion.g
          stroke="var(--accent)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 3"
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: cycleDuration,
            times: [0, 0.3, 0.45],
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          {[
            "M10 10 H270 V38 H10 Z",
            "M10 50 H130 V120 H10 Z",
            "M142 50 H270 V85 H142 Z",
            "M142 97 H270 V120 H142 Z",
            "M10 132 H270 V210 H10 Z",
          ].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
              }}
              transition={{
                duration: cycleDuration,
                times: [0, 0.3, 0.7, 1],
                delay: i * 0.05,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.g>

        {/* Finished product */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
          }}
          transition={{
            duration: cycleDuration,
            times: [0, 0.3, 0.45, 0.8, 1],
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <rect
            x="10"
            y="10"
            width="260"
            height="28"
            rx="4"
            fill="var(--color-ink-panel-raised)"
            stroke="var(--line)"
          />

          <circle
            cx="24"
            cy="24"
            r="4"
            fill="var(--accent)"
          />

          <rect
            x="40"
            y="20"
            width="60"
            height="8"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.5"
          />

          <rect
            x="10"
            y="50"
            width="120"
            height="70"
            rx="4"
            fill="var(--accent)"
            opacity="0.15"
            stroke="var(--accent)"
          />

          <rect
            x="20"
            y="62"
            width="60"
            height="8"
            rx="2"
            fill="var(--accent)"
          />

          <rect
            x="20"
            y="78"
            width="90"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.6"
          />

          <rect
            x="20"
            y="90"
            width="70"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.4"
          />

          <rect
            x="142"
            y="50"
            width="128"
            height="35"
            rx="4"
            fill="var(--color-ink-panel-raised)"
            stroke="var(--line)"
          />

          <rect
            x="152"
            y="60"
            width="70"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.6"
          />

          <rect
            x="152"
            y="72"
            width="50"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.4"
          />

          <rect
            x="142"
            y="97"
            width="128"
            height="23"
            rx="4"
            fill="var(--color-ink-panel-raised)"
            stroke="var(--line)"
          />

          <rect
            x="152"
            y="105"
            width="60"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.5"
          />

          <rect
            x="10"
            y="132"
            width="260"
            height="78"
            rx="4"
            fill="var(--color-ink-panel-raised)"
            stroke="var(--line)"
          />

          <rect
            x="24"
            y="148"
            width="70"
            height="8"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.6"
          />

          <rect
            x="24"
            y="164"
            width="100"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.35"
          />

          <rect
            x="24"
            y="184"
            width="56"
            height="18"
            rx="4"
            fill="var(--accent)"
          />
        </motion.g>
      </svg>

      <p className="font-label mt-4 text-xs text-ink-fg-muted">
        blueprint → live product
      </p>
    </div>
  );
}
