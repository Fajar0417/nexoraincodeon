"use client";

import { motion } from "framer-motion";

const hueHex: Record<string, { fill: string; soft: string }> = {
  teal: { fill: "#0d9488", soft: "#ccfbf1" },
  orange: { fill: "#ea580c", soft: "#ffedd5" },
  indigo: { fill: "#4f46e5", soft: "#e0e7ff" },
  rose: { fill: "#e11d48", soft: "#ffe4e6" },
  sky: { fill: "#0284c7", soft: "#e0f2fe" },
  violet: { fill: "#7c3aed", soft: "#ede9fe" },
  amber: { fill: "#d97706", soft: "#fef3c7" },
  pink: { fill: "#db2777", soft: "#fce7f3" },
};

type Props = {
  hue: keyof typeof hueHex;
};

export function ServiceMockup({ hue }: Props) {
  const color = hueHex[hue];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-2/3 w-2/3
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          blur-3xl
        "
        style={{
          backgroundColor: color.soft,
        }}
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [0.9, 1.08, 0.9],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.svg
        viewBox="0 0 320 220"
        className="relative z-10 h-auto w-full"
        role="img"
        aria-label="Ilustrasi tampilan website pada laptop dan ponsel"
        initial={{
          opacity: 0,
          x: 30,
          scale: 0.97,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <title>Preview tampilan di laptop dan ponsel</title>

        {/* Laptop */}
        <motion.g
          animate={{
            y: [0, -4, 0],
          }}
          whileHover={{
            scale: 1.02,
          }}
          transition={{
            y: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <rect
            x="30"
            y="24"
            width="210"
            height="130"
            rx="6"
            fill="var(--ink-800)"
            stroke="var(--line)"
          />

          <rect
            x="38"
            y="32"
            width="194"
            height="18"
            rx="3"
            fill={color.soft}
          />

          <circle
            cx="46"
            cy="41"
            r="2.5"
            fill={color.fill}
          />

          <rect
            x="38"
            y="58"
            width="194"
            height="88"
            rx="3"
            fill="var(--ink-900)"
            stroke="var(--line-soft)"
          />

          <rect
            x="48"
            y="68"
            width="120"
            height="10"
            rx="2"
            fill={color.fill}
          />

          <rect
            x="48"
            y="84"
            width="150"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.4"
          />

          <rect
            x="48"
            y="96"
            width="130"
            height="6"
            rx="2"
            fill="var(--text-secondary)"
            opacity="0.3"
          />

          <rect
            x="48"
            y="114"
            width="60"
            height="20"
            rx="4"
            fill={color.fill}
          />

          <rect
            x="118"
            y="114"
            width="60"
            height="20"
            rx="4"
            fill={color.soft}
          />

          <path
            d="M20 154 H250 L238 168 H32 Z"
            fill="var(--ink-700)"
            stroke="var(--line)"
          />
        </motion.g>

        {/* Phone */}
        <motion.g
          animate={{
            y: [0, -7, 0],
          }}
          transition={{
            duration: 4,
            delay: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect
            x="222"
            y="12"
            width="76"
            height="140"
            rx="12"
            fill="var(--ink-800)"
            stroke="var(--line)"
          />

          <rect
            x="230"
            y="24"
            width="60"
            height="116"
            rx="4"
            fill="var(--ink-900)"
            stroke="var(--line-soft)"
          />

          <rect
            x="236"
            y="32"
            width="40"
            height="8"
            rx="2"
            fill={color.fill}
          />

          <rect
            x="236"
            y="46"
            width="48"
            height="5"
            rx="1.5"
            fill="var(--text-secondary)"
            opacity="0.4"
          />

          <rect
            x="236"
            y="56"
            width="36"
            height="5"
            rx="1.5"
            fill="var(--text-secondary)"
            opacity="0.3"
          />

          <rect
            x="236"
            y="72"
            width="48"
            height="26"
            rx="4"
            fill={color.soft}
          />

          <rect
            x="236"
            y="104"
            width="48"
            height="14"
            rx="4"
            fill={color.fill}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}