"use client";

import { motion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
};

export function ServiceImage({ src, alt }: Props) {
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
          bg-accent/10
          blur-3xl
        "
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Image */}
      <motion.div
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
        <motion.img
          src={src}
          alt={alt}
          animate={{
            y: [0, -7, 0],
          }}
          whileHover={{
            y: -12,
            scale: 1.025,
          }}
          transition={{
            y: {
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            scale: {
              duration: 0.3,
              ease: "easeOut",
            },
          }}
          className="
            relative z-10
            w-full
            transform-gpu
            drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]
          "
        />
      </motion.div>
    </div>
  );
}