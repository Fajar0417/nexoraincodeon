import type { Metadata } from "next";
import { ProcessContent } from "@/components/sections/process-content";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Proses kerja — Nexora Incodeon",
  description: "Tahapan kerja Nexora Incodeon dari konsultasi awal sampai website atau aplikasi kamu live.",
};

export default function ProcessPage() {
  return (
    <div>
      <ProcessContent />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-fg">
          Siap mulai project kamu?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-fg-muted">
          Ceritakan kebutuhan kamu, kami mulai dari langkah pertama: konsultasi.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
        >
          Mulai konsultasi
        </a>
      </section>
    </div>
  );
}
