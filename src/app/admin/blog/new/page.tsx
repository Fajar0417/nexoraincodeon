import { BlogForm } from "../blog-form";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Tulis artikel baru
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        Tulis konten dalam Markdown, lalu pilih status &quot;Published&quot;
        supaya langsung tampil di halaman blog.
      </p>
      <BlogForm action={createBlogPost} submitLabel="Terbitkan artikel" />
    </div>
  );
}
