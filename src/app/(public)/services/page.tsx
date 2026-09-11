import type { Metadata } from "next";
import { ServicesContent } from "@/components/sections/services-content";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Layanan — Nexora Incodeon",
  description:
    "Layanan pengembangan website, aplikasi web, e-commerce, dan sistem custom dari Nexora Incodeon.",
};

export default function ServicesPage() {
  return (
    <div>
      <ServicesContent />

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-display text-2xl font-semibold text-ink-fg">
          Belum yakin layanan mana yang cocok?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-fg-muted">
          Ceritakan kebutuhan bisnis kamu, kami bantu tentukan solusi dan
          estimasinya lewat sesi konsultasi singkat.
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
