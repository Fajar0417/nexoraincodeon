"use client";

import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PortfolioFormState } from "./actions";

const initialState: PortfolioFormState = {};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type PortfolioFormValues = {
  title: string;
  slug: string;
  category: string;
  client_name: string | null;
  description: string;
  cover_image_url: string | null;
  tech_stack: string[];
  project_url: string | null;
  is_featured: boolean;
  status: "draft" | "published";
};

type Props = {
  action: (prevState: PortfolioFormState, formData: FormData) => Promise<PortfolioFormState>;
  defaultValues?: PortfolioFormValues;
  submitLabel?: string;
};

export function PortfolioForm({ action, defaultValues, submitLabel = "Simpan portfolio" }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues));
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [coverUrl, setCoverUrl] = useState(defaultValues?.cover_image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${crypto.randomUUID()}.${ext}`;

      const { error } = await supabase.storage
        .from("portfolio-images")
        .upload(path, file, { upsert: false });

      if (error) throw error;

      const { data } = supabase.storage.from("portfolio-images").getPublicUrl(path);
      setCoverUrl(data.publicUrl);
    } catch {
      setUploadError("Gagal upload gambar. Coba lagi atau isi URL manual.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="mt-8 max-w-2xl space-y-6">
      <div>
        <label htmlFor="title" className="font-label text-xs text-ink-fg-muted">
          Judul project
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={defaultValues?.title}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="slug" className="font-label text-xs text-ink-fg-muted">
          Slug (untuk URL)
        </label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(slugify(e.target.value));
          }}
          placeholder="contoh: toko-online-abc"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="category" className="font-label text-xs text-ink-fg-muted">
          Kategori
        </label>
        <input
          id="category"
          name="category"
          required
          defaultValue={defaultValues?.category}
          placeholder="Website, E-commerce, Web App, dll"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="client_name" className="font-label text-xs text-ink-fg-muted">
          Nama klien (opsional)
        </label>
        <input
          id="client_name"
          name="client_name"
          defaultValue={defaultValues?.client_name ?? ""}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="description" className="font-label text-xs text-ink-fg-muted">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={defaultValues?.description}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="font-label text-xs text-ink-fg-muted">Gambar cover</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-ink-fg-muted file:mr-4 file:rounded-md file:border file:border-ink-line file:bg-ink-panel file:px-4 file:py-2 file:text-sm file:text-ink-fg"
        />
        <input type="hidden" name="cover_image_url" value={coverUrl} />
        {uploading && <p className="mt-2 text-xs text-ink-fg-muted">Mengunggah gambar...</p>}
        {uploadError && <p className="mt-2 text-xs text-red-600">{uploadError}</p>}
        {coverUrl && !uploading && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt="Preview cover"
            className="mt-3 h-40 w-full rounded-md border border-ink-line object-cover"
          />
        )}
      </div>

      <div>
        <label htmlFor="tech_stack" className="font-label text-xs text-ink-fg-muted">
          Tech stack (pisahkan dengan koma)
        </label>
        <input
          id="tech_stack"
          name="tech_stack"
          defaultValue={defaultValues?.tech_stack.join(", ")}
          placeholder="Next.js, Supabase, Tailwind CSS"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="project_url" className="font-label text-xs text-ink-fg-muted">
          Link live site (opsional)
        </label>
        <input
          id="project_url"
          name="project_url"
          type="url"
          defaultValue={defaultValues?.project_url ?? ""}
          placeholder="https://"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          id="is_featured"
          name="is_featured"
          type="checkbox"
          defaultChecked={defaultValues?.is_featured}
          className="h-4 w-4 rounded border-ink-line accent-[var(--accent)]"
        />
        <label htmlFor="is_featured" className="text-sm text-ink-fg-muted">
          Tampilkan sebagai project unggulan
        </label>
      </div>

      <div>
        <label htmlFor="status" className="font-label text-xs text-ink-fg-muted">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "draft"}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        >
          <option value="draft">Draft (belum tampil di website)</option>
          <option value="published">Published (tampil di website)</option>
        </select>
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || uploading}
        className="rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dim disabled:opacity-60"
      >
        {pending ? "Menyimpan..." : submitLabel}
      </button>
    </form>
  );
}
