"use client";

import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { BlogFormState } from "./actions";

const initialState: BlogFormState = {};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type BlogFormValues = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  status: "draft" | "published";
};

type Props = {
  action: (prevState: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  defaultValues?: BlogFormValues;
  submitLabel?: string;
};

export function BlogForm({ action, defaultValues, submitLabel = "Simpan artikel" }: Props) {
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
        .from("blog-images")
        .upload(path, file, { upsert: false });

      if (error) throw error;

      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
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
          Judul artikel
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
          placeholder="contoh: tips-memilih-jasa-website"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="font-label text-xs text-ink-fg-muted">
          Ringkasan singkat (opsional, untuk card)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={defaultValues?.excerpt ?? ""}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="content" className="font-label text-xs text-ink-fg-muted">
          Konten (mendukung Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={defaultValues?.content}
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 font-mono text-sm text-ink-fg outline-none focus:border-accent"
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
        <label htmlFor="tags" className="font-label text-xs text-ink-fg-muted">
          Tag (pisahkan dengan koma)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={defaultValues?.tags.join(", ")}
          placeholder="tips, website, seo"
          className="mt-2 w-full rounded-md border border-ink-line bg-ink-panel px-4 py-2.5 text-sm text-ink-fg outline-none focus:border-accent"
        />
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
