import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBlogPost } from "./actions";
import { DeleteButton } from "@/components/admin/delete-button";

type BlogRow = {
  id: string;
  title: string;
  status: "draft" | "published";
  published_at: string | null;
};

async function getAllPosts(): Promise<BlogRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, status, published_at")
    .order("created_at", { ascending: false });

  return (data as BlogRow[]) ?? [];
}

export default async function AdminBlogPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink-fg">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-dim"
        >
          + Tulis artikel
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-ink-fg-muted">Belum ada artikel.</p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-lg border border-ink-line">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-line bg-ink-panel text-ink-fg-muted">
                <th className="px-4 py-3 font-normal">Judul</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Tanggal publish</th>
                <th className="px-4 py-3 font-normal"></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-ink-line last:border-0">
                  <td className="px-4 py-3 text-ink-fg">{post.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        post.status === "published"
                          ? "bg-accent/20 text-accent"
                          : "bg-ink-panel-raised text-ink-fg-muted"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-fg-muted">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString("id-ID")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-xs text-ink-fg-muted hover:text-ink-fg"
                      >
                        Edit
                      </Link>
                      <form
                        action={async () => {
                          "use server";
                          await deleteBlogPost(post.id);
                        }}
                      >
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
