"use client";

import { useActionState } from "react";
import type { PricingFormState } from "./actions";
import { services } from "@/lib/data/services";

const initialState: PricingFormState = {};

export type PricingFormValues = {
  name: string;
  service_slug: string | null;
  description: string | null;
  price: number | null;
  price_label: string | null;
  duration_label: string | null;
  billing_type: "one-time" | "monthly" | "custom";
  features: string[];
  extra_note: string | null;
  is_popular: boolean;
  sort_order: number;
  is_active: boolean;
};

type Props = {
  action: (prevState: PricingFormState, formData: FormData) => Promise<PricingFormState>;
  defaultValues?: PricingFormValues;
  submitLabel?: string;
};

export function PricingForm({ action, defaultValues, submitLabel = "Simpan paket" }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-8 max-w-xl space-y-6">
      <div>
        <label htmlFor="service_slug" className="font-label text-xs text-ink-fg-muted">
          Layanan
        </label>
        <select
          id="service_slug"
          name="service_slug"
          required
          defaultValue={defaultValues?.service_slug ?? ""}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        >
          <option value="" disabled>
            Pilih layanan
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className="font-label text-xs text-ink-fg-muted">
          Nama paket
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Paket Pelajar, Paket UMKM, Paket Bisnis"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="description" className="font-label text-xs text-ink-fg-muted">
          Deskripsi singkat
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          defaultValue={defaultValues?.description ?? ""}
          placeholder="Cocok untuk usaha kecil dan pemula yang ingin tampil online secara profesional."
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="font-label text-xs text-ink-fg-muted">
            Harga (angka, kosongkan jika custom)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            defaultValue={defaultValues?.price ?? ""}
            placeholder="700000"
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="duration_label" className="font-label text-xs text-ink-fg-muted">
            Label durasi
          </label>
          <input
            id="duration_label"
            name="duration_label"
            defaultValue={defaultValues?.duration_label ?? "/tahun"}
            placeholder="/tahun, /bulan"
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="price_label" className="font-label text-xs text-ink-fg-muted">
          Label harga (opsional, dipakai kalau harga custom)
        </label>
        <input
          id="price_label"
          name="price_label"
          defaultValue={defaultValues?.price_label ?? ""}
          placeholder="mulai dari / hubungi kami"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="billing_type" className="font-label text-xs text-ink-fg-muted">
          Tipe billing
        </label>
        <select
          id="billing_type"
          name="billing_type"
          defaultValue={defaultValues?.billing_type ?? "one-time"}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        >
          <option value="one-time">Sekali bayar</option>
          <option value="monthly">Per bulan</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div>
        <label htmlFor="features" className="font-label text-xs text-ink-fg-muted">
          Fitur (satu baris = satu fitur)
        </label>
        <textarea
          id="features"
          name="features"
          required
          rows={6}
          defaultValue={defaultValues?.features.join("\n")}
          placeholder={"Desain responsive\n1 halaman (landing page)\nFormulir kontak sederhana"}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="extra_note" className="font-label text-xs text-ink-fg-muted">
          Catatan tambahan (opsional)
        </label>
        <input
          id="extra_note"
          name="extra_note"
          defaultValue={defaultValues?.extra_note ?? ""}
          placeholder="Tambah Halaman Rp150.000/halaman"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sort_order" className="font-label text-xs text-ink-fg-muted">
            Urutan tampil
          </label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={defaultValues?.sort_order ?? 0}
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
        <div className="flex flex-col justify-center gap-3 pt-5">
          <label className="flex items-center gap-2 text-sm text-ink-fg-muted">
            <input
              type="checkbox"
              name="is_popular"
              defaultChecked={defaultValues?.is_popular}
              className="h-4 w-4 rounded border-ink-line accent-[var(--accent)]"
            />
            Tandai &quot;Paling Laris&quot;
          </label>
          <label className="flex items-center gap-2 text-sm text-ink-fg-muted">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={defaultValues?.is_active ?? true}
              className="h-4 w-4 rounded border-ink-line accent-[var(--accent)]"
            />
            Aktif (tampil di website)
          </label>
        </div>
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-60"
      >
        {pending ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}
