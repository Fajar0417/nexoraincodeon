import type { Metadata } from "next";
import { PricingContent } from "@/components/sections/pricing-content";
import { WHATSAPP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Harga — Nexora Incodeon",
  description: "Paket harga layanan pengembangan website dan aplikasi dari Nexora Incodeon.",
};

export default function PricingPage() {
  return (
    <div>
      <PricingContent />

      <section className="mx-auto max-w-6xl px-6 pb-20 text-center">
        <h2 className="font-display text-xl font-semibold text-ink-fg">
          Butuh paket yang disesuaikan?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-fg-muted">
          Ceritakan cakupan project kamu, kami hitungkan estimasinya.
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
