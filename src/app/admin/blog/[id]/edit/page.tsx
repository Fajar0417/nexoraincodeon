import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm, type BlogFormValues } from "../../blog-form";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt, content, cover_image_url, tags, status")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const boundUpdate = updateBlogPost.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink-fg">
        Edit artikel
      </h1>
      <p className="mt-2 text-sm text-ink-fg-muted">
        Ubah konten artikel ini.
      </p>
      <BlogForm
        action={boundUpdate}
        defaultValues={data as BlogFormValues}
        submitLabel="Simpan perubahan"
      />
    </div>
  );
}
