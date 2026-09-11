"use client";

import { useActionState, useRef, useEffect } from "react";
import { submitConsultation, type ContactFormState } from "./actions";
import { services } from "@/lib/data/services";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitConsultation, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="rounded-lg border border-accent bg-ink-panel p-8 text-center">
        <p className="font-display text-lg font-semibold text-ink-fg">
          Pesan kamu sudah kami terima.
        </p>
        <p className="mt-2 text-sm text-ink-fg-muted">
          Tim kami akan menghubungi kamu lewat email dalam 1-2 hari kerja.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="font-label text-xs text-ink-fg-muted">
            Nama
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="font-label text-xs text-ink-fg-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="font-label text-xs text-ink-fg-muted">
            No. HP/WhatsApp (opsional)
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="company_name" className="font-label text-xs text-ink-fg-muted">
            Nama perusahaan/instansi (opsional)
          </label>
          <input
            id="company_name"
            name="company_name"
            className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service_interest" className="font-label text-xs text-ink-fg-muted">
          Layanan yang diminati (opsional)
        </label>
        <select
          id="service_interest"
          name="service_interest"
          defaultValue=""
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        >
          <option value="">Pilih layanan</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="font-label text-xs text-ink-fg-muted">
          Ceritakan kebutuhan kamu
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Contoh: saya butuh website company profile untuk usaha katering, sekitar 5 halaman..."
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
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
        {pending ? "Mengirim..." : "Kirim pesan"}
      </button>
    </form>
  );
}
